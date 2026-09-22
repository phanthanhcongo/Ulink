// Seed Directus blog_posts + translations from hardcoded mock resources.
// Run with: npx tsx frontend/scripts/seed-resources.ts
// Or via wrapper: node scripts/seed-resources.mjs

import { MOCK_RESOURCES, MOST_VIEWED_ARTICLES } from '../src/components/resources/mock-data';
import { CASE_STUDIES_MAP } from '../src/components/resources/resource-catalog.server';
import type { ResourceItem } from '../src/components/resources/types';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const EMAIL = process.env.DIRECTUS_ADMIN_EMAIL || 'admin@ulink.com';
const PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || 'change-me-admin-password';

const LOCALES = ['vi', 'en', 'ja'] as const;
type Locale = typeof LOCALES[number];

function pick(obj: any, loc: Locale): string {
  if (!obj) return '';
  return (obj[loc] || obj.vi || obj.en || obj.ja || '').toString();
}

const VI_MONTHS: Record<string, number> = {
  'tháng 1': 1, 'tháng 01': 1, 'tháng 2': 2, 'tháng 02': 2,
  'tháng 3': 3, 'tháng 03': 3, 'tháng 4': 4, 'tháng 04': 4,
  'tháng 5': 5, 'tháng 05': 5, 'tháng 6': 6, 'tháng 06': 6,
  'tháng 7': 7, 'tháng 07': 7, 'tháng 8': 8, 'tháng 08': 8,
  'tháng 9': 9, 'tháng 09': 9, 'tháng 10': 10, 'tháng 11': 11, 'tháng 12': 12,
};

function parseDate(str: string): string {
  if (!str) return new Date().toISOString();
  const s = str.trim();
  // dd/mm/yyyy
  const m1 = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m1) {
    return new Date(+m1[3], +m1[2] - 1, +m1[1]).toISOString();
  }
  // Tháng X, YYYY  or Tháng X/YYYY
  const m2 = s.toLowerCase().match(/tháng\s*(\d{1,2})[,\/\s]+(\d{4})/);
  if (m2) {
    const month = parseInt(m2[1], 10);
    const year = parseInt(m2[2], 10);
    return new Date(year, month - 1, 1).toISOString();
  }
  // Fallback: skip strings like "1.2k lượt xem"
  return new Date().toISOString();
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildBody(item: ResourceItem, loc: Locale): string {
  const desc = pick(item.description, loc);
  if (item.sections && item.sections.length > 0) {
    const parts: string[] = [];
    if (desc) parts.push(`<p>${escapeHtml(desc)}</p>`);
    for (const sec of item.sections) {
      const title = pick(sec.title, loc);
      const content = pick(sec.content, loc);
      if (title) parts.push(`<h2>${escapeHtml(title)}</h2>`);
      if (content) {
        for (const para of content.split(/\n\n+/)) {
          parts.push(`<p>${escapeHtml(para).replace(/\n/g, '<br/>')}</p>`);
        }
      }
      const alert = (sec as any).alertText ? pick((sec as any).alertText, loc) : '';
      if (alert) parts.push(`<blockquote>${escapeHtml(alert)}</blockquote>`);
    }
    return parts.join('\n');
  }
  return desc ? `<p>${escapeHtml(desc)}</p>` : '';
}

async function login(): Promise<string> {
  const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  const j: any = await res.json();
  return j.data.access_token;
}

async function existsBySlug(token: string, slug: string): Promise<boolean> {
  const url = `${DIRECTUS_URL}/items/blog_posts?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1&fields=id`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Check slug failed: ${res.status} ${await res.text()}`);
  const j: any = await res.json();
  return Array.isArray(j.data) && j.data.length > 0;
}

async function insert(token: string, item: ResourceItem): Promise<void> {
  const slug = item.id;
  const category = pick(item.badge, 'vi') || 'General';
  const author = pick(item.author?.name, 'vi') || 'ULink Editorial';
  const author_role = pick(item.author?.role, 'vi') || '';
  const author_avatar = item.author?.avatar || '';
  const cover = item.image || '';
  const published_at = parseDate(item.date);

  const translations = LOCALES.map((loc) => {
    const title = pick(item.title, loc);
    const description = pick(item.description, loc);
    const body = buildBody(item, loc);
    return {
      languages_code: loc,
      title,
      description,
      body,
      meta_title: title,
      meta_description: description,
    };
  });

  const payload = {
    slug,
    cover,
    author,
    author_role,
    author_avatar,
    category,
    published_at,
    status: 'published',
    translations,
  };

  const res = await fetch(`${DIRECTUS_URL}/items/blog_posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Insert ${slug} failed: ${res.status} ${await res.text()}`);
  }
}

async function main() {
  console.log(`Logging in to ${DIRECTUS_URL} as ${EMAIL} ...`);
  const token = await login();
  console.log('Login OK');

  // Aggregate & dedupe by id
  const seen = new Set<string>();
  const all: ResourceItem[] = [];
  const push = (list: ResourceItem[]) => {
    for (const it of list) {
      if (!seen.has(it.id)) { seen.add(it.id); all.push(it); }
    }
  };
  push(MOCK_RESOURCES);
  push(MOST_VIEWED_ARTICLES);
  push(Object.values(CASE_STUDIES_MAP));

  console.log(`Sources: MOCK_RESOURCES=${MOCK_RESOURCES.length}, MOST_VIEWED=${MOST_VIEWED_ARTICLES.length}, CASE_STUDIES=${Object.keys(CASE_STUDIES_MAP).length}`);
  console.log(`Unique items to seed: ${all.length}`);

  let inserted = 0, skipped = 0, errors = 0;
  for (const item of all) {
    try {
      if (await existsBySlug(token, item.id)) {
        console.log(`[skip] ${item.id} (already exists)`);
        skipped++;
        continue;
      }
      await insert(token, item);
      console.log(`[ok]   ${item.id}`);
      inserted++;
    } catch (e: any) {
      console.error(`[err]  ${item.id}: ${e.message}`);
      errors++;
    }
  }

  console.log(`\nSummary: inserted=${inserted}, skipped=${skipped}, errors=${errors}, total=${all.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

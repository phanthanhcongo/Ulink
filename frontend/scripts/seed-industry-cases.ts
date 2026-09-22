// Seed the industry "Trường hợp áp dụng" cards into Directus blog_posts,
// linked to their industry so /industries/* pages can render them from DB.
//
// Run with: npx tsx frontend/scripts/seed-industry-cases.ts
// (from repo root or frontend/)

import { getIndustryDetails, VALID_SLUGS } from '../src/components/industries/industry-data';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const EMAIL = process.env.DIRECTUS_ADMIN_EMAIL || 'admin@ulink.com';
const PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || 'change-me-admin-password';

const LOCALES = ['vi', 'en', 'ja'] as const;
type Locale = typeof LOCALES[number];

// Canonical industry-page slug → Directus industries.slug
const INDUSTRY_DB_SLUG: Record<string, string> = {
  electronics: 'dien-tu',
  'pharmaceutical-cosmetics': 'duoc-pham',
  'food-beverage': 'thuc-pham',
  logistics: 'kho-logistics',
  furniture: 'noi-that',
  construction: 'co-khi-hvac'
};

interface Case {
  title: string;
  description: string;
  image: string;
  badge?: string;
  slug?: string;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildBody(description: string): string {
  if (!description) return '';
  return description
    .split(/\n\n+/)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br/>')}</p>`)
    .join('\n');
}

async function login(): Promise<string> {
  const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  const j: any = await res.json();
  return j.data.access_token;
}

async function industryId(token: string, dbSlug: string): Promise<number | null> {
  const url = `${DIRECTUS_URL}/items/industries?filter[slug][_eq]=${encodeURIComponent(dbSlug)}&limit=1&fields=id`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Lookup industry ${dbSlug} failed: ${res.status}`);
  const j: any = await res.json();
  return j.data?.[0]?.id ?? null;
}

async function findBySlug(token: string, slug: string): Promise<{ id: number; industry: number | null } | null> {
  const url = `${DIRECTUS_URL}/items/blog_posts?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1&fields=id,industry`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Check slug failed: ${res.status} ${await res.text()}`);
  const j: any = await res.json();
  const row = Array.isArray(j.data) ? j.data[0] : null;
  return row ? { id: row.id, industry: row.industry ?? null } : null;
}

// Link an existing article to its industry (+ set base badge) without touching
// its already-seeded resource content.
async function patchLink(
  token: string,
  id: number,
  industry: number | null,
  badge: string
): Promise<void> {
  const body: Record<string, unknown> = {};
  if (industry != null) body.industry = industry;
  if (badge) body.badge = badge;
  if (!Object.keys(body).length) return;
  const res = await fetch(`${DIRECTUS_URL}/items/blog_posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Patch ${id} failed: ${res.status} ${await res.text()}`);
}

async function insert(
  token: string,
  slug: string,
  industry: number | null,
  perLocale: Record<Locale, Case>
): Promise<void> {
  const vi = perLocale.vi;
  const translations = LOCALES.map((loc) => {
    const c = perLocale[loc] || vi;
    return {
      languages_code: loc,
      title: c.title || '',
      description: c.description || '',
      badge: c.badge || '',
      body: buildBody(c.description || ''),
      meta_title: c.title || '',
      meta_description: c.description || ''
    };
  });

  const payload: Record<string, unknown> = {
    slug,
    cover: vi.image || '',
    author: 'ULINK',
    badge: vi.badge || '',
    category: 'Nghiên cứu điển hình',
    published_at: new Date().toISOString(),
    status: 'published',
    translations
  };
  if (industry != null) payload.industry = industry;

  const res = await fetch(`${DIRECTUS_URL}/items/blog_posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`Insert ${slug} failed: ${res.status} ${await res.text()}`);
}

async function main() {
  console.log(`Logging in to ${DIRECTUS_URL} as ${EMAIL} ...`);
  const token = await login();
  console.log('Login OK\n');

  let inserted = 0, linked = 0, skipped = 0, errors = 0;

  for (const canonical of VALID_SLUGS) {
    const dbSlug = INDUSTRY_DB_SLUG[canonical];
    if (!dbSlug) { console.warn(`[warn] no DB slug mapping for ${canonical}`); continue; }
    const indId = await industryId(token, dbSlug);
    if (indId == null) console.warn(`[warn] industry not found in DB: ${dbSlug} (will seed without link)`);

    // Localized case arrays
    const byLocale: Record<Locale, Case[]> = {
      vi: (getIndustryDetails(canonical, 'vi')?.cases as Case[]) || [],
      en: (getIndustryDetails(canonical, 'en')?.cases as Case[]) || [],
      ja: (getIndustryDetails(canonical, 'ja')?.cases as Case[]) || []
    };
    const count = byLocale.vi.length;

    for (let i = 0; i < count; i++) {
      const slug = byLocale.vi[i]?.slug || `${canonical}-case-${i + 1}`;
      const perLocale: Record<Locale, Case> = {
        vi: byLocale.vi[i],
        en: byLocale.en[i] || byLocale.vi[i],
        ja: byLocale.ja[i] || byLocale.vi[i]
      };
      try {
        const existing = await findBySlug(token, slug);
        if (existing) {
          if (existing.industry == null) {
            await patchLink(token, existing.id, indId, perLocale.vi?.badge || '');
            console.log(`[link] ${slug} → ${dbSlug}`);
            linked++;
          } else {
            console.log(`[skip] ${slug} (already linked)`);
            skipped++;
          }
          continue;
        }
        await insert(token, slug, indId, perLocale);
        console.log(`[ok]   ${slug} → ${dbSlug}`);
        inserted++;
      } catch (e: any) {
        console.error(`[err]  ${slug}: ${e.message}`);
        errors++;
      }
    }
  }

  console.log(`\nSummary: inserted=${inserted}, linked=${linked}, skipped=${skipped}, errors=${errors}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

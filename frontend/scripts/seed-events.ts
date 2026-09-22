// Seed Directus events from hardcoded mock UPCOMING_EVENTS.
// Run with: npx tsx frontend/scripts/seed-events.ts
// Or via wrapper: node scripts/seed-events.mjs

import { UPCOMING_EVENTS } from '../src/components/resources/mock-data';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const EMAIL = process.env.DIRECTUS_ADMIN_EMAIL || 'admin@ulink.com';
const PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || 'change-me-admin-password';

function pick(obj: any, loc: 'vi' | 'en' | 'ja' = 'vi'): string {
  if (!obj) return '';
  return (obj[loc] || obj.vi || obj.en || obj.ja || '').toString();
}

function parseDate(str: string): string {
  if (!str) return new Date().toISOString().slice(0, 10);
  const s = str.trim();
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const dd = m[1].padStart(2, '0');
    const mm = m[2].padStart(2, '0');
    return `${m[3]}-${mm}-${dd}`;
  }
  return new Date().toISOString().slice(0, 10);
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
  const url = `${DIRECTUS_URL}/items/events?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1&fields=id`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Check slug failed: ${res.status} ${await res.text()}`);
  const j: any = await res.json();
  return Array.isArray(j.data) && j.data.length > 0;
}

async function insert(token: string, item: any): Promise<void> {
  const slug = item.id;
  const title = pick(item.title, 'vi');
  const summary = pick(item.description, 'vi');
  const location = pick(item.location, 'vi');
  const price = pick(item.price, 'vi');
  const time = item.time || '';
  const date = parseDate(item.date || '');

  // Parse start_time/end_time from "HH:MM - HH:MM"
  let start_time = '';
  let end_time = '';
  const tm = time.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  if (tm) { start_time = tm[1]; end_time = tm[2]; }

  const payload: any = {
    slug,
    title,
    summary,
    image: item.image || null,
    date,
    time,
    start_time: start_time || null,
    end_time: end_time || null,
    location,
    location_name: location,
    address: location,
    registration_status: 'UPCOMING',
    price,
    overview: summary,
    highlights: [],
    agenda: [],
    speakers: [],
    hosts: [],
    sponsors: [],
    benefits: [],
    organizer_name: pick(item.author?.name, 'vi') || 'ULink Events',
    organizer_role: pick(item.author?.role, 'vi') || '',
    organizer_logo: item.author?.avatar || '',
    organizer_description: '',
    organizer_contact: '',
    status: 'published',
  };

  const res = await fetch(`${DIRECTUS_URL}/items/events`, {
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

  const all = UPCOMING_EVENTS;
  console.log(`Total mock events: ${all.length}`);

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

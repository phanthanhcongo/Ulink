// Enrich Directus events with detailed mock data from event-detail-data.ts.
// Run: node scripts/enrich-events.mjs

import { getEventDetailBySlug } from '../src/components/events/event-detail-data';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const EMAIL = process.env.DIRECTUS_ADMIN_EMAIL || 'admin@ulink.com';
const PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD || 'change-me-admin-password';

const SLUGS = ['ev-001', 'ev-002', 'ev-003'];

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

async function findBySlug(token: string, slug: string): Promise<any | null> {
  const url = `${DIRECTUS_URL}/items/events?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Find ${slug}: ${res.status} ${await res.text()}`);
  const j: any = await res.json();
  return Array.isArray(j.data) && j.data.length > 0 ? j.data[0] : null;
}

function toIsoTime(s?: string): string | undefined {
  if (!s) return undefined;
  const m = s.match(/(\d{1,2}):(\d{2})/);
  if (!m) return undefined;
  const hh = m[1].padStart(2, '0');
  return `${hh}:${m[2]}:00`;
}

async function patch(token: string, id: number, payload: any): Promise<void> {
  const res = await fetch(`${DIRECTUS_URL}/items/events/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`PATCH ${id}: ${res.status} ${await res.text()}`);
}

async function main() {
  console.log(`Logging in to ${DIRECTUS_URL} ...`);
  const token = await login();
  console.log('Login OK');

  let enriched = 0, missing = 0, errors = 0;

  for (const slug of SLUGS) {
    const mock = getEventDetailBySlug(slug);
    if (!mock) { console.log(`[skip] ${slug}: no mock`); continue; }
    try {
      const row = await findBySlug(token, slug);
      if (!row) { console.log(`[miss] ${slug}: no DB row`); missing++; continue; }

      const payload: any = {};
      const set = (k: string, v: any) => { if (v !== undefined && v !== null) payload[k] = v; };

      set('overview', mock.overview);
      set('highlights', mock.highlights);
      set('agenda', mock.agenda);
      set('speakers', mock.speakers);
      set('hosts', mock.hosts);
      set('sponsors', mock.sponsors);
      set('benefits', mock.benefits);
      set('organizer_name', mock.organizer?.name);
      set('organizer_description', mock.organizer?.description);
      set('organizer_contact', mock.organizer?.contact);
      set('organizer_role', mock.organizer?.role);
      set('organizer_logo', mock.organizer?.logo);
      set('location_name', mock.locationName);
      set('address', mock.address);
      set('start_time', toIsoTime(mock.startTime));
      set('end_time', toIsoTime(mock.endTime));
      set('price', mock.price);
      set('registration_status', mock.registrationStatus);

      await patch(token, row.id, payload);
      console.log(`[ok]   ${slug} (id=${row.id}) fields=${Object.keys(payload).join(',')}`);
      enriched++;
    } catch (e: any) {
      console.error(`[err]  ${slug}: ${e.message}`);
      errors++;
    }
  }

  console.log(`\nSummary: enriched=${enriched}, missing=${missing}, errors=${errors}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

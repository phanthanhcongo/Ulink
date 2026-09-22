/**
 * Admin Events CRUD — integration tests
 *
 * Framework: node:test (via `node --import tsx`) — matches the frontend runner.
 * See `articles-crud.spec.ts` header for the full rationale (Playwright is not
 * installed at the repo root; the Next.js server actions depend on
 * `next/headers`, so we replay their EXACT payload shape against the Directus
 * REST API at http://localhost:8055 instead).
 *
 * Cleanup: created rows are hard-deleted in `after()`.
 *
 * Run:
 *   npx tsx --test ../test/api/events-crud.spec.ts   (from frontend/)
 */

import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';

const DIRECTUS_URL = (process.env.DIRECTUS_URL ?? 'http://localhost:8055').replace(/\/$/, '');
const ADMIN_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL ?? 'admin@ulink.com';
const ADMIN_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD ?? 'change-me-admin-password';

const SUFFIX = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

let token = '';
const createdIds: number[] = [];

async function login(): Promise<string> {
  const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD, mode: 'json' })
  });
  const json: any = await res.json();
  assert.equal(res.status, 200, `Admin login failed: ${JSON.stringify(json)}`);
  return json.data.access_token;
}

async function api(method: string, path: string, body?: unknown) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  const parsed = text ? JSON.parse(text) : null;
  if (res.status >= 400) {
    throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  }
  return parsed?.data;
}

/** Replay the base + translation fields exactly like saveEvent(). */
function baseFields(overrides: Record<string, any> = {}) {
  return {
    slug: overrides.slug,
    image: null,
    date: null,
    time: null,
    start_time: null,
    end_time: null,
    location: null,
    registration_status: 'UPCOMING',
    highlights: [],
    agenda: [],
    speakers: [],
    hosts: [],
    sponsors: [],
    benefits: [],
    organizer_name: null,
    organizer_contact: null,
    organizer_logo: null,
    status: 'draft',
    ...overrides
  };
}

function translationFields(title: string, overrides: Record<string, any> = {}) {
  return {
    title,
    summary: null,
    overview: null,
    location_name: null,
    address: null,
    price: null,
    organizer_description: null,
    organizer_role: null,
    organizer_name: null,
    highlights: [],
    agenda: [],
    speakers: [],
    hosts: [],
    benefits: [],
    ...overrides
  };
}

describe('Admin Events CRUD', () => {
  before(async () => {
    token = await login();
  });

  after(async () => {
    for (const id of createdIds) {
      try {
        await api('DELETE', `/items/events/${id}`);
      } catch (e) {
        console.warn(`Cleanup: could not delete events/${id}:`, (e as Error).message);
      }
    }
  });

  it('CREATE: saves a new event with vi translation', async () => {
    const slug = `test-event-${SUFFIX}`;
    const created = await api('POST', '/items/events', {
      ...baseFields({ slug }),
      translations: [{ languages_code: 'vi', ...translationFields('Sự kiện test') }]
    });
    assert.ok(created?.id);
    createdIds.push(created.id);

    const full = await api(
      'GET',
      `/items/events/${created.id}?fields=id,slug,status,translations.languages_code,translations.title`
    );
    assert.equal(full.slug, slug);
    assert.equal(full.translations.length, 1);
    assert.equal(full.translations[0].languages_code, 'vi');
    assert.equal(full.translations[0].title, 'Sự kiện test');
  });

  it('UPDATE (add new locale): saving locale=en creates en row, vi untouched', async () => {
    const slug = `test-event-addlocale-${SUFFIX}`;
    const created = await api('POST', '/items/events', {
      ...baseFields({ slug }),
      translations: [{ languages_code: 'vi', ...translationFields('Chỉ vi') }]
    });
    createdIds.push(created.id);

    await api('PATCH', `/items/events/${created.id}`, {
      ...baseFields({ slug }),
      translations: {
        create: [{ languages_code: 'en', ...translationFields('EN event') }],
        update: [],
        delete: []
      }
    });

    const full = await api(
      'GET',
      `/items/events/${created.id}?fields=translations.languages_code,translations.title`
    );
    const byLocale = Object.fromEntries(
      full.translations.map((t: any) => [t.languages_code, t.title])
    );
    assert.equal(byLocale.vi, 'Chỉ vi', 'vi row must remain');
    assert.equal(byLocale.en, 'EN event', 'en row must be added');
  });

  it('UPDATE (same locale): updating vi title updates in place (no duplicate)', async () => {
    const slug = `test-event-samelocale-${SUFFIX}`;
    const created = await api('POST', '/items/events', {
      ...baseFields({ slug }),
      translations: [{ languages_code: 'vi', ...translationFields('Ban đầu') }]
    });
    createdIds.push(created.id);

    let full = await api(
      'GET',
      `/items/events/${created.id}?fields=translations.id,translations.languages_code`
    );
    const viRow = full.translations.find((t: any) => t.languages_code === 'vi');

    await api('PATCH', `/items/events/${created.id}`, {
      ...baseFields({ slug }),
      translations: {
        update: [{ id: viRow.id, ...translationFields('Đã sửa') }],
        create: [],
        delete: []
      }
    });

    full = await api(
      'GET',
      `/items/events/${created.id}?fields=translations.languages_code,translations.title`
    );
    const viRows = full.translations.filter((t: any) => t.languages_code === 'vi');
    assert.equal(viRows.length, 1, 'no duplicate vi row created');
    assert.equal(viRows[0].title, 'Đã sửa');
  });

  it('UPDATE base fields: agenda/date/image persist on the events row', async () => {
    const slug = `test-event-basefields-${SUFFIX}`;
    const created = await api('POST', '/items/events', {
      ...baseFields({ slug }),
      translations: [{ languages_code: 'vi', ...translationFields('Base fields') }]
    });
    createdIds.push(created.id);

    const agenda = [
      { time: '09:00', title: 'Khai mạc' },
      { time: '10:00', title: 'Diễn giả chính' }
    ];
    const newDate = '2026-12-31';

    // Fetch existing translation row so we go through the update branch
    const full1 = await api(
      'GET',
      `/items/events/${created.id}?fields=translations.id,translations.languages_code`
    );
    const viRow = full1.translations.find((t: any) => t.languages_code === 'vi');

    await api('PATCH', `/items/events/${created.id}`, {
      ...baseFields({ slug, agenda, date: newDate }),
      translations: {
        update: [{ id: viRow.id, ...translationFields('Base fields') }],
        create: [],
        delete: []
      }
    });

    const r = await api('GET', `/items/events/${created.id}?fields=agenda,date`);
    assert.deepEqual(r.agenda, agenda);
    assert.ok(r.date?.startsWith('2026-12-31'), `date persisted, got ${r.date}`);
  });

  it('TRANSLATED ARRAYS: en with empty agenda does not wipe base/vi agenda', async () => {
    const slug = `test-event-i18n-fallback-${SUFFIX}`;
    const viAgenda = [{ time: '09:00', title: 'Khai mạc', description: 'Chào mừng' }];
    const viSpeakers = [{ name: 'A', title: 'CEO', company: 'X', bio: 'b' }];

    // Create with vi populated. Mirror to base like saveEvent does when locale === 'vi'.
    const created = await api('POST', '/items/events', {
      ...baseFields({ slug, agenda: viAgenda, speakers: viSpeakers, organizer_name: 'ULink' }),
      translations: [
        {
          languages_code: 'vi',
          ...translationFields('VI', { agenda: viAgenda, speakers: viSpeakers, organizer_name: 'ULink' })
        }
      ]
    });
    createdIds.push(created.id);

    // Now add EN translation with EMPTY agenda/speakers — must NOT touch base columns.
    // Non-vi save omits the array/organizer_name base fields (mirrors saveEvent).
    const nonViBase = baseFields({ slug });
    delete (nonViBase as any).agenda;
    delete (nonViBase as any).speakers;
    delete (nonViBase as any).hosts;
    delete (nonViBase as any).highlights;
    delete (nonViBase as any).benefits;
    delete (nonViBase as any).organizer_name;
    await api('PATCH', `/items/events/${created.id}`, {
      ...nonViBase,
      translations: {
        create: [{ languages_code: 'en', ...translationFields('EN', { agenda: [], speakers: [] }) }],
        update: [],
        delete: []
      }
    });

    const r = await api(
      'GET',
      `/items/events/${created.id}?fields=agenda,speakers,organizer_name,translations.languages_code,translations.agenda,translations.speakers`
    );
    assert.deepEqual(r.agenda, viAgenda, 'base agenda preserved after en save');
    assert.deepEqual(r.speakers, viSpeakers, 'base speakers preserved after en save');
    assert.equal(r.organizer_name, 'ULink');
    const en = r.translations.find((t: any) => t.languages_code === 'en');
    assert.ok(en, 'en row created');
    assert.deepEqual(en.agenda, [], 'en agenda persisted as empty');
  });

  it('TRANSLATED ARRAYS: en with populated agenda persists on en row', async () => {
    const slug = `test-event-i18n-populate-${SUFFIX}`;
    const enAgenda = [{ time: '10:00', title: 'Opening', description: 'Welcome' }];
    const enSpeakers = [{ name: 'Alice', title: 'CTO', company: 'Y', bio: 'bio' }];

    const created = await api('POST', '/items/events', {
      ...baseFields({ slug }),
      translations: [{ languages_code: 'vi', ...translationFields('VI base') }]
    });
    createdIds.push(created.id);

    await api('PATCH', `/items/events/${created.id}`, {
      ...baseFields({ slug }),
      translations: {
        create: [
          {
            languages_code: 'en',
            ...translationFields('EN', { agenda: enAgenda, speakers: enSpeakers, organizer_name: 'ULink Global' })
          }
        ],
        update: [],
        delete: []
      }
    });

    const r = await api(
      'GET',
      `/items/events/${created.id}?fields=translations.languages_code,translations.agenda,translations.speakers,translations.organizer_name`
    );
    const en = r.translations.find((t: any) => t.languages_code === 'en');
    assert.deepEqual(en.agenda, enAgenda);
    assert.deepEqual(en.speakers, enSpeakers);
    assert.equal(en.organizer_name, 'ULink Global');
  });

  it('DELETE (archive): deleteEvent sets status to archived', async () => {
    const slug = `test-event-archive-${SUFFIX}`;
    const created = await api('POST', '/items/events', {
      ...baseFields({ slug }),
      translations: [{ languages_code: 'vi', ...translationFields('Archive me') }]
    });
    createdIds.push(created.id);

    await api('PATCH', `/items/events/${created.id}`, { status: 'archived' });

    const r = await api('GET', `/items/events/${created.id}?fields=status`);
    assert.equal(r.status, 'archived');
  });
});

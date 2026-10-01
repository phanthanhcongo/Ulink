/**
 * Admin Job Openings CRUD — integration tests
 *
 * Framework: node:test (via `node --import tsx`) — matches the frontend runner.
 * Playwright is not installed at the repo root and the Next.js server actions
 * depend on `next/headers`, so we replay their EXACT payload shape (see
 * frontend/src/app/[locale]/admin/jobs/actions.ts — saveJob / deleteJob)
 * against the Directus REST API at http://localhost:8055.
 *
 * Requires a running Directus with the job_openings collection registered
 * (directus/bootstrap-jobs.mjs).
 *
 * Cleanup: created rows are hard-deleted in `after()`.
 *
 * Run:  npx tsx --test ../test/api/jobs-crud.spec.ts   (from frontend/)
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

async function api(method: string, path: string, body?: unknown, auth = true) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: {
      ...(auth ? { Authorization: `Bearer ${token}` } : {}),
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

/** Mirror baseFields() from actions.ts (base row, incl. mirrored title). */
function baseFields(overrides: Record<string, any> = {}) {
  return {
    slug: overrides.slug,
    code: null,
    department: null,
    location: null,
    employment_type: 'full_time',
    salary_range: null,
    is_urgent: false,
    deadline: null,
    sort: null,
    status: 'draft',
    title: overrides.title ?? 'Vị trí test',
    ...overrides
  };
}

/** Mirror the translationFields object built in saveJob(). */
function translationFields(title: string, overrides: Record<string, any> = {}) {
  return {
    title,
    summary: null,
    description: null,
    requirements: null,
    benefits: null,
    ...overrides
  };
}

describe('Admin Job Openings CRUD', () => {
  before(async () => {
    token = await login();
  });

  after(async () => {
    for (const id of createdIds) {
      try {
        await api('DELETE', `/items/job_openings/${id}`);
      } catch (e) {
        console.warn(`Cleanup: could not delete job_openings/${id}:`, (e as Error).message);
      }
    }
  });

  it('CREATE: saves a new job with vi translation', async () => {
    const slug = `test-job-${SUFFIX}`;
    const created = await api('POST', '/items/job_openings', {
      ...baseFields({ slug, title: 'Vị trí test', department: 'kinh-doanh', status: 'published' }),
      translations: [
        { languages_code: 'vi', ...translationFields('Vị trí test', { summary: 'Tóm tắt' }) }
      ]
    });
    assert.ok(created?.id);
    createdIds.push(created.id);

    const full = await api(
      'GET',
      `/items/job_openings/${created.id}?fields=id,slug,status,department,title,translations.languages_code,translations.title,translations.summary`
    );
    assert.equal(full.slug, slug);
    assert.equal(full.department, 'kinh-doanh');
    assert.equal(full.title, 'Vị trí test', 'base title mirrored');
    assert.equal(full.translations.length, 1);
    assert.equal(full.translations[0].languages_code, 'vi');
    assert.equal(full.translations[0].summary, 'Tóm tắt');
  });

  it('UPDATE (add new locale): saving locale=en creates en row, vi untouched', async () => {
    const slug = `test-job-addlocale-${SUFFIX}`;
    const created = await api('POST', '/items/job_openings', {
      ...baseFields({ slug, title: 'Chỉ vi' }),
      translations: [{ languages_code: 'vi', ...translationFields('Chỉ vi') }]
    });
    createdIds.push(created.id);

    await api('PATCH', `/items/job_openings/${created.id}`, {
      ...baseFields({ slug, title: 'Chỉ vi' }),
      translations: {
        create: [{ languages_code: 'en', ...translationFields('EN job') }],
        update: [],
        delete: []
      }
    });

    const full = await api(
      'GET',
      `/items/job_openings/${created.id}?fields=translations.languages_code,translations.title`
    );
    const byLocale = Object.fromEntries(full.translations.map((t: any) => [t.languages_code, t.title]));
    assert.equal(byLocale.vi, 'Chỉ vi', 'vi row must remain');
    assert.equal(byLocale.en, 'EN job', 'en row must be added');
  });

  it('UPDATE (same locale): updating vi in place, no duplicate row', async () => {
    const slug = `test-job-samelocale-${SUFFIX}`;
    const created = await api('POST', '/items/job_openings', {
      ...baseFields({ slug, title: 'Ban đầu' }),
      translations: [{ languages_code: 'vi', ...translationFields('Ban đầu') }]
    });
    createdIds.push(created.id);

    let full = await api(
      'GET',
      `/items/job_openings/${created.id}?fields=translations.id,translations.languages_code`
    );
    const viRow = full.translations.find((t: any) => t.languages_code === 'vi');

    await api('PATCH', `/items/job_openings/${created.id}`, {
      ...baseFields({ slug, title: 'Đã sửa' }),
      translations: {
        update: [{ id: viRow.id, ...translationFields('Đã sửa') }],
        create: [],
        delete: []
      }
    });

    full = await api(
      'GET',
      `/items/job_openings/${created.id}?fields=translations.languages_code,translations.title`
    );
    const viRows = full.translations.filter((t: any) => t.languages_code === 'vi');
    assert.equal(viRows.length, 1, 'no duplicate vi row created');
    assert.equal(viRows[0].title, 'Đã sửa');
  });

  it('UPDATE base fields: is_urgent/deadline/sort/salary/employment_type persist', async () => {
    const slug = `test-job-basefields-${SUFFIX}`;
    const created = await api('POST', '/items/job_openings', {
      ...baseFields({ slug, title: 'Base fields' }),
      translations: [{ languages_code: 'vi', ...translationFields('Base fields') }]
    });
    createdIds.push(created.id);

    const full1 = await api(
      'GET',
      `/items/job_openings/${created.id}?fields=translations.id,translations.languages_code`
    );
    const viRow = full1.translations.find((t: any) => t.languages_code === 'vi');

    await api('PATCH', `/items/job_openings/${created.id}`, {
      ...baseFields({
        slug,
        title: 'Base fields',
        is_urgent: true,
        deadline: '2026-12-31',
        sort: 7,
        salary_range: '25 - 35 triệu',
        employment_type: 'contract',
        location: 'Hà Nội'
      }),
      translations: {
        update: [{ id: viRow.id, ...translationFields('Base fields') }],
        create: [],
        delete: []
      }
    });

    const r = await api(
      'GET',
      `/items/job_openings/${created.id}?fields=is_urgent,deadline,sort,salary_range,employment_type,location`
    );
    assert.equal(r.is_urgent, true);
    assert.ok(r.deadline?.startsWith('2026-12-31'), `deadline persisted, got ${r.deadline}`);
    assert.equal(r.sort, 7);
    assert.equal(r.salary_range, '25 - 35 triệu');
    assert.equal(r.employment_type, 'contract');
    assert.equal(r.location, 'Hà Nội');
  });

  it('DELETE (archive): deleteJob sets status to archived', async () => {
    const slug = `test-job-archive-${SUFFIX}`;
    const created = await api('POST', '/items/job_openings', {
      ...baseFields({ slug, title: 'Archive me', status: 'published' }),
      translations: [{ languages_code: 'vi', ...translationFields('Archive me') }]
    });
    createdIds.push(created.id);

    await api('PATCH', `/items/job_openings/${created.id}`, { status: 'archived' });

    const r = await api('GET', `/items/job_openings/${created.id}?fields=status`);
    assert.equal(r.status, 'archived');
  });

  it('PUBLIC read: published job is visible unauthenticated, archived is hidden', async () => {
    const slug = `test-job-public-${SUFFIX}`;
    const created = await api('POST', '/items/job_openings', {
      ...baseFields({ slug, title: 'Public job', status: 'published' }),
      translations: [{ languages_code: 'vi', ...translationFields('Public job') }]
    });
    createdIds.push(created.id);

    // Unauthenticated read via the public policy permission.
    const visible = await api(
      'GET',
      `/items/job_openings?filter[slug][_eq]=${slug}&fields=id,slug,status`,
      undefined,
      false
    );
    assert.equal(visible.length, 1, 'published job visible to public');
    assert.equal(visible[0].slug, slug);

    // Archive it, then confirm the public status=published filter excludes it.
    await api('PATCH', `/items/job_openings/${created.id}`, { status: 'archived' });
    const afterArchive = await api(
      'GET',
      `/items/job_openings?filter[slug][_eq]=${slug}&filter[status][_eq]=published&fields=id`,
      undefined,
      false
    );
    assert.equal(afterArchive.length, 0, 'archived job excluded from public published list');
  });
});

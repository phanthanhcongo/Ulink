/**
 * Admin Articles (blog_posts) CRUD — integration tests
 *
 * Framework: node:test (via `node --import tsx`) — matches the frontend runner
 * defined in `frontend/package.json`. Playwright-based `.spec.ts` files exist in
 * this folder but Playwright is not installed at the repo root, so those cannot
 * be executed as-is. These tests use plain fetch against the Directus REST API
 * at http://localhost:8055 with the admin credentials from `.env`.
 *
 * Why REST instead of calling `saveArticle`/`deleteArticle` directly:
 *   The server actions in
 *   `frontend/src/app/[locale]/admin/articles/actions.ts` depend on
 *   `next/headers`' `cookies()` and `getCurrentUser()`, which only work inside
 *   a Next.js request context. We replay the SAME payload shape that
 *   `saveArticle` sends to Directus (including the M2M
 *   `{ create, update, delete }` translations envelope) so this suite still
 *   guards against the regression where sending a plain replacement array
 *   wiped sibling-language translation rows.
 *
 * Cleanup: every test hard-deletes the rows it creates (and its translation
 * rows) in `after()`, so nothing lingers in the DB.
 *
 * Run from repo root:
 *   node --import ./frontend/node_modules/tsx/dist/esm/index.mjs --test test/api/articles-crud.spec.ts
 * or from frontend/:
 *   npx tsx --test ../test/api/articles-crud.spec.ts
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

/** Replays the payload shape produced by saveArticle() (CREATE branch). */
function createPayload(locale: string, slug: string, title: string) {
  return {
    slug,
    cover: null,
    author: null,
    author_role: null,
    author_avatar: null,
    category: null,
    published_at: null,
    status: 'draft' as const,
    is_featured: false,
    translations: [
      {
        languages_code: locale,
        title,
        description: null,
        body: null,
        meta_title: null,
        meta_description: null
      }
    ]
  };
}

/** Replays the payload shape produced by saveArticle() (UPDATE branch). */
function updatePayload(opts: {
  slug: string;
  locale: string;
  translationForLocale?: { id: number };
  title: string;
  is_featured?: boolean;
  status?: 'published' | 'draft' | 'archived';
}) {
  const translationFields = {
    title: opts.title,
    description: null,
    body: null,
    meta_title: null,
    meta_description: null
  };
  const translations = opts.translationForLocale
    ? {
        update: [{ id: opts.translationForLocale.id, ...translationFields }],
        create: [],
        delete: []
      }
    : {
        create: [{ languages_code: opts.locale, ...translationFields }],
        update: [],
        delete: []
      };
  return {
    slug: opts.slug,
    cover: null,
    author: null,
    author_role: null,
    author_avatar: null,
    category: null,
    published_at: null,
    status: opts.status ?? 'draft',
    is_featured: !!opts.is_featured,
    translations
  };
}

describe('Admin Articles (blog_posts) CRUD', () => {
  before(async () => {
    token = await login();
  });

  after(async () => {
    // Hard-delete created rows (translations cascade in Directus M2M setup).
    for (const id of createdIds) {
      try {
        await api('DELETE', `/items/blog_posts/${id}`);
      } catch (e) {
        console.warn(`Cleanup: could not delete blog_posts/${id}:`, (e as Error).message);
      }
    }
  });

  it('CREATE: saves a new article with one translation for locale vi', async () => {
    const slug = `test-article-${SUFFIX}`;
    const created = await api('POST', '/items/blog_posts', createPayload('vi', slug, 'Bài test'));
    assert.ok(created?.id, 'must return an id');
    createdIds.push(created.id);

    // READ back with translations populated
    const fetched = await api(
      'GET',
      `/items/blog_posts/${created.id}?fields=id,slug,status,is_featured,translations.id,translations.languages_code,translations.title`
    );
    assert.equal(fetched.slug, slug);
    assert.equal(fetched.status, 'draft');
    assert.equal(fetched.translations.length, 1);
    assert.equal(fetched.translations[0].languages_code, 'vi');
    assert.equal(fetched.translations[0].title, 'Bài test');
  });

  it('UPDATE (same locale): updating vi title does NOT delete other-locale translations', async () => {
    const slug = `test-article-multi-${SUFFIX}`;
    // Seed with vi
    const created = await api('POST', '/items/blog_posts', createPayload('vi', slug, 'Bài vi'));
    createdIds.push(created.id);

    // Add an en translation directly (simulate previously-authored en content)
    await api('POST', '/items/blog_posts_translations', {
      blog_posts_id: created.id,
      languages_code: 'en',
      title: 'EN post'
    });

    // Fetch to get the vi translation row id (mimicking saveArticle's readItems step)
    let full = await api(
      'GET',
      `/items/blog_posts/${created.id}?fields=id,translations.id,translations.languages_code,translations.title`
    );
    const viRow = full.translations.find((t: any) => t.languages_code === 'vi');
    assert.ok(viRow, 'vi translation must exist');

    // Update vi via the M2M { update } envelope — the fix under regression test
    await api(
      'PATCH',
      `/items/blog_posts/${created.id}`,
      updatePayload({
        slug,
        locale: 'vi',
        translationForLocale: viRow,
        title: 'Bài vi UPDATED'
      })
    );

    full = await api(
      'GET',
      `/items/blog_posts/${created.id}?fields=id,translations.languages_code,translations.title`
    );
    const langs = full.translations.map((t: any) => t.languages_code).sort();
    assert.deepEqual(langs, ['en', 'vi'], 'both en and vi translations must remain');
    const enRow = full.translations.find((t: any) => t.languages_code === 'en');
    assert.equal(enRow.title, 'EN post', 'en row must be untouched');
    const viRow2 = full.translations.find((t: any) => t.languages_code === 'vi');
    assert.equal(viRow2.title, 'Bài vi UPDATED');
  });

  it('UPDATE (new locale): saving locale=en on a vi-only article inserts en row, keeps vi', async () => {
    const slug = `test-article-addlocale-${SUFFIX}`;
    const created = await api('POST', '/items/blog_posts', createPayload('vi', slug, 'Chỉ có vi'));
    createdIds.push(created.id);

    // No existing en translation → payload uses { create: [...] }
    await api(
      'PATCH',
      `/items/blog_posts/${created.id}`,
      updatePayload({
        slug,
        locale: 'en',
        translationForLocale: undefined,
        title: 'Now with EN'
      })
    );

    const full = await api(
      'GET',
      `/items/blog_posts/${created.id}?fields=translations.languages_code,translations.title`
    );
    const byLocale = Object.fromEntries(
      full.translations.map((t: any) => [t.languages_code, t.title])
    );
    assert.equal(byLocale.vi, 'Chỉ có vi', 'vi row must be untouched');
    assert.equal(byLocale.en, 'Now with EN', 'en row must be created');
  });

  it('UPDATE is_featured: toggles true then false and persists', async () => {
    const slug = `test-article-featured-${SUFFIX}`;
    const created = await api('POST', '/items/blog_posts', createPayload('vi', slug, 'Feat'));
    createdIds.push(created.id);

    const full = await api(
      'GET',
      `/items/blog_posts/${created.id}?fields=translations.id,translations.languages_code`
    );
    const viRow = full.translations.find((t: any) => t.languages_code === 'vi');

    await api(
      'PATCH',
      `/items/blog_posts/${created.id}`,
      updatePayload({ slug, locale: 'vi', translationForLocale: viRow, title: 'Feat', is_featured: true })
    );
    let r = await api('GET', `/items/blog_posts/${created.id}?fields=is_featured`);
    assert.equal(r.is_featured, true);

    await api(
      'PATCH',
      `/items/blog_posts/${created.id}`,
      updatePayload({ slug, locale: 'vi', translationForLocale: viRow, title: 'Feat', is_featured: false })
    );
    r = await api('GET', `/items/blog_posts/${created.id}?fields=is_featured`);
    assert.equal(r.is_featured, false);
  });

  it('DELETE (archive): deleteArticle sets status to archived, row still exists', async () => {
    const slug = `test-article-archive-${SUFFIX}`;
    const created = await api('POST', '/items/blog_posts', createPayload('vi', slug, 'Archive me'));
    createdIds.push(created.id);

    // Replays deleteArticle(): PATCH status=archived
    await api('PATCH', `/items/blog_posts/${created.id}`, { status: 'archived' });

    const r = await api('GET', `/items/blog_posts/${created.id}?fields=status`);
    assert.equal(r.status, 'archived');
  });
});

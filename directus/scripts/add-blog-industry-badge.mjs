/**
 * Add `industry` (M2O → industries) and `badge` (string, translatable)
 * fields to `blog_posts`, so resource/case-study articles can be filtered
 * per industry and carry a per-card badge label.
 *
 * Idempotent: skips anything that already exists.
 *
 * Usage:
 *   cd directus && node scripts/add-blog-industry-badge.mjs
 */
import { createField, createRelation, readFieldsByCollection } from '@directus/sdk';
import { createDirectusClient, loginAdmin } from '../lib/config.mjs';

const client = createDirectusClient();

async function existingFields(collection) {
  try {
    const fields = await client.request(readFieldsByCollection(collection));
    return new Set(fields.map((f) => f.field));
  } catch {
    return new Set();
  }
}

async function ensureField(collection, field, spec, label) {
  const have = await existingFields(collection);
  if (have.has(field)) {
    console.log(`   =  ${collection}.${field} (exists)`);
    return;
  }
  try {
    await client.request(createField(collection, spec));
    console.log(`   ✅ ${collection}.${field} created ${label ? `(${label})` : ''}`);
  } catch (err) {
    console.warn(`   ⚠  ${collection}.${field}: ${err?.errors?.[0]?.message ?? err.message}`);
  }
}

async function ensureRelation(collection, field, relatedCollection) {
  try {
    await client.request(
      createRelation({
        collection,
        field,
        related_collection: relatedCollection,
        meta: { many_collection: collection, many_field: field, one_collection: relatedCollection },
        schema: { on_delete: 'SET NULL' }
      })
    );
    console.log(`   ✅ relation ${collection}.${field} → ${relatedCollection}`);
  } catch (err) {
    const msg = err?.errors?.[0]?.message ?? err.message;
    if (/exist/i.test(msg)) {
      console.log(`   =  relation ${collection}.${field} → ${relatedCollection} (exists)`);
    } else {
      console.warn(`   ⚠  relation ${collection}.${field}: ${msg}`);
    }
  }
}

async function main() {
  await loginAdmin(client);
  console.log('🔑 Authenticated with Directus\n');
  console.log('── Adding blog_posts.industry + blog_posts.badge ──\n');

  // 1. industry (M2O → industries)
  await ensureField('blog_posts', 'industry', {
    field: 'industry',
    type: 'integer',
    meta: { interface: 'select-dropdown-m2o', special: ['m2o'], width: 'half', note: 'Ngành liên quan (dùng cho card ở trang /industries)' },
    schema: {}
  }, 'M2O → industries');
  await ensureRelation('blog_posts', 'industry', 'industries');

  // 2. badge (string) on parent + translations
  await ensureField('blog_posts', 'badge', {
    field: 'badge',
    type: 'string',
    meta: { interface: 'input', width: 'half', note: 'Nhãn hiển thị trên card (base VI)' },
    schema: {}
  }, 'base badge');

  await ensureField('blog_posts_translations', 'badge', {
    field: 'badge',
    type: 'string',
    meta: { interface: 'input', width: 'full' },
    schema: {}
  }, 'translated badge');

  console.log('\n✅ Done. Restart Directus if fields do not appear immediately.\n');
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Failed:', err);
  process.exit(1);
});

/**
 * Fix orphaned translation collections on Railway.
 * 
 * Problem: directus_collections has metadata entries for *_translations tables
 * but the actual PostgreSQL tables don't exist. This causes createCollection()
 * to think they exist (and skip creation) while GET /fields returns 403.
 *
 * Solution: Delete the orphan metadata from directus_collections and
 * directus_fields, then re-run bootstrap to create them properly.
 *
 * Usage:
 *   node scripts/fix-orphan-translations.mjs <URL> <EMAIL> <PASSWORD>
 */
import { createDirectus, rest, authentication, customEndpoint } from '@directus/sdk';

const [,, url, email, password] = process.argv;
if (!url || !email || !password) {
  console.error('Usage: node scripts/fix-orphan-translations.mjs <URL> <EMAIL> <PASSWORD>');
  process.exit(1);
}

console.log(`\nConnecting to: ${url}\n`);
const client = createDirectus(url).with(authentication('json')).with(rest());
await client.login(email, password);
console.log('✅ Login successful\n');

// These are the translation collections that need to be fixed
const TRANSLATION_COLLECTIONS = [
  'standards_translations',
  'regional_hubs_translations',
  'hub_industrial_zones_translations',
  'blog_posts_translations',
  'case_studies_translations',
  'iso_certifications_translations',
  'pages_translations',
  'site_settings_translations',
  'homepage_translations',
];

// Also include collections that DID work (already exist) — we'll check all
const ALL_TRANSLATION_COLLECTIONS = [
  'hero_banners_translations',
  'partners_translations',
  'product_categories_translations',
  'products_translations',
  'industries_translations',
  ...TRANSLATION_COLLECTIONS
];

console.log('=== Step 1: Check which translation collections actually exist ===\n');
const broken = [];
const working = [];

for (const col of ALL_TRANSLATION_COLLECTIONS) {
  try {
    const fields = await client.request(
      customEndpoint({ path: `/fields/${col}`, method: 'GET' })
    );
    working.push(col);
    console.log(`  ✅ ${col} — exists (${fields.length} fields)`);
  } catch {
    broken.push(col);
    console.log(`  ❌ ${col} — BROKEN (orphan metadata, no table)`);
  }
}

if (broken.length === 0) {
  console.log('\n✅ All translation collections exist! No fix needed.');
  process.exit(0);
}

console.log(`\n=== Step 2: Delete orphan metadata for ${broken.length} broken collections ===\n`);

for (const col of broken) {
  // Delete from directus_collections
  try {
    await client.request(
      customEndpoint({
        path: `/collections/${col}`,
        method: 'DELETE'
      })
    );
    console.log(`  🗑️  Deleted collection metadata: ${col}`);
  } catch (err) {
    const msg = err?.errors?.[0]?.message || err?.message || '';
    console.log(`  ⚠️  Could not delete ${col} metadata: ${msg}`);
  }
}

console.log('\n=== Step 3: Now re-creating broken collections via bootstrap API ===\n');

// Import the collection and relation definitions
const { TRANSLATION_COLLECTION_DEFS } = await import('../lib/i18n.mjs');
const { TRANSLATION_RELATION_DEFS } = await import('../lib/i18n.mjs');
const { createCollection, createRelation } = await import('@directus/sdk');

for (const def of TRANSLATION_COLLECTION_DEFS) {
  if (!broken.includes(def.collection)) continue;
  
  try {
    await client.request(createCollection(def));
    console.log(`  ✅ Created: ${def.collection}`);
  } catch (err) {
    const msg = err?.errors?.[0]?.message || err?.message || '';
    console.log(`  ❌ Failed to create ${def.collection}: ${msg}`);
  }
}

console.log('\n=== Step 4: Create relations for ALL translation collections ===\n');

for (const def of TRANSLATION_RELATION_DEFS) {
  try {
    await client.request(createRelation(def));
    console.log(`  ✅ Relation: ${def.collection}.${def.field} → ${def.related_collection}`);
  } catch (err) {
    const msg = err?.errors?.[0]?.message || err?.message || '';
    // Try to PATCH if it already exists
    if (msg.includes('already exists') || msg.includes('unique')) {
      console.log(`  =  Relation: ${def.collection}.${def.field} (already exists)`);
    } else {
      console.log(`  ❌ Relation: ${def.collection}.${def.field} failed: ${msg}`);
    }
  }
}

console.log('\n=== Step 5: Verify blog_posts_translations ===\n');
try {
  const fields = await client.request(
    customEndpoint({ path: '/fields/blog_posts_translations', method: 'GET' })
  );
  console.log(`✅ blog_posts_translations now has ${fields.length} fields:`);
  fields.forEach(f => console.log(`  - ${f.field} (${f.type})`));
} catch (err) {
  console.log('❌ blog_posts_translations still broken!', err?.errors?.[0]?.message);
}

// Check relation
try {
  const rels = await client.request(
    customEndpoint({ path: '/relations', method: 'GET' })
  );
  const blogRels = rels.filter(r =>
    r.collection?.includes('blog_posts') || r.related_collection?.includes('blog_posts')
  );
  if (blogRels.length > 0) {
    console.log('\n✅ blog_posts relations:');
    blogRels.forEach(r => console.log(`  ${r.collection}.${r.field} → ${r.related_collection}`));
  } else {
    console.log('\n❌ Still no relations for blog_posts');
  }
} catch (err) {
  console.log('Error checking relations:', err?.errors?.[0]?.message);
}

process.exit(0);

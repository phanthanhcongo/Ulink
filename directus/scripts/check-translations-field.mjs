/**
 * Diagnostic script: Check the metadata of the `translations` field
 * on `blog_posts` in a running Directus instance.
 *
 * Usage:
 *   DIRECTUS_PUBLIC_URL=https://xxx.up.railway.app \
 *   DIRECTUS_ADMIN_EMAIL=admin@ulink.com \
 *   DIRECTUS_ADMIN_PASSWORD=change-me-admin-password \
 *   node scripts/check-translations-field.mjs
 */
import { createDirectusClient, loginAdmin, DIRECTUS_URL } from '../lib/config.mjs';
import { customEndpoint } from '@directus/sdk';

const client = createDirectusClient();
await loginAdmin(client);
console.log(`Connected to ${DIRECTUS_URL}\n`);

// 1. Check directus_fields metadata for blog_posts.translations
console.log('=== blog_posts fields from Directus API ===');
const fields = await client.request(
  customEndpoint({ path: '/fields/blog_posts', method: 'GET' })
);

const translationsField = fields.find(f => f.field === 'translations');
if (translationsField) {
  console.log('translations field found:');
  console.log(JSON.stringify(translationsField, null, 2));
} else {
  console.log('⚠️  translations field NOT FOUND in blog_posts metadata!');
}

console.log('\n=== All blog_posts field names ===');
console.log(fields.map(f => `  ${f.field} (type=${f.type}, special=${JSON.stringify(f.meta?.special)})`).join('\n'));

// 2. Check if blog_posts_translations table exists
console.log('\n=== blog_posts_translations fields ===');
try {
  const transFields = await client.request(
    customEndpoint({ path: '/fields/blog_posts_translations', method: 'GET' })
  );
  console.log(transFields.map(f => `  ${f.field} (type=${f.type})`).join('\n'));
} catch (err) {
  console.log('⚠️  blog_posts_translations collection NOT FOUND!', err?.message || err);
}

// 3. Check relations for blog_posts
console.log('\n=== Relations involving blog_posts ===');
try {
  const relations = await client.request(
    customEndpoint({ path: '/relations/blog_posts', method: 'GET' })
  );
  console.log(JSON.stringify(relations, null, 2));
} catch (err) {
  console.log('No relations found or error:', err?.message || err);
}

process.exit(0);

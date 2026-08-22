/**
 * Standalone diagnostic — does NOT use config.mjs or dotenv.
 * Directly connects to the provided URL.
 *
 * Usage (CMD):
 *   node scripts/check-railway.mjs https://directus-production-8018.up.railway.app admin@ulink.com change-me-admin-password
 */
import { createDirectus, rest, authentication, customEndpoint } from '@directus/sdk';

const [,, url, email, password] = process.argv;
if (!url || !email || !password) {
  console.error('Usage: node scripts/check-railway.mjs <URL> <EMAIL> <PASSWORD>');
  process.exit(1);
}

console.log(`Connecting to: ${url}`);
console.log(`Email: ${email}`);

const client = createDirectus(url).with(authentication('json')).with(rest());

try {
  await client.login(email, password);
  console.log('✅ Login successful\n');
} catch (err) {
  console.error('❌ Login failed:', err?.errors?.[0]?.message || err?.message || err);
  process.exit(1);
}

// 1. Check blog_posts fields
console.log('=== blog_posts fields ===');
try {
  const fields = await client.request(
    customEndpoint({ path: '/fields/blog_posts', method: 'GET' })
  );
  const translationsField = fields.find(f => f.field === 'translations');
  if (translationsField) {
    console.log(`translations: type=${translationsField.type}, special=${JSON.stringify(translationsField.meta?.special)}`);
  } else {
    console.log('⚠️  translations field NOT FOUND!');
  }
  console.log('All fields:', fields.map(f => `${f.field}(${f.type})`).join(', '));
} catch (err) {
  console.log('⚠️  blog_posts collection NOT FOUND!', err?.errors?.[0]?.message || err?.message);
}

// 2. Check blog_posts_translations
console.log('\n=== blog_posts_translations ===');
try {
  const transFields = await client.request(
    customEndpoint({ path: '/fields/blog_posts_translations', method: 'GET' })
  );
  console.log('Fields:', transFields.map(f => f.field).join(', '));
} catch (err) {
  console.log('⚠️  NOT FOUND!', err?.errors?.[0]?.message || err?.message);
}

// 3. Check relations
console.log('\n=== Relations for blog_posts ===');
try {
  const relations = await client.request(
    customEndpoint({ path: '/relations', method: 'GET' })
  );
  const blogRelations = relations.filter(r =>
    r.collection?.includes('blog_posts') || r.related_collection?.includes('blog_posts')
  );
  if (blogRelations.length > 0) {
    blogRelations.forEach(r => {
      console.log(`  ${r.collection}.${r.field} → ${r.related_collection} (one_field: ${r.meta?.one_field || 'none'})`);
    });
  } else {
    console.log('⚠️  NO relations found for blog_posts!');
  }
} catch (err) {
  console.log('Error:', err?.errors?.[0]?.message || err?.message);
}

process.exit(0);

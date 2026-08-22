import { createDirectus, rest, authentication, readItems } from '@directus/sdk';

const url = process.env.DIRECTUS_URL || 'http://localhost:8055';
const email = process.env.DIRECTUS_ADMIN_EMAIL;
const password = process.env.DIRECTUS_ADMIN_PASSWORD;

if (!email || !password) {
  console.error('Error: DIRECTUS_ADMIN_EMAIL and DIRECTUS_ADMIN_PASSWORD must be set in the environment.');
  process.exit(1);
}

console.log(`Running diagnostic against Directus: ${url}`);

const client = createDirectus(url).with(authentication('json')).with(rest());

try {
  await client.login(email, password);
  console.log('✅ Logged in successfully as Admin.');

  const collections = [
    'products',
    'product_categories',
    'product_skus',
    'regional_hubs',
    'product_attributes',
    'rfq_requests',
    'sample_requests',
    'contact_requests',
    'languages'
  ];

  console.log('\n=== Collection Item Counts ===');
  for (const coll of collections) {
    try {
      const items = await client.request(readItems(coll, { limit: -1 }));
      console.log(`- ${coll}: ${items.length} items`);
      if (items.length > 0 && coll === 'products') {
        console.log(`  Sample product: id=${items[0].id}, name="${items[0].name}", slug="${items[0].slug}", category=${JSON.stringify(items[0].category)}`);
      }
    } catch (err) {
      console.log(`❌ Error reading collection "${coll}":`, err.message);
    }
  }

  // Also query using unauthenticated client to check public permissions
  console.log('\n=== Public (Unauthenticated) Access Check ===');
  const publicClient = createDirectus(url).with(rest());
  for (const coll of collections) {
    try {
      const items = await publicClient.request(readItems(coll, { limit: 1 }));
      console.log(`- ${coll}: ✅ Accessible (found ${items.length} items)`);
    } catch (err) {
      console.log(`- ${coll}: ❌ NOT accessible (${err.message})`);
    }
  }

} catch (err) {
  console.error('Diagnostic error:', err.message);
}

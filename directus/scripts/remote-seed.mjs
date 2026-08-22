/**
 * Seed data only — bypasses config.mjs dotenv entirely.
 * Connects directly to the remote Directus instance.
 *
 * Usage:
 *   node scripts/remote-seed.mjs <URL> <EMAIL> <PASSWORD>
 */
import { createDirectus, rest, authentication, createItem, readItems, updateItem } from '@directus/sdk';
import path from 'path';
import { fileURLToPath } from 'url';

const [,, url, email, password] = process.argv;
if (!url || !email || !password) {
  console.error('Usage: node scripts/remote-seed.mjs <URL> <EMAIL> <PASSWORD>');
  process.exit(1);
}

console.log(`\n🌱 Running seed against: ${url}\n`);

// Create client pointing DIRECTLY at the remote URL — bypass config.mjs dotenv
const client = createDirectus(url).with(authentication('json')).with(rest());
await client.login(email, password);
console.log(`Authenticated as ${email} @ ${url}`);

// Now we need to set env vars so downstream modules (seed files) that import config.mjs
// don't break. But since config.mjs already loaded (dotenv already ran), we need to
// FORCE override the env vars AFTER dotenv already contaminated them.
process.env.DIRECTUS_PUBLIC_URL = url;
process.env.DIRECTUS_ADMIN_EMAIL = email;
process.env.DIRECTUS_ADMIN_PASSWORD = password;
// For seed modules that use direct PostgreSQL (folder-db.mjs, db-indexes.mjs, seed_images.mjs)
process.env.DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'postgresql://postgres:NmHrdccBnCBDFHmmhntIhdLVUeKVcwab@tokaido.proxy.rlwy.net:59913/railway';

// Import helpers and seed modules AFTER env is set
// But config.mjs is already cached from the SDK import chain...
// So we create helpers with OUR client, not config.mjs's client
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { createEnsureHelpers } = await import('../lib/ensure-helpers.mjs');
const helpers = createEnsureHelpers(client);

// Import seed modules
const { ensureFolderTree } = await import('../lib/folder-db.mjs');
const { DEFAULT_LOCALE, LOCALES } = await import('../lib/i18n.mjs');
const { MEDIA_POLICY } = await import('../lib/media-policy.mjs');
const { seedGeography } = await import('../seed/geography.mjs');
const { seedInitialContent } = await import('../seed/initial_content.mjs');
const { seedDemoCommerce } = await import('../seed/demo_commerce.mjs');
const { seedAdditionalContent } = await import('../seed/additional_content.mjs');
const { seedProductAttributes } = await import('../seed/product_attributes.mjs');
const { seedProductImages } = await import('../seed/seed_images.mjs');
const { applyDbIndexes } = await import('../lib/db-indexes.mjs');
const { SALES_ROLE_ID, FRONTEND_SERVICE_ROLE_ID } = await import('../lib/constants.mjs');

async function ensureLanguages() {
  for (const locale of LOCALES) {
    const existing = await client.request(
      readItems('languages', {
        filter: { code: { _eq: locale.code } },
        fields: ['code'],
        limit: 1
      })
    );
    const payload = {
      code: locale.code,
      name: locale.name,
      direction: locale.direction ?? 'ltr'
    };
    if (existing.length === 0) {
      try {
        await client.request(createItem('languages', payload));
        console.log(`+  Language: ${locale.code} (created)`);
      } catch (err) {
        if (err?.errors?.[0]?.message?.includes('already exists')) {
          await client.request(updateItem('languages', locale.code, payload));
          console.log(`=  Language: ${locale.code} (updated)`);
        } else {
          throw err;
        }
      }
    } else {
      console.log(`=  Language: ${locale.code} (exists)`);
    }
  }
  console.log(`Fallback locale locked to ${DEFAULT_LOCALE}`);
}

// Step 1: Languages
console.log('\n--- Languages ---');
await ensureLanguages();

// Step 2: Folders
console.log('\n--- Folders ---');
try {
  await ensureFolderTree(MEDIA_POLICY.moduleFolders, 'media');
  console.log('Folder tree created.');
} catch (err) {
  console.warn('Folder tree warning:', err?.errors?.[0]?.message || err?.message);
}

// Step 3: Seed content
console.log('\n--- Seed Geography ---');
const geography = await seedGeography(helpers);

console.log('\n--- Seed Initial Content ---');
const ids = await seedInitialContent(helpers, client, geography);

console.log('\n--- Seed Demo Commerce ---');
await seedDemoCommerce(helpers, ids);

console.log('\n--- Seed Additional Content ---');
await seedAdditionalContent(helpers, ids, geography);

console.log('\n--- Seed Product Attributes (Unified Seeder) ---');
await seedProductAttributes(helpers, client);

console.log('\n--- Seed Product Images ---');
try {
  await seedProductImages();
} catch (err) {
  console.warn('Image seeding warning:', err?.message || err);
}

// Step 4: Frontend API user
console.log('\n--- Frontend API User ---');
const frontendToken = process.env.DIRECTUS_FRONTEND_TOKEN || 'Gb_HrRCaR8As6fFZpMuqi2Gfw9ZuEqOH';
await helpers.ensureUser({
  email: 'frontend-api@ulink.vn',
  password: 'unused-frontend-api-user',
  role: FRONTEND_SERVICE_ROLE_ID,
  first_name: 'Frontend',
  last_name: 'API',
  status: 'active',
  token: frontendToken
});
console.log(`Frontend API token provisioned.`);

// Step 5: Sales users
console.log('\n--- Sales Users ---');
const salesUsers = [
  { email: 'sales-rbac@example.com', password: 'SalesPassword123!', first_name: 'Default', last_name: 'Sales' },
  { email: 'sales-hn@example.com', password: 'SalesHNPassword123!', first_name: 'Hà Nội', last_name: 'Sales' },
  { email: 'sales-hcm@example.com', password: 'SalesHCMPassword123!', first_name: 'Hồ Chí Minh', last_name: 'Sales' },
  { email: 'sales-dn@example.com', password: 'SalesDNPassword123!', first_name: 'Đà Nẵng', last_name: 'Sales' },
];
for (const u of salesUsers) {
  await helpers.ensureUser({ ...u, role: SALES_ROLE_ID, status: 'active' });
}
console.log('Sales users seeded.');

// Step 6: DB Indexes
console.log('\n--- DB Indexes ---');
try {
  await applyDbIndexes();
  console.log('DB indexes applied.');
} catch (err) {
  console.warn('DB indexes warning:', err?.message || err);
}

console.log('\n🎉 Seed data completed successfully!\n');
process.exit(0);

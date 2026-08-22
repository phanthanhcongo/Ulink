/**
 * Comprehensive fix: Create ALL missing tables and metadata on Railway.
 * 
 * 1. Checks which tables exist vs missing
 * 2. Creates missing parent tables first, then children
 * 3. Registers metadata + relations
 *
 * Usage:
 *   node scripts/fix-all-missing.mjs "postgresql://postgres:xxx@host:port/railway"
 */
import pg from 'pg';
const { Client } = pg;

const [,, connStr] = process.argv;
if (!connStr) {
  console.error('Usage: node scripts/fix-all-missing.mjs <DATABASE_URL>');
  process.exit(1);
}

const db = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
await db.connect();
console.log('✅ Connected to PostgreSQL\n');

// ─── Step 1: Discover what's missing ───
console.log('=== Step 1: Check ALL expected tables ===\n');

// Get all tables that exist in the database
const tablesResult = await db.query(`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
  ORDER BY table_name
`);
const existingTables = new Set(tablesResult.rows.map(r => r.table_name));

// All collections defined in the bootstrap schema
// (From collections.mjs + i18n.mjs TRANSLATION_COLLECTION_DEFS)
const EXPECTED_COLLECTIONS = [
  'partners', 'industries', 'product_categories', 'products',
  'product_skus', 'product_attributes', 'product_attribute_options',
  'documents', 'vn_provinces', 'regional_hubs',
  'hub_industrial_zones', 'hub_team_members',
  'blog_posts', 'case_studies', 'iso_certifications',
  'hero_banners', 'pages', 'site_settings', 'homepage',
  'media_retention', 'media_audit_events',
  'languages',
  // Junction tables
  'products_industries', 'products_files', 'products_standards',
  'products_regional_hubs', 'products_product_attributes',
  // Commerce
  'customers', 'orders', 'order_items', 'invoices', 'deliveries',
  'rfq_requests', 'rfq_assignment_rules',
  // Other
  'standards', 'newsletter_subscribers', 'contact_requests',
  'sample_requests', 'integration_events',
  // Translation tables
  'hero_banners_translations', 'partners_translations',
  'product_categories_translations', 'products_translations',
  'industries_translations', 'standards_translations',
  'regional_hubs_translations', 'hub_industrial_zones_translations',
  'blog_posts_translations', 'case_studies_translations',
  'iso_certifications_translations', 'pages_translations',
  'site_settings_translations', 'homepage_translations'
];

const missing = [];
const present = [];
for (const col of EXPECTED_COLLECTIONS) {
  if (existingTables.has(col)) {
    present.push(col);
  } else {
    missing.push(col);
    console.log(`  ❌ MISSING: ${col}`);
  }
}
console.log(`\n  Summary: ${present.length} present, ${missing.length} missing\n`);

if (missing.length === 0) {
  console.log('✅ All tables exist! Nothing to fix.');
  await db.end();
  process.exit(0);
}

// ─── Step 2: Create missing parent tables ───
console.log('=== Step 2: Create missing tables ===\n');

// Table creation SQL — ordered: parents first, then children
// Each entry: [table_name, SQL, directus_meta]
const TABLE_DEFS = [
  // ── Parent tables ──
  ['standards', `
    CREATE TABLE IF NOT EXISTS "standards" (
      "id" SERIAL PRIMARY KEY,
      "status" VARCHAR(50) DEFAULT 'draft',
      "name" VARCHAR(255) NOT NULL,
      "slug" VARCHAR(255) UNIQUE NOT NULL,
      "description" TEXT DEFAULT NULL
    )
  `, { icon: 'verified_user', note: 'Standards', fields: [
    { field: 'id', special: null, iface: 'input', hidden: true, readonly: true },
    { field: 'status', special: null, iface: 'select-dropdown', hidden: false, readonly: false },
    { field: 'name', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'slug', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'description', special: null, iface: 'textarea', hidden: false, readonly: false },
    { field: 'translations', special: 'o2m', iface: 'list-o2m', hidden: false, readonly: false }
  ]}],

  ['hub_industrial_zones', `
    CREATE TABLE IF NOT EXISTS "hub_industrial_zones" (
      "id" SERIAL PRIMARY KEY,
      "status" VARCHAR(50) DEFAULT 'draft',
      "name" VARCHAR(255) NOT NULL,
      "hub" INTEGER REFERENCES "regional_hubs"("id") ON DELETE CASCADE,
      "image" UUID DEFAULT NULL,
      "description" TEXT DEFAULT NULL,
      "latitude" DOUBLE PRECISION DEFAULT NULL,
      "longitude" DOUBLE PRECISION DEFAULT NULL,
      "corridor" VARCHAR(255) DEFAULT NULL
    )
  `, { icon: 'factory', note: 'Hub Industrial Zones', fields: [
    { field: 'id', special: null, iface: 'input', hidden: true, readonly: true },
    { field: 'status', special: null, iface: 'select-dropdown', hidden: false, readonly: false },
    { field: 'name', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'hub', special: 'm2o', iface: 'select-dropdown-m2o', hidden: false, readonly: false },
    { field: 'image', special: 'file', iface: 'file-image', hidden: false, readonly: false },
    { field: 'description', special: null, iface: 'textarea', hidden: false, readonly: false },
    { field: 'latitude', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'longitude', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'corridor', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'translations', special: 'o2m', iface: 'list-o2m', hidden: false, readonly: false }
  ]}],

  ['hub_team_members', `
    CREATE TABLE IF NOT EXISTS "hub_team_members" (
      "id" SERIAL PRIMARY KEY,
      "hub" INTEGER REFERENCES "regional_hubs"("id") ON DELETE CASCADE,
      "name" VARCHAR(255) NOT NULL,
      "title" VARCHAR(255) DEFAULT NULL,
      "photo" UUID DEFAULT NULL,
      "email" VARCHAR(255) DEFAULT NULL,
      "phone" VARCHAR(50) DEFAULT NULL,
      "sort" INTEGER DEFAULT NULL
    )
  `, { icon: 'people', note: 'Hub Team Members', fields: [
    { field: 'id', special: null, iface: 'input', hidden: true, readonly: true },
    { field: 'hub', special: 'm2o', iface: 'select-dropdown-m2o', hidden: false, readonly: false },
    { field: 'name', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'title', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'photo', special: 'file', iface: 'file-image', hidden: false, readonly: false },
    { field: 'email', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'phone', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'sort', special: null, iface: 'input', hidden: true, readonly: false }
  ]}],

  // ── Translation tables ──
  ['standards_translations', `
    CREATE TABLE IF NOT EXISTS "standards_translations" (
      "id" SERIAL PRIMARY KEY,
      "standards_id" INTEGER NOT NULL REFERENCES "standards"("id") ON DELETE CASCADE,
      "languages_code" VARCHAR(255) NOT NULL REFERENCES "languages"("code") ON DELETE CASCADE,
      "name" VARCHAR(255) DEFAULT NULL,
      "description" TEXT DEFAULT NULL,
      UNIQUE("standards_id", "languages_code")
    )
  `, { hidden: true, note: 'standards translations', fields: [
    { field: 'id', special: null, iface: 'input', hidden: true, readonly: true },
    { field: 'standards_id', special: 'm2o', iface: 'select-dropdown-m2o', hidden: true, readonly: false },
    { field: 'languages_code', special: 'm2o', iface: 'select-dropdown-m2o', hidden: false, readonly: false },
    { field: 'name', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'description', special: null, iface: 'textarea', hidden: false, readonly: false }
  ]}],

  ['hub_industrial_zones_translations', `
    CREATE TABLE IF NOT EXISTS "hub_industrial_zones_translations" (
      "id" SERIAL PRIMARY KEY,
      "hub_industrial_zones_id" INTEGER NOT NULL REFERENCES "hub_industrial_zones"("id") ON DELETE CASCADE,
      "languages_code" VARCHAR(255) NOT NULL REFERENCES "languages"("code") ON DELETE CASCADE,
      "name" VARCHAR(255) DEFAULT NULL,
      UNIQUE("hub_industrial_zones_id", "languages_code")
    )
  `, { hidden: true, note: 'hub_industrial_zones translations', fields: [
    { field: 'id', special: null, iface: 'input', hidden: true, readonly: true },
    { field: 'hub_industrial_zones_id', special: 'm2o', iface: 'select-dropdown-m2o', hidden: true, readonly: false },
    { field: 'languages_code', special: 'm2o', iface: 'select-dropdown-m2o', hidden: false, readonly: false },
    { field: 'name', special: null, iface: 'input', hidden: false, readonly: false }
  ]}],

  // ── Junction tables ──
  ['products_standards', `
    CREATE TABLE IF NOT EXISTS "products_standards" (
      "id" SERIAL PRIMARY KEY,
      "products_id" INTEGER REFERENCES "products"("id") ON DELETE CASCADE,
      "standards_id" INTEGER REFERENCES "standards"("id") ON DELETE CASCADE
    )
  `, { hidden: true, note: 'Products ↔ Standards junction', fields: [
    { field: 'id', special: null, iface: 'input', hidden: true, readonly: true },
    { field: 'products_id', special: 'm2o', iface: 'select-dropdown-m2o', hidden: true, readonly: false },
    { field: 'standards_id', special: 'm2o', iface: 'select-dropdown-m2o', hidden: true, readonly: false }
  ]}],

  ['products_regional_hubs', `
    CREATE TABLE IF NOT EXISTS "products_regional_hubs" (
      "id" SERIAL PRIMARY KEY,
      "products_id" INTEGER REFERENCES "products"("id") ON DELETE CASCADE,
      "regional_hubs_id" INTEGER REFERENCES "regional_hubs"("id") ON DELETE CASCADE
    )
  `, { hidden: true, note: 'Products ↔ Regional Hubs junction', fields: [
    { field: 'id', special: null, iface: 'input', hidden: true, readonly: true },
    { field: 'products_id', special: 'm2o', iface: 'select-dropdown-m2o', hidden: true, readonly: false },
    { field: 'regional_hubs_id', special: 'm2o', iface: 'select-dropdown-m2o', hidden: true, readonly: false }
  ]}],

  ['sample_requests', `
    CREATE TABLE IF NOT EXISTS "sample_requests" (
      "id" SERIAL PRIMARY KEY,
      "status" VARCHAR(50) DEFAULT 'pending',
      "user" UUID DEFAULT NULL,
      "company_name" VARCHAR(255) DEFAULT NULL,
      "contact_name" VARCHAR(255) DEFAULT NULL,
      "email" VARCHAR(255) DEFAULT NULL,
      "phone" VARCHAR(50) DEFAULT NULL,
      "product_interest" TEXT DEFAULT NULL,
      "message" TEXT DEFAULT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `, { icon: 'science', note: 'Sample Requests', fields: [
    { field: 'id', special: null, iface: 'input', hidden: true, readonly: true },
    { field: 'status', special: null, iface: 'select-dropdown', hidden: false, readonly: false },
    { field: 'user', special: 'm2o', iface: 'select-dropdown-m2o', hidden: false, readonly: false },
    { field: 'company_name', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'contact_name', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'email', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'phone', special: null, iface: 'input', hidden: false, readonly: false },
    { field: 'product_interest', special: null, iface: 'textarea', hidden: false, readonly: false },
    { field: 'message', special: null, iface: 'textarea', hidden: false, readonly: false },
    { field: 'created_at', special: null, iface: 'datetime', hidden: false, readonly: true }
  ]}],
];

// Relations to create
const RELATION_DEFS = [
  // standards_translations
  { many: 'standards_translations', manyField: 'standards_id', one: 'standards', oneField: 'translations' },
  { many: 'standards_translations', manyField: 'languages_code', one: 'languages', oneField: null },
  // hub_industrial_zones_translations
  { many: 'hub_industrial_zones_translations', manyField: 'hub_industrial_zones_id', one: 'hub_industrial_zones', oneField: 'translations' },
  { many: 'hub_industrial_zones_translations', manyField: 'languages_code', one: 'languages', oneField: null },
  // hub_industrial_zones → regional_hubs
  { many: 'hub_industrial_zones', manyField: 'hub', one: 'regional_hubs', oneField: 'industrial_zones' },
  { many: 'hub_industrial_zones', manyField: 'image', one: 'directus_files', oneField: null },
  // hub_team_members → regional_hubs
  { many: 'hub_team_members', manyField: 'hub', one: 'regional_hubs', oneField: 'team_members' },
  { many: 'hub_team_members', manyField: 'photo', one: 'directus_files', oneField: null },
  // products_standards junction
  { many: 'products_standards', manyField: 'products_id', one: 'products', oneField: 'standards' },
  { many: 'products_standards', manyField: 'standards_id', one: 'standards', oneField: null },
  // products_regional_hubs junction
  { many: 'products_regional_hubs', manyField: 'products_id', one: 'products', oneField: 'regions', junctionField: 'regional_hubs_id' },
  { many: 'products_regional_hubs', manyField: 'regional_hubs_id', one: 'regional_hubs', oneField: null, junctionField: 'products_id' },
  // sample_requests → directus_users
  { many: 'sample_requests', manyField: 'user', one: 'directus_users', oneField: null },
];

for (const [tableName, sql, meta] of TABLE_DEFS) {
  if (existingTables.has(tableName)) {
    console.log(`  =  ${tableName} already exists, skipping`);
    continue;
  }

  try {
    await db.query(sql);
    console.log(`  ✅ Created table: ${tableName}`);
  } catch (err) {
    console.log(`  ❌ Failed: ${tableName}: ${err.message}`);
    continue;
  }

  // Register in directus_collections
  const colExists = await db.query(
    `SELECT 1 FROM directus_collections WHERE collection = $1`, [tableName]
  );
  if (colExists.rows.length === 0) {
    await db.query(`
      INSERT INTO directus_collections (collection, hidden, icon, note, singleton)
      VALUES ($1, $2, $3, $4, false)
    `, [tableName, meta.hidden || false, meta.icon || null, meta.note || null]);
    console.log(`  ✅ Registered collection metadata: ${tableName}`);
  }

  // Register fields
  if (meta.fields) {
    for (const fd of meta.fields) {
      const exists = await db.query(
        `SELECT 1 FROM directus_fields WHERE collection = $1 AND field = $2`,
        [tableName, fd.field]
      );
      if (exists.rows.length === 0) {
        await db.query(`
          INSERT INTO directus_fields (collection, field, special, interface, hidden, readonly, width)
          VALUES ($1, $2, $3, $4, $5, $6, 'full')
        `, [tableName, fd.field, fd.special, fd.iface, fd.hidden, fd.readonly]);
      }
    }
    console.log(`  ✅ Fields registered: ${tableName}`);
  }
}

// ─── Step 3: Create relations ───
console.log('\n=== Step 3: Create relations ===\n');

for (const rel of RELATION_DEFS) {
  const exists = await db.query(
    `SELECT 1 FROM directus_relations WHERE many_collection = $1 AND many_field = $2`,
    [rel.many, rel.manyField]
  );
  if (exists.rows.length > 0) {
    console.log(`  =  ${rel.many}.${rel.manyField} → ${rel.one} (exists)`);
    continue;
  }

  try {
    await db.query(`
      INSERT INTO directus_relations (many_collection, many_field, one_collection, one_field, junction_field)
      VALUES ($1, $2, $3, $4, $5)
    `, [rel.many, rel.manyField, rel.one, rel.oneField || null, rel.junctionField || null]);
    console.log(`  ✅ ${rel.many}.${rel.manyField} → ${rel.one}`);
  } catch (err) {
    console.log(`  ❌ ${rel.many}.${rel.manyField}: ${err.message}`);
  }
}

// ─── Step 4: Also fix relations for existing collections that were missing relations ───
console.log('\n=== Step 4: Fix missing relations for existing collections ===\n');

// Check all relations from the bootstrap schema that might be missing
const ALL_EXPECTED_RELATIONS = [
  // blog_posts cover → directus_files
  { many: 'blog_posts', manyField: 'cover', one: 'directus_files', oneField: null },
  // case_studies
  { many: 'case_studies', manyField: 'industry', one: 'industries', oneField: null },
  { many: 'case_studies', manyField: 'cover', one: 'directus_files', oneField: null },
  // iso_certifications
  { many: 'iso_certifications', manyField: 'file', one: 'directus_files', oneField: null },
  // product_categories
  { many: 'product_categories', manyField: 'parent', one: 'product_categories', oneField: null },
  // products
  { many: 'products', manyField: 'category', one: 'product_categories', oneField: null },
  // product_skus
  { many: 'product_skus', manyField: 'product', one: 'products', oneField: 'skus' },
  // documents
  { many: 'documents', manyField: 'product', one: 'products', oneField: 'documents' },
  { many: 'documents', manyField: 'file', one: 'directus_files', oneField: null },
  // customers
  { many: 'customers', manyField: 'user', one: 'directus_users', oneField: null },
  { many: 'customers', manyField: 'sales_owner', one: 'directus_users', oneField: null },
  // orders
  { many: 'orders', manyField: 'customer', one: 'customers', oneField: 'orders' },
  { many: 'orders', manyField: 'hub', one: 'regional_hubs', oneField: null },
  // order_items
  { many: 'order_items', manyField: 'order', one: 'orders', oneField: 'items' },
  { many: 'order_items', manyField: 'sku', one: 'product_skus', oneField: null },
  // invoices
  { many: 'invoices', manyField: 'customer', one: 'customers', oneField: 'invoices' },
  { many: 'invoices', manyField: 'order', one: 'orders', oneField: null },
  // deliveries
  { many: 'deliveries', manyField: 'order', one: 'orders', oneField: 'deliveries' },
  { many: 'deliveries', manyField: 'hub', one: 'regional_hubs', oneField: null },
  // rfq
  { many: 'rfq_requests', manyField: 'hub', one: 'regional_hubs', oneField: null },
  { many: 'rfq_requests', manyField: 'assigned_sales', one: 'directus_users', oneField: null },
  { many: 'rfq_requests', manyField: 'user', one: 'directus_users', oneField: null },
  { many: 'rfq_assignment_rules', manyField: 'hub', one: 'regional_hubs', oneField: null },
  { many: 'rfq_assignment_rules', manyField: 'industry', one: 'industries', oneField: null },
  { many: 'rfq_assignment_rules', manyField: 'assigned_sales', one: 'directus_users', oneField: null },
  // regional_hubs
  { many: 'regional_hubs', manyField: 'province', one: 'vn_provinces', oneField: null },
  // junction tables
  { many: 'products_industries', manyField: 'products_id', one: 'products', oneField: 'industries' },
  { many: 'products_industries', manyField: 'industries_id', one: 'industries', oneField: null },
  { many: 'products_files', manyField: 'products_id', one: 'products', oneField: 'gallery' },
  { many: 'products_files', manyField: 'directus_files_id', one: 'directus_files', oneField: null },
  { many: 'products_product_attributes', manyField: 'products_id', one: 'products', oneField: 'assigned_attributes', junctionField: 'product_attributes_id' },
  { many: 'products_product_attributes', manyField: 'product_attributes_id', one: 'product_attributes', oneField: null, junctionField: 'products_id' },
  { many: 'product_attribute_options', manyField: 'attribute', one: 'product_attributes', oneField: 'options' },
  // media
  { many: 'media_retention', manyField: 'file', one: 'directus_files', oneField: null },
  { many: 'media_retention', manyField: 'deleted_by', one: 'directus_users', oneField: null },
  { many: 'media_retention', manyField: 'hard_deleted_by', one: 'directus_users', oneField: null },
  { many: 'media_audit_events', manyField: 'actor', one: 'directus_users', oneField: null },
];

let fixedCount = 0;
for (const rel of ALL_EXPECTED_RELATIONS) {
  // Check if both collections exist as tables
  const manyExists = existingTables.has(rel.many) || rel.many === 'directus_users' || rel.many === 'directus_files';
  const oneExists = existingTables.has(rel.one) || rel.one === 'directus_users' || rel.one === 'directus_files';
  
  if (!manyExists || !oneExists) continue;

  const exists = await db.query(
    `SELECT 1 FROM directus_relations WHERE many_collection = $1 AND many_field = $2`,
    [rel.many, rel.manyField]
  );
  if (exists.rows.length > 0) continue;

  try {
    await db.query(`
      INSERT INTO directus_relations (many_collection, many_field, one_collection, one_field, junction_field)
      VALUES ($1, $2, $3, $4, $5)
    `, [rel.many, rel.manyField, rel.one, rel.oneField || null, rel.junctionField || null]);
    console.log(`  ✅ ${rel.many}.${rel.manyField} → ${rel.one}`);
    fixedCount++;
  } catch (err) {
    console.log(`  ❌ ${rel.many}.${rel.manyField}: ${err.message}`);
  }
}
if (fixedCount === 0) console.log('  All existing relations are OK.');

// ─── Step 5: Final verification ───
console.log('\n=== Step 5: Final verification ===\n');

// Re-check tables
const finalTables = await db.query(`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  ORDER BY table_name
`);
const finalSet = new Set(finalTables.rows.map(r => r.table_name));

let stillMissing = 0;
for (const col of EXPECTED_COLLECTIONS) {
  if (!finalSet.has(col)) {
    console.log(`  ❌ Still missing: ${col}`);
    stillMissing++;
  }
}
if (stillMissing === 0) {
  console.log('  ✅ ALL expected tables exist!');
}

// Count relations
const relCount = await db.query(`SELECT COUNT(*) as cnt FROM directus_relations`);
console.log(`  📊 Total relations registered: ${relCount.rows[0].cnt}`);

console.log('\n🎉 Done! RESTART Directus on Railway to apply changes.\n');
await db.end();
process.exit(0);

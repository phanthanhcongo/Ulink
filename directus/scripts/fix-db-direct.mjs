/**
 * Direct PostgreSQL fix for orphaned translation collections on Railway.
 *
 * Connects directly to the Railway PostgreSQL database to:
 * 1. Delete orphan metadata from directus_collections / directus_fields / directus_relations
 * 2. Create the actual SQL tables for the broken translation collections
 * 3. Re-register them in Directus metadata so Directus recognizes them properly
 *
 * Usage:
 *   node scripts/fix-db-direct.mjs "postgresql://postgres:xxx@host:port/railway"
 */
import pg from 'pg';
const { Client } = pg;

const [,, connStr] = process.argv;
if (!connStr) {
  console.error('Usage: node scripts/fix-db-direct.mjs <DATABASE_URL>');
  process.exit(1);
}

const db = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
await db.connect();
console.log('✅ Connected to PostgreSQL\n');

// ─── Translation collection definitions ───
// Each entry: [collection_name, source_field, translation_fields[]]
const BROKEN_TRANSLATIONS = [
  ['standards_translations', 'standards_id', [
    ['name', 'VARCHAR(255)'],
    ['description', 'TEXT']
  ]],
  ['regional_hubs_translations', 'regional_hubs_id', [
    ['name', 'VARCHAR(255)']
  ]],
  ['hub_industrial_zones_translations', 'hub_industrial_zones_id', [
    ['name', 'VARCHAR(255)']
  ]],
  ['blog_posts_translations', 'blog_posts_id', [
    ['title', 'VARCHAR(255)'],
    ['body', 'TEXT'],
    ['meta_title', 'VARCHAR(255)'],
    ['meta_description', 'TEXT']
  ]],
  ['case_studies_translations', 'case_studies_id', [
    ['title', 'VARCHAR(255)'],
    ['summary', 'TEXT'],
    ['body', 'TEXT']
  ]],
  ['iso_certifications_translations', 'iso_certifications_id', [
    ['name', 'VARCHAR(255)'],
    ['issuer', 'VARCHAR(255)']
  ]],
  ['pages_translations', 'pages_id', [
    ['title', 'VARCHAR(255)'],
    ['body', 'TEXT'],
    ['meta_title', 'VARCHAR(255)'],
    ['meta_description', 'TEXT']
  ]],
  ['site_settings_translations', 'site_settings_id', [
    ['meta_title', 'VARCHAR(255)'],
    ['meta_description', 'TEXT'],
    ['address', 'TEXT']
  ]],
  ['homepage_translations', 'homepage_id', [
    ['title', 'VARCHAR(255)']
  ]]
];

// Helper: get parent collection name from translation collection name
function parentCollection(translationCol) {
  return translationCol.replace('_translations', '');
}

// ─── STEP 1: Clean orphan metadata ───
console.log('=== Step 1: Clean orphan metadata ===\n');

for (const [col] of BROKEN_TRANSLATIONS) {
  // Check if table actually exists in PostgreSQL
  const tableCheck = await db.query(
    `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)`,
    [col]
  );
  const tableExists = tableCheck.rows[0].exists;

  // Check if metadata exists in directus_collections
  const metaCheck = await db.query(
    `SELECT collection FROM directus_collections WHERE collection = $1`,
    [col]
  );
  const metaExists = metaCheck.rows.length > 0;

  console.log(`  ${col}:`);
  console.log(`    SQL table: ${tableExists ? '✅ EXISTS' : '❌ MISSING'}`);
  console.log(`    Metadata:  ${metaExists ? '⚠️  EXISTS (orphan)' : '❌ MISSING'}`);

  if (metaExists && !tableExists) {
    // Delete orphan metadata
    await db.query(`DELETE FROM directus_relations WHERE collection = $1`, [col]);
    await db.query(`DELETE FROM directus_relations WHERE related_collection = $1`, [col]);
    await db.query(`DELETE FROM directus_fields WHERE collection = $1`, [col]);
    await db.query(`DELETE FROM directus_collections WHERE collection = $1`, [col]);
    console.log(`    🗑️  Orphan metadata deleted`);
  }
}

// ─── STEP 2: Create actual SQL tables ───
console.log('\n=== Step 2: Create SQL tables ===\n');

for (const [col, sourceField, fields] of BROKEN_TRANSLATIONS) {
  const parent = parentCollection(col);
  
  // Get parent table primary key type
  const pkCheck = await db.query(`
    SELECT data_type FROM information_schema.columns
    WHERE table_name = $1 AND column_name = 'id'
  `, [parent]);
  
  if (pkCheck.rows.length === 0) {
    console.log(`  ⚠️  Parent table "${parent}" not found, skipping ${col}`);
    continue;
  }
  
  const pkType = pkCheck.rows[0].data_type === 'integer' ? 'INTEGER' : 'INTEGER';
  
  const fieldDefs = fields.map(([name, type]) => `"${name}" ${type} DEFAULT NULL`).join(',\n    ');
  
  const createSQL = `
    CREATE TABLE IF NOT EXISTS "${col}" (
      "id" SERIAL PRIMARY KEY,
      "${sourceField}" ${pkType} NOT NULL REFERENCES "${parent}"("id") ON DELETE CASCADE,
      "languages_code" VARCHAR(255) NOT NULL REFERENCES "languages"("code") ON DELETE CASCADE,
      ${fieldDefs},
      UNIQUE("${sourceField}", "languages_code")
    )
  `;
  
  try {
    await db.query(createSQL);
    console.log(`  ✅ Created table: ${col}`);
  } catch (err) {
    if (err.message.includes('already exists')) {
      console.log(`  =  Table ${col} already exists`);
    } else {
      console.log(`  ❌ Failed to create ${col}: ${err.message}`);
    }
  }
}

// ─── STEP 3: Register in Directus metadata ───
console.log('\n=== Step 3: Register in Directus metadata ===\n');

for (const [col, sourceField, fields] of BROKEN_TRANSLATIONS) {
  const parent = parentCollection(col);
  
  // Verify table exists now
  const tableCheck = await db.query(
    `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)`,
    [col]
  );
  if (!tableCheck.rows[0].exists) {
    console.log(`  ⚠️  Skipping metadata for ${col} — table still doesn't exist`);
    continue;
  }

  // 3a. Register collection in directus_collections
  const colExists = await db.query(
    `SELECT 1 FROM directus_collections WHERE collection = $1`, [col]
  );
  if (colExists.rows.length === 0) {
    await db.query(`
      INSERT INTO directus_collections (collection, hidden, icon, note, singleton)
      VALUES ($1, true, NULL, $2, false)
    `, [col, `${parent} translations`]);
    console.log(`  ✅ Registered collection: ${col}`);
  } else {
    console.log(`  =  Collection metadata already exists: ${col}`);
  }

  // 3b. Register fields in directus_fields
  const fieldDefs = [
    { field: 'id', special: null, interface: 'input', hidden: true, readonly: true },
    { field: sourceField, special: 'm2o', interface: 'select-dropdown-m2o', hidden: true, readonly: false },
    { field: 'languages_code', special: 'm2o', interface: 'select-dropdown-m2o', hidden: false, readonly: false },
    ...fields.map(([name]) => ({
      field: name,
      special: null,
      interface: name === 'body' || name === 'hero_section' ? 'input-rich-text-html' : 'input',
      hidden: false,
      readonly: false
    }))
  ];

  for (const fd of fieldDefs) {
    const exists = await db.query(
      `SELECT 1 FROM directus_fields WHERE collection = $1 AND field = $2`,
      [col, fd.field]
    );
    if (exists.rows.length === 0) {
      await db.query(`
        INSERT INTO directus_fields (collection, field, special, interface, hidden, readonly, width)
        VALUES ($1, $2, $3, $4, $5, $6, 'full')
      `, [col, fd.field, fd.special, fd.interface, fd.hidden, fd.readonly]);
    }
  }
  console.log(`  ✅ Fields registered for: ${col}`);

  // 3c. Register relations in directus_relations
  // Relation 1: source_field → parent collection
  const rel1Exists = await db.query(
    `SELECT 1 FROM directus_relations WHERE many_collection = $1 AND many_field = $2`,
    [col, sourceField]
  );
  if (rel1Exists.rows.length === 0) {
    await db.query(`
      INSERT INTO directus_relations (many_collection, many_field, one_collection, one_field, junction_field)
      VALUES ($1, $2, $3, 'translations', NULL)
    `, [col, sourceField, parent]);
    console.log(`  ✅ Relation: ${col}.${sourceField} → ${parent}`);
  } else {
    console.log(`  =  Relation: ${col}.${sourceField} → ${parent} (exists)`);
  }

  // Relation 2: languages_code → languages
  const rel2Exists = await db.query(
    `SELECT 1 FROM directus_relations WHERE many_collection = $1 AND many_field = 'languages_code'`,
    [col]
  );
  if (rel2Exists.rows.length === 0) {
    await db.query(`
      INSERT INTO directus_relations (many_collection, many_field, one_collection, one_field, junction_field)
      VALUES ($1, 'languages_code', 'languages', NULL, NULL)
    `, [col]);
    console.log(`  ✅ Relation: ${col}.languages_code → languages`);
  } else {
    console.log(`  =  Relation: ${col}.languages_code → languages (exists)`);
  }
}

// ─── STEP 4: Verify ───
console.log('\n=== Step 4: Verification ===\n');

for (const [col] of BROKEN_TRANSLATIONS) {
  const tableCheck = await db.query(
    `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)`, [col]
  );
  const metaCheck = await db.query(
    `SELECT 1 FROM directus_collections WHERE collection = $1`, [col]
  );
  const relCheck = await db.query(
    `SELECT many_field, one_collection FROM directus_relations WHERE many_collection = $1`, [col]
  );
  
  const ok = tableCheck.rows[0].exists && metaCheck.rows.length > 0 && relCheck.rows.length >= 2;
  console.log(`  ${ok ? '✅' : '❌'} ${col}: table=${tableCheck.rows[0].exists}, meta=${metaCheck.rows.length > 0}, relations=${relCheck.rows.length}`);
}

console.log('\n🎉 Done! Please RESTART the Directus service on Railway to clear its schema cache.\n');
await db.end();
process.exit(0);

/**
 * Drop ALL tables in the Railway PostgreSQL database.
 * This wipes the entire schema so Directus 10 can start fresh.
 *
 * Usage:
 *   node scripts/wipe-db.mjs "postgresql://postgres:xxx@host:port/railway"
 */
import pg from 'pg';
const { Client } = pg;

const [,, connStr] = process.argv;
if (!connStr) {
  console.error('Usage: node scripts/wipe-db.mjs <DATABASE_URL>');
  process.exit(1);
}

const db = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
await db.connect();
console.log('✅ Connected to PostgreSQL\n');

// Drop all tables in public schema
const result = await db.query(`
  SELECT tablename FROM pg_tables WHERE schemaname = 'public'
`);

const tables = result.rows.map(r => r.tablename);
console.log(`Found ${tables.length} tables to drop:\n`);
tables.forEach(t => console.log(`  - ${t}`));

if (tables.length === 0) {
  console.log('\nNo tables to drop. Database is already clean.');
  await db.end();
  process.exit(0);
}

console.log('\n⚠️  Dropping ALL tables...\n');

// Drop all at once with CASCADE
await db.query(`DROP SCHEMA public CASCADE`);
await db.query(`CREATE SCHEMA public`);
await db.query(`GRANT ALL ON SCHEMA public TO postgres`);
await db.query(`GRANT ALL ON SCHEMA public TO public`);

console.log('✅ All tables dropped. Database is clean.\n');
console.log('Next steps:');
console.log('1. Make sure Railway Directus image is set to directus/directus:10.13.3');
console.log('2. Restart the Directus service on Railway');
console.log('3. Directus will run "bootstrap" and create a fresh schema');
console.log('4. Then run: node scripts/remote-bootstrap.mjs <URL> <EMAIL> <PASSWORD>');

await db.end();
process.exit(0);

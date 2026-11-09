import pg from '../directus/node_modules/pg/lib/index.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString = process.env.DB_CONNECTION_STRING || process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Error: Please provide DB_CONNECTION_STRING or DATABASE_URL environment variable.');
  process.exit(1);
}

async function main() {
  console.log('📡 Connecting to Railway PostgreSQL...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log('✅ Connected successfully!\n');

  // Check existing tables
  const { rows: tableRows } = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
  );
  const tableNames = new Set(tableRows.map((r) => r.table_name));

  console.log(`📊 Found ${tableNames.size} total tables in 'public' schema.`);
  console.log(`- blog_posts exists: ${tableNames.has('blog_posts')}`);
  console.log(`- blog_posts_translations exists: ${tableNames.has('blog_posts_translations')}`);
  console.log(`- events exists: ${tableNames.has('events')}`);
  console.log(`- events_translations exists: ${tableNames.has('events_translations')}`);
  console.log(`- directus_collections exists: ${tableNames.has('directus_collections')}\n`);

  // Read seed-resources.sql
  const sqlFile = path.resolve(__dirname, '../seed-resources.sql');
  console.log(`📖 Reading ${sqlFile}...`);
  const sql = fs.readFileSync(sqlFile, 'utf-8');

  console.log(`⚡ Executing seed SQL transaction (${(sql.length / 1024).toFixed(1)} KB)...`);
  const startTime = Date.now();
  await client.query(sql);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ Seed SQL executed successfully in ${duration}s!\n`);

  // Verify counts
  const { rows: bpCount } = await client.query('SELECT count(*) FROM public.blog_posts');
  const { rows: bptCount } = await client.query('SELECT count(*) FROM public.blog_posts_translations');
  const { rows: evCount } = await client.query('SELECT count(*) FROM public.events');
  const { rows: evtCount } = await client.query('SELECT count(*) FROM public.events_translations');

  console.log('📈 Verification Results:');
  console.log(`- blog_posts total rows: ${bpCount[0].count}`);
  console.log(`- blog_posts_translations total rows: ${bptCount[0].count}`);
  console.log(`- events total rows: ${evCount[0].count}`);
  console.log(`- events_translations total rows: ${evtCount[0].count}`);

  // Sample blog categories
  const { rows: categories } = await client.query(
    'SELECT category, count(*) FROM public.blog_posts GROUP BY category ORDER BY count DESC'
  );
  console.log('\n📚 Articles by Category:');
  for (const c of categories) {
    console.log(`  • ${c.category}: ${c.count} bài`);
  }

  // Sample events
  const { rows: eventList } = await client.query(
    'SELECT slug, title, date, location FROM public.events ORDER BY id'
  );
  console.log('\n📅 Events:');
  for (const e of eventList) {
    console.log(`  • [${e.slug}] ${e.title} (${e.date} @ ${e.location})`);
  }

  // If Directus collections table exists, register collections in metadata if needed
  if (tableNames.has('directus_collections')) {
    console.log('\n⚙️ Checking Directus metadata registration...');
    const collectionsToEnsure = [
      { collection: 'blog_posts', icon: 'article', note: 'Blog Posts' },
      { collection: 'blog_posts_translations', icon: 'translate', note: 'Blog Posts Translations' },
      { collection: 'events', icon: 'event', note: 'Events' },
      { collection: 'events_translations', icon: 'translate', note: 'Events Translations' },
    ];

    for (const col of collectionsToEnsure) {
      const { rows } = await client.query(
        'SELECT collection FROM public.directus_collections WHERE collection = $1',
        [col.collection]
      );
      if (rows.length === 0) {
        await client.query(
          'INSERT INTO public.directus_collections (collection, icon, note) VALUES ($1, $2, $3)',
          [col.collection, col.icon, col.note]
        );
        console.log(`  ✅ Registered collection '${col.collection}' in directus_collections`);
      } else {
        console.log(`  ✓ Collection '${col.collection}' already registered in directus_collections`);
      }
    }
  }

  await client.end();
  console.log('\n🎉 Finished seeding successfully!');
}

main().catch((err) => {
  console.error('\n❌ Error during seeding:', err);
  process.exit(1);
});

import { withDbClient } from '../lib/folder-db.mjs';

const IMAGE_FIELDS = [
  ['products', 'hero'],
  ['hero_banners', 'image'],
  ['partners', 'logo'],
  ['product_categories', 'hero_image'],
  ['site_settings', 'logo'],
  ['site_settings', 'og_image'],
  ['regional_hubs', 'image'],
  ['hub_industrial_zones', 'image'],
  ['hub_team_members', 'photo'],
  ['blog_posts', 'cover'],
  ['case_studies', 'cover']
];

export async function migrateImageFieldsToPaths({ dryRun = true } = {}) {
  return withDbClient(async (db) => {
    const changed = [];
    for (const [table, field] of IMAGE_FIELDS) {
      const column = await db.query(
        `SELECT data_type FROM information_schema.columns
         WHERE table_schema = 'public' AND table_name = $1 AND column_name = $2`,
        [table, field]
      );
      if (column.rows.length === 0) continue;

      changed.push(`${table}.${field}`);
      if (dryRun) continue;

      const constraints = await db.query(
        `SELECT tc.constraint_name
         FROM information_schema.table_constraints tc
         JOIN information_schema.key_column_usage kcu
           ON kcu.constraint_name = tc.constraint_name
          AND kcu.table_schema = tc.table_schema
         WHERE tc.table_schema = 'public'
           AND tc.table_name = $1
           AND kcu.column_name = $2
           AND tc.constraint_type = 'FOREIGN KEY'`,
        [table, field]
      );
      for (const row of constraints.rows) {
        await db.query(`ALTER TABLE "${table}" DROP CONSTRAINT "${row.constraint_name}"`);
      }
      await db.query(`ALTER TABLE ${table} ALTER COLUMN ${field} TYPE text USING ${field}::text`);
      await db.query(
        'DELETE FROM directus_relations WHERE many_collection = $1 AND many_field = $2',
        [table, field]
      );
    }
    return changed;
  });
}

if (process.argv[1]?.includes('migrate-image-fields-to-paths')) {
  const dryRun = !process.argv.includes('--write');
  const fields = await migrateImageFieldsToPaths({ dryRun });
  console.log(`${dryRun ? 'Would migrate' : 'Migrated'}: ${fields.join(', ') || 'none'}`);
}

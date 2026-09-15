import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withDbClient } from '../lib/folder-db.mjs';

const FRONTEND_PUBLIC = fileURLToPath(new URL('../../frontend/public', import.meta.url));
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

export async function verifyImagePaths() {
  return withDbClient(async (db) => {
    const missing = [];
    const legacy = [];
    for (const [table, field] of IMAGE_FIELDS) {
      const result = await db.query(`SELECT id, "${field}" AS value FROM "${table}" WHERE "${field}" IS NOT NULL`);
      for (const row of result.rows) {
        const value = String(row.value);
        if (/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(value)) {
          legacy.push(`${table}.${field}:${row.id}=${value}`);
          continue;
        }
        const relative = value.replace(/^\//, '');
        if (!relative.startsWith('images/') || !existsSync(resolve(FRONTEND_PUBLIC, relative))) {
          missing.push(`${table}.${field}:${row.id}=${value}`);
        }
      }
    }
    return { missing, legacy };
  });
}

if (process.argv[1]?.includes('verify-image-paths')) {
  const result = await verifyImagePaths();
  console.log(`Legacy File IDs: ${result.legacy.length}`);
  console.log(`Missing frontend files: ${result.missing.length}`);
  for (const item of [...result.legacy, ...result.missing]) console.log(`- ${item}`);
  process.exit(result.legacy.length || result.missing.length ? 1 : 0);
}

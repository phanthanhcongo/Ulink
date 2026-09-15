/**
 * Seed V2 — Product Image Seeder
 *
 * Link product image paths from frontend/public/images directly into content.
 */
import { copyFileSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { withDbClient } from '../lib/folder-db.mjs';
import { productsToSeed } from './products_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Build image map: productSlug → { src, filename, mimeType }
 */
function buildImageMap() {
  return productsToSeed
    .filter(p => p.imagePath)
    .map(p => ({
      slug: p.slug,
      src: p.imagePath,
      title: p.name,
      filename: p.imagePath.split('/').pop(),
      ext: extname(p.imagePath).toLowerCase(),
    }));
}

function getMimeType(ext) {
  const map = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };
  return map[ext] || 'application/octet-stream';
}

export async function seedProductImages() {
  console.log('\n── Seeding Product Images (V2) ──');

  const imageMap = buildImageMap();
  console.log(`   Found ${imageMap.length} products with imagePath`);

  await withDbClient(async (db) => {
    for (const img of imageMap) {
      const productRes = await db.query('SELECT id FROM products WHERE slug = $1 LIMIT 1', [img.slug]);
      if (!productRes.rows.length) {
        console.warn(`   ⚠  Product not found in DB: ${img.slug}`);
        continue;
      }
      const productId = productRes.rows[0].id;
      await db.query('UPDATE products SET hero = $1 WHERE id = $2', [img.src, productId]);
      await db.query('UPDATE product_skus SET images = $1::jsonb WHERE product = $2', [JSON.stringify([img.src]), productId]);
      console.log(`   + ${img.slug} → ${img.src}`);
    }
  });
  return;

  await withDbClient(async (db) => {
    // 1. Ensure 'products' folder exists in directus_folders
    const folderRes = await db.query(
      "SELECT id FROM directus_folders WHERE name = 'products' LIMIT 1"
    );
    let productsFolderId = folderRes.rows[0]?.id || null;
    if (!productsFolderId) {
      productsFolderId = randomUUID();
      await db.query(
        "INSERT INTO directus_folders (id, name) VALUES ($1, 'products')",
        [productsFolderId]
      );
      console.log(`   + Created 'products' folder: ${productsFolderId}`);
    }

    // 2. Ensure directus/uploads/ directory exists on disk
    const destDir = join(__dirname, '../uploads');
    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    let successCount = 0;
    let skipCount = 0;

    for (const img of imageMap) {
      const srcPath = join(__dirname, '../../frontend/public', img.src);

      if (!existsSync(srcPath)) {
        console.warn(`   ⚠  File not found: ${img.src}`);
        continue;
      }

      // 3. Generate UUID for this file
      const fileUuid = randomUUID();
      const diskFilename = `${fileUuid}${img.ext}`;
      const destPath = join(destDir, diskFilename);
      const mimeType = getMimeType(img.ext);

      try {
        // Copy physical file
        copyFileSync(srcPath, destPath);
        const stats = statSync(destPath);

        // 4. Insert directus_files record
        const existingFile = await db.query(
          "SELECT df.id FROM directus_files df JOIN products p ON p.hero = df.id WHERE p.slug = $1 LIMIT 1",
          [img.slug]
        );

        if (existingFile.rows.length > 0) {
          skipCount++;
          continue;
        }

        await db.query(
          `INSERT INTO directus_files (id, storage, filename_disk, filename_download, title, type, filesize, folder)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [fileUuid, 'local', diskFilename, img.filename, img.title, mimeType, stats.size, productsFolderId]
        );

        // 5. Link as product hero
        const productRes = await db.query(
          "SELECT id FROM products WHERE slug = $1 LIMIT 1",
          [img.slug]
        );

        if (productRes.rows.length > 0) {
          const productId = productRes.rows[0].id;

          // Set hero image
          await db.query(
            "UPDATE products SET hero = $1 WHERE id = $2",
            [fileUuid, productId]
          );

          // Set SKU images (JSON array with single UUID)
          await db.query(
            "UPDATE product_skus SET images = $1::jsonb WHERE product = $2",
            [JSON.stringify([fileUuid]), productId]
          );

          successCount++;
          console.log(`   + ${img.slug} → ${diskFilename}`);
        } else {
          console.warn(`   ⚠  Product not found in DB: ${img.slug}`);
        }
      } catch (err) {
        console.error(`   ✗  ${img.slug}: ${err.message}`);
      }
    }

    console.log(`\n   ✅ Images seeded: ${successCount} new, ${skipCount} skipped`);
  });
}

// Allow direct execution: node seed-v2/seed_images.mjs
if (process.argv[1]?.includes('seed_images')) {
  const { loginAdmin, createDirectusClient } = await import('../lib/config.mjs');
  await loginAdmin(createDirectusClient());
  await seedProductImages();
  process.exit(0);
}

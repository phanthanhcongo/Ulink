/**
 * Upload product images to a remote Directus instance via the /files API.
 * This replaces the local file-copy approach used by seedProductImages().
 *
 * Usage:
 *   node scripts/remote-upload-images.mjs <URL> <EMAIL> <PASSWORD>
 */
import { createDirectus, rest, authentication } from '@directus/sdk';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const [,, url, email, password] = process.argv;
if (!url || !email || !password) {
  console.error('Usage: node scripts/remote-upload-images.mjs <URL> <EMAIL> <PASSWORD>');
  process.exit(1);
}

// Authenticate
const client = createDirectus(url).with(authentication('json')).with(rest());
await client.login(email, password);
const token = await client.getToken();
console.log(`Authenticated as ${email} @ ${url}\n`);

// Set DB_CONNECTION_STRING for withDbClient
process.env.DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'postgresql://postgres:NmHrdccBnCBDFHmmhntIhdLVUeKVcwab@tokaido.proxy.rlwy.net:59913/railway';

const { withDbClient } = await import('../lib/folder-db.mjs');

const PRODUCT_IMAGES = [
  { slug: 'nitrile-cleanroom-gloves', imageUuid: '58296a84-0a95-4674-8840-a178bc5fe2a1', src: '/images/home/section2/product-cut-gloves.webp', title: 'Găng tay nitrile phòng sạch' },
  { slug: 'polyester-cleanroom-wipers', imageUuid: '2a98e72c-15a9-450f-bb7e-f823fbd5508a', src: '/images/about/quality-hero-bg.webp', title: 'Khăn lau polyester phòng sạch' },
  { slug: 'tyvek-cleanroom-coverall', imageUuid: '362ab8d2-45e0-47b1-91a1-9a74288b209e', src: '/images/industries/cleanroom_suit.webp', title: 'Bộ áo liền quần phòng sạch Tyvek' },
  { slug: 'cleanroom-face-mask-3ply', imageUuid: 'b78e24c2-9e90-4c7b-b8f2-89cdcb7a329a', src: '/images/industries/cleanroom_mask.webp', title: 'Khẩu trang 3 lớp phòng sạch' },
  { slug: 'esd-wrist-strap', imageUuid: 'c73ee8a2-ea88-4682-9988-cbfa98ab2211', src: '/images/home/section2/product-hvac-tape.webp', title: 'Dây đeo cổ tay chống tĩnh điện' },
  { slug: 'esd-table-mat-2layer', imageUuid: 'd89ef2c2-be00-477c-a49e-bca9efda8822', src: '/images/industries/esd_tray.webp', title: 'Thảm chống tĩnh điện ESD 2 lớp' },
  { slug: 'ipa-cleanroom-grade-999', imageUuid: 'f47bb992-a1f9-4bba-9bcf-10cf8eac2211', src: '/images/about/quality-lab.webp', title: 'Dung dịch IPA 99.9% Cleanroom Grade' },
  { slug: 'sticky-mat-30-layers', imageUuid: '98bc72de-a890-4f99-bbcf-8ab05c12670f', src: '/images/industries/sticky_mat.webp', title: 'Thảm dính bụi phòng sạch 30 lớp' },
  { slug: 'esd-shielding-bag', imageUuid: '125cf49a-528d-468e-bf03-8ab05c12670f', src: '/images/industries/shielding_bag.webp', title: 'Túi chống tĩnh điện ESD Shielding' },
  { slug: 'sterile-latex-cleanroom-gloves', imageUuid: 'f82cf9a2-da00-4cfa-a9bf-13cf8eac3311', src: '/images/home/section2/product-cut-gloves.webp', title: 'Găng tay latex vô trùng phòng sạch' },
];

console.log('--- Uploading product images to Railway Directus ---\n');

for (const item of PRODUCT_IMAGES) {
  const srcPath = join(__dirname, '../../frontend/public', item.src);
  if (!existsSync(srcPath)) {
    console.warn(`⚠️  Source file not found: ${item.src}`);
    continue;
  }

  try {
    // First, delete the old DB record (seeded via direct SQL with no physical file)
    try {
      const delRes = await fetch(`${url}/files/${item.imageUuid}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (delRes.ok) {
        console.log(`  🗑️  Deleted stale file record: ${item.imageUuid}`);
      }
    } catch (e) {
      // Ignore - file record may not exist
    }

    // Upload the file via multipart/form-data
    const fileBuffer = readFileSync(srcPath);
    const blob = new Blob([fileBuffer], { type: 'image/webp' });
    const formData = new FormData();
    formData.append('id', item.imageUuid);
    formData.append('title', item.title);
    formData.append('file', blob, item.src.split('/').pop());

    const uploadRes = await fetch(`${url}/files`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    if (uploadRes.ok) {
      const data = await uploadRes.json();
      console.log(`✅ Uploaded: ${item.title} (${data.data.id})`);
    } else {
      const errText = await uploadRes.text();
      console.error(`❌ Failed to upload ${item.title}: ${uploadRes.status} ${errText}`);
    }
  } catch (err) {
    console.error(`❌ Error uploading ${item.title}:`, err.message);
  }
}

// Link images to products via DB
console.log('\n--- Linking images to products ---\n');

await withDbClient(async (dbClient) => {
  for (const item of PRODUCT_IMAGES) {
    const productRes = await dbClient.query("SELECT id FROM products WHERE slug = $1 LIMIT 1", [item.slug]);
    if (productRes.rows.length > 0) {
      const productId = productRes.rows[0].id;
      await dbClient.query("UPDATE products SET hero = $1 WHERE id = $2", [item.imageUuid, productId]);
      console.log(`  🔗 Linked hero image for: ${item.slug}`);

      // Also set SKU images
      const skuRes = await dbClient.query("UPDATE product_skus SET images = $1::jsonb WHERE product = $2", [JSON.stringify([item.imageUuid]), productId]);
      console.log(`     → Set image for ${skuRes.rowCount} SKUs`);
    }
  }

  // Gallery images
  console.log('\n--- Seeding gallery junction ---');
  const allProducts = await dbClient.query("SELECT id, slug, hero FROM products");
  const allImages = await dbClient.query("SELECT id FROM directus_files WHERE type LIKE 'image/%'");
  const imageIds = allImages.rows.map(r => r.id);

  if (imageIds.length > 0) {
    for (let idx = 0; idx < allProducts.rows.length; idx++) {
      const p = allProducts.rows[idx];
      const heroUuid = p.hero || imageIds[idx % imageIds.length];
      if (!p.hero) {
        await dbClient.query("UPDATE products SET hero = $1 WHERE id = $2", [heroUuid, p.id]);
      }
      const galleryUuids = imageIds.filter(id => id !== heroUuid).slice(idx % 5, (idx % 5) + 3);
      for (const gUuid of galleryUuids) {
        const check = await dbClient.query("SELECT id FROM products_files WHERE products_id = $1 AND directus_files_id = $2", [p.id, gUuid]);
        if (check.rows.length === 0) {
          await dbClient.query("INSERT INTO products_files (products_id, directus_files_id) VALUES ($1, $2)", [p.id, gUuid]);
        }
      }
    }
    console.log('  ✅ Gallery images linked');
  }
});

console.log('\n🎉 All images uploaded and linked successfully!\n');
process.exit(0);

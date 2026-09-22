/**
 * Seed V2 — Wipe & Reseed Runner
 *
 * Xoá toàn bộ data content tables rồi seed lại từ seed-v2.
 * Schema + RBAC + languages KHÔNG bị ảnh hưởng.
 *
 * Usage:
 *   cd directus && node seed-v2/run-seed.mjs
 */
import { createItem, readItems, deleteItems } from '@directus/sdk';
import { createDirectusClient, loginAdmin } from '../lib/config.mjs';
import { createEnsureHelpers } from '../lib/ensure-helpers.mjs';

// ── Seed data imports ──
import { industries } from './industries.mjs';
import { standards } from './standards.mjs';
import { productAttributes } from './attributes.mjs';
import { productCategories } from './categories.mjs';
import { productsToSeed } from './products_data.mjs';
import { skusToSeed } from './skus_data.mjs';
import { productTranslations } from './translations.mjs';
import { productsIndustries, productsStandards, productsRegionalHubs, productsAttributes } from './links.mjs';
import { inventoryStock, generateInitialMovements } from './inventory_seed.mjs';
import { documents } from './documents.mjs';
import { seedProductImages } from './seed_images.mjs';

// Hub & zone imports (already exist in seed-v2)
import { regionalHubs } from './regional_hubs.mjs';
import { industrialZones } from './industrial_zones.mjs';
import { teamMembers } from './team_members.mjs';

const client = createDirectusClient();
const helpers = createEnsureHelpers(client);

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

async function getIdBySlug(collection, slug) {
  const items = await client.request(readItems(collection, {
    filter: { slug: { _eq: slug } },
    fields: ['id'],
    limit: 1
  }));
  return items[0]?.id ?? null;
}

async function getIdByField(collection, field, value) {
  const items = await client.request(readItems(collection, {
    filter: { [field]: { _eq: value } },
    fields: ['id'],
    limit: 1
  }));
  return items[0]?.id ?? null;
}

async function truncateCollection(collection) {
  try {
    const items = await client.request(readItems(collection, { fields: ['id'], limit: -1 }));
    if (items.length === 0) {
      console.log(`   ⏭  ${collection}: empty`);
      return;
    }
    const ids = items.map(i => i.id);
    // Delete in batches of 100
    for (let i = 0; i < ids.length; i += 100) {
      const batch = ids.slice(i, i + 100);
      await client.request(deleteItems(collection, batch));
    }
    console.log(`   🗑  ${collection}: deleted ${ids.length} records`);
  } catch (err) {
    console.warn(`   ⚠  ${collection}: ${err?.errors?.[0]?.message ?? err.message}`);
  }
}

// ═══════════════════════════════════════════════════════════════
// STEP 1: WIPE — Delete data in reverse dependency order
// ═══════════════════════════════════════════════════════════════

async function wipeData() {
  console.log('\n══════════════════════════════════════════');
  console.log('  STEP 1: WIPING ALL CONTENT DATA');
  console.log('══════════════════════════════════════════\n');

  // Junction tables first (FK-dependent)
  const junctions = [
    'inventory_movements',
    'inventory_stock',
    'products_industries',
    'products_standards',
    'products_regional_hubs',
    'products_product_attributes',
    'products_files',
  ];
  for (const c of junctions) await truncateCollection(c);

  // Translation tables
  const translations = [
    'products_translations',
    'product_categories_translations',
    'industries_translations',
    'standards_translations',
    'regional_hubs_translations',
    'hub_industrial_zones_translations',
    'hub_team_members_translations',
    'documents_translations',
  ];
  for (const c of translations) await truncateCollection(c);

  // Content tables (child → parent order)
  const content = [
    'documents',
    'product_attribute_options',
    'product_attributes',
    'product_skus',
    'products',
    'product_categories',
    'standards',
    'industries',
    'hub_team_members',
    'hub_industrial_zones',
    'regional_hubs',
  ];
  for (const c of content) await truncateCollection(c);

  console.log('\n   ✅ Wipe complete!\n');
}

// ═══════════════════════════════════════════════════════════════
// STEP 2: SEED — Insert data in dependency order
// ═══════════════════════════════════════════════════════════════

async function seedData() {
  console.log('\n══════════════════════════════════════════');
  console.log('  STEP 2: SEEDING V2 DATA');
  console.log('══════════════════════════════════════════\n');

  // ── 2.1 Regional Hubs ──
  console.log('── [1/13] Regional Hubs ──');
  const hubIdMap = {};
  for (const hub of regionalHubs) {
    const { translations, provinceCode, provinceAbbr, ...data } = hub;
    // Resolve province FK from vn_provinces.code
    if (provinceCode) {
      const provinceId = await getIdByField('vn_provinces', 'code', provinceCode);
      if (provinceId) {
        data.province = provinceId;
      } else {
        console.warn(`   ⚠  Province not found: ${provinceCode}`);
      }
    }
    const id = await helpers.ensureItem('regional_hubs', 'slug', data);
    hubIdMap[hub.slug] = id;
    // Seed translations
    if (translations) {
      for (const [lang, t] of Object.entries(translations)) {
        await helpers.ensureTranslation('regional_hubs', id, lang, t);
      }
    }
  }

  // ── 2.2 Industrial Zones ──
  console.log('\n── [2/13] Industrial Zones ──');
  for (const zone of industrialZones) {
    const { translations, hubSlug, ...data } = zone;
    const hubId = hubIdMap[hubSlug];
    if (hubId) data.hub = hubId;
    const id = await helpers.ensureItem('hub_industrial_zones', 'slug', data);
    if (translations) {
      for (const [lang, t] of Object.entries(translations)) {
        await helpers.ensureTranslation('hub_industrial_zones', id, lang, t);
      }
    }
  }

  // ── 2.3 Team Members ──
  console.log('\n── [3/13] Team Members ──');
  for (const member of teamMembers) {
    const { hubSlug, ...data } = member;
    const hubId = hubIdMap[hubSlug];
    if (hubId) data.hub = hubId;
    await helpers.ensureItem('hub_team_members', 'slug', data);
  }

  // ── 2.4 Industries ──
  console.log('\n── [4/13] Industries ──');
  const industryIdMap = {};
  for (const ind of industries) {
    const { translations, ...data } = ind;
    const id = await helpers.ensureItem('industries', 'slug', data);
    industryIdMap[ind.slug] = id;
    if (translations) {
      for (const [lang, t] of Object.entries(translations)) {
        await helpers.ensureTranslation('industries', id, lang, t);
      }
    }
  }

  // ── 2.5 Standards ──
  console.log('\n── [5/13] Standards ──');
  const standardIdMap = {};
  for (const std of standards) {
    const { translations, ...data } = std;
    const id = await helpers.ensureItem('standards', 'slug', data);
    standardIdMap[std.slug] = id;
    if (translations) {
      for (const [lang, t] of Object.entries(translations)) {
        await helpers.ensureTranslation('standards', id, lang, t);
      }
    }
  }

  // ── 2.6 Product Attributes + Options ──
  console.log('\n── [6/13] Product Attributes & Options ──');
  const attrIdMap = {};
  const optionIdMap = {};
  for (const attr of productAttributes) {
    const { translations, options, ...data } = attr;
    const id = await helpers.ensureItem('product_attributes', 'slug', data);
    attrIdMap[attr.slug] = id;

    for (const opt of options) {
      const { translations: optTrans, ...optData } = opt;
      optData.attribute = id;
      const optId = await helpers.ensureItem('product_attribute_options', 'value', optData);
      optionIdMap[`${attr.slug}:${opt.value}`] = optId;
    }
  }

  // ── 2.7 Categories ──
  console.log('\n── [7/13] Product Categories ──');
  const catIdMap = {};
  // First pass: parent categories (parentSlug === null)
  for (const cat of productCategories.filter(c => !c.parentSlug)) {
    const { translations, parentSlug, ...data } = cat;
    const id = await helpers.ensureItem('product_categories', 'slug', data);
    catIdMap[cat.slug] = id;
    if (translations) {
      for (const [lang, t] of Object.entries(translations)) {
        await helpers.ensureTranslation('product_categories', id, lang, t);
      }
    }
  }
  // Second pass: child categories
  for (const cat of productCategories.filter(c => c.parentSlug)) {
    const { translations, parentSlug, ...data } = cat;
    data.parent = catIdMap[parentSlug];
    const id = await helpers.ensureItem('product_categories', 'slug', data);
    catIdMap[cat.slug] = id;
    if (translations) {
      for (const [lang, t] of Object.entries(translations)) {
        await helpers.ensureTranslation('product_categories', id, lang, t);
      }
    }
  }

  // ── 2.8 Products ──
  console.log('\n── [8/13] Products ──');
  const productIdMap = {};
  for (const prod of productsToSeed) {
    const { categorySlug, imagePath, ...data } = prod;
    data.category = catIdMap[categorySlug];
    // Store the frontend-served image path directly.
    data.hero = imagePath;
    const id = await helpers.ensureItem('products', 'slug', data);
    productIdMap[prod.slug] = id;
  }

  // ── 2.9 Product SKUs ──
  console.log('\n── [9/13] Product SKUs ──');
  const skuIdMap = {};
  for (const sku of skusToSeed) {
    const variants = [
      { suffix: '', size: 'S' },
      { suffix: '-M', size: 'M' },
      { suffix: '-L', size: 'L' }
    ];
    for (const variant of variants) {
      const { productSlug, moq, moq_unit, ...data } = sku;
      data.sku_code = `${sku.sku_code}${variant.suffix}`;
      data.product = productIdMap[productSlug];
      const priceMultiplier = { S: 1, M: 1.1, L: 1.2 }[variant.size];
      data.price = sku.price == null ? null : Math.round(sku.price * priceMultiplier);
      data.attributes = {
        size: variant.size,
        color: 'blue',
        'roll-weight': '2.4kg'
      };
      if (moq) {
        data.pack_size = `MOQ: ${moq} ${moq_unit || sku.unit || ''}`.trim();
      }
      const id = await helpers.ensureItem('product_skus', 'sku_code', data);
      if (variant.suffix === '') skuIdMap[sku.sku_code] = id;
    }
  }

  // ── 2.10 Product Translations ──
  console.log('\n── [10/13] Product Translations ──');
  for (const t of productTranslations) {
    const productId = productIdMap[t.productSlug];
    if (!productId) { console.warn(`   ⚠  Missing product: ${t.productSlug}`); continue; }
    // Pass all translatable fields (name, short_description, specifications,
    // meta_title, meta_description) — routing keys stripped.
    const { productSlug, lang, ...fields } = t;
    await helpers.ensureTranslation('products', productId, lang, fields);
  }

  // ── 2.11 Junction Tables ──
  console.log('\n── [11/13] Junction Tables ──');

  // Products ↔ Industries
  let linkCount = 0;
  for (const link of productsIndustries) {
    const pId = productIdMap[link.productSlug];
    const iId = industryIdMap[link.industrySlug];
    if (!pId || !iId) continue;
    try {
      await client.request(createItem('products_industries', {
        products_id: pId,
        industries_id: iId
      }));
      linkCount++;
    } catch { /* duplicate */ }
  }
  console.log(`   ✅ products_industries: ${linkCount} links`);

  // Products ↔ Standards
  linkCount = 0;
  for (const link of productsStandards) {
    const pId = productIdMap[link.productSlug];
    const sId = standardIdMap[link.standardSlug];
    if (!pId || !sId) continue;
    try {
      await client.request(createItem('products_standards', {
        products_id: pId,
        standards_id: sId
      }));
      linkCount++;
    } catch { /* duplicate */ }
  }
  console.log(`   ✅ products_standards: ${linkCount} links`);

  // Products ↔ Regional Hubs
  linkCount = 0;
  for (const link of productsRegionalHubs) {
    const pId = productIdMap[link.productSlug];
    const hId = hubIdMap[link.hubSlug];
    if (!pId || !hId) continue;
    try {
      await client.request(createItem('products_regional_hubs', {
        products_id: pId,
        regional_hubs_id: hId
      }));
      linkCount++;
    } catch { /* duplicate */ }
  }
  console.log(`   ✅ products_regional_hubs: ${linkCount} links`);

  // Products ↔ Product Attributes
  linkCount = 0;
  const linkedAttributeKeys = new Set();
  for (const link of productsAttributes) {
    const pId = productIdMap[link.productSlug];
    const attrId = attrIdMap[link.attributeSlug];
    if (!pId || !attrId) continue;
    const linkKey = `${pId}:${attrId}`;
    if (linkedAttributeKeys.has(linkKey)) continue;
    try {
      await client.request(createItem('products_product_attributes', {
        products_id: pId,
        product_attributes_id: attrId
      }));
      linkedAttributeKeys.add(linkKey);
      linkCount++;
    } catch { /* duplicate */ }
  }
  console.log(`   ✅ products_product_attributes: ${linkCount} links`);

  // ── 2.12 Inventory ──
  console.log('\n── [12/13] Inventory ──');
  let stockCount = 0;
  for (const stock of inventoryStock) {
    const skuId = skuIdMap[stock.skuCode];
    const hubId = hubIdMap[stock.hubSlug];
    if (!skuId || !hubId) continue;
    try {
      await client.request(createItem('inventory_stock', {
        sku: skuId,
        hub: hubId,
        quantity: stock.quantity,
        min_quantity: stock.min_quantity,
        max_quantity: stock.max_quantity
      }));
      stockCount++;
    } catch { /* duplicate */ }
  }
  console.log(`   ✅ inventory_stock: ${stockCount} records`);

  const movements = generateInitialMovements();
  let movCount = 0;
  for (const mov of movements) {
    const skuId = skuIdMap[mov.skuCode];
    const hubId = hubIdMap[mov.hubSlug];
    if (!skuId || !hubId) continue;
    try {
      await client.request(createItem('inventory_movements', {
        sku: skuId,
        hub: hubId,
        movement_type: mov.movement_type,
        quantity: mov.quantity,
        reference: mov.reference,
        notes: mov.notes
      }));
      movCount++;
    } catch { /* duplicate */ }
  }
  console.log(`   ✅ inventory_movements: ${movCount} records`);

  // ── 2.13 Documents ──
  console.log('\n── [13/13] Documents ──');
  for (const doc of documents) {
    const { translations, related_products, slug, type, file_name, ...rest } = doc;
    const data = {
      ...rest,
      doc_type: type,  // schema uses doc_type not type
      status: rest.status || 'published'
    };
    // Link to first related product if available
    if (related_products?.length > 0) {
      const pId = productIdMap[related_products[0]];
      if (pId) data.product = pId;
    }
    try {
      await helpers.ensureItem('documents', 'title', data);
    } catch (err) {
      console.warn(`   ⚠  Document "${doc.title}": ${err?.errors?.[0]?.message ?? err.message}`);
    }
  }

  console.log('\n   ✅ Seed V2 complete!\n');
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

async function main() {
  await loginAdmin(client);
  console.log('🔑 Authenticated with Directus\n');

  await wipeData();
  await seedData();
  await seedProductImages();

  console.log('══════════════════════════════════════════');
  console.log('  ✅ SEED V2 COMPLETE — ALL DATA REFRESHED');
  console.log('══════════════════════════════════════════\n');
  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ Seed V2 failed:', err);
  process.exit(1);
});

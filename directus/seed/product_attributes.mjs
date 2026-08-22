import { readItems } from '@directus/sdk';
import { attributesData, attributeOptionsData } from './attributes_data.mjs';
import { standardsToSeed } from './standards_data.mjs';
import { extendedCategories } from './categories_data.mjs';
import { productsToSeed } from './products_data.mjs';
import { skusToSeedData } from './skus_data.mjs';
import { industryLinksData, standardLinksData, regionalHubLinksData, documentsData } from './links_data.mjs';

async function getIdBySlug(client, collection, slug) {
  const items = await client.request(
    readItems(collection, { filter: { slug: { _eq: slug } }, fields: ['id'], limit: 1 })
  );
  return items?.[0]?.id ?? null;
}

export async function seedProductAttributes(helpers, client) {
  console.log('\n--- SEEDING PRODUCT CATALOG (STANDARDS, CATEGORIES, PRODUCTS, ATTRIBUTES, SKUS & LINKS) ---');

  // Get existing industry IDs
  const electronicsId = await getIdBySlug(client, 'industries', 'electronics');
  const pharmaId = await getIdBySlug(client, 'industries', 'pharmaceutical');
  const cosmeticsId = await getIdBySlug(client, 'industries', 'cosmetics');
  const foodId = await getIdBySlug(client, 'industries', 'food');
  const industryIdMap = { electronics: electronicsId, pharmaceutical: pharmaId, cosmetics: cosmeticsId, food: foodId };

  // 1. Seed Standards
  const standardIdMap = {};
  // Get existing first
  const existingIso14644 = await getIdBySlug(client, 'standards', 'iso-14644-1');
  const existingIso9001 = await getIdBySlug(client, 'standards', 'iso-9001');
  standardIdMap['iso-14644-1'] = existingIso14644;
  standardIdMap['iso-9001'] = existingIso9001;

  for (const std of standardsToSeed) {
    const stdId = await helpers.ensureItem('standards', 'slug', std);
    standardIdMap[std.slug] = stdId;
  }
  console.log('  Standards seeded');

  // 2. Seed Categories
  const cleanroomId = await getIdBySlug(client, 'product_categories', 'cleanroom-consumables');
  const catIdMap = { 'cleanroom-consumables': cleanroomId };

  for (const cat of extendedCategories) {
    const parentId = cat.parentSlug ? catIdMap[cat.parentSlug] : null;
    const catId = await helpers.ensureItem('product_categories', 'slug', {
      name: cat.name,
      slug: cat.slug,
      parent: parentId,
      status: cat.status,
      description: cat.description
    });
    catIdMap[cat.slug] = catId;
  }
  console.log('  Product categories seeded');

  // 3. Seed Global Attributes & Options
  for (const attr of attributesData) {
    await helpers.ensureItem('product_attributes', 'id', attr);
  }
  for (const opt of attributeOptionsData) {
    await helpers.ensureItem('product_attribute_options', 'id', opt);
  }
  console.log('  Global Attributes & Options seeded');

  // 4. Seed Products
  const productIdMap = {};
  // First, map the base products that were seeded in initial content
  const baseProductSlugs = ['nitrile-cleanroom-gloves', 'polyester-cleanroom-wipers'];
  for (const baseSlug of baseProductSlugs) {
    const baseId = await getIdBySlug(client, 'products', baseSlug);
    if (baseId) productIdMap[baseSlug] = baseId;
  }

  const allProductIds = [];
  for (const prod of productsToSeed) {
    const catId = catIdMap[prod.categorySlug] || await getIdBySlug(client, 'product_categories', prod.categorySlug);
    const pid = await helpers.ensureItem('products', 'slug', {
      name: prod.name,
      slug: prod.slug,
      brand: prod.brand,
      category: catId,
      status: prod.status,
      short_description: prod.short_description,
      specifications: prod.specifications,
      meta_title: prod.meta_title,
      meta_description: prod.meta_description
    });
    if (pid) {
      productIdMap[prod.slug] = pid;
      allProductIds.push(pid);
    }
  }
  console.log(`  Products seeded (Total extended + additional: ${allProductIds.length})`);

  // 5. Assign Size Attribute (id=1) to all seeded products (both base and extended/new)
  let attrAssignId = 1;
  const productsToAssignAttributes = [
    ...Object.values(productIdMap)
  ];
  for (const pid of productsToAssignAttributes) {
    if (pid) {
      await helpers.ensureItem('products_product_attributes', 'id', {
        id: attrAssignId++, products_id: pid, product_attributes_id: 1
      });
    }
  }
  console.log('  Attribute assignments for all products done');

  // 6. Seed Product SKUs
  for (const sku of skusToSeedData) {
    const productDbId = productIdMap[sku.productSlug];
    if (productDbId) {
      await helpers.ensureItem('product_skus', 'sku_code', {
        sku_code: sku.sku_code,
        product: productDbId,
        unit: sku.unit,
        pack_size: sku.pack_size,
        attributes: sku.attributes,
        stock_status: sku.stock_status,
        status: sku.status
      });
    }
  }
  console.log('  Product SKUs seeded');

  // 7. Seed Industry Links
  let piId = 1;
  for (const link of industryLinksData) {
    const pid = productIdMap[link.productSlug];
    const iid = industryIdMap[link.industrySlug];
    if (pid && iid) {
      await helpers.ensureItem('products_industries', 'id', {
        id: piId++, products_id: pid, industries_id: iid
      });
    }
  }
  console.log('  Industry links seeded');

  // 8. Seed Standard Links
  let psId = 1;
  for (const link of standardLinksData) {
    const pid = productIdMap[link.productSlug];
    const sid = standardIdMap[link.standardSlug];
    if (pid && sid) {
      await helpers.ensureItem('products_standards', 'id', {
        id: psId++, products_id: pid, standards_id: sid
      });
    }
  }
  console.log('  Standard links seeded');

  // 9. Seed Regional Hub Links
  const hubSlugs = ['dong-van-4', 'bac-thang-long', 'binh-duong', 'hai-phong', 'long-thanh'];
  const hubRecords = {};
  for (const slug of hubSlugs) {
    const found = await client.request(readItems('regional_hubs', { filter: { slug: { _eq: slug } }, fields: ['id'], limit: 1 }));
    if (found.length > 0) hubRecords[slug] = found[0].id;
  }

  let prhId = 1;
  for (const link of regionalHubLinksData) {
    const pid = productIdMap[link.productSlug];
    const hid = hubRecords[link.hubSlug];
    if (pid && hid) {
      await helpers.ensureItem('products_regional_hubs', 'id', {
        id: prhId++, products_id: pid, regional_hubs_id: hid
      });
    }
  }
  console.log('  Regional hub links seeded');

  // 10. Seed Documents
  const seedFileIds = [
    '135cf49a-528d-468e-bf03-8ab05c12670f',
    '17e93170-4d2b-4a45-b18f-a4c3f8ab2f48',
    '22a340ce-b785-4543-b1ef-4cf3eec8e9aa'
  ];
  let docIndex = 0;
  for (const doc of documentsData) {
    const pid = productIdMap[doc.productSlug];
    if (pid) {
      const fileId = seedFileIds[docIndex % seedFileIds.length];
      docIndex++;
      await helpers.ensureItem('documents', 'title', {
        title: doc.title,
        doc_type: doc.doc_type,
        product: pid,
        language: doc.language,
        file: fileId,
        status: 'published'
      });
    }
  }
  console.log('  Documents seeded');
}

/**
 * Demo enrichment — fill the NEW multilingual fields (specifications, meta,
 * SKU unit/pack_size) for one product so the en/ja product page renders fully
 * localized. Base VI is untouched. Idempotent: re-run safe (update-or-create).
 *
 * Product: bang-keo-nhom-hvac-48mm (id 376)
 */
import { readItems, updateItem, createItem } from '@directus/sdk';
import { createDirectusClient, loginAdmin } from '../lib/config.mjs';

const client = createDirectusClient();
await loginAdmin(client);

const PRODUCT_ID = 376;

// Translated product fields. specifications reuse the EXACT base VI keys —
// only the VALUES are localized (matches the frontend/admin design).
const PRODUCT_TRANS = {
  en: {
    specifications: {
      'Chiều rộng': '48 mm',
      'Chiều dài': '30 m',
      'Độ dày': '40 microns',
      'Chịu nhiệt': 'Up to 150°C',
    },
    meta_title: 'HVAC Aluminum Tape 48mm x 30m | ULink',
    meta_description:
      'HVAC aluminum tape 48mm x 30m, 40 micron thick, heat resistant up to 150°C. B2B wholesale supply for ductwork systems.',
  },
  ja: {
    specifications: {
      'Chiều rộng': '48mm',
      'Chiều dài': '30m',
      'Độ dày': '40ミクロン',
      'Chịu nhiệt': '150°Cまで',
    },
    meta_title: 'HVACアルミテープ 48mm x 30m | ULink',
    meta_description:
      'HVAC用アルミテープ 48mm x 30m、厚さ40ミクロン、150°C耐熱。ダクトシステム向けB2B卸売供給。',
  },
};

// Translated SKU fields (unit + pack_size), keyed by base VI value.
const SKU_TRANS = {
  en: { unit: 'roll', pack_size: 'MOQ: 100 rolls' },
  ja: { unit: '巻', pack_size: 'MOQ: 100巻' },
};

async function upsertTranslation(collection, sourceField, sourceId, lang, payload) {
  const existing = await client.request(
    readItems(collection, {
      filter: { [sourceField]: { _eq: sourceId }, languages_code: { _eq: lang } },
      fields: ['id'],
      limit: 1,
    })
  );
  if (existing[0]) {
    await client.request(updateItem(collection, existing[0].id, payload));
    return `updated#${existing[0].id}`;
  }
  const created = await client.request(
    createItem(collection, { [sourceField]: sourceId, languages_code: lang, ...payload })
  );
  return `created#${created.id}`;
}

// ── Product translations ──
for (const [lang, payload] of Object.entries(PRODUCT_TRANS)) {
  const r = await upsertTranslation('products_translations', 'products_id', PRODUCT_ID, lang, payload);
  console.log(`products_translations [${lang}]: ${r}`);
}

// ── SKU translations (all 3 variants) ──
const skus = await client.request(
  readItems('product_skus', {
    filter: { product: { _eq: PRODUCT_ID } },
    fields: ['id', 'sku_code'],
    limit: -1,
  })
);
for (const sku of skus) {
  for (const [lang, payload] of Object.entries(SKU_TRANS)) {
    const r = await upsertTranslation('product_skus_translations', 'product_skus_id', sku.id, lang, payload);
    console.log(`product_skus_translations ${sku.sku_code} [${lang}]: ${r}`);
  }
}

console.log('\n✅ Demo enrichment complete for product', PRODUCT_ID);
process.exit(0);

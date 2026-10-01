/**
 * Seed V2 — Regenerate data files from the CURRENT local database.
 *
 * Reads the live `ulink` database (via `docker exec ... psql`) and rewrites the
 * seed-v2 data files so they match what is actually stored. Curated fields that
 * are NOT database columns (industries.solutions, attributes.type/label/option
 * translations, zones.featured/description) are preserved by importing the
 * existing seed modules and merging by slug / value / name.
 *
 * Usage:  cd directus/seed-v2 && node _regen-from-db.mjs
 *
 * This is a one-off maintenance tool, not part of the seed runtime.
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── DB access ────────────────────────────────────────────────────
function q(sql) {
  const out = execSync('docker exec -i ulink-postgres-1 psql -U ulink -d ulink -t -A', {
    input: sql,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024
  }).trim();
  if (!out) return [];
  return JSON.parse(out);
}

// ── Emit helpers ─────────────────────────────────────────────────
function banner(title) {
  return `/**\n * Seed V2 — ${title}\n *\n * AUTO-GENERATED from the live database by _regen-from-db.mjs.\n * Edits here are overwritten on the next regen run.\n */\n\n`;
}
function emit(file, header, exportName, data, extra = '') {
  const body =
    banner(header) +
    `export const ${exportName} = ${JSON.stringify(data, null, 2)};\n` +
    extra;
  writeFileSync(join(__dirname, file), body, 'utf8');
  console.log(`   ✅ ${file}: ${Array.isArray(data) ? data.length : Object.keys(data).length} records`);
}

// ── Load existing seeds for curated-field fallback ───────────────
const prev = {};
async function loadPrev() {
  prev.industries = (await import('./industries.mjs')).industries;
  prev.attributes = (await import('./attributes.mjs')).productAttributes;
  prev.zones = (await import('./industrial_zones.mjs')).industrialZones;
}

// ═══════════════════════════════════════════════════════════════
async function main() {
  await loadPrev();
  console.log('\n── Regenerating seed-v2 data from DB ──\n');

  // ── STANDARDS ──
  const standards = q(`
    SELECT COALESCE(json_agg(json_build_object(
      'name', s.name, 'slug', s.slug, 'status', s.status, 'description', s.description,
      'translations', COALESCE(tr.t, '{}'::json)
    ) ORDER BY s.id), '[]')
    FROM standards s
    LEFT JOIN LATERAL (
      SELECT json_object_agg(languages_code, json_build_object('name', name, 'description', description)) t
      FROM standards_translations WHERE standards_id = s.id
    ) tr ON true;`);
  emit('standards.mjs', 'Standards (Tiêu chuẩn chất lượng)', 'standards', standards);

  // ── INDUSTRIES (merge curated `solutions`) ──
  const industriesDb = q(`
    SELECT COALESCE(json_agg(json_build_object(
      'name', i.name, 'slug', i.slug, 'status', i.status, 'description', i.description, 'icon', i.icon,
      'translations', COALESCE(tr.t, '{}'::json)
    ) ORDER BY i.id), '[]')
    FROM industries i
    LEFT JOIN LATERAL (
      SELECT json_object_agg(languages_code, json_build_object('name', name, 'description', description)) t
      FROM industries_translations WHERE industries_id = i.id
    ) tr ON true;`);
  const industries = industriesDb.map((ind) => {
    const old = prev.industries.find((x) => x.slug === ind.slug);
    return old?.solutions ? { ...ind, solutions: old.solutions } : ind;
  });
  emit('industries.mjs', 'Industries (Ngành công nghiệp)', 'industries', industries);

  // ── ATTRIBUTES + OPTIONS (merge curated type/label/translations) ──
  const attrsDb = q(`
    SELECT COALESCE(json_agg(json_build_object(
      'name', a.name, 'slug', a.slug, 'sort', a.sort,
      'options', COALESCE(o.opts, '[]'::json)
    ) ORDER BY a.sort, a.id), '[]')
    FROM product_attributes a
    LEFT JOIN LATERAL (
      SELECT json_agg(json_build_object('value', value, 'sku_suffix', sku_suffix, 'sort', sort) ORDER BY sort, id) opts
      FROM product_attribute_options WHERE attribute = a.id
    ) o ON true;`);
  const productAttributes = attrsDb.map((attr) => {
    const old = prev.attributes.find((x) => x.slug === attr.slug);
    const options = (attr.options || []).map((opt) => {
      const oldOpt = old?.options?.find((x) => x.value === opt.value);
      return {
        value: opt.value,
        label: oldOpt?.label ?? opt.value,
        ...(opt.sku_suffix != null ? { sku_suffix: opt.sku_suffix } : {}),
        ...(oldOpt?.translations ? { translations: oldOpt.translations } : {})
      };
    });
    return {
      name: attr.name,
      slug: attr.slug,
      ...(old?.type ? { type: old.type } : {}),
      ...(old?.translations ? { translations: old.translations } : {}),
      options
    };
  });
  emit('attributes.mjs', 'Product Attributes & Options', 'productAttributes', productAttributes);

  // ── CATEGORIES ──
  const categories = q(`
    SELECT COALESCE(json_agg(json_build_object(
      'name', c.name, 'slug', c.slug, 'status', c.status, 'sort', c.sort,
      'parentSlug', p.slug,
      'description', c.description, 'hero_image', c.hero_image,
      'meta_title', c.meta_title, 'meta_description', c.meta_description,
      'translations', COALESCE(tr.t, '{}'::json)
    ) ORDER BY (c.parent IS NOT NULL), c.sort, c.id), '[]')
    FROM product_categories c
    LEFT JOIN product_categories p ON p.id = c.parent
    LEFT JOIN LATERAL (
      SELECT json_object_agg(languages_code, json_build_object(
        'name', name, 'description', description, 'meta_title', meta_title, 'meta_description', meta_description
      )) t
      FROM product_categories_translations WHERE product_categories_id = c.id
    ) tr ON true;`);
  emit('categories.mjs', 'Product Categories', 'productCategories', categories);

  // ── PRODUCTS ──
  const products = q(`
    SELECT COALESCE(json_agg(json_build_object(
      'categorySlug', c.slug,
      'name', p.name, 'slug', p.slug, 'status', p.status, 'brand', p.brand,
      'short_description', p.short_description, 'specifications', p.specifications,
      'imagePath', p.hero, 'features', p.features, 'description', p.description,
      'meta_title', p.meta_title, 'meta_description', p.meta_description
    ) ORDER BY p.id), '[]')
    FROM products p
    LEFT JOIN product_categories c ON c.id = p.category;`);
  emit('products_data.mjs', 'Products', 'productsToSeed', products);

  // ── TRANSLATIONS (EN/JA only; VI is the base row on products) ──
  const translations = q(`
    SELECT COALESCE(json_agg(json_build_object(
      'productSlug', p.slug, 'lang', t.languages_code,
      'name', t.name, 'short_description', t.short_description,
      'specifications', t.specifications,
      'meta_title', t.meta_title, 'meta_description', t.meta_description
    ) ORDER BY p.id, t.languages_code), '[]')
    FROM products_translations t
    JOIN products p ON p.id = t.products_id
    WHERE t.languages_code <> 'vi';`);
  emit('translations.mjs', 'Product Translations (EN / JA)', 'productTranslations', translations);

  // ── SKUS (base rows only; runner expands S/M/L) ──
  const skusRaw = q(`
    SELECT COALESCE(json_agg(json_build_object(
      'sku_code', s.sku_code, 'productSlug', p.slug, 'unit', s.unit,
      'pack_size', s.pack_size, 'price', s.price,
      'stock_status', s.stock_status, 'status', s.status
    ) ORDER BY s.id), '[]')
    FROM product_skus s
    JOIN products p ON p.id = s.product
    WHERE s.sku_code NOT LIKE '%-M' AND s.sku_code NOT LIKE '%-L';`);
  const skusToSeed = skusRaw.map((s) => {
    // Parse "MOQ: 100 cuộn" → moq / moq_unit
    let moq = null, moq_unit = s.unit;
    const m = /MOQ:\s*(\d+)\s*(.*)/.exec(s.pack_size || '');
    if (m) { moq = Number(m[1]); moq_unit = (m[2] || s.unit).trim(); }
    return {
      sku_code: s.sku_code,
      productSlug: s.productSlug,
      unit: s.unit,
      pack_size: s.unit === 'kg' ? 'per kg' : `1 ${s.unit}`,
      price: s.price == null ? null : Number(s.price),
      moq,
      moq_unit,
      stock_status: s.stock_status || 'in_stock',
      status: s.status || 'published'
    };
  });
  emit('skus_data.mjs', 'Product SKUs', 'skusToSeed', skusToSeed);

  // ── LINKS (4 junctions, resolved to slugs) ──
  const productsIndustries = q(`
    SELECT COALESCE(json_agg(json_build_object('productSlug', p.slug, 'industrySlug', i.slug) ORDER BY p.id, i.id), '[]')
    FROM products_industries j JOIN products p ON p.id=j.products_id JOIN industries i ON i.id=j.industries_id;`);
  const productsStandards = q(`
    SELECT COALESCE(json_agg(json_build_object('productSlug', p.slug, 'standardSlug', s.slug) ORDER BY p.id, s.id), '[]')
    FROM products_standards j JOIN products p ON p.id=j.products_id JOIN standards s ON s.id=j.standards_id;`);
  const productsRegionalHubs = q(`
    SELECT COALESCE(json_agg(json_build_object('productSlug', p.slug, 'hubSlug', h.slug) ORDER BY p.id, h.id), '[]')
    FROM products_regional_hubs j JOIN products p ON p.id=j.products_id JOIN regional_hubs h ON h.id=j.regional_hubs_id;`);
  const productsAttributes = q(`
    SELECT COALESCE(json_agg(json_build_object('productSlug', p.slug, 'attributeSlug', a.slug) ORDER BY p.id, a.id), '[]')
    FROM products_product_attributes j JOIN products p ON p.id=j.products_id JOIN product_attributes a ON a.id=j.product_attributes_id;`);
  emit('links.mjs', 'Junction Tables (Links)', 'productsIndustries', productsIndustries,
    `\nexport const productsStandards = ${JSON.stringify(productsStandards, null, 2)};\n` +
    `\nexport const productsRegionalHubs = ${JSON.stringify(productsRegionalHubs, null, 2)};\n` +
    `\nexport const productsAttributes = ${JSON.stringify(productsAttributes, null, 2)};\n`);

  // ── INDUSTRIAL ZONES (merge curated featured/description by name) ──
  const zonesDb = q(`
    SELECT COALESCE(json_agg(json_build_object(
      'name', z.name, 'hubSlug', h.slug, 'corridor', z.corridor, 'image', z.image,
      'translations', COALESCE(tr.t, '{}'::json)
    ) ORDER BY z.id), '[]')
    FROM hub_industrial_zones z
    LEFT JOIN regional_hubs h ON h.id = z.hub
    LEFT JOIN LATERAL (
      SELECT json_object_agg(languages_code, json_build_object('name', name)) t
      FROM hub_industrial_zones_translations WHERE hub_industrial_zones_id = z.id
    ) tr ON true;`);
  const zones = zonesDb.map((z) => {
    const old = prev.zones.find((x) => x.name === z.name);
    return {
      name: z.name,
      hubSlug: z.hubSlug,
      corridor: z.corridor,
      ...(z.image ? { image: z.image } : {}),
      ...(old?.featured != null ? { featured: old.featured } : {}),
      ...(old?.description ? { description: old.description } : {}),
      ...(z.translations && Object.keys(z.translations).length ? { translations: z.translations } : {})
    };
  });
  emit('industrial_zones.mjs', 'Hub Industrial Zones (KCN)', 'industrialZones', zones);

  // ── TEAM MEMBERS ──
  const members = q(`
    SELECT COALESCE(json_agg(json_build_object(
      'name', m.name, 'role', m.role, 'years_experience', m.years_experience,
      'hubSlug', h.slug, 'photo', m.photo, 'sort', m.sort
    ) ORDER BY m.sort, m.id), '[]')
    FROM hub_team_members m
    LEFT JOIN regional_hubs h ON h.id = m.hub;`);
  const teamMembers = members.map((m) => ({
    name: m.name, role: m.role, years_experience: m.years_experience,
    hubSlug: m.hubSlug, ...(m.photo ? { photo: m.photo } : {}), sort: m.sort
  }));
  emit('team_members.mjs', 'Hub Team Members', 'teamMembers', teamMembers);

  console.log('\n── Done ──\n');
}

main().catch((e) => { console.error(e); process.exit(1); });

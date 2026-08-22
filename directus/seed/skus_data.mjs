export const skusToSeedData = [
  // === Product 1: tyvek-cleanroom-coverall ===
  {
    sku_code: 'CVL-TYVEK-S',
    productSlug: 'tyvek-cleanroom-coverall',
    unit: 'pcs',
    pack_size: '25 pcs/case',
    attributes: { size: 'S' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'CVL-TYVEK-M',
    productSlug: 'tyvek-cleanroom-coverall',
    unit: 'pcs',
    pack_size: '25 pcs/case',
    attributes: { size: 'M' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'CVL-TYVEK-L',
    productSlug: 'tyvek-cleanroom-coverall',
    unit: 'pcs',
    pack_size: '25 pcs/case',
    attributes: { size: 'L' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'CVL-TYVEK-XL',
    productSlug: 'tyvek-cleanroom-coverall',
    unit: 'pcs',
    pack_size: '25 pcs/case',
    attributes: { size: 'XL' },
    stock_status: 'low_stock',
    status: 'published'
  },

  // === Product 2: cleanroom-face-mask-3ply ===
  {
    sku_code: 'MSK-3PLY-BLU-50',
    productSlug: 'cleanroom-face-mask-3ply',
    unit: 'box',
    pack_size: '50 pcs/box',
    attributes: { color: 'blue' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'MSK-3PLY-WHT-50',
    productSlug: 'cleanroom-face-mask-3ply',
    unit: 'box',
    pack_size: '50 pcs/box',
    attributes: { color: 'white' },
    stock_status: 'out_of_stock',
    status: 'published'
  },
  {
    sku_code: 'MSK-3PLY-GRN-50',
    productSlug: 'cleanroom-face-mask-3ply',
    unit: 'box',
    pack_size: '50 pcs/box',
    attributes: { color: 'green' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'MSK-3PLY-PNK-50',
    productSlug: 'cleanroom-face-mask-3ply',
    unit: 'box',
    pack_size: '50 pcs/box',
    attributes: { color: 'pink' },
    stock_status: 'in_stock',
    status: 'published'
  },

  // === Product 3: esd-wrist-strap ===
  {
    sku_code: 'ESD-WRIST-BLU',
    productSlug: 'esd-wrist-strap',
    unit: 'pcs',
    pack_size: '1 pcs',
    attributes: { color: 'blue' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'ESD-WRIST-BLK',
    productSlug: 'esd-wrist-strap',
    unit: 'pcs',
    pack_size: '1 pcs',
    attributes: { color: 'black' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'ESD-WRIST-GRN',
    productSlug: 'esd-wrist-strap',
    unit: 'pcs',
    pack_size: '1 pcs',
    attributes: { color: 'green' },
    stock_status: 'low_stock',
    status: 'published'
  },
  {
    sku_code: 'ESD-WRIST-RED',
    productSlug: 'esd-wrist-strap',
    unit: 'pcs',
    pack_size: '1 pcs',
    attributes: { color: 'red' },
    stock_status: 'out_of_stock',
    status: 'published'
  },

  // === Product 4: esd-table-mat-2layer ===
  {
    sku_code: 'ESD-MAT-60x120',
    productSlug: 'esd-table-mat-2layer',
    unit: 'roll',
    pack_size: '60x120cm',
    attributes: { size: '60x120cm' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'ESD-MAT-90x150',
    productSlug: 'esd-table-mat-2layer',
    unit: 'roll',
    pack_size: '90x150cm',
    attributes: { size: '90x150cm' },
    stock_status: 'low_stock',
    status: 'published'
  },
  {
    sku_code: 'ESD-MAT-100x1000',
    productSlug: 'esd-table-mat-2layer',
    unit: 'roll',
    pack_size: '1m x 10m',
    attributes: { size: '1m x 10m' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'ESD-MAT-120x1000',
    productSlug: 'esd-table-mat-2layer',
    unit: 'roll',
    pack_size: '1.2m x 10m',
    attributes: { size: '1.2m x 10m' },
    stock_status: 'in_stock',
    status: 'published'
  },

  // === Product 5: ipa-cleanroom-grade-999 ===
  {
    sku_code: 'IPA-999-500ML',
    productSlug: 'ipa-cleanroom-grade-999',
    unit: 'bottle',
    pack_size: '500ml',
    attributes: { volume: '500ml' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'IPA-999-1L',
    productSlug: 'ipa-cleanroom-grade-999',
    unit: 'bottle',
    pack_size: '1L',
    attributes: { volume: '1L' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'IPA-999-5L',
    productSlug: 'ipa-cleanroom-grade-999',
    unit: 'can',
    pack_size: '5L',
    attributes: { volume: '5L' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'IPA-999-20L',
    productSlug: 'ipa-cleanroom-grade-999',
    unit: 'drum',
    pack_size: '20L',
    attributes: { volume: '20L' },
    stock_status: 'out_of_stock',
    status: 'published'
  },

  // === Product 6: sticky-mat-30-layers ===
  {
    sku_code: 'SMAT-30L-BLU',
    productSlug: 'sticky-mat-30-layers',
    unit: 'pack',
    pack_size: '4 mats/case',
    attributes: { color: 'blue' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'SMAT-30L-WHT',
    productSlug: 'sticky-mat-30-layers',
    unit: 'pack',
    pack_size: '4 mats/case',
    attributes: { color: 'white' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'SMAT-30L-GRN',
    productSlug: 'sticky-mat-30-layers',
    unit: 'pack',
    pack_size: '4 mats/case',
    attributes: { color: 'green' },
    stock_status: 'low_stock',
    status: 'published'
  },
  {
    sku_code: 'SMAT-30L-GRY',
    productSlug: 'sticky-mat-30-layers',
    unit: 'pack',
    pack_size: '4 mats/case',
    attributes: { color: 'gray' },
    stock_status: 'in_stock',
    status: 'published'
  },

  // === Product 7: esd-shielding-bag ===
  {
    sku_code: 'ESD-BAG-4x6',
    productSlug: 'esd-shielding-bag',
    unit: 'pack',
    pack_size: '100 pcs/pack',
    attributes: { size: '4x6 inch' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'ESD-BAG-6x10',
    productSlug: 'esd-shielding-bag',
    unit: 'pack',
    pack_size: '100 pcs/pack',
    attributes: { size: '6x10 inch' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'ESD-BAG-8x12',
    productSlug: 'esd-shielding-bag',
    unit: 'pack',
    pack_size: '100 pcs/pack',
    attributes: { size: '8x12 inch' },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'ESD-BAG-12x16',
    productSlug: 'esd-shielding-bag',
    unit: 'pack',
    pack_size: '50 pcs/pack',
    attributes: { size: '12x16 inch' },
    stock_status: 'low_stock',
    status: 'published'
  },

  // === Product 8: sterile-latex-cleanroom-gloves ===
  {
    sku_code: 'GLV-LATEX-ST-S',
    productSlug: 'sterile-latex-cleanroom-gloves',
    unit: 'pair',
    pack_size: '200 pairs/case',
    attributes: { size: 'S', sterile: true },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'GLV-LATEX-ST-M',
    productSlug: 'sterile-latex-cleanroom-gloves',
    unit: 'pair',
    pack_size: '200 pairs/case',
    attributes: { size: 'M', sterile: true },
    stock_status: 'in_stock',
    status: 'published'
  },
  {
    sku_code: 'GLV-LATEX-ST-L',
    productSlug: 'sterile-latex-cleanroom-gloves',
    unit: 'pair',
    pack_size: '200 pairs/case',
    attributes: { size: 'L', sterile: true },
    stock_status: 'out_of_stock',
    status: 'published'
  },
  {
    sku_code: 'GLV-LATEX-ST-XL',
    productSlug: 'sterile-latex-cleanroom-gloves',
    unit: 'pair',
    pack_size: '200 pairs/case',
    attributes: { size: 'XL', sterile: true },
    stock_status: 'in_stock',
    status: 'published'
  }
];

/**
 * Seed V2 — Product SKUs
 *
 * Mỗi sản phẩm 1 SKU chính với giá và MOQ từ README.
 * Đơn vị giá: VND
 */

export const skusToSeed = [
  // ═══════════════════════════════════════════════════════════════
  // BĂNG KEO NHÔM — 16 SKUs
  // ═══════════════════════════════════════════════════════════════
  { sku_code: 'BKN-HVAC48-001',     productSlug: 'bang-keo-nhom-hvac-48mm',     unit: 'cuộn', pack_size: '1 cuộn',   price: 85000,  moq: 100,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-CN72-001',       productSlug: 'bang-keo-chiu-nhiet-72mm',    unit: 'cuộn', pack_size: '1 cuộn',   price: 125000, moq: 50,    moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-STT-001',        productSlug: 'bang-keo-nhom-soi-thuy-tinh', unit: 'cuộn', pack_size: '1 cuộn',   price: 155000, moq: 50,    moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-BO96-001',       productSlug: 'bang-keo-nhom-bao-on-96mm',   unit: 'cuộn', pack_size: '1 cuộn',   price: 195000, moq: 30,    moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-3M425-001',      productSlug: 'bang-keo-nhom-3m-425',        unit: 'cuộn', pack_size: '1 cuộn',   price: 85000,  moq: 100,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-NITTO950-001',   productSlug: 'bang-keo-nhom-nitto-950',     unit: 'cuộn', pack_size: '1 cuộn',   price: 72000,  moq: 100,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-DUCT-001',       productSlug: 'bang-keo-nhom-hvac-duct',     unit: 'cuộn', pack_size: '1 cuộn',   price: 45000,  moq: 200,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-CACHN-001',      productSlug: 'bang-keo-nhom-cach-nhiet',    unit: 'cuộn', pack_size: '1 cuộn',   price: 62000,  moq: 120,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-CHAY-001',       productSlug: 'bang-keo-nhom-chong-chay',    unit: 'cuộn', pack_size: '1 cuộn',   price: 120000, moq: 80,    moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-MAKEM-001',      productSlug: 'bang-keo-nhom-ma-kem',        unit: 'cuộn', pack_size: '1 cuộn',   price: 55000,  moq: 100,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-TUDINH-001',     productSlug: 'bang-keo-nhom-tu-dinh',       unit: 'cuộn', pack_size: '1 cuộn',   price: 48000,  moq: 200,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-CN-001',         productSlug: 'bang-keo-nhom-cong-nghiep',   unit: 'cuộn', pack_size: '1 cuộn',   price: 38000,  moq: 300,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-HVAC-KG',        productSlug: 'bang-keo-nhom-hvac',          unit: 'kg',   pack_size: 'per kg',   price: 39500,  moq: 500,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BKN-VAR-KG',         productSlug: 'bang-keo-nhom-variant',       unit: 'kg',   pack_size: 'per kg',   price: 39500,  moq: 500,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BD-SX-KG',           productSlug: 'bang-dinh-san-xuat',          unit: 'kg',   pack_size: 'per kg',   price: 39500,  moq: 500,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'MQP-DK-KG',          productSlug: 'mang-quan-pallet-dong-kien',  unit: 'kg',   pack_size: 'per kg',   price: 39500,  moq: 500,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },

  // ═══════════════════════════════════════════════════════════════
  // BAO BÌ & ĐÓNG GÓI — 11 SKUs
  // ═══════════════════════════════════════════════════════════════
  { sku_code: 'BB-MQP-KG',          productSlug: 'mang-quan-pallet',            unit: 'kg',   pack_size: 'per kg',   price: 39500,  moq: 500,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-CT5L-001',        productSlug: 'thung-carton-5-lop',          unit: 'cái',  pack_size: '1 cái',    price: 12800,  moq: 1000,  moq_unit: 'cái',   stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-OPP-001',         productSlug: 'bang-keo-opp',                unit: 'cuộn', pack_size: '1 cuộn',   price: 18000,  moq: 200,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-TPECN-KG',        productSlug: 'tui-pe-cong-nghiep',          unit: 'kg',   pack_size: 'per kg',   price: 8500,   moq: 300,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-PALLET-001',      productSlug: 'pallet-nhua-cong-nghiep',     unit: 'cái',  pack_size: '1 cái',    price: 185000, moq: 50,    moq_unit: 'cái',   stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-DAIPP-001',       productSlug: 'day-dai-pp-dong-hang',        unit: 'cuộn', pack_size: '1 cuộn',   price: 25000,  moq: 100,   moq_unit: 'cuộn',  stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-POF-KG',          productSlug: 'mang-co-pof',                 unit: 'kg',   pack_size: 'per kg',   price: 42000,  moq: 200,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-GCA-KG',          productSlug: 'giay-chong-am',               unit: 'kg',   pack_size: 'per kg',   price: 32000,  moq: 150,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-PESF-KG',         productSlug: 'mang-co-pe-shrink-film',      unit: 'kg',   pack_size: 'per kg',   price: 50000,  moq: 500,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-TPEKT-KG',        productSlug: 'tui-pe-nhieu-kich-thuoc',     unit: 'kg',   pack_size: 'per kg',   price: 35000,  moq: 500,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'BB-ZIPKT-KG',        productSlug: 'tui-ziper-nhieu-kich-thuoc',  unit: 'kg',   pack_size: 'per kg',   price: 59500,  moq: 500,   moq_unit: 'kg',    stock_status: 'in_stock',  status: 'published' },

  // ═══════════════════════════════════════════════════════════════
  // VẬT TƯ PHÒNG SẠCH — 4 SKUs
  // ═══════════════════════════════════════════════════════════════
  { sku_code: 'PS-GTNCL1000-001',   productSlug: 'gang-tay-nitrile-class-1000', unit: 'pcs',    pack_size: '1 pcs',      price: 2000,   moq: 50000, moq_unit: 'pcs',     stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'PS-GTNYT-001',       productSlug: 'gang-tay-nitrile-y-te-spa',   unit: 'pcs',    pack_size: '1 pcs',      price: 2500,   moq: 30000, moq_unit: 'pcs',     stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'PS-THAMPS-001',      productSlug: 'tham-phong-sach',             unit: 'sheet',  pack_size: '1 sheet',    price: 150000, moq: 500,   moq_unit: 'sheet',   stock_status: 'in_stock',  status: 'published' },
  { sku_code: 'PS-KLWIPER-001',     productSlug: 'khan-lau-phong-sach-wiper',   unit: 'carton', pack_size: '1 carton',   price: 400000, moq: 10,    moq_unit: 'carton',  stock_status: 'in_stock',  status: 'published' }
];

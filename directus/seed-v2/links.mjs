/**
 * Seed V2 — Junction Tables (Links)
 *
 * Liên kết M2M giữa products ↔ industries, standards, hubs, attributes.
 * Dùng slug để resolve FK khi seed.
 */

// ═══════════════════════════════════════════════════════════════
// PRODUCTS ↔ INDUSTRIES
// ═══════════════════════════════════════════════════════════════

export const productsIndustries = [
  // ── Băng keo Nhôm → Cơ khí & HVAC, Nội thất ──
  { productSlug: 'bang-keo-nhom-hvac-48mm',     industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-chiu-nhiet-72mm',    industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-soi-thuy-tinh', industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-bao-on-96mm',   industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-3m-425',        industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-nitto-950',     industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-hvac-duct',     industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-cach-nhiet',    industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-chong-chay',    industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-ma-kem',        industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-tu-dinh',       industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-cong-nghiep',   industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-hvac',          industrySlug: 'co-khi-hvac' },
  { productSlug: 'bang-keo-nhom-cach-nhiet',    industrySlug: 'noi-that' },
  { productSlug: 'bang-keo-nhom-tu-dinh',       industrySlug: 'noi-that' },
  { productSlug: 'bang-keo-nhom-cong-nghiep',   industrySlug: 'noi-that' },

  // ── Bao bì → Kho & Logistics, Thực phẩm, Nội thất ──
  { productSlug: 'mang-quan-pallet',            industrySlug: 'kho-logistics' },
  { productSlug: 'mang-quan-pallet-dong-kien',  industrySlug: 'kho-logistics' },
  { productSlug: 'thung-carton-5-lop',          industrySlug: 'kho-logistics' },
  { productSlug: 'bang-keo-opp',                industrySlug: 'kho-logistics' },
  { productSlug: 'tui-pe-cong-nghiep',          industrySlug: 'kho-logistics' },
  { productSlug: 'pallet-nhua-cong-nghiep',     industrySlug: 'kho-logistics' },
  { productSlug: 'day-dai-pp-dong-hang',        industrySlug: 'kho-logistics' },
  { productSlug: 'mang-co-pof',                 industrySlug: 'kho-logistics' },
  { productSlug: 'giay-chong-am',               industrySlug: 'kho-logistics' },
  { productSlug: 'mang-co-pe-shrink-film',      industrySlug: 'kho-logistics' },
  { productSlug: 'tui-pe-nhieu-kich-thuoc',     industrySlug: 'kho-logistics' },
  { productSlug: 'tui-ziper-nhieu-kich-thuoc',  industrySlug: 'kho-logistics' },
  { productSlug: 'mang-co-pof',                 industrySlug: 'thuc-pham' },
  { productSlug: 'mang-co-pe-shrink-film',      industrySlug: 'thuc-pham' },
  { productSlug: 'tui-pe-cong-nghiep',          industrySlug: 'thuc-pham' },
  { productSlug: 'tui-pe-nhieu-kich-thuoc',     industrySlug: 'thuc-pham' },
  { productSlug: 'tui-ziper-nhieu-kich-thuoc',  industrySlug: 'thuc-pham' },
  { productSlug: 'thung-carton-5-lop',          industrySlug: 'noi-that' },
  { productSlug: 'mang-quan-pallet',            industrySlug: 'noi-that' },
  { productSlug: 'giay-chong-am',               industrySlug: 'noi-that' },

  // ── Phòng sạch → Điện tử, Dược phẩm, Thực phẩm ──
  { productSlug: 'gang-tay-nitrile-class-1000', industrySlug: 'dien-tu' },
  { productSlug: 'gang-tay-nitrile-class-1000', industrySlug: 'duoc-pham' },
  { productSlug: 'gang-tay-nitrile-y-te-spa',   industrySlug: 'duoc-pham' },
  { productSlug: 'gang-tay-nitrile-y-te-spa',   industrySlug: 'thuc-pham' },
  { productSlug: 'tham-phong-sach',             industrySlug: 'dien-tu' },
  { productSlug: 'tham-phong-sach',             industrySlug: 'duoc-pham' },
  { productSlug: 'khan-lau-phong-sach-wiper',   industrySlug: 'dien-tu' },
  { productSlug: 'khan-lau-phong-sach-wiper',   industrySlug: 'duoc-pham' }
];


// ═══════════════════════════════════════════════════════════════
// PRODUCTS ↔ STANDARDS
// ═══════════════════════════════════════════════════════════════

export const productsStandards = [
  // Băng keo → ISO 9001, UL 723, ASTM D3359
  { productSlug: 'bang-keo-nhom-hvac-48mm',     standardSlug: 'iso-9001' },
  { productSlug: 'bang-keo-nhom-hvac-48mm',     standardSlug: 'astm-d3359' },
  { productSlug: 'bang-keo-chiu-nhiet-72mm',    standardSlug: 'iso-9001' },
  { productSlug: 'bang-keo-nhom-soi-thuy-tinh', standardSlug: 'iso-9001' },
  { productSlug: 'bang-keo-nhom-3m-425',        standardSlug: 'iso-9001' },
  { productSlug: 'bang-keo-nhom-3m-425',        standardSlug: 'astm-d3359' },
  { productSlug: 'bang-keo-nhom-nitto-950',     standardSlug: 'iso-9001' },
  { productSlug: 'bang-keo-nhom-chong-chay',    standardSlug: 'ul-723' },
  { productSlug: 'bang-keo-nhom-chong-chay',    standardSlug: 'iso-9001' },

  // Bao bì → ISO 22000, ISTA 3A, RoHS
  { productSlug: 'mang-quan-pallet',            standardSlug: 'ista-3a' },
  { productSlug: 'thung-carton-5-lop',          standardSlug: 'ista-3a' },
  { productSlug: 'pallet-nhua-cong-nghiep',     standardSlug: 'ista-3a' },
  { productSlug: 'mang-co-pof',                 standardSlug: 'iso-22000' },
  { productSlug: 'mang-co-pe-shrink-film',      standardSlug: 'iso-22000' },
  { productSlug: 'tui-pe-cong-nghiep',          standardSlug: 'rohs' },
  { productSlug: 'tui-pe-nhieu-kich-thuoc',     standardSlug: 'rohs' },
  { productSlug: 'tui-ziper-nhieu-kich-thuoc',  standardSlug: 'rohs' },

  // Phòng sạch → ISO 14644, IEC 61340, EN ISO 374
  { productSlug: 'gang-tay-nitrile-class-1000', standardSlug: 'iso-14644-1' },
  { productSlug: 'gang-tay-nitrile-class-1000', standardSlug: 'en-iso-374' },
  { productSlug: 'gang-tay-nitrile-y-te-spa',   standardSlug: 'en-iso-374' },
  { productSlug: 'tham-phong-sach',             standardSlug: 'iso-14644-1' },
  { productSlug: 'khan-lau-phong-sach-wiper',   standardSlug: 'iso-14644-1' },
  { productSlug: 'khan-lau-phong-sach-wiper',   standardSlug: 'iec-61340-5-1' }
];


// ═══════════════════════════════════════════════════════════════
// PRODUCTS ↔ REGIONAL HUBS (availability)
// Tất cả 31 SP available ở cả 3 Hub (vì inventory đã có).
// ═══════════════════════════════════════════════════════════════

const ALL_PRODUCT_SLUGS = [
  // Băng keo (16)
  'bang-keo-nhom-hvac-48mm', 'bang-keo-chiu-nhiet-72mm', 'bang-keo-nhom-soi-thuy-tinh',
  'bang-keo-nhom-bao-on-96mm', 'bang-keo-nhom-3m-425', 'bang-keo-nhom-nitto-950',
  'bang-keo-nhom-hvac-duct', 'bang-keo-nhom-cach-nhiet', 'bang-keo-nhom-chong-chay',
  'bang-keo-nhom-ma-kem', 'bang-keo-nhom-tu-dinh', 'bang-keo-nhom-cong-nghiep',
  'bang-keo-nhom-hvac', 'bang-keo-nhom-variant', 'bang-dinh-san-xuat', 'mang-quan-pallet-dong-kien',
  // Bao bì (11)
  'mang-quan-pallet', 'thung-carton-5-lop', 'bang-keo-opp', 'tui-pe-cong-nghiep',
  'pallet-nhua-cong-nghiep', 'day-dai-pp-dong-hang', 'mang-co-pof', 'giay-chong-am',
  'mang-co-pe-shrink-film', 'tui-pe-nhieu-kich-thuoc', 'tui-ziper-nhieu-kich-thuoc',
  // Phòng sạch (4)
  'gang-tay-nitrile-class-1000', 'gang-tay-nitrile-y-te-spa', 'tham-phong-sach', 'khan-lau-phong-sach-wiper'
];

const ALL_HUB_SLUGS = ['hub-mien-bac', 'hub-mien-trung', 'hub-mien-nam'];

export const productsRegionalHubs = ALL_PRODUCT_SLUGS.flatMap(productSlug =>
  ALL_HUB_SLUGS.map(hubSlug => ({ productSlug, hubSlug }))
);
// → 31 × 3 = 93 records


// ═══════════════════════════════════════════════════════════════
// PRODUCTS ↔ PRODUCT ATTRIBUTES
// Gán attribute options cho từng sản phẩm.
// ═══════════════════════════════════════════════════════════════

export const productsAttributes = [
  // ── Kích cỡ (Size) ──
  { productSlug: 'gang-tay-nitrile-class-1000', attributeSlug: 'size', optionValue: 'S' },
  { productSlug: 'gang-tay-nitrile-class-1000', attributeSlug: 'size', optionValue: 'M' },
  { productSlug: 'gang-tay-nitrile-class-1000', attributeSlug: 'size', optionValue: 'L' },
  { productSlug: 'gang-tay-nitrile-y-te-spa',   attributeSlug: 'size', optionValue: 'S' },
  { productSlug: 'gang-tay-nitrile-y-te-spa',   attributeSlug: 'size', optionValue: 'M' },
  { productSlug: 'bang-keo-nhom-hvac-48mm',     attributeSlug: 'size', optionValue: 'L' },
  { productSlug: 'bang-keo-chiu-nhiet-72mm',    attributeSlug: 'size', optionValue: 'XL' },
  { productSlug: 'mang-quan-pallet',            attributeSlug: 'size', optionValue: 'L' },

  // ── Màu sắc (Color) ──
  { productSlug: 'gang-tay-nitrile-class-1000', attributeSlug: 'color', optionValue: 'blue' },
  { productSlug: 'gang-tay-nitrile-class-1000', attributeSlug: 'color', optionValue: 'white' },
  { productSlug: 'gang-tay-nitrile-y-te-spa',   attributeSlug: 'color', optionValue: 'pink' },
  { productSlug: 'tham-phong-sach',             attributeSlug: 'color', optionValue: 'blue' },
  { productSlug: 'tham-phong-sach',             attributeSlug: 'color', optionValue: 'green' },
  { productSlug: 'khan-lau-phong-sach-wiper',   attributeSlug: 'color', optionValue: 'white' },

  // ── Trọng lượng cuộn (Roll Weight) ──
  { productSlug: 'mang-quan-pallet',            attributeSlug: 'roll-weight', optionValue: '2.4kg' },
  { productSlug: 'mang-quan-pallet',            attributeSlug: 'roll-weight', optionValue: '3.0kg' },
  { productSlug: 'mang-quan-pallet',            attributeSlug: 'roll-weight', optionValue: '4.0kg' },
  { productSlug: 'bang-keo-nhom-hvac-48mm',     attributeSlug: 'roll-weight', optionValue: '2.4kg' },
  { productSlug: 'bang-keo-chiu-nhiet-72mm',    attributeSlug: 'roll-weight', optionValue: '3.0kg' },
  { productSlug: 'bang-keo-opp',                attributeSlug: 'roll-weight', optionValue: '2.4kg' }
];

/**
 * Seed V2 — Product Translations (EN / JA)
 *
 * Bản dịch cho 31 sản phẩm. VI là ngôn ngữ gốc → nằm trong products_data.mjs.
 * Mỗi entry dịch: name, short_description, specifications, meta_title, meta_description.
 *
 * Quy ước `specifications`: KEY giữ nguyên tiếng Việt (khớp key gốc để admin
 * edit form ánh xạ đúng), chỉ VALUE được dịch. Resolver frontend
 * (getTranslatedSpecifications) trả về nguyên map của locale khi có.
 */

export const productTranslations = [
  // ═══════════════════════════════════════════════════════════════
  // BĂNG KEO NHÔM
  // ═══════════════════════════════════════════════════════════════
  {
    productSlug: 'bang-keo-nhom-hvac-48mm', lang: 'en',
    name: 'HVAC Aluminum Tape 48mm x 30m',
    short_description: 'HVAC aluminum tape 48mm, 40 micron thick, for ductwork systems.',
    specifications: { 'Kích thước': '48mm x 30m', 'Độ dày': '40 micron', 'Ứng dụng': 'HVAC' },
    meta_title: 'HVAC Aluminum Tape 48mm | ULink',
    meta_description: 'HVAC aluminum tape 48mm x 30m, 40 micron thick for ductwork systems.'
  },
  {
    productSlug: 'bang-keo-nhom-hvac-48mm', lang: 'ja',
    name: 'HVACアルミテープ 48mm x 30m',
    short_description: 'HVAC用アルミテープ 48mm、厚さ40ミクロン。',
    specifications: { 'Kích thước': '48mm x 30m', 'Độ dày': '40ミクロン', 'Ứng dụng': 'HVAC' },
    meta_title: 'HVACアルミテープ 48mm | ULink',
    meta_description: 'HVAC用アルミテープ 48mm x 30m、厚さ40ミクロン、ダクト用。'
  },
  {
    productSlug: 'bang-keo-chiu-nhiet-72mm', lang: 'en',
    name: 'Heat-Resistant Tape 72mm x 45m',
    short_description: 'Aluminum tape withstanding 150°C, 72mm x 45m.',
    specifications: { 'Kích thước': '72mm x 45m', 'Chịu nhiệt': '150°C' },
    meta_title: 'Heat-Resistant Tape 72mm | ULink',
    meta_description: 'Aluminum tape withstanding 150°C, 72mm x 45m.'
  },
  {
    productSlug: 'bang-keo-chiu-nhiet-72mm', lang: 'ja',
    name: '耐熱アルミテープ 72mm x 45m',
    short_description: '150°C耐熱アルミテープ、72mm x 45m。',
    specifications: { 'Kích thước': '72mm x 45m', 'Chịu nhiệt': '150°C' },
    meta_title: '耐熱アルミテープ 72mm | ULink',
    meta_description: '150°C耐熱アルミテープ、72mm x 45m。'
  },
  {
    productSlug: 'bang-keo-nhom-soi-thuy-tinh', lang: 'en',
    name: 'Fiberglass-Reinforced Aluminum Tape',
    short_description: 'FSK Facing Tape with fiberglass reinforcement for insulation.',
    specifications: { 'Loại': 'FSK Facing Tape', 'Gia cường': 'Fiberglass' },
    meta_title: 'Fiberglass Aluminum Tape | ULink',
    meta_description: 'FSK facing tape with fiberglass reinforcement for insulation.'
  },
  {
    productSlug: 'bang-keo-nhom-soi-thuy-tinh', lang: 'ja',
    name: 'ガラス繊維強化アルミテープ',
    short_description: '断熱用FSKフェイシングテープ、ガラス繊維強化。',
    specifications: { 'Loại': 'FSKフェイシングテープ', 'Gia cường': 'ガラス繊維' },
    meta_title: 'ガラス繊維アルミテープ | ULink',
    meta_description: '断熱用FSKフェイシングテープ、ガラス繊維強化。'
  },
  {
    productSlug: 'bang-keo-nhom-bao-on-96mm', lang: 'en',
    name: 'Insulation Aluminum Tape 96mm',
    short_description: '96mm aluminum tape with premium acrylic adhesive for HVAC duct insulation.',
    specifications: { 'Kích thước': '96mm', 'Keo': 'Premium acrylic', 'Ứng dụng': 'Duct insulation' },
    meta_title: 'Insulation Aluminum Tape 96mm | ULink',
    meta_description: '96mm aluminum tape with premium acrylic for HVAC duct insulation.'
  },
  {
    productSlug: 'bang-keo-nhom-bao-on-96mm', lang: 'ja',
    name: '断熱アルミテープ 96mm',
    short_description: 'HVACダクト断熱用96mmアルミテープ、高級アクリル接着剤。',
    specifications: { 'Kích thước': '96mm', 'Keo': '高級アクリル', 'Ứng dụng': 'ダクト断熱' },
    meta_title: '断熱アルミテープ 96mm | ULink',
    meta_description: 'HVACダクト断熱用96mmアルミテープ、高級アクリル。'
  },
  {
    productSlug: 'bang-keo-nhom-3m-425', lang: 'en',
    name: '3M 425 Aluminum Tape',
    short_description: '3M 425 aluminum tape, 150°C heat resistant, genuine US brand.',
    specifications: { 'Thương hiệu': '3M', 'Model': '425', 'Chịu nhiệt': '150°C' },
    meta_title: '3M 425 Aluminum Tape | ULink',
    meta_description: '3M 425 aluminum tape, 150°C heat resistant, genuine US brand.'
  },
  {
    productSlug: 'bang-keo-nhom-3m-425', lang: 'ja',
    name: '3M 425 アルミテープ',
    short_description: '3M 425アルミテープ、150°C耐熱、米国正規品。',
    specifications: { 'Thương hiệu': '3M', 'Model': '425', 'Chịu nhiệt': '150°C' },
    meta_title: '3M 425 アルミテープ | ULink',
    meta_description: '3M 425アルミテープ、150°C耐熱、米国正規品。'
  },
  {
    productSlug: 'bang-keo-nhom-nitto-950', lang: 'en',
    name: 'Nitto 950 Aluminum Tape',
    short_description: 'Nitto 950 fiberglass-reinforced aluminum tape, Japanese brand.',
    specifications: { 'Thương hiệu': 'Nitto', 'Model': '950', 'Gia cố': 'Fiberglass' },
    meta_title: 'Nitto 950 Aluminum Tape | ULink',
    meta_description: 'Nitto 950 fiberglass-reinforced aluminum tape, Japanese brand.'
  },
  {
    productSlug: 'bang-keo-nhom-nitto-950', lang: 'ja',
    name: 'Nitto 950 アルミテープ',
    short_description: 'Nitto 950ガラス繊維強化アルミテープ、日本ブランド。',
    specifications: { 'Thương hiệu': 'Nitto', 'Model': '950', 'Gia cố': 'ガラス繊維' },
    meta_title: 'Nitto 950 アルミテープ | ULink',
    meta_description: 'Nitto 950ガラス繊維強化アルミテープ、日本ブランド。'
  },
  {
    productSlug: 'bang-keo-nhom-hvac-duct', lang: 'en',
    name: 'HVAC Duct Aluminum Tape',
    short_description: 'Specialized aluminum tape for HVAC duct sealing.',
    specifications: { 'Ứng dụng': 'Ductwork specialized' },
    meta_title: 'HVAC Duct Aluminum Tape | ULink',
    meta_description: 'Specialized aluminum tape for HVAC duct sealing.'
  },
  {
    productSlug: 'bang-keo-nhom-hvac-duct', lang: 'ja',
    name: 'HVACダクト用アルミテープ',
    short_description: 'HVACダクトシール用専用アルミテープ。',
    specifications: { 'Ứng dụng': 'ダクト専用' },
    meta_title: 'HVACダクト用アルミテープ | ULink',
    meta_description: 'HVACダクトシール用専用アルミテープ。'
  },
  {
    productSlug: 'bang-keo-nhom-cach-nhiet', lang: 'en',
    name: 'Thermal Insulation Aluminum Tape',
    short_description: 'High thermal reflectivity aluminum insulation tape.',
    specifications: { 'Đặc tính': 'High heat reflectivity', 'Ứng dụng': 'Thermal insulation' },
    meta_title: 'Thermal Insulation Aluminum Tape | ULink',
    meta_description: 'High thermal reflectivity aluminum insulation tape.'
  },
  {
    productSlug: 'bang-keo-nhom-cach-nhiet', lang: 'ja',
    name: '断熱アルミテープ',
    short_description: '高熱反射率の断熱アルミテープ。',
    specifications: { 'Đặc tính': '高熱反射', 'Ứng dụng': '断熱' },
    meta_title: '断熱アルミテープ | ULink',
    meta_description: '高熱反射率の断熱アルミテープ。'
  },
  {
    productSlug: 'bang-keo-nhom-chong-chay', lang: 'en',
    name: 'Fire-Resistant Aluminum Tape',
    short_description: 'Fire-resistant aluminum tape, UL 723 certified.',
    specifications: { 'Tiêu chuẩn': 'UL 723', 'Ứng dụng': 'Fire-resistant' },
    meta_title: 'Fire-Resistant Aluminum Tape | ULink',
    meta_description: 'Fire-resistant aluminum tape, UL 723 certified.'
  },
  {
    productSlug: 'bang-keo-nhom-chong-chay', lang: 'ja',
    name: '防火アルミテープ',
    short_description: '防火アルミテープ、UL 723認証済み。',
    specifications: { 'Tiêu chuẩn': 'UL 723', 'Ứng dụng': '防火' },
    meta_title: '防火アルミテープ | ULink',
    meta_description: '防火アルミテープ、UL 723認証済み。'
  },
  {
    productSlug: 'bang-keo-nhom-ma-kem', lang: 'en',
    name: 'Zinc-Coated Aluminum Tape',
    short_description: 'Anti-corrosion zinc-coated aluminum tape.',
    specifications: { 'Đặc tính': 'Anti-corrosion', 'Lớp phủ': 'Zinc-coated' },
    meta_title: 'Zinc-Coated Aluminum Tape | ULink',
    meta_description: 'Anti-corrosion zinc-coated aluminum tape.'
  },
  {
    productSlug: 'bang-keo-nhom-ma-kem', lang: 'ja',
    name: '亜鉛メッキアルミテープ',
    short_description: '防食亜鉛メッキアルミテープ。',
    specifications: { 'Đặc tính': '防食', 'Lớp phủ': '亜鉛メッキ' },
    meta_title: '亜鉛メッキアルミテープ | ULink',
    meta_description: '防食亜鉛メッキアルミテープ。'
  },
  {
    productSlug: 'bang-keo-nhom-tu-dinh', lang: 'en',
    name: 'Self-Adhesive Aluminum Tape',
    short_description: 'Self-adhesive aluminum tape, no heat activation required.',
    specifications: { 'Đặc tính': 'Self-adhesive, no heat needed' },
    meta_title: 'Self-Adhesive Aluminum Tape | ULink',
    meta_description: 'Self-adhesive aluminum tape, no heat activation required.'
  },
  {
    productSlug: 'bang-keo-nhom-tu-dinh', lang: 'ja',
    name: '自己粘着アルミテープ',
    short_description: '熱不要の自己粘着アルミテープ。',
    specifications: { 'Đặc tính': '熱不要の自己粘着' },
    meta_title: '自己粘着アルミテープ | ULink',
    meta_description: '熱不要の自己粘着アルミテープ。'
  },
  {
    productSlug: 'bang-keo-nhom-cong-nghiep', lang: 'en',
    name: 'Industrial Aluminum Tape',
    short_description: 'Multi-purpose industrial aluminum tape with strong adhesion.',
    specifications: { 'Đặc tính': 'Versatile, strong adhesion' },
    meta_title: 'Industrial Aluminum Tape | ULink',
    meta_description: 'Multi-purpose industrial aluminum tape with strong adhesion.'
  },
  {
    productSlug: 'bang-keo-nhom-cong-nghiep', lang: 'ja',
    name: '工業用アルミテープ',
    short_description: '強力接着の多用途工業用アルミテープ。',
    specifications: { 'Đặc tính': '多用途、強力接着' },
    meta_title: '工業用アルミテープ | ULink',
    meta_description: '強力接着の多用途工業用アルミテープ。'
  },
  {
    productSlug: 'bang-keo-nhom-hvac', lang: 'en',
    name: 'Aluminum Tape — HVAC Custom',
    short_description: 'HVAC aluminum tape, custom manufactured.',
    specifications: { 'Sản xuất': 'Made to order' },
    meta_title: 'Aluminum Tape HVAC | ULink',
    meta_description: 'HVAC aluminum tape, custom manufactured.'
  },
  {
    productSlug: 'bang-keo-nhom-hvac', lang: 'ja',
    name: 'アルミテープ — HVACカスタム',
    short_description: 'HVAC用アルミテープ、受注生産。',
    specifications: { 'Sản xuất': '受注生産' },
    meta_title: 'アルミテープ HVAC | ULink',
    meta_description: 'HVAC用アルミテープ、受注生産。'
  },
  {
    productSlug: 'bang-keo-nhom-variant', lang: 'en',
    name: 'Aluminum Tape — Custom Sizes',
    short_description: 'Aluminum tape custom manufactured in various sizes.',
    specifications: { 'Sản xuất': 'Made to order' },
    meta_title: 'Aluminum Tape | ULink',
    meta_description: 'Aluminum tape custom manufactured in various sizes.'
  },
  {
    productSlug: 'bang-keo-nhom-variant', lang: 'ja',
    name: 'アルミテープ — カスタムサイズ',
    short_description: '各種サイズ受注生産アルミテープ。',
    specifications: { 'Sản xuất': '受注生産' },
    meta_title: 'アルミテープ | ULink',
    meta_description: 'アルミテープ、各種サイズ受注生産。'
  },
  {
    productSlug: 'bang-dinh-san-xuat', lang: 'en',
    name: 'Adhesive Tape — Custom Manufacturing',
    short_description: 'Custom manufactured adhesive tape.',
    specifications: { 'Sản xuất': 'Made to order' },
    meta_title: 'Custom Adhesive Tape | ULink',
    meta_description: 'Custom manufactured adhesive tape.'
  },
  {
    productSlug: 'bang-dinh-san-xuat', lang: 'ja',
    name: '粘着テープ — 受注生産',
    short_description: '受注生産粘着テープ。',
    specifications: { 'Sản xuất': '受注生産' },
    meta_title: '受注生産粘着テープ | ULink',
    meta_description: '受注生産粘着テープ。'
  },
  {
    productSlug: 'mang-quan-pallet-dong-kien', lang: 'en',
    name: 'Pallet Stretch Film — Bundling',
    short_description: 'Pallet stretch film for cargo bundling, custom made.',
    specifications: { 'Sản xuất': 'Made to order' },
    meta_title: 'Pallet Stretch Film | ULink',
    meta_description: 'Pallet stretch film for cargo bundling, custom made.'
  },
  {
    productSlug: 'mang-quan-pallet-dong-kien', lang: 'ja',
    name: 'パレットストレッチフィルム — 荷締め用',
    short_description: '荷締め用パレットストレッチフィルム、受注生産。',
    specifications: { 'Sản xuất': '受注生産' },
    meta_title: 'パレットストレッチフィルム | ULink',
    meta_description: '荷締め用パレットストレッチフィルム、受注生産。'
  },

  // ═══════════════════════════════════════════════════════════════
  // BAO BÌ & ĐÓNG GÓI
  // ═══════════════════════════════════════════════════════════════
  {
    productSlug: 'mang-quan-pallet', lang: 'en',
    name: 'Pallet Stretch Film',
    short_description: 'Pallet stretch film, various sizes, custom made.',
    specifications: { 'Sản xuất': 'Made to order' },
    meta_title: 'Pallet Stretch Film | ULink',
    meta_description: 'Pallet stretch film, various sizes, custom made.'
  },
  {
    productSlug: 'mang-quan-pallet', lang: 'ja',
    name: 'パレットストレッチフィルム',
    short_description: 'パレットストレッチフィルム、各種サイズ受注生産。',
    specifications: { 'Sản xuất': '受注生産' },
    meta_title: 'パレットストレッチフィルム | ULink',
    meta_description: 'パレットストレッチフィルム、各種サイズ受注生産。'
  },
  {
    productSlug: 'thung-carton-5-lop', lang: 'en',
    name: '5-Layer Corrugated Box',
    short_description: '5-layer corrugated box with custom printing.',
    specifications: { 'Số lớp': '5-layer', 'In ấn': 'Custom' },
    meta_title: '5-Layer Corrugated Box | ULink',
    meta_description: '5-layer corrugated box with custom printing.'
  },
  {
    productSlug: 'thung-carton-5-lop', lang: 'ja',
    name: '5層段ボール箱',
    short_description: 'カスタム印刷対応の5層段ボール箱。',
    specifications: { 'Số lớp': '5層', 'In ấn': 'カスタム' },
    meta_title: '5層段ボール箱 | ULink',
    meta_description: 'カスタム印刷対応の5層段ボール箱。'
  },
  {
    productSlug: 'bang-keo-opp', lang: 'en',
    name: 'Clear OPP Packing Tape',
    short_description: 'Clear OPP tape in various sizes.',
    specifications: { 'Chất liệu': 'OPP', 'Kích thước': 'Various' },
    meta_title: 'Clear OPP Packing Tape | ULink',
    meta_description: 'Clear OPP tape in various sizes.'
  },
  {
    productSlug: 'bang-keo-opp', lang: 'ja',
    name: '透明OPPテープ',
    short_description: '各種サイズの透明OPPテープ。',
    specifications: { 'Chất liệu': 'OPP', 'Kích thước': '各種' },
    meta_title: '透明OPPテープ | ULink',
    meta_description: '各種サイズの透明OPPテープ。'
  },
  {
    productSlug: 'tui-pe-cong-nghiep', lang: 'en',
    name: 'Industrial PE Bags',
    short_description: 'Industrial PE bags, custom manufactured.',
    specifications: { 'Chất liệu': 'PE', 'Sản xuất': 'Made to order' },
    meta_title: 'Industrial PE Bags | ULink',
    meta_description: 'Industrial PE bags, custom manufactured.'
  },
  {
    productSlug: 'tui-pe-cong-nghiep', lang: 'ja',
    name: '工業用PEバッグ',
    short_description: '受注生産の工業用PEバッグ。',
    specifications: { 'Chất liệu': 'PE', 'Sản xuất': '受注生産' },
    meta_title: '工業用PEバッグ | ULink',
    meta_description: '受注生産の工業用PEバッグ。'
  },
  {
    productSlug: 'pallet-nhua-cong-nghiep', lang: 'en',
    name: 'Industrial HDPE Pallet',
    short_description: 'Heavy-duty HDPE pallet for warehouse and shipping.',
    specifications: { 'Chất liệu': 'HDPE plastic', 'Đặc tính': 'Heavy-duty' },
    meta_title: 'Industrial HDPE Pallet | ULink',
    meta_description: 'Heavy-duty HDPE pallet for warehouse and shipping.'
  },
  {
    productSlug: 'pallet-nhua-cong-nghiep', lang: 'ja',
    name: '工業用HDPEパレット',
    short_description: '倉庫・輸送用高耐久HDPEパレット。',
    specifications: { 'Chất liệu': 'HDPEプラスチック', 'Đặc tính': '高耐久' },
    meta_title: '工業用HDPEパレット | ULink',
    meta_description: '倉庫・輸送用高耐久HDPEパレット。'
  },
  {
    productSlug: 'day-dai-pp-dong-hang', lang: 'en',
    name: 'PP Strapping Band',
    short_description: 'High tensile strength PP strapping band.',
    specifications: { 'Chất liệu': 'PP', 'Đặc tính': 'High tensile strength' },
    meta_title: 'PP Strapping Band | ULink',
    meta_description: 'High tensile strength PP strapping band.'
  },
  {
    productSlug: 'day-dai-pp-dong-hang', lang: 'ja',
    name: 'PP梱包バンド',
    short_description: '高引張強度PP梱包バンド。',
    specifications: { 'Chất liệu': 'PP', 'Đặc tính': '高引張強度' },
    meta_title: 'PP梱包バンド | ULink',
    meta_description: '高引張強度PP梱包バンド。'
  },
  {
    productSlug: 'mang-co-pof', lang: 'en',
    name: 'POF Shrink Film',
    short_description: 'Export-grade POF shrink film for product wrapping.',
    specifications: { 'Chất liệu': 'POF', 'Tiêu chuẩn': 'Export grade' },
    meta_title: 'POF Shrink Film | ULink',
    meta_description: 'Export-grade POF shrink film for product wrapping.'
  },
  {
    productSlug: 'mang-co-pof', lang: 'ja',
    name: 'POFシュリンクフィルム',
    short_description: '輸出基準POFシュリンクフィルム。',
    specifications: { 'Chất liệu': 'POF', 'Tiêu chuẩn': '輸出基準' },
    meta_title: 'POFシュリンクフィルム | ULink',
    meta_description: '輸出基準POFシュリンクフィルム。'
  },
  {
    productSlug: 'giay-chong-am', lang: 'en',
    name: 'Industrial Moisture-Proof Paper',
    short_description: 'Anti-mold industrial moisture barrier paper.',
    specifications: { 'Đặc tính': 'Anti-mold, cargo protection' },
    meta_title: 'Moisture-Proof Paper | ULink',
    meta_description: 'Anti-mold industrial moisture barrier paper.'
  },
  {
    productSlug: 'giay-chong-am', lang: 'ja',
    name: '工業用防湿紙',
    short_description: '防カビ工業用防湿バリアペーパー。',
    specifications: { 'Đặc tính': '防カビ、貨物保護' },
    meta_title: '工業用防湿紙 | ULink',
    meta_description: '防カビ工業用防湿紙。'
  },
  {
    productSlug: 'mang-co-pe-shrink-film', lang: 'en',
    name: 'PE Shrink Film — Bottle Bundling',
    short_description: 'PE shrink film for bottle bundling, custom made.',
    specifications: { 'Chất liệu': 'PE', 'Sản xuất': 'Made to order' },
    meta_title: 'PE Shrink Film | ULink',
    meta_description: 'PE shrink film for bottle bundling, custom made.'
  },
  {
    productSlug: 'mang-co-pe-shrink-film', lang: 'ja',
    name: 'PEシュリンクフィルム — ボトル用',
    short_description: 'ボトル用PEシュリンクフィルム、受注生産。',
    specifications: { 'Chất liệu': 'PE', 'Sản xuất': '受注生産' },
    meta_title: 'PEシュリンクフィルム | ULink',
    meta_description: 'ボトル用PEシュリンクフィルム、受注生産。'
  },
  {
    productSlug: 'tui-pe-nhieu-kich-thuoc', lang: 'en',
    name: 'PE Bags — Various Sizes',
    short_description: 'PE bags in various sizes, custom made.',
    specifications: { 'Chất liệu': 'PE', 'Kích thước': 'Various' },
    meta_title: 'PE Bags Various Sizes | ULink',
    meta_description: 'PE bags in various sizes, custom made.'
  },
  {
    productSlug: 'tui-pe-nhieu-kich-thuoc', lang: 'ja',
    name: 'PEバッグ — 各種サイズ',
    short_description: '各種サイズPEバッグ、受注生産。',
    specifications: { 'Chất liệu': 'PE', 'Kích thước': '各種' },
    meta_title: 'PEバッグ 各種サイズ | ULink',
    meta_description: '各種サイズPEバッグ、受注生産。'
  },
  {
    productSlug: 'tui-ziper-nhieu-kich-thuoc', lang: 'en',
    name: 'Zipper Bags — Various Sizes',
    short_description: 'Resealable zipper bags in various sizes.',
    specifications: { 'Loại khóa': 'Zipper', 'Kích thước': 'Various' },
    meta_title: 'Zipper Bags Various Sizes | ULink',
    meta_description: 'Resealable zipper bags in various sizes.'
  },
  {
    productSlug: 'tui-ziper-nhieu-kich-thuoc', lang: 'ja',
    name: 'ジッパーバッグ — 各種サイズ',
    short_description: '各種サイズの再封可能ジッパーバッグ。',
    specifications: { 'Loại khóa': 'ジッパー', 'Kích thước': '各種' },
    meta_title: 'ジッパーバッグ 各種サイズ | ULink',
    meta_description: '各種サイズの再封可能ジッパーバッグ。'
  },

  // ═══════════════════════════════════════════════════════════════
  // VẬT TƯ PHÒNG SẠCH
  // ═══════════════════════════════════════════════════════════════
  {
    productSlug: 'gang-tay-nitrile-class-1000', lang: 'en',
    name: 'Nitrile Gloves — Class 1000',
    short_description: 'Class 1000 nitrile cleanroom gloves, in stock.',
    specifications: { 'Chất liệu': 'Nitrile', 'Class': '1000', 'Tồn kho': 'In stock' },
    meta_title: 'Nitrile Gloves Class 1000 | ULink',
    meta_description: 'Class 1000 nitrile cleanroom gloves, in stock.'
  },
  {
    productSlug: 'gang-tay-nitrile-class-1000', lang: 'ja',
    name: 'ニトリル手袋 — Class 1000',
    short_description: 'Class 1000ニトリルクリーンルーム手袋、在庫あり。',
    specifications: { 'Chất liệu': 'ニトリル', 'Class': '1000', 'Tồn kho': '在庫あり' },
    meta_title: 'ニトリル手袋 Class 1000 | ULink',
    meta_description: 'Class 1000ニトリルクリーンルーム手袋、在庫あり。'
  },
  {
    productSlug: 'gang-tay-nitrile-y-te-spa', lang: 'en',
    name: 'Nitrile Gloves — Medical & Spa',
    short_description: 'Medical and spa grade nitrile gloves, in stock.',
    specifications: { 'Chất liệu': 'Nitrile', 'Ứng dụng': 'Medical, Spa', 'Tồn kho': 'In stock' },
    meta_title: 'Nitrile Gloves Medical & Spa | ULink',
    meta_description: 'Medical and spa grade nitrile gloves, in stock.'
  },
  {
    productSlug: 'gang-tay-nitrile-y-te-spa', lang: 'ja',
    name: 'ニトリル手袋 — 医療・スパ用',
    short_description: '医療・スパ用ニトリル手袋、在庫あり。',
    specifications: { 'Chất liệu': 'ニトリル', 'Ứng dụng': '医療、スパ', 'Tồn kho': '在庫あり' },
    meta_title: 'ニトリル手袋 医療・スパ | ULink',
    meta_description: '医療・スパ用ニトリル手袋、在庫あり。'
  },
  {
    productSlug: 'tham-phong-sach', lang: 'en',
    name: 'Cleanroom Sticky Mats — Various Sizes',
    short_description: 'Cleanroom sticky mats, custom manufactured.',
    specifications: { 'Kích thước': 'Various', 'Sản xuất': 'Made to order' },
    meta_title: 'Cleanroom Sticky Mats | ULink',
    meta_description: 'Cleanroom sticky mats, custom manufactured.'
  },
  {
    productSlug: 'tham-phong-sach', lang: 'ja',
    name: 'クリーンルーム粘着マット — 各種サイズ',
    short_description: 'クリーンルーム粘着マット、受注生産。',
    specifications: { 'Kích thước': '各種', 'Sản xuất': '受注生産' },
    meta_title: 'クリーンルーム粘着マット | ULink',
    meta_description: 'クリーンルーム粘着マット、受注生産。'
  },
  {
    productSlug: 'khan-lau-phong-sach-wiper', lang: 'en',
    name: 'Cleanroom Wiper',
    short_description: 'Cleanroom wiper, in stock.',
    specifications: { 'Loại': 'Wiper', 'Tồn kho': 'In stock' },
    meta_title: 'Cleanroom Wiper | ULink',
    meta_description: 'Cleanroom wiper, in stock.'
  },
  {
    productSlug: 'khan-lau-phong-sach-wiper', lang: 'ja',
    name: 'クリーンルームワイパー',
    short_description: 'クリーンルームワイパー、在庫あり。',
    specifications: { 'Loại': 'ワイパー', 'Tồn kho': '在庫あり' },
    meta_title: 'クリーンルームワイパー | ULink',
    meta_description: 'クリーンルームワイパー、在庫あり。'
  }
];

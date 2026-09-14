/**
 * Seed V2 — Products
 *
 * Dữ liệu từ README.md của 3 thư mục ảnh sản phẩm.
 * Mỗi sản phẩm 1 ảnh (imagePath) — upload thủ công qua admin sau.
 * 
 * Tổng: 31 sản phẩm unique
 *   - Băng keo Nhôm: 16
 *   - Bao bì & Đóng gói: 11
 *   - Vật tư Phòng sạch: 4 (riêng, không trùng baoBi)
 */

export const productsToSeed = [
  // ═══════════════════════════════════════════════════════════════
  // BĂNG KEO NHÔM — 16 sản phẩm
  // ═══════════════════════════════════════════════════════════════
  {
    categorySlug: 'bang-keo-nhom-ong-gio',
    name: 'Băng keo nhôm HVAC 48mm x 30m',
    slug: 'bang-keo-nhom-hvac-48mm',
    status: 'published',
    short_description: 'Băng keo nhôm HVAC 48mm, độ dày 40 micron, chuyên dụng cho hệ thống ống gió.',
    specifications: { 'Kích thước': '48mm x 30m', 'Độ dày': '40 micron', 'Ứng dụng': 'HVAC' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-hvac-48mm.png',
    meta_title: 'Băng keo nhôm HVAC 48mm | ULink',
    meta_description: 'Băng keo nhôm HVAC 48mm x 30m, độ dày 40 micron cho hệ thống ống gió.'
  },
  {
    categorySlug: 'bang-keo-nhom-chiu-nhiet',
    name: 'Băng keo chịu nhiệt 72mm x 45m',
    slug: 'bang-keo-chiu-nhiet-72mm',
    status: 'published',
    short_description: 'Băng keo nhôm chịu nhiệt 150°C, kích thước 72mm x 45m.',
    specifications: { 'Kích thước': '72mm x 45m', 'Chịu nhiệt': '150°C' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-chiu-nhiet-72mm.png',
    meta_title: 'Băng keo chịu nhiệt 72mm | ULink',
    meta_description: 'Băng keo nhôm chịu nhiệt 150°C, 72mm x 45m.'
  },
  {
    categorySlug: 'bang-keo-nhom-gia-co-luoi',
    name: 'Băng keo nhôm gia cường sợi thủy tinh',
    slug: 'bang-keo-nhom-soi-thuy-tinh',
    status: 'published',
    short_description: 'Băng keo nhôm FSK Facing Tape, gia cường sợi thủy tinh cho bảo ôn.',
    specifications: { 'Loại': 'FSK Facing Tape', 'Gia cường': 'Sợi thủy tinh' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-soi-thuy-tinh.png',
    meta_title: 'Băng keo nhôm sợi thủy tinh | ULink',
    meta_description: 'Băng keo nhôm FSK gia cường sợi thủy tinh.'
  },
  {
    categorySlug: 'bang-keo-nhom-ong-gio',
    name: 'Băng keo nhôm bảo ôn ống gió 96mm',
    slug: 'bang-keo-nhom-bao-on-96mm',
    status: 'published',
    short_description: 'Băng keo nhôm bảo ôn 96mm, keo acrylic cao cấp cho ống gió HVAC.',
    specifications: { 'Kích thước': '96mm', 'Keo': 'Acrylic cao cấp', 'Ứng dụng': 'Bảo ôn ống gió' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-bao-on-96mm.png',
    meta_title: 'Băng keo nhôm bảo ôn 96mm | ULink',
    meta_description: 'Băng keo nhôm bảo ôn ống gió 96mm, keo acrylic cao cấp.'
  },
  {
    categorySlug: 'bang-keo-nhom-chiu-nhiet',
    name: 'Băng keo Nhôm 3M 425',
    slug: 'bang-keo-nhom-3m-425',
    status: 'published',
    short_description: 'Băng keo nhôm 3M 425 chịu nhiệt 150°C, thương hiệu Mỹ chính hãng.',
    specifications: { 'Thương hiệu': '3M', 'Model': '425', 'Chịu nhiệt': '150°C' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-3m-425.png',
    meta_title: 'Băng keo Nhôm 3M 425 | ULink',
    meta_description: 'Băng keo nhôm 3M 425 chịu nhiệt 150°C chính hãng.'
  },
  {
    categorySlug: 'bang-keo-nhom-gia-co-luoi',
    name: 'Băng keo Nhôm Nitto 950',
    slug: 'bang-keo-nhom-nitto-950',
    status: 'published',
    short_description: 'Băng keo nhôm Nitto 950, gia cố sợi thủy tinh, thương hiệu Nhật Bản.',
    specifications: { 'Thương hiệu': 'Nitto', 'Model': '950', 'Gia cố': 'Sợi thủy tinh' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-nitto-950.png',
    meta_title: 'Băng keo Nhôm Nitto 950 | ULink',
    meta_description: 'Băng keo nhôm Nitto 950 gia cố sợi thủy tinh Nhật Bản.'
  },
  {
    categorySlug: 'bang-keo-nhom-ong-gio',
    name: 'Băng keo Nhôm HVAC Duct',
    slug: 'bang-keo-nhom-hvac-duct',
    status: 'published',
    short_description: 'Băng keo nhôm chuyên dụng ống gió HVAC Duct.',
    specifications: { 'Ứng dụng': 'Chuyên dụng ống gió' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-hvac-duct.png',
    meta_title: 'Băng keo Nhôm HVAC Duct | ULink',
    meta_description: 'Băng keo nhôm chuyên dụng ống gió HVAC.'
  },
  {
    categorySlug: 'bang-keo-nhom-cach-nhiet-cat',
    name: 'Băng keo Nhôm cách nhiệt',
    slug: 'bang-keo-nhom-cach-nhiet',
    status: 'published',
    short_description: 'Băng keo nhôm cách nhiệt, phản xạ nhiệt cao.',
    specifications: { 'Đặc tính': 'Phản xạ nhiệt cao', 'Ứng dụng': 'Cách nhiệt' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-cach-nhiet.png',
    meta_title: 'Băng keo Nhôm cách nhiệt | ULink',
    meta_description: 'Băng keo nhôm cách nhiệt phản xạ nhiệt cao.'
  },
  {
    categorySlug: 'bang-keo-nhom-chiu-nhiet',
    name: 'Băng keo Nhôm chống cháy',
    slug: 'bang-keo-nhom-chong-chay',
    status: 'published',
    short_description: 'Băng keo nhôm chống cháy đạt chuẩn UL 723.',
    specifications: { 'Tiêu chuẩn': 'UL 723', 'Ứng dụng': 'Chống cháy' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-chong-chay.png',
    meta_title: 'Băng keo Nhôm chống cháy | ULink',
    meta_description: 'Băng keo nhôm chống cháy đạt chuẩn UL 723.'
  },
  {
    categorySlug: 'bang-keo-nhom-ma-kem-cat',
    name: 'Băng keo Nhôm mạ kẽm',
    slug: 'bang-keo-nhom-ma-kem',
    status: 'published',
    short_description: 'Băng keo nhôm mạ kẽm chống ăn mòn.',
    specifications: { 'Đặc tính': 'Chống ăn mòn', 'Lớp phủ': 'Mạ kẽm' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-ma-kem.png',
    meta_title: 'Băng keo Nhôm mạ kẽm | ULink',
    meta_description: 'Băng keo nhôm mạ kẽm chống ăn mòn.'
  },
  {
    categorySlug: 'bang-keo-nhom-tu-dinh-cat',
    name: 'Băng keo Nhôm tự dính',
    slug: 'bang-keo-nhom-tu-dinh',
    status: 'published',
    short_description: 'Băng keo nhôm tự dính, không cần nhiệt để kích hoạt keo.',
    specifications: { 'Đặc tính': 'Tự dính không cần nhiệt' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-tu-dinh.png',
    meta_title: 'Băng keo Nhôm tự dính | ULink',
    meta_description: 'Băng keo nhôm tự dính không cần nhiệt.'
  },
  {
    categorySlug: 'bang-keo-nhom-tieu-chuan',
    name: 'Băng keo Nhôm công nghiệp',
    slug: 'bang-keo-nhom-cong-nghiep',
    status: 'published',
    short_description: 'Băng keo nhôm công nghiệp đa dụng, bám dính tốt.',
    specifications: { 'Đặc tính': 'Đa dụng, bám dính tốt' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-cong-nghiep.png',
    meta_title: 'Băng keo Nhôm công nghiệp | ULink',
    meta_description: 'Băng keo nhôm công nghiệp đa dụng.'
  },
  {
    categorySlug: 'bang-keo-nhom-ong-gio',
    name: 'Băng Keo Nhôm - HVAC',
    slug: 'bang-keo-nhom-hvac',
    status: 'published',
    short_description: 'Băng keo nhôm HVAC sản xuất theo yêu cầu.',
    specifications: { 'Sản xuất': 'Theo yêu cầu' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-hvac.png',
    meta_title: 'Băng Keo Nhôm HVAC | ULink',
    meta_description: 'Băng keo nhôm HVAC sản xuất theo yêu cầu.'
  },
  {
    categorySlug: 'bang-keo-nhom-tieu-chuan',
    name: 'Băng keo Nhôm (variant)',
    slug: 'bang-keo-nhom-variant',
    status: 'published',
    short_description: 'Băng keo nhôm sản xuất theo yêu cầu, nhiều quy cách.',
    specifications: { 'Sản xuất': 'Theo yêu cầu' },
    imagePath: '/images/solutions/product/bangKeo/bang-keo-nhom-3.png',
    meta_title: 'Băng keo Nhôm | ULink',
    meta_description: 'Băng keo nhôm sản xuất theo yêu cầu.'
  },
  {
    categorySlug: 'bang-keo-nhom-tieu-chuan',
    name: 'Băng dinh - Sản xuất theo yêu cầu',
    slug: 'bang-dinh-san-xuat',
    status: 'published',
    short_description: 'Băng dinh sản xuất theo yêu cầu khách hàng.',
    specifications: { 'Sản xuất': 'Theo yêu cầu' },
    imagePath: '/images/solutions/product/bangKeo/bang-dinh-san-xuat.png',
    meta_title: 'Băng dinh sản xuất theo yêu cầu | ULink',
    meta_description: 'Băng dinh sản xuất theo yêu cầu.'
  },
  {
    categorySlug: 'mang-quan-pallet-cat',
    name: 'Màng quấn Pallet - Đóng kiện hàng',
    slug: 'mang-quan-pallet-dong-kien',
    status: 'published',
    short_description: 'Màng quấn pallet sản xuất theo yêu cầu cho đóng kiện hàng.',
    specifications: { 'Sản xuất': 'Theo yêu cầu' },
    imagePath: '/images/solutions/product/bangKeo/mang-quan-pallet-2.png',
    meta_title: 'Màng quấn Pallet đóng kiện | ULink',
    meta_description: 'Màng quấn pallet sản xuất theo yêu cầu.'
  },

  // ═══════════════════════════════════════════════════════════════
  // BAO BÌ & ĐÓNG GÓI — 11 sản phẩm
  // ═══════════════════════════════════════════════════════════════
  {
    categorySlug: 'mang-quan-pallet-cat',
    name: 'Màng quấn Pallet',
    slug: 'mang-quan-pallet',
    status: 'published',
    short_description: 'Màng quấn pallet sản xuất theo yêu cầu, nhiều quy cách.',
    specifications: { 'Sản xuất': 'Theo yêu cầu' },
    imagePath: '/images/solutions/product/baoBi/mang-quan-pallet.png',
    meta_title: 'Màng quấn Pallet | ULink',
    meta_description: 'Màng quấn pallet công nghiệp sản xuất theo yêu cầu.'
  },
  {
    categorySlug: 'thung-carton-cac-loai',
    name: 'Thùng carton 5 lớp',
    slug: 'thung-carton-5-lop',
    status: 'published',
    short_description: 'Thùng carton 5 lớp in ấn theo yêu cầu.',
    specifications: { 'Số lớp': '5 lớp', 'In ấn': 'Theo yêu cầu' },
    imagePath: '/images/solutions/product/baoBi/thung-carton-5-lop.png',
    meta_title: 'Thùng carton 5 lớp | ULink',
    meta_description: 'Thùng carton 5 lớp in ấn theo yêu cầu.'
  },
  {
    categorySlug: 'bang-keo-cong-nghiep',
    name: 'Băng keo OPP trong suốt',
    slug: 'bang-keo-opp',
    status: 'published',
    short_description: 'Băng keo OPP trong suốt, kích thước đa dạng.',
    specifications: { 'Chất liệu': 'OPP', 'Kích thước': 'Đa dạng' },
    imagePath: '/images/solutions/product/baoBi/bang-keo-opp.png',
    meta_title: 'Băng keo OPP trong suốt | ULink',
    meta_description: 'Băng keo OPP trong suốt đa dạng kích thước.'
  },
  {
    categorySlug: 'tui-pe-pp-ziper',
    name: 'Túi PE công nghiệp',
    slug: 'tui-pe-cong-nghiep',
    status: 'published',
    short_description: 'Túi PE công nghiệp sản xuất theo yêu cầu.',
    specifications: { 'Chất liệu': 'PE', 'Sản xuất': 'Theo yêu cầu' },
    imagePath: '/images/solutions/product/baoBi/tui-pe-cong-nghiep.png',
    meta_title: 'Túi PE công nghiệp | ULink',
    meta_description: 'Túi PE công nghiệp sản xuất theo yêu cầu.'
  },
  {
    categorySlug: 'pallet-nhua-go',
    name: 'Pallet nhựa công nghiệp',
    slug: 'pallet-nhua-cong-nghiep',
    status: 'published',
    short_description: 'Pallet nhựa HDPE chịu lực cho kho hàng và vận chuyển.',
    specifications: { 'Chất liệu': 'Nhựa HDPE', 'Đặc tính': 'Chịu lực' },
    imagePath: '/images/solutions/product/baoBi/pallet-nhua-cong-nghiep.png',
    meta_title: 'Pallet nhựa công nghiệp | ULink',
    meta_description: 'Pallet nhựa HDPE chịu lực công nghiệp.'
  },
  {
    categorySlug: 'day-dai-dong-hang',
    name: 'Dây đai PP đóng hàng',
    slug: 'day-dai-pp-dong-hang',
    status: 'published',
    short_description: 'Dây đai PP đóng hàng, độ bền kéo cao.',
    specifications: { 'Chất liệu': 'PP', 'Đặc tính': 'Độ bền kéo cao' },
    imagePath: '/images/solutions/product/baoBi/day-dai-pp-dong-hang.png',
    meta_title: 'Dây đai PP đóng hàng | ULink',
    meta_description: 'Dây đai PP đóng hàng độ bền kéo cao.'
  },
  {
    categorySlug: 'mang-quan-pallet-cat',
    name: 'Màng co POF bọc sản phẩm',
    slug: 'mang-co-pof',
    status: 'published',
    short_description: 'Màng co POF đạt chuẩn xuất khẩu, bọc sản phẩm chắc chắn.',
    specifications: { 'Chất liệu': 'POF', 'Tiêu chuẩn': 'Đạt chuẩn xuất khẩu' },
    imagePath: '/images/solutions/product/baoBi/mang-co-pof.png',
    meta_title: 'Màng co POF bọc sản phẩm | ULink',
    meta_description: 'Màng co POF đạt chuẩn xuất khẩu.'
  },
  {
    categorySlug: 'vat-lieu-dem-lot',
    name: 'Giấy chống ẩm công nghiệp',
    slug: 'giay-chong-am',
    status: 'published',
    short_description: 'Giấy chống ẩm công nghiệp, chống mốc, bảo vệ hàng hóa.',
    specifications: { 'Đặc tính': 'Chống mốc, bảo vệ hàng' },
    imagePath: '/images/solutions/product/baoBi/giay-chong-am.png',
    meta_title: 'Giấy chống ẩm công nghiệp | ULink',
    meta_description: 'Giấy chống ẩm công nghiệp chống mốc.'
  },
  {
    categorySlug: 'mang-quan-pallet-cat',
    name: 'Màng co PE - Shrink Film Block Chai',
    slug: 'mang-co-pe-shrink-film',
    status: 'published',
    short_description: 'Màng co PE Shrink Film block chai, sản xuất theo yêu cầu.',
    specifications: { 'Chất liệu': 'PE', 'Sản xuất': 'Theo yêu cầu' },
    imagePath: '/images/solutions/product/baoBi/mang-co-pe-shrink-film.png',
    meta_title: 'Màng co PE Shrink Film | ULink',
    meta_description: 'Màng co PE Shrink Film sản xuất theo yêu cầu.'
  },
  {
    categorySlug: 'tui-pe-pp-ziper',
    name: 'Túi PE - Nhiều kích thước',
    slug: 'tui-pe-nhieu-kich-thuoc',
    status: 'published',
    short_description: 'Túi PE nhiều kích thước, sản xuất theo yêu cầu.',
    specifications: { 'Chất liệu': 'PE', 'Kích thước': 'Đa dạng' },
    imagePath: '/images/solutions/product/baoBi/tui-pe-nhieu-kich-thuoc.png',
    meta_title: 'Túi PE nhiều kích thước | ULink',
    meta_description: 'Túi PE nhiều kích thước sản xuất theo yêu cầu.'
  },
  {
    categorySlug: 'tui-pe-pp-ziper',
    name: 'Túi Ziper - Nhiều kích thước',
    slug: 'tui-ziper-nhieu-kich-thuoc',
    status: 'published',
    short_description: 'Túi Ziper nhiều kích thước, sản xuất theo yêu cầu.',
    specifications: { 'Loại khóa': 'Ziper', 'Kích thước': 'Đa dạng' },
    imagePath: '/images/solutions/product/baoBi/tui-ziper-nhieu-kich-thuoc.png',
    meta_title: 'Túi Ziper nhiều kích thước | ULink',
    meta_description: 'Túi Ziper nhiều kích thước sản xuất theo yêu cầu.'
  },

  // ═══════════════════════════════════════════════════════════════
  // VẬT TƯ PHÒNG SẠCH — 4 sản phẩm (riêng, không trùng baoBi)
  // ═══════════════════════════════════════════════════════════════
  {
    categorySlug: 'gang-tay-phong-sach',
    name: 'Găng tay Nitrile - Class 1000',
    slug: 'gang-tay-nitrile-class-1000',
    status: 'published',
    short_description: 'Găng tay Nitrile Class 1000, có sẵn tại kho.',
    specifications: { 'Chất liệu': 'Nitrile', 'Class': '1000', 'Tồn kho': 'Có sẵn' },
    imagePath: '/images/solutions/product/phongSach/gang-tay-nitrile-class-1000.png',
    meta_title: 'Găng tay Nitrile Class 1000 | ULink',
    meta_description: 'Găng tay Nitrile Class 1000 cho phòng sạch.'
  },
  {
    categorySlug: 'gang-tay-phong-sach',
    name: 'Găng tay Nitrile - Dùng trong Y tế, Spa',
    slug: 'gang-tay-nitrile-y-te-spa',
    status: 'published',
    short_description: 'Găng tay Nitrile dùng trong Y tế và Spa, có sẵn tại kho.',
    specifications: { 'Chất liệu': 'Nitrile', 'Ứng dụng': 'Y tế, Spa', 'Tồn kho': 'Có sẵn' },
    imagePath: '/images/solutions/product/phongSach/gang-tay-nitrile-y-te-spa.png',
    meta_title: 'Găng tay Nitrile Y tế Spa | ULink',
    meta_description: 'Găng tay Nitrile cho Y tế và Spa.'
  },
  {
    categorySlug: 'tham-dinh-bui',
    name: 'Thảm Phòng sạch - Nhiều kích thước',
    slug: 'tham-phong-sach',
    status: 'published',
    short_description: 'Thảm phòng sạch nhiều kích thước, sản xuất theo yêu cầu.',
    specifications: { 'Kích thước': 'Đa dạng', 'Sản xuất': 'Theo yêu cầu' },
    imagePath: '/images/solutions/product/phongSach/tham-phong-sach.png',
    meta_title: 'Thảm Phòng sạch | ULink',
    meta_description: 'Thảm phòng sạch nhiều kích thước.'
  },
  {
    categorySlug: 'vai-lau-phong-sach',
    name: 'Khăn lau phòng sạch - Wiper',
    slug: 'khan-lau-phong-sach-wiper',
    status: 'published',
    short_description: 'Khăn lau phòng sạch Wiper, có sẵn tại kho.',
    specifications: { 'Loại': 'Wiper', 'Tồn kho': 'Có sẵn' },
    imagePath: '/images/solutions/product/phongSach/khan-lau-phong-sach-wiper.png',
    meta_title: 'Khăn lau phòng sạch Wiper | ULink',
    meta_description: 'Khăn lau phòng sạch Wiper có sẵn tại kho.'
  }
];

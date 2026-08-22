export const productsToSeed = [
  // === Original 8 Extended Products ===
  {
    categorySlug: 'cleanroom-apparel',
    name: 'Bộ áo liền quần phòng sạch Tyvek',
    slug: 'tyvek-cleanroom-coverall',
    brand: 'DuPont',
    status: 'published',
    short_description: 'Áo liền quần Tyvek IsoClean, chống tĩnh điện, ISO Class 5.',
    specifications: {
      Material: 'Tyvek IsoClean',
      Class: 'ISO 5 / Class 100',
      ESD: 'Carbon stripe dissipative',
      Closure: 'Zip front with storm flap',
      Color: 'White'
    },
    meta_title: 'Bộ áo liền quần phòng sạch Tyvek | ULink',
    meta_description: 'Áo liền quần Tyvek IsoClean chống tĩnh điện, đạt chuẩn ISO 5 cho phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-masks',
    name: 'Khẩu trang 3 lớp phòng sạch',
    slug: 'cleanroom-face-mask-3ply',
    brand: 'Kimberly-Clark',
    status: 'published',
    short_description: 'Khẩu trang 3 lớp không dệt, ear-loop, giảm phát tán hạt từ người dùng.',
    specifications: {
      Layers: '3-ply non-woven',
      BFE: '>99%',
      Style: 'Ear-loop',
      Color: 'Blue',
      Packaging: 'Cleanroom double-bagged'
    },
    meta_title: 'Khẩu trang 3 lớp phòng sạch | ULink',
    meta_description: 'Khẩu trang 3 lớp BFE >99% cho nhân viên phòng sạch.'
  },
  {
    categorySlug: 'esd-supplies',
    name: 'Dây đeo cổ tay chống tĩnh điện',
    slug: 'esd-wrist-strap',
    brand: '3M',
    status: 'published',
    short_description: 'Dây đeo cổ tay ESD điều chỉnh được, điện trở 1MΩ, dây nối dài 1.8m.',
    specifications: {
      Resistance: '1 MΩ ± 10%',
      'Cord Length': '1.8m coiled',
      'Band Material': 'Hypoallergenic fabric',
      Snap: '10mm',
      Color: 'Blue'
    },
    meta_title: 'Dây đeo cổ tay chống tĩnh điện ESD | ULink',
    meta_description: 'Dây đeo cổ tay ESD 3M cho nhân viên làm việc với linh kiện điện tử nhạy cảm.'
  },
  {
    categorySlug: 'esd-supplies',
    name: 'Thảm chống tĩnh điện ESD 2 lớp',
    slug: 'esd-table-mat-2layer',
    brand: '3M',
    status: 'published',
    short_description: 'Thảm bàn ESD 2 lớp, bề mặt dissipative xanh trên lớp conductive đen.',
    specifications: {
      'Surface Resistance': '10^6 – 10^8 Ω',
      'Volume Resistance': '10^3 – 10^5 Ω',
      Thickness: '2mm',
      Color: 'Blue/Black',
      Material: 'Rubber compound'
    },
    meta_title: 'Thảm chống tĩnh điện ESD 2 lớp | ULink',
    meta_description: 'Thảm bàn ESD 2 lớp cho trạm làm việc xử lý linh kiện điện tử.'
  },
  {
    categorySlug: 'cleanroom-chemicals',
    name: 'Dung dịch IPA 99.9% Cleanroom Grade',
    slug: 'ipa-cleanroom-grade-999',
    brand: 'Techspray',
    status: 'published',
    short_description: 'Isopropyl Alcohol 99.9% tinh khiết, lọc 0.2µm, đóng chai phòng sạch.',
    specifications: {
      Purity: '99.9%',
      Filtration: '0.2 µm',
      'Residue (NVR)': '<1 ppm',
      Packaging: 'Cleanroom bottle',
      Volume: '1L / 5L / 20L'
    },
    meta_title: 'IPA 99.9% Cleanroom Grade | ULink',
    meta_description: 'Dung dịch IPA 99.9% siêu tinh khiết cho tẩy rửa bề mặt phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-consumables',
    name: 'Thảm dính bụi phòng sạch 30 lớp',
    slug: 'sticky-mat-30-layers',
    brand: 'Contec',
    status: 'published',
    short_description: 'Thảm dính bụi 30 lớp, bóc từng lớp, giảm hạt bụi tại lối vào phòng sạch.',
    specifications: {
      Layers: '30 peelable layers',
      Size: '24 x 36 inches',
      Color: 'Blue / White',
      Adhesion: 'High tack polyethylene',
      'Particle removal': '>99% for particles >5µm'
    },
    meta_title: 'Thảm dính bụi phòng sạch 30 lớp | ULink',
    meta_description: 'Thảm dính bụi 30 lớp hiệu quả cao cho lối vào phòng sạch.'
  },
  {
    categorySlug: 'industrial-packaging',
    name: 'Túi chống tĩnh điện ESD Shielding',
    slug: 'esd-shielding-bag',
    brand: 'Desco',
    status: 'published',
    short_description: 'Túi shielding ESD bảo vệ linh kiện khỏi phóng điện, đạt ANSI/ESD S541.',
    specifications: {
      Material: 'Metallic polyester / LDPE',
      'Surface Resistance': '<10^11 Ω',
      Shielding: '<50 nJ (per ANSI/ESD S541)',
      Seal: 'Heat sealable / Zip-lock',
      Transparency: 'Semi-transparent'
    },
    meta_title: 'Túi chống tĩnh điện ESD Shielding | ULink',
    meta_description: 'Túi ESD shielding bảo vệ linh kiện điện tử nhạy cảm khi vận chuyển và lưu kho.'
  },
  {
    categorySlug: 'cleanroom-gloves',
    name: 'Găng tay latex vô trùng phòng sạch',
    slug: 'sterile-latex-cleanroom-gloves',
    brand: 'Ansell',
    status: 'published',
    short_description: 'Găng tay latex gamma-irradiated, vô trùng, đạt ISO Class 4 cho dược phẩm.',
    specifications: {
      Material: 'Natural rubber latex',
      Sterility: 'Gamma irradiated (SAL 10⁻⁶)',
      Class: 'ISO 4 / Class 10',
      AQL: '0.65',
      Length: '12 inches'
    },
    meta_title: 'Găng tay latex vô trùng phòng sạch | ULink',
    meta_description: 'Găng tay latex vô trùng cho phòng sạch dược phẩm GMP.'
  },

  // === 22 Additional Products ===
  // cleanroom-consumables:
  {
    categorySlug: 'cleanroom-consumables',
    name: 'Con lăn dính bụi PE phòng sạch',
    slug: 'sticky-roller-pe',
    brand: 'Contec',
    status: 'published',
    short_description: 'Con lăn dính bụi PE 12 inch, cán inox ESD, thay thế giấy dính nhanh.',
    specifications: { Width: '12 inches', Handle: 'Stainless steel ESD', Sheets: '60 sheets/roll' },
    meta_title: 'Con lăn dính bụi PE phòng sạch | ULink',
    meta_description: 'Con lăn PE dính bụi thay thế nhanh cho phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-consumables',
    name: 'Bút ghi phòng sạch vỏ nhựa tĩnh điện',
    slug: 'cleanroom-pen-esd',
    brand: 'Texwipe',
    status: 'published',
    short_description: 'Bút bi phòng sạch, vỏ nhựa ESD, mực xanh không bụi.',
    specifications: { Type: 'Ballpoint', Ink: 'Blue low-outgassing', Body: 'ESD plastic' },
    meta_title: 'Bút phòng sạch ESD | ULink',
    meta_description: 'Bút ghi chép chuyên dụng cho phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-consumables',
    name: 'Giấy in phòng sạch A4 72gsm',
    slug: 'cleanroom-paper-a4',
    brand: 'Contec',
    status: 'published',
    short_description: 'Giấy in A4 không bụi 72gsm, ISO Class 100, đóng gói kín phòng sạch.',
    specifications: { Size: 'A4', Weight: '72 gsm', Class: 'ISO 5 / Class 100' },
    meta_title: 'Giấy in phòng sạch A4 | ULink',
    meta_description: 'Giấy A4 không bụi cho phòng sạch.'
  },

  // cleanroom-gloves:
  {
    categorySlug: 'cleanroom-gloves',
    name: 'Găng tay PU phủ đầu ngón ESD',
    slug: 'pu-fingertip-esd-gloves',
    brand: 'ULink',
    status: 'published',
    short_description: 'Găng tay dệt carbon phủ PU đầu ngón, chống tĩnh điện, thoáng khí.',
    specifications: { Material: 'Carbon fiber + PU coating', ESD: '<10^8 Ω', Color: 'White/Gray' },
    meta_title: 'Găng tay PU ESD đầu ngón | ULink',
    meta_description: 'Găng tay ESD phủ PU cho lắp ráp linh kiện.'
  },
  {
    categorySlug: 'cleanroom-gloves',
    name: 'Găng tay Neoprene chống hóa chất',
    slug: 'neoprene-chemical-gloves',
    brand: 'Ansell',
    status: 'published',
    short_description: 'Găng tay Neoprene dài 33cm, chống axit và dung môi hữu cơ.',
    specifications: { Material: 'Neoprene', Length: '33 cm', Thickness: '0.38 mm' },
    meta_title: 'Găng tay Neoprene chống hóa chất | ULink',
    meta_description: 'Găng tay Neoprene cho phòng sạch hóa chất.'
  },

  // cleanroom-wipers:
  {
    categorySlug: 'cleanroom-wipers',
    name: 'Khăn lau microfiber phòng sạch',
    slug: 'microfiber-cleanroom-wiper',
    brand: 'Texwipe',
    status: 'published',
    short_description: 'Khăn lau microfiber siêu mịn, cắt laser, không xơ sợi, ISO 5.',
    specifications: { Material: 'Microfiber', Edge: 'Laser-cut', Class: 'ISO 5' },
    meta_title: 'Khăn lau microfiber phòng sạch | ULink',
    meta_description: 'Khăn microfiber không xơ cho phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-wipers',
    name: 'Khăn lau tẩm IPA phòng sạch',
    slug: 'pre-wet-ipa-wiper',
    brand: 'Texwipe',
    status: 'published',
    short_description: 'Khăn lau tẩm sẵn IPA 70%, polyester/cellulose, tiện lợi dùng ngay.',
    specifications: { Solution: 'IPA 70%', Material: 'Polyester/Cellulose', Size: '9x9 inch' },
    meta_title: 'Khăn lau tẩm IPA | ULink',
    meta_description: 'Khăn lau tẩm sẵn IPA cho phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-wipers',
    name: 'Khăn lau khô Cellulose/Polyester',
    slug: 'dry-cellulose-wiper',
    brand: 'Kimberly-Clark',
    status: 'published',
    short_description: 'Khăn lau khô cellulose/polyester 55/45, thấm hút tốt, Class 100.',
    specifications: { Material: 'Cellulose 55% / Polyester 45%', Class: 'Class 100', Size: '12x12 inch' },
    meta_title: 'Khăn lau khô Cellulose | ULink',
    meta_description: 'Khăn lau khô thấm hút cao cho phòng sạch.'
  },

  // cleanroom-apparel:
  {
    categorySlug: 'cleanroom-apparel',
    name: 'Giày phòng sạch ESD chống trượt',
    slug: 'cleanroom-esd-shoes',
    brand: 'ULink',
    status: 'published',
    short_description: 'Giày phòng sạch ESD đế PU chống trượt, trắng, giặt được.',
    specifications: { Material: 'PU / Mesh', ESD: '<10^8 Ω', Sole: 'Anti-slip PU' },
    meta_title: 'Giày phòng sạch ESD | ULink',
    meta_description: 'Giày ESD chống trượt cho phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-apparel',
    name: 'Mũ trùm phòng sạch vải tĩnh điện',
    slug: 'cleanroom-hood-esd',
    brand: 'ULink',
    status: 'published',
    short_description: 'Mũ trùm đầu phòng sạch, vải polyester dệt sợi carbon ESD.',
    specifications: { Material: 'Polyester + Carbon stripe', ESD: '<10^9 Ω' },
    meta_title: 'Mũ trùm phòng sạch | ULink',
    meta_description: 'Mũ trùm ESD cho phòng sạch công nghiệp.'
  },
  {
    categorySlug: 'cleanroom-apparel',
    name: 'Áo choàng phòng sạch ESD dài tay',
    slug: 'cleanroom-frock-esd',
    brand: 'ULink',
    status: 'published',
    short_description: 'Áo choàng phòng sạch dài tay, cổ bẻ, vải polyester ESD, khóa kéo.',
    specifications: { Material: 'Polyester + Carbon grid', Closure: 'Zip front', Class: 'ISO 5' },
    meta_title: 'Áo choàng phòng sạch ESD | ULink',
    meta_description: 'Áo choàng ESD dài tay cho phòng sạch.'
  },

  // cleanroom-masks:
  {
    categorySlug: 'cleanroom-masks',
    name: 'Khẩu trang N95 phòng sạch',
    slug: 'cleanroom-n95-mask',
    brand: 'Kimberly-Clark',
    status: 'published',
    short_description: 'Khẩu trang N95 dạng cup, lọc ≥95% hạt bụi, không van thở.',
    specifications: { Standard: 'NIOSH N95', BFE: '≥95%', Style: 'Cup' },
    meta_title: 'Khẩu trang N95 phòng sạch | ULink',
    meta_description: 'Khẩu trang N95 cho môi trường phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-masks',
    name: 'Khẩu trang có kính chắn giọt bắn',
    slug: 'face-mask-with-visor',
    brand: 'Kimberly-Clark',
    status: 'published',
    short_description: 'Khẩu trang 3 lớp kèm kính chắn trong suốt, bảo vệ mắt và mũi.',
    specifications: { Layers: '3-ply', Visor: 'Anti-fog PET', BFE: '>99%' },
    meta_title: 'Khẩu trang có kính chắn | ULink',
    meta_description: 'Khẩu trang phòng sạch có kính chắn giọt bắn.'
  },
  {
    categorySlug: 'cleanroom-masks',
    name: 'Khẩu trang 4 lớp carbon hoạt tính',
    slug: 'activated-carbon-mask-4ply',
    brand: 'ULink',
    status: 'published',
    short_description: 'Khẩu trang 4 lớp than hoạt tính, hấp thụ hơi dung môi hữu cơ.',
    specifications: { Layers: '4-ply with activated carbon', BFE: '>99%', Style: 'Ear-loop' },
    meta_title: 'Khẩu trang carbon hoạt tính | ULink',
    meta_description: 'Khẩu trang 4 lớp carbon cho phòng sạch hóa chất.'
  },

  // industrial-packaging:
  {
    categorySlug: 'industrial-packaging',
    name: 'Túi bong bóng chống tĩnh điện',
    slug: 'esd-bubble-bag',
    brand: 'Desco',
    status: 'published',
    short_description: 'Túi bong bóng khí ESD, chống sốc và phóng tĩnh điện khi vận chuyển.',
    specifications: { Material: 'PE bubble + ESD layer', Shielding: 'Pink anti-static' },
    meta_title: 'Túi bong bóng ESD | ULink',
    meta_description: 'Túi bong bóng chống tĩnh điện cho vận chuyển linh kiện.'
  },
  {
    categorySlug: 'industrial-packaging',
    name: 'Túi chống ẩm Moisture Barrier',
    slug: 'moisture-barrier-bag',
    brand: 'Desco',
    status: 'published',
    short_description: 'Túi MBB chống ẩm, hút chân không, bảo vệ linh kiện nhạy ẩm.',
    specifications: { Material: 'Foil laminate', WVTR: '<0.02 g/m²/day', Seal: 'Heat sealable' },
    meta_title: 'Túi chống ẩm MBB | ULink',
    meta_description: 'Túi Moisture Barrier chống ẩm cho linh kiện điện tử.'
  },
  {
    categorySlug: 'industrial-packaging',
    name: 'Thùng carton ESD corrugated',
    slug: 'esd-corrugated-box',
    brand: 'Desco',
    status: 'published',
    short_description: 'Thùng carton lượn sóng phủ ESD, bảo vệ sản phẩm trong kho và vận chuyển.',
    specifications: { Material: 'Corrugated + ESD coating', Resistance: '<10^9 Ω' },
    meta_title: 'Thùng carton ESD | ULink', meta_description: 'Thùng carton ESD cho kho hàng điện tử.'
  },

  // esd-supplies:
  {
    categorySlug: 'esd-supplies',
    name: 'Quạt ion khử tĩnh điện bàn',
    slug: 'esd-benchtop-ionizer',
    brand: '3M',
    status: 'published',
    short_description: 'Quạt ion khử tĩnh điện để bàn, công nghệ AC steady-state, không cần hiệu chuẩn.',
    specifications: { Technology: 'AC Steady-State', Range: '60cm', Power: '24V DC' },
    meta_title: 'Quạt ion khử tĩnh điện | ULink', meta_description: 'Quạt ion 3M cho trạm làm việc ESD.'
  },
  {
    categorySlug: 'esd-supplies',
    name: 'Dây nối đất ESD grounding cord',
    slug: 'esd-grounding-cord',
    brand: '3M',
    status: 'published',
    short_description: 'Dây nối đất ESD 3m, đầu ring terminal + banana plug, 1MΩ resistor.',
    specifications: { Length: '3m', Resistance: '1MΩ', Connector: 'Ring + Banana plug' },
    meta_title: 'Dây nối đất ESD | ULink', meta_description: 'Dây grounding cord cho hệ thống ESD.'
  },

  // cleanroom-chemicals:
  {
    categorySlug: 'cleanroom-chemicals',
    name: 'Nước DI siêu tinh khiết phòng sạch',
    slug: 'di-water-cleanroom',
    brand: 'Techspray',
    status: 'published',
    short_description: 'Nước DI siêu tinh khiết 18.2 MΩ·cm, đóng chai phòng sạch 1L.',
    specifications: { Resistivity: '18.2 MΩ·cm', TOC: '<5 ppb', Filtration: '0.1 µm' },
    meta_title: 'Nước DI phòng sạch | ULink', meta_description: 'Nước DI siêu tinh khiết cho phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-chemicals',
    name: 'Dung dịch tẩy rửa bề mặt phòng sạch',
    slug: 'cleanroom-surface-cleaner',
    brand: 'Techspray',
    status: 'published',
    short_description: 'Dung dịch tẩy rửa không cặn cho bề mặt phòng sạch, pH trung tính.',
    specifications: { pH: '7.0 ± 0.5', Residue: '<1 ppm', Volume: '1L / 5L' },
    meta_title: 'Dung dịch tẩy rửa phòng sạch | ULink', meta_description: 'Dung dịch tẩy rửa không cặn cho phòng sạch.'
  },
  {
    categorySlug: 'cleanroom-chemicals',
    name: 'Acetone tinh khiết phòng sạch',
    slug: 'acetone-cleanroom-grade',
    brand: 'Techspray',
    status: 'published',
    short_description: 'Acetone 99.5% tinh khiết, lọc phòng sạch, tẩy keo và dung môi.',
    specifications: { Purity: '99.5%', Filtration: '0.2 µm', Volume: '1L / 5L' },
    meta_title: 'Acetone phòng sạch | ULink', meta_description: 'Acetone tinh khiết cho phòng sạch công nghiệp.'
  }
];

/**
 * Seed V2 — Documents (Tài liệu kỹ thuật)
 *
 * Mỗi danh mục cha có 1–2 document mẫu (catalog PDF, datasheet).
 * File thực tế upload qua Directus Admin → chỉ seed metadata.
 */

export const documents = [
  // ── Băng keo Nhôm ──
  {
    title: 'Catalog Băng keo Nhôm 2026',
    slug: 'catalog-bang-keo-nhom-2026',
    type: 'catalog',
    status: 'published',
    description: 'Catalog đầy đủ các dòng băng keo nhôm HVAC, cách nhiệt, chống cháy.',
    file_name: 'catalog-bang-keo-nhom-2026.pdf',
    related_products: [
      'bang-keo-nhom-hvac-48mm', 'bang-keo-chiu-nhiet-72mm', 'bang-keo-nhom-soi-thuy-tinh',
      'bang-keo-nhom-bao-on-96mm', 'bang-keo-nhom-3m-425', 'bang-keo-nhom-nitto-950',
      'bang-keo-nhom-hvac-duct', 'bang-keo-nhom-cach-nhiet', 'bang-keo-nhom-chong-chay',
      'bang-keo-nhom-ma-kem', 'bang-keo-nhom-tu-dinh', 'bang-keo-nhom-cong-nghiep'
    ],
    translations: {
      vi: { title: 'Catalog Băng keo Nhôm 2026' },
      en: { title: 'Aluminum Tape Catalog 2026' },
      ja: { title: 'アルミテープカタログ 2026' }
    }
  },
  {
    title: 'Datasheet Băng keo 3M 425',
    slug: 'datasheet-3m-425',
    type: 'datasheet',
    status: 'published',
    description: 'Thông số kỹ thuật chi tiết băng keo nhôm 3M 425.',
    file_name: 'datasheet-3m-425.pdf',
    related_products: ['bang-keo-nhom-3m-425'],
    translations: {
      vi: { title: 'Datasheet Băng keo 3M 425' },
      en: { title: '3M 425 Aluminum Tape Technical Datasheet' },
      ja: { title: '3M 425 アルミテープ技術データシート' }
    }
  },
  {
    title: 'Datasheet Băng keo Nitto 950',
    slug: 'datasheet-nitto-950',
    type: 'datasheet',
    status: 'published',
    description: 'Thông số kỹ thuật chi tiết băng keo nhôm Nitto 950.',
    file_name: 'datasheet-nitto-950.pdf',
    related_products: ['bang-keo-nhom-nitto-950'],
    translations: {
      vi: { title: 'Datasheet Băng keo Nitto 950' },
      en: { title: 'Nitto 950 Aluminum Tape Technical Datasheet' },
      ja: { title: 'Nitto 950 アルミテープ技術データシート' }
    }
  },

  // ── Bao bì & Đóng gói ──
  {
    title: 'Catalog Bao bì & Đóng gói 2026',
    slug: 'catalog-bao-bi-dong-goi-2026',
    type: 'catalog',
    status: 'published',
    description: 'Catalog đầy đủ giải pháp bao bì công nghiệp: màng co, carton, túi PE, pallet.',
    file_name: 'catalog-bao-bi-dong-goi-2026.pdf',
    related_products: [
      'mang-quan-pallet', 'thung-carton-5-lop', 'bang-keo-opp', 'tui-pe-cong-nghiep',
      'pallet-nhua-cong-nghiep', 'day-dai-pp-dong-hang', 'mang-co-pof', 'giay-chong-am',
      'mang-co-pe-shrink-film', 'tui-pe-nhieu-kich-thuoc', 'tui-ziper-nhieu-kich-thuoc'
    ],
    translations: {
      vi: { title: 'Catalog Bao bì & Đóng gói 2026' },
      en: { title: 'Packaging & Wrapping Catalog 2026' },
      ja: { title: '包装・梱包カタログ 2026' }
    }
  },

  // ── Vật tư Phòng sạch ──
  {
    title: 'Catalog Vật tư Phòng sạch 2026',
    slug: 'catalog-vat-tu-phong-sach-2026',
    type: 'catalog',
    status: 'published',
    description: 'Catalog vật tư phòng sạch: găng tay, thảm, khăn lau, dụng cụ vệ sinh.',
    file_name: 'catalog-vat-tu-phong-sach-2026.pdf',
    related_products: [
      'gang-tay-nitrile-class-1000', 'gang-tay-nitrile-y-te-spa',
      'tham-phong-sach', 'khan-lau-phong-sach-wiper'
    ],
    translations: {
      vi: { title: 'Catalog Vật tư Phòng sạch 2026' },
      en: { title: 'Cleanroom Supplies Catalog 2026' },
      ja: { title: 'クリーンルーム資材カタログ 2026' }
    }
  },
  {
    title: 'Chứng nhận ISO 14644-1 — Phòng sạch ULink',
    slug: 'chung-nhan-iso-14644-1',
    type: 'certificate',
    status: 'published',
    description: 'Chứng nhận phân loại độ sạch không khí theo ISO 14644-1.',
    file_name: 'chung-nhan-iso-14644-1.pdf',
    related_products: [
      'gang-tay-nitrile-class-1000', 'tham-phong-sach', 'khan-lau-phong-sach-wiper'
    ],
    translations: {
      vi: { title: 'Chứng nhận ISO 14644-1' },
      en: { title: 'ISO 14644-1 Certificate' },
      ja: { title: 'ISO 14644-1 認証' }
    }
  }
];

/**
 * Seed V2 — Product Categories
 *
 * 3 danh mục cha + danh mục con theo Figma sidebar filter.
 * parentSlug dùng để resolve FK parent khi seed.
 */

export const productCategories = [
  // ═══════════════════════════════════════════════════════════════
  // DANH MỤC CHA
  // ═══════════════════════════════════════════════════════════════
  {
    name: 'Băng keo Nhôm',
    slug: 'bang-keo-nhom',
    status: 'published',
    parentSlug: null,
    description: 'Đa dạng giải pháp băng keo nhôm chất lượng cao cho hệ thống HVAC, ống gió, các bảo trì công nghiệp, đáp ứng tiêu chuẩn kỹ thuật khắt khe.',
    translations: {
      vi: { name: 'Băng keo Nhôm', description: 'Đa dạng giải pháp băng keo nhôm chất lượng cao cho hệ thống HVAC, ống gió, bảo trì công nghiệp.' },
      en: { name: 'Aluminum Tape', description: 'High-quality aluminum tape solutions for HVAC, ductwork, and industrial maintenance.' },
      ja: { name: 'アルミテープ', description: 'HVAC、ダクト、産業メンテナンス向けの高品質アルミテープ。' }
    }
  },
  {
    name: 'Bao bì & Đóng gói',
    slug: 'bao-bi-dong-goi',
    status: 'published',
    parentSlug: null,
    description: 'Đa dạng giải pháp bao bì công nghiệp chất lượng cao, từ màng co, thùng carton, túi PE, vật liệu đóng gói chuyên dụng, đáp ứng mọi nhu cầu sản xuất và xuất khẩu.',
    translations: {
      vi: { name: 'Bao bì & Đóng gói', description: 'Giải pháp bao bì công nghiệp chất lượng cao.' },
      en: { name: 'Packaging & Wrapping', description: 'High-quality industrial packaging solutions.' },
      ja: { name: '包装・梱包', description: '高品質な産業用包装ソリューション。' }
    }
  },
  {
    name: 'Vật tư Phòng sạch',
    slug: 'vat-tu-phong-sach',
    status: 'published',
    parentSlug: null,
    description: 'Sản phẩm chất lượng cao giúp kiểm soát ô nhiễm, duy trì môi trường sạch sẽ, bảo đảm an toàn tuyệt đối cho linh kiện, thiết bị và con người.',
    translations: {
      vi: { name: 'Vật tư Phòng sạch', description: 'Sản phẩm chất lượng cao cho phòng sạch công nghiệp.' },
      en: { name: 'Cleanroom Supplies', description: 'High-quality products for industrial cleanrooms.' },
      ja: { name: 'クリーンルーム資材', description: '産業用クリーンルーム向けの高品質製品。' }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // CON — BĂNG KEO NHÔM (7 danh mục con)
  // ═══════════════════════════════════════════════════════════════
  {
    name: 'Băng keo nhôm tiêu chuẩn',
    slug: 'bang-keo-nhom-tieu-chuan',
    status: 'published',
    parentSlug: 'bang-keo-nhom',
    sort: 1,
    translations: {
      vi: { name: 'Băng keo nhôm tiêu chuẩn' },
      en: { name: 'Standard Aluminum Tape' },
      ja: { name: '標準アルミテープ' }
    }
  },
  {
    name: 'Băng keo nhôm chịu nhiệt',
    slug: 'bang-keo-nhom-chiu-nhiet',
    status: 'published',
    parentSlug: 'bang-keo-nhom',
    sort: 2,
    translations: {
      vi: { name: 'Băng keo nhôm chịu nhiệt' },
      en: { name: 'Heat-Resistant Aluminum Tape' },
      ja: { name: '耐熱アルミテープ' }
    }
  },
  {
    name: 'Băng keo nhôm gia cố lưới',
    slug: 'bang-keo-nhom-gia-co-luoi',
    status: 'published',
    parentSlug: 'bang-keo-nhom',
    sort: 3,
    translations: {
      vi: { name: 'Băng keo nhôm gia cố lưới' },
      en: { name: 'Fiberglass-Reinforced Aluminum Tape' },
      ja: { name: 'ガラス繊維強化アルミテープ' }
    }
  },
  {
    name: 'Băng keo nhôm cách nhiệt',
    slug: 'bang-keo-nhom-cach-nhiet-cat',
    status: 'published',
    parentSlug: 'bang-keo-nhom',
    sort: 4,
    translations: {
      vi: { name: 'Băng keo nhôm cách nhiệt' },
      en: { name: 'Insulation Aluminum Tape' },
      ja: { name: '断熱アルミテープ' }
    }
  },
  {
    name: 'Băng keo nhôm ống gió',
    slug: 'bang-keo-nhom-ong-gio',
    status: 'published',
    parentSlug: 'bang-keo-nhom',
    sort: 5,
    translations: {
      vi: { name: 'Băng keo nhôm ống gió' },
      en: { name: 'HVAC Duct Aluminum Tape' },
      ja: { name: 'ダクト用アルミテープ' }
    }
  },
  {
    name: 'Băng keo nhôm mạ kẽm',
    slug: 'bang-keo-nhom-ma-kem-cat',
    status: 'published',
    parentSlug: 'bang-keo-nhom',
    sort: 6,
    translations: {
      vi: { name: 'Băng keo nhôm mạ kẽm' },
      en: { name: 'Zinc-Coated Aluminum Tape' },
      ja: { name: '亜鉛メッキアルミテープ' }
    }
  },
  {
    name: 'Băng keo nhôm tự dính',
    slug: 'bang-keo-nhom-tu-dinh-cat',
    status: 'published',
    parentSlug: 'bang-keo-nhom',
    sort: 7,
    translations: {
      vi: { name: 'Băng keo nhôm tự dính' },
      en: { name: 'Self-Adhesive Aluminum Tape' },
      ja: { name: '自己粘着アルミテープ' }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // CON — BAO BÌ & ĐÓNG GÓI (7 danh mục con)
  // ═══════════════════════════════════════════════════════════════
  {
    name: 'Màng quấn Pallet',
    slug: 'mang-quan-pallet-cat',
    status: 'published',
    parentSlug: 'bao-bi-dong-goi',
    sort: 1,
    translations: {
      vi: { name: 'Màng quấn Pallet' },
      en: { name: 'Pallet Stretch Film' },
      ja: { name: 'パレットストレッチフィルム' }
    }
  },
  {
    name: 'Thùng carton các loại',
    slug: 'thung-carton-cac-loai',
    status: 'published',
    parentSlug: 'bao-bi-dong-goi',
    sort: 2,
    translations: {
      vi: { name: 'Thùng carton các loại' },
      en: { name: 'Carton Boxes' },
      ja: { name: '段ボール箱各種' }
    }
  },
  {
    name: 'Băng keo công nghiệp',
    slug: 'bang-keo-cong-nghiep',
    status: 'published',
    parentSlug: 'bao-bi-dong-goi',
    sort: 3,
    translations: {
      vi: { name: 'Băng keo công nghiệp' },
      en: { name: 'Industrial Tape' },
      ja: { name: '工業用テープ' }
    }
  },
  {
    name: 'Túi PE / PP & Ziper',
    slug: 'tui-pe-pp-ziper',
    status: 'published',
    parentSlug: 'bao-bi-dong-goi',
    sort: 4,
    translations: {
      vi: { name: 'Túi PE / PP & Ziper' },
      en: { name: 'PE / PP Bags & Zipper Bags' },
      ja: { name: 'PE/PPバッグ・ジッパーバッグ' }
    }
  },
  {
    name: 'Pallet nhựa & gỗ',
    slug: 'pallet-nhua-go',
    status: 'published',
    parentSlug: 'bao-bi-dong-goi',
    sort: 5,
    translations: {
      vi: { name: 'Pallet nhựa & gỗ' },
      en: { name: 'Plastic & Wood Pallets' },
      ja: { name: 'プラスチック・木製パレット' }
    }
  },
  {
    name: 'Dây đai đóng hàng',
    slug: 'day-dai-dong-hang',
    status: 'published',
    parentSlug: 'bao-bi-dong-goi',
    sort: 6,
    translations: {
      vi: { name: 'Dây đai đóng hàng' },
      en: { name: 'Strapping Bands' },
      ja: { name: '梱包バンド' }
    }
  },
  {
    name: 'Vật liệu đệm lót',
    slug: 'vat-lieu-dem-lot',
    status: 'published',
    parentSlug: 'bao-bi-dong-goi',
    sort: 7,
    translations: {
      vi: { name: 'Vật liệu đệm lót' },
      en: { name: 'Cushioning Materials' },
      ja: { name: 'クッション材' }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // CON — VẬT TƯ PHÒNG SẠCH (7 danh mục con)
  // ═══════════════════════════════════════════════════════════════
  {
    name: 'Quần áo phòng sạch',
    slug: 'quan-ao-phong-sach',
    status: 'published',
    parentSlug: 'vat-tu-phong-sach',
    sort: 1,
    translations: {
      vi: { name: 'Quần áo phòng sạch' },
      en: { name: 'Cleanroom Garments' },
      ja: { name: 'クリーンルームウェア' }
    }
  },
  {
    name: 'Găng tay phòng sạch',
    slug: 'gang-tay-phong-sach',
    status: 'published',
    parentSlug: 'vat-tu-phong-sach',
    sort: 2,
    translations: {
      vi: { name: 'Găng tay phòng sạch' },
      en: { name: 'Cleanroom Gloves' },
      ja: { name: 'クリーンルームグローブ' }
    }
  },
  {
    name: 'Khẩu trang phòng sạch',
    slug: 'khau-trang-phong-sach',
    status: 'published',
    parentSlug: 'vat-tu-phong-sach',
    sort: 3,
    translations: {
      vi: { name: 'Khẩu trang phòng sạch' },
      en: { name: 'Cleanroom Masks' },
      ja: { name: 'クリーンルームマスク' }
    }
  },
  {
    name: 'Vải lau phòng sạch',
    slug: 'vai-lau-phong-sach',
    status: 'published',
    parentSlug: 'vat-tu-phong-sach',
    sort: 4,
    translations: {
      vi: { name: 'Vải lau phòng sạch' },
      en: { name: 'Cleanroom Wipes' },
      ja: { name: 'クリーンルームワイパー' }
    }
  },
  {
    name: 'Thảm dính bụi',
    slug: 'tham-dinh-bui',
    status: 'published',
    parentSlug: 'vat-tu-phong-sach',
    sort: 5,
    translations: {
      vi: { name: 'Thảm dính bụi' },
      en: { name: 'Sticky Mats' },
      ja: { name: '粘着マット' }
    }
  },
  {
    name: 'Dụng cụ vệ sinh',
    slug: 'dung-cu-ve-sinh',
    status: 'published',
    parentSlug: 'vat-tu-phong-sach',
    sort: 6,
    translations: {
      vi: { name: 'Dụng cụ vệ sinh' },
      en: { name: 'Cleaning Tools' },
      ja: { name: '清掃用具' }
    }
  },
  {
    name: 'Phụ kiện khác',
    slug: 'phu-kien-khac',
    status: 'published',
    parentSlug: 'vat-tu-phong-sach',
    sort: 7,
    translations: {
      vi: { name: 'Phụ kiện khác' },
      en: { name: 'Other Accessories' },
      ja: { name: 'その他アクセサリー' }
    }
  }
];

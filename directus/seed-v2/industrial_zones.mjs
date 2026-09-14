/**
 * Seed V2 — Hub Industrial Zones (KCN)
 *
 * Khớp chính xác với Figma mega-menu dropdown.
 * Mỗi vùng hiển thị 8 KCN nổi bật + "Xem tất cả".
 * featured = true → hiển thị trên mega-menu (8 KCN/vùng)
 */

export const industrialZones = [
  // ═══════════════════════════════════════════════════════════════
  // MIỀN BẮC — 8 KCN nổi bật (khớp ảnh mega-menu)
  // ═══════════════════════════════════════════════════════════════
  {
    name: 'KCN Đình Vũ',
    hubSlug: 'hub-mien-bac',
    corridor: 'hai-phong',
    featured: true,
    description: 'Hải Phòng, kết nối cảng biển quốc tế, vị trí chiến lược cho công nghiệp nặng',
    translations: {
      vi: { name: 'KCN Đình Vũ' },
      en: { name: 'Dinh Vu IP' },
      ja: { name: 'ディンヴー工業団地' }
    }
  },
  {
    name: 'KCN Thăng Long',
    hubSlug: 'hub-mien-bac',
    corridor: 'ha-noi',
    featured: true,
    description: 'Hà Nội, liên doanh Nhật Bản uy tín, hạ tầng hoàn thiện cho điện tử & ô tô',
    translations: {
      vi: { name: 'KCN Thăng Long' },
      en: { name: 'Thang Long IP' },
      ja: { name: 'タンロン工業団地' }
    }
  },
  {
    name: 'KCN Quế Võ',
    hubSlug: 'hub-mien-bac',
    corridor: 'bac-ninh',
    featured: true,
    description: 'Bắc Ninh, kết nối quốc lộ 18, gần sân bay Nội Bài, thu hút cơ khí & linh kiện',
    translations: {
      vi: { name: 'KCN Quế Võ' },
      en: { name: 'Que Vo IP' },
      ja: { name: 'クエヴォ工業団地' }
    }
  },
  {
    name: 'KCN Phúc Điền',
    hubSlug: 'hub-mien-bac',
    corridor: 'hai-duong',
    featured: true,
    description: 'Hải Dương, vị trí giao thương thuận lợi, tập trung dệt may & thực phẩm',
    translations: {
      vi: { name: 'KCN Phúc Điền' },
      en: { name: 'Phuc Dien IP' },
      ja: { name: 'フクディエン工業団地' }
    }
  },
  {
    name: 'KCN Yên Phong',
    hubSlug: 'hub-mien-bac',
    corridor: 'bac-ninh',
    featured: true,
    description: 'Bắc Ninh, thủ phủ sản xuất Samsung, công nghệ cao & dịch vụ phụ trợ hiện đại',
    translations: {
      vi: { name: 'KCN Yên Phong' },
      en: { name: 'Yen Phong IP' },
      ja: { name: 'エンフォン工業団地' }
    }
  },
  {
    name: 'KCN Đại An',
    hubSlug: 'hub-mien-bac',
    corridor: 'hai-duong',
    featured: true,
    description: 'Hải Dương, thu hút mạnh mẽ vốn đầu tư nước ngoài FDI, đa dạng lắp ráp cơ khí',
    translations: {
      vi: { name: 'KCN Đại An' },
      en: { name: 'Dai An IP' },
      ja: { name: 'ダイアン工業団地' }
    }
  },
  {
    name: 'KCN Tiên Sơn',
    hubSlug: 'hub-mien-bac',
    corridor: 'bac-ninh',
    featured: true,
    description: 'Bắc Ninh, hạ tầng kỹ thuật đồng bộ, chế tạo máy chính xác & vật liệu xây dựng',
    translations: {
      vi: { name: 'KCN Tiên Sơn' },
      en: { name: 'Tien Son IP' },
      ja: { name: 'ティエンソン工業団地' }
    }
  },
  {
    name: 'KCN Nam Sách',
    hubSlug: 'hub-mien-bac',
    corridor: 'hai-duong',
    featured: true,
    description: 'Hải Dương, thích hợp công nghiệp sạch, chế biến hàng xuất khẩu & bao bì',
    translations: {
      vi: { name: 'KCN Nam Sách' },
      en: { name: 'Nam Sach IP' },
      ja: { name: 'ナムサック工業団地' }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MIỀN TRUNG — 8 KCN nổi bật (khớp ảnh mega-menu)
  // ═══════════════════════════════════════════════════════════════
  {
    name: 'KCN Phú Bài',
    hubSlug: 'hub-mien-trung',
    corridor: 'thua-thien-hue',
    featured: true,
    description: 'Thừa Thiên Huế, vị trí chiến lược gần sân bay quốc tế, công nghiệp nhẹ & chế biến',
    translations: {
      vi: { name: 'KCN Phú Bài' },
      en: { name: 'Phu Bai IP' },
      ja: { name: 'フーバイ工業団地' }
    }
  },
  {
    name: 'KCN Điện Nam – Điện Ngọc',
    hubSlug: 'hub-mien-trung',
    corridor: 'quang-nam',
    featured: true,
    description: 'Quảng Nam, trung tâm công nghiệp lớn nhất miền Trung, dệt may & da giày',
    translations: {
      vi: { name: 'KCN Điện Nam – Điện Ngọc' },
      en: { name: 'Dien Nam – Dien Ngoc IP' },
      ja: { name: 'ディエンナム・ディエンゴック工業団地' }
    }
  },
  {
    name: 'KCN Hòa Khánh',
    hubSlug: 'hub-mien-trung',
    corridor: 'da-nang',
    featured: true,
    description: 'Đà Nẵng, khu công nghiệp lâu đời, đa ngành từ cơ khí đến thực phẩm',
    translations: {
      vi: { name: 'KCN Hòa Khánh' },
      en: { name: 'Hoa Khanh IP' },
      ja: { name: 'ホアカイン工業団地' }
    }
  },
  {
    name: 'KCN Phú Tài',
    hubSlug: 'hub-mien-trung',
    corridor: 'binh-dinh',
    featured: true,
    description: 'Bình Định, cảng biển Quy Nhơn, chế biến gỗ & nông sản xuất khẩu',
    translations: {
      vi: { name: 'KCN Phú Tài' },
      en: { name: 'Phu Tai IP' },
      ja: { name: 'フータイ工業団地' }
    }
  },
  {
    name: 'KCN Dung Quất',
    hubSlug: 'hub-mien-trung',
    corridor: 'quang-ngai',
    featured: true,
    description: 'Quảng Ngãi, liên kề khu kinh tế Dung Quất, lọc hóa dầu & công nghiệp nặng',
    translations: {
      vi: { name: 'KCN Dung Quất' },
      en: { name: 'Dung Quat IP' },
      ja: { name: 'ズンクアット工業団地' }
    }
  },
  {
    name: 'KCN Tịnh Phong',
    hubSlug: 'hub-mien-trung',
    corridor: 'quang-ngai',
    featured: true,
    description: 'Quảng Ngãi, thu hút FDI mạnh, sản xuất vật liệu xây dựng & cơ khí',
    translations: {
      vi: { name: 'KCN Tịnh Phong' },
      en: { name: 'Tinh Phong IP' },
      ja: { name: 'ティンフォン工業団地' }
    }
  },
  {
    name: 'KCN Phong Điền',
    hubSlug: 'hub-mien-trung',
    corridor: 'thua-thien-hue',
    featured: true,
    description: 'Thừa Thiên Huế, hạ tầng đồng bộ, công nghệ cao & điện tử',
    translations: {
      vi: { name: 'KCN Phong Điền' },
      en: { name: 'Phong Dien IP' },
      ja: { name: 'フォンディエン工業団地' }
    }
  },
  {
    name: 'KCN Chu Lai',
    hubSlug: 'hub-mien-trung',
    corridor: 'quang-nam',
    featured: true,
    description: 'Quảng Nam, đặc khu kinh tế mở, lắp ráp ô tô & linh kiện cơ khí',
    translations: {
      vi: { name: 'KCN Chu Lai' },
      en: { name: 'Chu Lai IP' },
      ja: { name: 'チューライ工業団地' }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MIỀN NAM — 8 KCN nổi bật (khớp ảnh mega-menu)
  // ═══════════════════════════════════════════════════════════════
  {
    name: 'KCN VSIP Bình Dương',
    hubSlug: 'hub-mien-nam',
    corridor: 'binh-duong',
    featured: true,
    description: 'Khu công nghiệp Việt Nam - Singapore, quy mô 500ha, đa ngành sản xuất',
    translations: {
      vi: { name: 'KCN VSIP Bình Dương' },
      en: { name: 'VSIP Binh Duong IP' },
      ja: { name: 'VSIPビンズオン工業団地' }
    }
  },
  {
    name: 'KCN Nhơn Trạch',
    hubSlug: 'hub-mien-nam',
    corridor: 'dong-nai',
    featured: true,
    description: 'Đồng Nai, chuyên chế biến và sản xuất công nghiệp nặng, gần cảng Cát Lái',
    translations: {
      vi: { name: 'KCN Nhơn Trạch' },
      en: { name: 'Nhon Trach IP' },
      ja: { name: 'ニョンチャック工業団地' }
    }
  },
  {
    name: 'KCN Long Hậu',
    hubSlug: 'hub-mien-nam',
    corridor: 'long-an',
    featured: true,
    description: 'Long An, vị trí chiến lược gần cảng biển, phù hợp logistics & xuất khẩu',
    translations: {
      vi: { name: 'KCN Long Hậu' },
      en: { name: 'Long Hau IP' },
      ja: { name: 'ロンハウ工業団地' }
    }
  },
  {
    name: 'KCN Tân Thuận',
    hubSlug: 'hub-mien-nam',
    corridor: 'hcm',
    featured: true,
    description: 'TP.HCM, khu chế xuất lớn nhất miền Nam, hơn 200 doanh nghiệp FDI',
    translations: {
      vi: { name: 'KCN Tân Thuận' },
      en: { name: 'Tan Thuan Export IP' },
      ja: { name: 'タントゥアン輸出加工区' }
    }
  },
  {
    name: 'KCN Mỹ Phước',
    hubSlug: 'hub-mien-nam',
    corridor: 'binh-duong',
    featured: true,
    description: 'Bình Dương, đa ngành từ điện tử đến cơ khí, hạ tầng hiện đại',
    translations: {
      vi: { name: 'KCN Mỹ Phước' },
      en: { name: 'My Phuoc IP' },
      ja: { name: 'ミーフック工業団地' }
    }
  },
  {
    name: 'KCN Phú Mỹ',
    hubSlug: 'hub-mien-nam',
    corridor: 'ba-ria-vung-tau',
    featured: true,
    description: 'Bà Rịa - Vũng Tàu, công nghiệp nặng và hóa chất, gần cảng nước sâu',
    translations: {
      vi: { name: 'KCN Phú Mỹ' },
      en: { name: 'Phu My IP' },
      ja: { name: 'フーミー工業団地' }
    }
  },
  {
    name: 'KCN Đức Hòa',
    hubSlug: 'hub-mien-nam',
    corridor: 'long-an',
    featured: true,
    description: 'Long An, trung tâm kho vận và logistics kết nối TP.HCM - ĐBSCL',
    translations: {
      vi: { name: 'KCN Đức Hòa' },
      en: { name: 'Duc Hoa IP' },
      ja: { name: 'ドゥックホア工業団地' }
    }
  },
  {
    name: 'KCN Biên Hòa',
    hubSlug: 'hub-mien-nam',
    corridor: 'dong-nai',
    featured: true,
    description: 'Đồng Nai, KCN lâu đời nhất Việt Nam, đa dạng ngành nghề sản xuất',
    translations: {
      vi: { name: 'KCN Biên Hòa' },
      en: { name: 'Bien Hoa IP' },
      ja: { name: 'ビエンホア工業団地' }
    }
  }
];

/**
 * Seed V2 — Industries (Ngành công nghiệp)
 *
 * 6 ngành khớp với Figma Solutions page.
 * Mỗi ngành có danh sách giải pháp (solutions) hiển thị trên card.
 */

export const industries = [
  {
    name: 'Nội thất',
    slug: 'noi-that',
    status: 'published',
    description: 'Bảo vệ toàn diện bề mặt gỗ, da, vải và kim loại trong suốt quy trình sản xuất, vận chuyển và lắp đặt nội thất cao cấp.',
    solutions: [
      'Màng bọc PE bảo vệ bề mặt gỗ & da',
      'Bao bì carton chống va đập & xốp định hình',
      'Túi chống ẩm cho linh kiện & phụ kiện nội thất'
    ],
    translations: {
      vi: { name: 'Nội thất', description: 'Bảo vệ toàn diện bề mặt gỗ, da, vải và kim loại trong suốt quy trình sản xuất, vận chuyển và lắp đặt nội thất cao cấp.' },
      en: { name: 'Furniture', description: 'Comprehensive surface protection for wood, leather, fabric and metal throughout manufacturing, shipping and installation.' },
      ja: { name: '家具', description: '製造、輸送、設置の全工程における木材、革、布、金属の表面保護。' }
    }
  },
  {
    name: 'Kho & Logistics',
    slug: 'kho-logistics',
    status: 'published',
    description: 'Tối ưu hóa quy trình lưu kho, vận chuyển và phân phối hàng hóa với giải pháp bao bì bảo vệ chuyên dụng từ ULink Industries.',
    solutions: [
      'Màng co, màng quấn pallet bảo vệ hàng hóa',
      'Bao bì chống ẩm, chống va đập khi vận chuyển',
      'Vật tư đóng gói & dán nhãn cho kho bãi'
    ],
    translations: {
      vi: { name: 'Kho & Logistics', description: 'Tối ưu hóa quy trình lưu kho, vận chuyển và phân phối hàng hóa.' },
      en: { name: 'Warehouse & Logistics', description: 'Optimize warehousing, shipping and distribution with specialized protective packaging.' },
      ja: { name: '倉庫・物流', description: '専用保護包装で倉庫、輸送、配送を最適化。' }
    }
  },
  {
    name: 'Dược phẩm',
    slug: 'duoc-pham',
    status: 'published',
    description: 'Các sản phẩm bảo hộ y tế chất lượng cao, phục vụ môi trường khám chữa bệnh, phẫu thuật chuẩn vô trùng.',
    solutions: [
      'Khẩu trang y tế, găng tay vô trùng tiêu chuẩn',
      'Dụng cụ bảo hộ phẫu thuật dùng một lần',
      'Bao bì và hộp đựng rác thải y tế chuyên dụng'
    ],
    translations: {
      vi: { name: 'Dược phẩm', description: 'Sản phẩm bảo hộ y tế chất lượng cao cho môi trường vô trùng.' },
      en: { name: 'Pharmaceutical', description: 'High-quality medical protective products for sterile environments.' },
      ja: { name: '製薬', description: '無菌環境向け高品質医療用保護製品。' }
    }
  },
  {
    name: 'Thực phẩm',
    slug: 'thuc-pham',
    status: 'published',
    description: 'Giải pháp bao bì chuyên dụng cho ngành thực phẩm & đồ uống — màng co PE, màng bọc thực phẩm, bảo quản tươi ngon, đạt chuẩn ISO 22000.',
    solutions: [
      'Màng bọc, túi đóng gói thực phẩm an toàn',
      'Trang phục bảo hộ cho công nhân chế biến',
      'Giải pháp kiểm soát vi sinh bề mặt thiết bị'
    ],
    translations: {
      vi: { name: 'Thực phẩm', description: 'Giải pháp bao bì chuyên dụng cho ngành thực phẩm & đồ uống, đạt chuẩn ISO 22000.' },
      en: { name: 'Food & Beverage', description: 'Specialized packaging solutions for food & beverage, ISO 22000 compliant.' },
      ja: { name: '食品・飲料', description: '食品・飲料業界向け専用包装ソリューション、ISO 22000準拠。' }
    }
  },
  {
    name: 'Cơ khí chế tạo & HVAC',
    slug: 'co-khi-hvac',
    status: 'published',
    description: 'Cung cấp vật tư cơ khí, phụ kiện ống đồng, van điều khiển và thiết bị HVAC chính hãng cho hệ thống điều hòa không khí và thông gió công nghiệp.',
    solutions: [
      'Màng PE đóng kiện, dây đai chịu lực lớn',
      'Dầu, mỡ bôi trơn và hóa chất công nghiệp',
      'Kẹp cơ khí và màng chống rỉ sét VCI'
    ],
    translations: {
      vi: { name: 'Cơ khí chế tạo & HVAC', description: 'Vật tư cơ khí và thiết bị HVAC chính hãng cho hệ thống điều hòa không khí công nghiệp.' },
      en: { name: 'Mechanical & HVAC', description: 'Genuine mechanical supplies and HVAC equipment for industrial air conditioning systems.' },
      ja: { name: '機械・HVAC', description: '産業用空調システム向け正規機械部品・HVAC機器。' }
    }
  },
  {
    name: 'Điện tử',
    slug: 'dien-tu',
    status: 'published',
    description: 'Đảm bảo môi trường sản xuất không ô nhiễm hạt bụi và tĩnh điện, bảo vệ cấu trúc nhạy cảm của vi mạch.',
    solutions: [
      'Phòng sạch & trang phục bảo hộ PPE',
      'Sản phẩm chống tĩnh điện ESD chuyên dụng',
      'Bao bì chống ẩm, chống từ trường đa lớp'
    ],
    translations: {
      vi: { name: 'Điện tử', description: 'Đảm bảo môi trường sản xuất không ô nhiễm hạt bụi và tĩnh điện.' },
      en: { name: 'Electronics', description: 'Ensuring production environments free from particle and static contamination.' },
      ja: { name: '電子', description: '粒子・静電気汚染のない製造環境を確保。' }
    }
  }
];

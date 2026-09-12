export function getCategoryBullets(catName: string, locale: string): string[] {
  const nameLower = catName.toLowerCase();
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  // Food & Beverage specific
  if (nameLower.includes('mũ') || nameLower.includes('khẩu trang thực phẩm') || nameLower.includes('cap')) {
    return isVi
      ? ['Bao bọc toàn bộ tóc & mặt', 'Thiết kế thông thoáng, dễ thở', 'Hạn chế dị vật vào dây chuyền']
      : isJa
        ? ['頭髪・顔全体をカバー', '通気性が高く息苦しくない', 'ラインへの異物混入を防止']
        : ['Full hair & face coverage', 'Breathable & comfortable', 'Prevents foreign objects'];
  }
  if (nameLower.includes('cao su') || nameLower.includes('thực phẩm') && nameLower.includes('găng')) {
    return isVi
      ? ['Đạt chuẩn FDA 21 CFR', 'Không bột, an toàn vệ sinh', 'Độ bám dính bóc tách tốt']
      : isJa
        ? ['米国FDA 21 CFR規格適合', 'パウダーフリー衛生設計', '優れたグリップ力']
        : ['FDA 21 CFR compliant', 'Powder-free & hygienic', 'Excellent grip & tactility'];
  }
  if (nameLower.includes('băng tải') || nameLower.includes('giấy lau') || nameLower.includes('wipers')) {
    return isVi
      ? ['Không phát tán xơ vải', 'Thấm hút dầu mỡ cực nhanh', 'An toàn bề mặt inox']
      : isJa
        ? ['発塵ゼロの無塵設計', '油分・水分を rapid 吸収', 'ステンレス表面に safe']
        : ['Zero lint dispersion', 'Rapid oil & moisture absorption', 'Safe for stainless surfaces'];
  }
  if (nameLower.includes('pof') || nameLower.includes('màng co pof')) {
    return isVi
      ? ['Độ bóng & độ trong suốt cao', 'Màng co mỏng dẻo dai', 'An toàn tiếp xúc thực phẩm']
      : isJa
        ? ['高透明・高光沢仕上げ', '薄型で強靭な収縮性', '食品接触対応']
        : ['High gloss & transparency', 'Thin yet tough shrinkability', 'Safe for food contact'];
  }

  // Electronics & ESD specific
  if (nameLower.includes('esd') || nameLower.includes('chống tĩnh điện')) {
    return isVi
      ? ['Điện trở bề mặt 10^6 - 10^9 Ω', 'Bảo vệ chip & IC nhạy cảm', 'Đạt chuẩn ANSI/ESD S20.20']
      : isJa
        ? ['表面抵抗値 10^6 - 10^9 Ω', '敏感なIC・チップを保護', 'ANSI/ESD S20.20適合']
        : ['Surface resistance 10^6-10^9 Ω', 'Protects sensitive chips & ICs', 'ANSI/ESD S20.20 compliant'];
  }

  // PE Bags & Zip Bags
  if (nameLower.includes('túi pe')) {
    return isVi
      ? ['Chống tĩnh điện / chống ẩm', 'Đa kích thước & độ dày', 'Đạt chuẩn ISO & RoHS']
      : isJa
        ? ['帯電防止・防湿仕様', '豊富なサイズと厚み', 'ISO & RoHS適合']
        : ['Anti-static & moisture barrier', 'Multiple dimensions & gauge', 'ISO & RoHS compliant'];
  }
  if (nameLower.includes('zip') || nameLower.includes('túi zip')) {
    return isVi
      ? ['Khóa miết miết kín 100%', 'Tiêu chuẩn ESD / FDA', 'Trong suốt dễ nhận diện']
      : isJa
        ? ['100%密閉チャック構造', 'ESD/FDA規格適合', '中身が見えやすい高透明']
        : ['100% airtight zipper seal', 'ESD / FDA compliant', 'Transparent for easy identification'];
  }

  // Apparel & Wear
  if (nameLower.includes('quần áo') || nameLower.includes('trang phục') || nameLower.includes('wear') || nameLower.includes('suit')) {
    return isVi
      ? ['Vải sợi chống tĩnh điện mật độ cao', 'Thiết kế thoải mái, không xơ vải', 'Giặt sạch và tái sử dụng']
      : isJa
        ? ['高密度帯電防止生地', '発塵のない快適なデザイン', '洗濯再利用可能']
        : ['High-density anti-static fabric', 'Comfortable, lint-free design', 'Washable and reusable'];
  }

  // Gloves
  if (nameLower.includes('găng tay') || nameLower.includes('gloves')) {
    return isVi
      ? ['Chứng nhận không bột chống dị ứng', 'Độ nhạy xúc giác cực cao', 'Chống rách thủng vượt trội']
      : isJa
        ? ['アレルギー防止無粉証明', '極めて高い触覚感度', '優れた耐引き裂き性']
        : ['Powder-free anti-allergy certified', 'Ultra-high tactile sensitivity', 'Puncture resistant'];
  }

  // Masks
  if (nameLower.includes('khẩu trang') || nameLower.includes('mask')) {
    return isVi
      ? ['Màng lọc khuẩn hiệu suất cao', 'Thiết kế ôm khít, thông thoáng', 'Tiệt trùng và đóng gói riêng biệt']
      : isJa
        ? ['高効率細菌ろ過フィルター', 'フィット感が高く通気性に優れる', '個別滅菌パック包装']
        : ['High-efficiency bacterial filter', 'Snug fit with high breathability', 'Individually sterilized & packed'];
  }

  // Sticky Mats
  if (nameLower.includes('thảm') || nameLower.includes('mat')) {
    return isVi
      ? ['30 - 60 lớp bóc tiện lợi', 'Keo dính giữ chặt, không trơn trượt', 'Giữ bụi bẩn đế giày hiệu quả']
      : isJa
        ? ['30〜60層の剥離タイプ', '強力な粘着性で滑らない', '靴底のチリを効果的に捕獲']
        : ['30 - 60 peelable layers', 'Strong adhesive non-slip grip', 'Captures shoe sole dust'];
  }

  // Cleanroom Wipers
  if (nameLower.includes('khăn') || nameLower.includes('wiper') || nameLower.includes('lau')) {
    return isVi
      ? ['Sợi microfiber siêu mịn, không để lại sợi', 'Phù hợp phòng sạch Class ISO 4-8', 'Thấm hút dung môi cực nhanh']
      : isJa
        ? ['超極細マイクロファイバー、毛羽立ちゼロ', 'ISO Class 4-8クリーンルーム対応', '溶剤吸収性に優れる']
        : ['Ultra-fine microfiber, zero lint', 'Suitable for ISO Class 4-8 cleanrooms', 'Fast solvent absorption'];
  }

  // Vacuum Aluminum Bags
  if (nameLower.includes('nhôm') || nameLower.includes('chân không') || nameLower.includes('barrier')) {
    return isVi
      ? ['Hàn nhiệt chắc chắn', 'Chống ẩm tuyệt đối', 'Bảo vệ sản phẩm nhạy cảm']
      : isJa
        ? ['強固な熱シール構造', '完全な防湿遮断', 'デリケートな製品を保護']
        : ['Firm heat-sealed seams', 'Absolute moisture barrier', 'Protects sensitive items'];
  }

  // Trays
  if (nameLower.includes('khay') || nameLower.includes('hộp') || nameLower.includes('tray')) {
    return isVi
      ? ['Thiết kế theo yêu cầu', 'Chất liệu định hình ESD / Food', 'Tái sử dụng nhiều lần']
      : isJa
        ? ['カスタムオーダー設計', 'ESD/食品グレード成形材', '再利用可能']
        : ['Custom tailored design', 'ESD / Food grade molding', 'Reusable and durable'];
  }

  // Pallet & Stretch Film
  if (nameLower.includes('màng pe') || nameLower.includes('pallet') || nameLower.includes('stretch') || nameLower.includes('co bọc')) {
    return isVi
      ? ['Lực co giãn và độ bám dính cực tốt', 'Chống bụi bẩn, nước và va đập nhẹ', 'Tiết kiệm chi phí đóng gói']
      : isJa
        ? ['優れた自己粘着性と延伸性', 'チリ、湿気、軽微な衝撃から保護', '梱包コストを削減']
        : ['Excellent stretch and cling force', 'Shields from dust, moisture & minor impacts', 'Reduces packaging cost'];
  }

  // Default fallback bullets
  return isVi
    ? ['Đạt tiêu chuẩn an toàn kỹ thuật cao', 'Đầy đủ chứng nhận chất lượng CO/CQ', 'Tối ưu hóa chi phí vận hành cho nhà máy']
    : isJa
      ? ['高度な技術安全基準に準拠', 'CO/CQ品質証明書を完備', '工場の運用コストを最適化']
      : ['Complies with high safety standards', 'Complete quality CO/CQ certification', 'Optimizes factory operational costs'];
}

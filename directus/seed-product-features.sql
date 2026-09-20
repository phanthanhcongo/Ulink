-- ============================================================================
-- Seed: features + specifications cho tất cả sản phẩm
-- Chạy sau seed-products.sql
-- ============================================================================

-- === DANH MỤC 1: VẬT TƯ PHÒNG SẠCH ===
UPDATE products SET
  features = '["Giữ bụi 99.9%", "30 lớp PE", "Keo Acrylic", "Dùng 1 lần"]',
  specifications = '{"Kích thước": "60 x 90 cm", "Số lớp": "30 lớp/tấm", "Chất liệu": "PE phủ keo Acrylic", "Màu sắc": "Trắng / Xanh"}'
WHERE slug = 'sticky-mat-30-layers';

UPDATE products SET
  features = '["Chống tĩnh điện", "Cán Inox ESD", "Cuộn thay thế", "Dính bụi mịn"]',
  specifications = '{"Chiều rộng": "12 inch (305mm)", "Chất liệu cuộn": "PE dính", "Tay cầm": "Inox ESD", "Ứng dụng": "Vệ sinh bề mặt SMT"}'
WHERE slug = 'sticky-roller-12-inch';

UPDATE products SET
  features = '["Chống tĩnh điện 10⁸Ω", "Mực không bụi", "Khô nhanh", "Dùng trong Lab"]',
  specifications = '{"Loại mực": "Xanh, khô nhanh", "Điện trở": "10⁸ Ω", "Chất liệu vỏ": "Nhựa ESD", "Tiêu chuẩn": "ISO Class 5"}'
WHERE slug = 'cleanroom-pen-esd';

UPDATE products SET
  features = '["Không sinh bụi", "ISO Class 100", "In nhiệt", "Ép nhiệt đặc biệt"]',
  specifications = '{"Khổ giấy": "A4", "Định lượng": "72 gsm", "Tiêu chuẩn": "ISO Class 100", "Đóng gói": "500 tờ/ram"}'
WHERE slug = 'cleanroom-paper-a4-72g';

UPDATE products SET
  features = '["Không xơ sợi", "Đầu dẹt 3 inch", "Vệ sinh quang học", "Chính xác cao"]',
  specifications = '{"Chiều dài": "3 inch (76mm)", "Đầu": "Dẹt, không xơ", "Chất liệu": "Cotton tinh khiết", "Đóng gói": "100 cây/túi"}'
WHERE slug = 'cleanroom-swab-cotton-3inch';

UPDATE products SET
  features = '["Đầu nhựa PEEK", "Chống tĩnh điện", "Không xước bề mặt", "Carbon"]',
  specifications = '{"Model": "ESD-249", "Chất liệu": "Carbon + PEEK", "Chiều dài": "120mm", "Điện trở": "10⁶ - 10⁹ Ω"}'
WHERE slug = 'cleanroom-tweezers-esd';

UPDATE products SET
  features = '["Cuộn thay thế", "4 inch", "Dính bụi mịn", "Tiện lợi"]',
  specifications = '{"Chiều rộng": "4 inch (100mm)", "Chất liệu": "PE dính", "Số lớp": "60 lớp/cuộn", "Ứng dụng": "Vi mạch, màn hình"}'
WHERE slug = 'sticky-roller-refill-4inch';

UPDATE products SET
  features = '["Không để lại keo", "Vinyl 20mm", "Niêm phong", "Dễ bóc"]',
  specifications = '{"Chiều rộng": "20mm", "Chất liệu": "Vinyl", "Màu sắc": "Xanh dương", "Chiều dài": "33m/cuộn"}'
WHERE slug = 'cleanroom-tape-vinyl-blue';

UPDATE products SET
  features = '["Chống tĩnh điện", "Gáy xoắn", "50 trang", "Giấy phòng sạch"]',
  specifications = '{"Khổ": "A5", "Số trang": "50 trang", "Gáy": "Xoắn nhựa ESD", "Chất liệu": "Giấy phòng sạch"}'
WHERE slug = 'cleanroom-notebook-spiral';

UPDATE products SET
  features = '["Microfiber", "Vắt tự động", "Thay nhanh", "Không đọng nước"]',
  specifications = '{"Chất liệu đầu lau": "Microfiber", "Chiều rộng": "40cm", "Cán": "Nhôm anodized", "Tính năng": "Vắt tự động"}'
WHERE slug = 'cleanroom-dust-collector-mop';

-- === DANH MỤC 2: GĂNG TAY PHÒNG SẠCH ===
UPDATE products SET
  features = '["Không bột", "Kháng rách gấp 3x", "Chống hóa chất", "9 inch"]',
  specifications = '{"Chất liệu": "Nitrile", "Chiều dài": "9 inch", "Độ dày": "0.12mm", "Đóng gói": "100 đôi/hộp"}'
WHERE slug = 'nitrile-cleanroom-gloves';

UPDATE products SET
  features = '["Phủ PU đầu ngón", "Sợi Carbon ESD", "Bám tốt", "Thoáng khí"]',
  specifications = '{"Chất liệu": "Polyester pha Carbon", "Phủ": "PU đầu ngón", "Màu": "Trắng/Xám", "Điện trở": "10⁶ - 10⁸ Ω"}'
WHERE slug = 'pu-fingertip-esd-gloves';

UPDATE products SET
  features = '["Vô trùng Gamma", "12 inch", "Dược phẩm", "Đôi niêm phong"]',
  specifications = '{"Chất liệu": "Latex tự nhiên", "Chiều dài": "12 inch", "Tiệt trùng": "Tia Gamma", "Đóng gói": "50 đôi/hộp"}'
WHERE slug = 'sterile-latex-cleanroom-gloves';

UPDATE products SET
  features = '["Phủ PU lòng bàn tay", "Chịu mài mòn", "Sợi Carbon", "Bám chắc"]',
  specifications = '{"Chất liệu": "Polyester pha Carbon", "Phủ": "PU lòng bàn tay", "Điện trở": "10⁶ - 10⁸ Ω", "Ứng dụng": "Bê vác linh kiện"}'
WHERE slug = 'pu-palm-coated-esd-gloves';

UPDATE products SET
  features = '["Chống tĩnh điện", "Không bột", "Màu hồng", "Gắp chi tiết nhỏ"]',
  specifications = '{"Chất liệu": "Cao su tự nhiên", "Màu": "Hồng", "Đóng gói": "1440 cái/túi", "Điện trở": "< 10⁸ Ω"}'
WHERE slug = 'esd-finger-cots-pink';

UPDATE products SET
  features = '["Chịu nhiệt 300°C", "Nomex/Kevlar", "Dài 38cm", "Cách nhiệt"]',
  specifications = '{"Chất liệu": "Nomex/Kevlar", "Chịu nhiệt": "300°C", "Chiều dài": "38cm", "Ứng dụng": "Lò sấy, đùn ép"}'
WHERE slug = 'cleanroom-heat-resistant-gloves';

UPDATE products SET
  features = '["Siêu dẻo dai", "Nhạy xúc giác", "Class 5", "Không bột"]',
  specifications = '{"Chất liệu": "Latex tự nhiên", "Chiều dài": "12 inch", "Tiêu chuẩn": "ISO Class 5", "Đóng gói": "100 đôi/hộp"}'
WHERE slug = 'latex-cleanroom-gloves-powderfree';

UPDATE products SET
  features = '["Sợi Carbon", "Thoáng khí", "Không phủ PU", "Kiểm hàng"]',
  specifications = '{"Chất liệu": "Sợi Carbon dệt kim", "Phủ": "Không", "Điện trở": "10⁶ - 10⁸ Ω", "Ứng dụng": "Kiểm ngoại quan"}'
WHERE slug = 'esd-carbon-gloves-top-coated';

UPDATE products SET
  features = '["Chống hóa chất mạnh", "Neoprene", "Bọc nỉ Cotton", "Chống ăn mòn"]',
  specifications = '{"Chất liệu": "Neoprene", "Lót": "Nỉ Cotton", "Chiều dài": "33cm", "Kháng": "Axit Sulfuric, IPA, Solvents"}'
WHERE slug = 'neoprene-chemical-cleanroom-gloves';

UPDATE products SET
  features = '["Chống cắt A5", "Phủ Nitrile Foam", "HPPE + Kim loại", "Bền bỉ"]',
  specifications = '{"Chất liệu": "HPPE pha kim loại", "Phủ": "Nitrile Foam", "Cấp chống cắt": "A5 (ANSI)", "Ứng dụng": "Kính, tôn tấm"}'
WHERE slug = 'cut-resistant-level-a5-gloves';

-- === DANH MỤC 3: KHĂN LAU PHÒNG SẠCH ===
UPDATE products SET
  features = '["100% Polyester", "Cắt Laser", "ISO Class 3-5", "Không xơ sợi"]',
  specifications = '{"Chất liệu": "100% Polyester liên tục", "Kích thước": "9x9 inch", "Cắt": "Laser hàn mép", "Tiêu chuẩn": "ISO Class 3-5"}'
WHERE slug = 'polyester-cleanroom-wipers';

UPDATE products SET
  features = '["Microfiber siêu mảnh", "Hút dầu mỡ", "Cắt siêu âm", "Không hóa chất"]',
  specifications = '{"Chất liệu": "Microfiber M-3", "Kích thước": "9x9 inch", "Cắt": "Siêu âm", "Đóng gói": "100 tờ/túi"}'
WHERE slug = 'microfiber-cleanroom-wiper-m3';

UPDATE products SET
  features = '["Tẩm sẵn IPA 70%", "Tiệt trùng", "Tiện lợi", "Vệ sinh nhanh"]',
  specifications = '{"Dung dịch": "Cồn IPA 70%", "Kích thước": "9x9 inch", "Đóng gói": "100 tờ/can", "Ứng dụng": "Bề mặt máy móc"}'
WHERE slug = 'pre-wetted-ipa-70-wipers';

UPDATE products SET
  features = '["80% Cellulose", "Hấp thụ 5x", "Dệt không thoi", "Xơ bông tự nhiên"]',
  specifications = '{"Chất liệu": "80% Cellulose + 20% Polyester", "Model": "Bemcot M-3", "Hấp thụ": "5x trọng lượng", "Đóng gói": "100 tờ/túi"}'
WHERE slug = 'cleanroom-wiper-m3-celluose';

UPDATE products SET
  features = '["ISO Class 10", "Cắt Laser", "Siêu sạch", "Thấu kính & Wafer"]',
  specifications = '{"Chất liệu": "Microfiber", "Tiêu chuẩn": "ISO Class 10", "Cắt": "Laser", "Ứng dụng": "Thấu kính, đĩa Wafer"}'
WHERE slug = 'wiper-4004-microfiber-laser';

UPDATE products SET
  features = '["68gsm", "Thấm hút nhanh", "Giá tối ưu", "Vải không dệt"]',
  specifications = '{"Chất liệu": "Vải không dệt", "Định lượng": "68 gsm", "Kích thước": "12x12 inch", "Đóng gói": "150 tờ/túi"}'
WHERE slug = 'wiper-7080-nonwoven';

UPDATE products SET
  features = '["Kháng dung môi", "Poly-Cellulose", "Bền + Thấm", "IPA & Acetone"]',
  specifications = '{"Chất liệu": "Poly-Cellulose", "Kháng": "IPA, Acetone", "Kích thước": "9x9 inch", "Đóng gói": "100 tờ/túi"}'
WHERE slug = 'cleanroom-poly-cellulose-wiper';

UPDATE products SET
  features = '["Kinh tế", "Dệt đúp 120gsm", "Phòng sạch", "Thiết bị phụ trợ"]',
  specifications = '{"Model": "1008D", "Định lượng": "120 gsm", "Dệt": "Đúp", "Kích thước": "9x9 inch"}'
WHERE slug = 'cleanroom-wiper-1008D';

UPDATE products SET
  features = '["Chống tĩnh điện", "Sợi dẫn điện", "10⁶-10⁸Ω", "Không tích tĩnh"]',
  specifications = '{"Chất liệu": "Polyester + sợi dẫn điện", "Điện trở": "10⁶ - 10⁸ Ω", "Kích thước": "9x9 inch", "Đóng gói": "100 tờ/túi"}'
WHERE slug = 'antistatic-cleanroom-wiper';

UPDATE products SET
  features = '["500 tờ/cuộn", "Công nghiệp", "Rút tiện lợi", "Bền dai"]',
  specifications = '{"Model": "WypAll X70", "Số tờ": "500 tờ/cuộn", "Chất liệu": "Cellulose + PP", "Ứng dụng": "Công nghiệp nặng"}'
WHERE slug = 'heavy-duty-industrial-wiper-roll';

-- === DANH MỤC 4: QUẦN ÁO PHÒNG SẠCH ===
UPDATE products SET
  features = '["Chống văng bắn", "Tyvek 400", "Kháng khuẩn", "Bụi 0.5 micron"]',
  specifications = '{"Chất liệu": "Tyvek 400 DuPont", "Chống": "Văng bắn hóa chất nhẹ", "Lọc": "0.5 micron", "Đóng gói": "25 bộ/thùng"}'
WHERE slug = 'tyvek-cleanroom-coverall';

UPDATE products SET
  features = '["Đế PVC chống trượt", "ESD 10⁶-10⁹Ω", "Cao cổ", "ANSI/ESD S20.20"]',
  specifications = '{"Chất liệu đế": "PVC chống trượt", "Điện trở": "10⁶ - 10⁹ Ω", "Tiêu chuẩn": "ANSI/ESD S20.20", "Size": "36-46"}'
WHERE slug = 'esd-pvc-cleanroom-boot';

UPDATE products SET
  features = '["Sợi Carbon ESD", "Cổ bẻ", "Khuy bấm", "Thoáng mát"]',
  specifications = '{"Chất liệu": "Polyester pha Carbon", "Kiểu cổ": "Bẻ", "Cài": "Khuy bấm", "Điện trở": "10⁶ - 10⁸ Ω"}'
WHERE slug = 'cleanroom-blouse-esd';

UPDATE products SET
  features = '["Trùm kín vai", "Tích hợp khẩu trang", "ESD", "Ngăn tóc rơi"]',
  specifications = '{"Chất liệu": "Polyester pha Carbon", "Thiết kế": "Trùm đầu + vai + khẩu trang", "Điện trở": "10⁶ - 10⁸ Ω", "Đóng gói": "10 cái/túi"}'
WHERE slug = 'cleanroom-hood-mask';

UPDATE products SET
  features = '["Khóa kéo", "Vải Carbon", "Gọn nhẹ", "Chống tĩnh điện"]',
  specifications = '{"Chất liệu": "Polyester kẻ ô Carbon", "Cài": "Khóa kéo", "Điện trở": "10⁶ - 10⁸ Ω", "Ứng dụng": "Kiểm tra sản phẩm"}'
WHERE slug = 'esd-cleanroom-smock-zip';

UPDATE products SET
  features = '["Đế EVA chống mỏi", "Chống tĩnh điện", "Quai hậu", "Nhẹ"]',
  specifications = '{"Chất liệu đế": "EVA", "Điện trở": "10⁶ - 10⁹ Ω", "Thiết kế": "Quai hậu", "Size": "36-46"}'
WHERE slug = 'esd-sabot-shoes-white';

UPDATE products SET
  features = '["Dùng 1 lần", "PE 0.04mm", "Bo thun", "Chống nước bẩn"]',
  specifications = '{"Chất liệu": "PE", "Độ dày": "0.04mm", "Miệng": "Bo thun", "Đóng gói": "100 đôi/túi"}'
WHERE slug = 'cleanroom-shoe-cover-pe';

UPDATE products SET
  features = '["Sợi Carbon ESD", "Dài 40cm", "Bảo vệ tay áo", "Chống hóa chất"]',
  specifications = '{"Chất liệu": "Vải sợi Carbon ESD", "Chiều dài": "40cm", "Điện trở": "10⁶ - 10⁸ Ω", "Đóng gói": "10 đôi/túi"}'
WHERE slug = 'cleanroom-sleeve-cover-esd';

UPDATE products SET
  features = '["Kẻ sọc Carbon", "Bo gấu thun", "Chống tĩnh điện", "Đồng phục"]',
  specifications = '{"Chất liệu": "Polyester kẻ sọc Carbon", "Gấu": "Bo thun co giãn", "Điện trở": "10⁶ - 10⁸ Ω", "Size": "S-3XL"}'
WHERE slug = 'cleanroom-pants-esd-stripe';

UPDATE products SET
  features = '["Chịu Autoclave 121°C", "Kín mắt", "Tiệt trùng", "Dược phẩm"]',
  specifications = '{"Chất liệu": "Polycarbonate", "Chịu nhiệt": "Autoclave 121°C", "Kiểu": "Kín mắt", "Tiêu chuẩn": "EN 166"}'
WHERE slug = 'autoclavable-cleanroom-goggles';

-- === DANH MỤC 5: KHẨU TRANG PHÒNG SẠCH ===
UPDATE products SET
  features = '["Lọc bụi 99%", "3 lớp ES/MB", "Quai siêu mềm", "Không gây ngứa"]',
  specifications = '{"Số lớp": "3 (ES/MB/ES)", "Hiệu suất lọc": "BFE 99%", "Quai": "Thun hàn siêu âm", "Đóng gói": "50 cái/hộp"}'
WHERE slug = 'cleanroom-face-mask-3ply';

UPDATE products SET
  features = '["Than hoạt tính", "4 lớp", "Lọc mùi hóa chất", "Phòng sơn"]',
  specifications = '{"Số lớp": "4 (thêm than hoạt tính)", "Lọc": "Mùi hữu cơ, khí nhẹ", "Đóng gói": "50 cái/hộp", "Ứng dụng": "Phòng sơn, hóa chất"}'
WHERE slug = 'active-carbon-mask-4ply';

UPDATE products SET
  features = '["N95 lọc 95%", "Ôm khít mặt", "Định hình", "Dược phẩm"]',
  specifications = '{"Model": "3M 8210", "Tiêu chuẩn": "NIOSH N95", "Hiệu suất lọc": "95% bụi mịn", "Đóng gói": "20 cái/hộp"}'
WHERE slug = 'n95-cleanroom-mask';

UPDATE products SET
  features = '["2 lớp siêu nhẹ", "Không xơ sợi", "Dùng 1 lần", "Thực phẩm"]',
  specifications = '{"Số lớp": "2", "Chất liệu": "Không dệt", "Đóng gói": "100 cái/túi", "Ứng dụng": "Đóng gói thực phẩm"}'
WHERE slug = 'cleanroom-mask-2ply-paper';

UPDATE products SET
  features = '["Dây buộc sau đầu", "3 lớp", "Không đau tai", "Ca 12 tiếng"]',
  specifications = '{"Số lớp": "3", "Kiểu đeo": "Dây buộc sau đầu", "Đóng gói": "50 cái/hộp", "Ứng dụng": "Ca dài 12 tiếng"}'
WHERE slug = 'cleanroom-mask-tie-on';

UPDATE products SET
  features = '["Giặt 30+ lần", "Sợi Carbon ESD", "Tái sử dụng", "Tiết kiệm"]',
  specifications = '{"Chất liệu": "Vải kẻ ô Carbon", "Giặt": "30+ lần", "Điện trở": "10⁶ - 10⁸ Ω", "Tiêu chuẩn": "Phòng sạch"}'
WHERE slug = 'esd-fabric-washable-mask';

UPDATE products SET
  features = '["Chuẩn GMP", "PP không dệt", "Che râu tóc", "Vệ sinh ATTP"]',
  specifications = '{"Chất liệu": "PP không dệt", "Tiêu chuẩn": "GMP", "Đóng gói": "100 cái/túi", "Ứng dụng": "Thực phẩm, dược"}'
WHERE slug = 'cleanroom-beard-cover-pp';

UPDATE products SET
  features = '["Tiệt trùng", "Túi niêm phong đôi", "Siêu sạch", "Dược phẩm"]',
  specifications = '{"Kiểu": "Tiệt trùng 2 lớp", "Đóng gói": "Túi niêm phong đôi", "Ứng dụng": "Pha chế thuốc, vắc-xin", "Tiêu chuẩn": "ISO Class 5"}'
WHERE slug = 'cleanroom-face-mask-ultra-clean';

UPDATE products SET
  features = '["Silicon ôm khít", "2 phin lọc", "Nửa mặt", "Hóa chất"]',
  specifications = '{"Model": "3M 6200", "Chất liệu": "Silicon dẻo", "Phin lọc": "2 (lắp riêng)", "Ứng dụng": "Dung môi hóa chất"}'
WHERE slug = 'half-face-respirator-3m-6200';

UPDATE products SET
  features = '["Lọc 99.97%", "P100 NIOSH", "Bụi mịn & chì", "Khói hàn"]',
  specifications = '{"Model": "3M 2091", "Tiêu chuẩn": "NIOSH P100", "Hiệu suất": "99.97%", "Lọc": "Bụi mịn, khói hàn, hơi chì"}'
WHERE slug = 'particulate-filter-3m-2091';

-- === DANH MỤC 6: BAO BÌ CÔNG NGHIỆP ===
UPDATE products SET
  features = '["Che chắn điện từ", "4 lớp nhôm", "Khóa Zip", "Bán dẫn"]',
  specifications = '{"Chất liệu": "Nhôm 4 lớp", "Đóng": "Khóa Zip / Miệng dán", "Điện trở": "< 10¹¹ Ω", "Ứng dụng": "Bo mạch, linh kiện"}'
WHERE slug = 'esd-shielding-bag';

UPDATE products SET
  features = '["Co giãn 300%", "LLDPE 20mic", "Chống bụi nước", "Xuất khẩu"]',
  specifications = '{"Chất liệu": "LLDPE", "Độ dày": "20 mic", "Co giãn": "300%", "Ứng dụng": "Quấn pallet xuất khẩu"}'
WHERE slug = 'pe-stretch-wrap';

UPDATE products SET
  features = '["PP sóng ESD", "Có nắp cài", "Chống va đập", "Nhẹ bền"]',
  specifications = '{"Chất liệu": "PP sóng Danpla", "Tính năng": "ESD, có nắp cài", "Chịu tải": "15kg", "Ứng dụng": "Luân chuyển kho"}'
WHERE slug = 'danpla-esd-box';

UPDATE products SET
  features = '["ESD hồng", "Chống sốc", "1.2m x 100m", "Bọc hàng điện tử"]',
  specifications = '{"Chất liệu": "PE xốp hơi ESD", "Kích thước": "1.2m x 100m", "Màu": "Hồng (ESD)", "Ứng dụng": "Chèn lót hàng hóa"}'
WHERE slug = 'esd-bubble-wrap-roll';

UPDATE products SET
  features = '["Hút chân không", "3 lớp nhôm", "Cách ly ẩm", "Chip cao cấp"]',
  specifications = '{"Chất liệu": "Nhôm ép 3 lớp", "Tính năng": "Hút chân không", "Cách ly": "Ẩm + không khí", "Ứng dụng": "Vi mạch cao cấp"}'
WHERE slug = 'aluminum-foil-vacuum-bag';

UPDATE products SET
  features = '["150 micron", "J-STD-033", "Chống ẩm + ESD", "Chip SMD"]',
  specifications = '{"Chất liệu": "MBB 150 micron", "Tiêu chuẩn": "IPC/JEDEC J-STD-033", "Chống": "Ẩm + tĩnh điện", "Ứng dụng": "Chip SMD"}'
WHERE slug = 'esd-moisture-barrier-bag';

UPDATE products SET
  features = '["Cắt CNC", "EPE ESD hồng", "Dày 10mm", "Đàn hồi"]',
  specifications = '{"Chất liệu": "EPE bọt biển ESD", "Độ dày": "10mm", "Cắt": "CNC theo khuôn", "Ứng dụng": "Khay chứa bo mạch"}'
WHERE slug = 'epe-foam-sheet-anti-static';

UPDATE products SET
  features = '["Lực kéo 450kgf", "PET 16mm", "Xuất khẩu biển", "Bền chắc"]',
  specifications = '{"Chất liệu": "PET", "Bản rộng": "16mm", "Lực kéo đứt": "450 kgf", "Ứng dụng": "Đai kiện hàng xuất khẩu"}'
WHERE slug = 'strapping-band-pet-green';

UPDATE products SET
  features = '["5 lớp carton", "Bảo vệ góc", "L 50x50x4mm", "Chống móp"]',
  specifications = '{"Chất liệu": "Carton ép 5 lớp", "Kích thước": "L 50x50x4mm", "Chiều dài": "Theo yêu cầu", "Ứng dụng": "Nẹp góc pallet"}'
WHERE slug = 'edge-protector-cardboard';

UPDATE products SET
  features = '["6 nấc 10%-60%", "Chỉ thị màu", "Kiểm tra rò rỉ", "Túi MBB"]',
  specifications = '{"Số nấc": "6 (10%-60% RH)", "Kiểu": "Đổi màu chỉ thị", "Kích thước": "50x75mm", "Đóng gói": "200 thẻ/lon"}'
WHERE slug = 'humidity-indicator-card-6dot';

-- === DANH MỤC 7: VẬT TƯ ESD ===
UPDATE products SET
  features = '["Điện trở 1MΩ", "Dây xoắn co", "Nối đất an toàn", "3M chính hãng"]',
  specifications = '{"Điện trở": "1 MΩ tích hợp", "Dây": "Xoắn co giãn", "Kết nối": "Snap + kẹp cá sấu", "Tiêu chuẩn": "ANSI/ESD S1.1"}'
WHERE slug = 'esd-wrist-strap';

UPDATE products SET
  features = '["2 lớp Xanh/Đen", "Dày 2mm", "Tiêu tán tĩnh điện", "1m x 10m"]',
  specifications = '{"Chất liệu": "Cao su 2 lớp", "Kích thước": "1m x 10m", "Độ dày": "2mm", "Điện trở mặt": "10⁶ - 10⁸ Ω"}'
WHERE slug = 'esd-table-mat-2layer';

UPDATE products SET
  features = '["Khử tĩnh <1.5s", "Ion cân bằng", "Quạt 2 cánh", "Bàn thao tác"]',
  specifications = '{"Thời gian khử": "< 1.5 giây", "Loại": "Quạt ion AC", "Phạm vi": "600mm", "Nguồn": "220V AC"}'
WHERE slug = 'desktop-ionizer-fan-2fan';

UPDATE products SET
  features = '["Bộ 6 cây", "Inox phủ ESD", "Chính xác", "Không nhiễm từ"]',
  specifications = '{"Chất liệu": "Inox phủ sơn ESD", "Bộ gồm": "ESD-10 đến ESD-15", "Chiều dài": "110-140mm", "Ứng dụng": "Gắp IC, chip"}'
WHERE slug = 'esd-stainless-tweezers-set';

UPDATE products SET
  features = '["Dày 3mm", "Chịu tải xe nâng", "10⁶-10⁹Ω", "Trải sàn"]',
  specifications = '{"Chất liệu": "Cao su ESD", "Độ dày": "3mm", "Điện trở": "10⁶ - 10⁹ Ω", "Chịu tải": "Xe đẩy, xe nâng nhẹ"}'
WHERE slug = 'esd-floor-rubber-mat';

UPDATE products SET
  features = '["Đo điện trở", "LCD hiển thị", "ANSI/ESD S20.20", "2 quả nặng"]',
  specifications = '{"Model": "Desco 19290", "Dải đo": "10³ - 10¹² Ω", "Hiển thị": "LCD", "Tiêu chuẩn": "ANSI/ESD S20.20"}'
WHERE slug = 'surface-resistivity-meter';

UPDATE products SET
  features = '["Dây xoắn 2.4m", "Củ tròn 10mm", "Điện trở 1MΩ", "Nối đất"]',
  specifications = '{"Chiều dài": "2.4m (dây xoắn)", "Đầu nối": "Snap 10mm", "Điện trở": "1 MΩ", "Ứng dụng": "Nối đất thảm ESD"}'
WHERE slug = 'esd-grounding-cord-snap';

UPDATE products SET
  features = '["12 ngăn", "PP dẫn điện", "Xếp chồng", "Chip SMT"]',
  specifications = '{"Chất liệu": "PP dẫn điện ESD", "Số ngăn": "12", "Điện trở": "10⁴ - 10⁶ Ω", "Tính năng": "Xếp chồng"}'
WHERE slug = 'esd-component-organizer-tray';

UPDATE products SET
  features = '["Vàng/Đen cảnh báo", "Dán sàn EPA", "In chữ ESD", "3M 471"]',
  specifications = '{"Model": "3M 471", "Màu": "Vàng/Đen", "Chiều rộng": "50mm", "Ứng dụng": "Cảnh báo khu vực EPA"}'
WHERE slug = 'esd-caution-tape-yellow';

UPDATE products SET
  features = '["Dùng 1 lần", "Dẫn điện gót giày", "Khách tham quan", "EPA"]',
  specifications = '{"Chất liệu": "Dải dẫn điện", "Dùng": "1 lần", "Điện trở": "< 10⁹ Ω", "Ứng dụng": "Khách tham quan EPA"}'
WHERE slug = 'esd-heel-grounder-disposable';

-- === DANH MỤC 8: HÓA CHẤT PHÒNG SẠCH ===
UPDATE products SET
  features = '["IPA 99.9%", "Cleanroom Grade", "Lau rửa SMT", "Khử trùng"]',
  specifications = '{"Nồng độ": "99.9%", "Loại": "Cleanroom Grade", "Đóng gói": "Can 5L / 20L", "Ứng dụng": "Lau bo mạch SMT, khử trùng"}'
WHERE slug = 'ipa-cleanroom-grade-999';

UPDATE products SET
  features = '["Không để lại cặn ion", "Khô nhanh", "An toàn bo mạch", "Tẩy Flux"]',
  specifications = '{"Loại": "PCB Cleaner", "Tẩy": "Flux, nhựa cây", "Đóng gói": "Chai 1L / Can 5L", "Ứng dụng": "Bo mạch SMT sau hàn"}'
WHERE slug = 'smt-pcb-cleaner-fluid';

UPDATE products SET
  features = '["Chống ẩm muối", "Phủ Acrylic", "Xịt nhanh", "Bảo vệ mạch"]',
  specifications = '{"Loại": "Conformal Coating Acrylic", "Chống": "Ẩm, muối, oxy hóa", "Đóng gói": "Chai xịt 400ml", "Ứng dụng": "Bo mạch vùng duyên hải"}'
WHERE slug = 'conformal-coating-acrylic';

UPDATE products SET
  features = '["pH 7.0 trung tính", "Không ion Na/K", "An toàn ESD", "Phòng sạch"]',
  specifications = '{"pH": "7.0", "Chất liệu": "Detergent trung tính", "Đóng gói": "Can 5L / 20L", "Ứng dụng": "Lau sàn phòng sạch"}'
WHERE slug = 'cleanroom-neutral-cleaner-detergent';

UPDATE products SET
  features = '["Tẩy keo kem hàn", "Stencil SMT", "Không ăn mòn", "Bay hơi nhanh"]',
  specifications = '{"Loại": "Stencil Cleaner", "Đóng gói": "Chai 500ml", "Tẩy": "Keo kem hàn trên Stencil", "Ứng dụng": "Máy in keo tự động"}'
WHERE slug = 'stencil-cleaning-fluid-smt';

UPDATE products SET
  features = '["Tẩy nhựa thông", "Khô nhanh 30s", "Xịt tiện lợi", "Không cặn"]',
  specifications = '{"Loại": "Flux Remover", "Dung tích": "400ml", "Khô": "< 30 giây", "Ứng dụng": "Sửa chữa điện tử"}'
WHERE slug = 'flux-remover-spray-400ml';

UPDATE products SET
  features = '["Chống bám tĩnh điện", "Lau kính", "Không vết loang", "Xịt phun sương"]',
  specifications = '{"Loại": "Antistatic Cleaner", "Đóng gói": "Chai xịt 500ml", "Tính năng": "Ngăn hút bụi tĩnh điện", "Ứng dụng": "Kính máy soi, màn hình"}'
WHERE slug = 'antistatic-surface-cleaner-spray';

UPDATE products SET
  features = '["18.2 MΩ.cm", "Siêu tinh khiết", "Khử ion hoàn toàn", "Pha dung dịch"]',
  specifications = '{"Điện trở": "18.2 MΩ.cm", "Loại": "DI Water (Deionized)", "Đóng gói": "Can 5L / 20L", "Ứng dụng": "Pha dung dịch, rửa ống nghiệm"}'
WHERE slug = 'deionized-di-water-cleanroom';

UPDATE products SET
  features = '["Tẩy dầu mỡ", "Không cháy nổ", "Khô nhanh", "An toàn công nghiệp"]',
  specifications = '{"Loại": "Degreaser Solvent", "Đóng gói": "Can 5L / 20L", "Tẩy": "Dầu mỡ bôi trơn", "An toàn": "Không cháy nổ"}'
WHERE slug = 'degreaser-solvent-industrial';

UPDATE products SET
  features = '["Không dẫn điện", "Bay hơi sạch", "Xịt chính xác", "3M chính hãng"]',
  specifications = '{"Model": "3M Contact Cleaner", "Dung tích": "16oz (453ml)", "Tính năng": "Không dẫn điện", "Ứng dụng": "Tiếp điểm, relay, công tắc"}'
WHERE slug = 'contact-cleaner-spray-3m';

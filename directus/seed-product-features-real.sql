-- Seed features + specifications cho sản phẩm thực tế trong DB
-- Chạy: docker exec -i ulink-postgres-1 psql -U ulink -d ulink < directus/seed-product-features-real.sql

-- === BĂNG KEO NHÔM ===
UPDATE products SET features = '["Chịu nhiệt 150°C", "Dẫn nhiệt tốt", "Chống ẩm", "Dính mạnh"]', specifications = '{"Chiều rộng": "48mm", "Chiều dài": "30m", "Độ dày": "40 micron", "Chịu nhiệt": "150°C"}' WHERE slug = 'bang-keo-nhom-hvac-48mm';

UPDATE products SET features = '["Chịu nhiệt 300°C", "Chống cháy", "Keo Silicone", "Cách nhiệt"]', specifications = '{"Chiều rộng": "72mm", "Chiều dài": "45m", "Chịu nhiệt": "300°C", "Keo": "Silicone chịu nhiệt"}' WHERE slug = 'bang-keo-chiu-nhiet-72mm';

UPDATE products SET features = '["Gia cường sợi thủy tinh", "Kháng xé rách", "Bền bỉ", "HVAC"]', specifications = '{"Chất liệu": "Nhôm + sợi thủy tinh", "Lực kéo": "80 N/25mm", "Chiều rộng": "48mm", "Ứng dụng": "Ống gió HVAC"}' WHERE slug = 'bang-keo-nhom-soi-thuy-tinh';

UPDATE products SET features = '["Bảo ôn ống gió", "Rộng 96mm", "Chống thoát nhiệt", "Dán kín"]', specifications = '{"Chiều rộng": "96mm", "Chiều dài": "30m", "Độ dày": "50 micron", "Ứng dụng": "Bảo ôn ống gió"}' WHERE slug = 'bang-keo-nhom-bao-on-96mm';

UPDATE products SET features = '["3M chính hãng", "Chịu nhiệt 150°C", "Không cặn keo", "Bền lâu"]', specifications = '{"Thương hiệu": "3M", "Model": "425", "Chiều rộng": "50mm", "Chịu nhiệt": "150°C"}' WHERE slug = 'bang-keo-nhom-3m-425';

UPDATE products SET features = '["Nitto chính hãng", "Dính cực mạnh", "Chống oxy hóa", "Công nghiệp"]', specifications = '{"Thương hiệu": "Nitto", "Model": "950", "Chiều rộng": "50mm", "Lực dính": "Cao"}' WHERE slug = 'bang-keo-nhom-nitto-950';

UPDATE products SET features = '["Chuyên ống gió", "Chống rò rỉ", "Dán kín mối nối", "HVAC"]', specifications = '{"Chiều rộng": "48mm", "Chiều dài": "45m", "Ứng dụng": "Ống gió HVAC", "Chất liệu": "Nhôm nguyên chất"}' WHERE slug = 'bang-keo-nhom-hvac-duct';

UPDATE products SET features = '["Cách nhiệt tốt", "Phản xạ nhiệt", "Chống ẩm", "Tiết kiệm năng lượng"]', specifications = '{"Chiều rộng": "48mm", "Chiều dài": "30m", "Phản xạ nhiệt": "> 95%", "Ứng dụng": "Cách nhiệt ống, tường"}' WHERE slug = 'bang-keo-nhom-cach-nhiet';

UPDATE products SET features = '["Chống cháy", "UL 723 đạt chuẩn", "An toàn PCCC", "Chịu nhiệt cao"]', specifications = '{"Tiêu chuẩn": "UL 723", "Chịu nhiệt": "350°C", "Chiều rộng": "48mm", "Ứng dụng": "PCCC, chống cháy lan"}' WHERE slug = 'bang-keo-nhom-chong-chay';

UPDATE products SET features = '["Mạ kẽm chống gỉ", "Dính tốt trên kim loại", "Bền thời tiết", "Ngoài trời"]', specifications = '{"Chất liệu": "Nhôm mạ kẽm", "Chiều rộng": "50mm", "Chiều dài": "30m", "Ứng dụng": "Ngoài trời, chống gỉ"}' WHERE slug = 'bang-keo-nhom-ma-kem';

UPDATE products SET features = '["Tự dính không cần nhiệt", "Dễ thi công", "Đa năng", "Nhẹ"]', specifications = '{"Chiều rộng": "50mm", "Chiều dài": "25m", "Keo": "Acrylic tự dính", "Ứng dụng": "Đa mục đích"}' WHERE slug = 'bang-keo-nhom-tu-dinh';

UPDATE products SET features = '["Công nghiệp nặng", "Lực dính cao", "Chống hóa chất", "Chịu tải"]', specifications = '{"Chiều rộng": "50mm", "Chiều dài": "50m", "Độ dày": "60 micron", "Ứng dụng": "Công nghiệp nặng"}' WHERE slug = 'bang-keo-nhom-cong-nghiep';

UPDATE products SET features = '["HVAC chuyên dụng", "Chống thoát gió", "Dán mối nối", "Chuẩn UL"]', specifications = '{"Chiều rộng": "48mm", "Chiều dài": "45m", "Tiêu chuẩn": "UL 181A-P/B-FX", "Ứng dụng": "Hệ thống HVAC"}' WHERE slug = 'bang-keo-nhom-hvac';

UPDATE products SET features = '["Nhiều quy cách", "Tuỳ chỉnh kích thước", "Đặt hàng theo lô", "B2B"]', specifications = '{"Chiều rộng": "25-100mm", "Chiều dài": "Theo yêu cầu", "Chất liệu": "Nhôm nguyên chất", "MOQ": "Theo đơn hàng"}' WHERE slug = 'bang-keo-nhom-variant';

UPDATE products SET features = '["Sản xuất theo yêu cầu", "In logo", "Tuỳ chỉnh kích thước", "OEM"]', specifications = '{"Chiều rộng": "Tuỳ chỉnh", "In ấn": "Logo, thông tin", "MOQ": "5000 cuộn", "Leadtime": "7-15 ngày"}' WHERE slug = 'bang-dinh-san-xuat';

-- === BAO BÌ ĐÓNG GÓI ===
UPDATE products SET features = '["Co giãn 300%", "Chống bụi nước", "Giữ cố định pallet", "Xuất khẩu"]', specifications = '{"Chất liệu": "LLDPE", "Chiều rộng": "500mm", "Chiều dài": "300m/cuộn", "Co giãn": "300%"}' WHERE slug = 'mang-quan-pallet-dong-kien';

UPDATE products SET features = '["LLDPE cao cấp", "Bám dính tốt", "Trong suốt", "Tiết kiệm"]', specifications = '{"Chất liệu": "LLDPE", "Chiều rộng": "500mm", "Độ dày": "17-23 micron", "Ứng dụng": "Quấn pallet"}' WHERE slug = 'mang-quan-pallet';

UPDATE products SET features = '["5 lớp sóng B", "Chịu nén cao", "In flexo", "Xuất khẩu"]', specifications = '{"Số lớp": "5 lớp (sóng B/C)", "Chịu nén": "> 500 kgf", "In ấn": "Flexo 1-4 màu", "Kích thước": "Theo yêu cầu"}' WHERE slug = 'thung-carton-5-lop';

UPDATE products SET features = '["Trong suốt", "Dính tốt", "Không ồn", "Đóng thùng"]', specifications = '{"Chất liệu": "OPP + keo Acrylic", "Chiều rộng": "48mm", "Chiều dài": "100m", "Ứng dụng": "Đóng thùng carton"}' WHERE slug = 'bang-keo-opp';

UPDATE products SET features = '["PE nguyên sinh", "Chống ẩm", "Nhiều kích thước", "Bảo vệ hàng"]', specifications = '{"Chất liệu": "PE nguyên sinh", "Độ dày": "30-100 micron", "Kích thước": "Theo yêu cầu", "Ứng dụng": "Bao gói sản phẩm"}' WHERE slug = 'tui-pe-cong-nghiep';

UPDATE products SET features = '["Chịu tải 1.5 tấn", "Nhựa HDPE", "Chồng xếp được", "Bền 5+ năm"]', specifications = '{"Chất liệu": "HDPE nguyên sinh", "Chịu tải": "1.5 tấn (tĩnh)", "Kích thước": "1200x1000mm", "Tuổi thọ": "5+ năm"}' WHERE slug = 'pallet-nhua-cong-nghiep';

UPDATE products SET features = '["PP bền dai", "Lực kéo 200kgf", "Màu trắng", "Đóng kiện"]', specifications = '{"Chất liệu": "PP", "Bản rộng": "15mm", "Lực kéo": "200 kgf", "Chiều dài": "1000m/cuộn"}' WHERE slug = 'day-dai-pp-dong-hang';

UPDATE products SET features = '["Co nhiệt đều", "Trong suốt", "Bọc sản phẩm", "Thực phẩm"]', specifications = '{"Chất liệu": "POF", "Co nhiệt": "Đều 2 chiều", "Độ dày": "15-25 micron", "Ứng dụng": "Bọc hộp, chai lọ"}' WHERE slug = 'mang-co-pof';

UPDATE products SET features = '["Hút ẩm mạnh", "Bảo vệ hàng hóa", "Giấy Kraft", "Xuất khẩu"]', specifications = '{"Chất liệu": "Giấy Kraft + Silica gel", "Kích thước": "Theo yêu cầu", "Độ hút ẩm": "Cao", "Ứng dụng": "Xuất khẩu đường biển"}' WHERE slug = 'giay-chong-am';

UPDATE products SET features = '["Co nhiệt mạnh", "Bọc block chai", "PE shrink", "Tự động hóa"]', specifications = '{"Chất liệu": "PE", "Co nhiệt": "1 chiều / 2 chiều", "Độ dày": "25-80 micron", "Ứng dụng": "Bọc block chai, lon"}' WHERE slug = 'mang-co-pe-shrink-film';

UPDATE products SET features = '["Nhiều kích thước", "PE trong suốt", "Chống bụi", "Đa năng"]', specifications = '{"Chất liệu": "PE", "Kích thước": "Nhiều size", "Độ dày": "30-80 micron", "Đóng gói": "100 cái/túi"}' WHERE slug = 'tui-pe-nhieu-kich-thuoc';

UPDATE products SET features = '["Khóa Zip tiện lợi", "Tái sử dụng", "Chống ẩm", "Nhiều size"]', specifications = '{"Chất liệu": "PE trong suốt", "Khóa": "Zip lock", "Kích thước": "Nhiều size", "Đóng gói": "100 cái/túi"}' WHERE slug = 'tui-ziper-nhieu-kich-thuoc';

-- === PHÒNG SẠCH ===
UPDATE products SET features = '["Không bột", "Class 1000", "Chống hóa chất", "Dùng 1 lần"]', specifications = '{"Chất liệu": "Nitrile", "Tiêu chuẩn": "Class 1000", "Chiều dài": "9 inch", "Đóng gói": "100 đôi/hộp"}' WHERE slug = 'gang-tay-nitrile-class-1000';

UPDATE products SET features = '["Y tế & Spa", "Không bột", "Co giãn tốt", "Nhạy xúc giác"]', specifications = '{"Chất liệu": "Nitrile", "Ứng dụng": "Y tế, Spa, thẩm mỹ", "Chiều dài": "9 inch", "Đóng gói": "100 đôi/hộp"}' WHERE slug = 'gang-tay-nitrile-y-te-spa';

UPDATE products SET features = '["Giữ bụi 99.9%", "30 lớp PE", "Nhiều kích thước", "Phòng sạch"]', specifications = '{"Chất liệu": "PE phủ keo Acrylic", "Số lớp": "30 lớp/tấm", "Kích thước": "Nhiều size", "Màu sắc": "Trắng / Xanh"}' WHERE slug = 'tham-phong-sach';

UPDATE products SET features = '["Không xơ sợi", "ISO Class 5", "Thấm hút tốt", "Phòng sạch"]', specifications = '{"Chất liệu": "Polyester / Microfiber", "Tiêu chuẩn": "ISO Class 5-7", "Kích thước": "9x9 inch", "Đóng gói": "100 tờ/túi"}' WHERE slug = 'khan-lau-phong-sach-wiper';

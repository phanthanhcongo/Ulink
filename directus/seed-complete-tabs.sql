-- ============================================================
-- SEED: Industries (Ứng dụng) cho sản phẩm thiếu
-- Industries: 75=Nội thất, 76=Kho&Logistics, 77=Dược phẩm, 78=Thực phẩm, 79=Cơ khí&HVAC, 80=Điện tử
-- ============================================================

-- bang-keo-nhom-variant (389) - 0 industries
INSERT INTO products_industries (products_id, industries_id) VALUES (389, 79), (389, 75) ON CONFLICT DO NOTHING;
-- bang-dinh-san-xuat (390) - 0 industries
INSERT INTO products_industries (products_id, industries_id) VALUES (390, 76), (390, 78) ON CONFLICT DO NOTHING;

-- Add more industries to products that only have 1
-- bang-keo-nhom-bao-on-96mm (379) has only 79
INSERT INTO products_industries (products_id, industries_id) VALUES (379, 75) ON CONFLICT DO NOTHING;
-- bang-keo-nhom-hvac-duct (382) has only 79
INSERT INTO products_industries (products_id, industries_id) VALUES (382, 75) ON CONFLICT DO NOTHING;
-- bang-keo-nhom-ma-kem (385) has only 79
INSERT INTO products_industries (products_id, industries_id) VALUES (385, 75) ON CONFLICT DO NOTHING;
-- bang-keo-nhom-hvac (388) has only 79
INSERT INTO products_industries (products_id, industries_id) VALUES (388, 75) ON CONFLICT DO NOTHING;
-- mang-quan-pallet-dong-kien (391) has only 76
INSERT INTO products_industries (products_id, industries_id) VALUES (391, 78) ON CONFLICT DO NOTHING;
-- bang-keo-opp (394) has only 76
INSERT INTO products_industries (products_id, industries_id) VALUES (394, 78) ON CONFLICT DO NOTHING;
-- day-dai-pp-dong-hang (397) has only 76
INSERT INTO products_industries (products_id, industries_id) VALUES (397, 75) ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED: Standards (Chứng nhận) cho sản phẩm thiếu
-- Standards: 110=ISO9001, 111=UL723, 112=ASTM D3359, 113=ISO22000, 114=ISTA3A, 115=RoHS, 116=ISO14644, 117=IEC61340, 118=EN ISO 374
-- ============================================================

-- Băng keo nhôm chưa có standards
-- 379 bang-keo-nhom-bao-on-96mm
INSERT INTO products_standards (products_id, standards_id) VALUES (379, 110) ON CONFLICT DO NOTHING;
-- 382 bang-keo-nhom-hvac-duct
INSERT INTO products_standards (products_id, standards_id) VALUES (382, 110) ON CONFLICT DO NOTHING;
-- 383 bang-keo-nhom-cach-nhiet
INSERT INTO products_standards (products_id, standards_id) VALUES (383, 110) ON CONFLICT DO NOTHING;
-- 385 bang-keo-nhom-ma-kem
INSERT INTO products_standards (products_id, standards_id) VALUES (385, 110), (385, 112) ON CONFLICT DO NOTHING;
-- 386 bang-keo-nhom-tu-dinh
INSERT INTO products_standards (products_id, standards_id) VALUES (386, 110) ON CONFLICT DO NOTHING;
-- 387 bang-keo-nhom-cong-nghiep
INSERT INTO products_standards (products_id, standards_id) VALUES (387, 110) ON CONFLICT DO NOTHING;
-- 388 bang-keo-nhom-hvac
INSERT INTO products_standards (products_id, standards_id) VALUES (388, 110) ON CONFLICT DO NOTHING;
-- 389 bang-keo-nhom-variant
INSERT INTO products_standards (products_id, standards_id) VALUES (389, 110) ON CONFLICT DO NOTHING;

-- Bao bì đóng gói chưa có standards
-- 390 bang-dinh-san-xuat
INSERT INTO products_standards (products_id, standards_id) VALUES (390, 110) ON CONFLICT DO NOTHING;
-- 391 mang-quan-pallet-dong-kien
INSERT INTO products_standards (products_id, standards_id) VALUES (391, 114) ON CONFLICT DO NOTHING;
-- 394 bang-keo-opp
INSERT INTO products_standards (products_id, standards_id) VALUES (394, 110) ON CONFLICT DO NOTHING;
-- 397 day-dai-pp-dong-hang
INSERT INTO products_standards (products_id, standards_id) VALUES (397, 110), (397, 114) ON CONFLICT DO NOTHING;
-- 399 giay-chong-am
INSERT INTO products_standards (products_id, standards_id) VALUES (399, 110) ON CONFLICT DO NOTHING;

-- Phòng sạch - thêm standards cho sản phẩm chỉ có 1
-- 404 gang-tay-nitrile-y-te-spa - has 118, add 116
INSERT INTO products_standards (products_id, standards_id) VALUES (404, 116) ON CONFLICT DO NOTHING;

-- ============================================================
-- CREATE: product_reviews table
-- ============================================================
CREATE TABLE IF NOT EXISTS product_reviews (
  id serial PRIMARY KEY,
  status varchar(20) DEFAULT 'published',
  product integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  reviewer_name varchar(255) NOT NULL,
  reviewer_company varchar(255),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title varchar(255),
  content text NOT NULL,
  is_verified boolean DEFAULT false,
  date_created timestamp with time zone DEFAULT now(),
  date_updated timestamp with time zone DEFAULT now()
);

-- ============================================================
-- SEED: Reviews (Đánh giá) - 2-3 reviews per product
-- ============================================================

-- Băng keo nhôm HVAC (376-389)
INSERT INTO product_reviews (product, reviewer_name, reviewer_company, rating, title, content, is_verified, date_created) VALUES
(376, 'Nguyễn Văn Hùng', 'Cơ điện lạnh Đại Phát', 5, 'Chất lượng tốt, bám dính chắc', 'Dùng cho hệ thống ống gió tòa nhà văn phòng, keo bám rất chặt, không bị bong sau 6 tháng sử dụng. Sẽ tiếp tục đặt hàng.', true, '2025-08-15'),
(376, 'Trần Thị Mai', 'HVAC Solutions VN', 4, 'Đúng quy cách, giao nhanh', 'Sản phẩm đúng như mô tả, giao hàng nhanh trong 2 ngày. Chất lượng keo ổn định.', true, '2025-09-01'),
(377, 'Lê Minh Tuấn', 'Nhiệt điện Phả Lại', 5, 'Chịu nhiệt rất tốt', 'Dùng cho ống khói lò hơi, chịu nhiệt 150°C không bong tróc. Sản phẩm chất lượng cao.', true, '2025-07-20'),
(377, 'Phạm Quốc Bảo', 'Thép Hòa Phát', 4, 'Phù hợp môi trường công nghiệp', 'Băng keo bám tốt trên bề mặt ống thép, không bị cháy khi tiếp xúc nhiệt cao.', true, '2025-08-10'),
(378, 'Đỗ Thanh Sơn', 'M&E Contractor', 5, 'Sợi thủy tinh gia cường rất bền', 'Dùng bọc bảo ôn đường ống lạnh, không bị rách khi kéo căng. Độ bền vượt trội so với loại thường.', true, '2025-06-25'),
(378, 'Võ Hoàng Nam', 'Xây dựng Coteccons', 4, 'Thi công dễ, giá hợp lý', 'Nhân công phản hồi dễ thi công, keo dính tốt ngay lần dán đầu. Giá cả cạnh tranh.', false, '2025-07-15'),
(379, 'Hoàng Đức Mạnh', 'Điện lạnh Carrier VN', 5, 'Rộng 96mm rất tiện', 'Kích thước rộng giúp giảm số lần dán, tiết kiệm thời gian thi công. Chất lượng nhôm tốt.', true, '2025-08-20'),
(380, 'Nguyễn Hải Đăng', 'Daikin VN', 5, 'Hàng 3M chính hãng', 'Đặt 3M 425 qua ULink, hàng chính hãng có tem nhãn đầy đủ. Chất lượng không có gì phải bàn.', true, '2025-09-05'),
(380, 'Lý Thanh Tùng', 'Samsung Engineering', 4, 'Đạt chuẩn UL 723', 'Sử dụng cho dự án yêu cầu PCCC nghiêm ngặt. Có giấy chứng nhận UL 723 đi kèm.', true, '2025-08-28'),
(381, 'Trương Văn Phúc', 'Panasonic VN', 4, 'Hàng Nitto chất lượng Nhật', 'Sợi thủy tinh gia cố rất chắc chắn, phù hợp cho các dự án cần tiêu chuẩn cao.', true, '2025-07-10'),
(382, 'Bùi Quang Huy', 'Ống gió Đại Việt', 5, 'Chuyên dụng cho duct', 'Dùng cho ống gió HVAC Duct, bám dính mối nối rất tốt, chống rò rỉ khí hiệu quả.', true, '2025-08-05'),
(383, 'Phan Văn Long', 'Xây dựng Hòa Bình', 4, 'Cách nhiệt hiệu quả', 'Dán trên mái tôn nhà xưởng, giảm nhiệt đáng kể. Keo không chảy dù trời nóng 40°C.', true, '2025-06-30'),
(384, 'Lê Thị Hương', 'PCCC Thành Phố', 5, 'Đạt chuẩn chống cháy', 'Sản phẩm đạt UL 723, yên tâm sử dụng trong khu vực có yêu cầu PCCC. Rất chuyên nghiệp.', true, '2025-09-10'),
(384, 'Ngô Quốc Cường', 'KCN Biên Hòa', 4, 'Hàng tốt cho nhà máy', 'Dùng trong khu vực sản xuất có nguy cơ cháy, an toàn và bám dính tốt.', false, '2025-08-18'),
(385, 'Đinh Văn Thắng', 'Đóng tàu Vinashin', 5, 'Chống ăn mòn rất tốt', 'Dùng cho công trình ven biển, sau 8 tháng không bị gỉ sét hay bong tróc.', true, '2025-07-25'),
(386, 'Vũ Thị Lan', 'Nội thất Xuân Hòa', 4, 'Dùng tiện lợi', 'Tự dính, không cần gia nhiệt, nhân viên thi công nhanh hơn. Bám tốt trên gỗ và nhôm.', true, '2025-08-12'),
(387, 'Trần Quốc Việt', 'Cơ khí Trường Hải', 5, 'Đa dụng, bền bỉ', 'Dùng cho nhiều ứng dụng trong nhà máy: bọc ống, che mối hàn, bảo vệ bề mặt. Rất hài lòng.', true, '2025-09-02'),
(388, 'Nguyễn Minh Đức', 'Tổng thầu MEP', 4, 'Sản xuất theo yêu cầu tốt', 'Đặt hàng kích thước đặc biệt 75mm, ULink sản xuất đúng spec và giao đúng hạn.', true, '2025-08-25'),
(389, 'Phạm Thị Ngọc', 'Điện lạnh Midea VN', 4, 'Nhiều quy cách lựa chọn', 'Có thể chọn nhiều quy cách khác nhau, phù hợp cho dự án cần nhiều loại kích thước.', true, '2025-07-30');

-- Bao bì đóng gói (390-402)
INSERT INTO product_reviews (product, reviewer_name, reviewer_company, rating, title, content, is_verified, date_created) VALUES
(390, 'Hoàng Văn Tâm', 'Đóng gói Sài Gòn', 4, 'In logo đẹp, giá tốt', 'Đặt băng dính in logo công ty, màu sắc rõ nét, keo bám tốt. Giá cạnh tranh so với thị trường.', true, '2025-08-08'),
(390, 'Lê Thị Thúy', 'Thực phẩm Acecook', 5, 'Phù hợp cho dây chuyền tự động', 'Băng dính chạy được trên máy dán thùng tự động, không bị kẹt hay đứt giữa chừng.', true, '2025-09-12'),
(391, 'Đặng Quốc Anh', 'Logistics TBS', 5, 'Bảo vệ hàng hóa tốt', 'Quấn pallet xuất khẩu đường biển, hàng đến nơi nguyên vẹn. Màng co giãn tốt, bọc chặt.', true, '2025-07-18'),
(391, 'Trần Văn Đạt', 'Kho vận Gemadept', 4, 'Dùng cho máy quấn tự động OK', 'Chạy trên máy quấn pallet tự động không vấn đề gì. Màng đều, không bị thủng.', true, '2025-08-22'),
(392, 'Nguyễn Thị Hồng', 'Nội thất IKEA VN', 4, 'Nhiều quy cách, đặt nhanh', 'Đặt 3 loại độ dày khác nhau cho các mục đích khác nhau. ULink tư vấn và giao hàng nhanh.', true, '2025-06-20'),
(393, 'Phạm Văn Khoa', 'Thực phẩm CJ', 5, 'Thùng chắc chắn, in đẹp', 'Thùng carton 5 lớp in offset 4 màu, hình ảnh sắc nét. Chịu lực tốt cho hàng 20kg.', true, '2025-08-30'),
(393, 'Lý Thị Mỹ Duyên', 'Dược phẩm Domesco', 4, 'Đạt chuẩn xuất khẩu', 'Thùng carton đạt chuẩn ISTA 3A, khách hàng nước ngoài chấp nhận. In mã vạch rõ ràng.', true, '2025-09-08'),
(394, 'Bùi Hữu Phước', 'Kho hàng Lazada', 5, 'Giá rẻ, dùng tốt', 'Đặt số lượng lớn cho kho hàng, giá tốt hơn 15% so với nhà cung cấp cũ. Keo bám tốt.', true, '2025-07-28'),
(395, 'Hoàng Thị Kim', 'May mặc Việt Tiến', 4, 'Túi PE chống ẩm tốt', 'Đóng gói quần áo xuất khẩu, túi PE bảo vệ sản phẩm khỏi ẩm mốc trong container.', true, '2025-08-15'),
(395, 'Ngô Văn Dũng', 'Linh kiện Honda VN', 5, 'Chất lượng ổn định', 'Đặt hàng hàng tháng, chất lượng túi PE luôn đồng đều. Đóng gói linh kiện rất an toàn.', true, '2025-09-01'),
(396, 'Trương Minh Quân', 'Kho hàng Amazon VN', 5, 'Pallet bền, chịu lực tốt', 'Pallet nhựa HDPE chịu được 1.5 tấn, dùng với xe nâng không vấn đề. Không cần xông trùng khi xuất khẩu.', true, '2025-08-20'),
(397, 'Lê Văn Sĩ', 'VLXD Hòa Phát', 4, 'Dây đai chắc, máy đóng mượt', 'Dây đai PP chạy trên máy đóng đai bán tự động rất mượt. Độ bền kéo tốt cho thùng 30kg.', true, '2025-07-12'),
(398, 'Đỗ Thị Hạnh', 'Mỹ phẩm LG Vina', 5, 'Màng co đẹp, đạt chuẩn FDA', 'Bọc co hộp mỹ phẩm, trong suốt, bóng đẹp, không có mùi. Đạt FDA cho thực phẩm/mỹ phẩm.', true, '2025-09-05'),
(398, 'Phạm Hoàng Anh', 'Sách Nhã Nam', 4, 'Bọc sách đẹp, không co méo', 'Dùng bọc co cho bìa sách, co đều không làm cong sách. Nhiệt độ co thấp, an toàn.', false, '2025-08-18'),
(399, 'Vũ Quốc Tuấn', 'Xuất khẩu Hải Phong', 5, 'Chống ẩm hiệu quả', 'Lót thùng carton xuất khẩu đường biển 45 ngày, hàng điện tử không bị ẩm mốc. Rất an tâm.', true, '2025-06-28'),
(400, 'Nguyễn Thị Lan Anh', 'Coca-Cola VN', 4, 'Block chai chắc chắn', 'Màng co PE block 24 chai nước, co chặt, vận chuyển không bị xổ chai. Phù hợp dây chuyền tự động.', true, '2025-08-10'),
(401, 'Trần Minh Hiếu', 'Điện tử Samsung VN', 4, 'Nhiều kích thước, đặt nhanh', 'Đặt 5 kích thước khác nhau, ULink sản xuất và giao trong 5 ngày. Chất lượng đồng đều.', true, '2025-07-22'),
(402, 'Lê Thị Ngân', 'Gia vị Dh Foods', 5, 'Túi Zipper tiện lợi', 'Đóng gói gia vị bằng túi Zipper, khách hàng phản hồi dễ sử dụng, giữ được hương vị.', true, '2025-09-15'),
(402, 'Hoàng Văn Bình', 'Linh kiện Foxconn VN', 4, 'Chống tĩnh điện tốt', 'Túi Zipper dùng đựng linh kiện nhỏ, chống bụi bẩn hiệu quả. Khóa kéo chắc chắn.', true, '2025-08-25');

-- Phòng sạch (403-406)
INSERT INTO product_reviews (product, reviewer_name, reviewer_company, rating, title, content, is_verified, date_created) VALUES
(403, 'Phan Minh Trí', 'Intel Products VN', 5, 'Đạt chuẩn Class 1000', 'Găng tay Nitrile không bột, đạt ISO 14644-1 Class 6. Sử dụng trong phòng sạch sản xuất chip. Chất lượng ổn định qua nhiều lô hàng.', true, '2025-08-02'),
(403, 'Đặng Thị Hà', 'Amkor Technology VN', 5, 'Không gây dị ứng', 'Nhân viên phòng sạch dùng cả ngày không bị kích ứng da. Độ đàn hồi tốt, ôm sát tay.', true, '2025-09-10'),
(403, 'Lê Quốc Hưng', 'Robert Bosch VN', 4, 'Giao nhanh, có sẵn kho', 'Đặt gấp 50 thùng, ULink giao trong 24h. Chất lượng đúng như mẫu thử ban đầu.', true, '2025-07-28'),
(404, 'Nguyễn Thị Thanh', 'BV Chợ Rẫy', 5, 'An toàn cho y tế', 'Găng tay Nitrile dùng cho phẫu thuật và xét nghiệm, đạt chuẩn EN ISO 374. Không bột, an toàn.', true, '2025-08-15'),
(404, 'Trần Văn Khải', 'Spa & Clinic Đông Á', 4, 'Mềm mại, ôm tay', 'Nhân viên spa phản hồi tích cực, găng tay mềm mại, dễ thao tác khi massage và chăm sóc da.', true, '2025-09-08'),
(405, 'Võ Thị Bích', 'Dược phẩm Sanofi VN', 5, 'Bắt bụi rất hiệu quả', 'Thảm phòng sạch 30 lớp, đặt ở cửa ra vào khu sản xuất. Giảm hạt bụi đáng kể, đo bằng máy particle counter.', true, '2025-07-10'),
(405, 'Phạm Đức Trung', 'Texas Instruments VN', 4, 'Đúng kích thước, bám sàn tốt', 'Thảm bám sàn chắc, không bị trượt. Bóc lớp dễ dàng, mỗi lớp đều dính bụi tốt.', true, '2025-08-30'),
(406, 'Hoàng Minh Châu', 'LG Display VN', 5, 'Không xơ, lau sạch', 'Khăn Wiper lau kính quang học và bề mặt LCD, không để lại xơ vải. Đóng gói chân không sạch sẽ.', true, '2025-09-12'),
(406, 'Lê Thị Phương', 'Nidec VN', 4, 'Hấp thụ dung môi tốt', 'Dùng lau IPA và acetone trong phòng sạch, hấp thụ nhanh, không để lại cặn. Giá hợp lý so với hàng nhập.', true, '2025-08-05');

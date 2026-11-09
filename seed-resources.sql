-- ====================================================================
-- ULink B2B Platform: Full Seed Data for Resources Page
-- 6 Complete Categories: guide, standard, case-study, market-news, news, event
-- Generated: 2026-11-09T17:07:42.426Z
-- ====================================================================

BEGIN;

-- 1. Ensure schema / tables & columns exist
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id SERIAL PRIMARY KEY,
    status character varying(255) DEFAULT 'draft'::character varying,
    title character varying(255),
    slug character varying(255) UNIQUE,
    body text,
    cover text,
    author character varying(255),
    published_at timestamp with time zone,
    meta_title character varying(255),
    meta_description text,
    category character varying(255) DEFAULT NULL::character varying,
    author_role character varying(255) DEFAULT NULL::character varying,
    author_avatar character varying(255),
    description text,
    is_featured boolean DEFAULT false,
    industry integer,
    badge character varying(255)
);
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category character varying(255);
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_role character varying(255);
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_avatar character varying(255);
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS industry integer;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS badge character varying(255);
CREATE TABLE IF NOT EXISTS public.blog_posts_translations (
    id SERIAL PRIMARY KEY,
    blog_posts_id integer REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    languages_code character varying(255),
    title character varying(255),
    body text,
    meta_title character varying(255),
    meta_description text,
    description text,
    badge character varying(255)
);
ALTER TABLE public.blog_posts_translations ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.blog_posts_translations ADD COLUMN IF NOT EXISTS badge character varying(255);
CREATE TABLE IF NOT EXISTS public.events (
    id SERIAL PRIMARY KEY,
    status character varying(255) DEFAULT 'draft'::character varying,
    slug character varying(255) UNIQUE,
    title character varying(255),
    summary text,
    image character varying(255),
    date character varying(255),
    "time" character varying(255),
    start_time character varying(50),
    end_time character varying(50),
    location character varying(255),
    location_name character varying(255),
    address text,
    registration_status character varying(50) DEFAULT 'UPCOMING'::character varying,
    price character varying(100),
    overview text,
    highlights jsonb DEFAULT '[]'::jsonb,
    agenda jsonb DEFAULT '[]'::jsonb,
    speakers jsonb DEFAULT '[]'::jsonb,
    hosts jsonb DEFAULT '[]'::jsonb,
    sponsors jsonb DEFAULT '[]'::jsonb,
    benefits jsonb DEFAULT '[]'::jsonb,
    organizer_name character varying(255),
    organizer_description text,
    organizer_contact character varying(255),
    organizer_logo character varying(255),
    date_created timestamp with time zone DEFAULT now(),
    date_updated timestamp with time zone DEFAULT now(),
    organizer_role character varying(255) DEFAULT NULL::character varying
);
CREATE TABLE IF NOT EXISTS public.events_translations (
    id SERIAL PRIMARY KEY,
    events_id integer REFERENCES public.events(id) ON DELETE CASCADE,
    languages_code character varying(255),
    title character varying(255),
    summary text,
    overview text,
    location_name character varying(255),
    address text,
    price character varying(100),
    organizer_description text,
    organizer_role character varying(255),
    agenda jsonb,
    speakers jsonb,
    hosts jsonb,
    benefits jsonb,
    highlights jsonb,
    organizer_name text
);

-- 2. Clean & Seed 38 high-quality articles across 6 categories
-- Guides: 6, Standards: 6, Case Studies: 9, Market News: 6, News: 9, Events: 5


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'guide-esd-control-smt', 'Hướng dẫn kiểm soát phóng tĩnh điện (ESD) trong dây chuyền sản xuất SMT', 'Quy trình toàn diện về tiếp địa phòng sạch, kiểm soát độ ẩm và lựa chọn găng tay, nhíp gắp, thảm bàn thao tác đạt chuẩn ANSI/ESD S20.20.', '/images/resources/autohtml/thumb1.png',
    'Kỹ sư Đỗ Minh Tuấn', 'Chuyên gia ESD S20.20', '/images/about/op-team.webp',
    'Hướng dẫn kỹ thuật', 'Cẩm nang kỹ thuật', '2026-02-14T17:00:00.000Z'::timestamptz,
    'published', 'Hướng dẫn kiểm soát phóng tĩnh điện (ESD) trong dây chuyền sản xuất SMT', 'Quy trình toàn diện về tiếp địa phòng sạch, kiểm soát độ ẩm và lựa chọn găng tay, nhíp gắp, thảm bàn thao tác đạt chuẩn ANSI/ESD S20.20.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Hướng dẫn kiểm soát phóng tĩnh điện (ESD) trong dây chuyền sản xuất SMT', 'Quy trình toàn diện về tiếp địa phòng sạch, kiểm soát độ ẩm và lựa chọn găng tay, nhíp gắp, thảm bàn thao tác đạt chuẩn ANSI/ESD S20.20.', '<p>Quy trình toàn diện về tiếp địa phòng sạch, kiểm soát độ ẩm và lựa chọn găng tay, nhíp gắp, thảm bàn thao tác đạt chuẩn ANSI/ESD S20.20.</p>
<h2>1. Rủi ro tĩnh điện trong sản xuất vi mạch bán dẫn</h2>
<p>Sự phóng điện tĩnh dù chỉ vài chục Volt cũng có thể phá hủy cấu trúc cổng silicon của vi xử lý.</p>
<p>Thiệt hại do ESD thường không phát hiện được bằng mắt thường mà tạo ra các lỗi tiềm ẩn (latent defects) làm suy giảm tuổi thọ linh kiện.</p>
<h2>2. Các biện pháp bảo vệ và tiếp địa hiệu quả</h2>
<p>Sử dụng thảm trải bàn cao su chống tĩnh điện 2 lớp với điện trở bề mặt 10^6 - 10^9 Ohm.</p>
<p>Mỗi vị trí thao tác phải trang bị dây đeo cổ tay tiếp đất liên tục có tích hợp điện trở an toàn 1 MegaOhm.</p>
<blockquote>Khuyến nghị: Kiểm tra định kỳ độ ẩm nhà xưởng trong khoảng 45% - 60% RH để giảm thiểu ma sát tạo điện thế.</blockquote>', 'Cẩm nang kỹ thuật', 'Hướng dẫn kiểm soát phóng tĩnh điện (ESD) trong dây chuyền sản xuất SMT', 'Quy trình toàn diện về tiếp địa phòng sạch, kiểm soát độ ẩm và lựa chọn găng tay, nhíp gắp, thảm bàn thao tác đạt chuẩn ANSI/ESD S20.20.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Guide to Electrostatic Discharge (ESD) Control in SMT Assembly Lines', 'Comprehensive procedure for cleanroom grounding, humidity control, and selection of ESD-safe gloves, tweezers, and matting under ANSI/ESD S20.20.', '<p>Comprehensive procedure for cleanroom grounding, humidity control, and selection of ESD-safe gloves, tweezers, and matting under ANSI/ESD S20.20.</p>
<h2>1. Electrostatic Risks in Semiconductor Manufacturing</h2>
<p>Electrostatic discharge of just tens of volts can destroy microchip silicon gate structures.</p>
<p>ESD damages often remain invisible to optical inspection, creating latent defects that degrade product lifespan.</p>
<h2>2. Protection Measures and Grounding Best Practices</h2>
<p>Use 2-layer ESD rubber table mats with surface resistivity of 10^6 - 10^9 Ohms.</p>
<p>Each workstation must feature continuous grounding wrist straps with integrated 1 MegaOhm safety resistors.</p>
<blockquote>Recommendation: Maintain plant humidity at 45% - 60% RH to minimize friction charges.</blockquote>', 'Technical Guide', 'Guide to Electrostatic Discharge (ESD) Control in SMT Assembly Lines', 'Comprehensive procedure for cleanroom grounding, humidity control, and selection of ESD-safe gloves, tweezers, and matting under ANSI/ESD S20.20.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'SMT実装ラインにおける静電気放電（ESD）管理ガイド', 'ANSI/ESD S20.20規格に基づくクリーンルーム接地、湿度管理、ESD対応手袋・ピンセット・作業マットの選定ガイド。', '<p>ANSI/ESD S20.20規格に基づくクリーンルーム接地、湿度管理、ESD対応手袋・ピンセット・作業マットの選定ガイド。</p>
<h2>1. 半導体製造における静電気リスク</h2>
<p>わずか数十ボルトの静電気放電でもマイクロチップのシリコンゲート構造を破壊する可能性があります。</p>
<h2>2. 保護対策と効果的な接地手法</h2>
<p>表面抵抗率10^6〜10^9オームの2層ESDゴムマットを使用し、各作業台に1メグオーム抵抗内蔵のリストストラップを装備します。</p>
<blockquote>推奨：摩擦帯電を最小限に抑えるため、工場内の湿度を45%〜60% RHに維持してください。</blockquote>', '技術ガイド', 'SMT実装ラインにおける静電気放電（ESD）管理ガイド', 'ANSI/ESD S20.20規格に基づくクリーンルーム接地、湿度管理、ESD対応手袋・ピンセット・作業マットの選定ガイド。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'guide-fragile-packaging-export', 'Cẩm nang đóng gói hàng dễ vỡ xuất khẩu đường biển & hàng không', 'Kỹ thuật chèn lót túi khí chèn hàng (dunnage air bag), màng xốp khí bóng khí và cố định kiện pallet chịu tải gia tốc rung lắc đường dài.', '/images/resources/autohtml/thumb6.png',
    'ULINK Packaging Lab', 'Bộ phận Nghiên cứu Đóng gói', '/images/about/op-team.webp',
    'Hướng dẫn kỹ thuật', 'Cẩm nang kỹ thuật', '2026-02-09T17:00:00.000Z'::timestamptz,
    'published', 'Cẩm nang đóng gói hàng dễ vỡ xuất khẩu đường biển & hàng không', 'Kỹ thuật chèn lót túi khí chèn hàng (dunnage air bag), màng xốp khí bóng khí và cố định kiện pallet chịu tải gia tốc rung lắc đường dài.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Cẩm nang đóng gói hàng dễ vỡ xuất khẩu đường biển & hàng không', 'Kỹ thuật chèn lót túi khí chèn hàng (dunnage air bag), màng xốp khí bóng khí và cố định kiện pallet chịu tải gia tốc rung lắc đường dài.', '<p>Kỹ thuật chèn lót túi khí chèn hàng (dunnage air bag), màng xốp khí bóng khí và cố định kiện pallet chịu tải gia tốc rung lắc đường dài.</p>', 'Cẩm nang kỹ thuật', 'Cẩm nang đóng gói hàng dễ vỡ xuất khẩu đường biển & hàng không', 'Kỹ thuật chèn lót túi khí chèn hàng (dunnage air bag), màng xốp khí bóng khí và cố định kiện pallet chịu tải gia tốc rung lắc đường dài.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Handbook for Fragile Goods Packaging in Ocean & Air Freight', 'Techniques for dunnage air bags, air bubble cushioning, and pallet securing to withstand long-haul transit vibration and acceleration.', '<p>Techniques for dunnage air bags, air bubble cushioning, and pallet securing to withstand long-haul transit vibration and acceleration.</p>', 'Technical Guide', 'Handbook for Fragile Goods Packaging in Ocean & Air Freight', 'Techniques for dunnage air bags, air bubble cushioning, and pallet securing to withstand long-haul transit vibration and acceleration.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '海上・航空貨物における壊れやすい製品の梱包ハンドブック', '長距離輸送の振動や衝撃に耐えるダンネージエアバッグ、気泡緩衝材、パレット固定技術。', '<p>長距離輸送の振動や衝撃に耐えるダンネージエアバッグ、気泡緩衝材、パレット固定技術。</p>', '技術ガイド', '海上・航空貨物における壊れやすい製品の梱包ハンドブック', '長距離輸送の振動や衝撃に耐えるダンネージエアバッグ、気泡緩衝材、パレット固定技術。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'guide-cleanroom-maintenance-iso14644', 'Quy trình kiểm định và bảo trì phòng sạch định kỳ theo tiêu chuẩn ISO 14644', 'Hướng dẫn chi tiết phương pháp đếm hạt bụi vi mô, kiểm tra chênh áp màng lọc HEPA/ULPA và quy chuẩn thay thế định kỳ phụ kiện lọc khí.', '/images/resources/autohtml/thumb0.png',
    'Kỹ sư Hoàng Hải', 'Trưởng nhóm Kiểm định Phòng sạch', '/images/about/op-team.webp',
    'Hướng dẫn kỹ thuật', 'Cẩm nang kỹ thuật', '2026-01-27T17:00:00.000Z'::timestamptz,
    'published', 'Quy trình kiểm định và bảo trì phòng sạch định kỳ theo tiêu chuẩn ISO 14644', 'Hướng dẫn chi tiết phương pháp đếm hạt bụi vi mô, kiểm tra chênh áp màng lọc HEPA/ULPA và quy chuẩn thay thế định kỳ phụ kiện lọc khí.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Quy trình kiểm định và bảo trì phòng sạch định kỳ theo tiêu chuẩn ISO 14644', 'Hướng dẫn chi tiết phương pháp đếm hạt bụi vi mô, kiểm tra chênh áp màng lọc HEPA/ULPA và quy chuẩn thay thế định kỳ phụ kiện lọc khí.', '<p>Hướng dẫn chi tiết phương pháp đếm hạt bụi vi mô, kiểm tra chênh áp màng lọc HEPA/ULPA và quy chuẩn thay thế định kỳ phụ kiện lọc khí.</p>', 'Cẩm nang kỹ thuật', 'Quy trình kiểm định và bảo trì phòng sạch định kỳ theo tiêu chuẩn ISO 14644', 'Hướng dẫn chi tiết phương pháp đếm hạt bụi vi mô, kiểm tra chênh áp màng lọc HEPA/ULPA và quy chuẩn thay thế định kỳ phụ kiện lọc khí.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Periodic Cleanroom Inspection & Maintenance Protocol per ISO 14644', 'Detailed guidance on particle counter testing, HEPA/ULPA filter pressure drop checks, and scheduled filter replacement intervals.', '<p>Detailed guidance on particle counter testing, HEPA/ULPA filter pressure drop checks, and scheduled filter replacement intervals.</p>', 'Technical Guide', 'Periodic Cleanroom Inspection & Maintenance Protocol per ISO 14644', 'Detailed guidance on particle counter testing, HEPA/ULPA filter pressure drop checks, and scheduled filter replacement intervals.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'ISO 14644規格に基づくクリーンルーム定期点検・保守手順', '微粒子カウンターによる測定法、HEPA/ULPAフィルターの差圧測定、定期的なフィルター交換基準の詳細解説。', '<p>微粒子カウンターによる測定法、HEPA/ULPAフィルターの差圧測定、定期的なフィルター交換基準の詳細解説。</p>', '技術ガイド', 'ISO 14644規格に基づくクリーンルーム定期点検・保守手順', '微粒子カウンターによる測定法、HEPA/ULPAフィルターの差圧測定、定期的なフィルター交換基準の詳細解説。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'guide-adhesive-tape-selection-hvac', 'Lựa chọn băng keo kỹ thuật dán bảo ôn đường ống HVAC chịu nhiệt', 'So sánh băng keo nhôm nguyên chất, băng keo nhôm sợi thủy tinh FSK và băng dính xốp PE chống đọng sương bề mặt đường ống gió.', '/images/resources/autohtml/thumb2.png',
    'ULINK Technical Advisory', 'Kỹ sư Vật liệu Kỹ thuật', '/images/about/op-team.webp',
    'Hướng dẫn kỹ thuật', 'Cẩm nang kỹ thuật', '2026-01-19T17:00:00.000Z'::timestamptz,
    'published', 'Lựa chọn băng keo kỹ thuật dán bảo ôn đường ống HVAC chịu nhiệt', 'So sánh băng keo nhôm nguyên chất, băng keo nhôm sợi thủy tinh FSK và băng dính xốp PE chống đọng sương bề mặt đường ống gió.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Lựa chọn băng keo kỹ thuật dán bảo ôn đường ống HVAC chịu nhiệt', 'So sánh băng keo nhôm nguyên chất, băng keo nhôm sợi thủy tinh FSK và băng dính xốp PE chống đọng sương bề mặt đường ống gió.', '<p>So sánh băng keo nhôm nguyên chất, băng keo nhôm sợi thủy tinh FSK và băng dính xốp PE chống đọng sương bề mặt đường ống gió.</p>', 'Cẩm nang kỹ thuật', 'Lựa chọn băng keo kỹ thuật dán bảo ôn đường ống HVAC chịu nhiệt', 'So sánh băng keo nhôm nguyên chất, băng keo nhôm sợi thủy tinh FSK và băng dính xốp PE chống đọng sương bề mặt đường ống gió.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Selecting High-Temperature Technical Tapes for HVAC Insulation Ducts', 'Comparing pure aluminum foil tape, fiberglass-reinforced FSK tape, and PE foam tape for duct condensation prevention.', '<p>Comparing pure aluminum foil tape, fiberglass-reinforced FSK tape, and PE foam tape for duct condensation prevention.</p>', 'Technical Guide', 'Selecting High-Temperature Technical Tapes for HVAC Insulation Ducts', 'Comparing pure aluminum foil tape, fiberglass-reinforced FSK tape, and PE foam tape for duct condensation prevention.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'HVAC配管断熱用耐熱テープの選定ガイド', '純アルミテープ、グラスファイバー補強FSKテープ、ダクト結露防止用PEフォームテープの比較検証。', '<p>純アルミテープ、グラスファイバー補強FSKテープ、ダクト結露防止用PEフォームテープの比較検証。</p>', '技術ガイド', 'HVAC配管断熱用耐熱テープの選定ガイド', '純アルミテープ、グラスファイバー補強FSKテープ、ダクト結露防止用PEフォームテープの比較検証。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'guide-pallet-stretch-wrapping-optimization', 'Tối ưu hóa lực căng màng quấn PE pallet xuất khẩu tự động', 'Cách tinh chỉnh độ giãn dài 250% - 300% cho máy quấn màng tự động để tiết kiệm 30% chi phí màng mà vẫn giữ vững tải trọng 1.5 tấn.', '/images/resources/autohtml/thumb3.png',
    'Kỹ sư Vũ Minh Đức', 'Chuyên viên Tự động hóa Đóng gói', '/images/about/op-team.webp',
    'Hướng dẫn kỹ thuật', 'Cẩm nang kỹ thuật', '2026-01-11T17:00:00.000Z'::timestamptz,
    'published', 'Tối ưu hóa lực căng màng quấn PE pallet xuất khẩu tự động', 'Cách tinh chỉnh độ giãn dài 250% - 300% cho máy quấn màng tự động để tiết kiệm 30% chi phí màng mà vẫn giữ vững tải trọng 1.5 tấn.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Tối ưu hóa lực căng màng quấn PE pallet xuất khẩu tự động', 'Cách tinh chỉnh độ giãn dài 250% - 300% cho máy quấn màng tự động để tiết kiệm 30% chi phí màng mà vẫn giữ vững tải trọng 1.5 tấn.', '<p>Cách tinh chỉnh độ giãn dài 250% - 300% cho máy quấn màng tự động để tiết kiệm 30% chi phí màng mà vẫn giữ vững tải trọng 1.5 tấn.</p>', 'Cẩm nang kỹ thuật', 'Tối ưu hóa lực căng màng quấn PE pallet xuất khẩu tự động', 'Cách tinh chỉnh độ giãn dài 250% - 300% cho máy quấn màng tự động để tiết kiệm 30% chi phí màng mà vẫn giữ vững tải trọng 1.5 tấn.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Optimizing Pre-Stretch Ratio for Automated Export Pallet Wrapping', 'How to fine-tune 250% - 300% pre-stretch on automated wrappers, saving 30% film cost while securing 1.5-ton pallets.', '<p>How to fine-tune 250% - 300% pre-stretch on automated wrappers, saving 30% film cost while securing 1.5-ton pallets.</p>', 'Technical Guide', 'Optimizing Pre-Stretch Ratio for Automated Export Pallet Wrapping', 'How to fine-tune 250% - 300% pre-stretch on automated wrappers, saving 30% film cost while securing 1.5-ton pallets.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '自動パレット包装機におけるPEストレッチフィルム延伸率の最適化', '自動包装機で延伸率250%〜300%を適切に設定し、1.5トンの荷崩れを防ぎながらフィルム使用量を30%削減する方法。', '<p>自動包装機で延伸率250%〜300%を適切に設定し、1.5トンの荷崩れを防ぎながらフィルム使用量を30%削減する方法。</p>', '技術ガイド', '自動パレット包装機におけるPEストレッチフィルム延伸率の最適化', '自動包装機で延伸率250%〜300%を適切に設定し、1.5トンの荷崩れを防ぎながらフィルム使用量を30%削減する方法。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'guide-cleanroom-garment-protocol', 'Quy chuẩn trang phục phòng sạch và quy trình thay đồ chuẩn SOP Class 100 - Class 10.000', 'Tiêu chuẩn chọn quần áo liền mũ chống tĩnh điện dệt sợi carbon, ủng phòng sạch và quy trình bước qua air-shower không nhiễm chéo.', '/images/resources/autohtml/thumb4.png',
    'ULINK Cleanroom Team', 'Chuyên gia Quy trình Phòng sạch', '/images/about/op-team.webp',
    'Hướng dẫn kỹ thuật', 'Cẩm nang kỹ thuật', '2026-01-04T17:00:00.000Z'::timestamptz,
    'published', 'Quy chuẩn trang phục phòng sạch và quy trình thay đồ chuẩn SOP Class 100 - Class 10.000', 'Tiêu chuẩn chọn quần áo liền mũ chống tĩnh điện dệt sợi carbon, ủng phòng sạch và quy trình bước qua air-shower không nhiễm chéo.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Quy chuẩn trang phục phòng sạch và quy trình thay đồ chuẩn SOP Class 100 - Class 10.000', 'Tiêu chuẩn chọn quần áo liền mũ chống tĩnh điện dệt sợi carbon, ủng phòng sạch và quy trình bước qua air-shower không nhiễm chéo.', '<p>Tiêu chuẩn chọn quần áo liền mũ chống tĩnh điện dệt sợi carbon, ủng phòng sạch và quy trình bước qua air-shower không nhiễm chéo.</p>', 'Cẩm nang kỹ thuật', 'Quy chuẩn trang phục phòng sạch và quy trình thay đồ chuẩn SOP Class 100 - Class 10.000', 'Tiêu chuẩn chọn quần áo liền mũ chống tĩnh điện dệt sợi carbon, ủng phòng sạch và quy trình bước qua air-shower không nhiễm chéo.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Cleanroom Garment Standards & Gowning SOP for Class 100 - Class 10,000', 'Selection of anti-static carbon-filament jumpsuits, boots, and non-cross-contaminating air-shower entrance procedures.', '<p>Selection of anti-static carbon-filament jumpsuits, boots, and non-cross-contaminating air-shower entrance procedures.</p>', 'Technical Guide', 'Cleanroom Garment Standards & Gowning SOP for Class 100 - Class 10,000', 'Selection of anti-static carbon-filament jumpsuits, boots, and non-cross-contaminating air-shower entrance procedures.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'クラス100〜10,000クリーンルーム用無塵衣基準と更衣SOP手順', 'カーボン導電糸入り無塵衣、クリーンブーツの選定基準および交差汚染を防ぐエアシャワー通過手順。', '<p>カーボン導電糸入り無塵衣、クリーンブーツの選定基準および交差汚染を防ぐエアシャワー通過手順。</p>', '技術ガイド', 'クラス100〜10,000クリーンルーム用無塵衣基準と更衣SOP手順', 'カーボン導電糸入り無塵衣、クリーンブーツの選定基準および交差汚染を防ぐエアシャワー通過手順。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'standard-iso-14644-cleanroom-classification', 'Tiêu chuẩn phòng sạch ISO 14644: Phân loại cấp sạch và giới hạn hạt bụi', 'Bảng tra cứu số lượng hạt bụi tối đa từ ISO Class 1 đến ISO Class 9, tương đương tiêu chuẩn FED-STD-209E và yêu cầu kiểm nghiệm thực địa.', '/images/resources/autohtml/thumb0.png',
    'ULINK Compliance Office', 'Phòng Pháp chế Tiêu chuẩn', '/images/about/op-team.webp',
    'Tiêu chuẩn', 'Tiêu chuẩn', '2026-02-17T17:00:00.000Z'::timestamptz,
    'published', 'Tiêu chuẩn phòng sạch ISO 14644: Phân loại cấp sạch và giới hạn hạt bụi', 'Bảng tra cứu số lượng hạt bụi tối đa từ ISO Class 1 đến ISO Class 9, tương đương tiêu chuẩn FED-STD-209E và yêu cầu kiểm nghiệm thực địa.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Tiêu chuẩn phòng sạch ISO 14644: Phân loại cấp sạch và giới hạn hạt bụi', 'Bảng tra cứu số lượng hạt bụi tối đa từ ISO Class 1 đến ISO Class 9, tương đương tiêu chuẩn FED-STD-209E và yêu cầu kiểm nghiệm thực địa.', '<p>Bảng tra cứu số lượng hạt bụi tối đa từ ISO Class 1 đến ISO Class 9, tương đương tiêu chuẩn FED-STD-209E và yêu cầu kiểm nghiệm thực địa.</p>', 'Tiêu chuẩn', 'Tiêu chuẩn phòng sạch ISO 14644: Phân loại cấp sạch và giới hạn hạt bụi', 'Bảng tra cứu số lượng hạt bụi tối đa từ ISO Class 1 đến ISO Class 9, tương đương tiêu chuẩn FED-STD-209E và yêu cầu kiểm nghiệm thực địa.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'ISO 14644 Cleanroom Standard: Classification & Airborne Particulate Limits', 'Lookup table for maximum particle concentrations from ISO Class 1 to 9, FED-STD-209E cross-reference, and on-site testing rules.', '<p>Lookup table for maximum particle concentrations from ISO Class 1 to 9, FED-STD-209E cross-reference, and on-site testing rules.</p>', 'Standards', 'ISO 14644 Cleanroom Standard: Classification & Airborne Particulate Limits', 'Lookup table for maximum particle concentrations from ISO Class 1 to 9, FED-STD-209E cross-reference, and on-site testing rules.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'ISO 14644クリーンルーム規格：清浄度クラス分類と浮遊微粒子許容限界', 'ISOクラス1〜9までの最大微粒子許容濃度、FED-STD-209E対応表および現地測定要件の解説。', '<p>ISOクラス1〜9までの最大微粒子許容濃度、FED-STD-209E対応表および現地測定要件の解説。</p>', '規格・認証', 'ISO 14644クリーンルーム規格：清浄度クラス分類と浮遊微粒子許容限界', 'ISOクラス1〜9までの最大微粒子許容濃度、FED-STD-209E対応表および現地測定要件の解説。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'standard-rohs-reach-electronics-compliance', 'Chứng nhận RoHS 3 (EU 2015/863) & REACH: Yêu cầu hạn chế 10 chất độc hại', 'Cẩm nang pháp lý về giới hạn hàm lượng chì (Pb), thủy ngân (Hg), cadmi (Cd), Cr6+ và 4 hợp chất Phthalate trong vật liệu phụ trợ điện tử.', '/images/resources/autohtml/thumb5.png',
    'Kỹ sư Đặng Thúy Nga', 'Chuyên viên Đảm bảo Chất lượng', '/images/about/op-team.webp',
    'Tiêu chuẩn', 'Tiêu chuẩn', '2026-02-10T17:00:00.000Z'::timestamptz,
    'published', 'Chứng nhận RoHS 3 (EU 2015/863) & REACH: Yêu cầu hạn chế 10 chất độc hại', 'Cẩm nang pháp lý về giới hạn hàm lượng chì (Pb), thủy ngân (Hg), cadmi (Cd), Cr6+ và 4 hợp chất Phthalate trong vật liệu phụ trợ điện tử.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Chứng nhận RoHS 3 (EU 2015/863) & REACH: Yêu cầu hạn chế 10 chất độc hại', 'Cẩm nang pháp lý về giới hạn hàm lượng chì (Pb), thủy ngân (Hg), cadmi (Cd), Cr6+ và 4 hợp chất Phthalate trong vật liệu phụ trợ điện tử.', '<p>Cẩm nang pháp lý về giới hạn hàm lượng chì (Pb), thủy ngân (Hg), cadmi (Cd), Cr6+ và 4 hợp chất Phthalate trong vật liệu phụ trợ điện tử.</p>', 'Tiêu chuẩn', 'Chứng nhận RoHS 3 (EU 2015/863) & REACH: Yêu cầu hạn chế 10 chất độc hại', 'Cẩm nang pháp lý về giới hạn hàm lượng chì (Pb), thủy ngân (Hg), cadmi (Cd), Cr6+ và 4 hợp chất Phthalate trong vật liệu phụ trợ điện tử.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'RoHS 3 (EU 2015/863) & REACH Certification: 10 Hazardous Substances Limits', 'Regulatory overview on lead, mercury, cadmium, Cr6+, and 4 Phthalate restrictions in electronic auxiliary supplies.', '<p>Regulatory overview on lead, mercury, cadmium, Cr6+, and 4 Phthalate restrictions in electronic auxiliary supplies.</p>', 'Standards', 'RoHS 3 (EU 2015/863) & REACH Certification: 10 Hazardous Substances Limits', 'Regulatory overview on lead, mercury, cadmium, Cr6+, and 4 Phthalate restrictions in electronic auxiliary supplies.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'RoHS 3（EU 2015/863）およびREACH認証：10種の特定有害物質制限', '電子材料・包装資材における鉛、水銀、カドミウム、六価クロムおよび4種フタル酸エステルの含有制限値。', '<p>電子材料・包装資材における鉛、水銀、カドミウム、六価クロムおよび4種フタル酸エステルの含有制限値。</p>', '規格・認証', 'RoHS 3（EU 2015/863）およびREACH認証：10種の特定有害物質制限', '電子材料・包装資材における鉛、水銀、カドミウム、六価クロムおよび4種フタル酸エステルの含有制限値。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'standard-iso-17712-container-bolt-seals', 'Tiêu chuẩn niêm phong an ninh cao ISO 17712 (C-TPAT) cho seal container xuất khẩu', 'Quy chuẩn phân hạng H (High Security Seal), yêu cầu chống cạy mở, lực kéo đứt tối thiểu 10kN và chứng chỉ kiểm định quốc tế hải quan Mỹ.', '/images/industries/logistics/usecase_3.png',
    'ULINK Maritime Logistics', 'Chuyên gia An ninh Chuỗi Cung ứng', '/images/about/op-team.webp',
    'Tiêu chuẩn', 'Tiêu chuẩn', '2026-02-02T17:00:00.000Z'::timestamptz,
    'published', 'Tiêu chuẩn niêm phong an ninh cao ISO 17712 (C-TPAT) cho seal container xuất khẩu', 'Quy chuẩn phân hạng H (High Security Seal), yêu cầu chống cạy mở, lực kéo đứt tối thiểu 10kN và chứng chỉ kiểm định quốc tế hải quan Mỹ.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Tiêu chuẩn niêm phong an ninh cao ISO 17712 (C-TPAT) cho seal container xuất khẩu', 'Quy chuẩn phân hạng H (High Security Seal), yêu cầu chống cạy mở, lực kéo đứt tối thiểu 10kN và chứng chỉ kiểm định quốc tế hải quan Mỹ.', '<p>Quy chuẩn phân hạng H (High Security Seal), yêu cầu chống cạy mở, lực kéo đứt tối thiểu 10kN và chứng chỉ kiểm định quốc tế hải quan Mỹ.</p>', 'Tiêu chuẩn', 'Tiêu chuẩn niêm phong an ninh cao ISO 17712 (C-TPAT) cho seal container xuất khẩu', 'Quy chuẩn phân hạng H (High Security Seal), yêu cầu chống cạy mở, lực kéo đứt tối thiểu 10kN và chứng chỉ kiểm định quốc tế hải quan Mỹ.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'ISO 17712 (C-TPAT) High Security Mechanical Seal Standards for Ocean Containers', 'Grade H (High Security) rating rules, tamper-evident features, 10kN tensile resistance, and US Customs compliance test specs.', '<p>Grade H (High Security) rating rules, tamper-evident features, 10kN tensile resistance, and US Customs compliance test specs.</p>', 'Standards', 'ISO 17712 (C-TPAT) High Security Mechanical Seal Standards for Ocean Containers', 'Grade H (High Security) rating rules, tamper-evident features, 10kN tensile resistance, and US Customs compliance test specs.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '海上輸出コンテナ用ISO 17712（C-TPAT）高セキュリティメカニカルシール基準', 'H等級（高セキュリティ）要件、耐不正開放設計、引張耐荷重10kN以上および米国税関適合検査基準。', '<p>H等級（高セキュリティ）要件、耐不正開放設計、引張耐荷重10kN以上および米国税関適合検査基準。</p>', '規格・認証', '海上輸出コンテナ用ISO 17712（C-TPAT）高セキュリティメカニカルシール基準', 'H等級（高セキュリティ）要件、耐不正開放設計、引張耐荷重10kN以上および米国税関適合検査基準。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'standard-ansi-esd-s20-20-2021-certification', 'Tiêu chuẩn kiểm soát tĩnh điện ANSI/ESD S20.20-2021 phiên bản mới nhất', 'Những thay đổi quan trọng về điện áp bước người (Body Voltage Generation), kiểm soát ion hóa không khí và quy trình thẩm định nhà xưởng.', '/images/resources/autohtml/thumb7.png',
    'ULINK ESD Lab', 'Trung tâm Kiểm định ESD', '/images/about/op-team.webp',
    'Tiêu chuẩn', 'Tiêu chuẩn', '2026-01-24T17:00:00.000Z'::timestamptz,
    'published', 'Tiêu chuẩn kiểm soát tĩnh điện ANSI/ESD S20.20-2021 phiên bản mới nhất', 'Những thay đổi quan trọng về điện áp bước người (Body Voltage Generation), kiểm soát ion hóa không khí và quy trình thẩm định nhà xưởng.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Tiêu chuẩn kiểm soát tĩnh điện ANSI/ESD S20.20-2021 phiên bản mới nhất', 'Những thay đổi quan trọng về điện áp bước người (Body Voltage Generation), kiểm soát ion hóa không khí và quy trình thẩm định nhà xưởng.', '<p>Những thay đổi quan trọng về điện áp bước người (Body Voltage Generation), kiểm soát ion hóa không khí và quy trình thẩm định nhà xưởng.</p>', 'Tiêu chuẩn', 'Tiêu chuẩn kiểm soát tĩnh điện ANSI/ESD S20.20-2021 phiên bản mới nhất', 'Những thay đổi quan trọng về điện áp bước người (Body Voltage Generation), kiểm soát ion hóa không khí và quy trình thẩm định nhà xưởng.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'ANSI/ESD S20.20-2021: Latest ESD Control Program Standard Updates', 'Key changes regarding walking body voltage limits, air ionization qualification, and production facility audit requirements.', '<p>Key changes regarding walking body voltage limits, air ionization qualification, and production facility audit requirements.</p>', 'Standards', 'ANSI/ESD S20.20-2021: Latest ESD Control Program Standard Updates', 'Key changes regarding walking body voltage limits, air ionization qualification, and production facility audit requirements.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'ANSI/ESD S20.20-2021最新版：ESD管理プログラム基準の更新点', '人体歩行帯電電位の許容限界、除電イオナイザーの検証基準、施設監査要件の重要変更点。', '<p>人体歩行帯電電位の許容限界、除電イオナイザーの検証基準、施設監査要件の重要変更点。</p>', '規格・認証', 'ANSI/ESD S20.20-2021最新版：ESD管理プログラム基準の更新点', '人体歩行帯電電位の許容限界、除電イオナイザーの検証基準、施設監査要件の重要変更点。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'standard-fda-haccp-food-contact-packaging', 'Chứng nhận FDA 21 CFR & HACCP đối với màng co nhiệt và bao bì tiếp xúc thực phẩm', 'Quy định di thôi thôi nhiễm chất độc hại, chứng chỉ không chứa BPA và quy trình sản xuất phòng sạch đạt chuẩn an toàn vệ sinh thực phẩm.', '/images/industries/logistics/usecase_2.png',
    'ULINK Food & Pharma Team', 'Cố vấn An toàn Thực phẩm', '/images/about/op-team.webp',
    'Tiêu chuẩn', 'Tiêu chuẩn', '2026-01-16T17:00:00.000Z'::timestamptz,
    'published', 'Chứng nhận FDA 21 CFR & HACCP đối với màng co nhiệt và bao bì tiếp xúc thực phẩm', 'Quy định di thôi thôi nhiễm chất độc hại, chứng chỉ không chứa BPA và quy trình sản xuất phòng sạch đạt chuẩn an toàn vệ sinh thực phẩm.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Chứng nhận FDA 21 CFR & HACCP đối với màng co nhiệt và bao bì tiếp xúc thực phẩm', 'Quy định di thôi thôi nhiễm chất độc hại, chứng chỉ không chứa BPA và quy trình sản xuất phòng sạch đạt chuẩn an toàn vệ sinh thực phẩm.', '<p>Quy định di thôi thôi nhiễm chất độc hại, chứng chỉ không chứa BPA và quy trình sản xuất phòng sạch đạt chuẩn an toàn vệ sinh thực phẩm.</p>', 'Tiêu chuẩn', 'Chứng nhận FDA 21 CFR & HACCP đối với màng co nhiệt và bao bì tiếp xúc thực phẩm', 'Quy định di thôi thôi nhiễm chất độc hại, chứng chỉ không chứa BPA và quy trình sản xuất phòng sạch đạt chuẩn an toàn vệ sinh thực phẩm.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'FDA 21 CFR & HACCP Compliance for Shrink Films & Food Contact Packaging', 'Migration test limits, BPA-free certifications, and cleanroom production requirements for food-grade packaging materials.', '<p>Migration test limits, BPA-free certifications, and cleanroom production requirements for food-grade packaging materials.</p>', 'Standards', 'FDA 21 CFR & HACCP Compliance for Shrink Films & Food Contact Packaging', 'Migration test limits, BPA-free certifications, and cleanroom production requirements for food-grade packaging materials.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'FDA 21 CFRおよびHACCP適合：食品接触用シュリンクフィルムと包装基準', '化学物質溶出試験基準、BPAフリー認証、食品包装資材のクリーンルーム製造管理手順。', '<p>化学物質溶出試験基準、BPAフリー認証、食品包装資材のクリーンルーム製造管理手順。</p>', '規格・認証', 'FDA 21 CFRおよびHACCP適合：食品接触用シュリンクフィルムと包装基準', '化学物質溶出試験基準、BPAフリー認証、食品包装資材のクリーンルーム製造管理手順。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'standard-iso-9001-2015-quality-management', 'Hệ thống Quản lý Chất lượng ISO 9001:2015 & ISO 14001:2015 tại ULink', 'Cam kết chất lượng 100% lô hàng xuất kho có chứng nhận xuất xưởng (CO/CQ), phiếu kiểm định RoHs và cam kết giảm thiểu rác thải nhựa.', '/images/resources/autohtml/thumb8.png',
    'Ban Giám đốc Chất lượng ULink', 'Bộ phận Quản lý Chất lượng', '/images/about/op-team.webp',
    'Tiêu chuẩn', 'Tiêu chuẩn', '2026-01-07T17:00:00.000Z'::timestamptz,
    'published', 'Hệ thống Quản lý Chất lượng ISO 9001:2015 & ISO 14001:2015 tại ULink', 'Cam kết chất lượng 100% lô hàng xuất kho có chứng nhận xuất xưởng (CO/CQ), phiếu kiểm định RoHs và cam kết giảm thiểu rác thải nhựa.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Hệ thống Quản lý Chất lượng ISO 9001:2015 & ISO 14001:2015 tại ULink', 'Cam kết chất lượng 100% lô hàng xuất kho có chứng nhận xuất xưởng (CO/CQ), phiếu kiểm định RoHs và cam kết giảm thiểu rác thải nhựa.', '<p>Cam kết chất lượng 100% lô hàng xuất kho có chứng nhận xuất xưởng (CO/CQ), phiếu kiểm định RoHs và cam kết giảm thiểu rác thải nhựa.</p>', 'Tiêu chuẩn', 'Hệ thống Quản lý Chất lượng ISO 9001:2015 & ISO 14001:2015 tại ULink', 'Cam kết chất lượng 100% lô hàng xuất kho có chứng nhận xuất xưởng (CO/CQ), phiếu kiểm định RoHs và cam kết giảm thiểu rác thải nhựa.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'ISO 9001:2015 & ISO 14001:2015 Quality and Environmental Systems at ULink', 'Commitment to 100% outbound shipments with CO/CQ, RoHS certificates, and carbon footprint reduction protocols.', '<p>Commitment to 100% outbound shipments with CO/CQ, RoHS certificates, and carbon footprint reduction protocols.</p>', 'Standards', 'ISO 9001:2015 & ISO 14001:2015 Quality and Environmental Systems at ULink', 'Commitment to 100% outbound shipments with CO/CQ, RoHS certificates, and carbon footprint reduction protocols.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'ULinkにおけるISO 9001:2015品質＆ISO 14001:2015環境マネジメントシステム', '全出荷ロットにおけるCO/CQ検査証明書添付、RoHS試験成績書、プラスチック削減コミットメント。', '<p>全出荷ロットにおけるCO/CQ検査証明書添付、RoHS試験成績書、プラスチック削減コミットメント。</p>', '規格・認証', 'ULinkにおけるISO 9001:2015品質＆ISO 14001:2015環境マネジメントシステム', '全出荷ロットにおけるCO/CQ検査証明書添付、RoHS試験成績書、プラスチック削減コミットメント。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'hvac-office-building', 'Hệ thống HVAC tòa nhà văn phòng cao cấp: Khắc phục đọng sương đường ống chiller', 'Ứng dụng băng dính nhôm lưới gia cường FSK bọc cách nhiệt hệ chiller, đảm bảo tuổi thọ đường ống trên 15 năm mà không bong tróc.', '/images/industries/construction/usecase_1.png',
    'ULINK M&E Engineering', 'Chuyên gia HVAC', '/images/about/op-team.webp',
    'Nghiên cứu điển hình', 'Tòa nhà thương mại', '2025-12-14T17:00:00.000Z'::timestamptz,
    'published', 'Hệ thống HVAC tòa nhà văn phòng cao cấp: Khắc phục đọng sương đường ống chiller', 'Ứng dụng băng dính nhôm lưới gia cường FSK bọc cách nhiệt hệ chiller, đảm bảo tuổi thọ đường ống trên 15 năm mà không bong tróc.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Hệ thống HVAC tòa nhà văn phòng cao cấp: Khắc phục đọng sương đường ống chiller', 'Ứng dụng băng dính nhôm lưới gia cường FSK bọc cách nhiệt hệ chiller, đảm bảo tuổi thọ đường ống trên 15 năm mà không bong tróc.', '<p>Ứng dụng băng dính nhôm lưới gia cường FSK bọc cách nhiệt hệ chiller, đảm bảo tuổi thọ đường ống trên 15 năm mà không bong tróc.</p>', 'Tòa nhà thương mại', 'Hệ thống HVAC tòa nhà văn phòng cao cấp: Khắc phục đọng sương đường ống chiller', 'Ứng dụng băng dính nhôm lưới gia cường FSK bọc cách nhiệt hệ chiller, đảm bảo tuổi thọ đường ống trên 15 năm mà không bong tróc.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'High-End Office Building HVAC: Eliminating Chiller Pipe Condensation', 'Applying mesh-reinforced aluminum tape to chiller insulation, ensuring pipe lifespan over 15 years without peeling.', '<p>Applying mesh-reinforced aluminum tape to chiller insulation, ensuring pipe lifespan over 15 years without peeling.</p>', 'Commercial Building', 'High-End Office Building HVAC: Eliminating Chiller Pipe Condensation', 'Applying mesh-reinforced aluminum tape to chiller insulation, ensuring pipe lifespan over 15 years without peeling.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '高級オフィスビルHVACシステム：チラー配管の結露完全防止', 'チラーシステム断熱に補強アルミテープを使用し、剥がれることなく15年以上の耐久性を確保。', '<p>チラーシステム断熱に補強アルミテープを使用し、剥がれることなく15年以上の耐久性を確保。</p>', '商業ビル', '高級オフィスビルHVACシステム：チラー配管の結露完全防止', 'チラーシステム断熱に補強アルミテープを使用し、剥がれることなく15年以上の耐久性を確保。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'fdi-electronics-plant', 'Nhà máy sản xuất điện tử FDI quy mô lớn: Đồng bộ 20.000 cuộn keo nhôm phòng sạch', 'Cung ứng hỏa tốc băng keo nhôm FSK ngăn ẩm tuyệt đối cho hệ thống cấp gió sạch phòng máy, vượt qua các đợt kiểm định FDI nghiêm ngặt.', '/images/industries/construction/usecase_2.png',
    'ULINK Technical Advisory', 'Kỹ sư dự án FDI', '/images/about/op-team.webp',
    'Nghiên cứu điển hình', 'Khu công nghiệp', '2026-01-19T17:00:00.000Z'::timestamptz,
    'published', 'Nhà máy sản xuất điện tử FDI quy mô lớn: Đồng bộ 20.000 cuộn keo nhôm phòng sạch', 'Cung ứng hỏa tốc băng keo nhôm FSK ngăn ẩm tuyệt đối cho hệ thống cấp gió sạch phòng máy, vượt qua các đợt kiểm định FDI nghiêm ngặt.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Nhà máy sản xuất điện tử FDI quy mô lớn: Đồng bộ 20.000 cuộn keo nhôm phòng sạch', 'Cung ứng hỏa tốc băng keo nhôm FSK ngăn ẩm tuyệt đối cho hệ thống cấp gió sạch phòng máy, vượt qua các đợt kiểm định FDI nghiêm ngặt.', '<p>Cung ứng hỏa tốc băng keo nhôm FSK ngăn ẩm tuyệt đối cho hệ thống cấp gió sạch phòng máy, vượt qua các đợt kiểm định FDI nghiêm ngặt.</p>', 'Khu công nghiệp', 'Nhà máy sản xuất điện tử FDI quy mô lớn: Đồng bộ 20.000 cuộn keo nhôm phòng sạch', 'Cung ứng hỏa tốc băng keo nhôm FSK ngăn ẩm tuyệt đối cho hệ thống cấp gió sạch phòng máy, vượt qua các đợt kiểm định FDI nghiêm ngặt.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Large-Scale FDI Electronics Plant: Synchronizing 20,000 Cleanroom Tapes', 'Synchronized supply of moisture-barrier FSK aluminum tape for cleanroom supply ducts, passing strict FDI quality audits.', '<p>Synchronized supply of moisture-barrier FSK aluminum tape for cleanroom supply ducts, passing strict FDI quality audits.</p>', 'Industrial Park', 'Large-Scale FDI Electronics Plant: Synchronizing 20,000 Cleanroom Tapes', 'Synchronized supply of moisture-barrier FSK aluminum tape for cleanroom supply ducts, passing strict FDI quality audits.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '大規模FDI電子製造工場：20,000巻のクリーンルーム用テープ同期納品', 'クリーンルーム送風ダクト用に完全防湿FSKアルミテープを同期供給し、厳格なFDI品質検査に合格。', '<p>クリーンルーム送風ダクト用に完全防湿FSKアルミテープを同期供給し、厳格なFDI品質検査に合格。</p>', '工業団地', '大規模FDI電子製造工場：20,000巻のクリーンルーム用テープ同期納品', 'クリーンルーム送風ダクト用に完全防湿FSKアルミテープを同期供給し、厳格なFDI品質検査に合格。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'hospital-cleanroom', 'Bệnh viện quốc tế & Phòng sạch vô trùng: Bịt kín ống thông gió áp lực âm', 'Bịt kín ống thông gió phòng mổ bằng băng keo nhôm kháng khuẩn chuẩn RoHS, tuyệt đối không tạo bụi bẩn, không mùi dung môi hữu cơ.', '/images/industries/construction/usecase_3.png',
    'ULINK Medical Solutions', 'Chuyên gia Y tế & Vi sinh', '/images/about/op-team.webp',
    'Nghiên cứu điển hình', 'Bệnh viện & Lab', '2026-02-01T17:00:00.000Z'::timestamptz,
    'published', 'Bệnh viện quốc tế & Phòng sạch vô trùng: Bịt kín ống thông gió áp lực âm', 'Bịt kín ống thông gió phòng mổ bằng băng keo nhôm kháng khuẩn chuẩn RoHS, tuyệt đối không tạo bụi bẩn, không mùi dung môi hữu cơ.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Bệnh viện quốc tế & Phòng sạch vô trùng: Bịt kín ống thông gió áp lực âm', 'Bịt kín ống thông gió phòng mổ bằng băng keo nhôm kháng khuẩn chuẩn RoHS, tuyệt đối không tạo bụi bẩn, không mùi dung môi hữu cơ.', '<p>Bịt kín ống thông gió phòng mổ bằng băng keo nhôm kháng khuẩn chuẩn RoHS, tuyệt đối không tạo bụi bẩn, không mùi dung môi hữu cơ.</p>', 'Bệnh viện & Lab', 'Bệnh viện quốc tế & Phòng sạch vô trùng: Bịt kín ống thông gió áp lực âm', 'Bịt kín ống thông gió phòng mổ bằng băng keo nhôm kháng khuẩn chuẩn RoHS, tuyệt đối không tạo bụi bẩn, không mùi dung môi hữu cơ.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'International Hospital & Cleanroom: Negative Pressure Duct Sealing', 'Sealing negative pressure operating room ducts with RoHS antibacterial tape, zero dust and solvent emissions.', '<p>Sealing negative pressure operating room ducts with RoHS antibacterial tape, zero dust and solvent emissions.</p>', 'Hospital & Lab', 'International Hospital & Cleanroom: Negative Pressure Duct Sealing', 'Sealing negative pressure operating room ducts with RoHS antibacterial tape, zero dust and solvent emissions.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '国際病院＆無菌クリーンルーム：陰圧換気ダクトの完全密閉', 'RoHS抗菌アルミテープで陰圧手術室の換気ダクトを密閉し、粉塵や有機溶剤臭の発生をゼロに抑制。', '<p>RoHS抗菌アルミテープで陰圧手術室の換気ダクトを密閉し、粉塵や有機溶剤臭の発生をゼロに抑制。</p>', '病院＆ラボ', '国際病院＆無菌クリーンルーム：陰圧換気ダクトの完全密閉', 'RoHS抗菌アルミテープで陰圧手術室の換気ダクトを密閉し、粉塵や有機溶剤臭の発生をゼロに抑制。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'an-cuong-wood-export', 'Bảo vệ bề mặt gỗ xuất khẩu Mỹ cho Tập đoàn Gỗ An Cường', 'Triển khai màng bảo vệ bề mặt PE chống trầy xước không để lại keo dư sau 45 ngày container vượt đại dương ở nhiệt độ 50°C.', '/images/industries/wood/usecase_1.png',
    'ULINK Wood Solutions', 'Chuyên gia Vật liệu Ngành Gỗ', '/images/about/op-team.webp',
    'Nghiên cứu điển hình', 'Xuất khẩu Mỹ & EU', '2026-01-09T17:00:00.000Z'::timestamptz,
    'published', 'Bảo vệ bề mặt gỗ xuất khẩu Mỹ cho Tập đoàn Gỗ An Cường', 'Triển khai màng bảo vệ bề mặt PE chống trầy xước không để lại keo dư sau 45 ngày container vượt đại dương ở nhiệt độ 50°C.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Bảo vệ bề mặt gỗ xuất khẩu Mỹ cho Tập đoàn Gỗ An Cường', 'Triển khai màng bảo vệ bề mặt PE chống trầy xước không để lại keo dư sau 45 ngày container vượt đại dương ở nhiệt độ 50°C.', '<p>Triển khai màng bảo vệ bề mặt PE chống trầy xước không để lại keo dư sau 45 ngày container vượt đại dương ở nhiệt độ 50°C.</p>', 'Xuất khẩu Mỹ & EU', 'Bảo vệ bề mặt gỗ xuất khẩu Mỹ cho Tập đoàn Gỗ An Cường', 'Triển khai màng bảo vệ bề mặt PE chống trầy xước không để lại keo dư sau 45 ngày container vượt đại dương ở nhiệt độ 50°C.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Protecting US Export Furniture for An Cuong Group', 'Deployed residue-free PE surface protective film maintaining zero adhesive residue after 45-day ocean transit at 50°C.', '<p>Deployed residue-free PE surface protective film maintaining zero adhesive residue after 45-day ocean transit at 50°C.</p>', 'US & EU Export', 'Protecting US Export Furniture for An Cuong Group', 'Deployed residue-free PE surface protective film maintaining zero adhesive residue after 45-day ocean transit at 50°C.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'An Cườngグループ向け米国輸出家具の表面保護', '50℃の過酷な海上輸送45日後でも糊残りゼロのPE保護フィルムを導入。', '<p>50℃の過酷な海上輸送45日後でも糊残りゼロのPE保護フィルムを導入。</p>', '米国・欧州輸出', 'An Cườngグループ向け米国輸出家具の表面保護', '50℃の過酷な海上輸送45日後でも糊残りゼロのPE保護フィルムを導入。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'vinhomes-penthouse-furniture', 'Bảo vệ nội thất hoàn thiện Penthouse Vinhomes Ocean Park trong thi công', 'Giải pháp màng bọc bảo vệ sàn đá cẩm thạch và kính chạm sàn khổ lớn chống va đập, tiết kiệm 200 triệu đồng chi phí phục hồi hư hại.', '/images/industries/wood/usecase_2.png',
    'ULINK Interior Advisory', 'Tư vấn Bảo vệ Công trình', '/images/about/op-team.webp',
    'Nghiên cứu điển hình', 'Nội thất & Dự án', '2025-12-17T17:00:00.000Z'::timestamptz,
    'published', 'Bảo vệ nội thất hoàn thiện Penthouse Vinhomes Ocean Park trong thi công', 'Giải pháp màng bọc bảo vệ sàn đá cẩm thạch và kính chạm sàn khổ lớn chống va đập, tiết kiệm 200 triệu đồng chi phí phục hồi hư hại.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Bảo vệ nội thất hoàn thiện Penthouse Vinhomes Ocean Park trong thi công', 'Giải pháp màng bọc bảo vệ sàn đá cẩm thạch và kính chạm sàn khổ lớn chống va đập, tiết kiệm 200 triệu đồng chi phí phục hồi hư hại.', '<p>Giải pháp màng bọc bảo vệ sàn đá cẩm thạch và kính chạm sàn khổ lớn chống va đập, tiết kiệm 200 triệu đồng chi phí phục hồi hư hại.</p>', 'Nội thất & Dự án', 'Bảo vệ nội thất hoàn thiện Penthouse Vinhomes Ocean Park trong thi công', 'Giải pháp màng bọc bảo vệ sàn đá cẩm thạch và kính chạm sàn khổ lớn chống va đập, tiết kiệm 200 triệu đồng chi phí phục hồi hư hại.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Protecting Luxury Penthouse Finishes at Vinhomes Ocean Park During Fit-Out', 'Impact-resistant protective films for marble floors and large glazed partitions, saving 200M VND in potential rework.', '<p>Impact-resistant protective films for marble floors and large glazed partitions, saving 200M VND in potential rework.</p>', 'Interior & Projects', 'Protecting Luxury Penthouse Finishes at Vinhomes Ocean Park During Fit-Out', 'Impact-resistant protective films for marble floors and large glazed partitions, saving 200M VND in potential rework.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'Vinhomes Ocean Parkペントハウス施工中の高級内装表面保護', '大理石床や大型ガラス間仕切りの耐衝撃保護フィルムにより、修復コスト2億ドンを削減。', '<p>大理石床や大型ガラス間仕切りの耐衝撃保護フィルムにより、修復コスト2億ドンを削減。</p>', 'インテリア＆プロジェクト', 'Vinhomes Ocean Parkペントハウス施工中の高級内装表面保護', '大理石床や大型ガラス間仕切りの耐衝撃保護フィルムにより、修復コスト2億ドンを削減。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'woodsland-eu-export', 'Dây chuyền đóng gói nội thất xuất khẩu EU - Woodsland Tuyên Quang', 'Tự động hóa quấn màng co và băng dính niêm phong carton chịu ẩm cao, giúp hàng rào độ ẩm của thùng hàng đạt tiêu chuẩn xuất khẩu châu Âu.', '/images/industries/wood/usecase_3.png',
    'ULINK Automation Lab', 'Kỹ sư Đóng gói Công nghiệp', '/images/about/op-team.webp',
    'Nghiên cứu điển hình', 'Dây chuyền Xuất khẩu', '2026-01-04T17:00:00.000Z'::timestamptz,
    'published', 'Dây chuyền đóng gói nội thất xuất khẩu EU - Woodsland Tuyên Quang', 'Tự động hóa quấn màng co và băng dính niêm phong carton chịu ẩm cao, giúp hàng rào độ ẩm của thùng hàng đạt tiêu chuẩn xuất khẩu châu Âu.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Dây chuyền đóng gói nội thất xuất khẩu EU - Woodsland Tuyên Quang', 'Tự động hóa quấn màng co và băng dính niêm phong carton chịu ẩm cao, giúp hàng rào độ ẩm của thùng hàng đạt tiêu chuẩn xuất khẩu châu Âu.', '<p>Tự động hóa quấn màng co và băng dính niêm phong carton chịu ẩm cao, giúp hàng rào độ ẩm của thùng hàng đạt tiêu chuẩn xuất khẩu châu Âu.</p>', 'Dây chuyền Xuất khẩu', 'Dây chuyền đóng gói nội thất xuất khẩu EU - Woodsland Tuyên Quang', 'Tự động hóa quấn màng co và băng dính niêm phong carton chịu ẩm cao, giúp hàng rào độ ẩm của thùng hàng đạt tiêu chuẩn xuất khẩu châu Âu.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Automated EU Export Furniture Packaging - Woodsland Tuyen Quang', 'Automated stretch wrapping and moisture-resistant carton sealing tape, meeting stringent European export moisture standards.', '<p>Automated stretch wrapping and moisture-resistant carton sealing tape, meeting stringent European export moisture standards.</p>', 'Export Lines', 'Automated EU Export Furniture Packaging - Woodsland Tuyen Quang', 'Automated stretch wrapping and moisture-resistant carton sealing tape, meeting stringent European export moisture standards.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'Woodsland Tuyen Quangの対EU輸出家具向け自動梱包ライン', '自動ストレッチ包装と耐湿段ボールテープにより、欧州向け厳格な防湿基準をクリア。', '<p>自動ストレッチ包装と耐湿段ボールテープにより、欧州向け厳格な防湿基準をクリア。</p>', '輸出ライン', 'Woodsland Tuyen Quangの対EU輸出家具向け自動梱包ライン', '自動ストレッチ包装と耐湿段ボールテープにより、欧州向け厳格な防湿基準をクリア。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'logistics-bac-ninh-hub', 'Tối ưu hóa vật tư đóng gói tại Tổng kho Fulfillment Bắc Ninh 30.000m²', 'Cắt giảm 25% lượng nhựa sử dụng nhờ chuyển đổi sang màng quấn PE Nano 55 lớp có độ bền kéo cao, rút ngắn thời gian đóng gói mỗi kiện.', '/images/industries/logistics/usecase_1.png',
    'ULINK Logistics Practice', 'Chuyên gia Tối ưu Kho vận', '/images/about/op-team.webp',
    'Nghiên cứu điển hình', 'Tổng kho Fulfillment', '2026-01-21T17:00:00.000Z'::timestamptz,
    'published', 'Tối ưu hóa vật tư đóng gói tại Tổng kho Fulfillment Bắc Ninh 30.000m²', 'Cắt giảm 25% lượng nhựa sử dụng nhờ chuyển đổi sang màng quấn PE Nano 55 lớp có độ bền kéo cao, rút ngắn thời gian đóng gói mỗi kiện.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Tối ưu hóa vật tư đóng gói tại Tổng kho Fulfillment Bắc Ninh 30.000m²', 'Cắt giảm 25% lượng nhựa sử dụng nhờ chuyển đổi sang màng quấn PE Nano 55 lớp có độ bền kéo cao, rút ngắn thời gian đóng gói mỗi kiện.', '<p>Cắt giảm 25% lượng nhựa sử dụng nhờ chuyển đổi sang màng quấn PE Nano 55 lớp có độ bền kéo cao, rút ngắn thời gian đóng gói mỗi kiện.</p>', 'Tổng kho Fulfillment', 'Tối ưu hóa vật tư đóng gói tại Tổng kho Fulfillment Bắc Ninh 30.000m²', 'Cắt giảm 25% lượng nhựa sử dụng nhờ chuyển đổi sang màng quấn PE Nano 55 lớp có độ bền kéo cao, rút ngắn thời gian đóng gói mỗi kiện.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Optimizing Packaging Materials at Bac Ninh 30,000m² Fulfillment Hub', 'Cut plastic usage by 25% by switching to 55-layer Nano PE stretch film with superior tensile yield, speeding packing cycles.', '<p>Cut plastic usage by 25% by switching to 55-layer Nano PE stretch film with superior tensile yield, speeding packing cycles.</p>', 'Fulfillment Hub', 'Optimizing Packaging Materials at Bac Ninh 30,000m² Fulfillment Hub', 'Cut plastic usage by 25% by switching to 55-layer Nano PE stretch film with superior tensile yield, speeding packing cycles.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'バクニン30,000m²フルフィルメントハブにおける梱包資材の最適化', '55層ナノPEストレッチフィルムへの切り替えによりプラスチック使用量を25%削減し梱包時間を短縮。', '<p>55層ナノPEストレッチフィルムへの切り替えによりプラスチック使用量を25%削減し梱包時間を短縮。</p>', 'フルフィルメントハブ', 'バクニン30,000m²フルフィルメントハブにおける梱包資材の最適化', '55層ナノPEストレッチフィルムへの切り替えによりプラスチック使用量を25%削減し梱包時間を短縮。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'cold-chain-logistics', 'Chuỗi kho lạnh bảo quản thủy hải sản xuất khẩu Minh Phú: Băng dính chịu nhiệt -40°C', 'Cung cấp màng co POF và băng dính chuyên dụng bám dính cực tốt trong môi trường âm 40 độ C, đảm bảo bao bì không giòn gãy khi cấp đông.', '/images/industries/logistics/usecase_2.png',
    'ULINK Cold Chain Advisor', 'Kỹ sư Chuỗi Cung ứng Lạnh', '/images/about/op-team.webp',
    'Nghiên cứu điển hình', 'Kho lạnh & Thực phẩm', '2026-02-13T17:00:00.000Z'::timestamptz,
    'published', 'Chuỗi kho lạnh bảo quản thủy hải sản xuất khẩu Minh Phú: Băng dính chịu nhiệt -40°C', 'Cung cấp màng co POF và băng dính chuyên dụng bám dính cực tốt trong môi trường âm 40 độ C, đảm bảo bao bì không giòn gãy khi cấp đông.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Chuỗi kho lạnh bảo quản thủy hải sản xuất khẩu Minh Phú: Băng dính chịu nhiệt -40°C', 'Cung cấp màng co POF và băng dính chuyên dụng bám dính cực tốt trong môi trường âm 40 độ C, đảm bảo bao bì không giòn gãy khi cấp đông.', '<p>Cung cấp màng co POF và băng dính chuyên dụng bám dính cực tốt trong môi trường âm 40 độ C, đảm bảo bao bì không giòn gãy khi cấp đông.</p>', 'Kho lạnh & Thực phẩm', 'Chuỗi kho lạnh bảo quản thủy hải sản xuất khẩu Minh Phú: Băng dính chịu nhiệt -40°C', 'Cung cấp màng co POF và băng dính chuyên dụng bám dính cực tốt trong môi trường âm 40 độ C, đảm bảo bao bì không giòn gãy khi cấp đông.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Minh Phu Cold-Chain Seafood Export: -40°C Low-Temp Sealing Tape', 'Supplied POF shrink film and specialty rubber tape adhering reliably at -40°C, eliminating brittle failures during quick-freezing.', '<p>Supplied POF shrink film and specialty rubber tape adhering reliably at -40°C, eliminating brittle failures during quick-freezing.</p>', 'Cold Storage & Food', 'Minh Phu Cold-Chain Seafood Export: -40°C Low-Temp Sealing Tape', 'Supplied POF shrink film and specialty rubber tape adhering reliably at -40°C, eliminating brittle failures during quick-freezing.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'Minh Phu向け冷凍水産物輸出コールドチェーン：マイナス40℃対応粘着テープ', 'マイナス40℃の極低温環境でも強力粘着するPOFシュリンクフィルムと特殊ゴム系テープを供給。', '<p>マイナス40℃の極低温環境でも強力粘着するPOFシュリンクフィルムと特殊ゴム系テープを供給。</p>', '冷蔵・食品物流', 'Minh Phu向け冷凍水産物輸出コールドチェーン：マイナス40℃対応粘着テープ', 'マイナス40℃の極低温環境でも強力粘着するPOFシュリンクフィルムと特殊ゴム系テープを供給。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'cat-lai-port-export', 'Cảng Cát Lái & Quy trình niêm phong container xuất khẩu đường biển chuẩn ISO 17712', 'Khóa seal cối container mạ thép chống gỉ khắc laser số nhảy theo chuẩn C-TPAT, triệt tiêu 100% rủi ro mất trộm hoặc tráo hàng trên biển.', '/images/industries/logistics/usecase_3.png',
    'ULINK Maritime Logistics', 'Chuyên gia An ninh Cảng biển', '/images/about/op-team.webp',
    'Nghiên cứu điển hình', 'Cảng biển & Container', '2026-02-07T17:00:00.000Z'::timestamptz,
    'published', 'Cảng Cát Lái & Quy trình niêm phong container xuất khẩu đường biển chuẩn ISO 17712', 'Khóa seal cối container mạ thép chống gỉ khắc laser số nhảy theo chuẩn C-TPAT, triệt tiêu 100% rủi ro mất trộm hoặc tráo hàng trên biển.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Cảng Cát Lái & Quy trình niêm phong container xuất khẩu đường biển chuẩn ISO 17712', 'Khóa seal cối container mạ thép chống gỉ khắc laser số nhảy theo chuẩn C-TPAT, triệt tiêu 100% rủi ro mất trộm hoặc tráo hàng trên biển.', '<p>Khóa seal cối container mạ thép chống gỉ khắc laser số nhảy theo chuẩn C-TPAT, triệt tiêu 100% rủi ro mất trộm hoặc tráo hàng trên biển.</p>', 'Cảng biển & Container', 'Cảng Cát Lái & Quy trình niêm phong container xuất khẩu đường biển chuẩn ISO 17712', 'Khóa seal cối container mạ thép chống gỉ khắc laser số nhảy theo chuẩn C-TPAT, triệt tiêu 100% rủi ro mất trộm hoặc tráo hàng trên biển.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Cat Lai Port: ISO 17712 Ocean Freight Container Sealing Standards', 'Supplied laser-etched anti-tamper C-TPAT bolt seals, eliminating cargo tampering on transpacific routes.', '<p>Supplied laser-etched anti-tamper C-TPAT bolt seals, eliminating cargo tampering on transpacific routes.</p>', 'Seaport & Container', 'Cat Lai Port: ISO 17712 Ocean Freight Container Sealing Standards', 'Supplied laser-etched anti-tamper C-TPAT bolt seals, eliminating cargo tampering on transpacific routes.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'キャットライ港：ISO 17712規格に基づく海上輸出コンテナ封かんプロセス', 'レーザー刻印付きC-TPAT適合ボルトシールにより、太平洋航路での荷抜き・改ざんリスクを100%排除。', '<p>レーザー刻印付きC-TPAT適合ボルトシールにより、太平洋航路での荷抜き・改ざんリスクを100%排除。</p>', '港湾・コンテナ', 'キャットライ港：ISO 17712規格に基づく海上輸出コンテナ封かんプロセス', 'レーザー刻印付きC-TPAT適合ボルトシールにより、太平洋航路での荷抜き・改ざんリスクを100%排除。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'market-news-supply-chain-2026', 'Xu hướng chuỗi cung ứng vật liệu đóng gói công nghiệp năm 2026', 'Phân tích biến động giá hạt nhựa nguyên sinh, cước vận tải biển và chiến lược tối ưu tồn kho an toàn cho nhà máy FDI.', '/images/home/news/image (9).png',
    'ULINK Market Research', 'Chuyên gia nghiên cứu thị trường', '/images/home/section5/image (2).png',
    'market-news', 'Tin thị trường', '2026-02-17T17:00:00.000Z'::timestamptz,
    'published', 'Xu hướng chuỗi cung ứng vật liệu đóng gói công nghiệp năm 2026', 'Phân tích biến động giá hạt nhựa nguyên sinh, cước vận tải biển và chiến lược tối ưu tồn kho an toàn cho nhà máy FDI.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Xu hướng chuỗi cung ứng vật liệu đóng gói công nghiệp năm 2026', 'Phân tích biến động giá hạt nhựa nguyên sinh, cước vận tải biển và chiến lược tối ưu tồn kho an toàn cho nhà máy FDI.', '<p>Phân tích biến động giá hạt nhựa nguyên sinh, cước vận tải biển và chiến lược tối ưu tồn kho an toàn cho nhà máy FDI.</p>', 'Tin thị trường', 'Xu hướng chuỗi cung ứng vật liệu đóng gói công nghiệp năm 2026', 'Phân tích biến động giá hạt nhựa nguyên sinh, cước vận tải biển và chiến lược tối ưu tồn kho an toàn cho nhà máy FDI.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Industrial Packaging Supply Chain Trends for 2026', 'Analysis of virgin resin price volatility, ocean freight rates, and safety stock optimization for FDI plants.', '<p>Analysis of virgin resin price volatility, ocean freight rates, and safety stock optimization for FDI plants.</p>', 'Market News', 'Industrial Packaging Supply Chain Trends for 2026', 'Analysis of virgin resin price volatility, ocean freight rates, and safety stock optimization for FDI plants.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '2026年産業用包装資材サプライチェーンの動向', 'バージン樹脂価格の変動、海上運賃、FDI工場向けの安全在庫最適化戦略の分析。', '<p>バージン樹脂価格の変動、海上運賃、FDI工場向けの安全在庫最適化戦略の分析。</p>', '市場ニュース', '2026年産業用包装資材サプライチェーンの動向', 'バージン樹脂価格の変動、海上運賃、FDI工場向けの安全在庫最適化戦略の分析。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'market-news-green-packaging-mandate', 'Quy chuẩn đóng gói xanh mới tại các thị trường EU và Hoa Kỳ', 'Cập nhật lộ trình cắt giảm nhựa dùng một lần, chứng chỉ tái chế PCR và yêu cầu dán nhãn sinh thái cho hàng xuất khẩu.', '/images/home/news/image (10).png',
    'ULINK Technical Advisory', 'Cố vấn tuân thủ quy chuẩn quốc tế', '/images/home/section5/image (4).png',
    'market-news', 'Tin thị trường', '2026-02-13T17:00:00.000Z'::timestamptz,
    'published', 'Quy chuẩn đóng gói xanh mới tại các thị trường EU và Hoa Kỳ', 'Cập nhật lộ trình cắt giảm nhựa dùng một lần, chứng chỉ tái chế PCR và yêu cầu dán nhãn sinh thái cho hàng xuất khẩu.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Quy chuẩn đóng gói xanh mới tại các thị trường EU và Hoa Kỳ', 'Cập nhật lộ trình cắt giảm nhựa dùng một lần, chứng chỉ tái chế PCR và yêu cầu dán nhãn sinh thái cho hàng xuất khẩu.', '<p>Cập nhật lộ trình cắt giảm nhựa dùng một lần, chứng chỉ tái chế PCR và yêu cầu dán nhãn sinh thái cho hàng xuất khẩu.</p>', 'Tin thị trường', 'Quy chuẩn đóng gói xanh mới tại các thị trường EU và Hoa Kỳ', 'Cập nhật lộ trình cắt giảm nhựa dùng một lần, chứng chỉ tái chế PCR và yêu cầu dán nhãn sinh thái cho hàng xuất khẩu.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'New Green Packaging Standards in EU and US Markets', 'Updates on single-use plastic phase-outs, PCR recycling certificates, and eco-labeling rules for export goods.', '<p>Updates on single-use plastic phase-outs, PCR recycling certificates, and eco-labeling rules for export goods.</p>', 'Market News', 'New Green Packaging Standards in EU and US Markets', 'Updates on single-use plastic phase-outs, PCR recycling certificates, and eco-labeling rules for export goods.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'EUおよび米国市場における新しいグリーン包装基準', '使い捨てプラスチック削減ロードマップ、PCRリサイクル認証、輸出製品向けエコラベル要件の最新情報。', '<p>使い捨てプラスチック削減ロードマップ、PCRリサイクル認証、輸出製品向けエコラベル要件の最新情報。</p>', '市場ニュース', 'EUおよび米国市場における新しいグリーン包装基準', '使い捨てプラスチック削減ロードマップ、PCRリサイクル認証、輸出製品向けエコラベル要件の最新情報。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'market-news-semiconductor-expansion-vn', 'Làn sóng mở rộng nhà máy bán dẫn tại Bắc Ninh - Hải Phòng', 'Nhu cầu đột biến về vật tư phòng sạch cấp độ cao và giải pháp bảo vệ bề mặt linh kiện tinh vi đạt chuẩn ESD S20.20.', '/images/home/news/image (11).png',
    'ULINK Electronics Practice', 'Kỹ sư giải pháp điện tử', '/images/home/section5/image (1).png',
    'market-news', 'Tin thị trường', '2026-02-05T17:00:00.000Z'::timestamptz,
    'published', 'Làn sóng mở rộng nhà máy bán dẫn tại Bắc Ninh - Hải Phòng', 'Nhu cầu đột biến về vật tư phòng sạch cấp độ cao và giải pháp bảo vệ bề mặt linh kiện tinh vi đạt chuẩn ESD S20.20.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Làn sóng mở rộng nhà máy bán dẫn tại Bắc Ninh - Hải Phòng', 'Nhu cầu đột biến về vật tư phòng sạch cấp độ cao và giải pháp bảo vệ bề mặt linh kiện tinh vi đạt chuẩn ESD S20.20.', '<p>Nhu cầu đột biến về vật tư phòng sạch cấp độ cao và giải pháp bảo vệ bề mặt linh kiện tinh vi đạt chuẩn ESD S20.20.</p>', 'Tin thị trường', 'Làn sóng mở rộng nhà máy bán dẫn tại Bắc Ninh - Hải Phòng', 'Nhu cầu đột biến về vật tư phòng sạch cấp độ cao và giải pháp bảo vệ bề mặt linh kiện tinh vi đạt chuẩn ESD S20.20.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Semiconductor Plant Expansion Wave in Bac Ninh - Hai Phong', 'Surging demand for high-grade cleanroom supplies and ESD S20.20 surface protection solutions for precision parts.', '<p>Surging demand for high-grade cleanroom supplies and ESD S20.20 surface protection solutions for precision parts.</p>', 'Market News', 'Semiconductor Plant Expansion Wave in Bac Ninh - Hai Phong', 'Surging demand for high-grade cleanroom supplies and ESD S20.20 surface protection solutions for precision parts.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'バクニン・ハイフォンにおける半導体工場の拡張ラッシュ', 'ハイグレードクリーンルーム資材およびESD S20.20適合の精密部品表面保護ソリューションへの需要急増。', '<p>ハイグレードクリーンルーム資材およびESD S20.20適合の精密部品表面保護ソリューションへの需要急増。</p>', '市場ニュース', 'バクニン・ハイフォンにおける半導体工場の拡張ラッシュ', 'ハイグレードクリーンルーム資材およびESD S20.20適合の精密部品表面保護ソリューションへの需要急増。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'market-news-raw-materials-q1-2026', 'Báo cáo giá nguyên liệu công nghiệp Quý 1/2026', 'Dự báo biến động giá nhôm lá, keo acrylic, màng BOPP và khuyến nghị kế hoạch thu mua dài hạn cho phòng cung ứng.', '/images/home/news/news4_eco.jpg',
    'ULINK Procurement Intelligence', 'Trưởng bộ phận phân tích chuỗi cung ứng', '/images/home/section5/image (3).png',
    'market-news', 'Tin thị trường', '2026-01-27T17:00:00.000Z'::timestamptz,
    'published', 'Báo cáo giá nguyên liệu công nghiệp Quý 1/2026', 'Dự báo biến động giá nhôm lá, keo acrylic, màng BOPP và khuyến nghị kế hoạch thu mua dài hạn cho phòng cung ứng.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Báo cáo giá nguyên liệu công nghiệp Quý 1/2026', 'Dự báo biến động giá nhôm lá, keo acrylic, màng BOPP và khuyến nghị kế hoạch thu mua dài hạn cho phòng cung ứng.', '<p>Dự báo biến động giá nhôm lá, keo acrylic, màng BOPP và khuyến nghị kế hoạch thu mua dài hạn cho phòng cung ứng.</p>', 'Tin thị trường', 'Báo cáo giá nguyên liệu công nghiệp Quý 1/2026', 'Dự báo biến động giá nhôm lá, keo acrylic, màng BOPP và khuyến nghị kế hoạch thu mua dài hạn cho phòng cung ứng.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Q1/2026 Industrial Raw Materials Price Report', 'Price forecasts for aluminum foil, acrylic adhesives, BOPP film, and procurement recommendations for buyer teams.', '<p>Price forecasts for aluminum foil, acrylic adhesives, BOPP film, and procurement recommendations for buyer teams.</p>', 'Market News', 'Q1/2026 Industrial Raw Materials Price Report', 'Price forecasts for aluminum foil, acrylic adhesives, BOPP film, and procurement recommendations for buyer teams.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '2026年第1四半期 産業用原材料価格レポート', 'アルミ箔、アクリル粘着剤、BOPPフィルムの価格予測と調達チーム向け長期調達計画の提言。', '<p>アルミ箔、アクリル粘着剤、BOPPフィルムの価格予測と調達チーム向け長期調達計画の提言。</p>', '市場ニュース', '2026年第1四半期 産業用原材料価格レポート', 'アルミ箔、アクリル粘着剤、BOPPフィルムの価格予測と調達チーム向け長期調達計画の提言。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'market-news-ocean-freight-indices-2026', 'Chỉ số cước tàu biển tuyến Á - Âu và giải pháp đóng gói giảm khối lượng vận chuyển', 'Phân tích áp lực chi phí logistics đường biển và ứng dụng màng quấn siêu mỏng chịu lực giúp tối ưu hóa tải trọng container.', '/images/resources/autohtml/thumb9.png',
    'ULINK Logistics Intelligence', 'Chuyên gia Phân tích Vận tải', '/images/about/op-team.webp',
    'market-news', 'Tin thị trường', '2026-01-19T17:00:00.000Z'::timestamptz,
    'published', 'Chỉ số cước tàu biển tuyến Á - Âu và giải pháp đóng gói giảm khối lượng vận chuyển', 'Phân tích áp lực chi phí logistics đường biển và ứng dụng màng quấn siêu mỏng chịu lực giúp tối ưu hóa tải trọng container.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Chỉ số cước tàu biển tuyến Á - Âu và giải pháp đóng gói giảm khối lượng vận chuyển', 'Phân tích áp lực chi phí logistics đường biển và ứng dụng màng quấn siêu mỏng chịu lực giúp tối ưu hóa tải trọng container.', '<p>Phân tích áp lực chi phí logistics đường biển và ứng dụng màng quấn siêu mỏng chịu lực giúp tối ưu hóa tải trọng container.</p>', 'Tin thị trường', 'Chỉ số cước tàu biển tuyến Á - Âu và giải pháp đóng gói giảm khối lượng vận chuyển', 'Phân tích áp lực chi phí logistics đường biển và ứng dụng màng quấn siêu mỏng chịu lực giúp tối ưu hóa tải trọng container.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Asia-Europe Ocean Freight Indices & Weight-Reduction Packaging Solutions', 'Analysis of ocean container freight pressures and adopting ultra-thin high-tensile stretch wrap to optimize payload weights.', '<p>Analysis of ocean container freight pressures and adopting ultra-thin high-tensile stretch wrap to optimize payload weights.</p>', 'Market News', 'Asia-Europe Ocean Freight Indices & Weight-Reduction Packaging Solutions', 'Analysis of ocean container freight pressures and adopting ultra-thin high-tensile stretch wrap to optimize payload weights.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'アジア〜欧州航路の海上運賃指標と軽量化包装ソリューション', 'コンテナ運賃高騰の背景と、積載効率を最大化する超薄型高強度フィルムの活用法。', '<p>コンテナ運賃高騰の背景と、積載効率を最大化する超薄型高強度フィルムの活用法。</p>', '市場ニュース', 'アジア〜欧州航路の海上運賃指標と軽量化包装ソリューション', 'コンテナ運賃高騰の背景と、積載効率を最大化する超薄型高強度フィルムの活用法。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'market-news-fdi-tech-investment-vietnam', 'Bức tranh thu hút vốn FDI công nghệ cao năm 2026 tại miền Bắc và miền Nam', 'Các tập đoàn đa quốc gia gia tăng đầu tư vào nhà máy sản xuất bo mạch và đòi hỏi tiêu chuẩn nội địa hóa vật tư phụ trợ khắt khe.', '/images/resources/autohtml/thumb10.png',
    'ULINK Economic Advisory', 'Chuyên gia Kinh tế Công nghiệp', '/images/about/op-team.webp',
    'market-news', 'Tin thị trường', '2026-01-09T17:00:00.000Z'::timestamptz,
    'published', 'Bức tranh thu hút vốn FDI công nghệ cao năm 2026 tại miền Bắc và miền Nam', 'Các tập đoàn đa quốc gia gia tăng đầu tư vào nhà máy sản xuất bo mạch và đòi hỏi tiêu chuẩn nội địa hóa vật tư phụ trợ khắt khe.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Bức tranh thu hút vốn FDI công nghệ cao năm 2026 tại miền Bắc và miền Nam', 'Các tập đoàn đa quốc gia gia tăng đầu tư vào nhà máy sản xuất bo mạch và đòi hỏi tiêu chuẩn nội địa hóa vật tư phụ trợ khắt khe.', '<p>Các tập đoàn đa quốc gia gia tăng đầu tư vào nhà máy sản xuất bo mạch và đòi hỏi tiêu chuẩn nội địa hóa vật tư phụ trợ khắt khe.</p>', 'Tin thị trường', 'Bức tranh thu hút vốn FDI công nghệ cao năm 2026 tại miền Bắc và miền Nam', 'Các tập đoàn đa quốc gia gia tăng đầu tư vào nhà máy sản xuất bo mạch và đòi hỏi tiêu chuẩn nội địa hóa vật tư phụ trợ khắt khe.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', '2026 High-Tech FDI Inflow Landscape in Northern & Southern Vietnam', 'Multinational corporations ramp up motherboard assembly investments, demanding stringent domestic sourcing compliance.', '<p>Multinational corporations ramp up motherboard assembly investments, demanding stringent domestic sourcing compliance.</p>', 'Market News', '2026 High-Tech FDI Inflow Landscape in Northern & Southern Vietnam', 'Multinational corporations ramp up motherboard assembly investments, demanding stringent domestic sourcing compliance.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '2026年ベトナム南北におけるハイテクFDI誘致動向', '多国籍企業による基板実装工場への投資拡大と、現地調達資材に対する厳格な品質要求。', '<p>多国籍企業による基板実装工場への投資拡大と、現地調達資材に対する厳格な品質要求。</p>', '市場ニュース', '2026年ベトナム南北におけるハイテクFDI誘致動向', '多国籍企業による基板実装工場への投資拡大と、現地調達資材に対する厳格な品質要求。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'news-1', 'Giải pháp đóng gói công nghiệp tối ưu', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.', '/images/home/news/image (9).png',
    'Nguyễn Minh Tuấn', 'Trưởng phòng Đóng gói', '/images/regional_hubs/hub-2/KennyTran.png',
    'Tin tức', 'Catalogue', '2026-07-21T17:00:00.000Z'::timestamptz,
    'published', 'Giải pháp đóng gói công nghiệp tối ưu', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Giải pháp đóng gói công nghiệp tối ưu', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.', '<p>Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.</p>', 'Catalogue', 'Giải pháp đóng gói công nghiệp tối ưu', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Optimal Industrial Packaging Solutions', 'Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.', '<p>Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.</p>', 'Catalogue', 'Optimal Industrial Packaging Solutions', 'Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '最適な産業用包装ソリューション', '飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。', '<p>飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。</p>', 'カタログ', '最適な産業用包装ソリューション', '飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'news-2', 'Giải pháp đóng gói công nghiệp tối ưu - Tiêu chuẩn kỹ thuật', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.', '/images/home/news/image (10).png',
    'Lê Quốc Hưng', 'Quản lý Kho vận', '/images/regional_hubs/hub-2/QuangTran.png',
    'Tin tức', 'Tài liệu kỹ thuật', '2026-07-19T17:00:00.000Z'::timestamptz,
    'published', 'Giải pháp đóng gói công nghiệp tối ưu - Tiêu chuẩn kỹ thuật', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Giải pháp đóng gói công nghiệp tối ưu - Tiêu chuẩn kỹ thuật', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.', '<p>Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.</p>', 'Tài liệu kỹ thuật', 'Giải pháp đóng gói công nghiệp tối ưu - Tiêu chuẩn kỹ thuật', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Optimal Industrial Packaging Solutions - Technical Standards', 'Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.', '<p>Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.</p>', 'Technical Document', 'Optimal Industrial Packaging Solutions - Technical Standards', 'Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '最適な産業用包装ソリューション - 技術基準', '飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。', '<p>飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。</p>', '技術資料', '最適な産業用包装ソリューション - 技術基準', '飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'news-3', 'Giải pháp đóng gói công nghiệp tối ưu - Quy trình triển khai', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.', '/images/home/news/image (11).png',
    'Trần Thị Hồng Nhung', 'Giám đốc Sản xuất', '/images/regional_hubs/hub-2/KennyTran.png',
    'Tin tức', 'Catalogue', '2026-07-21T17:00:00.000Z'::timestamptz,
    'published', 'Giải pháp đóng gói công nghiệp tối ưu - Quy trình triển khai', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Giải pháp đóng gói công nghiệp tối ưu - Quy trình triển khai', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.', '<p>Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.</p>', 'Catalogue', 'Giải pháp đóng gói công nghiệp tối ưu - Quy trình triển khai', 'Để cố định cụm nhiều chai nước ngọt, bia, hoặc lốc sữa hộp thành các khối chắc chắn, tiện lợi cho việc lưu kho và phân phối.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Optimal Industrial Packaging Solutions - Deployment Workflow', 'Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.', '<p>Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.</p>', 'Catalogue', 'Optimal Industrial Packaging Solutions - Deployment Workflow', 'Securely bundle beverages, canned goods, and dairy multipacks into stable units for streamlined warehousing and distribution.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '最適な産業用包装ソリューション - 導入プロセス', '飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。', '<p>飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。</p>', 'カタログ', '最適な産業用包装ソリューション - 導入プロセス', '飲料、缶詰、乳製品マルチパックを強固に結束し、倉庫保管と配送を効率化する最適包装ソリューション。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'news-ha-nam-logistics-hub-launch', 'ULink chính thức khánh thành Tổng kho phân phối kỹ thuật Hà Nam 15.000m²', 'Trung tâm kho vận đạt chuẩn kiểm soát nhiệt ẩm 24/7, cung ứng hỏa tốc trong 4 giờ tới các khu công nghiệp Hà Nam, Hà Nội và Bắc Ninh.', '/images/resources/autohtml/thumb11.png',
    'Ban Truyền thông ULink', 'ULink Newsroom', '/images/logo/image.png',
    'Tin tức', 'Tin tức', '2026-02-15T17:00:00.000Z'::timestamptz,
    'published', 'ULink chính thức khánh thành Tổng kho phân phối kỹ thuật Hà Nam 15.000m²', 'Trung tâm kho vận đạt chuẩn kiểm soát nhiệt ẩm 24/7, cung ứng hỏa tốc trong 4 giờ tới các khu công nghiệp Hà Nam, Hà Nội và Bắc Ninh.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'ULink chính thức khánh thành Tổng kho phân phối kỹ thuật Hà Nam 15.000m²', 'Trung tâm kho vận đạt chuẩn kiểm soát nhiệt ẩm 24/7, cung ứng hỏa tốc trong 4 giờ tới các khu công nghiệp Hà Nam, Hà Nội và Bắc Ninh.', '<p>Trung tâm kho vận đạt chuẩn kiểm soát nhiệt ẩm 24/7, cung ứng hỏa tốc trong 4 giờ tới các khu công nghiệp Hà Nam, Hà Nội và Bắc Ninh.</p>', 'Tin tức', 'ULink chính thức khánh thành Tổng kho phân phối kỹ thuật Hà Nam 15.000m²', 'Trung tâm kho vận đạt chuẩn kiểm soát nhiệt ẩm 24/7, cung ứng hỏa tốc trong 4 giờ tới các khu công nghiệp Hà Nam, Hà Nội và Bắc Ninh.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'ULink Officially Inaugurates 15,000m² Ha Nam Technical Distribution Hub', 'Temperature and humidity controlled warehouse facility ensuring 4-hour express delivery to industrial parks across Northern Vietnam.', '<p>Temperature and humidity controlled warehouse facility ensuring 4-hour express delivery to industrial parks across Northern Vietnam.</p>', 'News', 'ULink Officially Inaugurates 15,000m² Ha Nam Technical Distribution Hub', 'Temperature and humidity controlled warehouse facility ensuring 4-hour express delivery to industrial parks across Northern Vietnam.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'ULink、ハナムに15,000m²のテクニカル物流ハブを正式開設', '24時間温湿度管理対応の物流拠点で、ハナム・ハノイ・バクニンの工業団地へ4時間以内の特急配送を実現。', '<p>24時間温湿度管理対応の物流拠点で、ハナム・ハノイ・バクニンの工業団地へ4時間以内の特急配送を実現。</p>', 'ニュース', 'ULink、ハナムに15,000m²のテクニカル物流ハブを正式開設', '24時間温湿度管理対応の物流拠点で、ハナム・ハノイ・バクニンの工業団地へ4時間以内の特急配送を実現。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'news-japan-esd-cleanroom-partnership', 'ULink ký kết hợp tác chiến lược cung ứng vật tư phòng sạch với đối tác Nhật Bản', 'Hợp tác chuyển giao công nghệ màng dính bảo vệ bề mặt quang học không bóng khí và thảm cao su chống tĩnh điện thế hệ mới.', '/images/resources/autohtml/thumb12.png',
    'Phòng Hợp tác Quốc tế ULink', 'Ban Đối ngoại Doanh nghiệp', '/images/logo/image.png',
    'Tin tức', 'Tin tức', '2026-02-07T17:00:00.000Z'::timestamptz,
    'published', 'ULink ký kết hợp tác chiến lược cung ứng vật tư phòng sạch với đối tác Nhật Bản', 'Hợp tác chuyển giao công nghệ màng dính bảo vệ bề mặt quang học không bóng khí và thảm cao su chống tĩnh điện thế hệ mới.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'ULink ký kết hợp tác chiến lược cung ứng vật tư phòng sạch với đối tác Nhật Bản', 'Hợp tác chuyển giao công nghệ màng dính bảo vệ bề mặt quang học không bóng khí và thảm cao su chống tĩnh điện thế hệ mới.', '<p>Hợp tác chuyển giao công nghệ màng dính bảo vệ bề mặt quang học không bóng khí và thảm cao su chống tĩnh điện thế hệ mới.</p>', 'Tin tức', 'ULink ký kết hợp tác chiến lược cung ứng vật tư phòng sạch với đối tác Nhật Bản', 'Hợp tác chuyển giao công nghệ màng dính bảo vệ bề mặt quang học không bóng khí và thảm cao su chống tĩnh điện thế hệ mới.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'ULink Inks Strategic Cleanroom & ESD Supply Partnership with Japanese Maker', 'Technology transfer agreement on bubble-free optical surface protective films and next-gen conductive rubber mats.', '<p>Technology transfer agreement on bubble-free optical surface protective films and next-gen conductive rubber mats.</p>', 'News', 'ULink Inks Strategic Cleanroom & ESD Supply Partnership with Japanese Maker', 'Technology transfer agreement on bubble-free optical surface protective films and next-gen conductive rubber mats.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'ULink、日本の大手メーカーとクリーンルーム＆ESD資材の戦略的提携を締結', '気泡ゼロの光学用表面保護フィルムおよび次世代導電性ゴムマットの技術提携に合意。', '<p>気泡ゼロの光学用表面保護フィルムおよび次世代導電性ゴムマットの技術提携に合意。</p>', 'ニュース', 'ULink、日本の大手メーカーとクリーンルーム＆ESD資材の戦略的提携を締結', '気泡ゼロの光学用表面保護フィルムおよび次世代導電性ゴムマットの技術提携に合意。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'news-b2b-platform-instant-sku-pricing', 'Ra mắt nền tảng mua sắm B2B trực tuyến với tính năng tra cứu SKU tức thì', 'Hệ thống số hóa quy trình báo giá, hợp đồng điện tử và tra cứu thông số kỹ thuật 5.000+ mã vật tư công nghiệp chỉ trong 30 giây.', '/images/resources/autohtml/thumb13.png',
    'ULink Digital Transformation', 'Nhóm Phát triển Nền tảng', '/images/logo/image.png',
    'Tin tức', 'Tin tức', '2026-01-31T17:00:00.000Z'::timestamptz,
    'published', 'Ra mắt nền tảng mua sắm B2B trực tuyến với tính năng tra cứu SKU tức thì', 'Hệ thống số hóa quy trình báo giá, hợp đồng điện tử và tra cứu thông số kỹ thuật 5.000+ mã vật tư công nghiệp chỉ trong 30 giây.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Ra mắt nền tảng mua sắm B2B trực tuyến với tính năng tra cứu SKU tức thì', 'Hệ thống số hóa quy trình báo giá, hợp đồng điện tử và tra cứu thông số kỹ thuật 5.000+ mã vật tư công nghiệp chỉ trong 30 giây.', '<p>Hệ thống số hóa quy trình báo giá, hợp đồng điện tử và tra cứu thông số kỹ thuật 5.000+ mã vật tư công nghiệp chỉ trong 30 giây.</p>', 'Tin tức', 'Ra mắt nền tảng mua sắm B2B trực tuyến với tính năng tra cứu SKU tức thì', 'Hệ thống số hóa quy trình báo giá, hợp đồng điện tử và tra cứu thông số kỹ thuật 5.000+ mã vật tư công nghiệp chỉ trong 30 giây.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Launching ULink B2B Digital Platform with Instant SKU Lookup & Dynamic RFQ', 'Digitized quotation, e-contracting, and instant technical datasheet access for 5,000+ industrial SKUs in under 30 seconds.', '<p>Digitized quotation, e-contracting, and instant technical datasheet access for 5,000+ industrial SKUs in under 30 seconds.</p>', 'News', 'Launching ULink B2B Digital Platform with Instant SKU Lookup & Dynamic RFQ', 'Digitized quotation, e-contracting, and instant technical datasheet access for 5,000+ industrial SKUs in under 30 seconds.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '即時SKU検索および動的RFQ機能を備えたULink B2Bポータルを正式公開', '5,000点以上の産業用資材の仕様書閲覧、見積もり、電子契約を30秒で完結するデジタル基盤。', '<p>5,000点以上の産業用資材の仕様書閲覧、見積もり、電子契約を30秒で完結するデジタル基盤。</p>', 'ニュース', '即時SKU検索および動的RFQ機能を備えたULink B2Bポータルを正式公開', '5,000点以上の産業用資材の仕様書閲覧、見積もり、電子契約を30秒で完結するデジタル基盤。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'news-net-zero-recycled-packaging-line', 'ULink công bố dòng sản phẩm màng quấn PE tái chế 30% PCR đạt chứng nhận GRS', 'Giải pháp bao bì bền vững hỗ trợ các nhà sản xuất đa quốc gia đạt chứng nhận giảm phát thải carbon Scope 3 theo mục tiêu Net Zero.', '/images/resources/autohtml/thumb14.png',
    'Ban Phát triển Bền vững ULink', 'Chuyên viên Phát triển Bền vững', '/images/logo/image.png',
    'Tin tức', 'Tin tức', '2026-01-21T17:00:00.000Z'::timestamptz,
    'published', 'ULink công bố dòng sản phẩm màng quấn PE tái chế 30% PCR đạt chứng nhận GRS', 'Giải pháp bao bì bền vững hỗ trợ các nhà sản xuất đa quốc gia đạt chứng nhận giảm phát thải carbon Scope 3 theo mục tiêu Net Zero.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'ULink công bố dòng sản phẩm màng quấn PE tái chế 30% PCR đạt chứng nhận GRS', 'Giải pháp bao bì bền vững hỗ trợ các nhà sản xuất đa quốc gia đạt chứng nhận giảm phát thải carbon Scope 3 theo mục tiêu Net Zero.', '<p>Giải pháp bao bì bền vững hỗ trợ các nhà sản xuất đa quốc gia đạt chứng nhận giảm phát thải carbon Scope 3 theo mục tiêu Net Zero.</p>', 'Tin tức', 'ULink công bố dòng sản phẩm màng quấn PE tái chế 30% PCR đạt chứng nhận GRS', 'Giải pháp bao bì bền vững hỗ trợ các nhà sản xuất đa quốc gia đạt chứng nhận giảm phát thải carbon Scope 3 theo mục tiêu Net Zero.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'ULink Unveils 30% Post-Consumer Recycled (PCR) Stretch Film with GRS Badge', 'Sustainable packaging line aiding global enterprises in meeting Scope 3 carbon reduction and Net Zero milestones.', '<p>Sustainable packaging line aiding global enterprises in meeting Scope 3 carbon reduction and Net Zero milestones.</p>', 'News', 'ULink Unveils 30% Post-Consumer Recycled (PCR) Stretch Film with GRS Badge', 'Sustainable packaging line aiding global enterprises in meeting Scope 3 carbon reduction and Net Zero milestones.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'ULink、GRS認証取得のPCR30%再生PEストレッチフィルムを発売', 'Scope 3二酸化炭素排出削減とネットゼロ目標達成を支援する持続可能な包装ソリューション。', '<p>Scope 3二酸化炭素排出削減とネットゼロ目標達成を支援する持続可能な包装ソリューション。</p>', 'ニュース', 'ULink、GRS認証取得のPCR30%再生PEストレッチフィルムを発売', 'Scope 3二酸化炭素排出削減とネットゼロ目標達成を支援する持続可能な包装ソリューション。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'news-iso-dual-audit-passed-2026', 'ULink hoàn thành xuất sắc kỳ đánh giá giám sát kép ISO 9001 & ISO 14001', 'Tổ chức chứng nhận quốc tế SGS ghi nhận tỷ lệ tuân thủ chất lượng 99.8% trong toàn bộ quy trình lưu kho và phân phối.', '/images/resources/autohtml/thumb15.png',
    'Ban Đảm bảo Chất lượng', 'Trưởng ban Đảm bảo Chất lượng', '/images/logo/image.png',
    'Tin tức', 'Tin tức', '2026-01-14T17:00:00.000Z'::timestamptz,
    'published', 'ULink hoàn thành xuất sắc kỳ đánh giá giám sát kép ISO 9001 & ISO 14001', 'Tổ chức chứng nhận quốc tế SGS ghi nhận tỷ lệ tuân thủ chất lượng 99.8% trong toàn bộ quy trình lưu kho và phân phối.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'ULink hoàn thành xuất sắc kỳ đánh giá giám sát kép ISO 9001 & ISO 14001', 'Tổ chức chứng nhận quốc tế SGS ghi nhận tỷ lệ tuân thủ chất lượng 99.8% trong toàn bộ quy trình lưu kho và phân phối.', '<p>Tổ chức chứng nhận quốc tế SGS ghi nhận tỷ lệ tuân thủ chất lượng 99.8% trong toàn bộ quy trình lưu kho và phân phối.</p>', 'Tin tức', 'ULink hoàn thành xuất sắc kỳ đánh giá giám sát kép ISO 9001 & ISO 14001', 'Tổ chức chứng nhận quốc tế SGS ghi nhận tỷ lệ tuân thủ chất lượng 99.8% trong toàn bộ quy trình lưu kho và phân phối.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'ULink Successfully Passes ISO 9001 & ISO 14001 Annual Surveillance Audit', 'SGS certification body certifies 99.8% quality compliance across warehousing, testing, and delivery workflows.', '<p>SGS certification body certifies 99.8% quality compliance across warehousing, testing, and delivery workflows.</p>', 'News', 'ULink Successfully Passes ISO 9001 & ISO 14001 Annual Surveillance Audit', 'SGS certification body certifies 99.8% quality compliance across warehousing, testing, and delivery workflows.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'ULink、ISO 9001およびISO 14001の年次定期審査を優良判定で完了', 'SGS国際認証機関による審査で、倉庫保管・検査・配送プロセス全体で99.8%の品質適合率を達成。', '<p>SGS国際認証機関による審査で、倉庫保管・検査・配送プロセス全体で99.8%の品質適合率を達成。</p>', 'ニュース', 'ULink、ISO 9001およびISO 14001の年次定期審査を優良判定で完了', 'SGS国際認証機関による審査で、倉庫保管・検査・配送プロセス全体で99.8%の品質適合率を達成。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'news-customer-conference-2026-recap', 'Tổng kết Hội nghị Khách hàng Doanh nghiệp ULink thường niên năm 2026', 'Hơn 200 đại diện doanh nghiệp FDI và nhà thầu cơ điện tham dự, chia sẻ giải pháp tối ưu hóa chi phí thu mua vật tư kỹ thuật.', '/images/resources/autohtml/thumb16.png',
    'Ban Tổ chức Sự kiện ULink', 'Điều phối viên Sự kiện', '/images/logo/image.png',
    'Tin tức', 'Tin tức', '2026-01-06T17:00:00.000Z'::timestamptz,
    'published', 'Tổng kết Hội nghị Khách hàng Doanh nghiệp ULink thường niên năm 2026', 'Hơn 200 đại diện doanh nghiệp FDI và nhà thầu cơ điện tham dự, chia sẻ giải pháp tối ưu hóa chi phí thu mua vật tư kỹ thuật.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Tổng kết Hội nghị Khách hàng Doanh nghiệp ULink thường niên năm 2026', 'Hơn 200 đại diện doanh nghiệp FDI và nhà thầu cơ điện tham dự, chia sẻ giải pháp tối ưu hóa chi phí thu mua vật tư kỹ thuật.', '<p>Hơn 200 đại diện doanh nghiệp FDI và nhà thầu cơ điện tham dự, chia sẻ giải pháp tối ưu hóa chi phí thu mua vật tư kỹ thuật.</p>', 'Tin tức', 'Tổng kết Hội nghị Khách hàng Doanh nghiệp ULink thường niên năm 2026', 'Hơn 200 đại diện doanh nghiệp FDI và nhà thầu cơ điện tham dự, chia sẻ giải pháp tối ưu hóa chi phí thu mua vật tư kỹ thuật.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Recap: ULink Annual Enterprise Customer Conference 2026', 'Over 200 FDI enterprise leads and M&E contractors gathered to share technical material procurement optimization models.', '<p>Over 200 FDI enterprise leads and M&amp;E contractors gathered to share technical material procurement optimization models.</p>', 'News', 'Recap: ULink Annual Enterprise Customer Conference 2026', 'Over 200 FDI enterprise leads and M&E contractors gathered to share technical material procurement optimization models.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '2026年ULink年次法人顧客カンファレンス開催レポート', '200社を超えるFDI企業および設備工事業者が参加し、資材調達コスト最適化のベストプラクティスを共有。', '<p>200社を超えるFDI企業および設備工事業者が参加し、資材調達コスト最適化のベストプラクティスを共有。</p>', 'ニュース', '2026年ULink年次法人顧客カンファレンス開催レポート', '200社を超えるFDI企業および設備工事業者が参加し、資材調達コスト最適化のベストプラクティスを共有。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'ev-001', 'Hội thảo chuyên đề: Kiểm soát phòng sạch & Tiêu chuẩn ISO 14644', 'Hội thảo chuyên sâu về các giải pháp kiểm soát phòng sạch và ứng dụng tiêu chuẩn quốc tế ISO 14644 trong nhà xưởng công nghiệp bán dẫn & dược phẩm.', '/images/resources/events/event (1).png',
    'ULINK Events Bureau', 'Ban Tổ chức Sự kiện', '/images/about/op-team.webp',
    'Sự kiện', 'Sự kiện', '2026-08-14T17:00:00.000Z'::timestamptz,
    'published', 'Hội thảo chuyên đề: Kiểm soát phòng sạch & Tiêu chuẩn ISO 14644', 'Hội thảo chuyên sâu về các giải pháp kiểm soát phòng sạch và ứng dụng tiêu chuẩn quốc tế ISO 14644 trong nhà xưởng công nghiệp bán dẫn & dược phẩm.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Hội thảo chuyên đề: Kiểm soát phòng sạch & Tiêu chuẩn ISO 14644', 'Hội thảo chuyên sâu về các giải pháp kiểm soát phòng sạch và ứng dụng tiêu chuẩn quốc tế ISO 14644 trong nhà xưởng công nghiệp bán dẫn & dược phẩm.', '<p>Hội thảo chuyên sâu về các giải pháp kiểm soát phòng sạch và ứng dụng tiêu chuẩn quốc tế ISO 14644 trong nhà xưởng công nghiệp bán dẫn &amp; dược phẩm.</p>', 'Sự kiện', 'Hội thảo chuyên đề: Kiểm soát phòng sạch & Tiêu chuẩn ISO 14644', 'Hội thảo chuyên sâu về các giải pháp kiểm soát phòng sạch và ứng dụng tiêu chuẩn quốc tế ISO 14644 trong nhà xưởng công nghiệp bán dẫn & dược phẩm.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Cleanroom Technology Seminar: ISO 14644 Compliance', 'In-depth seminar on cleanroom contamination control and practical ISO 14644 implementation in semiconductor & pharmaceutical plants.', '<p>In-depth seminar on cleanroom contamination control and practical ISO 14644 implementation in semiconductor &amp; pharmaceutical plants.</p>', 'Events', 'Cleanroom Technology Seminar: ISO 14644 Compliance', 'In-depth seminar on cleanroom contamination control and practical ISO 14644 implementation in semiconductor & pharmaceutical plants.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'クリーンルーム技術セミナー：ISO 14644適合の実務', '半導体・医薬品工場におけるクリーンルーム汚染制御とISO 14644国際規格の実践的導入に関する専門セミナー。', '<p>半導体・医薬品工場におけるクリーンルーム汚染制御とISO 14644国際規格の実践的導入に関する専門セミナー。</p>', 'イベント', 'クリーンルーム技術セミナー：ISO 14644適合の実務', '半導体・医薬品工場におけるクリーンルーム汚染制御とISO 14644国際規格の実践的導入に関する専門セミナー。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'ev-002', 'B2B Business Networking: Kết nối chuỗi cung ứng công nghiệp phụ trợ 2026', 'Sự kiện kết nối các nhà sản xuất, nhà phân phối và doanh nghiệp công nghiệp hàng đầu khu vực miền Bắc tại Hà Nội.', '/images/resources/events/event (2).png',
    'ULINK Commercial Team', 'Ban Kết nối Doanh nghiệp', '/images/about/op-team.webp',
    'Sự kiện', 'Sự kiện', '2026-08-21T17:00:00.000Z'::timestamptz,
    'published', 'B2B Business Networking: Kết nối chuỗi cung ứng công nghiệp phụ trợ 2026', 'Sự kiện kết nối các nhà sản xuất, nhà phân phối và doanh nghiệp công nghiệp hàng đầu khu vực miền Bắc tại Hà Nội.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'B2B Business Networking: Kết nối chuỗi cung ứng công nghiệp phụ trợ 2026', 'Sự kiện kết nối các nhà sản xuất, nhà phân phối và doanh nghiệp công nghiệp hàng đầu khu vực miền Bắc tại Hà Nội.', '<p>Sự kiện kết nối các nhà sản xuất, nhà phân phối và doanh nghiệp công nghiệp hàng đầu khu vực miền Bắc tại Hà Nội.</p>', 'Sự kiện', 'B2B Business Networking: Kết nối chuỗi cung ứng công nghiệp phụ trợ 2026', 'Sự kiện kết nối các nhà sản xuất, nhà phân phối và doanh nghiệp công nghiệp hàng đầu khu vực miền Bắc tại Hà Nội.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'B2B Business Networking: Supporting Industries Supply Chain 2026', 'Premier networking mixer for industrial manufacturers, tier-1 suppliers, and enterprise buyers in Northern Vietnam.', '<p>Premier networking mixer for industrial manufacturers, tier-1 suppliers, and enterprise buyers in Northern Vietnam.</p>', 'Events', 'B2B Business Networking: Supporting Industries Supply Chain 2026', 'Premier networking mixer for industrial manufacturers, tier-1 suppliers, and enterprise buyers in Northern Vietnam.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'B2Bビジネスネットワーキング：裾野産業サプライチェーン接続2026', 'ハノイで開催される北部地域トップの産業メーカー、サプライヤー、購買企業向けビジネスマッチングイベント。', '<p>ハノイで開催される北部地域トップの産業メーカー、サプライヤー、購買企業向けビジネスマッチングイベント。</p>', 'イベント', 'B2Bビジネスネットワーキング：裾野産業サプライチェーン接続2026', 'ハノイで開催される北部地域トップの産業メーカー、サプライヤー、購買企業向けビジネスマッチングイベント。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'ev-003', 'Tọa đàm chuyên gia: Xu hướng tự động hóa & Công nghiệp 4.0 trong chuỗi logistics', 'Cập nhật các giải pháp công nghệ đóng gói tự động, robot kho hàng AGV và số hóa chuỗi cung ứng công nghiệp hiện đại.', '/images/resources/events/event (3).png',
    'ULINK Tech Forum', 'Hội đồng Khoa học Kỹ thuật', '/images/about/op-team.webp',
    'Sự kiện', 'Sự kiện', '2026-09-04T17:00:00.000Z'::timestamptz,
    'published', 'Tọa đàm chuyên gia: Xu hướng tự động hóa & Công nghiệp 4.0 trong chuỗi logistics', 'Cập nhật các giải pháp công nghệ đóng gói tự động, robot kho hàng AGV và số hóa chuỗi cung ứng công nghiệp hiện đại.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Tọa đàm chuyên gia: Xu hướng tự động hóa & Công nghiệp 4.0 trong chuỗi logistics', 'Cập nhật các giải pháp công nghệ đóng gói tự động, robot kho hàng AGV và số hóa chuỗi cung ứng công nghiệp hiện đại.', '<p>Cập nhật các giải pháp công nghệ đóng gói tự động, robot kho hàng AGV và số hóa chuỗi cung ứng công nghiệp hiện đại.</p>', 'Sự kiện', 'Tọa đàm chuyên gia: Xu hướng tự động hóa & Công nghiệp 4.0 trong chuỗi logistics', 'Cập nhật các giải pháp công nghệ đóng gói tự động, robot kho hàng AGV và số hóa chuỗi cung ứng công nghiệp hiện đại.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Expert Panel: Automation & Industry 4.0 in Modern Supply Chains', 'Showcasing automated packaging machinery, AGV warehouse robots, and end-to-end supply chain digitization frameworks.', '<p>Showcasing automated packaging machinery, AGV warehouse robots, and end-to-end supply chain digitization frameworks.</p>', 'Events', 'Expert Panel: Automation & Industry 4.0 in Modern Supply Chains', 'Showcasing automated packaging machinery, AGV warehouse robots, and end-to-end supply chain digitization frameworks.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', '専門家パネル：現代サプライチェーンにおける自動化とインダストリー4.0', '自動包装ライン、AGV無人搬送車、最先端サプライチェーンのデジタルトランスフォーメーション最新動向。', '<p>自動包装ライン、AGV無人搬送車、最先端サプライチェーンのデジタルトランスフォーメーション最新動向。</p>', 'イベント', '専門家パネル：現代サプライチェーンにおける自動化とインダストリー4.0', '自動包装ライン、AGV無人搬送車、最先端サプライチェーンのデジタルトランスフォーメーション最新動向。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'ev-004', 'Workshop: Kỹ thuật kiểm soát tĩnh điện ESD S20.20 cho kỹ sư nhà máy', 'Thực hành đo điện áp bước người, kiểm tra điện trở mặt bàn thao tác và hiệu chuẩn ionizer với thiết bị đo chuyên dụng.', '/images/resources/autohtml/thumb17.png',
    'ULINK Academy', 'Trung tâm Đào tạo Kỹ thuật', '/images/about/op-team.webp',
    'Sự kiện', 'Sự kiện', '2026-09-17T17:00:00.000Z'::timestamptz,
    'published', 'Workshop: Kỹ thuật kiểm soát tĩnh điện ESD S20.20 cho kỹ sư nhà máy', 'Thực hành đo điện áp bước người, kiểm tra điện trở mặt bàn thao tác và hiệu chuẩn ionizer với thiết bị đo chuyên dụng.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Workshop: Kỹ thuật kiểm soát tĩnh điện ESD S20.20 cho kỹ sư nhà máy', 'Thực hành đo điện áp bước người, kiểm tra điện trở mặt bàn thao tác và hiệu chuẩn ionizer với thiết bị đo chuyên dụng.', '<p>Thực hành đo điện áp bước người, kiểm tra điện trở mặt bàn thao tác và hiệu chuẩn ionizer với thiết bị đo chuyên dụng.</p>', 'Sự kiện', 'Workshop: Kỹ thuật kiểm soát tĩnh điện ESD S20.20 cho kỹ sư nhà máy', 'Thực hành đo điện áp bước người, kiểm tra điện trở mặt bàn thao tác và hiệu chuẩn ionizer với thiết bị đo chuyên dụng.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'Workshop: ESD S20.20 Static Control Practices for Plant Engineers', 'Hands-on training in measuring body walking voltage, surface resistance validation, and ionizer calibration.', '<p>Hands-on training in measuring body walking voltage, surface resistance validation, and ionizer calibration.</p>', 'Events', 'Workshop: ESD S20.20 Static Control Practices for Plant Engineers', 'Hands-on training in measuring body walking voltage, surface resistance validation, and ionizer calibration.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'ワークショップ：工場エンジニア向けESD S20.20静電気対策実務', '人体歩行帯電位測定、作業面抵抗値検証、専用測定器を用いたイオナイザー校正の実践講座。', '<p>人体歩行帯電位測定、作業面抵抗値検証、専用測定器を用いたイオナイザー校正の実践講座。</p>', 'イベント', 'ワークショップ：工場エンジニア向けESD S20.20静電気対策実務', '人体歩行帯電位測定、作業面抵抗値検証、専用測定器を用いたイオナイザー校正の実践講座。'
  );
END $$;


DO $$
DECLARE
  v_post_id integer;
BEGIN
  INSERT INTO public.blog_posts (
    slug, title, description, cover, author, author_role, author_avatar,
    category, badge, published_at, status, meta_title, meta_description
  ) VALUES (
    'ev-005', 'Triển lãm Quốc tế Công nghiệp Hỗ trợ & Chế tạo VIMEXPO 2026', 'Gian hàng ULink giới thiệu các giải pháp vật liệu bảo vệ bề mặt cao cấp, băng keo kỹ thuật HVAC và bao bì xuất khẩu thế hệ mới.', '/images/resources/autohtml/thumb18.png',
    'ULINK Exhibition Team', 'Ban Triển lãm Quốc tế', '/images/logo/image.png',
    'Sự kiện', 'Sự kiện', '2026-10-24T17:00:00.000Z'::timestamptz,
    'published', 'Triển lãm Quốc tế Công nghiệp Hỗ trợ & Chế tạo VIMEXPO 2026', 'Gian hàng ULink giới thiệu các giải pháp vật liệu bảo vệ bề mặt cao cấp, băng keo kỹ thuật HVAC và bao bì xuất khẩu thế hệ mới.'
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover = EXCLUDED.cover,
    author = EXCLUDED.author,
    author_role = EXCLUDED.author_role,
    author_avatar = EXCLUDED.author_avatar,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    published_at = EXCLUDED.published_at,
    status = 'published',
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_post_id;

  DELETE FROM public.blog_posts_translations WHERE blog_posts_id = v_post_id;

  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'vi', 'Triển lãm Quốc tế Công nghiệp Hỗ trợ & Chế tạo VIMEXPO 2026', 'Gian hàng ULink giới thiệu các giải pháp vật liệu bảo vệ bề mặt cao cấp, băng keo kỹ thuật HVAC và bao bì xuất khẩu thế hệ mới.', '<p>Gian hàng ULink giới thiệu các giải pháp vật liệu bảo vệ bề mặt cao cấp, băng keo kỹ thuật HVAC và bao bì xuất khẩu thế hệ mới.</p>', 'Sự kiện', 'Triển lãm Quốc tế Công nghiệp Hỗ trợ & Chế tạo VIMEXPO 2026', 'Gian hàng ULink giới thiệu các giải pháp vật liệu bảo vệ bề mặt cao cấp, băng keo kỹ thuật HVAC và bao bì xuất khẩu thế hệ mới.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'en', 'VIMEXPO 2026: Vietnam International Supporting Industry Exhibition', 'ULink pavilion displaying premium surface protection films, HVAC specialty tapes, and next-generation export wraps.', '<p>ULink pavilion displaying premium surface protection films, HVAC specialty tapes, and next-generation export wraps.</p>', 'Events', 'VIMEXPO 2026: Vietnam International Supporting Industry Exhibition', 'ULink pavilion displaying premium surface protection films, HVAC specialty tapes, and next-generation export wraps.'
  );
  INSERT INTO public.blog_posts_translations (
    blog_posts_id, languages_code, title, description, body, badge, meta_title, meta_description
  ) VALUES (
    v_post_id, 'ja', 'VIMEXPO 2026：ベトナム国際裾野産業・製造業展示会', 'ULink特設ブースにて、高機能表面保護フィルム、HVAC特殊テープ、最新の輸出用梱包資材を展示。', '<p>ULink特設ブースにて、高機能表面保護フィルム、HVAC特殊テープ、最新の輸出用梱包資材を展示。</p>', 'イベント', 'VIMEXPO 2026：ベトナム国際裾野産業・製造業展示会', 'ULink特設ブースにて、高機能表面保護フィルム、HVAC特殊テープ、最新の輸出用梱包資材を展示。'
  );
END $$;

-- Reset sequences
SELECT setval('blog_posts_id_seq', COALESCE((SELECT MAX(id) FROM blog_posts), 1));
SELECT setval('blog_posts_translations_id_seq', COALESCE((SELECT MAX(id) FROM blog_posts_translations), 1));
SELECT setval('events_id_seq', COALESCE((SELECT MAX(id) FROM events), 1));
SELECT setval('events_translations_id_seq', COALESCE((SELECT MAX(id) FROM events_translations), 1));

COMMIT;

# ULINK INDUSTRIES
## Website UI/UX Brief & Navigation Specification
*B2B Procurement · Cleanroom & Packaging · Japanese Industrial Minimalism · SEO-first*

> **Mục đích:** Tài liệu brief cho UI/UX Designer và đội phát triển website ULink Industries trước khi dựng wireframe, UI mockup và prototype.  
> **Phạm vi:** Website public MVP: Home, Cụm KCN, Giải pháp/Sản phẩm, Ngành nghề, Tài nguyên, Về ULink, Liên hệ/RFQ. Có định hướng sẵn cho B2B Portal giai đoạn sau.  
> **Ngôn ngữ triển khai:** Tiếng Việt là ngôn ngữ chính; cấu trúc mở rộng VI / EN / JP.  
> **Ngày lập:** 16/06/2026  
> **Phiên bản:** v1.0 - UI/UX Brief & Navigation  

> [!NOTE]
> **Design Intent:** Thiết kế cần tạo cảm giác tin cậy, rõ ràng, chuẩn công nghiệp Nhật/Hàn; không quảng cáo quá đà. Người mua hàng B2B phải tìm đúng sản phẩm, chứng chỉ và yêu cầu báo giá nhanh nhất.

---

## Mục lục
1. [Bối cảnh & mục tiêu UX](#1-bối-cảnh--mục-tiêu-ux)
2. [Định vị sản phẩm số và nguyên tắc thiết kế](#2-định-vị-sản-phẩm-số-và-nguyên-tắc-thiết-kế)
3. [Chân dung người dùng và hành trình chính](#3-chân-dung-người-dùng-và-hành-trình-chính)
4. [Information Architecture & Sitemap](#4-information-architecture--sitemap)
5. [Navigation Specification](#5-navigation-specification)
6. [Page Brief theo từng template](#6-page-brief-theo-từng-template)
7. [SEO-first UX Requirements](#7-seo-first-ux-requirements)
8. [Mobile Navigation & Responsive Rules](#8-mobile-navigation--responsive-rules)
9. [Design System & Component Requirements](#9-design-system--component-requirements)
10. [UI/UX Handoff Checklist](#10-uiux-handoff-checklist)
11. [Review Gates & Acceptance Criteria](#11-review-gates--acceptance-criteria)

---

## 1. Bối cảnh & mục tiêu UX

ULink Industries cần một website **B2B Procurement Platform** cho nhóm vật tư phụ trợ công nghiệp, tập trung vào hai trục giải pháp: **phòng sạch** và **đóng gói**. Website không chỉ là brochure thương hiệu mà nơi user yêu cầu Báo giá/Mẫu (RFQ), tìm sản phẩm, tra cứu thông số kỹ thuật, chứng chỉ chất lượng và lựa chọn giải pháp theo ngành hoặc cụm khu công nghiệp.

- **Mục tiêu kinh doanh:** Tạo nền tảng B2B có khả năng mở rộng thành Procurement Portal và Supply Chain Hub.
- **Mục tiêu UX:** Giảm thời gian tìm sản phẩm/chứng chỉ, tăng số lượng RFQ đủ thông tin, tạo niềm tin với procurement, QA/QC và nhà máy FDI.
- **Mục tiêu SEO:** Mỗi nhóm sản phẩm, ngành ứng dụng và cụm KCN có landing page có cấu trúc URL, H1, metadata, internal link và schema rõ ràng.
- **Mục tiêu vận hành:** Thiết kế dễ cập nhật SKU, tài liệu kỹ thuật, bài viết, case study và form RFQ.

### 1.1 KPI trải nghiệm cần đo lường sau khi launch

| Nhóm KPI | Chỉ số cần theo dõi | Ý nghĩa UX |
| :--- | :--- | :--- |
| **Procurement conversion** | RFQ submit rate, request sample rate, product inquiry rate | Đo khả năng chuyển đổi từ traffic thành lead mua hàng. |
| **Product discovery** | Search usage, filter usage, product detail views/session | Đo khả năng người dùng tìm được đúng sản phẩm. |
| **Trust & qualification** | Download TDS/MSDS, ISO/SGS page views, case study views | Đo mức độ người dùng kiểm chứng năng lực ULink. |
| **SEO quality** | Organic clicks, indexed pages, ranking by category/industry/KCN keyword | Đo hiệu quả cấu trúc SEO-first. |
| **Performance** | PageSpeed desktop 90+, Core Web Vitals pass, mobile load speed | Đảm bảo website nhanh, ổn định, phù hợp B2B. |

---

## 2. Định vị sản phẩm số và nguyên tắc thiết kế

### 2.1 Product positioning

Website cần thể hiện ULink Industries là nền tảng cung ứng vật tư phụ trợ công nghiệp chuyên sâu, có năng lực tư vấn, kho vận và chuẩn hóa chất lượng cho nhà máy. Cấu trúc nội dung phải tránh cảm giác “trading catalogue rời rạc”; thay vào đó, website cần vận hành như một hệ thống procurement có phân loại, dữ liệu kỹ thuật và luồng RFQ rõ ràng.

| Trục định vị | Cách thể hiện trên UI/UX |
| :--- | :--- |
| **B2B Procurement** | Navigation theo nhu cầu mua hàng: sản phẩm, thông số, chứng chỉ, RFQ, SLA giao hàng. |
| **Cleanroom & Packaging** | Hai nhóm giải pháp được đặt làm trục chính trên Home, mega menu, category page và SEO landing page. |
| **Industrial trust** | Hiển thị ISO/SGS, TDS/MSDS, CO/CQ, quy trình làm việc, năng lực HUB Hà Nam và case ứng dụng. |
| **Cluster-based supply** | Landing page theo cụm KCN: Đồng Văn IV, Bắc Thăng Long, Bắc Ninh, Hưng Yên, Hải Phòng. |
| **SEO-first** | Mỗi intent tìm kiếm có trang đích riêng: sản phẩm, ngành, cụm KCN, tài liệu kỹ thuật. |

### 2.2 Design direction: Japanese Industrial Minimalism

| Nguyên tắc | Quy định thiết kế |
| :--- | :--- |
| **Tối giản có chức năng** | Không trang trí thừa. Mỗi block phải có vai trò: giải thích, chứng minh, điều hướng hoặc chuyển đổi. |
| **Rõ ràng như tài liệu kỹ thuật** | Ưu tiên bảng, nhãn, spec, icon line-art, khoảng trắng và thứ bậc thông tin. |
| **Màu công nghiệp** | Navy đậm làm nền nhận diện, Industrial Silver làm accent, trắng/xám nhạt làm nền đọc nội dung. |
| **Niềm tin hơn quảng cáo** | Tone copy ngắn, chắc, ít tính bán hàng. Nhấn vào chất lượng, SLA, tiêu chuẩn, năng lực giao hàng. |
| **Tối ưu tốc độ** | Giảm animation nặng; ảnh nén tốt; component rõ ràng; ưu tiên SSR/SEO. |

> [!TIP]
> **Rule of thumb cho designer:** Mỗi màn hình cần xác định được 3 câu: người dùng đang tìm gì, ULink chứng minh năng lực bằng dữ liệu nào, CTA tiếp theo là gì?

---

## 3. Chân dung người dùng và hành trình chính

| Persona | Nhu cầu chính | Nỗi đau | Luồng ưu tiên trên website |
| :--- | :--- | :--- | :--- |
| **Procurement Manager** | Tìm nhà cung cấp, so sánh sản phẩm, xin báo giá nhanh. | Thiếu thông số, MOQ, lead time, chứng chỉ; form RFQ mất thời gian. | Home → Giải pháp/Sản phẩm → Product Detail → RFQ Cart. |
| **QA/QC / EHS** | Kiểm tra tiêu chuẩn, chứng chỉ, tài liệu kỹ thuật. | Không có TDS/MSDS/ISO/SGS rõ ràng; thông tin không nhất quán. | Tài nguyên → Technical Documents / ISO → Product Detail. |
| **Factory Director** | Đánh giá năng lực cung ứng, độ tin cậy, phạm vi phục vụ. | Không rõ năng lực kho, SLA, kinh nghiệm ngành, khả năng cung ứng định kỳ. | Home → Cụm KCN → Case Studies → Contact. |
| **Planner / Warehouse** | Theo dõi lịch giao, đặt lại định kỳ, quản lý tồn kho. | Thiếu re-order, scheduled delivery, dữ liệu tồn kho. | B2B Portal / Quick Order trong phase sau. |

### 3.1 Core user journeys

| Journey | Đường đi đề xuất | CTA cuối |
| :--- | :--- | :--- |
| **Tìm sản phẩm phòng sạch** | Home → Cleanroom Solutions → Category → Product Detail → Download TDS/MSDS/Cart → Payment → Delivery | Yêu cầu báo giá / Nhận mẫu thử |
| **Tìm giải pháp đóng gói theo ngành** | Home → Packaging Solutions → Industry Solution → Product List → RFQ/Cart → payment → Delivery | Gửi yêu cầu tư vấn |
| **Kiểm chứng năng lực ULink** | Home → About → HUB Hà Nam / Quality Standards → Case Study | Đặt lịch trao đổi |
| **Tìm nhà cung ứng gần KCN** | Home → Regional Hubs → KCN landing page → SLA / Product groups | Yêu cầu báo giá theo khu vực |
| **Đặt hàng nhanh khách cũ** | Login → Dashboard → Re-order / Quick Order → Submit Request | Gửi yêu cầu |

---

## 4. Information Architecture & Sitemap

Kiến trúc thông tin cần tổ chức theo 4 intent lớn: tìm sản phẩm, tìm theo ngành, tìm theo cụm KCN, xác minh năng lực/chứng chỉ. Đây là cách phù hợp với hành vi tìm kiếm và quy trình mua hàng B2B công nghiệp.

| Level 1 | Level 2 / Sub-pages | Mục đích UX | SEO intent |
| :--- | :--- | :--- | :--- |
| **Home** | Hero, Core Solutions, Industries, Regional Hubs, Proof, RFQ | Tóm tắt năng lực và điều hướng nhanh. | Brand + industrial procurement |
| **Cụm KCN** | Đồng Văn IV, Bắc Thăng Long, Bắc Ninh, Hưng Yên, Hải Phòng | Chứng minh năng lực phục vụ theo khu vực. | supplier + KCN keyword |
| **Sản phẩm** | Phòng sạch, Đóng gói, Product Detail | Tìm, lọc, xem spec, tải tài liệu, RFQ. | product/category keyword |
| **Ngành nghề** | Điện tử & Bán dẫn, Dược/Mỹ phẩm, Thực phẩm, Cơ khí/Kho vận | Gắn sản phẩm với use-case của nhà máy. | industry solution keyword |
| **Tài nguyên** | Technical Docs, ISO/SGS, Case Studies, Blog, Download Center | Tăng niềm tin và hỗ trợ SEO nội dung. | technical/info keyword |
| **Về ULink** | Company, Core Competencies, Sustainability, Careers, Contact | Chứng minh năng lực doanh nghiệp. | brand trust keyword |
| **B2B Portal** | Login/Register, Dashboard, Order History, Scheduled Delivery, Debt, Re-order | Phục vụ khách hàng đăng nhập | customer portal intent |

### 4.1 URL structure đề xuất

| Nhóm trang | URL mẫu | Ghi chú SEO |
| :--- | :--- | :--- |
| **Home** | `/` | Trang thương hiệu và điều hướng tổng. |
| **Cụm KCN** | `/cum-kcn/dong-van-iv` | Slug tiếng Việt không dấu; mỗi cụm có H1 riêng. |
| **Giải pháp** | `/giai-phap/phong-sach` | Landing page theo nhóm giải pháp. |
| **Danh mục sản phẩm** | `/san-pham/gang-tay-phong-sach` | Category page có filter và internal link sang sản phẩm con. |
| **Chi tiết sản phẩm** | `/san-pham/gang-tay-phong-sach/esd-nitrile-gloves` | Có spec, documents, related products, RFQ. |
| **Ngành** | `/nganh-nghe/dien-tu-ban-dan` | Mapping vấn đề ngành → sản phẩm phù hợp. |
| **Tài nguyên** | `/tai-nguyen/tai-lieu-ky-thuat` | Hub nội dung SEO và download. |
| **Liên hệ/RFQ** | `/lien-he` | Form RFQ chính, route rõ từ mọi CTA. |

---

## 5. Navigation Specification

Navigation phải giúp người dùng B2B đi từ nhu cầu mua hàng đến RFQ trong ít bước. Header không nên quá nhiều mục. Các mục chính cần có khả năng mở rộng thành mega menu nhưng vẫn rõ ràng trên mobile.

### 5.1 Header desktop

| Vị trí | Thành phần | Quy định UX |
| :--- | :--- | :--- |
| **Left** | Logo ULink Industries | Click về Home. Giữ khoảng thở tốt, không đặt quá nhiều text cạnh logo. |
| **Center** | Cụm KCN \| Giải pháp/Sản phẩm \| Ngành nghề \| Tài nguyên \| Về ULink | Tối đa 5 mục chính. Nhãn ngắn, dễ hiểu, ưu tiên procurement intent. |
| **Right** | VI/EN/JP \| Giỏ RFQ \| Đăng nhập \| CTA “Yêu cầu báo giá” | CTA RFQ dùng màu nhấn rõ nhất. RFQ luôn hiển thị trong header sticky. |

### 5.2 Mega menu: Cụm KCN

| Column | Nội dung | Mục đích |
| :--- | :--- | :--- |
| **Cụm trọng điểm** | Đồng Văn IV, Bắc Thăng Long, Bắc Ninh, Hưng Yên, Hải Phòng | Người dùng chọn theo vị trí nhà máy. |
| **Thông tin cần hiển thị** | Delivery SLA, khoảng cách giao hàng, năng lực kho, đội kỹ thuật | Chứng minh khả năng phục vụ theo khu vực. |
| **CTA** | Yêu cầu báo giá theo khu vực | Tạo RFQ có thông tin location ngay từ đầu. |

### 5.3 Mega menu: Giải pháp/Sản phẩm

| Nhóm | Sub-items | Ghi chú thiết kế |
| :--- | :--- | :--- |
| **Phòng sạch** | Găng tay phòng sạch, khăn lau phòng sạch, sticky mat, băng keo ESD, túi chống tĩnh điện, trang phục phòng sạch | Đặt icon line-art; hiển thị “Tải TDS/MSDS” hoặc “Xem spec”. |
| **Đóng gói** | Túi PE/OPP, màng co LDPE/LLDPE, màng quấn pallet, màng chống rỉ VCI, bao bì định hình | Nêu rõ tùy chỉnh theo bản vẽ/kích thước/MOQ. |
| **Theo nhu cầu** | Kiểm soát tĩnh điện, kiểm soát bụi, bảo vệ bề mặt, đóng gói vận chuyển | Hỗ trợ người dùng chưa biết tên sản phẩm. |
| **CTA** | Nhận mẫu thử / Gửi RFQ Cart | Mục tiêu chuyển đổi chính. |

### 5.4 Mega menu: Ngành nghề

| Ngành | Vấn đề chính | Sản phẩm cần gợi ý |
| :--- | :--- | :--- |
| **Điện tử & Bán dẫn** | ESD, bụi vi mô, lint, bảo vệ linh kiện | Găng tay ESD, khăn lau polyester, túi chống tĩnh điện, sticky mat. |
| **Y tế & Dược/Mỹ phẩm** | Vô trùng, nhiễm khuẩn chéo, kiểm soát môi trường | Trang phục phòng sạch, găng nitrile, khăn lau phòng sạch. |
| **Thực phẩm** | An toàn vệ sinh, bao bì sạch, bảo vệ thành phẩm | Màng co LDPE/LLDPE, túi PE/OPP, màng quấn pallet. |
| **Cơ khí & Kho vận** | Chống oxy hóa, chống va đập, bảo vệ bề mặt | Màng VCI, màng co chịu lực, bao bì định hình. |

### 5.5 Mega menu: Tài nguyên & Về ULink

| Menu | Sub-items | Vai trò trong journey |
| :--- | :--- | :--- |
| **Tài nguyên** | Tài liệu kỹ thuật, ISO/SGS, Case Studies, Blog, Download Center | Giúp QA/QC và procurement kiểm chứng trước khi gửi RFQ. |
| **Về ULink** | Company Overview, Core Competencies, HUB Hà Nam, Sustainability, Careers, Contact | Chứng minh năng lực doanh nghiệp và uy tín cung ứng. |

### 5.6 Header behavior
- Header sticky trên desktop và mobile nhưng chiều cao gọn; khi scroll xuống chỉ giữ logo, nav chính, RFQ CTA.
- CTA chính: “Yêu cầu báo giá”. CTA phụ: “Nhận mẫu thử” tại product/detail hoặc category page.
- RFQ Cart icon hiển thị số lượng item đã thêm, tương tự giỏ hàng nhưng ngôn ngữ là “RFQ” thay vì “Cart” để phù hợp B2B.
- Breadcrumb bắt buộc trên category, product detail, industry, regional hub và resource article.

---

## 6. Page Brief theo từng template

Các page brief dưới đây là yêu cầu đầu vào cho wireframe và UI mockup. Designer cần giữ consistency giữa các template để dev dễ component hóa.

| Template | Mục tiêu | Section bắt buộc | CTA chính |
| :--- | :--- | :--- | :--- |
| **Home** | Định vị ULink và điều hướng nhanh vào 2 nhóm giải pháp. | Hero: B2B Procurement Platform; Core Solutions; Industry; Regional Hubs; Trust Signals; Case/Proof; Resource; RFQ CTA. | Yêu cầu báo giá |
| **Regional Hub Landing** | Chứng minh năng lực phục vụ theo cụm KCN. | SLA, khoảng cách giao hàng, nhóm sản phẩm phù hợp, năng lực HUB, contact theo khu vực. | RFQ theo khu vực |
| **Solution Category** | Giải thích giải pháp Phòng sạch/Đóng gói và dẫn vào danh mục. | Problem-solution, product groups, standards, use-cases, featured products, documents. | Xem sản phẩm / RFQ |
| **Product Listing** | Giúp procurement lọc và tìm SKU. | Search, filter, category cards, product table/list, specs preview, compare/add to RFQ. | Thêm vào RFQ |
| **Product Detail** | Cung cấp spec, tài liệu và chuyển đổi. | Gallery, key spec, MOQ/lead time, standards, TDS/MSDS, related products, RFQ form. | Nhận báo giá / Nhận mẫu |
| **Industry Solution** | Mapping ngành → vấn đề → sản phẩm phù hợp. | Pain points, recommended products, standards, process, case mini, CTA. | Tư vấn giải pháp |
| **Resource Center** | Tạo hub tài liệu và SEO content. | Filter by content type, docs, ISO/SGS, case studies, blog, download center. | Tải tài liệu / RFQ |
| **About ULink** | Tạo niềm tin doanh nghiệp. | Overview, core competencies, HUB Hà Nam, quality process, sustainability, team/contact. | Liên hệ |
| **Contact / RFQ** | Thu thập lead đủ thông tin. | Company info, products needed, quantity, industry, location, file upload, contact method. | Submit RFQ |
| **Login/Register** | Cổng vào cho B2B Portal | Account benefits, login, register, request access, security note. | Đăng ký tài khoản |

### 6.1 Home page wireframe order đề xuất
1. **Hero:** “B2B Procurement Platform cho vật tư phòng sạch & đóng gói công nghiệp” + CTA RFQ + Trust signals.
2. **Two Solution Pillars:** Phòng sạch và Đóng gói; mỗi pillar có 3-5 nhóm sản phẩm nổi bật.
3. **Industry Solutions:** Điện tử/Bán dẫn, Dược/Mỹ phẩm, Thực phẩm, Cơ khí/Kho vận.
4. **Regional Hubs:** Đồng Văn IV, Bắc Thăng Long, Bắc Ninh, Hưng Yên, Hải Phòng.
5. **Procurement workflow:** Tìm sản phẩm → Xác minh spec/chứng chỉ → Nhận mẫu/RFQ → Cung ứng định kỳ.
6. **Quality & Trust:** ISO/SGS/TDS/MSDS/CO/CQ theo nhóm sản phẩm.
7. **Featured resources/case studies:** 3-4 cards hỗ trợ SEO và niềm tin.
8. **Final CTA:** RFQ form ngắn hoặc contact block.

---

## 7. SEO-first UX Requirements

SEO-first không chỉ là metadata. Với ULink, SEO cần được thiết kế ngay trong IA, navigation, URL, heading, internal link và content modules.

| Hạng mục | Yêu cầu UI/UX | Output cần bàn giao |
| :--- | :--- | :--- |
| **URL** | Slug ngắn, không dấu, phản ánh intent tìm kiếm. | URL map theo toàn bộ sitemap. |
| **Heading** | Mỗi page có duy nhất 1 H1; H2 theo section; không dùng heading chỉ để trang trí. | Heading map cho từng template. |
| **Metadata** | Title/meta description có keyword chính + lợi ích B2B. | SEO metadata sheet hoặc CMS fields. |
| **Internal link** | Từ Home → Solution → Product → Resource; từ Industry → Product liên quan. | Internal linking map. |
| **Schema** | Organization, Product, Breadcrumb, FAQ, Article/Blog, LocalBusiness nếu phù hợp. | Schema requirement list cho dev. |
| **Content block** | Có module FAQ, technical docs, related products, related articles. | Reusable content modules. |
| **Image SEO** | Ảnh có alt text kỹ thuật, dung lượng tối ưu, không dùng ảnh text-heavy. | Image naming & alt text guideline. |

### 7.1 SEO page matrix tối thiểu

| Page type | H1 mẫu | Keyword intent | Internal links cần có |
| :--- | :--- | :--- | :--- |
| **Solution: Phòng sạch** | Giải pháp vật tư phòng sạch cho nhà máy sản xuất | cleanroom supplies Vietnam / vật tư phòng sạch | Product categories, industries, technical docs, RFQ |
| **Solution: Đóng gói** | Giải pháp đóng gói công nghiệp cho thành phẩm và linh kiện | industrial packaging / màng co PE / túi PE OPP | Product categories, industries, case, RFQ |
| **Industry: Điện tử & Bán dẫn** | Giải pháp kiểm soát ESD và bụi cho ngành điện tử & bán dẫn | ESD supplies electronics factory | ESD products, cleanroom docs, RFQ |
| **Regional: Đồng Văn IV** | Cung ứng vật tư phòng sạch & đóng gói cho KCN Đồng Văn IV | nhà cung cấp vật tư KCN Đồng Văn | SLA, product groups, contact/RFQ |
| **Product Detail** | Tên sản phẩm + đặc tính chính | specific SKU/product keyword | Related products, documents, RFQ cart |

---

## 8. Mobile Navigation & Responsive Rules

| Breakpoint | Navigation behavior | Content behavior |
| :--- | :--- | :--- |
| **Desktop $\ge$ 1200px** | Header ngang + mega menu; CTA RFQ sticky. | Grid 12 cột; product list có filter sidebar; spec table đầy đủ. |
| **Tablet 768–1199px** | Nav rút gọn; mega menu chuyển thành panel 2 cột. | Card grid 2 cột; filter collapsible; tables có horizontal scroll nếu cần. |
| **Mobile < 768px** | Hamburger menu; RFQ CTA fixed bottom hoặc sticky header; search nổi bật. | Single column; category cards; spec accordion; form chia nhóm ngắn. |

- Mobile menu không nên chỉ là bản thu nhỏ của desktop; phải nhóm theo intent: Tìm sản phẩm, Tìm theo ngành, Tài liệu kỹ thuật, RFQ.
- Product Detail trên mobile ưu tiên: tên sản phẩm → key specs → CTA RFQ → tài liệu kỹ thuật → mô tả chi tiết.
- Form RFQ mobile cần chia 3 bước ngắn: thông tin công ty, nhu cầu sản phẩm, thông tin liên hệ.

---

## 9. Design System & Component Requirements

| Nhóm component | Component cần có | Ghi chú |
| :--- | :--- | :--- |
| **Foundation** | Colors, typography, spacing, grid, icons, shadows, border radius | Bám Japanese Industrial Minimalism; không dùng radius/quá nhiều shadow kiểu consumer app. |
| **Navigation** | Header, mega menu, mobile menu, breadcrumb, footer, sticky CTA | Component hóa theo IA. |
| **Cards** | Solution card, product card, industry card, resource card, hub card | Mỗi card có title, short description, tags, CTA. |
| **Product UI** | Search, filter, spec table, document download, RFQ cart button, comparison row | Tối ưu procurement workflow. |
| **Forms** | RFQ form, contact form, request sample, login/register | Có validation, upload file, anti-spam state. |
| **Trust modules** | ISO/SGS badge, process stepper, SLA block, case study proof, partner logos | Tránh dùng badge giả; phải có nội dung kiểm chứng. |
| **States** | Empty, loading, error, success, disabled | Bắt buộc cho dev handoff. |

### 9.1 Visual foundation đề xuất

| Thành phần | Quy định |
| :--- | :--- |
| **Primary color** | Dark Navy `#0B1F33` - dùng cho header, heading, CTA phụ, nền section quan trọng. |
| **Accent color** | Industrial Silver `#B8C0CC` - dùng làm divider, badge, border, nền kỹ thuật. |
| **Typography** | Archivo cho thiết kế brand; fallback Inter/Arial để đảm bảo hiển thị tiếng Việt. |
| **Icon style** | Line-art, nét mảnh, hình học, ưu tiên biểu tượng công nghiệp/phòng sạch/kho vận. |
| **Photography** | Ảnh sạch, sáng, ít người, tập trung nhà máy, kho, phòng sạch, packaging; tránh ảnh stock quá quảng cáo. |

---

## 10. UI/UX Handoff Checklist

| Hạng mục bàn giao | Yêu cầu | Người nhận |
| :--- | :--- | :--- |
| **Figma file** | Pages: Foundation, Components, Wireframes, UI Screens, Prototype, Dev Handoff. | Product/Dev |
| **Design system** | Colors, typography, spacing, components, variants, states. | Frontend |
| **Page templates** | Desktop + mobile cho các template MVP. | Frontend |
| **Prototype** | Clickable flow: Home → Category → Product Detail → RFQ; Home → Industry → RFQ; Home → Hub → Contact. | CEO/Product/Dev |
| **SEO map** | URL, H1, H2, metadata field, schema note, internal link requirement. | SEO/Content/Dev |
| **Asset package** | Icons, image direction, logo usage, export rules. | Design/Content/Dev |
| **UI QA checklist** | Responsive, accessibility, contrast, states, form validation, performance design constraints. | QA/Dev |

---

## 11. Review Gates & Acceptance Criteria

| Gate | Thời điểm | Tiêu chí duyệt |
| :--- | :--- | :--- |
| **Gate 1: UX Brief & IA** | Trước wireframe | Navigation, sitemap, user journeys, page template list được CEO/Product duyệt. |
| **Gate 2: Wireframe** | Sau low-fidelity | Luồng RFQ, product discovery, SEO page structure và mobile logic rõ ràng. |
| **Gate 3: UI Direction** | Sau 2-3 màn key visual | Đúng Japanese Industrial Minimalism, đúng màu nhận diện, không quá quảng cáo. |
| **Gate 4: Full UI** | Trước prototype | Đủ desktop/mobile cho templates; component nhất quán; copy rõ. |
| **Gate 5: Prototype & Handoff** | Trước dev | Clickable prototype, annotation, states, design system, SEO map và asset sẵn sàng. |
| **Gate 6: Design QA sau dev** | Trước launch | UI build đúng Figma, responsive không lỗi, form hoạt động, PageSpeed/SEO không bị cản bởi thiết kế. |

### 11.1 Acceptance criteria cho UI/UX
- Người dùng mới hiểu ULink cung cấp gì trong 5 giây đầu tiên trên Home.
- Từ Home đến RFQ cho một sản phẩm cụ thể không quá 3-4 bước.
- Mỗi product detail có CTA RFQ, tài liệu kỹ thuật và thông số chính trong vùng dễ nhìn.
- Navigation rõ trên cả desktop và mobile; không có menu item mơ hồ hoặc trùng nghĩa.
- Thiết kế hỗ trợ SEO: heading đúng thứ bậc, page template có đủ vùng content và internal link.
- Thiết kế có đầy đủ empty/loading/error/success states cho form, search, RFQ cart.
- Visual tone đúng công nghiệp Nhật: gọn, chính xác, đáng tin, ít màu, ít hiệu ứng thừa.

---

## Phụ lục A - Copy tone guideline

| Nên dùng | Không nên dùng |
| :--- | :--- |
| “Cung ứng vật tư phòng sạch & đóng gói cho nhà máy FDI” | “Giải pháp số 1 thị trường” nếu chưa có bằng chứng. |
| “Tải TDS/MSDS”, “Yêu cầu báo giá”, “Nhận mẫu thử” | CTA quá chung như “Khám phá ngay” ở nơi cần hành động B2B cụ thể. |
| “SLA giao hàng theo cụm KCN”, “Hồ sơ chất lượng theo nhóm sản phẩm” | Câu quảng cáo dài, nhiều tính từ, thiếu dữ liệu. |
| “Tùy chỉnh theo bản vẽ/kích thước/MOQ” | “Sản phẩm chất lượng cao” nhưng không có spec/chứng chỉ kèm theo. |

---

## Phụ lục B - Tài liệu đầu vào
- `ULink_Industries_PRD_SOW_With_Sitemap.docx` - PRD & SOW dự án B2B Procurement Platform.
- `ULink Website Timeline.xlsx` - timeline triển khai website.
- `ULink_UIUX_Designer_Checklist_3_Weeks.xlsx` - checklist UI/UX đã chuẩn hóa theo chu kỳ 3 tuần.
- **Brand direction đã xác nhận:** Japanese Industrial Minimalism, Dark Navy, Industrial Silver, tập trung Cleanroom & Packaging.

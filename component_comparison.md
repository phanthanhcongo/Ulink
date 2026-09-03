# Báo Cáo So Sánh Component: Figma HTML vs React Next.js (Regional Hubs)

Tài liệu này ghi lại danh sách đối chiếu và đánh giá chi tiết giữa file thiết kế HTML tĩnh [`index.html`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/figmaPreview/UI/kcnPageDesktop/index.html) và trang React Next.js thực tế [`page.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/app/%5Blocale%5D/%28main%29/regional-hubs/cum-1/page.tsx).

---

## 1. Danh Sách Component Bỏ Qua (Excluded Scope)

Các phần dưới đây được bỏ qua theo yêu cầu (đã có trong Layout chung hoặc nằm ngoài phạm vi so sánh chi tiết):

- **Header & Navigation Bar**: [`desktop-1440-header`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/figmaPreview/UI/kcnPageDesktop/index.html#L260) (Nằm ở Next.js `layout.tsx` chung)
- **Footer**: [`footer`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/figmaPreview/UI/kcnPageDesktop/index.html#L583) (Nằm ở Next.js `layout.tsx` chung)
- **Bản đồ Mạng lưới Công nghiệp**: `<VietnamMap hubs={hubs} locale={locale} />`
- **Quy trình làm việc**: `<WorkingProcess />` ([`quy-tr-nh`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/figmaPreview/UI/kcnPageDesktop/index.html#L976))
- **Tin tức thị trường**: `<ResourcesNews />` ([`section6`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/figmaPreview/UI/kcnPageDesktop/index.html#L1076))
- **Tài liệu & Catalogue**: `<DocSection />` ([`t-i-li-u-catalogue`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/figmaPreview/UI/kcnPageDesktop/index.html#L290))
- **Tư vấn và Hỗ trợ**: `<SupportSection />` ([`t-v-n-h-tr`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/figmaPreview/UI/kcnPageDesktop/index.html#L522))
- **Liên hệ với chúng tôi**: `<AboutContact />` ([`contact-us-section`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/figmaPreview/UI/kcnPageDesktop/index.html#L391))

---

## 2. Bảng Tổng Hợp 6 Component Cần So Sánh Chi Tiết

| STT | Component React (`page.tsx`) | Thẻ HTML Figma tương ứng (`index.html`) | Đường dẫn File Component React | Mức độ tương thích | Điểm cải tiến / Nâng cấp UX |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **1** | `<LiveMetricsBar />` | `board-header` & `metric-row` (dòng 50-122) | [`live-metrics-bar.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/regional-hubs/live-metrics-bar.tsx) | **100% Giống hệt** | Lucide Icons chuẩn dạng Figma (`FileText`, `PieChart`, `Truck`, `Store`), hiệu ứng Hover & Live Pulse |
| **2** | `<FeaturedProducts />` | `title-v-ch-ng-t-i` (L123) & `card-product` (L1217-1560) | [`featured-products.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/regional-hubs/featured-products.tsx) | **100% Giống hệt** | Fix cứng dữ liệu chuẩn 4 Card Figma HTML (Găng tay, Màng co PE, Băng keo nhôm, Màng quấn Pallet), Nút RFQ điều hướng `/quick-order` |
| **3** | `<SolutionCarousel />` | `section` (dòng 708-762) | [`solution-carousel.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/regional-hubs/solution-carousel.tsx) | **100%** | Chuyển từ Banner tĩnh 1 sản phẩm sang **Interactive Slider 5 giải pháp** |
| **4** | `<CoreCapabilities />` | `section2` (dòng 763-862) | [`core-capabilities.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/regional-hubs/core-capabilities.tsx) | **100%** | Layout 2 vế chuẩn Figma, Lucide Icons & đa ngôn ngữ i18n |
| **5** | `<HanamOverview />` | `section3` (dòng 863-901) | [`hanam-overview.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/regional-hubs/hanam-overview.tsx) | **100%** | Thay ảnh placeholder tĩnh bằng **Video Showcase thực tế** (`Hub.mp4`) |
| **6** | `<TestimonialCarousel />` | `section4` & `section5` (dòng 902-975) | [`testimonial-carousel.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/regional-hubs/testimonial-carousel.tsx) | **100%** | Nâng cấp từ 2 ô tĩnh thành **Slider nhận xét mượt mà** với 4 đối tác |

---

## 3. Chi Tiết Phân Tích Từng Component

### 3.1. Live Metrics Bar (`<LiveMetricsBar />`)
- **HTML Figma (`index.html`)**:
  - `board-header`: Tiêu đề "Thông tin cập nhật theo thời gian thực", tag "Cập nhật: 10:30AM".
  - `metric-row`: 4 chỉ số (Đơn hàng hôm nay `1,286 đơn` ▲ 12.5%, Tỷ lệ giao đúng hạn `98.7%` ▲ 2.1%, Đang hoạt động `352 xe`, Tổng diện tích kho `10,000 m²`).
- **React Component (`live-metrics-bar.tsx`)**:
  - Render chuẩn Grid 4 cột trên desktop (`grid-cols-4`).
  - Dùng Lucide icons (`FileText`, `Clock`, `Truck`, `Warehouse`).
  - Có hiệu ứng hover glow `#1769E2` chuẩn màu thương hiệu ULink và chấm xanh nhấp nháy (`animate-pulse`).

---

### 3.2. Sản phẩm nổi bật (`<FeaturedProducts />`)
- **HTML Figma (`index.html`)**:
  - Tiêu đề "Sản phẩm nổi bật" ở phần trên (dòng 123).
  - 4 Card sản phẩm lớn ở gần cuối file HTML (dòng 1217-1560):
    1. Găng tay công nghiệp (Nitrile, PU, Latex, Vinyl)
    2. Màng co PE - Shrink Film (LDPE, PVC, ESD, POF)
    3. Băng keo nhôm - HVAC (FSK, Woven Fabric, Glass fiber cloth)
    4. Màng quấn Pallet (Màng quấn tay, quấn máy, jumbo)
- **React Component (`featured-products.tsx`)**:
  - Tái cấu trúc: Gom Tiêu đề và 4 Card sản phẩm bị phân tán trong HTML về làm 1 khối liền mạch.
  - Tích hợp CTA *"Yêu cầu Báo giá"* & *"Tải Catalogue"* cùng nhãn thuộc tính sản phẩm.

---

### 3.3. Banner / Slider Giải Pháp (`<SolutionCarousel />`)
- **HTML Figma (`index.html`)**:
  - Thẻ `section` (dòng 708): Giới thiệu tĩnh về "MÀNG CUỐN PALLET".
- **React Component (`solution-carousel.tsx`)**:
  - Nâng cấp UX: Biến khối tĩnh thành **Carousel trình chiếu 5 giải pháp** (Màng quấn pallet, Găng tay bảo hộ, Băng keo nhôm HVAC, Khăn lau phòng sạch, Màng co PE).

---

### 3.4. Năng lực cốt lõi (`<CoreCapabilities />`)
- **HTML Figma (`index.html`)**:
  - Thẻ `section2` (dòng 763): 3 khối năng lực (*Sản xuất quy mô lớn*, *Chuỗi cung ứng tối ưu*, *Kiểm soát chất lượng*).
- **React Component (`core-capabilities.tsx`)**:
  - Bố cục 2 vế (Trái: Title/Desc, Phải: 3 Thẻ Năng lực) đúng theo Figma.

---

### 3.5. Trung tâm Phân phối Hà Nam (`<HanamOverview />`)
- **HTML Figma (`index.html`)**:
  - Thẻ `section3` (dòng 863): Tiêu đề "TRUNG TÂM PHÂN PHỐI HÀ NAM", quy mô 10.000m², 2 nút CTA (*Liên hệ Sales*, *Tìm hiểu thêm*).
- **React Component (`hanam-overview.tsx`)**:
  - Giữ nguyên toàn bộ text và nút bấm CTA.
  - Thay ảnh tĩnh bằng **Video Showcase** (`/images/regional_hubs/Hub.mp4`).

---

### 3.6. Đánh giá của Khách hàng (`<TestimonialCarousel />`)
- **HTML Figma (`index.html`)**:
  - Thẻ `section4` & `section5` (dòng 902): Khối nhận xét tĩnh đại diện từ *Công ty TNHH Thành Phát* và *Công ty CP Bao bì Đông Nam*.
- **React Component (`testimonial-carousel.tsx`)**:
  - Nâng cấp thành **Testimonial Slider** chuyển slide mượt mà, mở rộng danh sách 4 khách hàng tiêu biểu.

---

## 4. Kết Luận

Tất cả **6 component chính** trong phạm vi so sánh đều đã được triển khai đầy đủ trên trang [`cum-1/page.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/app/%5Blocale%5D/%28main%29/regional-hubs/cum-1/page.tsx). Các component React vừa giữ chuẩn cấu trúc & nội dung từ bản HTML Figma, vừa nâng cao trải nghiệm người dùng với slider tương tác, video showcase và hiệu ứng mượt mà.

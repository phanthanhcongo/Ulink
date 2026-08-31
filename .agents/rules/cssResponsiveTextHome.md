# Quy chuẩn CSS Responsive Text Trang chủ (Home Page Typography Rule)

Quy định và tổng hợp toàn bộ thông số Kích thước Font chữ (Font Size) Responsive trên các thiết bị (Mobile, Tablet, Desktop) cho từng Section thuộc trang chủ [`page.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/app/%5Blocale%5D/%28main%29/page.tsx).

---

## 1. Hero Banner (`hero-banner.tsx`)
File: [`hero-banner.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/hero-banner.tsx)

* **Eyebrow Top** (`text-brand font-bold sm:font-normal uppercase tracking-wider`):
  - Mobile: `13px` (`text-[13px]`)
  - Tablet/Desktop (`sm`/`lg`): `14px` (`sm:text-[14px] lg:text-[14px]`)
  - Desktop XL (`xl`): `15px` (`xl:text-[15px]`)
* **Eyebrow Sub** (`text-primary font-bold sm:font-semibold uppercase tracking-wider` - *Ẩn trên Mobile*):
  - Mobile/Tablet (`sm`): `14px` (`text-[14px]`)
  - Desktop (`lg`): `15px` (`lg:text-[15px]`)
  - Desktop XL (`xl`): `16px` (`xl:text-[16px]`)
* **Tiêu đề chính (H1)** (`font-semibold text-slate-900`):
  - Mobile: `28px` (`text-[28px]`, leading `36px`)
  - Tablet (`sm`): `36px` (`sm:text-[36px]`, leading `44px`)
  - Medium (`md`): `38px` (`md:text-[38px]`, leading `46px`)
  - Desktop (`lg`): `44px` (`lg:text-[44px]`, leading `52px`)
  - Desktop XL (`xl`): `56px` (`xl:text-[56px]`, leading `64px`)
* **Mô tả ngắn (Description)** (`text-slate-600 font-normal`):
  - Mobile/Tablet (`sm`): `15px` (`text-[15px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
  - Desktop XL (`xl`): `18px` (`xl:text-[18px]`)
* **Nút bấm CTA 1 (Tạo yêu cầu báo giá)** & **CTA 2 (Tải Catalogue)**:
  - Mobile: `14px` (`text-[14px] font-bold`)
  - Tablet/Desktop (`sm`/`lg`): `16px` (`sm:text-[16px] lg:text-[16px] sm:font-semibold`)
  - Desktop XL (`xl`): `18px` (`xl:text-[18px]`)
* **Mobile Stats Section** (*Chỉ hiển thị trên Mobile*):
  - Số liệu (`stat.value`): `16px` (`text-[16px] font-extrabold`)
  - Nhãn (`stat.label`): `11px` (`text-[11px] font-normal`)
* **Toast Notification**: `14px` (`text-sm font-semibold`)

---

## 2. Thanh Giá trị Nổi bật (`feature-value-bar.tsx`)
File: [`feature-value-bar.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/feature-value-bar.tsx)

* **Tiêu đề Feature (Title)** (`text-slate-900 font-bold lg:font-semibold`):
  - Mobile: `13.5px` (`text-[13.5px]`)
  - Tablet/Desktop (`sm`/`lg`): `14px` (`sm:text-[14px] lg:text-[14px]`)
  - Desktop XL (`xl`): `17px` (`xl:text-[17px]`)
  - Desktop 2XL (`2xl`): `19px` (`2xl:text-[19px]`)
* **Mô tả Feature (Description)** (`text-slate-500`):
  - Mobile: `12px` (`text-[12px]`)
  - Tablet (`sm`): `12.5px` (`sm:text-[12.5px]`)
  - Desktop (`lg`): `13px` (`lg:text-[13px]`)
  - Desktop XL (`xl`): `14px` (`xl:text-[14px]`)

---

## 3. Danh mục Sản phẩm (`product-categories.tsx`)
File: [`product-categories.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/product-categories.tsx) & [`section-header.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/section-header.tsx)

* **Section Header - Title (H2)**:
  - Mobile: `20px` (`text-[20px] font-semibold`)
  - Tablet/Desktop (`sm`/`lg`): `28px` (`sm:text-[28px] sm:font-bold lg:text-[28px] lg:font-semibold`)
* **Section Header - Subtitle**:
  - Mobile/Tablet (`sm`): `14px` (`text-[14px]`)
  - Desktop (`lg`): `18px` (`lg:text-[18px]`)
* **Thẻ lớn Top 2 - Tiêu đề (H3)**:
  - Mobile: `20px` (`text-[20px] font-bold`)
  - Tablet/Desktop (`sm`): `22px` (`sm:text-[22px]`)
* **Thẻ lớn Top 2 - Mô tả**:
  - Mobile: `14px` (`text-[14px]`)
  - Tablet/Desktop (`sm`): `16px` (`sm:text-[16px]`)
* **Danh sách sản phẩm con (Sub-items - Cột 1 & 2)**: `14px` (`text-[14px] font-normal`)
* **Link "Xem chi tiết" (Top cards)**: `16px` (`text-[16px] font-bold`)
* **Thẻ Bottom 3 - Tiêu đề (H3)**:
  - Mobile: `16px` (`text-[16px] font-bold`)
  - Tablet/Desktop (`sm`): `18px` (`sm:text-[18px]`)
* **Thẻ Bottom 3 - Mô tả**:
  - Mobile: `14px` (`text-[14px]`)
  - Tablet/Desktop (`sm`): `16px` (`sm:text-[16px]`)
* **Link "Xem thêm" (Bottom cards)**: `16px` (`text-[16px] font-bold`)

---

## 4. Giải pháp Ngành hàng (`industry-solutions.tsx`)
File: [`industry-solutions.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/industry-solutions.tsx)

* **Section Header - Title / Subtitle**: Chuẩn theo `section-header.tsx` (`20px` ➔ `28px` / `14px` ➔ `18px`)
* **Thẻ Mobile Grid (dưới `md: <768px`)**:
  - Tiêu đề (`H4`): `14px` (`text-[14px] font-bold`)
  - Mô tả: `11px` (`text-[11px] font-normal`)
* **Thẻ Desktop Grid (từ `md: >=768px`)**:
  - Tiêu đề (`H4`): `15px` (mobile/md) ➔ `18px` (`md:text-[18px] lg:text-[18px] font-bold`)
  - Mô tả: `11.5px` (mobile/md) ➔ `14px` (`md:text-[14px] lg:text-[14px] font-normal`)

---

## 5. Giới thiệu Doanh nghiệp (`about-section.tsx`)
File: [`about-section.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/about-section.tsx)

* **Section Header - Title / Subtitle**: Chuẩn theo `section-header.tsx` (`20px` ➔ `28px` / `14px` ➔ `18px`)
* **Ảnh bên trái - Caption**:
  - Mobile: `12px` (`text-[12px]`)
  - Tablet/Desktop (`sm`/`lg`): `14px` (`sm:text-[14px] lg:text-[14px] font-bold`)
* **Ảnh bên trái - Status Badge**:
  - Mobile: `10px` (`text-[10px]`)
  - Tablet/Desktop (`sm`/`lg`): `12px` (`sm:text-[12px] lg:text-[12px] font-bold`)
* **Cột phải - Tiêu đề chính (H3)**:
  - Mobile: `20px` (`text-[20px] font-semibold`)
  - Tablet/Desktop (`sm`/`md`/`lg`): `24px` (`sm:text-[24px] md:text-[24px] lg:text-[24px]`)
* **Cột phải - Đoạn văn mô tả**:
  - Mobile: `14px` (`text-[14px]`)
  - Tablet/Desktop (`sm`/`lg`/`xl`): `16px` (`sm:text-[16px] lg:text-[16px] xl:text-[16px]`)
* **Cột phải - Checklist Bullet Points**:
  - Mobile/Tablet (`sm`/`lg`): `13px` (`text-[13px] font-medium`)
  - Desktop XL (`xl`): `14px` (`xl:text-[14px]`)
* **Cột phải - 4 Thẻ chỉ số (Metrics)**:
  - Mobile/Tablet (`sm`): `11px` (`text-[11px] font-semibold`)
  - Desktop (`lg`/`xl`): `13px` (`lg:text-[13px] xl:text-[13px]`)
* **Nút bấm "Tìm hiểu thêm"**: `14px` (`text-sm lg:text-[14px] font-semibold`)

---

## 6. Phân khúc Khách hàng Mục tiêu (`target-segments.tsx`)
File: [`target-segments.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/target-segments.tsx)

### Mobile View (`<768px`):
* **Header Title Top**: `12px` (`text-[12px] font-bold uppercase`)
* **Header Subtitle (H2)**: `22px` (`text-[22px] font-extrabold`)
* **Card Title (H3)**: `16px` (`text-[16px] font-bold`)
* **Card Mô tả**: `13px` (`text-[13px] font-normal`)
* **Card Checklist Item**: `12px` (`text-[12px] font-normal`)

### Desktop View (`>=768px`):
* **Header Title Top (Blue)** & **Subtitle (H2)**:
  - Medium (`md`): `20px` (`text-[20px] font-extrabold`)
  - Tablet (`sm`): `24px` (`sm:text-[24px]`)
  - Desktop (`lg`): `28px` (`lg:text-[28px]`)
* **Card Title (H3)**:
  - Mobile: `20px` (`text-[20px] font-bold`)
  - Tablet/Desktop (`sm`/`lg`): `22px` (`sm:text-[22px] lg:text-[22px]`)
* **Card Mô tả**:
  - Mobile: `13.5px` (`text-[13.5px] font-normal`)
  - Tablet/Desktop (`sm`/`lg`): `14px` (`sm:text-[14px] lg:text-[14px]`)
* **Card Checklist Items**:
  - Mobile: `13.5px` (`text-[13.5px] font-normal`)
  - Tablet/Desktop (`sm`/`lg`): `15px` (`sm:text-[15px] lg:text-[15px]`)
* **Link "Xem chi tiết"**:
  - Mobile: `13px` (`text-[13px] font-semibold`)
  - Tablet/Desktop (`sm`/`lg`): `14px` (`sm:text-[14px] lg:text-[14px]`)

---

## 7. Đối tác & Chứng nhận (`partners-certifications.tsx`)
File: [`partners-certifications.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/partners-certifications.tsx)

* **Section Header - Title / Subtitle**: Chuẩn theo `section-header.tsx` (`20px` ➔ `28px` / `14px` ➔ `18px`)
* **Khối ISO Desktop (`>=1024px`)**:
  - Tiêu đề (`H3`): `20px` (default) ➔ `22px` (`lg:text-[22px] font-bold`)
  - Mô tả: `13px` (default) ➔ `14px` (`lg:text-[14px] font-medium`)
* **Khối ISO Mobile/Tablet (`<1024px`)**:
  - Tiêu đề (`H3`): `20px` (mobile) ➔ `22px` (`sm:text-[22px] font-bold`)
  - Mô tả: `13px` (mobile) ➔ `14px` (`sm:text-[14px] font-medium`)
  - Thẻ chứng nhận - Tên: `16px` (mobile) ➔ `18px` (`sm:text-[18px] font-extrabold`)
  - Thẻ chứng nhận - Mô tả: `12px` (mobile) ➔ `13px` (`sm:text-[13px] font-medium`)

---

## 8. Dự án Tiêu biểu / Case Studies (`case-studies.tsx` & `case-study-card.tsx`)
File: [`case-studies.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/case-studies.tsx) & [`case-study-card.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/case-study-card.tsx)

* **Section Header - Title / Subtitle**: Chuẩn theo `section-header.tsx` (`20px` ➔ `28px` / `14px` ➔ `18px`)
* **Card - Chuyên mục (Category)**:
  - Mobile: `12px` (`text-[12px] font-medium`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
  - Desktop (`lg`/`xl`): `16px` (`lg:text-[16px] xl:text-[16px]`)
* **Card - Tiêu đề (H3)**:
  - Mobile: `15px` (`text-[15px] font-bold`)
  - Tablet (`sm`): `16px` (`sm:text-[16px]`)
  - Medium (`md`): `18px` (`md:text-[18px]`)
  - Desktop (`lg`/`xl`): `20px` (`lg:text-[20px] xl:text-[20px]`)
* **Card - Mô tả ngắn**:
  - Mobile: `13px` (`text-[13px] font-normal`)
  - Tablet (`sm`): `14px` (`sm:text-[14px]`)
  - Desktop (`lg`/`xl`): `16px` (`lg:text-[16px] xl:text-[16px]`)
* **Card - Tên tác giả**:
  - Mobile: `13px` (`text-[13px] font-medium`)
  - Tablet (`sm`): `14px` (`sm:text-[14px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **Card - Chức danh tác giả**:
  - Mobile: `11px` (`text-[11px] font-normal`)
  - Tablet (`sm`): `12px` (`sm:text-[12px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **Card - Link "Đọc thêm"**:
  - Mobile: `14px` (`text-[14px] font-semibold`)
  - Desktop (`lg`): `20px` (`lg:text-[20px]`)
* **Nút bấm dưới "Xem tất cả câu chuyện thành công"**:
  - Mobile: `14px` (`text-[14px] font-semibold`)
  - Desktop (`lg`): `20px` (`lg:text-[20px]`)

---

## 9. Quy trình Làm việc (`working-process.tsx`)
File: [`working-process.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/working-process.tsx)

* **Section Title**:
  - Mobile: `20px` (`text-[20px] font-bold`)
  - Tablet/Desktop (`sm`/`lg`): `28px` (`sm:text-[28px] lg:text-[28px]`)
* **Section Subtitle**:
  - Mobile: `13px` (`text-[13px] font-normal`)
  - Tablet/Desktop (`sm`/`lg`): `18px` (`sm:text-[18px] lg:text-[18px]`)
* **Thẻ Quy trình - Số bước**:
  - Mobile: `12px` (`text-[12px] font-semibold`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
  - Desktop (`lg`): `14px` (`lg:text-[14px]`)
* **Thẻ Quy trình - Tiêu đề bước (H3)**:
  - Mobile: `15px` (`text-[15px] font-bold`)
  - Tablet (`sm`): `18px` (`sm:text-[18px]`)
  - Desktop (`lg`): `20px` (`lg:text-[20px]`)
* **Thẻ Quy trình - Mô tả**:
  - Mobile: `13px` (`text-[13px] font-normal`)
  - Tablet (`sm`): `14px` (`sm:text-[14px]`)
  - Desktop (`lg`): `15px` (`lg:text-[15px]`)
* **Thẻ Quy trình - KPI Label**:
  - Mobile: `12.5px` (`text-[12.5px] font-normal`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
* **Thẻ Quy trình - KPI Value**:
  - Mobile: `13.5px` (`text-[13.5px] font-bold`)
  - Tablet/Desktop (`sm`/`lg`): `14px` (`sm:text-[14px] lg:text-[14px]`)

---

## 10. Tin tức Thị trường (`resources-news.tsx` & `news-card.tsx`)
File: [`resources-news.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/resources-news.tsx) & [`news-card.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/news-card.tsx)

* **Section Header Title (Blue) & Subtitle (H2)**:
  - Mobile: `20px` (`text-[20px] font-semibold`)
  - Tablet (`sm`): `24px` (`sm:text-[24px]`)
  - Desktop (`lg`): `28px` (`lg:text-[28px]`)
* **News Card - Chuyên mục (Category)**:
  - Mobile: `12px` (`text-[12px] font-bold uppercase`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **News Card - Ngày tháng**:
  - Mobile: `12px` (`text-[12px] font-semibold`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **News Card - Tiêu đề bài viết (H4)**:
  - Mobile: `16px` (`text-[16px] font-bold`)
  - Tablet/Medium (`sm`/`md`): `18px` (`sm:text-[18px] md:text-[18px]`)
  - Desktop (`lg`/`xl`): `20px` (`lg:text-[20px] xl:text-[20px]`)
* **News Card - Mô tả ngắn**:
  - Mobile: `13px` (`text-[13px] font-normal`)
  - Tablet (`sm`): `14px` (`sm:text-[14px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **News Card - Tên tác giả**:
  - Mobile: `13px` (`text-[13px] font-semibold`)
  - Tablet (`sm`): `14px` (`sm:text-[14px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **News Card - Chức danh tác giả**:
  - Mobile: `11px` (`text-[11px] font-normal`)
  - Tablet (`sm`): `12px` (`sm:text-[12px]`)
  - Desktop (`lg`): `14px` (`lg:text-[14px]`)
* **News Card - Link "Đọc thêm"**:
  - Mobile: `13px` (`text-[13px] font-semibold`)
  - Tablet (`sm`): `14px` (`sm:text-[14px] sm:font-bold`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **Nút bấm "Xem thêm" tin tức**:
  - Mobile: `14px` (`text-sm font-normal`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)

---

## 11. Tài liệu & Catalogue (`doc-section.tsx` & `doc-card.tsx`)
File: [`doc-section.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/doc-section.tsx) & [`doc-card.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/doc-card.tsx)

* **Section Title (H2)**:
  - Mobile: `18px` (`text-[18px] font-semibold`)
  - Tablet/Desktop (`sm`/`lg`): `20px` (`sm:text-[20px] lg:text-[20px]`)
* **Doc Card - Category**:
  - Mobile: `12px` (`text-[12px] font-normal`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **Doc Card - Tiêu đề tài liệu (H4)**:
  - Mobile: `14px` (`text-[14px] font-semibold`)
  - Tablet (`sm`): `15px` (`sm:text-[15px] sm:font-bold`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **Doc Card - Meta (Định dạng & Dung lượng)**:
  - Mobile: `12px` (`text-[12px] font-normal`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
  - Desktop (`lg`): `14px` (`lg:text-[14px]`)

---

## 12. Tư vấn & Hỗ trợ (`support-section.tsx` & `support-card.tsx`)
File: [`support-section.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/support-section.tsx) & [`support-card.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/support-card.tsx)

* **Section Title (H2)**:
  - Mobile: `18px` (`text-[18px] font-semibold`)
  - Tablet/Desktop (`sm`/`lg`): `20px` (`sm:text-[20px] lg:text-[20px]`)
* **Support Card - Tiêu đề (H4)**:
  - Mobile: `14px` (`text-[14px] font-semibold`)
  - Tablet (`sm`): `16px` (`sm:text-[16px] sm:font-bold`)
  - Desktop (`lg`): `20px` (`lg:text-[20px]`)
* **Support Card - Mô tả**:
  - Mobile/Tablet (`sm`): `13px` (`text-[13px] font-normal`)
  - Desktop (`lg`): `14px` (`lg:text-[14px]`)

---

## 13. Khối Form & Liên hệ (`about-contact.tsx`)
File: [`about-contact.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/about/about-contact.tsx)

* **Section Header - Title (Blue) & Subtitle (H2)**:
  - Mobile: `20px` (`text-[20px] font-semibold`)
  - Tablet (`sm`): `24px` (`sm:text-[24px]`)
  - Desktop (`lg`): `28px` (`lg:text-[28px]`)
* **Form trái - Tiêu đề (H3)**:
  - Mobile: `18px` (`text-[18px] font-semibold`)
  - Tablet (`sm`): `20px` (`sm:text-[20px]`)
  - Desktop (`lg`): `28px` (`lg:text-[28px]`)
* **Form trái - Label ô nhập liệu**:
  - Mobile: `12px` (`text-[12px] font-semibold`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
  - Desktop (`lg`): `14px` (`lg:text-[14px]`)
* **Form trái - Input / Textarea**:
  - Mobile: `13px` (`text-[13px] font-normal`)
  - Tablet (`sm`): `14px` (`sm:text-[14px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **Form trái - Nút Submit "Gửi đi"**:
  - Mobile: `13px` (`text-[13px] font-semibold`)
  - Tablet (`sm`): `14px` (`sm:text-[14px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **Form trái - Disclaimer**:
  - Mobile: `12px` (`text-[12px] font-normal`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **Cột phải - Tiêu đề "Thông tin liên hệ" (H3)**:
  - Mobile: `18px` (`text-[18px] font-semibold`)
  - Tablet/Desktop (`sm`/`lg`): `20px` (`sm:text-[20px] lg:text-[20px]`)
* **Cột phải - Tên mục liên hệ (H4)**:
  - Mobile: `14px` (`text-[14px] font-semibold`)
  - Tablet (`sm`): `15px` (`sm:text-[15px]`)
  - Desktop (`lg`): `14px` (`lg:text-[14px]`)
* **Cột phải - Nội dung mục liên hệ**:
  - Mobile: `12px` (`text-[12px] font-normal`)
  - Tablet (`sm`): `13px` (`sm:text-[13px]`)
  - Desktop (`lg`): `16px` (`lg:text-[16px]`)
* **Link Đường đến Hub Google Maps**:
  - Mobile: `13px` (`text-[13px] font-semibold`)
  - Tablet/Desktop (`sm`/`lg`): `14px` (`sm:text-[14px] lg:text-[14px]`)

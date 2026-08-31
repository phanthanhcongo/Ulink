# Quy chuẩn CSS Responsive Text Trang chủ (Home Page Typography Rule)

> **Phiên bản**: v2.0 — Chuẩn hóa Typography Scale  
> **Cập nhật**: 2026-08-31  
> **Nguyên tắc**: XL (1280px+) là anchor, mọi breakpoint scale đều theo gradient `mobile → sm → lg → xl`

Quy định và tổng hợp toàn bộ thông số Font Size Responsive trên 4 breakpoint cho từng Section thuộc trang chủ [`page.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/app/%5Blocale%5D/%28main%29/page.tsx).

---

## Typography Token System (11 cấp)

| Token     | Mobile | sm (640) | lg (1024) | xl (1280) | Dùng cho                    |
|-----------|--------|----------|-----------|-----------|------------------------------|
| display   | 28     | 36       | 44        | 56        | Hero H1                     |
| h1        | 20     | 24       | 28        | 32        | Section headers (centered)   |
| h2        | 18     | 20       | 24        | 28        | Section headers (left), Form H3 |
| h3        | 16     | 18       | 20        | 24        | Large card titles            |
| h4        | 15     | 16       | 18        | 20        | Medium card titles, sub-section titles |
| body-lg   | 14     | 15       | 16        | 18        | Subtitles, descriptions      |
| body      | 13     | 14       | 15        | 16        | Card desc, form inputs       |
| body-sm   | 11     | 12       | 13        | 14        | Labels, meta, small text     |
| overline  | 12     | 13       | 14        | 15        | Uppercase labels, eyebrow    |
| label     | 11     | 11       | 12        | 13        | Small labels, KPI, metrics   |
| caption   | 11     | 11       | 11        | 12        | Smallest text, badges        |

### Quy tắc bắt buộc
1. **Không dùng font lẻ**: Cấm `13.5px`, `12.5px`, `11.5px` → Luôn dùng số nguyên
2. **Không nhảy >1.25x** giữa 2 breakpoint liền kề
3. **Không scale ngược**: Font size phải tăng hoặc giữ nguyên khi viewport tăng
4. **Phải có 4 breakpoint** cho mọi text element: `text-[Xpx] sm:text-[Ypx] lg:text-[Zpx] xl:text-[Wpx]`

---

## 1. Hero Banner (`hero-banner.tsx`)
File: [`hero-banner.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/hero-banner.tsx)

| Element         | Token    | Mobile | sm   | lg   | xl   |
|-----------------|----------|--------|------|------|------|
| Eyebrow Top     | overline | 12     | 13   | 14   | 15   |
| Eyebrow Sub     | body     | 13     | 14   | 15   | 16   |
| H1 Title        | display  | 28     | 36   | 44   | 56   |
| Description     | body-lg  | 14     | 15   | 16   | 18   |
| CTA Button 1    | body-lg  | 14     | 15   | 16   | 18   |
| CTA Button 2    | body-lg  | 14     | 15   | 16   | 18   |

---

## 2. Thanh Giá trị Nổi bật (`feature-value-bar.tsx`)
File: [`feature-value-bar.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/feature-value-bar.tsx)

| Element         | Token   | Mobile | sm   | lg   | xl   |
|-----------------|---------|--------|------|------|------|
| Feature Title   | h4      | 15     | 16   | 18   | 20   |
| Feature Desc    | body-sm | 11     | 12   | 13   | 14   |

---

## 3. Danh mục Sản phẩm (`product-categories.tsx`)
File: [`product-categories.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/product-categories.tsx) & [`section-header.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/section-header.tsx)

| Element            | Token   | Mobile | sm   | lg   | xl   |
|--------------------|---------|--------|------|------|------|
| Left Title (H2)    | h2      | 18     | 20   | 24   | 28   |
| Subtitle           | body-lg | 14     | 15   | 16   | 18   |
| View-all Link      | body    | 13     | 14   | 15   | 16   |
| Top Card H3        | h3      | 16     | 18   | 20   | 24   |
| Top Card Desc      | body    | 13     | 14   | 15   | 16   |
| Sub-items          | body-sm | 11     | 12   | 13   | 14   |
| "Xem chi tiết"    | body    | 13     | 14   | 15   | 16   |
| Bottom Card H3     | h4      | 15     | 16   | 18   | 20   |
| Bottom Card Desc   | body    | 13     | 14   | 15   | 16   |
| "Xem thêm"        | body    | 13     | 14   | 15   | 16   |

---

## 4. Giải pháp Ngành hàng (`industry-solutions.tsx`)
File: [`industry-solutions.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/industry-solutions.tsx)

| Element              | Token   | Mobile | md   | lg   | xl   |
|----------------------|---------|--------|------|------|------|
| Desktop Card H4      | h4      | 15     | 16   | 18   | 20   |
| Desktop Card Desc    | body    | 11     | 14   | 15   | 16   |

*Section Header sử dụng `section-header.tsx` (xem mục 3)*

---

## 5. Giới thiệu Doanh nghiệp (`about-section.tsx`)
File: [`about-section.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/about-section.tsx)

| Element           | Token   | Mobile | sm   | lg   | xl   |
|-------------------|---------|--------|------|------|------|
| Photo Caption     | body-sm | 11     | 12   | 13   | 14   |
| Status Badge      | caption | 11     | 11   | 11   | 12   |
| Main Title (H3)   | h3      | 16     | 18   | 20   | 24   |
| Main Desc         | body    | 13     | 14   | 15   | 16   |
| Bullet Points     | body-sm | 11     | 12   | 13   | 14   |
| Metric Labels     | label   | 11     | 11   | 12   | 13   |
| CTA Button        | body-sm | 11     | 12   | 13   | 14   |

---

## 6. Phân khúc Khách hàng Mục tiêu (`target-segments.tsx`)
File: [`target-segments.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/target-segments.tsx)

### Desktop View (≥768px):

| Element            | Token   | Mobile | sm   | lg   | xl   |
|--------------------|---------|--------|------|------|------|
| Header Title/Sub   | h1      | 20     | 24   | 28   | 32   |
| Card Title (H3)    | h3      | 16     | 18   | 20   | 24   |
| Card Desc          | body-sm | 11     | 12   | 13   | 14   |
| Checklist Items    | body    | 13     | 14   | 15   | 16   |
| "Xem chi tiết"    | body-sm | 11     | 12   | 13   | 14   |

---

## 7. Đối tác & Chứng nhận (`partners-certifications.tsx`)
File: [`partners-certifications.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/partners-certifications.tsx)

| Element              | Token   | Mobile | sm   | lg   | xl   |
|----------------------|---------|--------|------|------|------|
| Desktop ISO H3       | h3      | 16     | —    | 20   | 24   |
| Desktop ISO Desc     | body-sm | 11     | —    | 13   | 14   |
| Mobile ISO H3        | h3      | 16     | 18   | —    | —    |
| Mobile ISO Desc      | body-sm | 11     | 12   | —    | —    |
| Cert Name (mobile)   | body-lg | 14     | 15   | —    | —    |
| Cert Desc (mobile)   | label   | 11     | 11   | —    | —    |

---

## 8. Dự án Tiêu biểu (`case-study-card.tsx` & `case-studies.tsx`)
File: [`case-study-card.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/case-study-card.tsx) & [`case-studies.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/case-studies.tsx)

| Element           | Token   | Mobile | sm   | lg   | xl   |
|-------------------|---------|--------|------|------|------|
| Category          | body-sm | 11     | 12   | 13   | 14   |
| Title (H3)        | h4      | 15     | 16   | 18   | 20   |
| Description       | body    | 13     | 14   | 15   | 16   |
| Author Name       | body    | 13     | 14   | 15   | 16   |
| Author Role       | body-sm | 11     | 12   | 13   | 14   |
| "Đọc thêm"       | body    | 13     | 14   | 15   | 16   |
| "Xem tất cả" btn | body-lg | 14     | 15   | 16   | 18   |

---

## 9. Quy trình Làm việc (`working-process.tsx`)
File: [`working-process.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/working-process.tsx)

| Element           | Token   | Mobile | sm   | lg   | xl   |
|-------------------|---------|--------|------|------|------|
| Section Title     | h1      | 20     | 24   | 28   | 32   |
| Section Subtitle  | body-lg | 14     | 15   | 16   | 18   |
| Step Number       | label   | 11     | 11   | 12   | 13   |
| Step Title (H3)   | h4      | 15     | 16   | 18   | 20   |
| Step Desc         | body    | 13     | 14   | 15   | 16   |
| KPI Label         | label   | 11     | 11   | 12   | 13   |
| KPI Value         | body-sm | 11     | 12   | 13   | 14   |

---

## 10. Tin tức Thị trường (`resources-news.tsx` & `news-card.tsx`)
File: [`resources-news.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/resources-news.tsx) & [`news-card.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/news-card.tsx)

| Element           | Token   | Mobile | sm   | lg   | xl   |
|-------------------|---------|--------|------|------|------|
| Header Title/Sub  | h1      | 20     | 24   | 28   | 32   |
| Category/Date     | label   | 11     | 11   | 12   | 13   |
| Card Title (H4)   | h4      | 15     | 16   | 18   | 20   |
| Card Desc         | body    | 13     | 14   | 15   | 16   |
| Author Name       | body    | 13     | 14   | 15   | 16   |
| Author Role       | body-sm | 11     | 12   | 13   | 14   |
| "Đọc thêm"       | body    | 13     | 14   | 15   | 16   |
| "Xem thêm" btn   | body    | 13     | 14   | 15   | 16   |

---

## 11. Tài liệu & Catalogue (`doc-section.tsx` & `doc-card.tsx`)
File: [`doc-section.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/doc-section.tsx) & [`doc-card.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/doc-card.tsx)

| Element           | Token   | Mobile | sm   | lg   | xl   |
|-------------------|---------|--------|------|------|------|
| Section Title (H2)| h4      | 15     | 16   | 18   | 20   |
| Card Category     | body-sm | 11     | 12   | 13   | 14   |
| Card Title (H4)   | body-lg | 14     | 15   | 16   | 18   |
| Card Meta         | body-sm | 11     | 12   | 13   | 14   |

---

## 12. Tư vấn & Hỗ trợ (`support-section.tsx` & `support-card.tsx`)
File: [`support-section.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/support-section.tsx) & [`support-card.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/support-card.tsx)

| Element           | Token   | Mobile | sm   | lg   | xl   |
|-------------------|---------|--------|------|------|------|
| Section Title (H2)| h4      | 15     | 16   | 18   | 20   |
| Card Title (H4)   | h4      | 15     | 16   | 18   | 20   |
| Card Desc         | body-sm | 11     | 12   | 13   | 14   |

---

## 13. Khối Form & Liên hệ (`about-contact.tsx`)
File: [`about-contact.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/about/about-contact.tsx)

| Element              | Token   | Mobile | sm   | lg   | xl   |
|----------------------|---------|--------|------|------|------|
| Header Title/Sub     | h1      | 20     | 24   | 28   | 32   |
| Form H3              | h2      | 18     | 20   | 24   | 28   |
| Form Labels          | body-sm | 11     | 12   | 13   | 14   |
| Form Inputs          | body    | 13     | 14   | 15   | 16   |
| Submit Button        | body    | 13     | 14   | 15   | 16   |
| Disclaimer           | body-sm | 11     | 12   | 13   | 14   |
| Info H3              | h4      | 15     | 16   | 18   | 20   |
| Info Item H4 (label) | body-sm | 11     | 12   | 13   | 14   |
| Info Item Content    | body    | 13     | 14   | 15   | 16   |
| Map Link             | body-sm | 11     | 12   | 13   | 14   |

---

## Shared Component: `section-header.tsx`
File: [`section-header.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/section-header.tsx)

| Element              | Token   | Mobile | sm   | lg   | xl   |
|----------------------|---------|--------|------|------|------|
| Centered Title       | h1      | 20     | 24   | 28   | 32   |
| Centered Subtitle    | h1      | 20     | 24   | 28   | 32   |
| Left Title (H2)      | h2      | 18     | 20   | 24   | 28   |
| Left Subtitle        | body-lg | 14     | 15   | 16   | 18   |
| View-all Link        | body    | 13     | 14   | 15   | 16   |

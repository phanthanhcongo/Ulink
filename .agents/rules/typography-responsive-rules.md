# Quy chuẩn Font chữ Responsive theo tỉ lệ (Mobile, Tablet, Desktop)

Tài liệu quy định chuẩn tỉ lệ Kích thước Font chữ (Font Size), Chiều cao dòng (Line Height) và Trọng lượng font (Font Weight) chuẩn hóa theo 3 cấp độ thiết bị chính: **Mobile (`<640px`)**, **Tablet (`640px - 1023px`)**, và **Desktop (`>=1024px`)** dựa trên hệ thống các component trang chủ [`page.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/app/%5Blocale%5D/%28main%29/page.tsx).

---

## 1. Bảng Tỉ lệ Font chữ Chuẩn hóa (Responsive Typography Matrix)

| Cấp phần tử (Element Role) | Mobile (`<640px`) | Tablet (`640px - 1023px`) | Desktop (`1024px - 1279px`) | Desktop XL (`>=1280px`) | Chuỗi Tailwind CSS Khuyên dùng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (H1)** | `28px` / `36px` | `36px - 38px` / `44px` | `44px` / `52px` | `56px` / `64px` | `text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[56px] leading-tight lg:leading-[52px] xl:leading-[64px]` |
| **Section Title (H2)** | `16px - 20px` / `22px` | `24px` / `32px` | `28px` / `36px` | `32px` / `40px` | `text-[16px] min-[375px]:text-[18px] sm:text-[24px] lg:text-[28px] xl:text-[32px]` |
| **Eyebrow / Sub-Header** | `12px - 13px` | `13px - 14px` | `14px - 15px` | `15px - 16px` | `text-[12px] sm:text-[14px] lg:text-[15px] xl:text-[16px]` |
| **Card Title (H3/H4)** | `15px - 16px` / `20px` | `18px` / `24px` | `20px - 22px` / `28px` | `24px` / `32px` | `text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[24px]` |
| **Body Large / Lead** | `14px - 15px` / `20px` | `15px - 16px` / `22px` | `16px - 18px` / `24px` | `18px` / `28px` | `text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px]` |
| **Body Regular (Mô tả)**| `12px - 13px` / `18px` | `13px - 14px` / `20px` | `15px` / `22px` | `16px` / `24px` | `text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px]` |
| **Button / CTA Link** | `13px` / `44px min-h` | `14px` | `15px` | `16px` | `text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px]` |
| **Caption / Meta Text** | `10px - 11px` | `11px - 12px` | `12px - 13px` | `13px - 14px` | `text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px]` |

---

## 2. Quy tắc áp dụng cụ thể theo từng loại phần tử

### A. Section Title & Subtitle (Tiêu đề Section)
- **Tỉ lệ tăng trưởng**: `16px` (Mobile) ➔ `24px` (Tablet) ➔ `28px` (Desktop) ➔ `32px` (Desktop XL)
- **Leading (Dòng)**: `leading-tight` (Mobile) ➔ `sm:leading-[32px]` ➔ `lg:leading-[36px]` ➔ `xl:leading-[40px]`
- **Mẫu áp dụng chuẩn**:
  ```tsx
  <span className="text-[16px] min-[375px]:text-[18px] sm:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold tracking-tight text-blue-600 block">
    {eyebrow}
  </span>
  <h2 className="text-[16px] min-[375px]:text-[18px] sm:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold tracking-tight text-slate-900">
    {title}
  </h2>
  ```

### B. Thẻ nội dung / Card Heading (H3, H4)
- **Tỉ lệ tăng trưởng**: `15px/16px` (Mobile) ➔ `18px` (Tablet) ➔ `20px` (Desktop) ➔ `24px` (Desktop XL)
- **Mẫu áp dụng chuẩn**:
  ```tsx
  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[24px] font-bold text-slate-900 leading-snug">
    {cardTitle}
  </h3>
  ```

### C. Đoạn văn mô tả (Body Text / Description)
- **Tỉ lệ tăng trưởng**: `13px` (Mobile) ➔ `14px` (Tablet) ➔ `15px` (Desktop) ➔ `16px` (Desktop XL)
- **Line Height**: `leading-[20px]` (Mobile) ➔ `sm:leading-[22px]` ➔ `lg:leading-[24px]`
- **Mẫu áp dụng chuẩn**:
  ```tsx
  <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-normal leading-relaxed text-slate-600">
    {description}
  </p>
  ```

### D. Nút bấm CTA (Buttons & Links)
- **Tỉ lệ tăng trưởng**: `13px` (Mobile) ➔ `14px` (Tablet) ➔ `15px` (Desktop) ➔ `16px` (Desktop XL)
- **Mẫu áp dụng chuẩn**:
  ```tsx
  <Link className="px-6 py-3 text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-semibold text-white bg-brand rounded-[3px]">
    {buttonText}
  </Link>
  ```

### E. Nhãn thông tin phụ (Meta / Badges / Captions)
- **Tỉ lệ tăng trưởng**: `11px` (Mobile) ➔ `12px` (Tablet) ➔ `13px` (Desktop) ➔ `14px` (Desktop XL)
- **Mẫu áp dụng chuẩn**:
  ```tsx
  <span className="text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-medium text-slate-500">
    {metaText}
  </span>
  ```

---

## 3. Quy chuẩn Breakpoints Tailwind CSS
- **Mobile**: Kích thước mặc định (`< 640px`) & `min-[375px]:` (màn hình nhỏ)
- **Tablet**: `sm:` (`>= 640px`) & `md:` (`>= 768px`)
- **Desktop**: `lg:` (`>= 1024px`)
- **Desktop XL**: `xl:` (`>= 1280px`)
- **Desktop Large (Wide)**: `2xl:` (`>= 1536px`)

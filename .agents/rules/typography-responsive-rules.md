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

---

## 4. Quy chuẩn Căn lề Trái - Phải & Khung Container (Layout Alignment & Padding Rules)

Tham chiếu chuẩn mực layout từ component [`resources-news.tsx`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/resources-news.tsx):

### A. Khung chứa chính (Main Section Container)
- **Chiều rộng tối đa**: `max-w-[1440px]` kết hợp `mx-auto` (căn giữa toàn bộ trang).
- **Căn lề lót hai bên (Padding lề trái - phải)**:
  - **Mobile (`<640px`)**: `px-4` (`16px` lề hai bên)
  - **Tablet (`sm: >=640px`)**: `sm:px-8` (`32px` lề hai bên)
  - **Desktop (`lg: >=1024px`)**: `lg:px-12` (`48px` lề hai bên)
  - **Desktop XL (`xl: >=1280px`)**: `xl:px-16` (`64px` lề hai bên)
  - **Mẫu Tailwind áp dụng chuẩn**:
    ```tsx
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
    ```

### B. Khoảng cách Lề trên - Dưới (Section Vertical Padding)
- **Padding trên dưới Section (`py`)**: `py-8 sm:py-10 lg:py-12`
  - **Mobile**: `py-8` (`32px`)
  - **Tablet**: `sm:py-10` (`40px`)
  - **Desktop**: `lg:py-12` (`48px`)

### C. Khối Header Tiêu đề Section (Section Header Alignment)
- **Căn giữa văn bản & giới hạn chiều rộng**:
  ```tsx
  <div className="text-center max-w-3xl mx-auto space-y-1 sm:space-y-2">
  ```

### D. Bố cục Lưới & Khoảng cách Card (Grid & Spacing)
- **Bố cục Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Khoảng cách giữa các Card (Gap)**: `gap-6 lg:gap-8` (`24px` ở Mobile/Tablet ➔ `32px` ở Desktop)
- **Margin Top từ Header xuống Grid**: `mt-8`
- **Margin Top từ Grid xuống Nút CTA**: `mt-10 flex justify-center`

---

## 5. Quy chuẩn Hiệu ứng Hover cho Card (Card Hover Effects Specification)

Quy chuẩn thiết kế hiệu ứng Hover cho Card trong hệ thống giao diện ULink B2B Platform (tham chiếu từ `target-segments.tsx` và `resources-news.tsx`).

### A. Thông số Hover Card
- **Đường viền viền sáng & Đổ bóng xanh (Glow Shadow)**:
  `hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]`
  - Đường viền 1px bao quanh màu xanh ULink Brand (`#1769E2`).
  - Lớp bóng đổ phát sáng nhẹ màu xanh ở chân card (`rgba(23, 105, 226, 0.25)`).
- **Đẩy khối nổi nhẹ (Elevation)**: `hover:-translate-y-0.5` (nhấc lên 2px).
- **Tỷ lệ phóng to (Scale)**: `hover:scale-[1.01]` (phóng to nhẹ 1%).
- **Thời gian chuyển đổi (Transition)**: `transition-all duration-300` (mượt trong 300ms).

### B. Các phần tử con trong Card (Nested Elements)
- **Khung vuông chứa Icon**: `group-hover:scale-105` (phóng to nhẹ 5%).
- **Mũi tên liên kết (`ArrowRight` / `→`)**: `group-hover:translate-x-1` (trượt sang phải 4px).
- **Đổi màu tiêu đề khi Hover**: `transition-colors group-hover:text-blue-600`.

### C. Mã nguồn mẫu chuẩn hóa (Combined Reference Implementation)
```tsx
<div
  className="group relative flex flex-col rounded-[3px] border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
>
  {/* Icon Box */}
  <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-white border border-slate-200 transition-transform duration-300 group-hover:scale-105">
    <Image src="/images/icons/icon.svg" alt="Icon" width={32} height={32} />
  </div>

  {/* Title & Body (Sử dụng Typography Responsive chuẩn Mục 2.B) */}
  <h3 className="mt-4 text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[24px] font-bold text-slate-900 leading-snug transition-colors group-hover:text-blue-600">
    Tiêu đề Card
  </h3>
  <p className="mt-2 text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-normal leading-relaxed text-slate-600">
    Đoạn mô tả ngắn của card.
  </p>

  {/* Link & Arrow */}
  <Link href="#" className="mt-4 inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] text-blue-600 font-semibold">
    <span>Xem chi tiết</span>
    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
</div>
```



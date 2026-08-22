# SPEC-10 — Quy Chuẩn Responsive Desktop & Laptop (CSS / Tailwind)

**Status:** Approved Baseline · **Owner:** Frontend Team · **Mẫu chuẩn:** `HeroBanner` (`frontend/src/components/home/hero-banner.tsx`)

Tài liệu này định nghĩa hệ thống quy chuẩn Responsive toàn diện cho giao diện Desktop (bao gồm Laptop màn nhỏ 13-14", Màn hình FHD chuẩn và Màn hình lớn 2K/4K) dựa trên quy chuẩn đã được chuẩn hóa từ component `<HeroBanner />`.

---

## 1. Nguyên Tắc Cốt Lõi (Core Principles)

1. **Không "Over-scale" trên Small Desktop (Laptop 1024px – 1366px):**
   - Breakpoint `lg` (1024px) là kích thước phổ biến của laptop 13–14 inch hoặc iPad Pro / tablet ngang.
   - Không được áp đặt font chữ quá to (ví dụ `text-5xl` hay `text-[46px]`) hoặc padding quá dày (`p-10`) ở breakpoint `lg`, tránh làm tràn màn hình hoặc chiếm hết viewport theo chiều dọc.
2. **Tỉ Lệ Mềm Dẻo (Fluid & Proportional Scaling):**
   - Phân cấp kích thước mượt mà theo 3 nấc Desktop: **Small Desktop (`lg`)** $\to$ **Standard Desktop (`xl`)** $\to$ **Large Desktop (`2xl`)**.
3. **Giới Hạn Khung Bao (Max Boundary & Safe Margins):**
   - Luôn sử dụng `max-w-[1440px]` làm khung chuẩn cho toàn bộ container trang chủ và các trang nội dung chính.

---

## 2. Bảng Phân Cấp Breakpoints Chuẩn

| Breakpoint | Dải màn hình | Thiết bị đại diện | Định hướng thiết kế |
|---|---|---|---|
| **`< 640px`** | Mobile | iPhone, Android phone | Gọn gàng, stack dọc 1 cột, padding `px-4` |
| **`sm` (640px+)** | 640px – 767px | Phablet, Mini Tablet | Tăng nhẹ kích thước font, flex hàng ngang cho nút |
| **`md` (768px+)** | 768px – 1023px | iPad dọc, Tablet | Layout 2 cột, padding `px-8` |
| **`lg` (1024px+)** | 1024px – 1279px | **Laptop 13-14", iPad Pro ngang** | **Small Desktop: Tiết chế font-size, padding vừa vặn, tỷ lệ banner 1440/500** |
| **`xl` (1280px+)** | 1280px – 1535px | **Desktop FHD 1080p, Laptop 15-16"** | **Standard Desktop: Kích thước hiển thị tiêu chuẩn, padding `px-12/16`** |
| **`2xl` (1536px+)** | $\ge$ 1536px | Màn 2K, 4K, UltraWide | Khóa `max-w-[1440px]`, tăng nhẹ font và khoảng cách nếu cần |

---

## 3. Quy Chuẩn Banner & Khung Chứa (Container & Aspect Ratio)

### A. Chiều cao & Tỉ lệ khung hình (Section / Banner)
Áp dụng cho Hero Banner, Page Header, Hero Section các trang con:

```tsx
className="relative flex w-full items-center overflow-hidden bg-slate-50
  aspect-auto sm:aspect-[16/9] md:aspect-[16/8] lg:aspect-[1440/500] xl:aspect-[1440/540]
  min-h-[380px] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[460px] xl:min-h-[500px]"
```

- **Mobile:** `min-h-[380px]` (aspect-auto theo nội dung).
- **Small Desktop (`lg`):** `lg:aspect-[1440/500] lg:min-h-[460px]` (chiều cao ~460px - 500px, không vượt quá 520px).
- **Standard Desktop (`xl`):** `xl:aspect-[1440/540] xl:min-h-[500px]`.

### B. Container & Padding ngang (Content Wrapping)
```tsx
className="mx-auto relative z-10 flex w-full max-w-[1440px] items-center justify-center sm:justify-start
  py-6 sm:py-6 md:py-8
  px-4 sm:px-8 lg:px-12 xl:px-16"
```

---

## 4. Quy Chuẩn Khối Kính & Hộp Nội Dung (Glass Card / Content Box)

Để đảm bảo card thông tin không che mất hình nền hoặc bị phình to:

| Thành phần | Lớp Tailwind chuẩn | Ghi chú |
|---|---|---|
| **Outer Card (Vỏ ngoài)** | `w-full max-w-md sm:max-w-[450px] md:max-w-[480px] lg:max-w-[480px] xl:max-w-[540px] 2xl:max-w-[580px]` | Khóa max-w ở `lg:480px` thay vì 560-600px |
| **Outer Padding** | `p-2.5 sm:p-3 lg:p-3.5 xl:p-4` | Tránh padding quá dày ở màn nhỏ |
| **Outer Radius** | `rounded-2xl lg:rounded-[5px]` | Bo tròn mượt mà |
| **Inner Card (Ruột)** | `rounded-[5px] lg:rounded-2xl border border-white/75 bg-white/85` | Kính mờ phủ nhẹ |
| **Inner Padding** | `p-4 sm:p-5 md:p-6 lg:p-6 xl:p-8` | `lg:p-6` (24px) $\to$ `xl:p-8` (32px) |

---

## 5. Thang Typography Chuẩn Theo Breakpoint

### A. Tiêu đề chính ($H_1$ Hero / Page Titles)
```tsx
className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[32px] xl:text-[38px] 2xl:text-[44px] font-extrabold leading-[1.15] tracking-tight text-primary"
```

### B. Tiêu đề phụ & Eyebrow (Sub-heading & Badges)
- **Top Eyebrow:** `text-[12px] sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] font-bold uppercase tracking-wider text-muted-foreground/90`
- **Brand Sub-eyebrow:** `mt-1 sm:mt-1.5 text-[12px] sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] font-bold uppercase tracking-wider text-brand`

### C. Đoạn văn mô tả (Body Text / Descriptions)
```tsx
className="mt-2 sm:mt-2.5 lg:mt-3 text-[12px] sm:text-[13px] md:text-[13.5px] lg:text-[13.5px] xl:text-[15px] 2xl:text-[16px] leading-relaxed text-muted-foreground"
```

---

## 6. Quy Chuẩn Nút Bấm & CTA (Buttons & Interactions)

Quy định kích thước nút bấm trên Desktop:

```tsx
{/* CTA Container */}
<div className="mt-4 sm:mt-5 md:mt-6 lg:mt-5 xl:mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5 lg:gap-3.5 xl:gap-4">

  {/* Primary CTA (Button Brand) */}
  <Link
    href="/quick-order"
    className="inline-flex h-10 sm:h-11 lg:h-10.5 xl:h-11.5 w-full sm:w-auto items-center justify-center gap-2 sm:gap-2.5 rounded-lg bg-brand px-4 sm:px-6 lg:px-5 xl:px-7 text-[13px] sm:text-[14px] lg:text-[13.5px] xl:text-[15px] font-semibold text-brand-foreground shadow-md transition-all hover:bg-brand-strong"
  >
    <span>Gửi yêu cầu báo giá</span>
    <ArrowRight className="h-4 w-4 lg:h-4 lg:w-4 xl:h-4.5 xl:w-4.5" aria-hidden="true" />
  </Link>

  {/* Secondary CTA (Ghost / Outline / Link) */}
  <Link
    href="/resources"
    className="inline-flex h-10 sm:h-11 lg:h-10.5 xl:h-11.5 w-full sm:w-auto items-center justify-center gap-2 sm:gap-2.5 text-[13px] sm:text-[14px] lg:text-[13.5px] xl:text-[15px] font-semibold text-brand transition-colors hover:text-brand-strong hover:bg-brand/5 px-3 sm:px-4 lg:px-3.5 xl:px-5"
  >
    <span>Tải Catalogue</span>
    <Image src={ASSETS.home.iconSend} alt="Icon" width={20} height={20} className="h-4 w-4 lg:h-4.5 lg:w-4.5 xl:h-5 xl:w-5 object-contain" />
  </Link>
</div>
```

### Bảng tóm tắt thông số Button:
| Thuộc tính | Mobile (`<640px`) | Tablet (`md`) | Small Desktop (`lg`) | Standard Desktop (`xl`+) |
|---|---|---|---|---|
| **Height** | `h-10` (40px) | `h-11` (44px) | `lg:h-10.5` (42px) | `xl:h-11.5` / `h-12` (46-48px) |
| **Padding ngang** | `px-4` (16px) | `px-6` (24px) | `lg:px-5` (20px) | `xl:px-7` (28px) |
| **Font Size** | `text-[13px]` | `text-[14px]` | `lg:text-[13.5px]` | `xl:text-[15px]` |
| **Icon Size** | `16px` (`h-4 w-4`) | `16px` (`h-4 w-4`) | `16-18px` | `18-20px` (`xl:h-5 xl:w-5`) |

---

## 7. Mẫu Component Chuẩn (Reference Template)

Mọi component hero / banner mới trong dự án nên tham khảo cấu trúc chuẩn của [`HeroBanner`](file:///c:/Users/thanh/Desktop/PathtechProject/ulink-b2b-platform/frontend/src/components/home/hero-banner.tsx):

```tsx
export function HeroStandardExample() {
  return (
    <section className="relative flex w-full items-center overflow-hidden bg-slate-50 aspect-auto sm:aspect-[16/9] md:aspect-[16/8] lg:aspect-[1440/500] xl:aspect-[1440/540] min-h-[380px] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[460px] xl:min-h-[500px]">
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full select-none">
        <Image src="/images/banner.webp" alt="Background" fill priority sizes="100vw" className="object-cover object-center" />
      </div>

      {/* Grid / Content Layer */}
      <div className="mx-auto relative z-10 flex h-auto sm:h-full w-full max-w-[1440px] items-center justify-center sm:justify-start py-6 sm:py-6 md:py-8 px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="relative flex h-auto w-full max-w-md sm:max-w-[450px] md:max-w-[480px] lg:max-w-[480px] xl:max-w-[540px] 2xl:max-w-[580px] items-center justify-center rounded-2xl lg:rounded-[5px] border border-white/40 bg-white/35 p-2.5 sm:p-3 lg:p-3.5 xl:p-4 shadow-2xl backdrop-blur-md">
          <div className="flex h-auto w-full flex-col justify-center rounded-[5px] lg:rounded-2xl border border-white/75 bg-white/85 p-4 sm:p-5 md:p-6 lg:p-6 xl:p-8">
            <p className="text-[12px] sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] font-bold uppercase tracking-wider text-muted-foreground/90">Category</p>
            <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] font-bold uppercase tracking-wider text-brand">Sub-category</p>
            <h1 className="mt-2.5 sm:mt-3 lg:mt-3 text-[22px] sm:text-[28px] md:text-[32px] lg:text-[32px] xl:text-[38px] 2xl:text-[44px] font-extrabold leading-[1.15] tracking-tight text-primary">Heading Title</h1>
            <p className="mt-2 sm:mt-2.5 lg:mt-3 text-[12px] sm:text-[13px] md:text-[13.5px] lg:text-[13.5px] xl:text-[15px] 2xl:text-[16px] leading-relaxed text-muted-foreground">Description paragraph...</p>
            <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-5 xl:mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5 lg:gap-3.5 xl:gap-4">
              {/* Buttons */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

# Frontend CSS & Responsive Standards (Desktop & Laptop Baseline)

**Mẫu chuẩn tham chiếu:** [`HeroBanner`](src/components/home/hero-banner.tsx)  
**Tài liệu hệ thống:** [`SPEC-10`](../docs/specs/SPEC-10-desktop-responsive-standards.md)

---

## 1. Phân cấp Breakpoints Chuẩn

| Breakpoint | Dải màn hình | Thiết bị | Quy tắc CSS |
|---|---|---|---|
| **`< 640px`** | Mobile | Điện thoại | Stack 1 cột, `px-4`, `py-6`, `min-h-[380px]` |
| **`sm` (640px+)** | 640px – 767px | Phablet | `px-6` - `px-8`, nút flex hàng ngang |
| **`md` (768px+)** | 768px – 1023px | Tablet | Grid 2 cột, `min-h-[450px]` |
| **`lg` (1024px+)** | 1024px – 1279px | **Laptop 13-14", Tablet ngang** | **Small Desktop: Tiết chế font size ($H_1 \le 32px$), padding vừa vặn ($p-6$), aspect-ratio `1440/500`, min-h `460px`** |
| **`xl` (1280px+)** | 1280px – 1535px | **Desktop FHD, Laptop 15-16"** | **Standard Desktop: $H_1 \approx 38px$, padding $p-8$, aspect-ratio `1440/540`, min-h `500px`** |
| **`2xl` (1536px+)** | $\ge$ 1536px | Màn 2K / 4K | Khóa `max-w-[1440px]`, $H_1 \approx 44px$ |

---

## 2. Quick Reference: Các Classes Tailwind Chuẩn

### 🎯 Hero / Banner Section
```tsx
className="relative flex w-full items-center overflow-hidden bg-slate-50 aspect-auto sm:aspect-[16/9] md:aspect-[16/8] lg:aspect-[1440/500] xl:aspect-[1440/540] min-h-[380px] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[460px] xl:min-h-[500px]"
```

### 📦 Container Wrapper
```tsx
className="mx-auto relative z-10 flex h-auto sm:h-full w-full max-w-[1440px] items-center justify-center sm:justify-start py-6 sm:py-6 md:py-8 px-4 sm:px-8 lg:px-12 xl:px-16"
```

### 🔲 Glass / Info Card Box
```tsx
{/* Outer Wrapper */}
className="relative flex h-auto w-full max-w-md sm:max-w-[450px] md:max-w-[480px] lg:max-w-[480px] xl:max-w-[540px] 2xl:max-w-[580px] items-center justify-center rounded-2xl lg:rounded-[5px] border border-white/40 bg-white/35 p-2.5 sm:p-3 lg:p-3.5 xl:p-4 shadow-2xl backdrop-blur-md"

{/* Inner Card */}
className="flex h-auto w-full flex-col justify-center rounded-[5px] lg:rounded-2xl border border-white/75 bg-white/85 p-4 sm:p-5 md:p-6 lg:p-6 xl:p-8"
```

### ✍️ Typography Scale
- **H1:** `text-[22px] sm:text-[28px] md:text-[32px] lg:text-[32px] xl:text-[38px] 2xl:text-[44px] font-extrabold leading-[1.15] tracking-tight text-primary`
- **Eyebrow Top:** `text-[12px] sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] font-bold uppercase tracking-wider text-muted-foreground/90`
- **Eyebrow Brand:** `mt-1 sm:mt-1.5 text-[12px] sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] font-bold uppercase tracking-wider text-brand`
- **Body / Desc:** `mt-2 sm:mt-2.5 lg:mt-3 text-[12px] sm:text-[13px] md:text-[13.5px] lg:text-[13.5px] xl:text-[15px] 2xl:text-[16px] leading-relaxed text-muted-foreground`

### 🔘 Buttons & CTAs
- **CTA Wrapper:** `mt-4 sm:mt-5 md:mt-6 lg:mt-5 xl:mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5 lg:gap-3.5 xl:gap-4`
- **Primary Button:** `inline-flex h-10 sm:h-11 lg:h-10.5 xl:h-11.5 w-full sm:w-auto items-center justify-center gap-2 sm:gap-2.5 rounded-lg bg-brand px-4 sm:px-6 lg:px-5 xl:px-7 text-[13px] sm:text-[14px] lg:text-[13.5px] xl:text-[15px] font-semibold text-brand-foreground shadow-md transition-all hover:bg-brand-strong`
- **Secondary Button:** `inline-flex h-10 sm:h-11 lg:h-10.5 xl:h-11.5 w-full sm:w-auto items-center justify-center gap-2 sm:gap-2.5 text-[13px] sm:text-[14px] lg:text-[13.5px] xl:text-[15px] font-semibold text-brand transition-colors hover:text-brand-strong hover:bg-brand/5 px-3 sm:px-4 lg:px-3.5 xl:px-5`
- **Icon inside Button:** `h-4 w-4 lg:h-4 lg:w-4 xl:h-4.5 xl:w-4.5`

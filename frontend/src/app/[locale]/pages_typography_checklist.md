# Checklist Font Chu - ULink B2B Platform

Nguon route: `frontend/src/app/[locale]/pages_list.md`

Muc tieu: kiem tra font size, font weight, va cap bac chu tren tung page. Eyebrow khong duoc tinh la title. Neu co eyebrow thi eyebrow chi la label/meta nho dung `text-eyebrow` hoac `text-caption-responsive`, khong dung `text-hero-title`, `text-section-title`, `text-card-title`.

## Quy Uoc Can Check

- Page/Hero title: dung `text-hero-title`, weight `font-extrabold` hoac `font-bold`.
- Section title: dung `text-section-title`, weight `font-extrabold` hoac `font-bold`.
- Card title: dung `text-card-title`, weight `font-bold` hoac `font-semibold`.
- Body/description: dung `text-body-regular` hoac `text-body-large`, weight `font-normal` hoac `font-medium`.
- Caption/meta/helper: dung `text-caption-responsive`, weight `font-medium` hoac `font-semibold`.
- Button/link CTA: dung `text-button-responsive` hoac body scale phu hop, weight `font-semibold` hoac `font-bold`.
- Form label/control: dung `form-label-responsive` va `form-control-responsive`.
- Stat number: dung `text-stat-value`, weight `font-extrabold`.
- Eyebrow: khong dat la title. Khong dung title class cho eyebrow.
- Khong con raw font size dang `text-[..px]`, `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl+` neu co the thay bang global token.

## Checklist Trang Khach Hang

| STT | URL | File | Title dung cap | Eyebrow khong la title | Body/Caption dung token | Weight dung rule | Trang thai | Ghi chu |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| 1 | `/` | `src/app/[locale]/(main)/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 2 | `/about` | `src/app/[locale]/(main)/about/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 3 | `/about/careers` | `src/app/[locale]/(main)/about/careers/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 4 | `/about/careers/[slug]` | `src/app/[locale]/(main)/about/careers/[slug]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 5 | `/about/careers/[slug]/apply` | `src/app/[locale]/(main)/about/careers/[slug]/apply/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 6 | `/about/careers/apply-success` | `src/app/[locale]/(main)/about/careers/apply-success/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 7 | `/about/contact-success` | `src/app/[locale]/(main)/about/contact-success/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 8 | `/about/news` | `src/app/[locale]/(main)/about/news/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 9 | `/about/news/[id]` | `src/app/[locale]/(main)/about/news/[id]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 10 | `/about/standards` | `src/app/[locale]/(main)/about/standards/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 11 | `/about/sustainability` | `src/app/[locale]/(main)/about/sustainability/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 12 | `/cart` | `src/app/[locale]/(main)/cart/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 13 | `/checkout` | `src/app/[locale]/(main)/checkout/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 14 | `/contact` | `src/app/[locale]/(main)/contact/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 15 | `/industries` | `src/app/[locale]/(main)/industries/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 16 | `/industries/[slug]` | `src/app/[locale]/(main)/industries/[slug]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 17 | `/my-rfqs` | `src/app/[locale]/(main)/my-rfqs/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 18 | `/order-confirmation` | `src/app/[locale]/(main)/order-confirmation/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 19 | `/order-tracking` | `src/app/[locale]/(main)/order-tracking/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 20 | `/order-tracking/delivery-confirmation` | `src/app/[locale]/(main)/order-tracking/delivery-confirmation/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 21 | `/order-tracking/payment-invoice` | `src/app/[locale]/(main)/order-tracking/payment-invoice/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 22 | `/payment-invoice` | `src/app/[locale]/(main)/payment-invoice/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 23 | `/quick-order` | `src/app/[locale]/(main)/quick-order/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 24 | `/regional-hubs` | `src/app/[locale]/(main)/regional-hubs/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 25 | `/regional-hubs/cum-1` | `src/app/[locale]/(main)/regional-hubs/cum-1/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 26 | `/regional-hubs/cum-2` | `src/app/[locale]/(main)/regional-hubs/cum-2/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 27 | `/resources` | `src/app/[locale]/(main)/resources/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 28 | `/resources/events` | `src/app/[locale]/(main)/resources/events/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 29 | `/resources/events/[slug]` | `src/app/[locale]/(main)/resources/events/[slug]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 30 | `/resources/events/[slug]/register` | `src/app/[locale]/(main)/resources/events/[slug]/register/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 31 | `/resources/news/[slug]` | `src/app/[locale]/(main)/resources/news/[slug]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 32 | `/resources/[slug]` | `src/app/[locale]/(main)/resources/[slug]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 33 | `/sample-requests` | `src/app/[locale]/(main)/sample-requests/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 34 | `/sample-requests/[id]` | `src/app/[locale]/(main)/sample-requests/[id]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 35 | `/solutions` | `src/app/[locale]/(main)/solutions/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 36 | `/solutions/listProduct` | `src/app/[locale]/(main)/solutions/listProduct/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 37 | `/solutions/listProduct/[slug]` | `src/app/[locale]/(main)/solutions/listProduct/[slug]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 38 | `/solutions/searchProduct` | `src/app/[locale]/(main)/solutions/searchProduct/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |

## Checklist Trang Auth

| STT | URL | File | Title dung cap | Eyebrow khong la title | Body/Caption dung token | Weight dung rule | Trang thai | Ghi chu |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| 39 | `/login` | `src/app/[locale]/(auth)/login/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 40 | `/register` | `src/app/[locale]/(auth)/register/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 41 | `/register/confirm` | `src/app/[locale]/(auth)/register/confirm/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 42 | `/forgot-password` | `src/app/[locale]/(auth)/forgot-password/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 43 | `/reset-password` | `src/app/[locale]/(auth)/reset-password/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 44 | `/change-password` | `src/app/[locale]/(auth)/change-password/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 45 | `/verify-otp` | `src/app/[locale]/(auth)/verify-otp/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |

## Checklist Trang Admin

| STT | URL | File | Title dung cap | Eyebrow khong la title | Body/Caption dung token | Weight dung rule | Trang thai | Ghi chu |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| 46 | `/admin` | `src/app/[locale]/admin/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 47 | `/admin/articles` | `src/app/[locale]/admin/articles/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 48 | `/admin/attributes` | `src/app/[locale]/admin/attributes/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 49 | `/admin/categories` | `src/app/[locale]/admin/categories/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 50 | `/admin/contact-requests` | `src/app/[locale]/admin/contact-requests/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 51 | `/admin/contact-requests/[id]` | `src/app/[locale]/admin/contact-requests/[id]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 52 | `/admin/hubs` | `src/app/[locale]/admin/hubs/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 53 | `/admin/import` | `src/app/[locale]/admin/import/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 54 | `/admin/industrial-zones` | `src/app/[locale]/admin/industrial-zones/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 55 | `/admin/products` | `src/app/[locale]/admin/products/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 56 | `/admin/rfqs` | `src/app/[locale]/admin/rfqs/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 57 | `/admin/sample-requests` | `src/app/[locale]/admin/sample-requests/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 58 | `/admin/sample-requests/[id]` | `src/app/[locale]/admin/sample-requests/[id]/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 59 | `/admin/skus` | `src/app/[locale]/admin/skus/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 60 | `/admin/subscribers` | `src/app/[locale]/admin/subscribers/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |
| 61 | `/admin/users` | `src/app/[locale]/admin/users/page.tsx` | [x] | [x] | [x] | [x] | [x] | OK |

## Quy Tac Danh Dau

- `[ ]`: chua kiem.
- `[x]`: da kiem va dung rule.
- Ghi chu `FIX`: co loi can sua.
- Ghi chu `N/A`: page khong co loai text do.
- Neu gap eyebrow dang dung title scale, danh `FIX` va doi ve `text-eyebrow` hoac `text-caption-responsive`.

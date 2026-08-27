# Checklist Đồng bộ Lề Tiêu Chuẩn (Frontend Align Padding Grid)

Tài liệu này ghi nhận toàn bộ các file nằm trong thư mục `src/app/[locale]` đang bị lệch lề tiêu chuẩn và kế hoạch điều chỉnh tương ứng theo thiết kế hệ thống.

---

## 📐 Quy tắc khoảng cách lề tiêu chuẩn của dự án:
* **Mobile (< 640px):** `px-4` (16px)
* **Tablet (>= 640px):** `sm:px-8` (32px)
* **Laptop (>= 1024px):** `lg:px-12` (48px)
* **Desktop (>= 1280px):** `xl:px-16` (64px)
* **Max-width & Căn giữa:** `mx-auto w-full max-w-[1440px]`

**Lớp bọc chuẩn (Container Class):**
`mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16`

---

## 📋 Danh sách các File cần cập nhật lớp bọc lề (Checklist)

### 1. Khu vực `src/app/[locale]/(main)` (Trang phía người dùng)

- [x] **`solutions/page.tsx`**
  - **Lớp hiện tại:** `relative container mx-auto px-4 z-10 py-10 lg:py-16`
  - **Đề xuất sửa:** `relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 z-10 py-10 lg:py-16`

- [x] **`regional-hubs/[slug]/page.tsx`**
  - **Lớp hiện tại:** `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16`
  - **Đề xuất sửa:** `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16`

- [x] **`contact/page.tsx`**
  - **Lớp hiện tại:** `mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4`
  - **Đề xuất sửa:** `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 py-4`

- [x] **`about/page.tsx`**
  - **Lớp hiện tại:** Dòng 19 và 29 đang sử dụng `mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4`
  - **Đề xuất sửa:** Đổi sang `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 py-4`

- [x] **`about/standards/page.tsx`**
  - **Lớp hiện tại:** `mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4`
  - **Đề xuất sửa:** `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 py-4`

- [x] **`about/sustainability/page.tsx`**
  - **Lớp hiện tại:** Dòng 251, 292, 354, 433 sử dụng `mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-[80px]`
  - **Đề xuất sửa:** Thay thế `lg:px-[80px]` bằng `lg:px-12 xl:px-16` và thêm `w-full` vào các container.

- [x] **`about/careers/page.tsx`**
  - **Lớp hiện tại:** `mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4`
  - **Đề xuất sửa:** `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 py-4`

- [x] **`about/careers/[slug]/page.tsx`**
  - **Lớp hiện tại:** `mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4`
  - **Đề xuất sửa:** `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 py-4`

- [x] **`about/careers/[slug]/apply/page.tsx`**
  - **Lớp hiện tại:** `mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16`
  - **Đề xuất sửa:** `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16`

- [x] **`about/careers/apply-success/page.tsx`**
  - **Lớp hiện tại:** `mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16`
  - **Đề xuất sửa:** `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16`

- [x] **`about/contact-success/page.tsx`**
  - **Lớp hiện tại:** `mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16`
  - **Đề xuất sửa:** `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16`

- [x] **`sample-requests/page.tsx`**
  - **Lớp hiện tại:** `mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-8 sm:gap-8 lg:px-16 lg:py-12`
  - **Đề xuất sửa:** Đổi `lg:px-16` thành `lg:px-12 xl:px-16`

- [x] **`sample-requests/[id]/page.tsx`**
  - **Lớp hiện tại:** `mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-8 sm:gap-8 lg:px-16 lg:py-12`
  - **Đề xuất sửa:** Đổi `lg:px-16` thành `lg:px-12 xl:px-16`

- [x] **`resources/events/[slug]/page.tsx`**
  - **Lớp hiện tại:** `mx-auto max-w-[1200px] px-4 sm:px-8` (Dòng 91 và 104)
  - **Đề xuất sửa:** Đổi chiều rộng tối đa thành `max-w-[1440px]` và thêm `lg:px-12 xl:px-16` để đồng nhất với các trang thông tin khác.

- [x] **`industries/[slug]/page.tsx`**
  - **Lớp hiện tại:** `<CtaBanner containerClassName="max-w-[1440px] px-4 sm:px-8 lg:px-16" />`
  - **Đề xuất sửa:** Đổi thành `containerClassName="max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16"`

---

### 2. Khu vực `src/app/[locale]/admin` (Trang quản trị viên)

- [x] **`admin/import/page.tsx`**
  - **Lớp hiện tại:** `mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-10 sm:px-8 lg:px-16 lg:py-14`
  - **Đề xuất sửa:** Đổi `lg:px-16` thành `lg:px-12 xl:px-16`

- [x] **`admin/hubs/page.tsx`**
  - **Lớp hiện tại:** `w-full px-4 py-8 sm:px-8 lg:px-12`
  - **Đề xuất sửa:** Thay thế bằng `mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16`

- [x] **`admin/sample-requests/[id]/page.tsx`**
  - **Lớp hiện tại:** `mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-8 sm:gap-8 lg:px-16 lg:py-12`
  - **Đề xuất sửa:** Đổi `lg:px-16` thành `lg:px-12 xl:px-16`

- [x] **`admin/contact-requests/[id]/page.tsx`**
  - **Lớp hiện tại:** `mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-8 sm:gap-8 lg:px-16 lg:py-12`
  - **Đề xuất sửa:** Đổi `lg:px-16` thành `lg:px-12 xl:px-16`

# ULink B2B Platform - Tổng hợp chức năng hiện tại

> Cập nhật: 2026-09-20
> Mục đích: Dùng làm cơ sở nghiệm thu dự án

---

## Tổng quan

Nền tảng thương mại điện tử B2B ngành vật liệu/bao bì công nghiệp, hỗ trợ đa ngôn ngữ (Tiếng Việt, English, 日本語). Frontend: Next.js 14, Backend: Directus + PostgreSQL + Redis, Thanh toán: VNPay.

---

## 1. Trang công khai (Public Pages)

### 1.1 Trang chủ
- Hero banner
- Danh mục sản phẩm nổi bật
- Giải pháp theo ngành
- Case studies
- Logo đối tác & chứng nhận
- Quy trình làm việc
- Tin tức & tài nguyên
- CTA banner
- Đăng ký newsletter

### 1.2 Sản phẩm & Giải pháp (`/solutions`)
- Trang tổng quan giải pháp
- Danh sách sản phẩm theo danh mục (`/solutions/listProduct`)
- Chi tiết sản phẩm (`/solutions/listProduct/[slug]`)
  - Gallery ảnh sản phẩm
  - Chọn SKU/biến thể
  - Tabs thông tin (specs, tài liệu)
  - Tải tài liệu (TDS, MSDS, chứng nhận, brochure)
  - Nút thêm vào giỏ hàng
  - CTA liên hệ
- Tìm kiếm sản phẩm (`/solutions/searchProduct`)
- Bộ lọc sản phẩm (sidebar)

### 1.3 Ngành công nghiệp (`/industries`)
- Trang tổng quan ngành
- Trang ngành động (`/industries/[slug]`)
- Các trang ngành riêng: Xây dựng, Điện tử, Thực phẩm, Nội thất, Logistics, Dược phẩm

### 1.4 Giới thiệu (`/about`)
- Giới thiệu ULink
- Tuyển dụng (`/about/careers`)
  - Chi tiết vị trí (`/about/careers/[slug]`)
  - Form ứng tuyển (`/about/careers/[slug]/apply`)
  - Trang ứng tuyển thành công (`/about/careers/apply-success`)
- Tin tức (`/about/news`) + chi tiết (`/about/news/[id]`)
- Tiêu chuẩn chất lượng (`/about/standards`)
- Phát triển bền vững (`/about/sustainability`)
- Trang liên hệ thành công (`/about/contact-success`)

### 1.5 Tài nguyên (`/resources`)
- Hub tài nguyên
- Chi tiết tài nguyên (`/resources/[slug]`)
- Sự kiện (`/resources/events`) + chi tiết (`/resources/events/[slug]`) + đăng ký (`/resources/events/[slug]/register`)
- Bài viết/tin tức (`/resources/news/[slug]`)

### 1.6 Trung tâm vùng (`/regional-hubs`)
- Tổng quan các hub
- Chi tiết từng hub (cum-1, cum-2)
- Bản đồ Việt Nam

### 1.7 Liên hệ (`/contact`)
- Form liên hệ
- Trang xác nhận gửi thành công

---

## 2. Chức năng mua hàng

### 2.1 Giỏ hàng (`/cart`)
- Xem giỏ hàng
- Cập nhật số lượng
- Xóa sản phẩm

### 2.2 Thanh toán (`/checkout`)
- Flow checkout
- Tích hợp VNPay (tạo URL thanh toán, xác nhận thanh toán)
- Trang callback thanh toán (`/payment-return`)

### 2.3 Đặt hàng nhanh (`/quick-order`)
- Đặt hàng số lượng lớn/nhanh

### 2.4 Xác nhận đơn hàng (`/order-confirmation`)
- Trang xác nhận sau khi đặt hàng

### 2.5 Theo dõi đơn hàng (`/order-tracking`)
- Tra cứu trạng thái đơn hàng
- Xác nhận giao hàng (`/order-tracking/delivery-confirmation`)
- Hóa đơn thanh toán (`/order-tracking/payment-invoice`, `/payment-invoice`)

### 2.6 Báo giá - RFQ (`/my-rfqs`)
- Gửi yêu cầu báo giá
- Xem danh sách RFQ của mình
- Upload file đính kèm

### 2.7 Yêu cầu mẫu (`/sample-requests`)
- Gửi yêu cầu mẫu sản phẩm
- Xem chi tiết yêu cầu mẫu

---

## 3. Xác thực & Tài khoản

- Đăng nhập (`/login`)
- Đăng ký (`/register`) + xác nhận đăng ký
- Quên mật khẩu (`/forgot-password`)
- Đặt lại mật khẩu (`/reset-password`)
- Đổi mật khẩu (`/change-password`)
- Xác thực OTP (`/verify-otp`)
- JWT access + refresh token (cookie-based)

---

## 4. Trang quản trị (Admin)

### 4.1 Dashboard (`/admin`)
- Biểu đồ thống kê

### 4.2 Quản lý sản phẩm
- Sản phẩm (`/admin/products`)
- Danh mục (`/admin/categories`)
- Thuộc tính sản phẩm (`/admin/attributes`)
- SKU (`/admin/skus`)
- Tồn kho (`/admin/inventory`)

### 4.3 Quản lý đơn hàng
- Danh sách đơn (`/admin/orders`)
- Chi tiết đơn (`/admin/orders/[id]`)

### 4.4 Quản lý RFQ (`/admin/rfqs`)

### 4.5 Quản lý yêu cầu mẫu (`/admin/sample-requests`)
- Danh sách + chi tiết

### 4.6 Quản lý nội dung
- Bài viết (`/admin/articles`)
- Người đăng ký newsletter (`/admin/subscribers`)
- Yêu cầu liên hệ (`/admin/contact-requests`) + chi tiết

### 4.7 Quản lý người dùng (`/admin/users`)

### 4.8 Quản lý địa điểm
- Trung tâm vùng (`/admin/hubs`)
- Khu công nghiệp (`/admin/industrial-zones`)

### 4.9 Import dữ liệu (`/admin/import`)
- Workbench import dữ liệu thương mại

---

## 5. Tích hợp hệ thống

| Hệ thống | Mô tả |
|-----------|--------|
| Directus CMS | Backend quản lý nội dung & dữ liệu |
| PostgreSQL 16 | Database chính |
| Redis 7 | Cache SKU |
| VNPay | Cổng thanh toán |
| SMTP | Gửi email thông báo RFQ |
| ERP | Đồng bộ đơn hàng ra hệ thống ERP (outbox pattern) |
| Cloudflare Turnstile | Chống spam/bot trên form RFQ và Liên hệ |
| ISR Revalidation | Tự động cập nhật cache khi nội dung thay đổi trên Directus |

---

## 6. Backend - Directus Extensions

| Extension | Mô tả |
|-----------|--------|
| commercial-import-endpoint | API import dữ liệu thương mại |
| customer-onboarding-endpoint + hook | Đăng ký/onboarding khách hàng |
| docs-endpoint | Phục vụ tài liệu |
| hub-code-sync | Đồng bộ mã trung tâm vùng |
| media-policy-endpoint + hook | Kiểm soát truy cập media |
| otp-endpoint | Tạo & xác thực OTP |
| password-change-endpoint | Flow đổi mật khẩu |
| password-policy-hook | Kiểm tra độ mạnh mật khẩu |
| password-reset-request-endpoint | Flow reset mật khẩu |
| payment-webhook | Nhận webhook thanh toán VNPay |
| security-headers-hook | Thêm security headers |
| sku-autogen-hook | Tự động tạo mã SKU |

---

## 7. Bảo mật & Chống spam

- Cloudflare Turnstile (chống bot trên form RFQ, Liên hệ)
- Chống spam RFQ (rate limiting)
- Idempotency RFQ (chống gửi trùng)
- Security headers (Directus hook)
- Password policy (kiểm tra độ mạnh)
- Internal API authentication (bảo vệ endpoint nội bộ)

---

## 8. Đa ngôn ngữ

- Tiếng Việt (mặc định)
- English
- 日本語 (Tiếng Nhật)

---

## 9. Kỹ thuật

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Directus (self-hosted), PostgreSQL 16, Redis 7
- **Auth**: JWT (access + refresh token), cookie-based
- **Payment**: VNPay
- **Deploy**: Vercel (frontend), Docker (backend)
- **Responsive**: Desktop, Tablet, Mobile

---

## Ghi chú nghiệm thu

> Dùng bảng dưới đây để đánh dấu trạng thái từng hạng mục khi họp với khách hàng.

| # | Hạng mục | OK | Cần sửa | Ghi chú |
|---|----------|----|---------|---------|
| 1 | Trang chủ | | | |
| 2 | Danh sách sản phẩm | | | |
| 3 | Chi tiết sản phẩm | | | |
| 4 | Tìm kiếm sản phẩm | | | |
| 5 | Giỏ hàng | | | |
| 6 | Thanh toán / VNPay | | | |
| 7 | Đặt hàng nhanh | | | |
| 8 | Theo dõi đơn hàng | | | |
| 9 | RFQ (Báo giá) | | | |
| 10 | Yêu cầu mẫu | | | |
| 11 | Đăng nhập / Đăng ký | | | |
| 12 | Quên / Đổi mật khẩu | | | |
| 13 | Trang ngành công nghiệp | | | |
| 14 | Trang giới thiệu | | | |
| 15 | Tuyển dụng | | | |
| 16 | Tin tức / Tài nguyên | | | |
| 17 | Sự kiện | | | |
| 18 | Trung tâm vùng | | | |
| 19 | Liên hệ | | | |
| 20 | Newsletter | | | |
| 21 | Admin - Dashboard | | | |
| 22 | Admin - Quản lý sản phẩm | | | |
| 23 | Admin - Quản lý đơn hàng | | | |
| 24 | Admin - Quản lý RFQ | | | |
| 25 | Admin - Quản lý yêu cầu mẫu | | | |
| 26 | Admin - Quản lý nội dung | | | |
| 27 | Admin - Quản lý người dùng | | | |
| 28 | Admin - Quản lý địa điểm | | | |
| 29 | Admin - Import dữ liệu | | | |
| 30 | Đa ngôn ngữ (VI/EN/JA) | | | |
| 31 | Responsive (Mobile/Tablet) | | | |
| 32 | Tích hợp ERP | | | |
| 33 | Chống spam (Turnstile + rate limit) | | | |
| 34 | Directus Extensions (14 module) | | | |
| 35 | Sản phẩm đã lưu / Yêu thích | | | |

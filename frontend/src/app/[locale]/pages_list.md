# Danh Sách Trang & Đường Dẫn (URL Route Map) - ULink B2B Platform

Tài liệu này liệt kê toàn bộ các trang (Pages/Routes) hiện có trong dự án Next.js tại đường dẫn `frontend/src/app/[locale]` và phân loại các URL được liên kết trực tiếp từ **Header Navigation** của hệ thống.

> **Lưu ý về Cấu trúc URL:** Tất cả các đường dẫn dưới đây đều nằm dưới cấu trúc định tuyến đa ngôn ngữ `[locale]` (ví dụ: `/vi/...` hoặc `/en/...`).

---

## 1. Bản Đồ Điều Hướng Từ Header (Header Navigation Map)

Dưới đây là các đường dẫn (URL) mà người dùng có thể truy cập trực tiếp từ **Header** (Header Desktop & Mobile Drawer Menu, bao gồm Logo, Menu chính, Dropdown Mega Menu, và các nút Hành động):

| Vị Trí Trên Header | Tên Mục / Nút Hướng Đến | Đường Dẫn URL (`/url`) | File Nguồn (`page.tsx`) |
| :--- | :--- | :--- | :--- |
| **Logo** | Trang chủ ULink | `/` | `(main)/page.tsx` |
| **Menu 1: KCN & Hub Vùng** | Trang Tổng quan KCN & Hub | `/regional-hubs` | `(main)/regional-hubs/page.tsx` |
| ↳ *Dropdown Item* | Hub Hà Nam (Cụm 2) | `/regional-hubs/cum-2` | `(main)/regional-hubs/cum-2/page.tsx` |
| ↳ *Dropdown Item* | Cụm Hub 1 | `/regional-hubs/cum-1` | `(main)/regional-hubs/cum-1/page.tsx` |
| ↳ *CTA xem vùng* | Yêu cầu báo giá vùng | `/quick-order` | `(main)/quick-order/page.tsx` |
| **Menu 2: Sản Phẩm & Giải Pháp**| Trang Giải pháp & Danh mục tổng hợp | `/solutions` | `(main)/solutions/page.tsx` |
| ↳ *Mega Menu Item* | Danh sách sản phẩm / Danh mục | `/solutions/listProduct` | `(main)/solutions/listProduct/page.tsx` |
| ↳ *Mega Menu Sub-item* | Sản phẩm theo danh mục | `/solutions/listProduct/[slug]` | `(main)/solutions/listProduct/[slug]/page.tsx` |
| ↳ *Mega Menu Search* | Tìm kiếm sản phẩm | `/solutions/searchProduct` | `(main)/solutions/searchProduct/page.tsx` |
| **Menu 3: Ngành Ứng Dụng** | Tổng quan các ngành công nghiệp | `/industries` | `(main)/industries/page.tsx` |
| ↳ *Dropdown / Mega Item* | Trang chi tiết ngành (Điện tử, Cơ khí, Dệt may...) | `/industries/[slug]` | `(main)/industries/[slug]/page.tsx` |
| **Menu 4: Tài Nguyên** | Trung tâm tài nguyên & Bài viết | `/resources` | `(main)/resources/page.tsx` |
| ↳ *Submenu / List* | Tin tức thị trường | `/resources/news/[slug]` | `(main)/resources/news/[slug]/page.tsx` |
| ↳ *Submenu / List* | Sự kiện & Hội thảo | `/resources/events` | `(main)/resources/events/page.tsx` |
| ↳ *Submenu / Detail* | Chi tiết sự kiện | `/resources/events/[slug]` | `(main)/resources/events/[slug]/page.tsx` |
| **Menu 5: Về ULink** | Giới thiệu doanh nghiệp ULink | `/about` | `(main)/about/page.tsx` |
| ↳ *Submenu Item* | Tiêu chuẩn chất lượng | `/about/standards` | `(main)/about/standards/page.tsx` |
| ↳ *Submenu Item* | Phát triển bền vững | `/about/sustainability` | `(main)/about/sustainability/page.tsx` |
| ↳ *Submenu Item* | Tin tức công ty ULink | `/about/news` | `(main)/about/news/page.tsx` |
| ↳ *Submenu Item* | Cơ hội nghề nghiệp / Tuyển dụng | `/about/careers` | `(main)/about/careers/page.tsx` |
| **Header Icons / Buttons** | | | |
| 🔍 **Search Icon** | Tìm kiếm sản phẩm | `/solutions/searchProduct` | `(main)/solutions/searchProduct/page.tsx` |
| 🛒 **Cart Icon** | Giỏ hàng RFQ | `/cart` | `(main)/cart/page.tsx` |
| ⚡ **Nút Báo Giá Nhanh** | Đặt hàng nhanh / Báo giá RFQ | `/quick-order` | `(main)/quick-order/page.tsx` |
| 👤 **User Icon / Auth Button** | Đăng nhập *(Khách chưa đăng nhập)* | `/login` | `(auth)/login/page.tsx` |
| ↳ *Dropdown (User đã đăng nhập)*| Danh sách Báo giá RFQ của tôi | `/my-rfqs` | `(main)/my-rfqs/page.tsx` |
| ↳ *Dropdown (User đã đăng nhập)*| Yêu cầu mẫu thử của tôi | `/sample-requests` | `(main)/sample-requests/page.tsx` |
| ↳ *Dropdown (Quyền Admin)* | Trang quản trị hệ thống | `/admin` | `admin/page.tsx` |

---

## 2. Danh Sách Chi Tiết Toàn Bộ Các Trang Hiện Có Trong Project

Hiện tại hệ thống có **61 trang `page.tsx`** được chia thành 3 nhóm Route chính:

### 2.1. Nhóm Trang Giao Diện Khách Hàng (`(main)` Route Group)

Các trang phục vụ khách hàng B2B tìm kiếm sản phẩm, xem Hub, gửi yêu cầu báo giá (RFQ), theo dõi đơn hàng và xem thông tin doanh nghiệp.

| STT | Tên Trang / Chức Năng | Đường Dẫn URL (`/url`) | Đường Dẫn File Nguồn |
| :---: | :--- | :--- | :--- |
| 1 | **Trang chủ** | `/` | `src/app/[locale]/(main)/page.tsx` |
| 2 | **Giới thiệu ULink** | `/about` | `src/app/[locale]/(main)/about/page.tsx` |
| 3 | **Tuyển dụng** | `/about/careers` | `src/app/[locale]/(main)/about/careers/page.tsx` |
| 4 | Chi tiết vị trí tuyển dụng | `/about/careers/[slug]` | `src/app/[locale]/(main)/about/careers/[slug]/page.tsx` |
| 5 | Ứng tuyển vị trí | `/about/careers/[slug]/apply` | `src/app/[locale]/(main)/about/careers/[slug]/apply/page.tsx` |
| 6 | Trạng thái ứng tuyển thành công | `/about/careers/apply-success` | `src/app/[locale]/(main)/about/careers/apply-success/page.tsx` |
| 7 | Trạng thái gửi liên hệ thành công | `/about/contact-success` | `src/app/[locale]/(main)/about/contact-success/page.tsx` |
| 8 | Tin tức công ty | `/about/news` | `src/app/[locale]/(main)/about/news/page.tsx` |
| 9 | Chi tiết tin tức công ty | `/about/news/[id]` | `src/app/[locale]/(main)/about/news/[id]/page.tsx` |
| 10 | Tiêu chuẩn chất lượng | `/about/standards` | `src/app/[locale]/(main)/about/standards/page.tsx` |
| 11 | Phát triển bền vững (ESG) | `/about/sustainability` | `src/app/[locale]/(main)/about/sustainability/page.tsx` |
| 12 | **Giỏ hàng RFQ** | `/cart` | `src/app/[locale]/(main)/cart/page.tsx` |
| 13 | **Thanh toán / Gửi đơn RFQ** | `/checkout` | `src/app/[locale]/(main)/checkout/page.tsx` |
| 14 | **Trang Liên hệ** | `/contact` | `src/app/[locale]/(main)/contact/page.tsx` |
| 15 | **Danh sách Ngành nghề** | `/industries` | `src/app/[locale]/(main)/industries/page.tsx` |
| 16 | Chi tiết ngành nghề | `/industries/[slug]` | `src/app/[locale]/(main)/industries/[slug]/page.tsx` |
| 17 | **Danh sách RFQ cá nhân** | `/my-rfqs` | `src/app/[locale]/(main)/my-rfqs/page.tsx` |
| 18 | **Xác nhận đơn hàng** | `/order-confirmation` | `src/app/[locale]/(main)/order-confirmation/page.tsx` |
| 19 | **Theo dõi đơn hàng** | `/order-tracking` | `src/app/[locale]/(main)/order-tracking/page.tsx` |
| 20 | Xác nhận giao hàng | `/order-tracking/delivery-confirmation` | `src/app/[locale]/(main)/order-tracking/delivery-confirmation/page.tsx` |
| 21 | Hóa đơn & Thanh toán đơn hàng | `/order-tracking/payment-invoice` | `src/app/[locale]/(main)/order-tracking/payment-invoice/page.tsx` |
| 22 | Thanh toán hóa đơn | `/payment-invoice` | `src/app/[locale]/(main)/payment-invoice/page.tsx` |
| 23 | **Đặt hàng nhanh (Quick Order)** | `/quick-order` | `src/app/[locale]/(main)/quick-order/page.tsx` |
| 24 | **Tổng quan Hub & KCN** | `/regional-hubs` | `src/app/[locale]/(main)/regional-hubs/page.tsx` |
| 25 | Chi tiết Cụm Hub 1 | `/regional-hubs/cum-1` | `src/app/[locale]/(main)/regional-hubs/cum-1/page.tsx` |
| 26 | Chi tiết Cụm Hub 2 (Hub Hà Nam) | `/regional-hubs/cum-2` | `src/app/[locale]/(main)/regional-hubs/cum-2/page.tsx` |
| 27 | **Trung tâm Tài nguyên** | `/resources` | `src/app/[locale]/(main)/resources/page.tsx` |
| 28 | Danh sách sự kiện | `/resources/events` | `src/app/[locale]/(main)/resources/events/page.tsx` |
| 29 | Chi tiết sự kiện | `/resources/events/[slug]` | `src/app/[locale]/(main)/resources/events/[slug]/page.tsx` |
| 30 | Đăng ký tham gia sự kiện | `/resources/events/[slug]/register` | `src/app/[locale]/(main)/resources/events/[slug]/register/page.tsx` |
| 31 | Chi tiết bài viết tin tức | `/resources/news/[slug]` | `src/app/[locale]/(main)/resources/news/[slug]/page.tsx` |
| 32 | Chi tiết tài liệu / bài viết | `/resources/[slug]` | `src/app/[locale]/(main)/resources/[slug]/page.tsx` |
| 33 | **Yêu cầu mẫu thử cá nhân** | `/sample-requests` | `src/app/[locale]/(main)/sample-requests/page.tsx` |
| 34 | Chi tiết yêu cầu mẫu thử | `/sample-requests/[id]` | `src/app/[locale]/(main)/sample-requests/[id]/page.tsx` |
| 35 | **Tổng quan Sản phẩm & Giải pháp**| `/solutions` | `src/app/[locale]/(main)/solutions/page.tsx` |
| 36 | Danh sách sản phẩm / Danh mục | `/solutions/listProduct` | `src/app/[locale]/(main)/solutions/listProduct/page.tsx` |
| 37 | Chi tiết sản phẩm theo danh mục | `/solutions/listProduct/[slug]` | `src/app/[locale]/(main)/solutions/listProduct/[slug]/page.tsx` |
| 38 | Tìm kiếm sản phẩm nâng cao | `/solutions/searchProduct` | `src/app/[locale]/(main)/solutions/searchProduct/page.tsx` |

---

### 2.2. Nhóm Trang Xác Thực Người Dùng (`(auth)` Route Group)

Các trang phục vụ quy trình đăng nhập, đăng ký và quản lý tài khoản thành viên B2B.

| STT | Tên Trang / Chức Năng | Đường Dẫn URL (`/url`) | Đường Dẫn File Nguồn |
| :---: | :--- | :--- | :--- |
| 39 | **Đăng nhập** | `/login` | `src/app/[locale]/(auth)/login/page.tsx` |
| 40 | **Đăng ký tài khoản B2B** | `/register` | `src/app/[locale]/(auth)/register/page.tsx` |
| 41 | Xác nhận đăng ký | `/register/confirm` | `src/app/[locale]/(auth)/register/confirm/page.tsx` |
| 42 | **Quên mật khẩu** | `/forgot-password` | `src/app/[locale]/(auth)/forgot-password/page.tsx` |
| 43 | **Đặt lại mật khẩu** | `/reset-password` | `src/app/[locale]/(auth)/reset-password/page.tsx` |
| 44 | **Đổi mật khẩu** | `/change-password` | `src/app/[locale]/(auth)/change-password/page.tsx` |
| 45 | **Xác thực OTP** | `/verify-otp` | `src/app/[locale]/(auth)/verify-otp/page.tsx` |

---

### 2.3. Nhóm Trang Quản Trị Hệ Thống (`admin` Route Group)

Các trang dành riêng cho Quản trị viên (Admin) để quản lý sản phẩm, danh mục, RFQ, mẫu thử, Hub và người dùng.

| STT | Tên Trang / Chức Năng | Đường Dẫn URL (`/url`) | Đường Dẫn File Nguồn |
| :---: | :--- | :--- | :--- |
| 46 | **Admin Dashboard** | `/admin` | `src/app/[locale]/admin/page.tsx` |
| 47 | Quản lý Bài viết & Tin tức | `/admin/articles` | `src/app/[locale]/admin/articles/page.tsx` |
| 48 | Quản lý Thuộc tính sản phẩm | `/admin/attributes` | `src/app/[locale]/admin/attributes/page.tsx` |
| 49 | Quản lý Danh mục | `/admin/categories` | `src/app/[locale]/admin/categories/page.tsx` |
| 50 | Quản lý Yêu cầu liên hệ | `/admin/contact-requests` | `src/app/[locale]/admin/contact-requests/page.tsx` |
| 51 | Chi tiết yêu cầu liên hệ | `/admin/contact-requests/[id]` | `src/app/[locale]/admin/contact-requests/[id]/page.tsx` |
| 52 | Quản lý Hub vùng | `/admin/hubs` | `src/app/[locale]/admin/hubs/page.tsx` |
| 53 | Nhập dữ liệu hàng loạt (Import) | `/admin/import` | `src/app/[locale]/admin/import/page.tsx` |
| 54 | Quản lý Khu công nghiệp | `/admin/industrial-zones` | `src/app/[locale]/admin/industrial-zones/page.tsx` |
| 55 | Quản lý Sản phẩm | `/admin/products` | `src/app/[locale]/admin/products/page.tsx` |
| 56 | Quản lý Báo giá RFQ | `/admin/rfqs` | `src/app/[locale]/admin/rfqs/page.tsx` |
| 57 | Quản lý Yêu cầu mẫu thử | `/admin/sample-requests` | `src/app/[locale]/admin/sample-requests/page.tsx` |
| 58 | Chi tiết yêu cầu mẫu thử Admin | `/admin/sample-requests/[id]` | `src/app/[locale]/admin/sample-requests/[id]/page.tsx` |
| 59 | Quản lý SKU biến thể | `/admin/skus` | `src/app/[locale]/admin/skus/page.tsx` |
| 60 | Quản lý Đăng ký nhận tin (Subscribers)| `/admin/subscribers` | `src/app/[locale]/admin/subscribers/page.tsx` |
| 61 | Quản lý Người dùng | `/admin/users` | `src/app/[locale]/admin/users/page.tsx` |

---
*Tài liệu được khởi tạo tự động dựa trên cấu trúc nguồn thực tế của dự án ULink B2B Platform.*

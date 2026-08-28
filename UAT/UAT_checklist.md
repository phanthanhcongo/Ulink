# TÀI LIỆU NGHIỆM THU GIAO DIỆN (UAT CHECKLIST)
**Dự án:** Ulink B2B Platform
**Ngày lập:** 26/08/2026

---

## GHI CHÚ CHUNG

- **Giao diện**: Đã kiểm tra khớp với thiết kế Figma Desktop trên từng trang.
- **Responsive**: Mỗi trang đã kiểm tra trên 3 kích thước màn hình riêng biệt.
- **Hiệu ứng**: Fade-in, Hover, Transition, Hamburger Menu, Drawer đã hoạt động.
- **Ký hiệu**: [x] = Đạt, [ ] = Chưa đạt (ghi rõ lý do).
- **Phân loại dữ liệu**:
  - **CRUD (Directus)**: Danh mục, Thuộc tính, SKUs, Sản phẩm, RFQ, Hàng mẫu, Tài khoản User, Hub, Đăng ký bản tin, Liên hệ
  - **Gửi form (API)**: Contact, RFQ, Sample request, Newsletter, Register, Forgot/Reset/Change password, Verify OTP
  - **Tĩnh (hardcode)**: Trang chủ, Giới thiệu, Chất lượng, Bền vững, Tiêu chuẩn, Năng lực, Tin tức, Tuyển dụng, Giải pháp, Cụm kho, Tài nguyên, Sự kiện, Giỏ hàng, Thanh toán, Theo dõi đơn hàng, Yêu thích, Cài đặt

---

## TỔNG HỢP NHANH

| Nhóm | SL | Desktop | Tablet | Mobile |
|:---|---:|:---:|:---:|:---:|
| I. Trang User | 39 | | | |
| II. Auth | 7 | | | |
| III. Admin | 15 | | | |
| IV. Nền tảng | 8 | | | |
| **Tổng** | **69** | | | |

---

## I. TRANG USER (CLIENT UI) — 39 trang

### 1.1 Trang chủ & Giới thiệu công ty (Discovery)

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 1 | **Trang Chủ** | `/` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 2 | **Giới Thiệu** | `/about` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 3 | **Phát Triển Bền Vững** | `/about/sustainability` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 4 | **Tiêu Chuẩn & CN** | `/about/standards` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 5 | **Liên Hệ** | `/contact` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã gửi được form liên hệ lên hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 6 | **LH Thành Công** | `/about/contact-success` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.2 Ngành hàng & Giải pháp (Browse Catalog)

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 7 | **DM Ngành Hàng** | `/industries` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 8 | **CT Ngành Hàng** | `/industries/[slug]` | [ ] | [ ] | [ ] | 1. Ko có Figma | |
| 9 | **Giải Pháp B2B** | `/solutions` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 10 | **DS SP Theo GP** | `/solutions/listProduct` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách sản phẩm từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 11 | **CT SP Theo GP** | `/solutions/listProduct/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị chi tiết sản phẩm từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 12 | **DM SP Theo GP** | `/solutions/listProduct/categories/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.3 Cụm kho (Logistics)

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 13 | **Bản Đồ Cụm Kho** | `/regional-hubs` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 14 | **CT Cụm 1** | `/regional-hubs/cum-1` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 15 | **CT Cụm 2** | `/regional-hubs/cum-2` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.4 Tài nguyên & Sự kiện (Information & Community)

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 16 | **Tài Nguyên** | `/resources` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 17 | **CT Tài Nguyên** | `/resources/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 18 | **Sự Kiện** | `/resources/events` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 19 | **CT Sự Kiện** | `/resources/events/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 20 | **ĐK Sự Kiện** | `/resources/events/[slug]/register` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.5 Tin tức & Tuyển dụng (Content & Careers)

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 21 | **Tin Tức** | `/resources/news` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 22 | **CT Tin Tức** | `/resources/news/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 23 | **Tin Tức (About)** | `/about/news` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 24 | **CT Tin Tức (About)** | `/about/news/[id]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 25 | **Tuyển Dụng** | `/about/careers` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 26 | **CT Vị Trí TD** | `/about/careers/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 27 | **Ứng Tuyển** | `/about/careers/[slug]/apply` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 28 | **UT Thành Công** | `/about/careers/apply-success` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.6 Mua hàng & Đơn hàng (Transactions)

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 29 | **Đặt Hàng Nhanh & Tạo RFQ** | `/quick-order` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã gửi được RFQ lên hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 30 | **Giỏ Hàng** | `/cart` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 31 | **Thanh Toán** | `/checkout` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 32 | **RFQ Của Tôi** | `/my-rfqs` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách RFQ của user từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 33 | **YC Hàng Mẫu** | `/sample-requests` | [ ] | [ ] | [ ] | 1.Ko có figma<br>2. Đã gửi được yêu cầu hàng mẫu lên hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 34 | **CT YC HM** | `/sample-requests/[id]` | [ ] | [ ] | [ ] | 1. ko có Figma<br>2. Đã hiển thị chi tiết yêu cầu từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.7 Theo dõi & Thanh toán (Post-Purchase)

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 35 | **Theo Dõi ĐH** | `/order-tracking` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 36 | **HĐơn (Tracking)** | `/order-tracking/payment-invoice` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 37 | **XN Giao Hàng** | `/order-tracking/delivery-confirmation` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 38 | **XN Đơn Hàng** | `/order-confirmation` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 39 | **HĐơn & TT** | `/payment-invoice` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

---

## II. AUTH (ĐĂNG NHẬP / ĐĂNG KÝ) — 7 trang

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 40 | **Đăng Nhập** | `/login` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã đăng nhập được bằng email + password<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 41 | **Đăng Ký** | `/register` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã tạo tài khoản thành công<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 42 | **XN Đăng Ký** | `/register/confirm` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 43 | **Quên MK** | `/forgot-password` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã gửi yêu cầu reset mật khẩu<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 44 | **Đặt Lại MK** | `/reset-password` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã đặt lại mật khẩu bằng token<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 45 | **Xác Thực OTP** | `/verify-otp` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã xác thực OTP thành công<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 46 | **Đổi MK** | `/change-password` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã đổi mật khẩu thành công<br>3. Đã responsive Desktop, Tablet, Mobile | |

---

## III. ADMIN (QUẢN TRỊ) — 15 trang

> CMS articles, categories, attributes không nằm trong nghiệm thu.

### 3.1 Dashboard

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 47 | **Bảng Điều Khiển** | `/admin` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Sidebar thu gọn trên mobile<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 3.2 Quản lý sản phẩm & kho

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 48 | **QL Danh Mục** | `/admin/categories` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách danh mục từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa danh mục<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 49 | **QL Thuộc Tính** | `/admin/attributes` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách thuộc tính từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa thuộc tính<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 50 | **QL SKUs** | `/admin/skus` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách SKUs từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa SKU<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 51 | **QL Sản Phẩm** | `/admin/products` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách sản phẩm từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa sản phẩm<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 52 | **QL Cụm Kho** | `/admin/hubs` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách hubs từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa hub<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 53 | **QL Khu Công Nghiệp** | `/admin/industrial-zones` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách KCN từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa KCN<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 54 | **Nhập DL** | `/admin/import` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã import được dữ liệu vào hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 3.3 Quản lý yêu cầu & đơn hàng

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 55 | **QL RFQ** | `/admin/rfqs` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách RFQ từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 56 | **CT RFQ** | `/admin/rfqs/[id]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị chi tiết RFQ từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 57 | **QL Hàng Mẫu** | `/admin/sample-requests` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách yêu cầu HM từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 58 | **CT Hàng Mẫu** | `/admin/sample-requests/[id]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị chi tiết yêu cầu HM từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 59 | **QL Liên Hệ** | `/admin/contact-requests` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách liên hệ từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 60 | **CT Liên Hệ** | `/admin/contact-requests/[id]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị chi tiết liên hệ từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 3.4 Quản lý người dùng

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 61 | **QL ĐK Bản Tin** | `/admin/subscribers` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách người ĐK bản tin từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 62 | **QL Thành Viên** | `/admin/users` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách user từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |

---

## IV. TÍNH NĂNG NỀN TẢNG — 8 mục

| STT | Tính năng | Mô tả | KQ |
|:---:|:---|:---|---:|
| 63 | **Email (SMTP)** | Gửi email welcome, OTP, reset link, xác nhận đổi MK | [ ] |
| 64 | **Redis Cache** | OTP, RFQ idempotency, SKU cache | [ ] |
| 65 | **RBAC (Phân quyền)** | 6 roles: Admin, Visitor, Editor, Sales, Customer, Frontend Service | [ ] |
| 66 | **Media Policy** | Soft-delete/hard-delete file, audit log, cleanup | [ ] |
| 67 | **ERP Integration** | Outbox pattern: integration_events + worker drain | [ ] |
| 68 | **ISR Revalidation** | Webhook → purge cache khi content thay đổi | [ ] |
| 69 | **SKU Cache** | Redis-backed SKU lookup | [ ] |
| 70 | **API Docs (Swagger)** | OpenAPI spec tại GET /docs/ | [ ] |

---

## TỔNG HỢP

| Nhóm | SL | Desktop | Tablet | Mobile |
|:---|---:|:---:|:---:|:---:|
| I. Trang User | 39 | | | |
| II. Auth | 7 | | | |
| III. Admin | 16 | | | |
| IV. Nền tảng | 8 | — | — | — |
| **Tổng** | **70** | | | |

---

## NGƯỜI NGHIỆM THU

| Họ tên | Vai trò | Ngày | Chữ ký |
|:---| :---|:---:|:---:|
| ___________ | ___________ | ___________ | ___________ |
| ___________ | ___________ | ___________ | ___________ |

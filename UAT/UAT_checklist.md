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
| I. Trang User | 45 | | | |
| II. Auth | 7 | | | |
| III. Admin | 13 | | | |
| IV. Nền tảng | 10 | | | |
| **Tổng** | **75** | | | |

---

## I. TRANG USER (CLIENT UI) — 45 trang

### 1.1 Trang chủ & Giới thiệu công ty

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 1 | **Trang Chủ** | `/` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 2 | **Giới Thiệu** | `/about` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 3 | **Phát Triển Bền Vững** | `/about/sustainability` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 4 | **Tiêu Chuẩn & CN** | `/about/standards` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 5 | **Liên Hệ** | `/contact` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã gửi được form liên hệ lên hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 8 | **LH Thành Công** | `/about/contact-success` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.2 Tin tức & Tuyển dụng

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 9 | **Tin Tức** | `/resources/news` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 10 | **CT Tin Tức** | `/resources/news/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 11 | **Tin Tức (About)** | `/about/news` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 12 | **CT Tin Tức (About)** | `/about/news/[id]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 13 | **Tuyển Dụng** | `/about/careers` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 14 | **CT Vị Trí TD** | `/about/careers/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 15 | **Ứng Tuyển** | `/about/careers/[slug]/apply` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 16 | **UT Thành Công** | `/about/careers/apply-success` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.3 Ngành hàng & Giải pháp

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 17 | **DM Ngành Hàng** | `/industries` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 18 | **CT Ngành Hàng** | `/industries/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 19 | **Giải Pháp B2B** | `/solutions` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 20 | **DS SP Theo GP** | `/solutions/listProduct` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách sản phẩm từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 21 | **CT SP Theo GP** | `/solutions/listProduct/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị chi tiết sản phẩm từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 22 | **DM SP Theo GP** | `/solutions/listProduct/categories/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.4 Cụm kho (Hubs)

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 23 | **Bản Đồ Cụm Kho** | `/regional-hubs` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 24 | **CT Cụm 1** | `/regional-hubs/cum-1` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 25 | **CT Cụm 2** | `/regional-hubs/cum-2` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 26 | **CT Hub Slug** | `/regional-hubs/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.5 Tài nguyên & Sự kiện

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 27 | **Tài Nguyên** | `/resources` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 28 | **CT Tài Nguyên** | `/resources/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 29 | **Sự Kiện** | `/resources/events` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 30 | **CT Sự Kiện** | `/resources/events/[slug]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 31 | **ĐK Sự Kiện** | `/resources/events/[slug]/register` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.6 Mua hàng & Đơn hàng

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 32 | **Đặt Hàng Nhanh** | `/quick-order` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 33 | **Giỏ Hàng** | `/cart` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 34 | **Thanh Toán** | `/checkout` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 35 | **Tạo RFQ** | `/rfqs` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã gửi được RFQ lên hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 36 | **RFQ Của Tôi** | `/my-rfqs` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách RFQ của user từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 37 | **YC Hàng Mẫu** | `/sample-requests` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã gửi được yêu cầu hàng mẫu lên hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 38 | **CT YC HM** | `/sample-requests/[id]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị chi tiết yêu cầu từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.7 Theo dõi & Thanh toán

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 39 | **Theo Dõi ĐH** | `/order-tracking` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 40 | **HĐơn (Tracking)** | `/order-tracking/payment-invoice` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 41 | **XN Giao Hàng** | `/order-tracking/delivery-confirmation` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 42 | **XN Đơn Hàng** | `/order-confirmation` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 43 | **HĐơn & TT** | `/payment-invoice` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 1.8 Tài khoản & Yêu thích

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 44 | **SP Yêu Thích** | `/favorites` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 45 | **Cài Đặt TK** | `/settings` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |

---

## II. AUTH (ĐĂNG NHẬP / ĐĂNG KÝ) — 7 trang

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 46 | **Đăng Nhập** | `/login` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã đăng nhập được bằng email + password<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 47 | **Đăng Ký** | `/register` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã tạo tài khoản thành công<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 48 | **XN Đăng Ký** | `/register/confirm` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Data tĩnh (hardcode)<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 49 | **Quên MK** | `/forgot-password` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã gửi yêu cầu reset mật khẩu<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 50 | **Đặt Lại MK** | `/reset-password` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã đặt lại mật khẩu bằng token<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 51 | **Xác Thực OTP** | `/verify-otp` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã xác thực OTP thành công<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 52 | **Đổi MK** | `/change-password` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã đổi mật khẩu thành công<br>3. Đã responsive Desktop, Tablet, Mobile | |

---

## III. ADMIN (QUẢN TRỊ) — 13 trang

> CMS articles, categories, attributes không nằm trong nghiệm thu.

### 3.1 Dashboard

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 53 | **Bảng Điều Khiển** | `/admin` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Sidebar thu gọn trên mobile<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 3.2 Quản lý sản phẩm & kho

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 54 | **QL Danh Mục** | `/admin/categories` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách danh mục từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa danh mục<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 55 | **QL Thuộc Tính** | `/admin/attributes` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách thuộc tính từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa thuộc tính<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 56 | **QL SKUs** | `/admin/skus` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách SKUs từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa SKU<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 57 | **QL Sản Phẩm** | `/admin/products` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách sản phẩm từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa sản phẩm<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 58 | **QL Cụm Kho** | `/admin/hubs` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách hubs từ dữ liệu hệ thống<br>3. Đã thêm/sửa/xóa hub<br>4. Đã responsive Desktop, Tablet, Mobile | |
| 59 | **Nhập DL** | `/admin/import` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã import được dữ liệu vào hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 3.3 Quản lý yêu cầu & đơn hàng

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 60 | **QL RFQ** | `/admin/rfqs` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách RFQ từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 61 | **CT RFQ** | `/admin/rfqs/[id]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị chi tiết RFQ từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 62 | **QL Hàng Mẫu** | `/admin/sample-requests` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách yêu cầu HM từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 63 | **CT Hàng Mẫu** | `/admin/sample-requests/[id]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị chi tiết yêu cầu HM từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 64 | **QL Liên Hệ** | `/admin/contact-requests` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách liên hệ từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 65 | **CT Liên Hệ** | `/admin/contact-requests/[id]` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị chi tiết liên hệ từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |

### 3.4 Quản lý người dùng

| STT | Trang | URL | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---|---:|
| 66 | **QL ĐK Bản Tin** | `/admin/subscribers` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách người ĐK bản tin từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |
| 67 | **QL Thành Viên** | `/admin/users` | [ ] | [ ] | [ ] | 1. Thiết kế giao diện giống Figma<br>2. Đã hiển thị danh sách user từ dữ liệu hệ thống<br>3. Đã responsive Desktop, Tablet, Mobile | |

---

## IV. TÍNH NĂNG NỀN TẢNG — 8 mục

| STT | Tính năng | Mô tả | KQ |
|:---:|:---|:---|---:|
| 68 | **Email (SMTP)** | Gửi email welcome, OTP, reset link, xác nhận đổi MK | [ ] |
| 69 | **Redis Cache** | OTP, RFQ idempotency, SKU cache | [ ] |
| 70 | **RBAC (Phân quyền)** | 6 roles: Admin, Visitor, Editor, Sales, Customer, Frontend Service | [ ] |
| 71 | **Media Policy** | Soft-delete/hard-delete file, audit log, cleanup | [ ] |
| 72 | **ERP Integration** | Outbox pattern: integration_events + worker drain | [ ] |
| 73 | **ISR Revalidation** | Webhook → purge cache khi content thay đổi | [ ] |
| 74 | **SKU Cache** | Redis-backed SKU lookup | [ ] |
| 75 | **API Docs (Swagger)** | OpenAPI spec tại GET /docs/ | [ ] |

---

## TỔNG HỢP

| Nhóm | SL | Desktop | Tablet | Mobile |
|:---|---:|:---:|:---:|:---:|
| I. Trang User | 45 | | | |
| II. Auth | 7 | | | |
| III. Admin | 13 | | | |
| IV. Nền tảng | 8 | — | — | — |
| **Tổng** | **73** | | | |

---

## NGƯỜI NGHIỆM THU

| Họ tên | Vai trò | Ngày | Chữ ký |
|:---|:---|:---:|:---:|
| ___________ | ___________ | ___________ | ___________ |
| ___________ | ___________ | ___________ | ___________ |

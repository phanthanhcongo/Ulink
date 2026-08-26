# TÀI LIỆU NGHIỆM THU GIAO DIỆN (UAT CHECKLIST)
**Dự án:** Ulink B2B Platform
**Ngày lập:** 26/08/2026

---

## GHI CHÚ CHUNG

- **Giao diện**: Đã kiểm tra khớp với thiết kế Figma Desktop trên từng trang.
- **Responsive**: Mỗi trang đã kiểm tra trên 3 kích thước màn hình riêng biệt.
- **Hiệu ứng**: Fade-in, Hover, Transition, Hamburger Menu, Drawer đã hoạt động.
- **Phân loại dữ liệu**:
  - **API**: Trang gọi Directus lấy dữ liệu động, có CRUD / filter / search.
  - **Tĩnh**: Nội dung hardcode, hiển thị danh sách có sẵn.
  - **UI only**: Chỉ có giao diện, backend chưa nằm trong nghiệm thu.
- **Ký hiệu**: [x] = Đạt, [ ] = Chưa đạt (ghi rõ lý do).

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

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 1 | **Trang Chủ** | `/` | API | [ ] | [ ] | [ ] | Đã hiển thị banner quay vòng, danh mục sản phẩm, danh sách ngành hàng, danh sách đối tác, danh sách case study, danh sách tin tức từ Directus. Đã responsive các màn. | |
| 2 | **Giới Thiệu** | `/about` | API | [ ] | [ ] | [ ] | Đã hiển thị nội dung giới thiệu, thống kê, vị trí, hạ tầng, tiêu chuẩn, tin tức từ Directus. Đã responsive các màn. | |
| 3 | **Chất Lượng** | `/about/quality` | Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị hero, quy trình chất lượng, tiêu chuẩn, chứng nhận. Đã responsive các màn. | |
| 4 | **Phát Triển Bền Vững** | `/about/sustainability` | Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị nội dung phát triển bền vững. Đã responsive các màn. | |
| 5 | **Tiêu Chuẩn & Chứng Nhận** | `/about/standards` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách tiêu chuẩn, chứng nhận ISO từ Directus. Đã responsive các màn. | |
| 6 | **Năng Lực Sản Xuất** | `/about/capabilities` | Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị năng lực sản xuất. Đã responsive các màn. | |
| 7 | **Liên Hệ** | `/contact` | API + Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị form liên hệ, thông tin công ty. Đã gửi được form → API /api/contact → lưu Directus. Đã responsive các màn. | |
| 8 | **Gửi Liên Hệ Thành Công** | `/about/contact-success` | Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị trang cảm ơn sau khi gửi liên hệ thành công. Đã responsive các màn. | |

### 1.2 Tin tức & Tuyển dụng

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 9 | **Tin Tức** | `/news` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách blog, đã lọc/xem chi tiết bài viết từ Directus. Đã responsive các màn. | |
| 10 | **Chi Tiết Tin Tức** | `/news/[slug]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết bài viết theo slug từ Directus. Đã responsive các màn. | |
| 11 | **Tin Tức (About)** | `/about/news` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách tin trong About từ Directus. Đã responsive các màn. | |
| 12 | **CT Tin Tức (About)** | `/about/news/[id]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết tin theo id. Đã responsive các màn. | |
| 13 | **Tuyển Dụng** | `/about/careers` | Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị danh sách vị trí tuyển dụng, văn hóa công ty, gallery. Đã responsive các màn. | |
| 14 | **CT Vị Trí TD** | `/about/careers/[slug]` | Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị chi tiết vị trí tuyển dụng. Đã responsive các màn. | |
| 15 | **Ứng Tuyển** | `/about/careers/[slug]/apply` | API + Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị form ứng tuyển, đã gửi được → Directus contact_requests. Đã responsive các màn. | |
| 16 | **UT Thành Công** | `/about/careers/apply-success` | Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị trang cảm ơn ứng tuyển. Đã responsive các màn. | |

### 1.3 Ngành hàng & Giải pháp

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 17 | **DM Ngành Hàng** | `/industries` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách ngành hàng kèm số lượng sản phẩm từ Directus. Đã responsive các màn. | |
| 18 | **CT Ngành Hàng** | `/industries/[slug]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết ngành, challenges, solutions, case studies. Đã responsive các màn. | |
| 19 | **Giải Pháp B2B** | `/solutions` | API + Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị danh mục giải pháp, sản phẩm nổi bật, hubs, FAQs từ Directus. Đã responsive các màn. | |
| 20 | **DS SP Theo GP** | `/solutions/listProduct` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách sản phẩm, đã tìm kiếm, đã lọc theo danh mục từ Directus. Đã responsive các màn. | |
| 21 | **CT SP Theo GP** | `/solutions/listProduct/[slug]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết SP, gallery ảnh, tabs thông số, danh sách tài liệu, SKU selector (chọn biến thể). Đã responsive các màn. | |
| 22 | **DM SP Theo GP** | `/solutions/listProduct/categories/[slug]` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách sản phẩm theo danh mục con. Đã responsive các màn. | |

### 1.4 Cụm kho (Hubs)

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 23 | **Bản Đồ Cụm Kho** | `/regional-hubs` | API | [ ] | [ ] | [ ] | Đã hiển thị bản đồ, danh sách cụm kho, thông tin từng hub từ Directus. Đã responsive các màn. | |
| 24 | **CT Cụm 1** | `/regional-hubs/cum-1` | API + Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị tổng quan hub, offers, solutions, partner, team từ Directus. Đã responsive các màn. | |
| 25 | **CT Cụm 2** | `/regional-hubs/cum-2` | API + Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị tổng quan, fulfillment hub, metrics, solutions, testimonials. Đã responsive các màn. | |
| 26 | **CT Hub Slug** | `/regional-hubs/[slug]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết hub động theo slug từ Directus. Đã responsive các màn. | |

### 1.5 Tài nguyên & Sự kiện

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 27 | **Tài Nguyên** | `/resources` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách tài liệu (TDS, MSDS, brochure) từ Directus. Đã responsive các màn. | |
| 28 | **CT Tài Nguyên** | `/resources/[slug]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết tài liệu, cho phép tải xuống. Đã responsive các màn. | |
| 29 | **Sự Kiện** | `/resources/events` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách sự kiện từ Directus. Đã responsive các màn. | |
| 30 | **CT Sự Kiện** | `/resources/events/[slug]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết sự kiện, thông tin đăng ký. Đã responsive các màn. | |
| 31 | **ĐK Sự Kiện** | `/resources/events/[slug]/register` | API + Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị form đăng ký, đã gửi được → Directus. Đã responsive các màn. | |

### 1.6 Mua hàng & Đơn hàng

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 32 | **Đặt Hàng Nhanh** | `/quick-order` | API | [ ] | [ ] | [ ] | Đã tra cứu SKU qua API, thêm vào giỏ. Đã responsive các màn. | |
| 33 | **Giỏ Hàng** | `/cart` | Local | [ ] | [ ] | [ ] | Đã hiển thị danh sách SP trong giỏ, tăng/giảm số lượng, xóa SP, lưu localStorage. Đã responsive các màn. | |
| 34 | **Thanh Toán** | `/checkout` | UI only | [ ] | [ ] | [ ] | Đã hiển thị form thanh toán. **Backend ko nghiệm thu**. Đã responsive các màn. | |
| 35 | **Tạo RFQ** | `/rfqs` | API | [ ] | [ ] | [ ] | Đã hiển thị form RFQ, validation các trường, chống spam, gửi email thông báo, lưu Directus. Đã responsive các màn. | |
| 36 | **RFQ Của Tôi** | `/my-rfqs` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách RFQ của user, xem chi tiết từng RFQ. Đã responsive các màn. | |
| 37 | **YC Hàng Mẫu** | `/sample-requests` | API | [ ] | [ ] | [ ] | Đã hiển thị form gửi yêu cầu hàng mẫu, đã gửi được → Directus. Đã responsive các màn. | |
| 38 | **CT YC HM** | `/sample-requests/[id]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết yêu cầu hàng mẫu. Đã responsive các màn. | |

### 1.7 Theo dõi & Thanh toán

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 39 | **Theo Dõi ĐH** | `/order-tracking` | UI only | [ ] | [ ] | [ ] | Đã hiển thị giao diện theo dõi đơn hàng. **Backend ko nghiệm thu**. Đã responsive các màn. | |
| 40 | **HĐơn (Tracking)** | `/order-tracking/payment-invoice` | UI only | [ ] | [ ] | [ ] | Đã hiển thị giao diện hóa đơn. **Backend ko nghiệm thu**. Đã responsive các màn. | |
| 41 | **XN Giao Hàng** | `/order-tracking/delivery-confirmation` | UI only | [ ] | [ ] | [ ] | Đã hiển thị giao diện xác nhận giao hàng. **Backend ko nghiệm thu**. Đã responsive các màn. | |
| 42 | **XN Đơn Hàng** | `/order-confirmation` | UI only | [ ] | [ ] | [ ] | Đã hiển thị giao diện xác nhận đơn hàng. **Backend ko nghiệm thu**. Đã responsive các màn. | |
| 43 | **HĐơn & TT** | `/payment-invoice` | UI only | [ ] | [ ] | [ ] | Đã hiển thị giao diện hóa đơn & thanh toán. **Backend ko nghiệm thu**. Đã responsive các màn. | |

### 1.8 Tài khoản & Yêu thích

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 44 | **SP Yêu Thích** | `/favorites` | Local | [ ] | [ ] | [ ] | Đã hiển thị danh sách SP yêu thích, thêm/xóa SP khỏi danh sách. Đã responsive các màn. | |
| 45 | **Cài Đặt TK** | `/settings` | API | [ ] | [ ] | [ ] | Đã hiển thị thông tin cá nhân, đã đổi được mật khẩu. Đã responsive các màn. | |

---

## II. AUTH (ĐĂNG NHẬP / ĐĂNG KÝ) — 7 trang

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 46 | **Đăng Nhập** | `/login` | API | [ ] | [ ] | [ ] | Đã đăng nhập được bằng email + password, remember me. Đã responsive các màn. | |
| 47 | **Đăng Ký** | `/register` | API | [ ] | [ ] | [ ] | Đã tạo tài khoản thành công, nhận email welcome. Đã responsive các màn. | |
| 48 | **XN Đăng Ký** | `/register/confirm` | Tĩnh | [ ] | [ ] | [ ] | Đã hiển thị trang xác nhận đăng ký. Đã responsive các màn. | |
| 49 | **Quên MK** | `/forgot-password` | API | [ ] | [ ] | [ ] | Đã gửi yêu cầu reset, nhận email reset link. Đã responsive các màn. | |
| 50 | **Đặt Lại MK** | `/reset-password` | API | [ ] | [ ] | [ ] | Đã đặt lại mật khẩu bằng token. Đã responsive các màn. | |
| 51 | **Xác Thực OTP** | `/verify-otp` | API | [ ] | [ ] | [ ] | Đã nhận mã OTP qua email, đã xác thực thành công. Đã responsive các màn. | |
| 52 | **Đổi MK** | `/change-password` | API | [ ] | [ ] | [ ] | Đã đổi mật khẩu qua OTP, có rate limit, clear sessions cũ. Đã responsive các màn. | |

---

## III. ADMIN (QUẢN TRỊ) — 13 trang

> CMS articles, categories, attributes không nằm trong nghiệm thu.

### 3.1 Dashboard

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 53 | **Bảng Điều Khiển** | `/admin` | API | [ ] | [ ] | [ ] | Đã hiển thị thống kê tổng quan từ Directus. Sidebar thu gọn trên mobile. Đã responsive các màn. | |

### 3.2 Quản lý sản phẩm & kho

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 54 | **QL Sản Phẩm** | `/admin/products` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách SP, thêm/sửa/xóa SP, quản lý ảnh + danh mục + tiêu chuẩn. Đã responsive các màn. | |
| 55 | **QL SKUs** | `/admin/skus` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách SKUs, SKU auto-generate từ attributes. Đã responsive các màn. | |
| 56 | **QL Cụm Kho** | `/admin/hubs` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách hubs, thêm/sửa hub + zones + team, auto-gen hub_code. Đã responsive các màn. | |
| 57 | **Nhập DL** | `/admin/import` | API | [ ] | [ ] | [ ] | Đã import được CSV (preview + commit), xử lý lỗi từng dòng. Đã responsive các màn. | |

### 3.3 Quản lý yêu cầu & đơn hàng

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 58 | **QL RFQ** | `/admin/rfqs` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách RFQ, phân quyền Sales chỉ xem RFQ được gán. Đã responsive các màn. | |
| 59 | **CT RFQ** | `/admin/rfqs/[id]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết RFQ. Đã responsive các màn. | |
| 60 | **QL Hàng Mẫu** | `/admin/sample-requests` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách yêu cầu hàng mẫu. Đã responsive các màn. | |
| 61 | **CT Hàng Mẫu** | `/admin/sample-requests/[id]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết yêu cầu HM. Đã responsive các màn. | |
| 62 | **QL Liên Hệ** | `/admin/contact-requests` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách liên hệ. Đã responsive các màn. | |
| 63 | **CT Liên Hệ** | `/admin/contact-requests/[id]` | API | [ ] | [ ] | [ ] | Đã hiển thị chi tiết + chuyển trạng thái. Đã responsive các màn. | |

### 3.4 Quản lý người dùng

| STT | Trang | URL | Dữ liệu | Desktop | Tablet | Mobile | Tiêu chí nghiệm thu | KQ |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|---:|
| 64 | **QL Subscribers** | `/admin/subscribers` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách người ĐK bản tin. Đã responsive các màn. | |
| 65 | **QL Thành Viên** | `/admin/users` | API | [ ] | [ ] | [ ] | Đã hiển thị danh sách user, thông tin customer đi kèm. Đã responsive các màn. | |

---

## IV. TÍNH NĂNG NỀN TẢNG — 10 mục

| STT | Tính năng | Mô tả | KQ |
|:---:|:---|:---|---:|
| 66 | **Email (SMTP)** | Gửi email welcome, OTP, reset link, xác nhận đổi MK | [ ] |
| 67 | **Redis Cache** | OTP (10min TTL, 60s cooldown), RFQ idempotency, SKU cache | [ ] |
| 68 | **RBAC (Phân quyền)** | 6 roles: Admin, Visitor, Editor, Sales, Customer, Frontend Service | [ ] |
| 69 | **Media Policy** | Soft-delete/hard-delete file, audit log, cleanup cron | [ ] |
| 70 | **ERP Integration** | Outbox pattern: integration_events + worker drain | [ ] |
| 71 | **ISR Revalidation** | Webhook → purge ISR cache khi content thay đổi | [ ] |
| 72 | **SKU Cache** | Redis-backed SKU lookup, webhook-driven cache invalidation | [ ] |
| 73 | **API Docs (Swagger)** | OpenAPI spec tại GET /docs/ | [ ] |
| 74 | **SEO** | robots.ts, sitemap.ts, next-intl middleware | [ ] |
| 75 | **i18n (Đa ngôn ngữ)** | vi, en, ja + 14 bảng translations Directus | [ ] |

---

## TỔNG HỢP

| Nhóm | SL | Desktop | Tablet | Mobile |
|:---|---:|:---:|:---:|:---:|
| I. Trang User | 45 | | | |
| II. Auth | 7 | | | |
| III. Admin | 13 | | | |
| IV. Nền tảng | 10 | | | |
| **Tổng** | **75** | | | |

---

## NGƯỜI NGHIỆM THU

| Họ tên | Vai trò | Ngày | Chữ ký |
|:---|:---|:---:|:---:|
| ___________ | ___________ | ___________ | ___________ |
| ___________ | ___________ | ___________ | ___________ |

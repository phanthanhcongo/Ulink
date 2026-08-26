# DANH SÁCH TÍNH NĂNG NGHIỆM THU (UAT FEATURES)
**Dự án:** Ulink B2B Platform

---

## Cách dùng
Mỗi đầu mục có cấu trúc:
- **Frontend**: trang + component + API call
- **Backend**: endpoint + service + hook
- **Tests**: file test (nếu có)
- **Trạng thái**: [ ] = chưa nghiệm thu / [x] = đạt

Ghi chú trực tiếp vào dòng nếu không đạt.

---

## I. TRANG USER (CLIENT UI)

### 1.1 Trang chủ & Giới thiệu công ty

#### 1. Trang Chủ (`/`)
- **Frontend**: `(main)/page.tsx` → HeroBanner, FeatureValueBar, ProductCategories, IndustrySolutions, AboutSection, TargetSegments, PartnersCertifications, CaseStudies, WorkingProcess, ResourcesNews, CtaBanner, SupportSection
- **Backend**: Directus collections `hero_banners`, `partners`, `industries`, `product_categories`, `products`, `case_studies`, `blog_posts`, `documents`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 2. Giới Thiệu (`/about`)
- **Frontend**: `(main)/about/page.tsx` → AboutHero, AboutStats, AboutLocation, AboutInfrastructure, AboutStandards, AboutSustainability, AboutNews, AboutContact
- **Backend**: Directus `pages` collection
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 3. Chất Lượng (`/about/quality`)
- **Frontend**: `(main)/about/quality/page.tsx` → quality-hero, quality-process, quality-standards-grid, quality-commitments, quality-badges
- **Backend**: Directus `standards`, `iso_certifications`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 4. Phát Triển Bền Vững (`/about/sustainability`)
- **Frontend**: `(main)/about/sustainability/page.tsx`
- **Backend**: Directus `pages`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 5. Tiêu Chuẩn & Chứng Nhận (`/about/standards`)
- **Frontend**: `(main)/about/standards/page.tsx`
- **Backend**: Directus `standards`, `iso_certifications`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 6. Năng Lực Sản Xuất (`/about/capabilities`)
- **Frontend**: `(main)/about/capabilities/page.tsx`
- **Backend**: Directus `pages`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 7. Liên Hệ (`/contact`)
- **Frontend**: `(main)/contact/page.tsx` → ContactHero, ContactInfoCards, ContactCapabilities
- **Backend (Frontend API)**: `POST /api/contact` → gọi Directus `contact_requests`
- **Backend (Directus)**: `contact_requests` collection
- **Tests**: `contact-request.server.test.ts`, `contact-submit.test.ts`
- [ ] **Nghiệm thu**: ___________

#### 8. Gửi Liên Hệ Thành Công (`/about/contact-success`)
- **Frontend**: `(main)/about/contact-success/page.tsx` → contact-success-hero, contact-next-steps, contact-featured-solutions
- **Backend**: —
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

### 1.2 Tin tức & Tuyển dụng

#### 9. Tin Tức (`/news`)
- **Frontend**: `(main)/news/[slug]/page.tsx` → NewsCard
- **Backend**: Directus `blog_posts`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 10. Chi Tiết Tin Tức (`/news/[slug]`)
- **Frontend**: `(main)/news/[slug]/page.tsx` → news-detail-client
- **Backend**: Directus `blog_posts`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 11. Tin Tức (trong About) (`/about/news`)
- **Frontend**: `(main)/about/news/page.tsx` → AboutNews
- **Backend**: Directus `blog_posts`
- **Tests**: `about-news-data.test.ts`
- [ ] **Nghiệm thu**: ___________

#### 12. Chi Tiết Tin Tức (About) (`/about/news/[id]`)
- **Frontend**: `(main)/about/news/[id]/page.tsx`
- **Backend**: Directus `blog_posts`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 13. Tuyển Dụng (`/about/careers`)
- **Frontend**: `(main)/about/careers/page.tsx` → careers-hero, careers-job-list, careers-culture, careers-gallery, careers-news, careers-newsletter, careers-contact
- **Backend**: Directus `pages`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 14. Chi Tiết Vị Trí Tuyển Dụng (`/about/careers/[slug]`)
- **Frontend**: `(main)/about/careers/[slug]/page.tsx`
- **Backend**: Directus `pages`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 15. Ứng Tuyển (`/about/careers/[slug]/apply`)
- **Frontend**: `(main)/about/careers/[slug]/apply/page.tsx`
- **Backend**: Directus `pages` + `contact_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 16. Ứng Tuyển Thành Công (`/about/careers/apply-success`)
- **Frontend**: `(main)/about/careers/apply-success/page.tsx`
- **Backend**: —
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

### 1.3 Ngành hàng & Giải pháp

#### 17. Danh Mục Ngành Hàng (`/industries`)
- **Frontend**: `(main)/industries/page.tsx` → IndustryHero, IndustryGrid, IndustrySidebar, IndustryValueProps
- **Backend (Directus)**: `industries`, `products_industries`
- **Backend (FE API)**: `fetchIndustries()`, `fetchIndustryProductCounts()`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 18. Chi Tiết Ngành Hàng (`/industries/[slug]`)
- **Frontend**: `(main)/industries/[slug]/page.tsx` → IndustryDetailClient, IndustryChallenges, IndustrySolutions, IndustryCases
- **Backend (Directus)**: `industries`, `products_industries`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 19. Trang Giải Pháp B2B (`/solutions`)
- **Frontend**: `(main)/solutions/page.tsx` → SearchSection, CatalogShowcase, CoreCapabilities, CoreAdvantages, FeaturedProduct, CustomerSegments, CustomSolutions, ProductionMaterials, HubAndPartner, MarketNews, TestimonialsCapabilities, ContactCta, FaqSection
- **Backend (Directus)**: `products`, `product_categories`, `regional_hubs`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 20. Danh Sách Sản Phẩm Theo Giải Pháp (`/solutions/listProduct`)
- **Frontend**: `(main)/solutions/listProduct/page.tsx` → ProductCard, ProductSearch, ProductFilter
- **Backend (Directus)**: `products`, `product_categories`, `product_skus`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 21. Chi Tiết Sản Phẩm Theo Giải Pháp (`/solutions/listProduct/[slug]`)
- **Frontend**: `(main)/solutions/listProduct/[slug]/page.tsx` → ProductDetailClient, ProductImageGallery, ProductTabs, ProductDocuments, SkuSelector, AddToCartButton
- **Backend (Directus)**: `products`, `product_skus`, `product_attributes`, `product_attribute_options`, `products_files`, `products_standards`, `products_regional_hubs`, `documents`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 22. Danh Mục Sản Phẩm Theo Giải Pháp (`/solutions/listProduct/categories/[slug]`)
- **Frontend**: `(main)/solutions/listProduct/categories/[slug]/page.tsx` → CategoryProductsClient
- **Backend (Directus)**: `product_categories`, `products`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

### 1.4 Cụm kho (Hubs)

#### 23. Bản Đồ Cụm Kho Khu Vực (`/regional-hubs`)
- **Frontend**: `(main)/regional-hubs/page.tsx` → hub-hero-section, hub-cluster-list, hub-benefits, VietnamMap
- **Backend (Directus)**: `regional_hubs`, `hub_industrial_zones`, `vn_provinces`
- **Backend (FE API)**: `fetchRegionalHubs()`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 24. Chi Tiết Cụm Kho Cụm 1 (`/regional-hubs/cum-1`)
- **Frontend**: `(main)/regional-hubs/cum-1/page.tsx` → hub-overview, hub-offers, hub-solutions, hub-partner, hub-team, hub-rfq-modal
- **Backend (Directus)**: `regional_hubs`, `hub_industrial_zones`, `hub_team_members`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 25. Chi Tiết Cụm Kho Cụm 2 (`/regional-hubs/cum-2`)
- **Frontend**: `(main)/regional-hubs/cum-2/page.tsx` → hanam-overview, hanam-fulfillment-hub, live-metrics-bar, solution-carousel, testimonial-carousel, working-process
- **Backend (Directus)**: `regional_hubs`, `hub_industrial_zones`, `hub_team_members`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 26. Chi Tiết Cụm Kho Theo Slug (`/regional-hubs/[slug]`)
- **Frontend**: `(main)/regional-hubs/[slug]/page.tsx`
- **Backend (Directus)**: `regional_hubs`
- **Backend (Hook)**: `hub-code-sync` → auto-generate `hub_code`, sync on province change
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

### 1.5 Tài nguyên & Sự kiện

#### 27. Tài Nguyên (`/resources`)
- **Frontend**: `(main)/resources/page.tsx` → resources-client, resource-card
- **Backend (Directus)**: `documents`
- **Tests**: `resources-download-hidden.test.ts`
- [ ] **Nghiệm thu**: ___________

#### 28. Chi Tiết Tài Nguyên (`/resources/[slug]`)
- **Frontend**: `(main)/resources/[slug]/page.tsx` → resource-detail-client
- **Backend (Directus)**: `documents`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 29. Sự Kiện (`/resources/events`)
- **Frontend**: `(main)/resources/events/page.tsx` → events-client, event-card
- **Backend (Directus)**: `pages` (events)
- **Tests**: `event-detail-data.test.ts`
- [ ] **Nghiệm thu**: ___________

#### 30. Chi Tiết Sự Kiện (`/resources/events/[slug]`)
- **Frontend**: `(main)/resources/events/[slug]/page.tsx` → event-sidebar
- **Backend (Directus)**: `pages`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 31. Đăng Ký Sự Kiện (`/resources/events/[slug]/register`)
- **Frontend**: `(main)/resources/events/[slug]/register/page.tsx` → event-register-form
- **Backend (Directus)**: `contact_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

### 1.6 Mua hàng & Đơn hàng

#### 32. Đặt Hàng Nhanh (`/quick-order`)
- **Frontend**: `(main)/quick-order/page.tsx` → QuickOrderClient
- **Backend (FE API)**: `GET /api/sku/[code]` → Directus `product_skus`
- **Backend (Directus)**: `product_skus`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 33. Giỏ Hàng (`/cart`)
- **Frontend**: `(main)/cart/page.tsx` → CartClient
- **Backend (state)**: localStorage `cart-types.ts` (readCart, persistCart)
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 34. Thanh Toán (`/checkout`)
- **Frontend**: `(main)/checkout/page.tsx` → CheckoutClient
- **Note**: Giao diện FE có, backend **không nằm trong nghiệm thu**
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 35. Tạo Yêu Cầu Báo Giá (`/rfqs`)
- **Frontend**: `(main)/rfqs/page.tsx` → RfqsClient
- **Backend (FE API)**: `POST /api/rfq` → `rfq-submit.ts` (orchestration)
- **Backend (Endpoint)**: `POST /customer-onboarding/register` (liên quan customer)
- **Backend (Services)**: `rfq-validation.ts`, `rfq-sku.ts`, `rfq-anti-spam.ts`, `rfq-idempotency.ts`, `rfq-notification.ts`, `rfq-mailer.ts`
- **Backend (Directus)**: `rfq_requests`, `rfq_assignment_rules`
- **Tests**: `rfq-validation.test.ts`, `rfq-sku.test.ts`, `rfq-anti-spam.test.ts`, `rfq-idempotency.test.ts`, `rfq-notification.test.ts`, `rfq-submit.test.ts`
- [ ] **Nghiệm thu**: ___________

#### 36. Quản Lý RFQ Của Tôi (`/my-rfqs`)
- **Frontend**: `(main)/my-rfqs/page.tsx` → MyRfqsClient
- **Backend (FE API)**: `GET /api/rfq/mine`, `GET /api/rfq/[id]`
- **Backend (Directus)**: `rfq_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 37. Yêu Cầu Gửi Hàng Mẫu (`/sample-requests`)
- **Frontend**: `(main)/sample-requests/page.tsx` → request-sample-button, sample-request-modal
- **Backend (FE API)**: `POST /api/sample-request`
- **Backend (Directus)**: `sample_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 38. Chi Tiết Yêu Cầu Hàng Mẫu (`/sample-requests/[id]`)
- **Frontend**: `(main)/sample-requests/[id]/page.tsx` → my-sample-request-detail
- **Backend (FE API)**: `GET /api/sample-request/[id]`, `GET /api/sample-request/mine/[id]`
- **Backend (Directus)**: `sample_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

### 1.7 Theo dõi & Thanh toán

#### 39. Theo Dõi Đơn Hàng (`/order-tracking`)
- **Frontend**: `(main)/order-tracking/page.tsx` → OrderTrackingClient
- **Note**: Giao diện FE có, backend **không nằm trong nghiệm thu**
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 40. Hóa Đơn (Theo dõi đơn hàng) (`/order-tracking/payment-invoice`)
- **Frontend**: `(main)/order-tracking/payment-invoice/page.tsx`
- **Note**: Giao diện FE có, backend **không nằm trong nghiệm thu**
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 41. Xác Nhận Giao Hàng (`/order-tracking/delivery-confirmation`)
- **Frontend**: `(main)/order-tracking/delivery-confirmation/page.tsx` → DeliveryConfirmationClient
- **Note**: Giao diện FE có, backend **không nằm trong nghiệm thu**
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 42. Xác Nhận Đơn Hàng Thành Công (`/order-confirmation`)
- **Frontend**: `(main)/order-confirmation/page.tsx` → OrderConfirmationClient
- **Note**: Giao diện FE có, backend **không nằm trong nghiệm thu**
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 43. Hóa Đơn & Thanh Toán (`/payment-invoice`)
- **Frontend**: `(main)/payment-invoice/page.tsx` → PaymentInvoiceClient
- **Note**: Giao diện FE có, backend **không nằm trong nghiệm thu**
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

### 1.8 Tài khoản & Yêu thích

#### 44. Sản Phẩm Yêu Thích (`/favorites`)
- **Frontend**: `(main)/favorites/page.tsx` → FavoritesClient, SavedProductsSection
- **Backend (Directus)**: `products`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 45. Cài Đặt Tài Khoản (`/settings`)
- **Frontend**: `(main)/settings/page.tsx` → SettingsView
- **Backend (FE API)**: `GET /api/auth/me`, `POST /api/auth/change-password`
- **Backend (Directus)**: `customers`, `directus_users`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

## II. AUTH (ĐĂNG NHẬP / ĐĂNG KÝ)

#### 46. Đăng Nhập (`/login`)
- **Frontend**: `(auth)/login/page.tsx` → LoginForm, LoginHeroCard, LoginCta, LoginPartners, AuthTabs, SocialAuth
- **Backend (FE API)**: `POST /api/auth/login` → Directus auth
- **Backend (Directus)**: Directus auth endpoint
- **Tests**: `auth.test.mjs`
- [ ] **Nghiệm thu**: ___________

#### 47. Đăng Ký (`/register`)
- **Frontend**: `(auth)/register/page.tsx` → RegisterForm, AuthHero
- **Backend (FE API)**: `POST /api/auth/register`
- **Backend (Endpoint)**: `POST /customer-onboarding/register` → `customer-onboarding-endpoint/service.js` (tạo user + customer + email)
- **Backend (Hook)**: `customer-onboarding-hook` → link customer row to user
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 48. Xác Nhận Đăng Ký (`/register/confirm`)
- **Frontend**: `(auth)/register/confirm/page.tsx` → RegisterConfirmForm
- **Backend**: —
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 49. Quên Mật Khẩu (`/forgot-password`)
- **Frontend**: `(auth)/forgot-password/page.tsx` → ForgotPasswordForm
- **Backend (FE API)**: `POST /api/auth/forgot-password`
- **Backend (Endpoint)**: `POST /password-reset-request/send` (send reset link email)
- **Backend (Services)**: `lib/email-templates/reset-link.mjs`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 50. Đặt Lại Mật Khẩu Mới (`/reset-password`)
- **Frontend**: `(auth)/reset-password/page.tsx` → ResetPasswordForm
- **Backend (FE API)**: `POST /api/auth/reset-password`
- **Backend (Endpoint)**: `POST /password-reset-request/reset` (consume token + reset)
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 51. Xác Thực Mã OTP (`/verify-otp`)
- **Frontend**: `(auth)/verify-otp/page.tsx` → OtpForm
- **Backend (FE API)**: `POST /api/auth/verify-otp`
- **Backend (Endpoint)**: `POST /otp/issue` (issue 6-digit OTP), `POST /otp/verify` (verify OTP → `verified_token`)
- **Backend (Services)**: `otp-endpoint/service.js` (Redis-backed, 10min TTL, 60s cooldown)
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 52. Đổi Mật Khẩu (`/change-password`)
- **Frontend**: `(auth)/change-password/page.tsx` → ChangePasswordForm
- **Backend (FE API)**: `POST /api/auth/change-password`, `POST /api/auth/change-password/apply`, `POST /api/auth/change-password/confirm-token`, `POST /api/auth/change-password/status`
- **Backend (Endpoint)**: `POST /password-change/change` (OTP-based change)
- **Backend (Endpoint)**: `POST /password-change/fail`, `/password-change/clear`, `/password-change/status`
- **Backend (Hook)**: `password-policy-hook` → block password reuse, invalidate sessions
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

## III. ADMIN (QUẢN TRỊ)

### 3.1 Dashboard

#### 53. Bảng Điều Khiển (`/admin`)
- **Frontend**: `admin/page.tsx` → admin-layout-wrapper, admin-sidebar
- **Backend (Directus)**: Aggregate collections
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

### 3.2 Quản lý nội dung (CMS — không nằm trong nghiệm thu)

#### ~~54. Quản Lý Bài Viết (`/admin/articles`)~~
- ~~**Frontend**: `admin/articles/page.tsx` → articles-client~~
- **Ghi chú**: CMS, không nghiệm thu

#### ~~55. Quản Lý Danh Mục (`/admin/categories`)~~
- ~~**Frontend**: `admin/categories/page.tsx` → categories-client~~
- **Ghi chú**: CMS, không nghiệm thu

#### ~~56. Quản Lý Thuộc Tính Sản Phẩm (`/admin/attributes`)~~
- ~~**Frontend**: `admin/attributes/page.tsx` → attributes-client~~
- **Ghi chú**: CMS, không nghiệm thu

### 3.3 Quản lý sản phẩm & kho

#### 57. Quản Lý Danh Sách Sản Phẩm (`/admin/products`)
- **Frontend**: `admin/products/page.tsx` → products-client
- **Backend (Directus)**: `products`, `products_industries`, `products_files`, `products_standards`, `products_regional_hubs`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 58. Quản Lý Danh Sách SKUs (`/admin/skus`)
- **Frontend**: `admin/skus/page.tsx` → skus-client
- **Backend (Directus)**: `product_skus`
- **Backend (Hook)**: `sku-autogen-hook` → auto-generate SKUs via cartesian product of attribute options (debounced 2s)
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 59. Quản Lý Cụm Kho (`/admin/hubs`)
- **Frontend**: `admin/hubs/page.tsx` → hubs-client
- **Backend (Directus)**: `regional_hubs`, `hub_industrial_zones`, `hub_team_members`
- **Backend (Hook)**: `hub-code-sync` → auto-generate `hub_code`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 60. Nhập Dữ Liệu Import (`/admin/import`)
- **Frontend**: `admin/import/page.tsx` → commercial-import-workbench
- **Backend (FE API)**: `POST /api/import`
- **Backend (Endpoint)**: `POST /commercial-import/preview`, `POST /commercial-import/commit`
- **Backend (Services)**: `commercial-import-endpoint/service.js`, `csv.js`
- **Backend (Directus)**: `customers`, `orders`, `invoices`, `deliveries`
- **Tests**: `commercial-import.test.ts`
- [ ] **Nghiệm thu**: ___________

### 3.4 Quản lý yêu cầu & đơn hàng

#### 61. Quản Lý RFQ (`/admin/rfqs`)
- **Frontend**: `admin/rfqs/page.tsx` → rfqs-client
- **Backend (Directus)**: `rfq_requests`, `rfq_assignment_rules`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 62. Chi Tiết Yêu Cầu Báo Giá (`/admin/rfqs/[id]`)
- **Frontend**: `admin/rfqs/[id]` (cần xác nhận có page)
- **Backend (Directus)**: `rfq_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 63. Quản Lý Yêu Cầu Hàng Mẫu (`/admin/sample-requests`)
- **Frontend**: `admin/sample-requests/page.tsx` → sample-requests-client
- **Backend (Directus)**: `sample_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 64. Chi Tiết Yêu Cầu Hàng Mẫu (`/admin/sample-requests/[id]`)
- **Frontend**: `admin/sample-requests/[id]/page.tsx` → sample-request-detail
- **Backend (Directus)**: `sample_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 65. Quản Lý Yêu Cầu Liên Hệ (`/admin/contact-requests`)
- **Frontend**: `admin/contact-requests/page.tsx` → contact-requests-client
- **Backend (Directus)**: `contact_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 66. Chi Tiết Yêu Cầu Liên Hệ (`/admin/contact-requests/[id]`)
- **Frontend**: `admin/contact-requests/[id]/page.tsx` → contact-request-detail, contact-request-status-toggle
- **Backend (Directus)**: `contact_requests`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

### 3.5 Quản lý người dùng

#### 67. Quản Lý Người Đăng Ký Bản Tin (`/admin/subscribers`)
- **Frontend**: `admin/subscribers/page.tsx` → subscribers-client
- **Backend (FE API)**: `POST /api/newsletter`
- **Backend (Directus)**: `newsletter_subscribers`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 68. Quản Lý Danh Sách Thành Viên (`/admin/users`)
- **Frontend**: `admin/users/page.tsx` → users-client
- **Backend (Directus)**: `directus_users`, `customers`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

## IV. TÍNH NĂNG NỀN TẢNG (INFRASTRUCTURE)

#### 69. Email (SMTP)
- **Backend (Services)**: `lib/smtp.mjs` (raw TCP/TLS)
- **Email templates**: `welcome.mjs`, `otp.mjs`, `reset-link.mjs`, `password-changed.mjs`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 70. Redis Cache
- **Backend (Services)**: `lib/redis.mjs` (ioredis singleton)
- **Used by**: OTP (TTL 10min, cooldown 60s), RFQ idempotency, SKU cache
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 71. RBAC (Phân quyền)
- **Backend (Config)**: `rbac/roles.mjs`, `policies.mjs`, `access.mjs`, `permissions.mjs`
- **Roles**: Administrator, Visitor, Editor, Sales, Customer, Frontend Service
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 72. Media Policy (File Upload)
- **Backend (Endpoint)**: `POST /media-policy/soft-delete`, `POST /media-policy/hard-delete`
- **Backend (Services)**: `media-policy-hook/service.js`, `rules.js`, `audit.js`, `lib/media-policy.mjs`
- **Backend (Script)**: `scripts/media-cleanup.mjs` (purge expired files)
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 73. ERP Integration
- **Backend (Directus)**: `integration_events` collection
- **Backend (FE API)**: `POST /api/internal/erp-outbox`
- **Backend (Services)**: `erp-outbound.ts`, `erp-outbox-worker.ts`
- **Tests**: `erp-outbound.test.ts`, `erp-outbox-worker.test.ts`
- [ ] **Nghiệm thu**: ___________

#### 74. ISR Revalidation
- **Backend (FE API)**: `POST /api/revalidate`, `POST /api/internal/rfq-notify`
- **Backend (Services)**: `content-revalidation.ts`
- **Tests**: `content-revalidation.test.ts`
- [ ] **Nghiệm thu**: ___________

#### 75. SKU Cache (Redis)
- **Backend (FE API)**: `POST /api/internal/sku-cache`
- **Backend (Services)**: `sku-cache.ts`
- **Tests**: `sku-cache.test.ts`
- [ ] **Nghiệm thu**: ___________

#### 76. API Documentation (Swagger)
- **Backend (Endpoint)**: `GET /docs/`, `GET /docs/spec`
- **Backend (File)**: `docs-endpoint/openapi_custom_endpoints.json`
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 77. SEO
- **Frontend**: `robots.ts`, `sitemap.ts`, next-intl locale middleware
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

#### 78. i18n (Đa ngôn ngữ)
- **Frontend**: `messages/vi.json`, `messages/en.json`, `messages/ja.json`
- **Backend (Schema)**: `languages` collection, 14 `*_translations` collections
- **Tests**: —
- [ ] **Nghiệm thu**: ___________

---

## TỔNG HỢP

| Nhóm | Số lượng |
|:---|---:|
| I. Trang User | 45 |
| II. Auth | 7 |
| III. Admin | 13 (trừ 3 CMS) |
| IV. Nền tảng | 10 |
| **Tổng** | **75** |

> **Ghi chú**: Backend `orders`, `invoices`, `deliveries`, `checkout`, `payment` không nằm trong nghiệm thu. CMS articles/categories/attributes cũng không nằm trong nghiệm thu.

---

## HƯỚNG DẪN NGHIỆM THU

1. **Đạt**: Tick [x] vào ô `Nghiệm thu`
2. **Không đạt**: Ghi rõ vào dòng `___________` ví dụ:
   - "Nút submit không hoạt động"
   - "Responsive mobile bể layout"
   - "API trả về 500"
   - "Thiếu validation"
   - "Chưa có animation fade-in"
   - "Không đúng Figma (nêu rõ vị trí)"

# ULINK INDUSTRIES
## Tài liệu PRD & SOW — Dự án Xây dựng Nền tảng B2B Platform

> **Khách hàng:** ULink Industries  
> **Loại tài liệu:** Product Requirement Document (PRD) & Statement of Work (SOW)  
> **Phiên bản:** Version 1.0  
> **Mục tiêu:** Triển khai nền tảng B2B Procurement & Industrial Supply Platform  
> **Ngày phát hành:** 12/05/2026  

---

## 1. Executive Summary

ULink Industries định vị là nền tảng **B2B Procurement Platform** chuyên cung cấp giải pháp vật tư phụ trợ sản xuất cho các nhà máy tại các khu công nghiệp trọng điểm phía Bắc Việt Nam. 

Hệ thống được thiết kế theo mô hình **Headless B2B Platform**, ưu tiên hiệu suất, SEO, trải nghiệm thu mua công nghiệp và khả năng mở rộng tích hợp ERP/CRM trong tương lai.

Tài liệu này đóng vai trò là:
- Căn cứ triển khai kỹ thuật giữa ULink Industries và đối tác Outsourcing Agency.
- Căn cứ kiểm thử nghiệm thu (UAT).
- Căn cứ xác định phạm vi triển khai, KPI hiệu suất và tiêu chuẩn thiết kế UI/UX.

---

## 2. Định vị chiến lược & Phạm vi dự án

| Hạng mục | Nội dung |
| :--- | :--- |
| **Tên dự án** | ULink Industries – B2B Industrial Procurement Platform |
| **Định vị** | Nền tảng cung ứng vật tư phụ trợ công nghiệp chuyên sâu cho phòng sạch và đóng gói. |
| **Khách hàng mục tiêu** | Nhà máy FDI và SME thuộc các ngành Điện tử, Dược phẩm, Mỹ phẩm, Thực phẩm. |
| **Khu vực trọng điểm** | KCN Đồng Văn 4, Bắc Thăng Long, Bắc Ninh, Hưng Yên, Hải Phòng. |
| **Mục tiêu kinh doanh** | Xây dựng hệ thống B2B có khả năng scale thành Procurement Portal và Supply Chain Hub. |
| **Phong cách thiết kế** | Japanese Industrial Minimalism – tối giản, chuẩn công nghiệp, tối ưu tốc độ và khả năng tra cứu. |

---

## 3. Roadmap triển khai

| Phase | Mục tiêu | Deliverables | KPI |
| :--- | :--- | :--- | :--- |
| **MVP Launch** | Ra mắt nền tảng B2B cơ bản | Frontend UX/UI, Product Directory, Regional Hubs, Quick RFQ | Website live, SEO-ready, mobile responsive |
| **Scale-up** | Xây dựng B2B Portal | Portal khách hàng, Scheduled Delivery, Re-order | Tăng conversion và retention |
| **Integration** | Kết nối vận hành | ERP/CRM/API Integration | Đồng bộ dữ liệu tồn kho và đơn hàng |

---

## 4. Functional Scope

| Module | Mô tả chức năng |
| :--- | :--- |
| **Homepage** | Hero Banner, CTA, Trust Signals, Product Categories, Social Proof, Quick Support. |
| **Regional Hubs** | Hiển thị cụm KCN, khoảng cách giao hàng, năng lực kho bãi và SLA. |
| **Product Directory** | Danh mục sản phẩm B2B tối ưu procurement, SKU search, technical documents. |
| **Industry Solutions** | Bộ lọc theo ngành: Điện tử, Dược phẩm, Mỹ phẩm, Thực phẩm. |
| **B2B Commerce** | Quick Order, RFQ Cart, Re-order, Scheduled Delivery. |
| **Customer Portal** | Quản lý công nợ, trạng thái giao hàng, lịch sử đơn hàng. |

### 4.1 Website Sitemap & Information Architecture

```text
ULINK INDUSTRIES (B2B PROCUREMENT PLATFORM)
│
├── HOME
│   ├── Hero Banner
│   ├── Core Solutions
│   ├── Industry Solutions
│   ├── Strategic Partners
│   ├── Case Studies
│   ├── Resource Center
│   └── Quick RFQ CTA
│
├── REGIONAL HUBS
│   ├── Dong Van 4 Hub
│   │   ├── Delivery SLA
│   │   ├── Warehouse Capacity
│   │   ├── Technical Team
│   │   └── Cluster Overview
│   ├── Bac Thang Long
│   ├── Bac Ninh
│   ├── Hung Yen
│   └── Hai Phong
│
├── PRODUCTS
│   ├── Cleanroom Solutions
│   │   ├── Cleanroom Gloves
│   │   ├── Wipers
│   │   ├── Adhesive Tapes
│   │   └── Anti-static Materials
│   ├── Packaging Solutions
│   │   ├── PE/OPP Bags
│   │   ├── Shrink Film
│   │   ├── Thermal Insulation
│   │   └── Auxiliary Materials
│   └── Product Detail Page
│       ├── Technical Specifications
│       ├── Download TDS/MSDS
│       ├── Request Sample
│       └── RFQ / Add to Cart
│
├── INDUSTRY 
│   ├── Electronics
│   ├── Pharmaceutical
│   ├── Cosmetics
│   └── Food & Beverage
│
├── RESOURCE CENTER
│   ├── Technical Documents
│   ├── ISO Certifications
│   ├── Case Studies
│   ├── Blog & News, Event
│   └── Download Center
│
├── B2B PORTAL
│   ├── Login / Register
│   ├── Dashboard
│   ├── Order History
│   ├── Scheduled Delivery
│   ├── Debt Management
│   └── Re-order
│
├── QUICK ORDER
│   ├── SKU Input
│   ├── Bulk Quantity Upload
│   ├── RFQ Cart
│   └── Submit Request
│
└── ABOUT ULINK
    ├── Company Overview
    ├── Core Competencies
    ├── Sustainability
    ├── Careers
    └── Contact Information
```

---

## 5. Technical Architecture

| Layer | Technology | Technical Rationale |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14+ (App Router) | SSR/ISR tối ưu SEO và hiệu suất. |
| **UI Framework** | Tailwind CSS + Shadcn/UI | Tối giản, nhẹ, maintainable. |
| **Backend** | NestJS / Strapi / Directus | API-first architecture, dễ tích hợp ERP. |
| **Database** | PostgreSQL | Xử lý dữ liệu quan hệ và scale ổn định. |
| **Caching** | Redis | Tăng tốc truy vấn SKU và Quick Order. |
| **Infrastructure** | Vercel / AWS | CI/CD, scalability và edge delivery. |

---

## 6. Non-functional Requirements

- **Hiệu năng:** Google PageSpeed tối thiểu **90+** trên desktop; Core Web Vitals đạt chuẩn SEO Google.
- **Tương thích:** Responsive chuẩn trên Desktop / Tablet / Mobile.
- **Tốc độ phản hồi:** Thời gian phản hồi Quick Order dưới **50ms** (cache layer).
- **Bảo mật:** Chuẩn bảo mật HTTPS, anti-spam form và phân quyền truy cập role-based access.
- **Đa ngôn ngữ:** Hệ thống hỗ trợ đa ngôn ngữ **VI / EN / JP**.

---

## 7. Deliverables yêu cầu từ Outsourcing Agency

- UI/UX Design System hoàn chỉnh theo chuẩn thương hiệu ULink Industries.
- Source code frontend và backend đầy đủ.
- Tài liệu API Documentation.
- Deployment Guide & Technical Handover.
- UAT Checklist & Bug Fixing Support.
- SEO Technical Setup và Schema Markup.
- Training session cho đội vận hành nội bộ.

---

## 8. UAT & Acceptance Criteria

- Toàn bộ module hoạt động ổn định trên Chrome, Edge và Safari.
- Không có critical bug ảnh hưởng đến luồng đặt hàng.
- Tốc độ tải trang đạt KPI đã cam kết.
- Toàn bộ dữ liệu sản phẩm và cụm KCN hiển thị chính xác.
- Hệ thống SEO index đúng cấu trúc URL và metadata.

---

## 9. Điều khoản triển khai

> Tài liệu này là căn cứ chính thức cho việc triển khai, quản lý phạm vi công việc và nghiệm thu dự án giữa **ULink Industries** và đối tác **Outsourcing Agency**.  
> Mọi thay đổi phát sinh ngoài phạm vi tài liệu phải được xác nhận bằng **Change Request (CR)** hoặc phụ lục triển khai bổ sung.

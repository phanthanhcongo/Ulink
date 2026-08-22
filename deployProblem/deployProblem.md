# Deploy Directus lên Railway — Tổng kết vấn đề & giải pháp

## Bối cảnh
Deploy Directus backend lên Railway, chạy bootstrap script để tạo schema (collections, relations, roles, permissions, seed data) cho dự án ULink B2B Platform.

---

## Vấn đề 1: `column blog_posts.translations does not exist`

### Triệu chứng
Truy cập Admin UI trên Railway → mở collection `blog_posts` → lỗi:
```
select "blog_posts"."translations" from "blog_posts" — column blog_posts.translations does not exist
```

### Nguyên nhân gốc
- Field `translations` trong `blog_posts` có metadata đúng (`type=alias`, `special=["o2m"]`)
- Nhưng **bảng `blog_posts_translations` không tồn tại** trong PostgreSQL
- **Không có relation** nào được đăng ký trong `directus_relations` cho `blog_posts`
- Khi thiếu relation, Directus không biết `translations` là alias O2M → phát sinh SQL sai, cố SELECT nó như cột vật lý

### Tại sao xảy ra
Bootstrap script chạy trên **localhost** (vì file `.env` có `DIRECTUS_PUBLIC_URL=http://localhost:8055`), KHÔNG chạy trên Railway. Dù biến môi trường CMD được set, `dotenv` trong `config.mjs` load `.env` trước → ghi đè URL.

---

## Vấn đề 2: Orphan metadata trên Railway

### Triệu chứng
- `directus_collections` có record cho `blog_posts_translations` nhưng bảng SQL thực không tồn tại
- `createCollection()` nghĩ collection "already exists" → skip
- `GET /fields/blog_posts_translations` → 403 vì bảng không tồn tại thực

### Nguyên nhân
Bootstrap lần đầu trên Railway chỉ tạo được **metadata** (record trong `directus_collections`) cho các translation tables nhưng **không tạo được bảng SQL** (có thể do timeout hoặc lỗi giữa chừng). Kết quả: metadata mồ côi (orphan).

### Giải pháp đã thử
- Viết script `fix-db-direct.mjs` kết nối trực tiếp PostgreSQL Railway
- Xóa orphan metadata → tạo bảng SQL thực → đăng ký lại metadata + relations
- **Kết quả:** 7/9 translation tables được fix, 2 còn lại (`standards_translations`, `hub_industrial_zones_translations`) thiếu vì bảng cha cũng không tồn tại

---

## Vấn đề 3: Directus License — `collections limit exceeded` (32/25)

### Triệu chứng
Directus Admin UI hiển thị màn hình **"Resolve License Limits"**:
- **Data Collections: 32 / 25 Available**
- "Your project exceeds the plan limits and is locked"
- Không thể tạo thêm collection qua API (`collections limit exceeded`)
- Không thể xóa collection qua API (`You don't have permission`)

### Nguyên nhân
- Railway đang dùng image **`directus/directus:12.1.1`** (KHÔNG phải Dockerfile từ repo)
- Directus 11+ (BSL License) giới hạn **25 custom collections** cho bản Community miễn phí
- Dự án ULink cần **50+ collections** (main + translations + junction tables)

### Giải pháp đã thử & kết quả

| Giải pháp | Kết quả |
|-----------|---------|
| Tạo bảng trực tiếp qua PostgreSQL (bypass API) | ✅ Bảng tạo được nhưng UI vẫn bị khóa bởi license |
| Hạ cấp về Directus 10 (GPL, không giới hạn) | ❌ Lỗi schema incompatible (`column ip_access does not exist`) vì DB đã được tạo bởi v12 |
| **Xóa sạch DB + chuyển sang Directus 10** | ✅ **THÀNH CÔNG** |

---

## Vấn đề 4: `Invalid user credentials` sau khi wipe DB

### Triệu chứng
Sau khi wipe DB và Directus 10 tự bootstrap, login với `admin@ulink.com` / `change-me-admin-password` bị `401 Unauthorized`.

### Nguyên nhân
Directus 10 tạo admin user từ env vars `ADMIN_EMAIL` / `ADMIN_PASSWORD` trên Railway, nhưng password hash không khớp — có thể do giá trị env var có ký tự thừa (tab, dấu ngoặc kép...).

### Giải pháp
Reset password trực tiếp trong PostgreSQL bằng argon2 hash:
```bash
node scripts/reset-password.mjs <DATABASE_URL> admin@ulink.com change-me-admin-password
```

---

## Vấn đề 5: `Route /access doesn't exist`

### Triệu chứng
Bootstrap script báo lỗi ở bước cuối cùng (gán permissions):
```
Route /access doesn't exist
```

### Nguyên nhân
Bootstrap script dùng **Directus SDK v12** (có endpoint `/access`), nhưng Directus 10 **không có endpoint này**. API permissions/access thay đổi giữa v10 và v11+.

### Ảnh hưởng
- **Không nghiêm trọng** — chỉ ảnh hưởng đến gán permissions cho roles
- Collections, relations, roles đều đã tạo xong
- Permissions cần được cấu hình thủ công qua Admin UI hoặc cập nhật script SDK cho tương thích v10

---

## Giải pháp cuối cùng đã áp dụng

### Các bước thực hiện thành công:

1. **Wipe toàn bộ database Railway** (`scripts/wipe-db.mjs`)
   - Kết nối trực tiếp PostgreSQL: `DROP SCHEMA public CASCADE`

2. **Đổi Directus image trên Railway** từ `directus/directus:12.1.1` → `directus/directus:10.13.3`
   - Thao tác: Railway Dashboard → Service → Settings → Source → Edit image tag
   - Directus 10 = GPL license = **không giới hạn collections**

3. **Reset admin password** (`scripts/reset-password.mjs`)
   - Dùng argon2 hash password và UPDATE trực tiếp vào `directus_users`

4. **Chạy bootstrap trỏ vào Railway** (`scripts/remote-bootstrap.mjs`)
   - Script wrapper set `process.env` TRƯỚC khi import `bootstrap.mjs` → bypass dotenv
   - Kết quả: **52 collections + tất cả relations + 6 roles** tạo thành công

### Kết quả cuối:
- ✅ 52 custom collections (bao gồm translations + junction tables)
- ✅ Tất cả relations (O2M, M2O, M2M)
- ✅ 6 roles (Administrator, Visitor, Editor, Sales, Customer, Frontend Service)
- ⚠️ Permissions chưa gán (cần cập nhật script hoặc cấu hình thủ công)

---

## Scripts tiện ích đã tạo

| Script | Mô tả |
|--------|-------|
| `scripts/remote-bootstrap.mjs` | Chạy bootstrap trỏ vào remote Directus (bypass .env) |
| `scripts/check-railway.mjs` | Diagnostic kiểm tra collections/relations trên remote instance |
| `scripts/fix-db-direct.mjs` | Sửa orphan metadata trực tiếp qua PostgreSQL |
| `scripts/fix-all-missing.mjs` | Tạo tất cả bảng còn thiếu trực tiếp qua PostgreSQL |
| `scripts/wipe-db.mjs` | Xóa sạch toàn bộ database |
| `scripts/reset-password.mjs` | Reset admin password qua PostgreSQL + argon2 |
| `scripts/check-frontend-usage.mjs` | Scan frontend code để xem collection nào đang được sử dụng |

---

## Lưu ý quan trọng cho lần deploy sau

1. **Railway dùng Source Image trực tiếp**, KHÔNG build từ Dockerfile trong repo
2. **Không thể hạ cấp Directus** nếu DB đã được tạo bởi phiên bản cao hơn (schema incompatible)
3. **dotenv trong `config.mjs`** sẽ override env vars từ shell → dùng `remote-bootstrap.mjs` thay vì set env vars bên ngoài
4. **Directus 11+** giới hạn 25 collections cho bản Community — cần license hoặc dùng Directus 10
5. **Kiểm tra env vars trên Railway** — đảm bảo không có ký tự thừa (tab, ngoặc kép) trong giá trị

# Hướng dẫn Seed Data lên Railway (Directus 10)

## Tổng quan

Dự án ULink dùng **Directus 10.13.3** trên Railway (GPL, không giới hạn collections).
Quá trình seed gồm **2 bước** chạy tuần tự từ máy local:

```
Bước 1: Tạo schema (collections + relations + roles)
Bước 2: Seed data (content, commerce, users, images, indexes)
```

---

## Điều kiện tiên quyết

- **Directus trên Railway** đã chạy (image `directus/directus:10.13.3`)
- **Admin credentials** đã biết (Railway Variables → `ADMIN_EMAIL` / `ADMIN_PASSWORD`)
- **Database URL** cho kết nối trực tiếp PostgreSQL:
  ```
  postgresql://postgres:<password>@<host>:<port>/railway
  ```
  (Lấy từ Railway → PostgreSQL service → Variables → `DATABASE_URL`)

---

## Bước 1: Tạo Schema (Collections + Relations + Roles)

```bash
cd directus
node scripts/remote-bootstrap.mjs <DIRECTUS_URL> <ADMIN_EMAIL> <ADMIN_PASSWORD>
```

**Ví dụ:**
```bash
node scripts/remote-bootstrap.mjs \
  https://directus-production-8018.up.railway.app \
  admin@ulink.com \
  change-me-admin-password
```

### Script này làm gì:
1. Login vào Directus Admin API
2. Tạo 52+ custom collections (products, blog_posts, translations, junction tables...)
3. Tạo tất cả relations (M2O, O2M, M2M)
4. Tạo 6 roles (Administrator, Visitor, Editor, Sales, Customer, Frontend Service)

### Lưu ý:
- Script dùng `process.env` override TRƯỚC khi import modules → bypass `.env` file (trỏ localhost)
- Bước access/permissions sẽ lỗi `Route /access doesn't exist` → **bình thường** vì Directus 10 không có endpoint này (chỉ có từ v11+). Collections và roles vẫn tạo thành công.

---

## Bước 2: Seed Data

```bash
cd directus
node scripts/remote-seed.mjs <DIRECTUS_URL> <ADMIN_EMAIL> <ADMIN_PASSWORD>
```

**Ví dụ:**
```bash
node scripts/remote-seed.mjs \
  https://directus-production-8018.up.railway.app \
  admin@ulink.com \
  change-me-admin-password
```

### Script này làm gì:
1. **Languages**: Tạo vi, en, ja
2. **Folders**: Tạo cấu trúc thư mục media
3. **Geography**: Seed 34 tỉnh thành Việt Nam
4. **Initial Content**: Industries, product categories, products, SKUs, regional hubs, industrial zones, team members, blog posts, case studies, ISO certifications
5. **Demo Commerce**: Customer, orders, order items, invoices, deliveries
6. **Additional Content**: Partners, pages, RFQ assignment rules
7. **Extended Products**: Standards, thêm products
8. **Product Attributes**: Attributes + options + M2M assignments
9. **Product Images**: Upload images + gallery junction
10. **Users**: Frontend API user + 4 Sales users
11. **DB Indexes**: Tối ưu query performance

### Cách script hoạt động:
- Tạo Directus SDK client **trực tiếp** với remote URL (KHÔNG dùng `config.mjs` vì dotenv luôn ghi đè về localhost)
- Set `DB_CONNECTION_STRING` env var cho các module cần kết nối trực tiếp PostgreSQL (`folder-db.mjs`, `db-indexes.mjs`, `seed_images.mjs`)
- Dùng dynamic `import()` để load seed modules SAU KHI env đã được set

---

## Xử lý sự cố thường gặp

### 1. `Invalid user credentials` (401)
**Nguyên nhân:** Password trong DB không khớp với env var.
**Fix:** Reset password trực tiếp:
```bash
node scripts/reset-password.mjs \
  "postgresql://postgres:<pw>@<host>:<port>/railway" \
  admin@ulink.com \
  change-me-admin-password
```

### 2. `SASL: client password must be a string`
**Nguyên nhân:** `POSTGRES_PASSWORD` hoặc `DB_CONNECTION_STRING` chưa được set.
**Fix:** Đảm bảo `DB_CONNECTION_STRING` đã được set trong `remote-seed.mjs` (dòng 31).

### 3. `column "searchable" does not exist`
**Nguyên nhân:** Migration SQL dùng cột `searchable` (chỉ có trong Directus 12), Directus 10 không có.
**Ảnh hưởng:** Chỉ 1 migration bị skip, không ảnh hưởng seed data.
**Fix:** Sửa file SQL migration bỏ cột `searchable`, hoặc bỏ qua (không nghiêm trọng).

### 4. `Route /access doesn't exist` (404)
**Nguyên nhân:** Directus 10 không có endpoint `/access` (chỉ từ v11+).
**Ảnh hưởng:** Permissions chưa được gán cho roles.
**Fix:** Cấu hình permissions thủ công qua Admin UI, hoặc viết script tương thích Directus 10 API.

### 5. `collections limit exceeded`
**Nguyên nhân:** Đang dùng Directus 11/12 (BSL, giới hạn 25 collections).
**Fix:** Chuyển sang Directus 10.13.3 (GPL, không giới hạn).

---

## Wipe & Reset toàn bộ (nếu cần làm lại từ đầu)

```bash
# 1. Xoá sạch database
node scripts/wipe-db.mjs "postgresql://postgres:<pw>@<host>:<port>/railway"

# 2. Restart Directus trên Railway (để nó tự tạo lại schema hệ thống)

# 3. Reset admin password (nếu cần)
node scripts/reset-password.mjs "postgresql://..." admin@ulink.com change-me-admin-password

# 4. Chạy lại 2 bước trên
node scripts/remote-bootstrap.mjs <URL> <EMAIL> <PASSWORD>
node scripts/remote-seed.mjs <URL> <EMAIL> <PASSWORD>
```

---

## Các file quan trọng

| File | Vai trò |
|------|---------|
| `scripts/remote-bootstrap.mjs` | Tạo collections + relations + roles trên remote |
| `scripts/remote-seed.mjs` | Seed tất cả data lên remote |
| `scripts/reset-password.mjs` | Reset admin password qua PostgreSQL |
| `scripts/wipe-db.mjs` | Xoá sạch database |
| `lib/config.mjs` | ⚠️ Luôn load `.env` → override URL về localhost |
| `lib/folder-db.mjs` | Kết nối PostgreSQL trực tiếp (hỗ trợ `DB_CONNECTION_STRING`) |
| `lib/db-indexes.mjs` | Chạy SQL migrations (hỗ trợ `DB_CONNECTION_STRING`) |

---

## Sửa đổi code đã thực hiện

### 1. `lib/folder-db.mjs` — Thêm hỗ trợ `DB_CONNECTION_STRING`
```diff
 function createDbConfig() {
+  const connStr = process.env.DB_CONNECTION_STRING;
+  if (connStr) {
+    return { connectionString: connStr, ssl: connStr.includes('railway') ? { rejectUnauthorized: false } : undefined };
+  }
   return {
     host: process.env.DB_HOST_EXTERNAL || 'localhost',
     ...
   };
 }
```

### 2. `lib/db-indexes.mjs` — Tương tự, thêm `DB_CONNECTION_STRING`

### 3. `scripts/remote-seed.mjs` — Tạo client SDK trực tiếp, bypass `config.mjs`
- Không dùng `createDirectusClient()` từ `config.mjs` (bị dotenv override)
- Tạo `createDirectus(url)` trực tiếp với URL từ argument
- Set `DB_CONNECTION_STRING` cho các module dùng PostgreSQL trực tiếp

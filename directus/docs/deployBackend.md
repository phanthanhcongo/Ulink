# Deploy Backend Directus lên Railway — Lỗi & Cách khắc phục

> Tài liệu ghi lại toàn bộ lỗi gặp phải khi deploy Directus lên Railway (14/09/2026)
> và cách khắc phục từng lỗi.

---

## Mục lục

1. [Kiến trúc Railway](#1-kiến-trúc-railway)
2. [Lỗi 502 — Application failed to respond](#2-lỗi-502--application-failed-to-respond)
3. [Lỗi Redis ECONNREFUSED 127.0.0.1:6379](#3-lỗi-redis-econnrefused-127001-6379)
4. [Lỗi 401 — Invalid user credentials](#4-lỗi-401--invalid-user-credentials)
5. [Lỗi ECONNREFUSED khi chạy bootstrap (DB indexes)](#5-lỗi-econnrefused-khi-chạy-bootstrap-db-indexes)
6. [Lỗi unterminated dollar-quoted string (SQL migration)](#6-lỗi-unterminated-dollar-quoted-string-sql-migration)
7. [Lỗi ECONNRESET khi upload/link images](#7-lỗi-econnreset-khi-uploadlink-images)
8. [Lỗi ảnh v2 không hiển thị (403)](#8-lỗi-ảnh-v2-không-hiển-thị-403)
9. [Checklist deploy hoàn chỉnh](#9-checklist-deploy-hoàn-chỉnh)

---

## 1. Kiến trúc Railway

Cần **3 services** trong 1 project Railway:

| Service | Loại | Mục đích |
|---------|------|----------|
| **Ulink** | App (GitHub repo) | Directus CMS + API |
| **Postgres** | Database | Lưu data |
| **Redis** | Database | OTP, rate limiting, cache |

> [!IMPORTANT]
> Hệ thống **bắt buộc dùng Redis** — không chỉ cho cache mà còn cho OTP, reset password, onboarding flow.

---

## 2. Lỗi 502 — Application failed to respond

### Triệu chứng
```
{"status":"error","code":502,"message":"Application failed to respond"}
```
Railway báo deploy "successful" nhưng truy cập URL trả 502.

### Nguyên nhân
Railway không biết Directus listen trên port nào. Directus mặc định dùng port `8055`, nhưng Railway cần biến `PORT`.

### Cách khắc phục
Thêm biến môi trường vào service Ulink:
```env
PORT=8055
```

---

## 3. Lỗi Redis ECONNREFUSED 127.0.0.1:6379

### Triệu chứng
```
[ioredis] Unhandled error event: Error: connect ECONNREFUSED 127.0.0.1:6379
```
Directus khởi động nhưng crash liên tục do không kết nối được Redis.

### Nguyên nhân
Biến `REDIS_URL` dùng cú pháp reference `${{Redis.REDIS_URL}}` nhưng **không resolve** được, khiến code fallback về `localhost:6379`.

Code trong `lib/redis.mjs`:
```js
const REDIS_URL = process.env.REDIS_URL || process.env.REDIS || 'redis://localhost:6379';
```

### Cách khắc phục
**Không dùng** `${{Redis.REDIS_URL}}`. Thay bằng **giá trị thật** copy từ service Redis:

1. Vào service **Redis** → tab **Variables** → copy `REDIS_URL`
2. Vào service **Ulink** → tab **Variables** → paste giá trị thật:

```env
REDIS=redis://default:<PASSWORD>@redis.railway.internal:6379
REDIS_URL=redis://default:<PASSWORD>@redis.railway.internal:6379
RATE_LIMITER_REDIS=redis://default:<PASSWORD>@redis.railway.internal:6379
```

> [!WARNING]
> Tương tự cho Postgres — copy giá trị thật từ service Postgres thay vì dùng `${{Postgres.PGHOST}}`.

---

## 4. Lỗi 401 — Invalid user credentials

### Triệu chứng
```json
{"errors":[{"message":"Invalid user credentials."}]}
```
Login vào Directus admin panel báo "Wrong username or password".

### Nguyên nhân
Directus bootstrap chỉ tạo admin user **lần đầu tiên** khi DB hoàn toàn trống. Nếu lần deploy đầu chưa có `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars:

1. Lần deploy 1 (chưa có env vars) → tạo system tables ✅ → bỏ qua tạo admin ❌
2. Lần deploy 2 (đã thêm env vars) → thấy system tables đã tồn tại → **bỏ qua toàn bộ bootstrap** (kể cả tạo admin)

### Cách khắc phục
**Wipe database** rồi restart Directus:

1. Bật **Public Access** cho Postgres service (Settings → Networking)
2. Chạy SQL qua public connection string:
```bash
node -e "
  const { Client } = require('pg');
  const c = new Client({
    connectionString: 'postgresql://postgres:<PW>@<HOST>.proxy.rlwy.net:<PORT>/railway',
    ssl: { rejectUnauthorized: false }
  });
  c.connect()
    .then(() => c.query('DROP SCHEMA public CASCADE'))
    .then(() => c.query('CREATE SCHEMA public'))
    .then(() => { console.log('Done'); c.end(); })
    .catch(e => { console.error(e.message); c.end(); });
"
```
3. Restart service Ulink → Directus tạo lại admin user từ env vars

> [!CAUTION]
> Lệnh `DROP SCHEMA public CASCADE` sẽ **xoá toàn bộ** data. Chỉ dùng khi DB chưa có data production.

---

## 5. Lỗi ECONNREFUSED khi chạy bootstrap (DB indexes)

### Triệu chứng
```
Bootstrap failed with error: AggregateError [ECONNREFUSED]:
    Error: connect ECONNREFUSED ::1:5432
    Error: connect ECONNREFUSED 127.0.0.1:5432
```
Bootstrap chạy xong phần API (collections, RBAC, seed) nhưng fail ở bước `applyDbIndexes()`.

### Nguyên nhân
`lib/db-indexes.mjs` kết nối **trực tiếp PostgreSQL** (không qua Directus API). Khi chạy từ local, nó fallback về `localhost:5432`.

Code trong `lib/db-indexes.mjs`:
```js
const pgClient = connStr
  ? new pg.Client({ connectionString: connStr, ... })
  : new pg.Client({ host: process.env.DB_HOST_EXTERNAL || 'localhost', ... });
```

### Cách khắc phục
Truyền `DB_CONNECTION_STRING` khi chạy bootstrap:

```powershell
$env:DB_CONNECTION_STRING="postgresql://postgres:<PW>@<HOST>.proxy.rlwy.net:<PORT>/railway"
node scripts/remote-bootstrap.mjs "https://ulink-production.up.railway.app" "admin@ulink.com" "<PASSWORD>"
```

Hoặc chạy riêng phần DB indexes:
```powershell
$env:DB_CONNECTION_STRING="postgresql://postgres:<PW>@<HOST>.proxy.rlwy.net:<PORT>/railway"
node -e "const { applyDbIndexes } = await import('./lib/db-indexes.mjs'); await applyDbIndexes(); process.exit(0);"
```

> [!NOTE]
> Cần bật **Public Access** cho Postgres service trên Railway trước.

---

## 6. Lỗi unterminated dollar-quoted string (SQL migration)

### Triệu chứng
```
error: unterminated dollar-quoted string at or near "$$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_inventory_stock_sku') THEN
    ALTER TABLE inventory_stock ADD CONSTRAINT ...
```

### Nguyên nhân
`lib/db-indexes.mjs` split SQL bằng `;` (line 49), phá vỡ `DO $$ ... END $$;` blocks vì bên trong có `;`.

### Cách khắc phục
Sửa `lib/db-indexes.mjs` — thêm check `DO $$` cùng với `CREATE FUNCTION`:

```diff
- if (sqlContent.includes('CREATE FUNCTION') || sqlContent.includes('CREATE OR REPLACE FUNCTION')) {
-   console.log(`Applying function migration ${fileName} as a single batch.`);
+ if (sqlContent.includes('CREATE FUNCTION') || sqlContent.includes('CREATE OR REPLACE FUNCTION') || sqlContent.includes('DO $$') || sqlContent.includes('DO $fn$')) {
+   console.log(`Applying migration ${fileName} as a single batch (contains PL/pgSQL blocks).`);
    await pgClient.query(sqlContent);
```

> [!NOTE]
> Fix này đã được apply vào `lib/db-indexes.mjs`.

---

## 7. Lỗi ECONNRESET khi upload/link images

### Triệu chứng
```
Error: read ECONNRESET
    at TCP.onStreamRead (node:internal/stream_base_commons:216:20)
```
Script `remote-upload-images.mjs` upload ảnh thành công nhưng crash ở bước linking.

### Nguyên nhân
Script dùng `withDbClient` (line 98) để link images trực tiếp qua DB. `DB_CONNECTION_STRING` fallback về URL cũ (hardcoded trong script line 29):
```js
process.env.DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'postgresql://postgres:NmHrd...@tokaido.proxy.rlwy.net:59913/railway';
```

### Cách khắc phục
Truyền `DB_CONNECTION_STRING` đúng:

```powershell
$env:DB_CONNECTION_STRING="postgresql://postgres:<PW>@<HOST>.proxy.rlwy.net:<PORT>/railway"
node scripts/remote-upload-images.mjs "https://ulink-production.up.railway.app" "admin@ulink.com" "<PASSWORD>"
```

---

## 8. Lỗi ảnh v2 không hiển thị (403)

### Triệu chứng
Sản phẩm hiển thị đúng tên, giá, nhưng ảnh trống (placeholder xám). Inspect element thấy:
```
GET https://ulink-production.up.railway.app/assets/<uuid> → 403
```

### Nguyên nhân
`seed-v2/seed_images.mjs` hoạt động bằng cách **copy file vật lý** từ `frontend/public/images/` → `directus/uploads/` (local disk). Trên Railway:
- DB record `directus_files` tồn tại (có UUID) ✅
- File vật lý **không có** trên container Railway ❌

### Cách khắc phục
Upload ảnh v2 qua Directus API (thay vì copy file local):

```powershell
node scripts/upload-v2-images.mjs "https://ulink-production.up.railway.app" "admin@ulink.com" "<PASSWORD>"
```

Script này:
1. Đọc `products_data.mjs` để lấy danh sách ảnh
2. Xoá stale DB records (có UUID nhưng không có file)
3. Upload file từ `frontend/public/images/` qua `/files` API
4. Link hero image vào product

> [!TIP]
> Script `remote-upload-images.mjs` chỉ upload 10 ảnh v1. Ảnh v2 (31 sản phẩm) cần script riêng.

---

## 9. Checklist deploy hoàn chỉnh

### Bước 1: Tạo services trên Railway
- [ ] Tạo project mới
- [ ] Thêm **PostgreSQL** service
- [ ] Thêm **Redis** service
- [ ] Thêm **Ulink** service (từ GitHub repo, Dockerfile path: `directus/Dockerfile`)
- [ ] Bật **Public Access** cho Postgres (để chạy migration từ local)

### Bước 2: Cấu hình env vars cho Ulink
- [ ] Copy giá trị thật từ Postgres: `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`
- [ ] Copy giá trị thật từ Redis: `REDIS_URL`
- [ ] Thêm `PORT=8055`
- [ ] Paste full env block (xem mẫu bên dưới)
- [ ] Deploy và đợi Directus online

### Bước 3: Bootstrap (chạy từ local)
```powershell
cd directus
$env:DB_CONNECTION_STRING="postgresql://postgres:<PW>@<HOST>.proxy.rlwy.net:<PORT>/railway"
node scripts/remote-bootstrap.mjs "https://<RAILWAY_URL>" "admin@ulink.com" "<ADMIN_PASSWORD>"
```

### Bước 4: Seed v2
```powershell
$env:DIRECTUS_PUBLIC_URL="https://<RAILWAY_URL>"
$env:DIRECTUS_ADMIN_EMAIL="admin@ulink.com"
$env:DIRECTUS_ADMIN_PASSWORD="<ADMIN_PASSWORD>"
$env:DB_CONNECTION_STRING="postgresql://postgres:<PW>@<HOST>.proxy.rlwy.net:<PORT>/railway"
node seed-v2/run-seed.mjs
```

### Bước 5: Upload ảnh
```powershell
# Ảnh v1 (10 sản phẩm cũ)
$env:DB_CONNECTION_STRING="postgresql://postgres:<PW>@<HOST>.proxy.rlwy.net:<PORT>/railway"
node scripts/remote-upload-images.mjs "https://<RAILWAY_URL>" "admin@ulink.com" "<ADMIN_PASSWORD>"

# Ảnh v2 (31 sản phẩm mới)
node scripts/upload-v2-images.mjs "https://<RAILWAY_URL>" "admin@ulink.com" "<ADMIN_PASSWORD>"
```

### Bước 6: Cấu hình Vercel (frontend)
- [ ] `NEXT_PUBLIC_DIRECTUS_URL` = `https://<RAILWAY_URL>`
- [ ] `DIRECTUS_URL` = `https://<RAILWAY_URL>`
- [ ] `DIRECTUS_TOKEN` = `Gb_HrRCaR8As6fFZpMuqi2Gfw9ZuEqOH`
- [ ] Redeploy frontend

### Mẫu env vars cho Ulink service
```env
KEY=<random-uuid-1>
SECRET=<random-uuid-2>
ADMIN_EMAIL=admin@ulink.com
ADMIN_PASSWORD=<ADMIN_PASSWORD>
PUBLIC_URL=https://<RAILWAY_URL>
ACCESS_TOKEN_TTL=15m
PORT=8055

DB_CLIENT=pg
DB_HOST=<giá trị thật từ Postgres PGHOST>
DB_PORT=<giá trị thật từ Postgres PGPORT>
DB_DATABASE=<giá trị thật từ Postgres PGDATABASE>
DB_USER=<giá trị thật từ Postgres PGUSER>
DB_PASSWORD=<giá trị thật từ Postgres PGPASSWORD>

REDIS=<giá trị thật từ Redis REDIS_URL>
REDIS_URL=<giá trị thật từ Redis REDIS_URL>
CACHE_ENABLED=false
CACHE_STORE=redis
RATE_LIMITER_ENABLED=false
RATE_LIMITER_STORE=redis
RATE_LIMITER_REDIS=<giá trị thật từ Redis REDIS_URL>

OTP_TTL_SECONDS=600
OTP_MAX_ATTEMPTS=5
OTP_RESEND_COOLDOWN_SECONDS=60
VERIFIED_TOKEN_TTL_SECONDS=900
PASSWORD_CHANGE_FAIL_MAX=3
PASSWORD_CHANGE_FAIL_WINDOW=900
PASSWORD_RESET_TOKEN_TTL=15m
REFRESH_TOKEN_AUTO_REUSE=false

WEBSOCKETS_ENABLED=true
CORS_ENABLED=true
CORS_ORIGIN=true

STORAGE_LOCATIONS=local
STORAGE_LOCAL_ROOT=/directus/uploads
FILES_MAX_UPLOAD_SIZE=10mb

FRONTEND_PUBLIC_URL=https://www.ulinkindustries.com
PASSWORD_RESET_URL_ALLOW_LIST=https://www.ulinkindustries.com/reset-password
```

> [!WARNING]
> **Luôn dùng giá trị thật** cho DB/Redis vars thay vì `${{ServiceName.VAR}}`. Railway reference syntax có thể không resolve đúng.

# Hướng dẫn: Xoá toàn bộ DB Railway và Seed lại

> Tài liệu này mô tả quy trình wipe + reseed database Directus trên Railway từ đầu.

## Yêu cầu

| Thông tin | Ví dụ | Lấy ở đâu |
|-----------|-------|------------|
| `DATABASE_URL` | `postgresql://postgres:xxx@host:port/railway` | Railway → Postgres service → Variables → `DATABASE_URL` |
| `DIRECTUS_URL` | `https://directus-production-8018.up.railway.app` | Railway → Directus service → Settings → Domain |
| `ADMIN_EMAIL` | `admin@ulink.com` | File `.env` hoặc Railway Variables |
| `ADMIN_PASSWORD` | `change-me-admin-password` | File `.env` hoặc Railway Variables |

## Quy trình (3 bước)

### Bước 1: Xoá toàn bộ database

```bash
cd directus
node scripts/wipe-db.mjs "<DATABASE_URL>"
```

**Kết quả mong đợi:**
```
✅ Connected to PostgreSQL
Found XX tables to drop:
  - directus_activity
  - ...
⚠️  Dropping ALL tables...
✅ All tables dropped. Database is clean.
```

### Bước 2: Restart Directus trên Railway

1. Vào [Railway Dashboard](https://railway.app)
2. Chọn project → chọn **Directus service**
3. Nhấn **Restart** (hoặc **Redeploy**)
4. Đợi service healthy (~1-2 phút)

> [!IMPORTANT]
> **Bắt buộc phải restart!** Sau khi wipe DB, Directus cần restart để tự chạy internal bootstrap — tạo lại 24 tables core (`directus_users`, `directus_collections`, ...) và admin user.

**Kiểm tra Directus đã sẵn sàng:**

```bash
# PowerShell
Invoke-WebRequest -Uri "<DIRECTUS_URL>/server/ping" -UseBasicParsing | Select-Object -ExpandProperty Content
# Kết quả mong đợi: pong
```

### Bước 3: Chạy bootstrap + seed data

```bash
cd directus
node scripts/remote-bootstrap.mjs "<DIRECTUS_URL>" "<ADMIN_EMAIL>" "<ADMIN_PASSWORD>"
```

> [!NOTE]
> Quá trình này mất **5-15 phút** tuỳ tốc độ mạng. Script tạo:
> - Collections (schema)
> - Roles, Policies, Permissions (RBAC)
> - Languages (vi, en, ja)
> - Seed data (provinces, industries, categories, products, SKUs, documents, translations)
> - Frontend API user
> - DB indexes

**Kết quả mong đợi:**
```
🚀 Running bootstrap against: https://...
Authenticated as admin@ulink.com @ https://...
...
Bootstrap & seed data setup completed successfully!
```

### Bước 4: Upload hình ảnh sản phẩm

```bash
cd directus
node scripts/remote-upload-images.mjs "<DIRECTUS_URL>" "<ADMIN_EMAIL>" "<ADMIN_PASSWORD>"
```

> [!WARNING]
> **Bước này bắt buộc!** Bootstrap chỉ tạo record file trong DB, không upload file vật lý lên Railway. Nếu bỏ qua bước này, sản phẩm sẽ hiển thị "Chưa có hình ảnh trong Database".

**Kết quả mong đợi:**
```
✅ Uploaded: Găng tay nitrile phòng sạch (...)
✅ Uploaded: Khăn lau polyester phòng sạch (...)
...
🎉 All images uploaded and linked successfully!
```

## Ví dụ đầy đủ (copy-paste)

```bash
cd directus

# 1. Wipe
node scripts/wipe-db.mjs "postgresql://postgres:NmHrdccBnCBDFHmmhntIhdLVUeKVcwab@tokaido.proxy.rlwy.net:59913/railway"

# 2. ⚠️ VÀO RAILWAY DASHBOARD → RESTART DIRECTUS SERVICE
# Đợi 1-2 phút cho Directus healthy

# 3. Bootstrap + seed
node scripts/remote-bootstrap.mjs "https://directus-production-8018.up.railway.app" "admin@ulink.com" "change-me-admin-password"

# 4. Upload hình
node scripts/remote-upload-images.mjs "https://directus-production-8018.up.railway.app" "admin@ulink.com" "change-me-admin-password"
```

## Xử lý lỗi thường gặp

### Lỗi 500 khi login (Bước 3)

```
Bootstrap failed with error: { errors: [{ message: 'An unexpected error occurred.' }], response: { status: 500 } }
```

**Nguyên nhân:** Directus chưa restart xong hoặc chưa tạo xong schema core.

**Giải pháp:** Đợi thêm 1-2 phút rồi chạy lại. Kiểm tra `/server/ping` trả về `pong` trước khi thử lại.

### Lỗi "Invalid foreign key for field file in collection documents"

```
Invalid foreign key for field "file" in collection "documents".
```

**Nguyên nhân:** File records chưa được tạo trong `directus_files` khi chạy lần đầu (race condition).

**Giải pháp:** Chạy lại Bước 3 lần nữa. Lần 2 sẽ pass vì schema + files đã tồn tại.

### Hình ảnh không hiển thị trên frontend

**Nguyên nhân:** Bootstrap chỉ tạo metadata file trong DB, không upload file vật lý lên Railway storage.

**Giải pháp:** Chạy Bước 4 (`remote-upload-images.mjs`).

## Scripts liên quan

| Script | Mục đích |
|--------|----------|
| [`scripts/wipe-db.mjs`](scripts/wipe-db.mjs) | Xoá toàn bộ tables trong DB |
| [`scripts/remote-bootstrap.mjs`](scripts/remote-bootstrap.mjs) | Chạy full bootstrap (schema + RBAC + seed) lên remote |
| [`scripts/remote-seed.mjs`](scripts/remote-seed.mjs) | Chỉ seed data (không tạo schema) lên remote |
| [`scripts/remote-upload-images.mjs`](scripts/remote-upload-images.mjs) | Upload hình ảnh sản phẩm lên remote qua API |
| [`bootstrap.mjs`](bootstrap.mjs) | Bootstrap chính (dùng cho local Docker) |

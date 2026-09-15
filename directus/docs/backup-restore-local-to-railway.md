# Backup local và restore lên Railway PostgreSQL

Tài liệu này mô tả cách sao lưu database Directus local rồi restore toàn bộ dữ liệu lên PostgreSQL production trên Railway.

## 1. Điều kiện

- Docker Desktop đang chạy.
- Container PostgreSQL local: `ulink-postgres-1`.
- Database local: `ulink`.
- PostgreSQL Railway đã bật Public Networking.
- Có `DATABASE_PUBLIC_URL` hiện tại của Railway.

Không ghi password thật vào file hoặc commit vào Git.

## 2. Tạo backup từ database local

Mở PowerShell tại thư mục project:

```powershell
cd "C:\Users\thanh\Desktop\PathtechProject\ulink-b2b-platform"

docker exec ulink-postgres-1 pg_dump `
  -U ulink `
  -d ulink `
  --format=custom `
  --no-owner `
  --no-acl `
  > "C:\Users\thanh\Desktop\ulink-local-v2.backup"
```

Kiểm tra file backup:

```powershell
Get-Item "C:\Users\thanh\Desktop\ulink-local-v2.backup" | Select-Object FullName,Length
```

## 3. Copy backup vào container PostgreSQL

```powershell
docker cp `
  "C:\Users\thanh\Desktop\ulink-local-v2.backup" `
  ulink-postgres-1:/tmp/ulink-v2.backup
```

## 4. Restore lên Railway

Thay `<DATABASE_PASSWORD>` và host/port bằng `DATABASE_PUBLIC_URL` hiện tại của Railway:

```powershell
docker exec ulink-postgres-1 pg_restore `
  --dbname="postgresql://postgres:<DATABASE_PASSWORD>@<RAILWAY_PUBLIC_HOST>:<PORT>/railway?sslmode=require" `
  --clean `
  --if-exists `
  --no-owner `
  --no-acl `
  --exit-on-error `
  /tmp/ulink-v2.backup
```

Ví dụ cấu trúc URL:

```text
postgresql://postgres:<password>@sakura.proxy.rlwy.net:<port>/railway
```

## 5. Sau khi restore

1. Restart Directus service trên Railway.
2. Kiểm tra:

```powershell
Invoke-WebRequest `
  -Uri "https://ulink-production.up.railway.app/server/ping" `
  -UseBasicParsing
```

3. Kiểm tra số lượng product và SKU:

```powershell
Invoke-RestMethod `
  "https://ulink-production.up.railway.app/items/products?limit=-1&fields=id,slug,skus.sku_code,skus.price,skus.attributes"
```

## Lưu ý

- Backup database chỉ chứa schema và data, không chứa file ảnh trong `frontend/public/images`.
- Các field ảnh product phải tiếp tục lưu path dạng `/images/...`.
- Dùng backup local sau khi đã chạy seed v2 thành công.
- Không chạy restore khi chưa xác nhận đúng database production, vì `--clean --if-exists` sẽ xoá và thay thế các object hiện có.
- Không commit file backup `.backup` vào Git.

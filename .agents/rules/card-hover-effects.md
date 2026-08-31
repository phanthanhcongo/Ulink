# Card Hover Effects Rule

Quy chuẩn thiết kế hiệu ứng Hover cho Card trong hệ thống giao diện ULink B2B Platform (tham chiếu từ `target-segments.tsx`).

---

## 1. Quy chuẩn thông số Hover (Card Hover Specification)

Mọi Card trong hệ thống khi có tương tác hover cần áp dụng đầy đủ bộ class Tailwind CSS sau:

### Khung Card chính (Container `group`):
- **Đường viền viền sáng & Đổ bóng xanh (Glow Shadow)**:
  `hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]`
  - Đường viền 1px bao quanh màu xanh ULink Brand (`#1769E2`).
  - Lớp bóng đổ phát sáng nhẹ màu xanh ở chân card (`rgba(23, 105, 226, 0.25)`).
- **Đẩy khối nổi nhẹ (Elevation)**: `hover:-translate-y-0.5` (nhấc lên 2px).
- **Tỷ lệ phóng to (Scale)**: `hover:scale-[1.01]` (phóng to nhẹ 1%).
- **Thời gian chuyển đổi (Transition)**: `transition-all duration-300` (mượt trong 300ms).

### Các phần tử con trong Card (Nested Elements):
- **Khung vuông chứa Icon**: `group-hover:scale-105` (phóng to nhẹ 5%).
- **Mũi tên liên kết (`ArrowRight` / `→`)**: `group-hover:translate-x-1` (trượt sang phải 4px).
- **Đổi màu chữ khi Hover**: `group-hover:text-blue-600` / `hover:text-blue-800`.

---

## 2. Mã nguồn mẫu (Reference Implementation)

```tsx
<div
  className="group relative flex flex-col rounded-[3px] border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
>
  {/* Icon Box */}
  <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-white border border-slate-200 transition-transform duration-300 group-hover:scale-105">
    <Image src="/images/icons/icon.svg" alt="Icon" width={32} height={32} />
  </div>

  {/* Title & Body */}
  <h3 className="mt-4 text-[20px] font-bold text-slate-900 transition-colors group-hover:text-blue-600">
    Tiêu đề Card
  </h3>

  {/* Link & Arrow */}
  <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold">
    <span>Xem chi tiết</span>
    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
</div>
```

# Tiêu chí CSS & Thiết kế UI/UX trang Admin (Admin Dashboard Standards)

Tài liệu này định nghĩa bộ tiêu chuẩn CSS và quy tắc thiết kế giao diện dành riêng cho hệ thống trang quản trị (Admin Dashboard) của dự án. Mục tiêu là đảm bảo giao diện trực quan, đồng bộ, dễ sử dụng cho các tác vụ quản trị phức tạp và tối ưu hóa hiệu năng hiển thị dữ liệu lớn.

---

## 1. Nguyên tắc thiết kế cốt lõi (Core Design Principles)

*   **Hiệu quả trên thẩm mỹ (Utility & Clarity first):** Admin là công cụ làm việc. Giao diện cần trực quan, tập trung vào dữ liệu và giảm thiểu các trang trí rườm rà gây mất tập trung.
*   **Bố cục chặt chẽ (Density Control):** Cho phép hiển thị lượng thông tin nhiều nhất có thể mà không bị rối mắt. Hỗ trợ tùy chỉnh khoảng cách (Compact vs Comfortable) nếu cần.
*   **Đồng nhất (Consistency):** Mọi nút bấm, ô nhập liệu, bảng biểu, hộp thoại và thông báo trạng thái phải tuân thủ cùng một quy chuẩn thiết kế.

---

## 2. Bố cục tổng thể (Main Layout & Structure)

Bố cục Admin chuẩn bao gồm 3 phần chính: **Sidebar (Menu điều hướng)**, **Header (Thanh công cụ)** và **Main Content (Vùng hiển thị nội dung)**.

| Thành phần | Tiêu chí CSS | Trạng thái Mobile |
| :--- | :--- | :--- |
| **Sidebar** | Cố định phía bên trái (`sticky` hoặc `fixed`), chiều rộng cố định (240px - 280px). Hỗ trợ chế độ thu gọn (Mini-sidebar: 60px - 80px) chỉ hiển thị icon. | Ẩn mặc định, trượt từ trái qua (Slide-in drawer) khi nhấn nút Hamburger. |
| **Header** | Cố định trên cùng (`sticky top-0 z-40`), độ cao cố định (60px - 64px), hiệu ứng đổ bóng nhẹ hoặc viền dưới để phân tách. Chứa Breadcrumb, tìm kiếm nhanh, thông báo và thông tin User. | Trải rộng 100%, chứa thêm nút Hamburger để mở Sidebar. |
| **Main Content** | Chiều rộng tự động co giãn. Có khoảng đệm (`p-4` đến `p-8` tùy màn hình). Có thể cuộn độc lập nếu Sidebar được cố định. | Padding nhỏ hơn (`p-4`), các lưới chuyển thành 1 cột dọc. |

### Ví dụ khung Layout (Tailwind CSS):
```tsx
<div className="flex min-h-screen bg-slate-100 text-slate-900">
  {/* Sidebar */}
  <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-all duration-300 lg:sticky lg:block hidden">
    {/* Navigation Links */}
  </aside>

  {/* Right Side container */}
  <div className="flex flex-1 flex-col overflow-x-hidden">
    {/* Header */}
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Breadcrumbs & User Profile */}
    </header>

    {/* Main Content */}
    <main className="flex-1 p-6">
      {/* Content wrapper */}
    </main>
  </div>
</div>
```

---

## 3. Tiêu chí CSS cho Bảng dữ liệu (Data Tables)

Bảng là thành phần quan trọng nhất trong trang Admin. Cần được tối ưu để hiển thị dữ liệu lớn một cách rõ ràng.

*   **Sticky Header:** Luôn cố định tiêu đề bảng khi cuộn trang xuống dưới (`top-0 sticky bg-white z-10`).
*   **Sticky Actions Column:** Cố định cột "Hành động" (Sửa, Xóa, Chi tiết) ở phía bên phải cùng để người dùng luôn thao tác được mà không cần cuộn ngang (`right-0 sticky bg-white shadow-[-4px_0_8px_rgba(0,0,0,0.05)]`).
*   **Hiệu ứng Hover:** Đổi màu nền nhẹ của cả dòng khi di chuột qua (`hover:bg-slate-50`) để người dùng dễ theo dõi theo hàng ngang.
*   **Text Overflow (Cắt chữ):** Với các ô dữ liệu dài (mô tả, địa chỉ), áp dụng cắt chữ bằng dấu ba chấm (`truncate` hoặc `line-clamp-2`) kèm tooltip hiển thị đầy đủ khi hover.
*   **Căn lề dữ liệu (Data Alignment):**
    *   Căn trái (`text-left`): Dành cho chuỗi chữ thông thường (Tên, Email, Mô tả).
    *   Căn phải (`text-right`): Dành cho số liệu, tiền tệ, ngày tháng (giúp dễ so sánh độ dài số lượng).
    *   Căn giữa (`text-center`): Dành cho Trạng thái (Badges), Icon, Avatar, Hành động.
*   **Padding chuẩn:**
    *   Comfortable: `py-4 px-6` (Dành cho bảng ít cột, cần thoáng).
    *   Compact (Khuyên dùng cho Admin nhiều cột): `py-2.5 px-4`.

### 💡 Giải pháp cho bảng quá nhiều cột (High-density Tables)
Khi bảng có quá nhiều thuộc tính (10 - 20 cột) và không thể hiển thị hết trên một màn hình, tuyệt đối không bóp nhỏ font chữ/padding quá mức để cố nhét vào. Áp dụng các giải pháp CSS & UX sau:

1. **Cuộn ngang kết hợp Cố định cột chính (Horizontal Scroll with Sticky Columns):**
   * Cho phép cuộn ngang bảng bằng cách bọc thẻ `<table>` bằng container có `overflow-x-auto`.
   * Cố định (`sticky left-0`) cột quan trọng (ví dụ: `ID`, `Tên`) và cột `Hành động` ở bên phải cùng (`sticky right-0`). Khi cuộn ngang, các thông tin định danh và nút bấm vẫn hiển thị.
   * *Ví dụ Tailwind CSS:*
     ```tsx
     {/* Container ngoài cùng */}
     <div className="w-full overflow-x-auto border border-slate-200 rounded-lg">
       <table className="w-full min-w-[1200px] text-sm text-left">
         <thead className="bg-slate-50 text-slate-700">
           <tr>
             {/* Sticky Left Column (thêm bóng đổ bên phải để phân tách khi cuộn) */}
             <th className="sticky left-0 bg-slate-50 px-4 py-3 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">Mã đơn</th>
             <th className="px-4 py-3">Khách hàng</th>
             <th className="px-4 py-3">Sản phẩm</th>
             <th className="px-4 py-3">Số lượng</th>
             <th className="px-4 py-3">Tổng tiền</th>
             <th className="px-4 py-3">Ngày tạo</th>
             <th className="px-4 py-3">Cập nhật</th>
             <th className="px-4 py-3">Ghi chú</th>
             {/* Sticky Right Column (thêm bóng đổ bên trái để phân tách) */}
             <th className="sticky right-0 bg-slate-50 px-4 py-3 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.05)] text-center">Thao tác</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-slate-200 bg-white">
           <tr className="hover:bg-slate-50">
             <td className="sticky left-0 bg-white px-4 py-3 font-semibold shadow-[2px_0_5px_rgba(0,0,0,0.05)]">#OD-8821</td>
             <td className="px-4 py-3">Nguyễn Văn A</td>
             <td className="px-4 py-3">Laptop Dell XPS</td>
             <td className="px-4 py-3">1</td>
             <td className="px-4 py-3">35,000,000đ</td>
             <td className="px-4 py-3">16/08/2026</td>
             <td className="px-4 py-3">16/08/2026</td>
             <td className="px-4 py-3">Giao giờ hành chính</td>
             <td className="sticky right-0 bg-white px-4 py-3 shadow-[-2px_0_5px_rgba(0,0,0,0.05)] text-center">
               <button className="text-blue-600 hover:text-blue-800 font-medium">Sửa</button>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
     ```

2. **Dòng mở rộng (Expandable Rows):**
   * Chỉ hiển thị 5 - 6 cột thông tin quan trọng nhất.
   * Thêm cột chứa icon `Chevron` (Mũi tên xuống) ở đầu dòng. Khi click, mở rộng (expand) một dòng phụ (`<tr>`) ngay dưới dòng đó để show toàn bộ các thuộc tính phụ dưới dạng Key - Value hoặc lưới grid nhỏ.

3. **Bộ chọn ẩn/hiển thị cột (Column Visibility Toggle):**
   * Cung cấp một nút "Tùy chọn cột" (thường có icon bánh răng hoặc danh sách) phía trên bảng.
   * Cho phép Admin click chọn hiển thị/ẩn các cột (ví dụ: chỉ hiện 8 cột họ tự chọn).
   * **Quy tắc:** Lưu cấu hình hiển thị cột này vào `localStorage` để người dùng không phải chọn lại khi tải lại trang.

4. **Trượt Panel Chi tiết (Slide-out Drawer / Detail Panel):**
   * Khi nhấn vào dòng hoặc nút "Xem chi tiết", một Drawer (`fixed top-0 right-0 h-full w-[450px] shadow-2xl z-50 transition-transform`) sẽ trượt ra từ bên phải màn hình để hiển thị đầy đủ thuộc tính và lịch sử của bản ghi đó. Đây là cách làm sạch bảng hiệu quả nhất.

---

## 4. Tiêu chí CSS cho Form & Trạng thái nhập liệu

*   **Phân cấp Layout Form:** Form dài nên chia thành các Block/Card chủ đề thay vì kéo dài từ trên xuống dưới.
*   **Trạng thái tương tác rõ ràng (Interactive States):**
    *   `Focus`: Tạo đường viền/đổ bóng màu chủ đạo rõ ràng (ví dụ: `ring-2 ring-blue-500/20 border-blue-500 outline-none`).
    *   `Disabled`: Đổi màu nền xám nhạt (`bg-slate-100`), giảm opacity, chuyển con trỏ chuột thành dạng không được thao tác (`cursor-not-allowed text-slate-400`).
    *   `Error`: Đường viền đỏ (`border-red-500 ring-red-500/20`), hiển thị thông báo lỗi màu đỏ ngay dưới ô nhập liệu.
*   **Chiều cao đồng bộ (Input/Select/Button Height):** Thường sử dụng chiều cao chuẩn `h-10` (40px) hoặc `h-9` (36px).

---

## 5. Hệ thống màu sắc & Nhận diện trạng thái (Visual States)

Hệ màu trong Admin cần rõ ràng để người quản trị nhận biết tình trạng hệ thống tức thì:

| Trạng thái | Màu sắc chủ đạo | Ý nghĩa ứng dụng | Ví dụ mã màu (Tailwind) |
| :--- | :--- | :--- | :--- |
| **Primary** | Blue / Indigo | Nút chính, chỉ mục, trạng thái đang hoạt động. | `text-blue-600 bg-blue-50` |
| **Success** | Green | Đã hoàn thành, Hoạt động (Active), Đã thanh toán. | `text-emerald-700 bg-emerald-50` |
| **Warning** | Orange / Yellow | Chờ duyệt (Pending), Cảnh báo tài nguyên, Tạm ẩn. | `text-amber-700 bg-amber-50` |
| **Danger** | Red | Đã hủy, Bị khóa (Banned), Lỗi hệ thống, Nút xóa. | `text-red-700 bg-red-50` |
| **Neutral** | Slate / Gray | Nháp (Draft), Vô hiệu hóa, Trạng thái không xác định. | `text-slate-600 bg-slate-100` |

> [!IMPORTANT]
> **Quy tắc tương phản (Contrast Rule):** Khi làm nhãn trạng thái (Status Badges), luôn kết hợp chữ màu đậm trên nền màu nhạt của cùng tông màu (ví dụ: Text xanh lục đậm trên nền xanh lục nhạt). Tránh dùng chữ trắng trên nền màu quá sáng làm lóa mắt.

---

## 6. Tiêu chí Responsive trên Mobile & Tablet

Dù Admin tối ưu cho Desktop, CSS vẫn cần xử lý Responsive mượt mà để tránh vỡ giao diện:

1.  **Lưới cột (Grid Layout):**
    *   Mobile: 1 cột (`grid-cols-1`).
    *   Tablet: 2 cột (`md:grid-cols-2`).
    *   Desktop: 3 hoặc 4 cột tùy độ lớn (`lg:grid-cols-3 xl:grid-cols-4`).
2.  **Bảng biểu trên di động:**
    *   Bọc ngoài bảng bằng `overflow-x-auto` để cuộn ngang trên điện thoại mà không làm vỡ layout cha.
    *   Hoặc viết media query ẩn bớt cột phụ, chỉ hiện cột chính (ví dụ: ID, Tên, Trạng thái).
3.  **Khoảng cách và Kích thước:**
    *   Sử dụng biến hoặc class responsive cho padding (`p-4 sm:p-6 lg:p-8`).
    *   Nút bấm trên Mobile phải có vùng nhấn tối thiểu `h-11` (44px) để dễ thao tác bằng ngón tay.

---

## 7. Hiệu ứng & Trải nghiệm người dùng (Animations & UX CSS)

*   **Hiệu ứng chuyển cảnh nhẹ (Transitions):** Khi hover nút bấm, hover dòng bảng, hoặc khi thu gọn sidebar, luôn áp dụng `transition-all duration-200 ease-in-out` để mượt mà hơn.
*   **Loading State (Skeleton/Spinner):** Tạo hiệu ứng nhấp nháy màu xám (`animate-pulse`) cho các thành phần đang tải dữ liệu để tránh cảm giác giao diện bị đứng/lag.
*   **Modal & Backdrop:** Hộp thoại pop-up cần có lớp phủ mờ phía sau (`bg-slate-900/50 backdrop-blur-sm`) để tách biệt nội dung chính và tập trung sự chú ý.

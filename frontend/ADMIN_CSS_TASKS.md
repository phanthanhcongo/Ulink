# Danh sách Task CSS & UI cho các trang Admin (Admin CSS Implementation Tasks)

Dưới đây là danh sách các đầu việc (Todo list) chi tiết để áp dụng tiêu chuẩn CSS, Responsive và xử lý bảng biểu mật độ cao cho từng trang quản trị nằm trong thư mục `src/app/[locale]/admin/`.

---

## 📋 1. Layout Chung & Dashboard Chính

### [x] Cấu trúc Layout Hệ thống (`admin/layout.tsx`)
*   [x] Thiết lập Sidebar cố định ở Desktop (`lg:sticky lg:block`), tự động thu gọn khi nhấn nút Toggle.
*   [x] Thiết lập Drawer trượt (`fixed z-50 transition-transform`) cho Sidebar trên Mobile khi nhấn nút Hamburger ở Header.
*   [x] Thiết lập Header (`sticky top-0 z-40 bg-white border-b border-slate-200`) có bóng đổ nhẹ.
*   [x] Tối ưu hóa padding của vùng nội dung chính (`p-4 sm:p-6 lg:p-8`) để thích ứng với mọi kích thước màn hình.

### [x] Trang Dashboard Tổng quan (`admin/page.tsx`)
*   [x] Thiết kế Grid responsive cho các Card chỉ số KPIs (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6`).
*   [x] Tối ưu biểu đồ (Charts) responsive, tự động co giãn theo chiều rộng vùng chứa (`w-full aspect-[16/9] lg:aspect-[16/7]`).
*   [x] Ẩn bớt các nhãn/chú thích biểu đồ phức tạp trên màn hình di động để tránh đè chữ.

---

## 📦 2. Các trang Quản lý Danh mục & Sản phẩm

### [x] Quản lý Sản phẩm (`admin/products`)
*   [x] Áp dụng **Cuộn ngang + Sticky Column** cho bảng sản phẩm: Cố định cột ảnh đại diện và tên sản phẩm bên trái (`sticky left-0 bg-white shadow-[2px_0_5px_rgba(0,0,0,0.05)]`), cột thao tác ở bên phải (`sticky right-0 bg-white shadow-[-2px_0_5px_rgba(0,0,0,0.05)]`).
*   [x] Tối ưu kích thước và tỉ lệ khung hình của Thumbnail sản phẩm (`h-12 w-12 object-cover rounded-md border`).
*   [x] Thiết lập Form thêm/sửa sản phẩm phân bổ theo các tab hoặc block thông tin rõ ràng (Thông tin chung, Giá cả, Media).

### [x] Quản lý SKUs (`admin/skus`)
*   [x] Áp dụng padding compact (`py-2 px-4`) cho bảng SKU do đặc thù chứa nhiều thông số kỹ thuật (Kích thước, Màu sắc, Trọng lượng).
*   [x] Sử dụng **Column Visibility Toggle** (nút ẩn hiện cột) để người dùng tự chọn hiển thị các cột thuộc tính bổ sung.
*   [x] Căn phải các cột giá trị số học và tiền tệ (`text-right tabular-nums`).

### [x] Danh mục bài viết/sản phẩm (`admin/categories` & `admin/attributes`)
*   [x] Thiết lập CSS cho giao diện cây danh mục (Nested tree list) hiển thị thụt đầu dòng rõ ràng của danh mục con.
*   [x] Thêm icon chỉ báo thu gọn/mở rộng danh mục trực quan.
*   [x] Đảm bảo các nút tương tác nhanh (Thêm con, Sửa, Xóa) hiển thị rõ ràng trên hover dòng.

---

## 📄 3. Các trang Xử lý Nghiệp vụ & Giao dịch B2B

### [x] Yêu cầu Báo giá B2B (`admin/rfqs`)
*   [x] Thiết lập **Slide-out Drawer** (Panel trượt từ cạnh phải) để xem chi tiết thông tin RFQ của khách hàng khi click vào dòng bản ghi mà không cần load lại trang.
*   [x] Thiết lập hệ màu sắc tương phản cao cho các trạng thái RFQ (Mới, Đang báo giá, Đã gửi, Hủy bỏ) trong các Badge bo góc tròn.
*   [x] Ẩn bớt các cột mô tả yêu cầu dài trên di động, chỉ hiển thị cột Mã RFQ, Khách hàng và Trạng thái.

### [x] Yêu cầu Hàng mẫu (`admin/sample-requests`)
*   [x] Áp dụng **Expandable Rows** (Dòng mở rộng): Nhấp vào dòng yêu cầu hàng mẫu để hiển thị nhanh danh sách các sản phẩm con được yêu cầu ngay bên dưới dòng đó.
*   [x] Thiết lập modal phê duyệt/từ chối có lớp phủ mờ (`bg-slate-900/50 backdrop-blur-sm`) để tăng tính tập trung.

---

## 👥 4. Quản lý Người dùng & Tương tác Khách hàng

### [x] Quản lý Users (`admin/users`)
*   [x] Thiết lập Badge màu sắc rõ ràng phân biệt phân quyền người dùng (Admin: Đỏ, Manager: Cam, Member: Xanh lục).
*   [x] Tối ưu Form phân quyền người dùng với các checkbox dạng Grid gọn gàng, có hiệu ứng hover nổi bật vùng chọn.
*   [x] Đảm bảo cột Email có xử lý tràn text (`truncate max-w-[200px]`).

### [x] Yêu cầu Liên hệ (`admin/contact-requests`) & Bản tin (`admin/subscribers`)
*   [x] Thiết lập giao diện xem nhanh (Quick View Modal) cho nội dung tin nhắn liên hệ dài của khách hàng.
*   [x] Tối ưu responsive cho bảng danh sách đăng ký nhận tin (Subscribers), hỗ trợ xuất file Excel/CSV với nút bấm rõ ràng trên di động.

---

## 🛠️ 5. Các trang Tiện ích & Vận hành

### [x] Nhập dữ liệu (`admin/import`)
*   [x] Thiết kế khu vực kéo thả file (`Dropzone`) với viền nét đứt (`border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50/30 transition-all`).
*   [x] Hiển thị thanh tiến trình (Progress bar) sinh động khi đang xử lý file.
*   [x] Hiển thị bảng tổng hợp lỗi dòng (nếu import thất bại) dạng compact để dễ theo dõi.

### [x] Bài viết & Tin tức (`admin/articles`)
*   [x] Tối ưu CSS cho trình soạn thảo văn bản Rich Text Editor (đặc biệt là thanh công cụ không bị tràn ngoài vùng màn hình thiết bị nhỏ).
*   [x] Xây dựng Grid view dạng thẻ (Cards) thay vì bảng khi hiển thị danh sách bài viết trên thiết bị di động.

### [x] Chi nhánh & Trung tâm Vận chuyển (`admin/hubs`)
*   [x] Tối ưu bản đồ hiển thị co giãn theo container (`aspect-video lg:aspect-[21/9] w-full rounded-[5px] overflow-hidden`).
*   [x] Danh sách chi nhánh hiển thị dạng danh mục cuộn dọc bên cạnh bản đồ trên desktop, chuyển thành dạng tab xếp dọc trên mobile.

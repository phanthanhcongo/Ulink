# Apply Page Figma Data & Component Mapping

**Source Figma Node**: `1499-15244` (`trang-ung-tuyen`)  
**Design Dimensions**: 1440px width × 3046px height  
**Primary Colors**: `#1769E2` (Primary Blue), `#1257C0` (Dark Accent Blue), `#162233` (Navy Heading), `#617084` (Muted Body), `#F5F8FC` (Light Background), `#DC2626` (Required Red)

---

## 1. Breadcrumb & Header Title Section Data

```json
{
  "breadcrumb": [
    { "label": "Trang chủ", "url": "/" },
    { "label": "Vị trí tuyển dụng", "url": "/about/careers" },
    { "label": "Kinh doanh", "url": "/about/careers?dept=kinh-doanh" },
    { "label": "Ứng tuyển trực tuyến", "active": true }
  ],
  "titleSection": {
    "badge": "NỘP ĐƠN ỨNG TUYỂN",
    "jobTitle": "Chuyên viên Phát triển Kinh doanh B2B — Khu Công nghiệp",
    "description": "Cảm ơn bạn đã quan tâm đến cơ hội nghề nghiệp tại ULink Industries. Vui lòng hoàn thành biểu mẫu thông tin dưới đây. Đội ngũ Tuyển dụng sẽ phản hồi hồ sơ của bạn trong vòng 3 ngày làm việc."
  }
}
```

---

## 2. Main Content Form (Left Column Main Steps)

```json
{
  "steps": [
    {
      "step": "01",
      "title": "Thông tin cá nhân",
      "fields": [
        { "label": "Họ và tên", "required": true, "type": "text", "placeholder": "Nhập đầy đủ họ và tên của bạn" },
        { "label": "Địa chỉ Email", "required": true, "type": "email", "placeholder": "ví dụ: name@example.com" },
        { "label": "Số điện thoại", "required": true, "type": "tel", "placeholder": "Nhập số điện thoại liên hệ" },
        { "label": "Ngày tháng năm sinh", "required": true, "type": "date", "placeholder": "DD/MM/YYYY" },
        { "label": "Giới tính", "required": true, "type": "select", "options": ["Không yêu cầu", "Nam", "Nữ"] }
      ]
    },
    {
      "step": "02",
      "title": "Trình độ học vấn",
      "fields": [
        { "label": "Bậc học cao nhất", "required": true, "type": "select", "options": ["Đại học", "Thạc sĩ", "Cao đẳng", "Khác"] },
        { "label": "Trường đại học / Cao đẳng", "required": true, "type": "text", "placeholder": "Tên trường học của bạn" },
        { "label": "Chuyên ngành", "required": true, "type": "text", "placeholder": "Chuyên ngành đào tạo" },
        { "label": "Năm tốt nghiệp", "required": true, "type": "text", "placeholder": "ví dụ: 2024" }
      ]
    },
    {
      "step": "03",
      "title": "Kinh nghiệm làm việc gần nhất",
      "fields": [
        { "label": "Tên công ty gần nhất", "required": false, "type": "text", "placeholder": "Nhập tên công ty bạn từng làm việc" },
        { "label": "Vị trí đảm nhiệm", "required": false, "type": "text", "placeholder": "Ví dụ: Nhân viên kinh doanh, Trưởng nhóm..." },
        { "label": "Thời gian làm việc", "required": false, "type": "text", "placeholder": "Ví dụ: 06/2022 - Hiện tại hoặc 2 năm" },
        { "label": "Mô tả ngắn về công việc và thành tựu nổi bật", "required": false, "type": "textarea", "placeholder": "Nêu các nhiệm vụ chính và KPI hoặc kết quả kinh doanh nổi bật bạn đã đạt được..." }
      ]
    },
    {
      "step": "04",
      "title": "Hồ sơ đính kèm (CV)",
      "fields": [
        {
          "label": "Kéo thả tệp tin CV của bạn vào đây",
          "sublabel": "Hoặc bấm để duyệt tệp tin từ máy tính",
          "notice": "Hỗ trợ định dạng .pdf, .doc, .docx. Dung lượng tối đa 15MB.",
          "required": true
        }
      ]
    },
    {
      "step": "05",
      "title": "Thư giới thiệu / Thông điệp gửi nhà tuyển dụng",
      "fields": [
        {
          "label": "Thư giới thiệu (Không bắt buộc)",
          "type": "textarea",
          "placeholder": "Chia sẻ lý do bạn mong muốn đồng hành cùng ULink Industries và vì sao bạn là mảnh ghép hoàn hảo cho vị trí này..."
        }
      ]
    }
  ],
  "privacyAgreement": "Tôi cam kết thông tin cung cấp là chính xác và đồng ý cho phép ULink Industries sử dụng dữ liệu này phục vụ cho quy trình tuyển dụng và đánh giá năng lực theo đúng Chính sách bảo mật thông tin.",
  "submitText": "Gửi đi →",
  "submitNotice": "Đơn ứng tuyển sẽ được gửi trực tiếp đến bộ phận nhân sự."
}
```

---

## 3. Right Sidebar Data

```json
{
  "overviewCard": {
    "title": "Tóm tắt công việc",
    "items": [
      { "label": "Cấp bậc", "value": "Chuyên viên", "icon": "user-rank" },
      { "label": "Mức lương", "value": "15 - 25M VND", "icon": "coins" },
      { "label": "Hình thức làm việc", "value": "Toàn thời gian", "icon": "clock" },
      { "label": "Hạn nộp hồ sơ", "value": "30/09/2026", "icon": "calendar" }
    ]
  },
  "recruitmentProcessCard": {
    "title": "Quy trình tuyển dụng",
    "steps": [
      { "number": 1, "title": "Tiếp nhận hồ sơ" },
      { "number": 2, "title": "Lựa chọn CV phù hợp" },
      { "number": 3, "title": "Phỏng vấn" },
      { "number": 4, "title": "Đánh giá" },
      { "number": 5, "title": "Gửi Offer" },
      { "number": 6, "title": "Onboarding" }
    ]
  }
}
```

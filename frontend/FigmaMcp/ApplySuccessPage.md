# Apply Success Confirmation Page Figma Data & Component Mapping

**Source Figma Node**: `1526-14955` (`trang-xac-nhan-ung-tuyen`)  
**Design Dimensions**: 1440px width  
**Primary Colors**: `#1769E2` (Primary Blue), `#1257C0` (Dark Accent Blue), `#162233` (Navy Heading), `#617084` (Muted Body), `#F5F8FC` (Light Background), `#3878F5` (Step Blue Badge)

---

## 1. Breadcrumb & Success Banner Section Data

```json
{
  "breadcrumb": [
    { "label": "Trang chủ", "url": "/" },
    { "label": "Vị trí tuyển dụng", "url": "/about/careers" },
    { "label": "Ứng tuyển thành công", "active": true }
  ],
  "banner": {
    "icon": "checkmark-circle-filled",
    "title": "Nộp đơn ứng tuyển thành công!",
    "message": "Cảm ơn bạn đã nộp đơn ứng tuyển tại ULink Industries. Hồ sơ của bạn đã được gửi trực tiếp đến Bộ phận Nhân sự. Chúng tôi trân trọng tài năng của bạn và sẽ phản hồi kết quả duyệt hồ sơ sớm nhất.",
    "cta": { "label": "Về trang chủ", "url": "/" }
  }
}
```

---

## 2. Application Summary Card Data

```json
{
  "cardTitle": "Thông tin hồ sơ đã nộp",
  "jobInfo": {
    "logoGradient": "linear-gradient(49deg, #1769E2 0%, #0089FF 100%)",
    "label": "VỊ TRÍ ỨNG TUYỂN",
    "title": "Chuyên viên Phát triển Kinh doanh B2B — Khu Công nghiệp"
  },
  "metaGrid": [
    { "label": "Nơi làm việc", "value": "KCN Đồng Văn IV, Hà Nam" },
    { "label": "Mức lương thương lượng", "value": "15 - 25M VND" },
    { "label": "Ngày nộp đơn", "value": "Hôm nay, 2026" }
  ]
}
```

---

## 3. Next Steps Section Data (3 Steps)

```json
{
  "title": "Các bước tiếp theo của bạn là gì?",
  "subtitle": "Hành trình gia nhập đại gia đình ULink Industries bắt đầu từ đây",
  "steps": [
    {
      "step": 1,
      "title": "Xác nhận hồ sơ",
      "description": "Hệ thống tự động gửi email xác nhận đã nhận CV đầy đủ đến email của bạn hoặc Đội ngũ liên hệ trực tiếp với Bạn."
    },
    {
      "step": 2,
      "title": "Đánh giá năng lực",
      "description": "Chuyên viên tuyển dụng ULink đánh giá kinh nghiệm và độ phù hợp trong 3 ngày làm việc."
    },
    {
      "step": 3,
      "title": "Liên hệ phỏng vấn",
      "description": "Nếu CV phù hợp, chúng tôi sẽ gọi điện trực tiếp để đặt lịch phỏng vấn chính thức."
    }
  ]
}
```

---

## 4. Similar Career Opportunities Data (2 Cards)

```json
{
  "title": "Cơ hội nghề nghiệp tương tự dành cho bạn",
  "subtitle": "Các vị trí đang mở tuyển có yêu cầu kỹ năng tương ứng với hồ sơ của bạn",
  "jobs": [
    {
      "department": "Khối Sản Xuất - Công Nghệ Cao",
      "title": "Kỹ Sư Giám Sát Chất Lượng QA/QC (Phòng Sạch)",
      "salary": "14 - 20M VND",
      "location": "Đại Cương, Hà Nam"
    },
    {
      "department": "Phòng Logistics & HUB",
      "title": "Chuyên Viên Logistics & Điều Phối Chuỗi Cung Ứng",
      "salary": "12 - 18M VND",
      "location": "HUB Hà Nam"
    }
  ]
}
```

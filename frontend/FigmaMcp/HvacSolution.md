# HvacSolution Page Figma Data & Component Mapping

**Source Figma Node**: `1228-11367` (`co-dien-hvac-detail-page`)  
**Design Dimensions**: 1440px width  
**Primary Colors**: `#1769E2` (Primary Blue), `#0B153D` (Heading Navy), `#F2F4F8` / `#E9EFF6` (Light Backgrounds)

---

## 1. Hero Section Data

```json
{
  "breadcrumb": ["Trang chủ", "Ngành nghề", "Cơ Điện - HVAC"],
  "title": "Giải pháp Băng keo Nhôm chuyên dụng cho ngành Cơ Điện – HVAC",
  "description": "ULINK cung cấp các dòng băng keo nhôm (Aluminum Foil Tape) chất lượng cao chịu nhiệt vượt trội, bám dính cực mạnh chuyên dùng bịt kín ống gió, bọc cách nhiệt bảo ôn và hoàn thiện hệ thống cơ điện HVAC đạt chuẩn UL 723.",
  "cta": {
    "secondary": "Tải catalogue"
  }
}
```

---

## 2. Feature Highlights Data

```json
[
  {
    "id": "feature-1",
    "title": "Chịu nhiệt cao",
    "description": "Hoạt động ổn định trong dải nhiệt từ -30°C đến +120°C",
    "icon": "icon-heat-resistance"
  },
  {
    "id": "feature-2",
    "title": "Bám dính vượt trội",
    "description": "Keo acrylic chịu lực, bám chắc trên bề mặt kim loại & ống gió",
    "icon": "icon-superior-adhesion"
  },
  {
    "id": "feature-3",
    "title": "Chống ẩm & chống ăn mòn",
    "description": "Lớp nhôm nguyên chất ngăn hơi ẩm, chống rỉ sét hiệu quả",
    "icon": "icon-moisture-resistance"
  },
  {
    "id": "feature-4",
    "title": "Thi công nhanh chóng",
    "description": "Dễ cắt, dễ dán, tiết kiệm thời gian lắp đặt hệ thống HVAC",
    "icon": "icon-quick-installation"
  }
]
```

---

## 3. Tab Navigation Data

```json
[
  { "id": "tab-overview", "label": "Tổng quan", "active": true },
  { "id": "tab-products", "label": "Sản phẩm chuyên dụng", "active": false },
  { "id": "tab-applications", "label": "Giải pháp ứng dụng", "active": false },
  { "id": "tab-certifications", "label": "Chứng nhận & Tiêu chuẩn", "active": false },
  { "id": "tab-partners", "label": "Khách hàng đối tác", "active": false }
]
```

---

## 4. Overview Section Data

```json
{
  "caption": "TỔNG QUAN GIẢI PHÁP",
  "heading": "Đảm bảo độ kín khí và bảo ôn hoàn hảo cho hệ thống Cơ Điện",
  "paragraph": "Trong thiết kế hệ thống HVAC, việc rò rỉ khí và đọng sương bề mặt ống gió là những lỗi vận hành nghiêm trọng gây lãng phí điện năng lớn. Băng keo nhôm ULINK đóng vai trò là màng ngăn ẩm, bịt kín tuyệt đối các mối nối ghép ống gió và bảo vệ hoàn thiện các lớp bông thủy tinh cách nhiệt.",
  "sidebar": {
    "title": "Vì sao chọn ULINK?",
    "advantages": [
      {
        "title": "Nhôm nguyên chất 99.5%",
        "description": "Màng nhôm dẻo dai, không rách nứt khi thi công ở các góc cạnh ống gió phức tạp.",
        "icon": "32/industry"
      },
      {
        "title": "Keo acrylic chịu nhiệt cao",
        "description": "Lớp keo bám dính cực tốt, không bị khô giòn hay bong tróc khi hệ thống hoạt động liên tục.",
        "icon": "32/task--approved"
      },
      {
        "title": "An toàn sức khỏe & RoHS",
        "description": "Sản phẩm không chứa chì, không mùi độc hại, an toàn tuyệt đối cho hệ thống dẫn khí tòa nhà.",
        "icon": "32/user--certification"
      },
      {
        "title": "Độ dày đa dạng 30-80μm",
        "description": "Đáp ứng linh hoạt các tiêu chuẩn kỹ thuật của từng dự án và chủ đầu tư.",
        "icon": "32/badge"
      }
    ],
    "hotline": {
      "label": "Liên hệ tư vấn miễn phí",
      "phone": "Hotline: 0247 309 9899",
      "buttonText": "Gọi ngay"
    }
  }
}
```

---

## 5. Product Catalog Grid Data (4 Products)

```json
[
  {
    "id": "p1",
    "name": "Băng keo nhôm HVAC 48mm x 30m",
    "priceRange": "85.000đ - 95.000đ",
    "unit": "/cuộn",
    "moq": "100 cuộn",
    "spec": "Độ dày 40 micron",
    "location": "Kho Hà Nam, Việt Nam"
  },
  {
    "id": "p2",
    "name": "Băng keo chịu nhiệt 72mm x 45m",
    "priceRange": "125.000đ - 140.000đ",
    "unit": "/cuộn",
    "moq": "50 cuộn",
    "spec": "Chịu nhiệt 150°C",
    "location": "Kho Hà Nam, Việt Nam"
  },
  {
    "id": "p3",
    "name": "Băng keo nhôm gia cường sợi thủy tinh",
    "priceRange": "155.000đ - 175.000đ",
    "unit": "/cuộn",
    "moq": "50 cuộn",
    "spec": "FSK Facing Tape",
    "location": "Kho Hà Nam, Việt Nam"
  },
  {
    "id": "p4",
    "name": "Băng keo nhôm bảo ôn ống gió 96mm",
    "priceRange": "195.000đ - 220.000đ",
    "unit": "/cuộn",
    "moq": "30 cuộn",
    "spec": "Keo acrylic cao cấp",
    "location": "Kho Hà Nam, Việt Nam"
  }
]
```

---

## 6. Application Section Data

```json
[
  {
    "id": "app-1",
    "caption": "ỨNG DỤNG THI CÔNG",
    "title": "Bịt kín mối nối ống gió HVAC",
    "description": "Sử dụng băng keo nhôm ULINK để kết nối và bịt kín hoàn hảo các khe hở tại các điểm nối ống thông gió tôn mạ kẽm. Ngăn rò rỉ luồng khí lạnh áp suất lớn, đảm bảo hiệu năng tối đa cho toàn bộ hệ thống điều hòa trung tâm của tòa nhà."
  },
  {
    "id": "app-2",
    "caption": "BẢO ÔN CÁCH NHIỆT",
    "title": "Bọc cách nhiệt đường ống bảo ôn",
    "description": "Hoàn thiện mối ghép cho các tấm cách nhiệt bông thủy tinh (Glasswool), bông khoáng hoặc các ống bảo ôn đồng điều hòa. Đảm bảo màng chắn ẩm hơi nước khép kín, ngăn hiện tượng đọng sương (condensation) làm hư hỏng trần thạch cao."
  }
]
```

---

## 7. Commitment & Service Data ("Why Choose ULINK")

```json
{
  "caption": "CAM KẾT DỊCH VỤ",
  "heading": "Đối tác tin cậy của các nhà thầu M&E hàng đầu",
  "description": "Chúng tôi thấu hiểu áp lực về tiến độ thi công và chất lượng nghiệm thu khắt khe của các công trình công nghiệp lớn.",
  "cards": [
    {
      "title": "Tiêu chuẩn Nhật Bản",
      "description": "Đảm bảo quy trình sản xuất cơ lý đạt độ chuẩn xác cực cao, độ dính màng cực bền."
    },
    {
      "title": "Tư vấn kỹ thuật miễn phí",
      "description": "Đội ngũ kỹ sư hỗ trợ tư vấn lựa chọn độ dày băng keo tối ưu phù hợp áp suất thiết kế."
    },
    {
      "title": "Mẫu thử miễn phí",
      "description": "Sẵn sàng gửi mẫu thử trực tiếp tới công trường để test độ bám dính trước khi mua số lượng lớn."
    },
    {
      "title": "Giao hàng nhanh 24h",
      "description": "Tổng kho Hà Nam luôn sẵn lượng hàng dồi dào, đảm bảo không trễ tiến độ nhà thầu."
    }
  ]
}
```

---

## 8. Hub Ha Nam Logistics Data

```json
{
  "heading": "Hub Hà Nam — Trung tâm sản xuất & Phân phối",
  "description": "Tọa lạc tại vị trí chiến lược, Hub Hà Nam là nơi sản xuất, cung ứng các sản phẩm của ULink Industries, đảm bảo nguồn hàng dồi dào, đóng gói chuyên nghiệp và tiến độ phân phối hỏa tốc.",
  "stats": [
    { "value": "10.000 m²", "label": "Diện tích kho hiện đại" },
    { "value": "24-48h", "label": "Thời gian giao hàng toàn quốc" },
    { "value": "WMS", "label": "Hệ thống quản lý kho hiện đại" },
    { "value": "1000+ SKU", "label": "Bảo quản chuẩn phòng sạch" }
  ],
  "metrics": [
    { "label": "Tỷ lệ tiêu thụ", "icon": "pie-chart" },
    { "label": "Tối ưu chi phí", "icon": "currency-dollar" },
    { "label": "Chất lượng", "rating": "4.5/5" },
    { "label": "12k lượt Like", "icon": "thumbs-up" }
  ]
}
```

---

## 9. Practical Use Cases Data (3 Case Studies)

```json
[
  {
    "id": "usecase-1",
    "tag": "Tòa nhà thương mại",
    "title": "Hệ thống HVAC tòa nhà văn phòng cao cấp",
    "description": "Ứng dụng băng dính nhôm lưới gia cường bọc cách nhiệt hệ chiller, đảm bảo tuổi thọ đường ống trên 15 năm mà không bong tróc."
  },
  {
    "id": "usecase-2",
    "tag": "Khu công nghiệp",
    "title": "Nhà máy sản xuất điện tử FDI quy mô lớn tại Việt Nam",
    "description": "Cung ứng đồng bộ băng keo nhôm FSK ngăn ẩm tuyệt đối cho hệ thống ống cấp gió sạch phòng máy, vượt qua các đợt kiểm tra chất lượng FDI nghiêm ngặt."
  },
  {
    "id": "usecase-3",
    "tag": "Bệnh viện & Lab",
    "title": "Bệnh viện quốc tế & Phòng sạch vô trùng",
    "description": "Bịt kín ống thông gió phòng mổ áp lực âm bằng băng keo nhôm chuẩn chống khuẩn RoHS, tuyệt đối không tạo bụi bẩn, không mùi dung môi hữu cơ."
  }
]
```

---

## 10. Certifications & Standards Data

```json
{
  "caption": "TIÊU CHUẨN KỸ THUẬT",
  "heading": "Sản phẩm kiểm định chất lượng quốc tế",
  "description": "ULINK tự hào cung cấp các sản phẩm băng keo nhôm đạt đầy đủ chứng nhận chất lượng cho thị trường Việt Nam và xuất khẩu.",
  "certifications": [
    {
      "title": "ISO 9001:2015",
      "description": "Hệ thống quản lý chất lượng đồng bộ, kiểm soát nghiêm ngặt từ hạt keo đến màng nhôm đầu vào."
    },
    {
      "title": "UL 723 Standards",
      "description": "Kiểm nghiệm an toàn phòng cháy chữa cháy cực kỳ khắt khe của UL Hoa Kỳ đối với vật liệu cơ điện."
    },
    {
      "title": "SMACNA Compliant",
      "description": "Đạt tiêu chuẩn thi công chế tạo ống gió công nghiệp của hiệp hội cơ điện Hoa Kỳ, Việt Nam."
    },
    {
      "title": "SGS Tested (RoHS)",
      "description": "Chứng nhận an toàn sinh học, không chứa chất độc hại gây ảnh hưởng chất lượng không khí."
    }
  ]
}
```

---

## 11. Partners Section Data

```json
{
  "heading": "Khách hàng tin dùng trong ngành Cơ Điện - HVAC",
  "partners": [
    "REECONS",
    "SIGMA M&E",
    "HAIDEE",
    "ALIGEE",
    "KURIHARA"
  ]
}
```

---

## 12. Distributor Partnership Program Data

```json
{
  "caption": "CHƯƠNG TRÌNH ĐỐI TÁC",
  "heading": "Trở thành nhà phân phối sản phẩm Băng Keo Nhôm ULINK",
  "description": "Tham gia mạng lưới phân phối ULINK để mở rộng danh mục sản phẩm và gia tăng doanh thu với sản phẩm băng keo nhôm chất lượng cao cho ngành HVAC.",
  "benefits": [
    {
      "title": "Chiết khấu hấp dẫn",
      "description": "Chính sách giá ưu đãi dành riêng cho nhà phân phối với chiết khấu theo sản lượng."
    },
    {
      "title": "Hỗ trợ Marketing",
      "description": "Cung cấp tài liệu kỹ thuật, catalogue, mẫu thử và hỗ trợ trưng bày sản phẩm."
    },
    {
      "title": "Đào tạo kỹ thuật",
      "description": "Chương trình đào tạo chuyên sâu về sản phẩm và ứng dụng băng keo nhôm trong HVAC."
    },
    {
      "title": "Bảo vệ vùng bán",
      "description": "Chính sách bảo vệ khu vực kinh doanh, tránh cạnh tranh nội bộ."
    }
  ],
  "cta": {
    "primary": "Đăng ký ngay",
    "secondary": "Tìm hiểu thêm"
  }
}
```

---

## 13. CTA Section Data

```json
{
  "heading": "Sẵn sàng tối ưu hóa hệ thống HVAC của bạn?",
  "description": "Đội ngũ kỹ sư hỗ trợ kỹ thuật của ULINK Industries luôn sẵn sàng đồng hành từ khâu gửi mẫu thử, tư vấn thiết kế tiêu chuẩn cho tới bàn giao cung ứng hỏa tốc tại công trường của Quý khách.",
  "cta": {
    "primary": "Liên hệ tư vấn",
    "secondary": "Yêu cầu báo giá"
  }
}
```

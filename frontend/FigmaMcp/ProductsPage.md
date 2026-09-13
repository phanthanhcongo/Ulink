# Products Page Figma Data & Component Mapping

**Source Figma Node**: `663-204` (`Trang Sản phẩm`)  
**Design Dimensions**: 1440px × 9699px  
**Primary Colors**: `#1769E2` (Primary Blue), `#21272A` / `#14181F` (Dark Text), `#F5F7FA` / `#F2F4F8` (Light Grey Bg)

---

## 1. Announcement Bar Data

```json
{
  "text": "Sự kiện B2B Business Matching tại Khách sạn Melina, Hà Nội. Kết nối trực tiếp với các đối tác Doanh nghiệp tiềm năng.",
  "actionText": "Đăng ký ngay",
  "actionLink": "/events/register"
}
```

---

## 2. Hero Section Data

```json
{
  "title": "Giải pháp Phòng sạch &\nBao bì Đóng gói tiêu chuẩn cao",
  "subtitle": "Cung cấp hệ thống phòng sạch đạt chuẩn ISO và giải pháp bao bì đóng gói chuyên nghiệp, đáp ứng yêu cầu khắt khe của ngành Dược phẩm, Thực phẩm, Điện tử và Công nghệ cao.",
  "ctaPrimary": {
    "text": "Báo giá nhanh",
    "link": "/quick-rfq"
  },
  "backgroundImage": "54263bbbb847046b46caf4ebb4a04bac67528401"
}
```

---

## 3. Featured Categories Section Data

```json
{
  "sectionLabel": "I Phòng sạch và Bao bì công nghiệp",
  "heading": "Hơn 1.000+ SKU vật tư sản xuất – Đầy đủ, sẵn sàng cung ứng",
  "description": "Cung cấp đầy đủ từ dụng cụ cắt gọt, vật liệu hàn, đến bảo hộ lao động — đáp ứng mọi nhu cầu sản xuất của doanh nghiệp.",
  "categories": [
    {
      "id": "cat-1",
      "name": "Băng Keo Công Nghiệp",
      "image": "77d913a1cd33a800c8ce8488058a41b594246eb1",
      "subCategories": ["Băng keo nhôm", "Băng keo sợi thủy tinh", "Băng keo chống thấm"],
      "actionText": "Xem tất cả",
      "actionLink": "/solutions/bang-keo-cong-nghiep"
    },
    {
      "id": "cat-2",
      "name": "Vật Tư Phòng Sạch",
      "image": "7548259a0b6eb5111da347ca46d56193deb34f94",
      "subCategories": ["Găng tay Nitrile", "Khăn lau phòng sạch", "Quần áo, Bảo hộ"],
      "actionText": "Xem tất cả",
      "actionLink": "/solutions/vat-tu-phong-sach"
    },
    {
      "id": "cat-3",
      "name": "Bao Bì & Đóng Gói",
      "image": "3ff4a9eb954cecfad34507ecaa2826cc2af445fc",
      "subCategories": ["Màng co nhiệt PE", "Màng stretch pallet", "Túi zipper , LDPE"],
      "actionText": "Xem tất cả",
      "actionLink": "/solutions/bao-bi-dong-goi"
    }
  ]
}
```

---

## 4. Smart Product Search Section Data

```json
{
  "sectionTitle": "VẬT TƯ CÔNG NGHIỆP",
  "title": "Tìm kiếm vật tư công nghiệp",
  "description": "Cung cấp đầy đủ vật tư, thiết bị và linh kiện công nghiệp chất lượng cao, đáp ứng mọi nhu cầu sản xuất của doanh nghiệp.",
  "placeholder": "Nhập tên sản phẩm, mã SKU hoặc từ khóa...",
  "buttonText": "Tìm kiếm",
  "filterChips": [
    { "id": "chip-1", "label": "Màng co PE", "active": true },
    { "id": "chip-2", "label": "Găng tay Nitrile", "active": false },
    { "id": "chip-3", "label": "Thảm phòng sạch", "active": false },
    { "id": "chip-4", "label": "Khăn lau", "active": false },
    { "id": "chip-5", "label": "Túi PE", "active": false }
  ]
}
```

---

## 5. Product Grid & Catalog Data

```json
[
  {
    "id": "p1",
    "category": "Bao bì & Đóng gói",
    "name": "Màng quấn Pallet - Đóng kiện hàng.",
    "priceRange": "39.500đ - 43.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p2",
    "category": "Bao bì & Đóng gói",
    "name": "Màng co PE - Shrink Film Block Chai",
    "priceRange": "50.000đ - 55.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p3",
    "category": "Bao bì & Đóng gói",
    "name": "Túi PE - Nhiều kích thước",
    "priceRange": "35.000đ - 39.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p4",
    "category": "Bao bì & Đóng gói",
    "name": "Túi Ziper - Nhiều kích thước",
    "priceRange": "59.500đ - 65.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p5",
    "category": "Băng Keo Công Nghiệp",
    "name": "Băng Keo Nhôm - HVAC",
    "priceRange": "39.500đ - 43.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  }
]
```

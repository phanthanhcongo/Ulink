# FoodSolution Page Figma Data & Component Mapping

**Source Figma Node**: `1119-10523` (`thuc-pham-do-uong-detail-page`)  
**Design Dimensions**: 1440px × 8989px  
**Primary Colors**: `#1769E2` (Primary Blue), `#1D2A49` (Heading Navy), `#F2F4F8` (Light Grey Bg)

---

## 1. Feature Highlights Data

```json
[
  {
    "id": "feature-1",
    "title": "Sản xuất theo yêu cầu",
    "description": "Thiết kế và sản xuất bao bì, đóng gói theo đúng quy cách và số lượng khách hàng.",
    "icon": "settings-services"
  },
  {
    "id": "feature-2",
    "title": "Chất lượng ổn định",
    "description": "Quy trình kiểm soát chất lượng nghiêm ngặt, đảm bảo mỗi lô hàng bao bì đều đồng nhất",
    "icon": "task-approved"
  },
  {
    "id": "feature-3",
    "title": "Giá cả cạnh tranh",
    "description": "Tối ưu chi phí sản xuất bao bì và đóng gói nhờ quy mô nhà máy hiện đại",
    "icon": "tag"
  },
  {
    "id": "feature-4",
    "title": "Giao hàng nhanh",
    "description": "Cam kết giao bao bì và vật tư đóng gói đúng tiến độ, hỗ trợ vận chuyển toàn quốc",
    "icon": "delivery-truck"
  }
]
```

---

## 2. Overview Section Data

```json
{
  "caption": "TỔNG QUAN GIẢI PHÁP",
  "heading": "Giải pháp Toàn diện cho Chuỗi Sản xuất F&B",
  "paragraphs": [
    "Trong ngành chế biến Thực phẩm và Đồ uống (F&B), việc duy trì và tuân thủ các quy định khắt khe về an toàn thực phẩm như HACCP và ISO 22000 là yếu tố sống còn quyết định sự uy tín thương hiệu. Mọi quy trình từ chuẩn bị nguyên liệu, chế biến, chiết rót đến đóng gói đều yêu cầu các tiêu chuẩn cơ lý và vệ sinh ở mức tối đa.",
    "Các hệ thống thiết bị và giải pháp công nghiệp của ULink được tối ưu hóa nhằm đáp ứng tốt các yêu cầu về tẩy rửa liên tục (CIP/COP), chống bám bẩn vi sinh, kiểm soát nhiệt độ nghiêm ngặt và tự động hóa truy xuất nguồn gốc. Chúng tôi đồng hành cùng các nhà máy F&B nâng cao công suất, triệt tiêu hao hụt và nâng tầm chất lượng thành phẩm."
  ],
  "sidebar": {
    "title": "Vì sao chọn ULINK?",
    "advantages": [
      {
        "title": "Cam kết chất lượng vượt trội",
        "description": "Sản phẩm được kiểm định nghiêm ngặt qua từng công đoạn, đảm bảo độ chính xác cao và hiệu suất ổn định.",
        "icon": "shield-check"
      },
      {
        "title": "Tích hợp tự động hóa cao",
        "description": "Đồng bộ hóa dữ liệu thời gian thực, quản lý và truy xuất chính xác từng lô hàng.",
        "icon": "cpu"
      },
      {
        "title": "Cung ứng liên tục 24/7",
        "description": "Tổng kho Hà Nam trữ lượng dồi dào, đảm bảo không gián đoạn dây chuyền.",
        "icon": "truck"
      }
    ],
    "hotline": {
      "label": "Liên hệ chuyên gia tư vấn",
      "phone": "0247 309 9899",
      "buttonText": "Gọi ngay"
    }
  }
}
```

---

## 3. Product Catalog Grid Data (8 Products)

```json
[
  {
    "id": "p1",
    "name": "Màng quấn Pallet - Đóng kiện hàng.",
    "priceRange": "39.500đ - 43.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p2",
    "name": "Màng co PE - Shrink Film Block Chai",
    "priceRange": "50.000đ - 55.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p3",
    "name": "Túi PE - Nhiều kích thước",
    "priceRange": "35.000đ - 39.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p4",
    "name": "Túi Ziper - Nhiều kích thước",
    "priceRange": "59.500đ - 65.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p5",
    "name": "Màng co POF - Shrink film cup",
    "priceRange": "55.500đ - 60.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p6",
    "name": "Băng keo - Đóng kiện hàng.",
    "priceRange": "16.500đ - 29.000đ",
    "unit": "/per cuộn",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p7",
    "name": "Túi - Đóng kiện hàng.",
    "priceRange": "39.500đ - 43.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  },
  {
    "id": "p8",
    "name": "Màng quấn Pallet - Đóng kiện hàng.",
    "priceRange": "39.500đ - 43.000đ",
    "unit": "/per kg",
    "moq": "500 kg",
    "customization": "Sản xuất theo yêu cầu",
    "location": "Hub Hà Nam, Việt Nam"
  }
]
```

---

## 4. Product Technical Specifications Data

```json
[
  {
    "title": "Độ dày & Tỷ lệ co",
    "detail": "Độ dày từ 25–80 micron, độ co ngang (TD) 40–75%, độ co dọc (MD) 5–15%, đảm bảo bó chặt đều và ổn định cho block chai, hộp.",
    "icon": "32/temperature"
  },
  {
    "title": "Độ bền cơ lý",
    "detail": "Độ bền kéo đứt ≥ 15 MPa, độ giãn dài đứt ≥ 300%, chịu lực xuyên thủng tốt, bảo vệ sản phẩm trong suốt quá trình vận chuyển và lưu kho.",
    "icon": "32/security"
  },
  {
    "title": "Thông số nhiệt",
    "detail": "Nhiệt độ co tối ưu 130–180°C, thời gian co nhanh 2–5 giây, tương thích với các hệ thống đóng gói tự động tốc độ cao.",
    "icon": "32/lightning"
  },
  {
    "title": "Tiêu chuẩn vật liệu",
    "detail": "Vật liệu 100% PE nguyên sinh, đạt tiêu chuẩn an toàn thực phẩm, có thể tái chế hoàn toàn, thân thiện với môi trường.",
    "icon": "32/recycle"
  }
]
```

---

## 5. Use Cases Data

```json
[
  {
    "id": "uc-1",
    "tag": "Chế biến thực phẩm",
    "tagBg": "#DBEAFE",
    "tagTextColor": "#1769E2",
    "title": "Nhà máy chế biến thực phẩm đông lạnh xuất khẩu",
    "description": "Cung cấp toàn bộ giải pháp vệ sinh công nghiệp, bao bì tiệt trùng và vật tư phòng sạch cho dây chuyền chế biến thực phẩm đông lạnh đạt chuẩn HACCP & BRC."
  },
  {
    "id": "uc-2",
    "tag": "Đóng gói & Bảo quản",
    "tagBg": "#DCFCE7",
    "tagTextColor": "#16A34A",
    "title": "Dây chuyền đóng gói sữa và nước giải khát",
    "description": "Giải pháp bao bì vô trùng, màng co nhiệt và hệ thống chiết rót khép kín đảm bảo an toàn thực phẩm cho sản phẩm sữa tươi và nước giải khát."
  },
  {
    "id": "uc-3",
    "tag": "Kiểm nghiệm & QC",
    "tagBg": "#FEF9C3",
    "tagTextColor": "#CA8A04",
    "title": "Phòng lab kiểm tra an toàn vệ sinh thực phẩm",
    "description": "Cung cấp kit test nhanh, dụng cụ lấy mẫu vô trùng và thiết bị bảo hộ cho phòng lab kiểm nghiệm vi sinh, hóa lý thực phẩm."
  }
]
```

---

## 6. Partners & Footer CTA Data

```json
{
  "partnersTitle": "Hơn 300 doanh nghiệp F&B và FDI tin dùng giải pháp của ULINK Industries",
  "logos": ["Coca Cola", "Vinamilk", "TH True Milk", "Vinasoy", "Nutifood", "Sữa Ba Vì"],
  "ctaSection": {
    "heading": "Giải pháp đóng gói thực phẩm toàn diện",
    "description": "Từ bao bì dạng túi, hộp, khay, đến chai lọ và lon — ULINK Industries cung cấp hệ thống đóng gói trọn bộ cho các sản phẩm thực phẩm: thực phẩm khô, đông lạnh, chế biến sẵn, đồ uống, gia vị và nông sản. Đội ngũ kỹ sư của chúng tôi tư vấn giải pháp phù hợp nhất với từng loại bao bì và quy trình sản xuất của bạn.",
    "primaryCta": "Nhận Khảo Sát & Báo Giá Miễn Phí",
    "secondaryCta": "Trò Chuyện Với Kỹ Sư F&B"
  }
}
```

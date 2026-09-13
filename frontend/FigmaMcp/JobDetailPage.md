# Job Detail Page Figma Data & Component Mapping

**Source Figma Node**: `1464-2389` (`Trang tuyển dụng_chi tiết`)  
**Design Dimensions**: 1440px width × 5253px height  
**Primary Colors**: `#1769E2` (Primary Blue), `#162233` / `#0E1116` / `#212529` (Heading Dark Navy), `#617084` / `#495057` (Body Muted), `#023DA0` (Primary Accent Button)

---

## 1. Breadcrumb & Job Header Data

```json
{
  "breadcrumb": [
    { "label": "Trang chủ", "url": "/" },
    { "label": "Vị trí tuyển dụng", "url": "/about/careers" },
    { "label": "Kinh doanh", "url": "/about/careers?dept=kinh-doanh" },
    { "label": "Chuyên viên Phát triển KDKD B2B", "active": true }
  ],
  "jobHeader": {
    "companyLogoGradient": "linear-gradient(49deg, #1769E2 0%, #0089FF 100%)",
    "title": "Chuyên viên Phát triển Kinh doanh B2B — Khu Công nghiệp",
    "metaChips": [
      { "type": "location", "label": "Hà Nội, VN · Tại văn phòng" },
      { "type": "jobType", "label": "Toàn thời gian" },
      { "type": "experience", "label": "2–5 năm" },
      { "type": "postedTime", "label": "Đăng 3 ngày trước" }
    ],
    "actions": {
      "saveJob": true,
      "applyButtonText": "Ứng tuyển ngay"
    }
  }
}
```

---

## 2. Job Overview Key Stats Data (4 Cards)

```json
[
  {
    "id": "salary",
    "label": "LƯƠNG",
    "value": "15 – 25M VND",
    "subtext": "Thương lượng + thưởng KPI",
    "icon": "wallet"
  },
  {
    "id": "location",
    "label": "ĐỊA ĐIỂM",
    "value": "Hà Nội",
    "subtext": "Trụ sở ULink Industries",
    "icon": "location"
  },
  {
    "id": "experience",
    "label": "KINH NGHIỆM",
    "value": "2–5 năm",
    "subtext": "Cấp chuyên viên",
    "icon": "briefcase"
  },
  {
    "id": "deadline",
    "label": "HẠN NỘP",
    "value": "54 ngày",
    "subtext": "30/09/2026",
    "icon": "clock"
  }
]
```

---

## 3. Job Description Content (Left Column Main Details)

```json
{
  "sections": [
    {
      "id": "job-description",
      "title": "Mô tả công việc",
      "paragraphs": [
        "ULink Industries đang tìm kiếm một Chuyên viên Phát triển Kinh doanh B2B để mở rộng mạng lưới khách hàng doanh nghiệp tại các Cụm/Khu công nghiệp trên toàn quốc. Bạn sẽ là cầu nối giữa doanh nghiệp sản xuất và hệ sinh thái dịch vụ công nghiệp của ULink.",
        "Đây là vị trí thực chiến, báo cáo trực tiếp cho Trưởng phòng Kinh doanh. Bạn sẽ phụ trách 2–3 khu vực trọng điểm và phát triển danh mục khách hàng trong vòng 12 tháng đầu."
      ],
      "responsibilities": [
        "Tìm kiếm và phát triển khách hàng doanh nghiệp mới. Tiếp cận các doanh nghiệp sản xuất, nhà đầu tư hạ tầng KCN và đơn vị cung ứng dịch vụ công nghiệp thông qua nền tảng ULink và các kênh trực tiếp.",
        "Tư vấn giải pháp kết nối chuỗi cung ứng. Phân tích nhu cầu khách hàng, đề xuất gói dịch vụ phù hợp và phối hợp với đội ngũ kỹ thuật để triển khai giải pháp.",
        "Quản lý pipeline bán hàng và báo cáo hiệu suất. Duy trì CRM, theo dõi tiến trình deal và báo cáo hàng tuần cho trưởng phòng kinh doanh.",
        "Xây dựng quan hệ đối tác chiến lược. Phát triển mối quan hệ lâu dài với Ban quản lý KCN, hiệp hội ngành nghề và các đối tác logistics.",
        "Tham gia các sự kiện ngành và hội chợ công nghiệp. Đại diện ULink tại các triển lãm, hội thảo chuyên ngành để mở rộng mạng lưới và nhận diện thương hiệu.",
        "Đóng góp cải tiến sản phẩm nền tảng. Phản hồi insight từ khách hàng cho đội Product để nâng cấp trải nghiệm người dùng trên ULink."
      ]
    },
    {
      "id": "job-requirements",
      "title": "Yêu cầu",
      "intro": "Chúng tôi tìm người có tư duy kinh doanh thực chiến, hiểu ngành công nghiệp và sẵn sàng xây dựng thị trường từ giai đoạn đầu. Nếu bạn từng bán giải pháp B2B cho khách hàng doanh nghiệp và tự tin thuyết trình trước C-level, chúng tôi muốn gặp bạn.",
      "requirements": [
        "2–5 năm kinh nghiệm phát triển kinh doanh B2B. Ưu tiên có nền tảng trong lĩnh vực sản xuất, logistics, bất động sản công nghiệp hoặc SaaS doanh nghiệp.",
        "Kỹ năng đàm phán và thuyết trình xuất sắc. Có thể trình bày giải pháp rõ ràng, thuyết phục trước ban lãnh đạo doanh nghiệp.",
        "Tư duy phân tích và định hướng dữ liệu. Quen thuộc với CRM (HubSpot, Salesforce) và biết đọc số liệu kinh doanh để ra quyết định.",
        "Sẵn sàng di chuyển và làm việc thực địa. Vị trí yêu cầu đi thực tế các KCN/CCN tại miền Bắc 30–40% thời gian.",
        "Tiếng Anh giao tiếp tốt. Khả năng làm việc với đối tác quốc tế và đọc hiểu tài liệu kỹ thuật tiếng Anh."
      ],
      "preferredTagsTitle": "ƯU TIÊN NẾU CÓ",
      "preferredTags": [
        "Kinh nghiệm ngành KCN/BĐS CN",
        "Mạng lưới doanh nghiệp sản xuất",
        "Hiểu biết về chuỗi cung ứng",
        "Kinh nghiệm startup/scale-up"
      ]
    },
    {
      "id": "job-benefits",
      "title": "Quyền lợi",
      "benefitsList": [
        {
          "title": "Lương cạnh tranh + thưởng doanh số hàng quý.",
          "description": "Thương lượng theo năng lực. Đánh giá tăng lương hai lần/năm."
        },
        {
          "title": "Bảo hiểm sức khỏe toàn diện.",
          "description": "Gói bảo hiểm PVI cho bản thân và người thân, áp dụng ngay khi nhận việc."
        },
        {
          "title": "Ngân sách phát triển chuyên môn 15M VND/năm.",
          "description": "Khóa học, chứng chỉ ngành, hội thảo và networking events."
        },
        {
          "title": "Chế độ công tác linh hoạt.",
          "description": "Hỗ trợ chi phí di chuyển, ăn ở khi đi thực địa KCN. Xe công ty cho chuyến dài ngày."
        },
        {
          "title": "Lương tháng 13 + thưởng hiệu suất.",
          "description": "Thưởng Tết, thưởng hoàn thành mục tiêu quý và cơ hội ESOP cho nhân viên gắn bó."
        },
        {
          "title": "Môi trường làm việc năng động, startup mindset.",
          "description": "Đội ngũ trẻ, văn hóa phẳng, cơ hội thăng tiến nhanh trong tổ chức đang mở rộng."
        }
      ]
    },
    {
      "id": "location-time",
      "title": "Địa điểm & thời gian làm việc",
      "officeAddress": {
        "title": "Tòa nhà ULink Center",
        "detail": "Khu công nghiệp Quang Minh, Mê Linh, Hà Nội"
      },
      "workHours": {
        "title": "Thứ 2 – Thứ 6, 08:00 – 17:30",
        "detail": "Đi thực địa KCN theo lịch dự án, có hỗ trợ chi phí công tác."
      }
    },
    {
      "id": "recruitment-process",
      "title": "Quy trình tuyển dụng",
      "subtitle": "~ 2 TUẦN TỔNG THỜI GIAN",
      "steps": [
        { "step": "01", "title": "Sàng lọc hồ sơ", "description": "Phản hồi trong vòng 3 ngày làm việc." },
        { "step": "02", "title": "Phỏng vấn sơ bộ với Trưởng phòng KD", "description": "Trao đổi online 30 phút." },
        { "step": "03", "title": "Bài tập tình huống kinh doanh", "description": "Case study thực tế, hoàn thành trong 3 giờ." },
        { "step": "04", "title": "Phỏng vấn trực tiếp tại văn phòng", "description": "2 vòng trao đổi trong cùng ngày tại Hà Nội." },
        { "step": "05", "title": "Đề nghị mức lương", "description": "Trong vòng 3 ngày làm việc sau vòng cuối." }
      ],
      "contactCta": {
        "title": "Có câu hỏi trước khi ứng tuyển?",
        "description": "Gửi email đến careers@ulinkindustries.com — đội tuyển dụng sẽ phản hồi trong vòng 2 ngày làm việc.",
        "email": "careers@ulinkindustries.com"
      }
    }
  ]
}
```

---

## 4. Right Sidebar Data

```json
{
  "generalInfoCard": {
    "title": "Thông tin chung",
    "items": [
      { "label": "Cấp bậc", "value": "Chuyên viên", "icon": "user-rank" },
      { "label": "Số lượng tuyển", "value": "2 người", "icon": "users" },
      { "label": "Hình thức làm việc", "value": "Toàn thời gian", "icon": "briefcase" },
      { "label": "Giới tính", "value": "Không yêu cầu", "icon": "gender" },
      { "label": "Hạn nộp hồ sơ", "value": "30/09/2026", "icon": "clock" }
    ],
    "shareSection": {
      "label": "Chia sẻ:",
      "actions": ["Sao chép link", "LinkedIn", "Facebook", "Twitter"]
    }
  },
  "aboutCompanyCard": {
    "title": "VỀ CÔNG TY",
    "companyName": "Công ty TNHH ULink Industries",
    "subtitle": "Nhà sản xuất & cung ứng vật tư",
    "details": [
      { "label": "SỐ LƯỢNG", "value": "50–100 nhân viên" },
      { "label": "THÀNH LẬP", "value": "2020" },
      { "label": "LĨNH VỰC", "value": "Công nghệ công nghiệp" },
      { "label": "VĂN PHÒNG", "value": "Hà Nội, TP.HCM" },
      { "label": "WEBSITE", "value": "ulink.vn" }
    ],
    "companyLinkText": "Xem trang công ty →"
  },
  "sidebarSimilarJobsCard": {
    "title": "VỊ TRÍ TƯƠNG TỰ",
    "jobs": [
      { "title": "Trưởng nhóm Kinh doanh KCN", "location": "Hà Nội", "type": "Toàn thời gian", "experience": "5+ năm", "salary": "25 - 35 triệu" },
      { "title": "Chuyên viên Marketing Công nghiệp", "location": "Hà Nội", "type": "Toàn thời gian", "experience": "2+ năm", "salary": "15 - 20 triệu" },
      { "title": "Chuyên viên Hỗ trợ Khách hàng DN", "location": "Hà Nội", "type": "Toàn thời gian", "experience": "1+ năm", "salary": "12 - 16 triệu" }
    ]
  }
}
```

---

## 5. Bottom Section: Similar Open Positions Data

```json
{
  "sectionHeader": {
    "eyebrow": "KHÁM PHÁ THÊM TỪ ULink Industries",
    "title": "Các vị trí Kinh doanh khác đang tuyển",
    "viewAllText": "Xem tất cả vị trí →"
  },
  "rolesList": [
    {
      "id": "role-1",
      "title": "Trưởng nhóm Kinh doanh KCN",
      "department": "Kinh doanh",
      "experience": "3–5 năm",
      "type": "Toàn thời gian",
      "salary": "25 – 35M VND",
      "location": "Hà Nội"
    },
    {
      "id": "role-2",
      "title": "Chuyên viên Marketing Công nghiệp",
      "department": "Marketing",
      "experience": "2–4 năm",
      "type": "Toàn thời gian",
      "salary": "15 – 22M VND",
      "location": "Hà Nội"
    },
    {
      "id": "role-3",
      "title": "Chuyên viên Hỗ trợ Khách hàng DN",
      "department": "Customer Support",
      "experience": "1–3 năm",
      "type": "Toàn thời gian",
      "salary": "12 – 16M VND",
      "location": "Hà Nội"
    }
  ]
}
```

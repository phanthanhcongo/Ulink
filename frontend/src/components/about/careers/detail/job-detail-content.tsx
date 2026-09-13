import { CheckCircle2, MapPin, Clock, DollarSign, ShieldCheck, Award, Car, Gift, Users2 } from 'lucide-react';

const jobResponsibilities = [
  "Tìm kiếm và phát triển khách hàng doanh nghiệp mới. Tiếp cận các doanh nghiệp sản xuất, nhà đầu tư hạ tầng KCN và đơn vị cung ứng dịch vụ công nghiệp thông qua nền tảng ULink và các kênh trực tiếp.",
  "Tư vấn giải pháp kết nối chuỗi cung ứng. Phân tích nhu cầu khách hàng, đề xuất gói dịch vụ phù hợp và phối hợp với đội ngũ kỹ thuật để triển khai giải pháp.",
  "Quản lý pipeline bán hàng và báo cáo hiệu suất. Duy trì CRM, theo dõi tiến trình deal và báo cáo hàng tuần cho trưởng phòng kinh doanh.",
  "Xây dựng quan hệ đối tác chiến lược. Phát triển mối quan hệ lâu dài với Ban quản lý KCN, hiệp hội ngành nghề và các đối tác logistics.",
  "Tham gia các sự kiện ngành và hội chợ công nghiệp. Đại diện ULink tại các triển lãm, hội thảo chuyên ngành để mở rộng mạng lưới và nhận diện thương hiệu.",
  "Đóng góp cải tiến sản phẩm nền tảng. Phản hồi insight từ khách hàng cho đội Product để nâng cấp trải nghiệm người dùng trên ULink."
];

const jobRequirements = [
  "2–5 năm kinh nghiệm phát triển kinh doanh B2B. Ưu tiên có nền tảng trong lĩnh vực sản xuất, logistics, bất động sản công nghiệp hoặc SaaS doanh nghiệp.",
  "Kỹ năng đàm phán và thuyết trình xuất sắc. Có thể trình bày giải pháp rõ ràng, thuyết phục trước ban lãnh đạo doanh nghiệp.",
  "Tư duy phân tích và định hướng dữ liệu. Quen thuộc với CRM (HubSpot, Salesforce) và biết đọc số liệu kinh doanh để ra quyết định.",
  "Sẵn sàng di chuyển và làm việc thực địa. Vị trí yêu cầu đi thực tế các KCN/CCN tại miền Bắc 30–40% thời gian.",
  "Tiếng Anh giao tiếp tốt. Khả năng làm việc với đối tác quốc tế và đọc hiểu tài liệu kỹ thuật tiếng Anh."
];

const preferredTags = [
  "Kinh nghiệm ngành KCN/BĐS CN",
  "Mạng lưới doanh nghiệp sản xuất",
  "Hiểu biết về chuỗi cung ứng",
  "Kinh nghiệm startup/scale-up"
];

const jobBenefits = [
  {
    title: "Lương cạnh tranh + thưởng doanh số hàng quý.",
    desc: "Thương lượng theo năng lực. Đánh giá tăng lương hai lần/năm.",
    icon: DollarSign
  },
  {
    title: "Bảo hiểm sức khỏe toàn diện.",
    desc: "Gói bảo hiểm PVI cho bản thân và người thân, áp dụng ngay khi nhận việc.",
    icon: ShieldCheck
  },
  {
    title: "Ngân sách phát triển chuyên môn 15M VND/năm.",
    desc: "Khóa học, chứng chỉ ngành, hội thảo và networking events.",
    icon: Award
  },
  {
    title: "Chế độ công tác linh hoạt.",
    desc: "Hỗ trợ chi phí di chuyển, ăn ở khi đi thực địa KCN. Xe công ty cho chuyến dài ngày.",
    icon: Car
  },
  {
    title: "Lương tháng 13 + thưởng hiệu suất.",
    desc: "Thưởng Tết, thưởng hoàn thành mục tiêu quý và cơ hội ESOP cho nhân viên gắn bó.",
    icon: Gift
  },
  {
    title: "Môi trường làm việc năng động, startup mindset.",
    desc: "Đội ngũ trẻ, văn hóa phẳng, cơ hội thăng tiến nhanh trong tổ chức đang mở rộng.",
    icon: Users2
  }
];

export function JobDetailContent() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 border border-[#DDE3E8] rounded-[2px] bg-white p-4 sm:p-6 lg:p-8 shadow-xs">
      {/* Section 1: Mô tả công việc */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="h-4 w-1 bg-[#1769E2] rounded-full" />
          <h2 className="text-[#162233] font-semibold text-lg lg:text-[20px] leading-[28px]">
            Mô tả công việc
          </h2>
        </div>
        <p className="text-[#162233] font-normal text-base lg:text-[16px] leading-[24px]">
          ULink Industries đang tìm kiếm một Chuyên viên Phát triển Kinh doanh B2B để mở rộng mạng lưới khách hàng doanh nghiệp tại các Cụm/Khu công nghiệp trên toàn quốc. Bạn sẽ là cầu nối giữa doanh nghiệp sản xuất và hệ sinh thái dịch vụ công nghiệp của ULink.
        </p>
        <p className="text-[#162233] font-normal text-base lg:text-[16px] leading-[24px]">
          Đây là vị trí thực chiến, báo cáo trực tiếp cho Trưởng phòng Kinh doanh. Bạn sẽ phụ trách 2–3 khu vực trọng điểm và phát triển danh mục khách hàng trong vòng 12 tháng đầu.
        </p>
        <div className="flex flex-col gap-3 mt-1">
          {jobResponsibilities.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#1769E2] shrink-0 mt-0.5 stroke-[2.25]" />
              <span className="text-[#617084] font-normal text-sm lg:text-[14px] leading-[20px]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Yêu cầu */}
      <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="h-4 w-1 bg-[#1769E2] rounded-full" />
          <h2 className="text-[#162233] font-semibold text-lg lg:text-[20px] leading-[28px]">
            Yêu cầu
          </h2>
        </div>
        <p className="text-[#162233] font-normal text-base lg:text-[16px] leading-[24px]">
          Chúng tôi tìm người có tư duy kinh doanh thực chiến, hiểu ngành công nghiệp và sẵn sàng xây dựng thị trường từ giai đoạn đầu. Nếu bạn từng bán giải pháp B2B cho khách hàng doanh nghiệp và tự tin thuyết trình trước C-level, chúng tôi muốn gặp bạn.
        </p>
        <div className="flex flex-col gap-3 mt-1">
          {jobRequirements.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-[#1769E2] shrink-0 mt-2" />
              <span className="text-[#617084] font-normal text-sm lg:text-[14px] leading-[20px]">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Preferred Tags */}
        <div className="flex flex-col gap-2 mt-3 pt-4 border-t border-slate-100">
          <span className="text-[#617084] font-semibold text-xs lg:text-[12px] uppercase tracking-wider">
            ƯU TIÊN NẾU CÓ
          </span>
          <div className="flex flex-wrap gap-2">
            {preferredTags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-[2px] bg-[#F5F8FC] border border-slate-200/60 px-3 py-1.5 text-[#617084] font-semibold text-xs lg:text-[14px] hover:border-[#1769E2] hover:text-[#1769E2] transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Quyền lợi */}
      <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="h-4 w-1 bg-[#1769E2] rounded-full" />
          <h2 className="text-[#162233] font-semibold text-lg lg:text-[20px] leading-[28px]">
            Quyền lợi
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobBenefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group flex items-start gap-3.5 rounded-[2px] bg-[#F5F8FC]/50 p-4 border border-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-white hover:ring-1 hover:ring-[#1769E2]/30 cursor-pointer"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF8FF] text-[#1769E2] transition-transform duration-200 group-hover:scale-110">
                  <Icon className="h-5 w-5 stroke-[2.25]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[#162233] font-semibold text-sm lg:text-[14px] leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-[#617084] font-normal text-xs lg:text-[14px] leading-relaxed mt-1">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4: Địa điểm & thời gian làm việc */}
      <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="h-4 w-1 bg-[#1769E2] rounded-full" />
          <h2 className="text-[#162233] font-semibold text-lg lg:text-[20px] leading-[28px]">
            Địa điểm & thời gian làm việc
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 p-3.5 rounded-[2px] bg-[#F5F8FC]/60 border border-slate-100">
            <span className="text-[#617084] font-semibold text-xs uppercase tracking-wider">ĐỊA CHỈ VĂN PHÒNG</span>
            <span className="text-[#162233] font-semibold text-sm lg:text-[14px]">Tòa nhà ULink Center</span>
            <span className="text-[#617084] font-normal text-xs lg:text-[14px]">Khu công nghiệp Quang Minh, Mê Linh, Hà Nội</span>
          </div>
          <div className="flex flex-col gap-1 p-3.5 rounded-[2px] bg-[#F5F8FC]/60 border border-slate-100">
            <span className="text-[#617084] font-semibold text-xs uppercase tracking-wider">GIỜ LÀM VIỆC</span>
            <span className="text-[#162233] font-semibold text-sm lg:text-[14px]">Thứ 2 – Thứ 6, 08:00 – 17:30</span>
            <span className="text-[#617084] font-normal text-xs lg:text-[14px]">Đi thực địa KCN theo lịch dự án, có hỗ trợ chi phí công tác.</span>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2px] border border-slate-200 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-[#1769E2] cursor-pointer mt-2">
          <iframe
            title="ULink Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096814184964!2d105.78189631502444!3d21.02881188599839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab868b5001e5%3A0x82f49d32d0f507b9!2zQ8CauIEdp4bqteSwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

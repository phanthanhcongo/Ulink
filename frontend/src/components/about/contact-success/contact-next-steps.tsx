const steps = [
  {
    badge: 'BƯỚC 01',
    title: 'Xác nhận & Phân tích',
    desc: 'Hệ thống CRM chuyển hồ sơ trực tiếp đến kỹ thuật chuyên trách lĩnh vực vật tư của ULink Industries để bóc tách quy cách kỹ thuật.'
  },
  {
    badge: 'BƯỚC 02',
    title: 'Tư vấn & Báo giá chuyên sâu',
    desc: 'Chuyên viên Kinh doanh liên hệ để làm rõ các yêu cầu về tiêu chuẩn sản phẩm, số lượng đơn hàng, lịch trình giao hàng và đề xuất phương án tối ưu.'
  },
  {
    badge: 'BƯỚC 03',
    title: 'Ký kết & Sản xuất - Cung ứng',
    desc: 'Thực hiện hợp đồng cung ứng thông qua HUB Hà Nam, đảm bảo nguồn cung ổn định, liên tục và tối ưu hóa chi phí vận hành.'
  }
];

export function ContactNextSteps() {
  return (
    <section className="w-full bg-white py-12 lg:py-[80px]">
      <div className="page-container max-w-[1280px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-10 lg:mb-[48px]">
          <span className="text-base sm:text-lg lg:text-[20px] font-semibold text-[#1769e2] tracking-[0.5px] uppercase">
            QUY TRÌNH TIẾP THEO
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-[28px] lg:leading-[36px] font-semibold tracking-[-0.3px] text-[#162233]">
            Các bước xử lý yêu cầu của ULink
          </h2>
        </div>

        {/* Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-start gap-4 rounded-[8px] bg-white p-6 border border-[#cad5e2] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1769e2] hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] cursor-pointer"
            >
              <div className="bg-[#1769e2] rounded-[4px] px-3 py-[6px] transition-transform duration-300 group-hover:scale-105">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-[18px] font-semibold text-[#162233] leading-tight group-hover:text-[#1769e2] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base lg:text-[16px] lg:leading-[24px] font-normal text-[#617084]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

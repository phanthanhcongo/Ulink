const steps = [
  {
    badge: 'BƯỚC 01',
    title: 'Xác nhận & Phân tích',
    desc: 'Hệ thống CRM chuyển hồ sơ trực tiếp đến kỹ thuật viên chuyên ngành vật tư của ULink Industries để bóc tách quy cách kỹ thuật.'
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
    <section className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="flex flex-col items-center text-center mb-4 sm:mb-6 lg:mb-10">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 sm:px-3 lg:px-3.5 py-0.5 sm:py-1 text-caption-responsive sm:text-body-regular font-bold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-2">
          QUY TRÌNH TIẾP THEO
        </span>
        <h2 className="text-section-title sm:text-hero-title font-bold tracking-tight text-slate-900">
          Các bước xử lý yêu cầu của ULink
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-[3px] bg-white p-3 sm:p-4 lg:p-6 shadow-sm border border-slate-100 group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
          >
            <span className="inline-flex w-fit items-center rounded-full bg-blue-600 px-2 sm:px-2.5 lg:px-2.5 py-0.5 sm:py-1 text-caption-responsive sm:text-body-regular font-bold uppercase tracking-wider text-white mb-2 sm:mb-3 lg:mb-4 text-xs sm:text-sm">
              {item.badge}
            </span>
            <h3 className="text-body-large sm:text-card-title text-slate-900 mb-1.5 sm:mb-2">{item.title}</h3>
            <p className="text-body-regular leading-relaxed text-slate-600 text-sm sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

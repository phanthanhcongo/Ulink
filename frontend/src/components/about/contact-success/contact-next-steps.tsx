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
    <section className="py-12 px-4 sm:px-8">
      <div className="flex flex-col items-center text-center mb-10">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1 text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-2">
          QUY TRÌNH TIẾP THEO
        </span>
        <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold tracking-tight text-slate-900">
          Các bước xử lý yêu cầu của ULink
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-[3px] bg-white p-6 shadow-sm border border-slate-100 group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
          >
            <span className="inline-flex w-fit items-center rounded-full bg-blue-600 px-2.5 py-1 text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-white mb-4">
              {item.badge}
            </span>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

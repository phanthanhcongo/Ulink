const steps = [
  {
    num: '1',
    title: 'Xác nhận hồ sơ',
    desc: 'Hệ thống tự động gửi email xác nhận đã nhận CV đầy đủ đến email của bạn.'
  },
  {
    num: '2',
    title: 'Đánh giá năng lực',
    desc: 'Chuyên viên tuyển dụng ULink đánh giá kinh nghiệm và độ phù hợp trong 3 ngày làm việc.'
  },
  {
    num: '3',
    title: 'Liên hệ phỏng vấn',
    desc: 'Nếu CV phù hợp, chúng tôi sẽ gọi điện trực tiếp để đặt lịch phỏng vấn chính thức.'
  }
];

export function ApplySuccessSteps() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 max-w-5xl mx-auto px-3 sm:px-4">
      <div className="flex flex-col items-center text-center mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-section-title sm:text-hero-title font-bold tracking-tight text-slate-900">
          Các bước tiếp theo của bạn là gì?
        </h2>
        <p className="mt-1.5 sm:mt-2 lg:mt-3 text-body-regular text-slate-500 text-sm sm:text-base">
          Hành trình gia nhập đại gia đình ULink Industries bắt đầu từ đây
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6 md:grid-cols-3">
        {steps.map((item) => (
          <div
            key={item.num}
            className="flex flex-col rounded-[3px] bg-slate-50 p-3 sm:p-4 lg:p-6 border border-slate-100 shadow-sm transition-all hover:bg-white hover:shadow-md"
          >
            <div className="flex h-7 sm:h-7.5 lg:h-8 w-7 sm:w-7.5 lg:w-8 items-center justify-center rounded-full bg-blue-600 text-body-regular font-bold text-white mb-2 sm:mb-3 lg:mb-4 shadow-sm text-xs sm:text-sm">
              {item.num}
            </div>
            <h3 className="text-body-large sm:text-card-title text-slate-900 mb-1.5 sm:mb-2">{item.title}</h3>
            <p className="text-body-regular leading-relaxed text-slate-600 text-sm sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

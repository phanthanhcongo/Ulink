const steps = [
  {
    num: 1,
    title: 'Xác nhận hồ sơ',
    desc: 'Hệ thống tự động gửi email xác nhận đã nhận CV đầy đủ đến email của bạn hoặc Đội ngũ liên hệ trực tiếp với Bạn.'
  },
  {
    num: 2,
    title: 'Đánh giá năng lực',
    desc: 'Chuyên viên tuyển dụng ULink đánh giá kinh nghiệm và độ phù hợp trong 3 ngày làm việc.'
  },
  {
    num: 3,
    title: 'Liên hệ phỏng vấn',
    desc: 'Nếu CV phù hợp, chúng tôi sẽ gọi điện trực tiếp để đặt lịch phỏng vấn chính thức.'
  }
];

export function ApplySuccessSteps() {
  return (
    <section className="py-6 sm:py-10 max-w-4xl mx-auto px-4">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        <h2 className="text-[#162233] font-bold text-xl sm:text-2xl lg:text-[24px] tracking-tight">
          Các bước tiếp theo của bạn là gì?
        </h2>
        <p className="mt-1.5 text-[#617084] font-normal text-sm sm:text-base lg:text-[15px]">
          Hành trình gia nhập đại gia đình ULink Industries bắt đầu từ đây
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {steps.map((item) => (
          <div
            key={item.num}
            className="group flex flex-col rounded-[2px] bg-[#F5F8FC] p-6 border border-slate-100/80 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-white hover:ring-1 hover:ring-[#1769E2]/30 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1769E2] text-white font-bold text-sm mb-4 shrink-0 transition-transform group-hover:scale-110">
              {item.num}
            </div>
            <h3 className="text-[#162233] font-bold text-base lg:text-[16px] mb-2">{item.title}</h3>
            <p className="text-[#617084] font-normal text-xs lg:text-[13px] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


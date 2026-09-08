const steps = [
  {
    num: '01',
    title: 'Kiểm tra đầu vào',
    desc: 'Kiểm định nghiệm thu chất lượng vật tư ngay khi nhập kho 100% lô hàng.'
  },
  {
    num: '02',
    title: 'Giám sát quy trình',
    desc: 'Kiểm soát điều kiện lưu trữ và bảo quản kho bãi đúng tiêu chuẩn kỹ thuật.'
  },
  {
    num: '03',
    title: 'Kiểm định thành phẩm',
    desc: 'Kiểm tra chất lượng chi tiết trước khi đóng gói và xuất kho giao hàng.'
  },
  {
    num: '04',
    title: 'Đóng gói & Lưu kho',
    desc: 'Đóng gói bảo vệ an toàn chuẩn công nghiệp và lưu trữ chế độ bảo quản nghiêm ngặt.'
  },
  {
    num: '05',
    title: 'Giao hàng & Hậu mãi',
    desc: 'Giao hàng đúng hẹn tận nhà máy và hỗ trợ kỹ thuật xử lý yêu cầu phát sinh 24/7.'
  }
];

export function QualityProcess() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8 rounded-[3px] bg-brand text-white my-4 sm:my-6 lg:my-8 shadow-xl mx-3 sm:mx-4">
      <div className="flex flex-col items-center text-center mb-4 sm:mb-6 lg:mb-10">
        <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 sm:px-3 lg:px-3.5 py-0.5 sm:py-1 text-caption-responsive sm:text-body-regular font-bold uppercase tracking-wider text-white border border-white/20 mb-2">
          QUY TRÌNH VẬN HÀNH
        </span>
        <h2 className="text-section-title sm:text-hero-title font-bold tracking-tight text-white">
          Quy trình Quản lý Chất lượng
        </h2>
        <p className="mt-1.5 sm:mt-2 text-body-regular sm:text-body-large font-medium leading-relaxed text-blue-100 max-w-xl text-sm sm:text-base">
          Quy trình 5 bước khép kín đảm bảo mỗi vật tư công nghiệp cung cấp đến doanh nghiệp đều đạt
          tiêu chuẩn kỹ thuật tối cao.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-[3px] bg-white/10 p-2.5 sm:p-3 lg:p-5 border border-white/15 backdrop-blur transition-all hover:bg-white/15"
          >
            <div className="mb-1.5 sm:mb-2 lg:mb-3 inline-flex h-7 sm:h-7.5 lg:h-8 w-7 sm:w-7.5 lg:w-8 items-center justify-center rounded-[3px] bg-white text-body-regular font-bold text-brand shadow text-xs sm:text-sm">
              {step.num}
            </div>
            <h3 className="text-body-large sm:text-card-title text-white mb-1">{step.title}</h3>
            <p className="text-body-regular leading-relaxed text-blue-100 flex-1 text-xs sm:text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


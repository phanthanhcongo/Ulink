const standardsList = [
  {
    code: 'ISO',
    title: 'ISO 9001:2015',
    sub: 'Quản lý chất lượng',
    desc: 'Quy trình kiểm soát chất lượng vật tư đầu vào và xuất kho tuân thủ chuẩn ISO 9001 nghiêm ngặt.'
  },
  {
    code: 'ISO',
    title: 'ISO 14001:2015',
    sub: 'Quản lý môi trường',
    desc: 'Giảm thiểu tác động môi trường trong vận hành kho bãi, tiết kiệm tài nguyên và bảo vệ môi trường sản xuất.'
  },
  {
    code: 'ISO',
    title: 'ISO 50001:2018',
    sub: 'Quản lý năng lượng',
    desc: 'Tối ưu hóa hiệu suất sử dụng năng lượng vận hành hệ thống kho bãi và dây chuyền đóng gói.'
  },
  {
    code: 'ISO',
    title: 'ISO/IEC 17025',
    sub: 'Phòng thử nghiệm',
    desc: 'Đảm bảo năng lực thử nghiệm và hiệu chuẩn thông số kỹ thuật vật tư đạt tiêu chuẩn phòng lab quốc tế.'
  }
];

export function QualityStandardsGrid() {
  return (
    <section className="py-8 lg:py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1 text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-2">
          ĐẠT CHUẨN QUỐC TẾ
        </span>
        <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold tracking-tight text-slate-900">
          Hệ Thống Tiêu Chuẩn
        </h2>
        <p className="mt-2 text-[15px] sm:text-[16px] lg:text-[18px] font-medium leading-relaxed text-slate-600 max-w-xl">
          ULink cam kết vận hành và tuân thủ các tiêu chuẩn ngành nghiêm ngặt nhất, đảm bảo chất
          lượng vật tư kỹ thuật cho toàn bộ chuỗi cung ứng công nghiệp Việt Nam.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {standardsList.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-[3px] bg-white p-6 shadow-sm border border-slate-100 group transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[3px] bg-slate-900 text-white font-extrabold text-[13px] sm:text-[14px]">
              {item.code}
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900">{item.title}</h3>
            <span className="mt-1 text-[13px] sm:text-[14px] font-semibold text-blue-600">{item.sub}</span>
            <p className="mt-3 text-[13px] sm:text-[14px] leading-relaxed text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

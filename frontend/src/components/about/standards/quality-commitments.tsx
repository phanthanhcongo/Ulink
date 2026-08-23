const metrics = [
  {
    value: '99.7%',
    label: 'Tỷ lệ sản phẩm đạt chuẩn',
    sub: 'Kiểm định nghiêm ngặt trước khi xuất kho'
  },
  {
    value: '< 24h',
    label: 'Thời gian xử lý khiếu nại',
    sub: 'Hỗ trợ kỹ thuật và đổi trả nhanh chóng'
  },
  {
    value: '98.5%',
    label: 'Độ hài lòng khách hàng',
    sub: 'Theo khảo sát thường niên năm 2025'
  },
  {
    value: '97.8%',
    label: 'Tỷ lệ giao hàng đúng hẹn',
    sub: 'Cam kết tiến độ sản xuất cho nhà máy'
  }
];

export function QualityCommitments() {
  return (
    <section className="py-8 lg:py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1 text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-2">
          CAM KẾT DOANH NGHIỆP
        </span>
        <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold tracking-tight text-slate-900">
          Đồng hành cùng sự phát triển của Bạn
        </h2>
      </div>

      <div className="rounded-[3px] bg-white p-8 shadow-sm border border-slate-100">
        <h3 className="text-center text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-800 mb-6">
          Cam kết với Doanh nghiệp
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {metrics.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center pt-4 sm:pt-0 sm:px-4">
              <span className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold text-blue-600">
                {item.value}
              </span>
              <span className="mt-2 text-[15px] sm:text-[16px] lg:text-[18px] font-bold text-slate-900">{item.label}</span>
              <span className="mt-1 text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-[200px]">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

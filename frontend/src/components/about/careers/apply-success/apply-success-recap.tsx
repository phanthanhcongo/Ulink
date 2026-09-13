export function ApplySuccessRecap() {
  return (
    <section className="py-4 sm:py-6 max-w-4xl mx-auto px-4">
      <div className="rounded-[2px] bg-white p-6 sm:p-8 border border-[#CAD5E2] shadow-xs flex flex-col gap-6">
        <h3 className="text-[#162233] font-bold text-base lg:text-[16px] border-b border-slate-100 pb-3">
          Thông tin hồ sơ đã nộp
        </h3>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#1769E2] to-[#0089FF] text-white font-bold text-lg shadow-sm border border-[#BCE0FF]">
            UL
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#1257C0] font-semibold text-xs uppercase tracking-wider">
              VỊ TRÍ ỨNG TUYỂN
            </span>
            <h2 className="text-[#162233] font-semibold text-lg lg:text-[20px] leading-snug">
              Chuyên viên Phát triển Kinh doanh B2B — Khu Công nghiệp
            </h2>
          </div>
        </div>

        {/* 3 Columns Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="flex flex-col gap-1">
            <span className="text-[#617084] font-normal text-xs lg:text-[14px]">Nơi làm việc</span>
            <span className="text-[#162233] font-semibold text-sm lg:text-[16px]">KCN Đồng Văn IV, Hà Nam</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#617084] font-normal text-xs lg:text-[14px]">Mức lương thương lượng</span>
            <span className="text-[#162233] font-semibold text-sm lg:text-[16px]">15 - 25M VND</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#617084] font-normal text-xs lg:text-[14px]">Ngày nộp đơn</span>
            <span className="text-[#162233] font-semibold text-sm lg:text-[16px]">Hôm nay, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}


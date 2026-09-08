export function ApplySuccessRecap() {
  return (
    <section className="py-3 sm:py-4 lg:py-6 max-w-4xl mx-auto px-3 sm:px-4">
      <div className="rounded-[3px] bg-white p-3 sm:p-4 lg:p-6 border border-slate-100 shadow-sm flex flex-col gap-3 sm:gap-4 lg:gap-6">
        <div>
          <span className="block text-caption-responsive font-bold text-slate-400 uppercase tracking-wider mb-2 sm:mb-2.5 lg:mb-3">
            THÔNG TIN HỒ SƠ ĐÃ NỘP
          </span>
          <div className="flex items-start gap-3 sm:gap-3.5 lg:gap-4">
            <div className="flex h-10 sm:h-11 lg:h-12 w-10 sm:w-11 lg:w-12 shrink-0 items-center justify-center rounded-[3px] bg-blue-600 text-white font-bold text-body-large shadow-sm">
              UL
            </div>
            <div>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 sm:px-2.5 py-0.5 text-caption-responsive font-bold text-blue-700 mb-1">
                VỊ TRÍ ỨNG TUYỂN
              </span>
              <h2 className="text-card-title sm:text-section-title font-bold text-slate-900">
                Chuyên viên Phát triển Kinh doanh B2B — Khu Công nghiệp
              </h2>
            </div>
          </div>
        </div>

        {/* 3 Columns Meta */}
        <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:gap-4 sm:grid-cols-3 pt-2 sm:pt-3 lg:pt-4 border-t border-slate-100 text-body-regular">
          <div>
            <span className="block text-slate-400 text-caption-responsive text-xs sm:text-sm">Nơi làm việc</span>
            <span className="font-bold text-slate-800 text-sm sm:text-base">KCN Đồng Văn IV, Hà Nam</span>
          </div>
          <div>
            <span className="block text-slate-400 text-caption-responsive text-xs sm:text-sm">Mức lương thương lượng</span>
            <span className="font-bold text-slate-800 text-sm sm:text-base">15 - 25M VNĐ</span>
          </div>
          <div>
            <span className="block text-slate-400 text-caption-responsive text-xs sm:text-sm">Ngày nộp đơn</span>
            <span className="font-bold text-slate-800 text-sm sm:text-base">Hôm nay, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

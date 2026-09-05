export function ApplySuccessRecap() {
  return (
    <section className="py-6 max-w-4xl mx-auto">
      <div className="rounded-[3px] bg-white p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-6">
        <div>
          <span className="block text-caption-responsive font-bold text-slate-400 uppercase tracking-wider mb-3">
            THÔNG TIN HỒ SƠ ĐÃ NỘP
          </span>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] bg-blue-600 text-white font-extrabold text-body-large shadow-sm">
              UL
            </div>
            <div>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-caption-responsive font-bold text-blue-700 mb-1">
                VỊ TRÍ ỨNG TUYỂN
              </span>
              <h2 className="text-[22px] font-extrabold text-slate-900">
                Chuyên viên Phát triển Kinh doanh B2B — Khu Công nghiệp
              </h2>
            </div>
          </div>
        </div>

        {/* 3 Columns Meta */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-4 border-t border-slate-100 text-body-regular">
          <div>
            <span className="block text-slate-400 text-caption-responsive">Nơi làm việc</span>
            <span className="font-bold text-slate-800">KCN Đồng Văn IV, Hà Nam</span>
          </div>
          <div>
            <span className="block text-slate-400 text-caption-responsive">Mức lương thương lượng</span>
            <span className="font-bold text-slate-800">15 - 25M VNĐ</span>
          </div>
          <div>
            <span className="block text-slate-400 text-caption-responsive">Ngày nộp đơn</span>
            <span className="font-bold text-slate-800">Hôm nay, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

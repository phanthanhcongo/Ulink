export function ApplyHeader() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 border-b border-slate-100">
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-[3px] bg-blue-600 text-white font-bold text-xs sm:text-body-regular shadow-sm">
          UL
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-xs sm:text-caption-responsive font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
          NỘP ĐƠN ỨNG TUYỂN
        </span>
      </div>

      <h1 className="text-xl sm:text-2xl lg:text-hero-title font-bold text-slate-900 tracking-tight mt-2 sm:mt-1">
        Chuyên viên Phát triển Kinh doanh B2B — Khu Công nghiệp
      </h1>

      <p className="mt-2 text-sm sm:text-body-regular text-slate-600 leading-relaxed max-w-3xl">
        Cảm ơn bạn đã quan tâm đến cơ hội nghề nghiệp tại ULink Industries. Vui lòng hoàn thành biểu
        mẫu thông tin dưới đây, Đội ngũ Tuyển dụng sẽ phản hồi hồ sơ của bạn trong vòng 3 ngày làm
        việc.
      </p>
    </section>
  );
}

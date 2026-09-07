import Link from 'next/link';

export function LoginCta() {
  return (
    <section className="w-full bg-white border-t border-b border-slate-100 py-8 sm:py-10">
      <div className="page-container flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        <div className="flex flex-col gap-1.5 text-left">
          <span className="text-caption-responsive font-semibold text-slate-500 uppercase tracking-wider">
            Liên hệ trực tiếp
          </span>
          <h2 className="text-section-title font-bold text-slate-900">
            Kết nối với ULink Industries
          </h2>
          <p className="text-body-regular text-slate-500 max-w-xl">
            Hãy liên hệ với chúng tôi để được tư vấn giải pháp tối ưu cho doanh nghiệp của bạn.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
          <a
            href="tel:19006868"
            className="inline-flex h-11 items-center justify-center rounded-[3px] border border-brand bg-white px-6 text-caption-responsive font-bold text-brand hover:bg-blue-50 transition-all hover:scale-[1.02] active:scale-[0.98] w-1/2 sm:w-auto text-center"
          >
            Gọi ngay
          </a>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-[3px] bg-brand px-7 text-caption-responsive font-bold text-white shadow-sm hover:bg-brand-strong transition-all hover:scale-[1.02] active:scale-[0.98] w-1/2 sm:w-auto text-center"
          >
            Gửi yêu cầu
          </Link>
        </div>
      </div>
    </section>
  );
}



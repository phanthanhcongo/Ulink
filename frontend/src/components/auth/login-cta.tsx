import Link from 'next/link';
import { PhoneCall, Send } from 'lucide-react';

export function LoginCta() {
  return (
    <section className="w-full mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4 my-2">
      <div className="rounded-[5px] bg-white p-8 md:p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">Liên hệ trực tiếp</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Kết nối với ULink Industries
          </h2>
          <p className="text-sm text-slate-500 max-w-xl">
            Hãy liên hệ với chúng tôi để được tư vấn giải pháp tối ưu cho doanh nghiệp của bạn.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href="tel:19006868"
            className="inline-flex items-center gap-2.5 rounded-[5px] border border-brand bg-white px-7 py-3 text-sm font-bold text-brand shadow-sm hover:bg-blue-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PhoneCall className="h-4.5 w-4.5" /> Gọi ngay
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-[5px] bg-brand px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-strong transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="h-4.5 w-4.5" /> Gửi yêu cầu
          </Link>
        </div>
      </div>
    </section>
  );
}


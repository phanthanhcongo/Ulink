import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';

export function ContactSuccessHero() {
  return (
    <section className="py-12 flex flex-col items-center text-center max-w-3xl mx-auto">
      {/* Top Checkmark Badge */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30">
        <Check className="h-8 w-8 stroke-[3]" />
      </div>

      {/* Heading */}
      <h1 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold text-slate-900 tracking-tight">
        Cảm ơn bạn đã liên hệ với ULink!
      </h1>

      {/* Description */}
      <p className="mt-4 text-[15px] sm:text-[16px] lg:text-[18px] font-medium leading-relaxed text-slate-600 max-w-2xl">
        Yêu cầu tư vấn kỹ thuật & báo giá của doanh nghiệp đã được gửi đến hệ thống CRM của ULink
        Industries. Chúng tôi sẽ phân tích kỹ lưỡng nhu cầu vật tư của bạn và phản hồi trong thời
        gian sớm nhất.
      </p>

      {/* Reference Code Box */}
      <div className="mt-8 rounded-[3px] border border-blue-200 bg-white py-4 px-8 shadow-sm text-center w-full max-w-md">
        <span className="block text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          MÃ TIẾP NHẬN YÊU CẦU
        </span>
        <span className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold text-blue-600 tracking-wide">
          #UL-2026-0847
        </span>
      </div>

      {/* Back to Home Button */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-blue-600 px-7 py-3 text-[15px] sm:text-[16px] lg:text-[18px] font-semibold text-white shadow-md hover:bg-blue-700 transition-all hover:shadow-lg"
        >
          <ArrowLeft className="h-4 w-4" /> Quay về Trang chủ
        </Link>
      </div>
    </section>
  );
}

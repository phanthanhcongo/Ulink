import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';

export function ContactSuccessHero() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 flex flex-col items-center text-center max-w-3xl mx-auto px-3 sm:px-4">
      {/* Top Checkmark Badge */}
      <div className="mb-4 sm:mb-5 lg:mb-6 flex h-12 sm:h-14 lg:h-16 w-12 sm:w-14 lg:w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30">
        <Check className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 stroke-[3]" />
      </div>

      {/* Heading */}
      <h1 className="text-section-title sm:text-hero-title font-bold text-slate-900 tracking-tight">
        Cảm ơn bạn đã liên hệ với ULink!
      </h1>

      {/* Description */}
      <p className="mt-2 sm:mt-3 lg:mt-4 text-body-regular sm:text-body-large font-medium leading-relaxed text-slate-600 max-w-2xl text-sm sm:text-base">
        Yêu cầu tư vấn kỹ thuật & báo giá của doanh nghiệp đã được gửi đến hệ thống CRM của ULink
        Industries. Chúng tôi sẽ phân tích kỹ lưỡng nhu cầu vật tư của bạn và phản hồi trong thời
        gian sớm nhất.
      </p>


      {/* Back to Home Button */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-blue-600 px-5 sm:px-6 lg:px-7 py-2 sm:py-2.5 lg:py-3 text-body-regular sm:text-body-large font-semibold text-white shadow-md hover:bg-blue-700 transition-all hover:shadow-lg text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" /> Quay về Trang chủ
        </Link>
      </div>
    </section>
  );
}

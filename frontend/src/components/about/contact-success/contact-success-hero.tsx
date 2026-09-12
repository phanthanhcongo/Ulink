import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';

export function ContactSuccessHero() {
  return (
    <section className="w-full bg-[#f5f5f5] py-12 lg:py-[80px] flex flex-col items-center text-center">
      <div className="page-container flex flex-col items-center text-center max-w-[1280px]">
        {/* Visual Icon Circle */}
        <div className="mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#1769e2]/[0.07] text-[#1769e2] p-6">
          <Check className="h-8 w-8 stroke-[3]" />
        </div>

        {/* Success Message Wrap */}
        <div className="flex flex-col items-center gap-4 max-w-[662px]">
          <h1 className="text-xl sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold tracking-[-0.6px] text-[#162233]">
            Cảm ơn bạn đã liên hệ với ULink!
          </h1>

          <p className="text-base sm:text-lg lg:text-[18px] lg:leading-[28px] font-normal text-[#617084]">
            Yêu cầu tư vấn kỹ thuật &amp; báo giá của doanh nghiệp đã được gửi đến hệ thống CRM của ULink
            Industries. Chúng tôi sẽ phân tích kỹ lưỡng nhu cầu vật tư của bạn và phản hồi trong thời
            gian sớm nhất.
          </p>
        </div>

        {/* Request Reference Box */}
        <div className="mt-8 bg-white border border-[#1769e2] rounded-[8px] py-4 px-8 flex flex-col items-center justify-center gap-2 max-w-[558px] w-full shadow-sm">
          <span className="text-[13px] font-semibold text-[#617084] tracking-[1px] uppercase">
            MÃ TIẾP NHẬN YÊU CẦU
          </span>
          <span className="text-[22px] font-bold text-[#1769e2]">
            #UL-2026-0847
          </span>
        </div>

        {/* Hero Actions Row */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-[#1769e2] px-8 py-4 text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
            Quay về Trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
}

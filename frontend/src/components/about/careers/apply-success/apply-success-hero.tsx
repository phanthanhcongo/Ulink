import Link from 'next/link';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export function ApplySuccessHero() {
  return (
    <section className="py-6 sm:py-10 flex flex-col items-center text-center max-w-3xl mx-auto px-4">
      {/* Top Checkmark Badge */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#DBEAFE] border-4 border-[#BCE0FF] shadow-xs">
        <CheckCircle2 className="h-12 w-12 text-[#1769E2] stroke-[2.25]" />
      </div>

      {/* Title */}
      <h1 className="text-[#162233] font-semibold text-2xl sm:text-3xl lg:text-[28px] leading-snug tracking-tight">
        Nộp đơn ứng tuyển thành công!
      </h1>

      {/* Description */}
      <p className="mt-3 text-[#617084] font-normal text-base lg:text-[16px] leading-[24px] max-w-2xl">
        Cảm ơn bạn đã nộp đơn ứng tuyển tại ULink Industries. Hồ sơ của bạn đã được gửi trực tiếp đến Bộ phận Nhân sự. Chúng tôi trân trọng tài năng của bạn và sẽ phản hồi kết quả duyệt hồ sơ sớm nhất.
      </p>

      {/* Back to Home Button */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-[#1769E2] bg-white px-6 py-2.5 text-[#1257C0] font-semibold text-sm lg:text-[14px] shadow-xs hover:bg-blue-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 stroke-[2.25]" />
          <span>Về trang chủ</span>
        </Link>
      </div>
    </section>
  );
}


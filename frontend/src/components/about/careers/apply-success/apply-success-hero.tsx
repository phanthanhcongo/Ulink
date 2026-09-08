import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';

export function ApplySuccessHero() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 flex flex-col items-center text-center max-w-3xl mx-auto px-3 sm:px-4">
      {/* Top Checkmark Circle */}
      <div className="mb-4 sm:mb-5 lg:mb-6 flex h-12 sm:h-14 lg:h-16 w-12 sm:w-14 lg:w-16 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30">
        <Check className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 stroke-[3]" />
      </div>

      {/* Title */}
      <h1 className="text-section-title sm:text-hero-title font-bold text-slate-900 tracking-tight">
        Nộp đơn ứng tuyển thành công!
      </h1>

      {/* Description */}
      <p className="mt-2 sm:mt-3 lg:mt-4 text-body-regular text-slate-600 leading-relaxed max-w-2xl">
        Cảm ơn bạn đã nộp đơn ứng tuyển tại ULink Industries. Hồ sơ của bạn đã được gửi trực tiếp
        đến Bộ phận Nhân sự. Chúng tôi trân trọng tài năng của bạn và sẽ phản hồi kết quả duyệt hồ
        sơ sớm nhất.
      </p>

      {/* Back to Home Button */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-slate-200 bg-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-body-regular font-semibold text-blue-600 shadow-sm hover:bg-slate-50 hover:border-blue-200 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Về trang chủ
        </Link>
      </div>
    </section>
  );
}

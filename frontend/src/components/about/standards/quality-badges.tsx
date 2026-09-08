import Image from 'next/image';
import { ASSETS } from '@/lib/assets';

export function QualityBadges() {
  return (
    <section className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4">
      <div className="rounded-[3px] bg-slate-50 p-3 sm:p-4 lg:p-8 border border-slate-100 flex flex-col items-center text-center">
        <h2 className="text-section-title sm:text-hero-title font-bold tracking-tight text-slate-900 mb-1.5 sm:mb-2">
          Chứng nhận ISO
        </h2>
        <p className="text-body-regular sm:text-body-large font-medium leading-relaxed text-slate-600 max-w-xl mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base">
          Đáp ứng các tiêu chuẩn quốc tế và chất lượng của mỗi mắt xích trong chuỗi cung ứng.
        </p>

        <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:gap-6 items-center sm:grid-cols-2 lg:grid-cols-4 w-full max-w-4xl">
          {/* ISO 9001:2015 / QUACERT / JAS-ANZ */}
          <div className="flex h-20 sm:h-24 lg:h-32 items-center justify-center p-2 sm:p-2.5 lg:p-3 rounded-[3px] bg-white border border-slate-200 shadow-sm transition-transform hover:scale-105">
            <Image
              src={ASSETS.home.certIso9001}
              alt="ISO 9001:2015 QUACERT JAS-ANZ"
              width={320}
              height={140}
              className="h-16 sm:h-20 lg:h-24 w-auto max-h-[80px] sm:max-h-[100px] object-contain"
            />
          </div>

          {/* SGS */}
          <div className="flex h-20 sm:h-24 lg:h-32 items-center justify-center p-2 sm:p-2.5 lg:p-3 rounded-[3px] bg-white border border-slate-200 shadow-sm transition-transform hover:scale-105">
            <Image
              src={ASSETS.home.certSgs}
              alt="SGS Certification"
              width={300}
              height={140}
              className="h-16 sm:h-20 lg:h-22 w-auto max-h-[70px] sm:max-h-[90px] object-contain"
            />
          </div>

          {/* RoHS compliant */}
          <div className="flex h-20 sm:h-24 lg:h-32 items-center justify-center p-2 sm:p-2.5 lg:p-3 rounded-[3px] bg-white border border-slate-200 shadow-sm transition-transform hover:scale-105">
            <Image
              src={ASSETS.home.certRohs}
              alt="RoHS Compliant"
              width={320}
              height={140}
              className="h-16 sm:h-20 lg:h-24 w-auto max-h-[80px] sm:max-h-[100px] object-contain"
            />
          </div>

          {/* MSDS Material Safety Data Sheet */}
          <div className="flex h-20 sm:h-24 lg:h-32 items-center justify-center p-2 sm:p-2.5 lg:p-3 rounded-[3px] bg-white border border-slate-200 shadow-sm transition-transform hover:scale-105">
            <Image
              src={ASSETS.home.certMsds}
              alt="MSDS Material Safety Data Sheet"
              width={340}
              height={160}
              className="h-16 sm:h-20 lg:h-26 w-auto max-h-[80px] sm:max-h-[105px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

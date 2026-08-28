import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';
import { SectionHeader } from './section-header';

export async function PartnersCertifications() {
  const t = await getTranslations('home');

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12 xl:px-16 lg:py-12 xl:py-16 overflow-hidden">
      <SectionHeader
        title={t('partners.sectionTitle')}
        subtitle={t('partners.sectionSubTitle')}
      />

      <div className="mt-8 flex flex-col gap-5 overflow-hidden mask-gradient-x py-2 select-none">
        {/* Row 1 Marquee: Left scrolling */}
        <div className="flex w-max animate-marquee-left">
          {[1, 2].map((_, index) => (
            <div
              key={`row1-m-${index}`}
              className="relative shrink-0 w-[640px] h-[69px] sm:w-[1280px] sm:h-[138px] cursor-pointer"
            >
              <Image
                src={ASSETS.home.partnerRow1}
                alt="Partners Row 1"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Row 2 Marquee: Right scrolling */}
        <div className="flex w-max animate-marquee-right">
          {[1, 2].map((_, index) => (
            <div
              key={`row2-m-${index}`}
              className="relative shrink-0 w-[640px] h-[69px] sm:w-[1280px] sm:h-[138px] cursor-pointer"
            >
              <Image
                src={ASSETS.home.partnerRow2}
                alt="Partners Row 2"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. DESKTOP VIEW (Visible on lg and up: >= 1024px)        */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-row items-center justify-between gap-3 mt-12 sm:mt-14 lg:mt-16 select-none">
        {/* Col 1+2: Title & Desc */}
        <div className="flex w-[calc(212px*2+theme(gap.3))] h-[138px] shrink-0 flex-col justify-center bg-white px-4 text-left">
          <h3 className="text-[20px] lg:text-[22px] font-bold text-primary leading-tight">
            {t('partners.isoTitle')}
          </h3>
          <p className="mt-2 text-[13px] lg:text-[14px] leading-relaxed text-muted-foreground font-medium">
            {t('partners.isoDesc')}
          </p>
        </div>

        {/* Col 3: ISO 9001 */}
        <div className="flex w-[212px] h-[138px] shrink-0 items-center justify-center bg-white hover:z-10">
          <Image
            src={ASSETS.home.certIso9001}
            alt="ISO 9001:2015 QUACERT JAS-ANZ"
            width={500}
            height={250}
            className="h-24 w-auto max-w-[80%] object-contain"
          />
        </div>

        {/* Col 4: SGS */}
        <div className="flex w-[212px] h-[138px] shrink-0 items-center justify-center bg-white hover:z-10">
          <Image
            src={ASSETS.home.certSgs}
            alt="SGS Certification"
            width={500}
            height={250}
            className="w-[120%] h-[120%] max-w-none object-cover"
          />
        </div>

        {/* Col 5: RoHS */}
        <div className="flex w-[212px] h-[138px] shrink-0 items-center justify-center bg-white hover:z-10">
          <Image
            src={ASSETS.home.certRohs}
            alt="RoHS Compliant"
            width={500}
            height={250}
            className="h-24 w-auto max-w-[80%] object-contain"
          />
        </div>

        {/* Col 6: MSDS */}
        <div className="flex w-[212px] h-[138px] shrink-0 items-center justify-center bg-white hover:z-10">
          <Image
            src={ASSETS.home.certMsds}
            alt="MSDS Material Safety Data Sheet"
            width={500}
            height={250}
            className="h-24 w-auto max-w-[80%] object-contain"
          />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. MOBILE & TABLET VIEW (Visible below lg: < 1024px)      */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="flex lg:hidden flex-col gap-6 mt-10 select-none">
        {/* Header Title & Subtitle */}
        <div className="text-left">
          <h3 className="text-[20px] sm:text-[22px] font-bold text-primary leading-tight">
            {t('partners.isoTitle')}
          </h3>
          <p className="mt-2 text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground font-medium">
            {t('partners.isoDesc')}
          </p>
        </div>

        {/* Responsive Grid of Certificates (4 columns on iPad/Tablet md, 2 columns on Mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: ISO 9001 */}
          <div className="flex flex-col bg-[#2D60C3] rounded-[4px] p-5 text-left shadow-sm min-h-[170px] hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l2 2 4-4" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-[16px] sm:text-[18px]">ISO 9001</span>
            <span className="text-blue-100/90 text-[12px] sm:text-[13px] font-medium mt-1.5 leading-snug">
              Hệ thống quản lý chất lượng
            </span>
          </div>

          {/* Card 2: ISO 14001 */}
          <div className="flex flex-col bg-[#2D60C3] rounded-[4px] p-5 text-left shadow-sm min-h-[170px] hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v11" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-[16px] sm:text-[18px]">ISO 14001</span>
            <span className="text-blue-100/90 text-[12px] sm:text-[13px] font-medium mt-1.5 leading-snug">
              Quản lý môi trường
            </span>
          </div>

          {/* Card 3: ISO 45001 */}
          <div className="flex flex-col bg-[#2D60C3] rounded-[4px] p-5 text-left shadow-sm min-h-[170px] hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-[16px] sm:text-[18px]">ISO 45001</span>
            <span className="text-blue-100/90 text-[12px] sm:text-[13px] font-medium mt-1.5 leading-snug">
              An toàn & sức khỏe nghề nghiệp
            </span>
          </div>

          {/* Card 4: MSDS */}
          <div className="flex flex-col bg-[#2D60C3] rounded-[4px] p-5 text-left shadow-sm min-h-[170px] hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                <circle cx="15" cy="15" r="3" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-[16px] sm:text-[18px]">MSDS</span>
            <span className="text-blue-100/90 text-[12px] sm:text-[13px] font-medium mt-1.5 leading-snug">
              Bảng dữ liệu an toàn vật liệu
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

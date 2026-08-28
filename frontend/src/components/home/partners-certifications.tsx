import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';
import { SectionHeader } from './section-header';

export async function PartnersCertifications() {
  const t = await getTranslations('home');

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12 xl:px-16 lg:py-12 xl:py-16">
      <SectionHeader
        title={t('partners.sectionTitle')}
        subtitle={t('partners.sectionSubTitle')}
      />

      <div className="mt-8 flex flex-col gap-4 sm:gap-5 lg:gap-6">
        {/* Mobile Viewports (< sm) - Dynamic Double Marquee */}
        <div className="flex sm:hidden flex-col gap-3 overflow-hidden mask-gradient-x py-2">
          {/* Row 1 Marquee: Left scrolling */}
          <div className="flex w-max gap-3 animate-marquee-left">
            {[1, 2].map((_, index) => (
              <div key={`row1-m-${index}`} className="relative shrink-0 w-[640px] h-[69px]">
                <Image
                  src={ASSETS.home.partnerRow1}
                  alt="Partners Row 1"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          {/* Row 2 Marquee: Right scrolling */}
          <div className="flex w-max gap-3 animate-marquee-right">
            {[1, 2].map((_, index) => (
              <div key={`row2-m-${index}`} className="relative shrink-0 w-[640px] h-[69px]">
                <Image
                  src={ASSETS.home.partnerRow2}
                  alt="Partners Row 2"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 1 (Desktop: show, Mobile: hide) */}
        <div className="hidden sm:block relative w-full aspect-[1280/138] max-w-[1280px] mx-auto bg-white transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
          <Image
            src={ASSETS.home.partnerRow1}
            alt="Partners Row 1"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Row 2 (Desktop: show, Mobile: hide) */}
        <div className="hidden sm:block relative w-full aspect-[1280/138] max-w-[1280px] mx-auto bg-white transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
          <Image
            src={ASSETS.home.partnerRow2}
            alt="Partners Row 2"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* CERTIFICATIONS & ISO STANDARDS ROW (Row 3 - Desktop) */}
      <div className="hidden sm:flex flex-row items-center justify-between gap-3 mt-8 sm:mt-10 lg:mt-12">
        {/* Col 1+2: Title & Desc */}
        <div className="flex w-[calc(160px*2+theme(gap.3))] sm:w-[calc(190px*2+theme(gap.3))] lg:w-[calc(212px*2+theme(gap.3))] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 flex-col justify-center bg-white px-4 text-left">
          <h3 className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-primary leading-tight">
            {t('partners.isoTitle')}
          </h3>
          <p className="mt-2 text-[12px] sm:text-[14px] lg:text-[16px] leading-relaxed text-muted-foreground">
            {t('partners.isoDesc')}
          </p>
        </div>

        {/* Col 3: ISO 9001:2015 */}
        <div className="flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 hover:scale-[1.15] hover:z-10">
          <Image
            src={ASSETS.home.certIso9001}
            alt="ISO 9001:2015 QUACERT JAS-ANZ"
            width={500}
            height={250}
            className="h-16 sm:h-20 lg:h-24 w-auto max-w-[80%] object-contain"
          />
        </div>

        {/* Col 4: SGS */}
        <div className="flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 hover:scale-[1.15] hover:z-10">
          <Image
            src={ASSETS.home.certSgs}
            alt="SGS Certification"
            width={500}
            height={250}
            className="w-[120%] h-[120%] max-w-none object-cover"
          />
        </div>

        {/* Col 5: RoHS */}
        <div className="flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 hover:scale-[1.15] hover:z-10">
          <Image
            src={ASSETS.home.certRohs}
            alt="RoHS Compliant"
            width={500}
            height={250}
            className="h-16 sm:h-20 lg:h-24 w-auto max-w-[80%] object-contain"
          />
        </div>

        {/* Col 6: MSDS */}
        <div className="flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 hover:scale-[1.15] hover:z-10">
          <Image
            src={ASSETS.home.certMsds}
            alt="MSDS Material Safety Data Sheet"
            width={500}
            height={250}
            className="h-16 sm:h-20 lg:h-24 w-auto max-w-[80%] object-contain"
          />
        </div>
      </div>

      {/* CERTIFICATIONS & ISO STANDARDS SECTION (Mobile) */}
      <div className="flex sm:hidden flex-col gap-3 mt-8">
        {/* Title & Desc card */}
        <div className="flex flex-col justify-center bg-white p-5 text-left border border-gray-100 rounded-sm shadow-sm">
          <h3 className="text-[16px] font-bold text-primary leading-tight">
            {t('partners.isoTitle')}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            {t('partners.isoDesc')}
          </p>
        </div>

        {/* 2x2 Grid of Certificates */}
        <div className="grid grid-cols-2 gap-3">
          {/* Col 1: ISO 9001:2015 */}
          <div className="flex h-[100px] items-center justify-center bg-white border border-gray-100 rounded-sm p-4 shadow-sm">
            <Image
              src={ASSETS.home.certIso9001}
              alt="ISO 9001:2015 QUACERT JAS-ANZ"
              width={250}
              height={125}
              className="h-14 w-auto max-w-[90%] object-contain"
            />
          </div>

          {/* Col 2: SGS */}
          <div className="flex h-[100px] items-center justify-center bg-white border border-gray-100 rounded-sm p-4 shadow-sm">
            <Image
              src={ASSETS.home.certSgs}
              alt="SGS Certification"
              width={250}
              height={125}
              className="h-14 w-auto max-w-[90%] object-contain"
            />
          </div>

          {/* Col 3: RoHS */}
          <div className="flex h-[100px] items-center justify-center bg-white border border-gray-100 rounded-sm p-4 shadow-sm">
            <Image
              src={ASSETS.home.certRohs}
              alt="RoHS Compliant"
              width={250}
              height={125}
              className="h-14 w-auto max-w-[90%] object-contain"
            />
          </div>

          {/* Col 4: MSDS */}
          <div className="flex h-[100px] items-center justify-center bg-white border border-gray-100 rounded-sm p-4 shadow-sm">
            <Image
              src={ASSETS.home.certMsds}
              alt="MSDS Material Safety Data Sheet"
              width={250}
              height={125}
              className="h-14 w-auto max-w-[90%] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

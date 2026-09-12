import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface HubAndPartnerProps {
  locale: string;
}

export default async function HubAndPartner({ locale }: HubAndPartnerProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  return (
    <>
      {/* === SECTION: HUB HÀ NAM === */}
      <section className="w-full bg-white border-t border-gray-150 py-12 lg:py-16">
        <div className="page-container text-center">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-xl sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold text-blue-600 tracking-[-0.6px] uppercase">
              {t('hubPartner.hubHeading')}
            </h2>
            <p className="mt-3 sm:mt-4 lg:mt-5 text-sm sm:text-base lg:text-[18px] lg:leading-[28px] font-normal text-[#617084]">
              {t('hubPartner.hubDesc')}
            </p>
          </div>

          {/* Central Showcase Image */}
          <div className="ui-card-hover relative w-full max-w-4xl mx-auto aspect-[16/10] rounded-[3px] overflow-hidden shadow-md bg-slate-50 border border-gray-100">
            <Image
              src="/images/home/section2/solution-packaging.webp"
              alt={t('hubPartner.hubHeading')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        </div>
      </section>

      {/* === SECTION: TRỞ THÀNH ĐỐI TÁC === */}
      <section className="w-full bg-card border-t border-gray-150 py-12 lg:py-16">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text Content and Buttons */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h2 className="text-xl sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold text-[#162233] tracking-[-0.6px]">
                {t('hubPartner.partnerHeading')}
              </h2>
              <p className="mt-3 sm:mt-4 lg:mt-5 text-sm sm:text-base lg:text-[18px] lg:leading-[28px] font-normal text-[#617084]">
                {t('hubPartner.partnerDesc')}
              </p>

              <div className="mt-5 sm:mt-6 lg:mt-7 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center justify-center rounded-[3px] bg-blue-600 px-6 py-3 text-sm sm:text-base lg:text-[18px] lg:leading-[28px] font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors w-full sm:w-auto text-center"
                >
                  {t('hubPartner.learnMore')}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center rounded-[3px] border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 px-6 py-3 text-sm sm:text-base lg:text-[18px] lg:leading-[28px] font-semibold transition-colors w-full sm:w-auto text-center"
                >
                  {t('hubPartner.connectUs')}
                </Link>
              </div>
            </div>

            {/* Right: Partner Image */}
            <div className="lg:col-span-6 ui-card-hover relative aspect-[4/3] rounded-[3px] overflow-hidden shadow-sm bg-slate-50 border border-gray-100">
              <Image
                src="/images/industries/case_supplier.webp"
                alt={t('hubPartner.partnerHeading')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



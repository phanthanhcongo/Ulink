import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

interface ContactCtaProps {
  locale: string;
}

export default async function ContactCta({ locale }: ContactCtaProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  return (
    <section className="w-full bg-white border-t border-b border-slate-100 py-8 sm:py-12 lg:py-20 my-6 sm:my-12 lg:my-20">
      <div className="page-container flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 lg:gap-16">
        {/* Left Content Side */}
        <div className="flex flex-col max-w-3xl">
          <span className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-[#212529]">
            {t('contactCta.label')}
          </span>
          <h2 className="text-[22px] sm:text-[28px] lg:text-[36px] font-bold text-[#21272A] mt-1.5 sm:mt-2 leading-tight tracking-tight">
            {t('contactCta.heading')}
          </h2>
          <p className="text-[13.5px] sm:text-[16px] lg:text-[18px] leading-[22px] sm:leading-[26px] lg:leading-[28px] text-[#647084] sm:text-[#485669] font-normal mt-2 sm:mt-3">
            {t('contactCta.desc')}
          </p>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
          <Link
            href="/contact"
            className="inline-flex h-[46px] sm:h-[52px] lg:h-[56px] flex-1 sm:flex-initial items-center justify-center rounded-[3px] border-2 border-[#1769E2] bg-white px-4 sm:px-8 text-[15px] sm:text-[18px] lg:text-[20px] font-semibold sm:font-medium text-[#1769E2] hover:bg-[#EBF3FE] transition-all duration-200 text-center shrink-0"
          >
            {t('contactCta.callNow')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-[46px] sm:h-[52px] lg:h-[56px] flex-1 sm:flex-initial items-center justify-center rounded-[3px] border-2 border-[#1769E2] bg-[#1769E2] px-4 sm:px-8 text-[15px] sm:text-[18px] lg:text-[20px] font-semibold sm:font-medium text-white hover:bg-[#1257BD] hover:border-[#1257BD] transition-all duration-200 text-center shrink-0"
          >
            {t('contactCta.sendRequest')}
          </Link>
        </div>
      </div>
    </section>
  );
}



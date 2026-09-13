import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

interface ContactCtaProps {
  locale: string;
}

export default async function ContactCta({ locale }: ContactCtaProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  return (
    <section className="w-full bg-white border-t border-b border-slate-100 py-10 sm:py-14 lg:py-[80px]">
      <div className="page-container flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-[80px]">
        {/* Left Content Side */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex flex-col gap-2">
            <span className="text-[16px] sm:text-[20px] lg:text-[24px] font-semibold text-[#212529] leading-tight">
              {t('contactCta.label')}
            </span>
            <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-[#21272A] leading-[36px] tracking-[-0.0107em]">
              {t('contactCta.heading')}
            </h2>
          </div>
          <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-[28px] text-[#21272A] font-normal">
            {t('contactCta.desc')}
          </p>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
          <a
            href="tel:19006868"
            className="inline-flex h-[56px] flex-1 sm:flex-initial items-center justify-center rounded-[3px] border-2 border-[#1769E2] bg-white px-6 sm:px-8 text-[16px] sm:text-[18px] lg:text-[20px] font-medium text-[#1769E2] tracking-[0.025em] leading-none hover:bg-[#EBF3FE] hover:border-[#1257BD] hover:text-[#1257BD] transition-all duration-200 text-center shrink-0"
          >
            {t('contactCta.callNow')}
          </a>
          <Link
            href="/contact"
            className="inline-flex h-[56px] flex-1 sm:flex-initial items-center justify-center rounded-[3px] border-2 border-[#1769E2] bg-[#1769E2] px-6 sm:px-8 text-[16px] sm:text-[18px] lg:text-[20px] font-medium text-white tracking-[0.025em] leading-none hover:bg-[#1257BD] hover:border-[#1257BD] transition-all duration-200 text-center shrink-0"
          >
            {t('contactCta.sendRequest')}
          </Link>
        </div>
      </div>
    </section>
  );
}



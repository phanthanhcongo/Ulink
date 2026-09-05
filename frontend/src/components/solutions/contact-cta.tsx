import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

interface ContactCtaProps {
  locale: string;
}

export default async function ContactCta({ locale }: ContactCtaProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  return (
    <section className="w-full bg-white border-t border-b border-slate-100 py-10 mt-16 lg:mt-24">
      <div className="page-container flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Content Side */}
        <div className="flex flex-col">
          <span className="text-[13px] sm:text-[14px] leading-relaxed font-bold text-slate-800">
            {t('contactCta.label')}
          </span>
          <h2 className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-slate-900 mt-1.5 leading-tight tracking-tight">
            {t('contactCta.heading')}
          </h2>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500 font-medium mt-2">
            {t('contactCta.desc')}
          </p>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-[3px] border border-[#1769E2] bg-white px-6 text-[13px] sm:text-[14px] leading-relaxed font-bold text-[#1769E2] hover:bg-[#EBF3FE] transition-colors w-1/2 sm:w-auto text-center"
          >
            {t('contactCta.callNow')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-[3px] bg-[#1769E2] px-6 text-[13px] sm:text-[14px] leading-relaxed font-bold text-white hover:bg-[#1257BD] transition-colors w-1/2 sm:w-auto text-center"
          >
            {t('contactCta.sendRequest')}
          </Link>
        </div>
      </div>
    </section>
  );
}



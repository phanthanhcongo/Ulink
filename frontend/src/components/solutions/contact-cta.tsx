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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Content Side */}
        <div className="flex flex-col">
          <span className="text-sm sm:text-base font-bold text-slate-800">
            {t('contactCta.label')}
          </span>
          <h2 className="text-xl sm:text-2.5xl font-extrabold text-slate-900 mt-1.5 leading-tight tracking-tight">
            {t('contactCta.heading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed">
            {t('contactCta.desc')}
          </p>
        </div>

        {/* Right Action Side */}
        <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-[3px] border border-blue-600 bg-white px-6 text-xs sm:text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors w-1/2 sm:w-auto text-center"
          >
            {t('contactCta.callNow')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-[3px] bg-blue-600 px-6 text-xs sm:text-sm font-bold text-white hover:bg-blue-700 transition-colors w-1/2 sm:w-auto text-center"
          >
            {t('contactCta.sendRequest')}
          </Link>
        </div>
      </div>
    </section>
  );
}


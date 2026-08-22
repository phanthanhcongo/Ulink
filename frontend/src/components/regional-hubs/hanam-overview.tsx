import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export default async function HanamOverview() {
  const t = await getTranslations('regionalHubs');

  return (
    <section className="w-full bg-white py-16 sm:py-20 border-t border-slate-100">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
        {/* Eyebrow */}
        <span className="text-[13px] font-bold text-brand tracking-wider uppercase block">
          {t('hanamIntro.eyebrow')}
        </span>

        {/* Title */}
        <h2 className="mt-3 text-[24px] sm:text-[28px] font-extrabold text-slate-900 leading-tight">
          {t('hanamIntro.title')}
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-[800px] mx-auto text-[13px] sm:text-[14px] text-slate-500 leading-relaxed">
          {t('hanamIntro.desc')}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <Link
            href="/contact"
            className="bg-brand text-white text-[13px] font-semibold py-3 px-6 rounded-[3px] flex items-center gap-2 hover:bg-brand-strong transition-colors"
          >
            {t('hanamIntro.contactSales')}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="border border-brand text-brand text-[13px] font-semibold py-3 px-6 rounded-[3px] hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            {t('hanamIntro.learnMore')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Large Video Showcase */}
        <div className="mt-12 max-w-[900px] mx-auto aspect-[16/9] rounded-[3px] overflow-hidden shadow-md border border-slate-100 bg-slate-50">
          <video
            src="/images/regional_hubs/Hub.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

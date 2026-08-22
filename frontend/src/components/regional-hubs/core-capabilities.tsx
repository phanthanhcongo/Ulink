import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Images, Clock, Award, ArrowRight } from 'lucide-react';

export default async function CoreCapabilities() {
  const t = await getTranslations('regionalHubs');

  return (
    <section className="w-full bg-white py-16 sm:py-20 border-t border-slate-100">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Main info */}
          <div className="lg:col-span-4 max-w-md">
            <h2 className="text-[22px] sm:text-[24px] font-bold text-slate-900 leading-tight">
              {t('capabilities.title')}
            </h2>
            <p className="mt-4 text-[13px] text-slate-500 leading-relaxed">
              {t('capabilities.desc')}
            </p>
          </div>

          {/* Right: Three Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Card 1: Manufacturing */}
              <div className="flex flex-col items-start">
                <Images className="h-8 w-8 text-brand mb-4" strokeWidth={1.5} />
                <h3 className="text-[15px] font-bold text-slate-900 mb-2">
                  {t('capabilities.manufacturing.title')}
                </h3>
                <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
                  {t('capabilities.manufacturing.desc')}
                </p>
                <Link
                  href="/solutions"
                  className="group text-[12px] font-semibold text-brand inline-flex items-center gap-1 hover:text-brand-strong transition-colors mt-auto"
                >
                  {t('capabilities.learnMore')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Card 2: Supply Chain */}
              <div className="flex flex-col items-start">
                <Clock className="h-8 w-8 text-brand mb-4" strokeWidth={1.5} />
                <h3 className="text-[15px] font-bold text-slate-900 mb-2">
                  {t('capabilities.supplyChain.title')}
                </h3>
                <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
                  {t('capabilities.supplyChain.desc')}
                </p>
                <Link
                  href="/about"
                  className="group text-[12px] font-semibold text-brand inline-flex items-center gap-1 hover:text-brand-strong transition-colors mt-auto"
                >
                  {t('capabilities.learnMore')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Card 3: Quality Control */}
              <div className="flex flex-col items-start">
                <Award className="h-8 w-8 text-brand mb-4" strokeWidth={1.5} />
                <h3 className="text-[15px] font-bold text-slate-900 mb-2">
                  {t('capabilities.quality.title')}
                </h3>
                <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
                  {t('capabilities.quality.desc')}
                </p>
                <Link
                  href="/about/quality"
                  className="group text-[12px] font-semibold text-brand inline-flex items-center gap-1 hover:text-brand-strong transition-colors mt-auto"
                >
                  {t('capabilities.learnMore')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

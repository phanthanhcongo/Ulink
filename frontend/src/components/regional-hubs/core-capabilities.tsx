import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export default async function CoreCapabilities() {
  const t = await getTranslations('regionalHubs');

  return (
    <section className="w-full bg-white py-12 sm:py-16 border-t border-slate-200">
      <div className="page-container">
        {/* Top Header & Description (Stacked Layout matching Tablet Figma) */}
        <div className="mb-10 sm:mb-12 max-w-[840px] flex flex-col items-start text-left">
          <h2 className="text-[24px] sm:text-[28px] font-semibold text-[#212529] leading-[32px] sm:leading-[36px] tracking-[-0.3px]">
            {t('capabilities.title')}
          </h2>
          <p className="mt-3 text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-[#495057]">
            {t('capabilities.desc')}
          </p>
        </div>

        {/* 3 Cards Grid: 2 cards on top row, 3rd card on 2nd row for Tablet matching Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
          {/* Card 1: Manufacturing */}
          <div className="flex flex-col items-start text-left group">
            <div className="w-12 h-12 relative flex items-center justify-start mb-4">
              <Image
                src="/images/home/section2/icon-pictures.svg"
                alt="Manufacturing Icon"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#212529] leading-[28px] mb-2">
              {t('capabilities.manufacturing.title')}
            </h3>
            <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#495057] mb-6 flex-1">
              {t('capabilities.manufacturing.desc')}
            </p>
            <Link
              href="/solutions"
              className="text-[15px] sm:text-[16px] leading-[24px] font-bold text-brand inline-flex items-center gap-2 hover:text-brand-strong transition-colors mt-auto"
            >
              {t('capabilities.learnMore')}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 2: Supply Chain */}
          <div className="flex flex-col items-start text-left group">
            <div className="w-12 h-12 relative flex items-center justify-start mb-4">
              <Image
                src="/images/home/section2/icon-pie-chart.svg"
                alt="Supply Chain Icon"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#212529] leading-[28px] mb-2">
              {t('capabilities.supplyChain.title')}
            </h3>
            <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#495057] mb-6 flex-1">
              {t('capabilities.supplyChain.desc')}
            </p>
            <Link
              href="/about"
              className="text-[15px] sm:text-[16px] leading-[24px] font-bold text-brand inline-flex items-center gap-2 hover:text-brand-strong transition-colors mt-auto"
            >
              {t('capabilities.learnMore')}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 3: Quality Control */}
          <div className="flex flex-col items-start text-left group">
            <div className="w-12 h-12 relative flex items-center justify-start mb-4">
              <Image
                src="/images/home/section2/icon-pocket-watch.svg"
                alt="Quality Control Icon"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#212529] leading-[28px] mb-2">
              {t('capabilities.quality.title')}
            </h3>
            <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#495057] mb-6 flex-1">
              {t('capabilities.quality.desc')}
            </p>
            <Link
              href="/about/quality"
              className="text-[15px] sm:text-[16px] leading-[24px] font-bold text-brand inline-flex items-center gap-2 hover:text-brand-strong transition-colors mt-auto"
            >
              {t('capabilities.learnMore')}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


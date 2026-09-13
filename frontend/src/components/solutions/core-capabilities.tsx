'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Factory, Package, Activity, Truck, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function CoreCapabilities() {
  const t = useTranslations('solutions');
  const locale = useLocale();

  return (
    <section className="w-full bg-white border-t border-gray-150 py-12 sm:py-16 lg:py-24">
      <div className="page-container">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto text-left lg:text-center mb-10 sm:mb-16">
          <span className="text-sm sm:text-xl lg:text-[28px] lg:leading-[36px] font-semibold uppercase tracking-wider text-[#1769E2] block">
            {t('testimonialsCapabilities.capabilitiesEyebrow')}
          </span>
          <h2 className="mt-2 sm:mt-4 text-xl sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold tracking-tight text-[#212529]">
            {t('testimonialsCapabilities.capabilitiesTitle')}
          </h2>
        </div>

        {/* Capabilities 4-column Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {/* Capability 1 */}
          <div className="group flex flex-col items-start text-left lg:items-center lg:text-center p-4 sm:p-6 rounded-[3px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-[#1769E2] shrink-0 mb-3 sm:mb-4 transition-colors duration-200 group-hover:shadow-sm">
              <Factory className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg lg:text-[20px] lg:leading-[1.1em] font-bold text-[#21272A] mb-2 sm:mb-3 transition-colors duration-200 group-hover:text-[#1769E2]">
              {t('testimonialsCapabilities.cap1Heading')}
            </h3>
            <p className="text-sm sm:text-base lg:text-[18px] lg:leading-[1.4em] font-normal text-[#21272A]">
              {t('testimonialsCapabilities.cap1Desc')}
            </p>
          </div>

          {/* Capability 2 */}
          <div className="group flex flex-col items-start text-left lg:items-center lg:text-center p-4 sm:p-6 rounded-[3px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-[#1769E2] shrink-0 mb-3 sm:mb-4 transition-colors duration-200 group-hover:shadow-sm">
              <Package className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg lg:text-[20px] lg:leading-[1.1em] font-bold text-[#21272A] mb-2 sm:mb-3 transition-colors duration-200 group-hover:text-[#1769E2]">
              {t('testimonialsCapabilities.cap2Heading')}
            </h3>
            <p className="text-sm sm:text-base lg:text-[18px] lg:leading-[1.4em] font-normal text-[#21272A]">
              {t('testimonialsCapabilities.cap2Desc')}
            </p>
          </div>

          {/* Capability 3 */}
          <div className="group flex flex-col items-start text-left lg:items-center lg:text-center p-4 sm:p-6 rounded-[3px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-[#1769E2] shrink-0 mb-3 sm:mb-4 transition-colors duration-200 group-hover:shadow-sm">
              <Activity className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg lg:text-[20px] lg:leading-[1.1em] font-bold text-[#21272A] mb-2 sm:mb-3 transition-colors duration-200 group-hover:text-[#1769E2]">
              {t('testimonialsCapabilities.cap3Heading')}
            </h3>
            <p className="text-sm sm:text-base lg:text-[18px] lg:leading-[1.4em] font-normal text-[#21272A]">
              {t('testimonialsCapabilities.cap3Desc')}
            </p>
          </div>

          {/* Capability 4 */}
          <div className="group flex flex-col items-start text-left lg:items-center lg:text-center p-4 sm:p-6 rounded-[3px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-[#1769E2] shrink-0 mb-3 sm:mb-4 transition-colors duration-200 group-hover:shadow-sm">
              <Truck className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg lg:text-[20px] lg:leading-[1.1em] font-bold text-[#21272A] mb-2 sm:mb-3 transition-colors duration-200 group-hover:text-[#1769E2]">
              {t('testimonialsCapabilities.cap4Heading')}
            </h3>
            <p className="text-sm sm:text-base lg:text-[18px] lg:leading-[1.4em] font-normal text-[#21272A]">
              {t('testimonialsCapabilities.cap4Desc')}
            </p>
          </div>
        </div>

        {/* CTA Order Button */}
        <div className="mt-10 sm:mt-16 flex justify-start lg:justify-center">
          <Link
            href={`/${locale}/quick-order`}
            className="group inline-flex items-center justify-center gap-2 rounded-[3px] bg-[#1769E2] px-6 py-3 text-base sm:text-lg lg:text-[20px] lg:leading-[28px] font-semibold text-white shadow-sm hover:bg-[#1257BD] transition-colors"
          >
            {t('testimonialsCapabilities.order')}
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

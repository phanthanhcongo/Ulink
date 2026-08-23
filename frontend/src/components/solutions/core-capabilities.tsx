import React from 'react';
import Link from 'next/link';
import { Factory, Package, Activity, Truck, ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface CoreCapabilitiesProps {
  locale: string;
}

export default async function CoreCapabilities({ locale }: CoreCapabilitiesProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  return (
    <section className="w-full bg-white border-t border-gray-150 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-600">
            {t('testimonialsCapabilities.capabilitiesEyebrow')}
          </span>
          <h2 className="mt-4 text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-tight">
            {t('testimonialsCapabilities.capabilitiesTitle')}
          </h2>
        </div>

        {/* Capabilities 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Capability 1 */}
          <div className="group flex flex-col items-center p-6 rounded-[3px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <div className="w-12 h-12 flex items-center justify-center text-blue-600 shrink-0 mb-6 transition-colors duration-200 group-hover:shadow-sm">
              <Factory className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 mb-3 transition-colors duration-200 group-hover:text-[#1769E2]">
              {t('testimonialsCapabilities.cap1Heading')}
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-xs">
              {t('testimonialsCapabilities.cap1Desc')}
            </p>
          </div>

          {/* Capability 2 */}
          <div className="group flex flex-col items-center p-6 rounded-[3px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <div className="w-12 h-12 flex items-center justify-center text-blue-600 shrink-0 mb-6 transition-colors duration-200 group-hover:shadow-sm">
              <Package className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 mb-3 transition-colors duration-200 group-hover:text-[#1769E2]">
              {t('testimonialsCapabilities.cap2Heading')}
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-xs">
              {t('testimonialsCapabilities.cap2Desc')}
            </p>
          </div>

          {/* Capability 3 */}
          <div className="group flex flex-col items-center p-6 rounded-[3px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <div className="w-12 h-12 flex items-center justify-center text-blue-600 shrink-0 mb-6 transition-colors duration-200 group-hover:shadow-sm">
              <Activity className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 mb-3 transition-colors duration-200 group-hover:text-[#1769E2]">
              {t('testimonialsCapabilities.cap3Heading')}
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-xs">
              {t('testimonialsCapabilities.cap3Desc')}
            </p>
          </div>

          {/* Capability 4 */}
          <div className="group flex flex-col items-center p-6 rounded-[3px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <div className="w-12 h-12 flex items-center justify-center text-blue-600 shrink-0 mb-6 transition-colors duration-200 group-hover:shadow-sm">
              <Truck className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 mb-3 transition-colors duration-200 group-hover:text-[#1769E2]">
              {t('testimonialsCapabilities.cap4Heading')}
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-xs">
              {t('testimonialsCapabilities.cap4Desc')}
            </p>
          </div>
        </div>

        {/* CTA Order Button */}
        <div className="mt-16 flex justify-center">
          <Link
            href={`/${locale}/quick-order`}
            className="group inline-flex items-center justify-center gap-2 rounded-[3px] bg-[#1769E2] px-6 py-3 text-[13px] sm:text-[14px] font-semibold text-white shadow-sm hover:bg-[#1257BD] transition-colors"
          >
            {t('testimonialsCapabilities.order')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

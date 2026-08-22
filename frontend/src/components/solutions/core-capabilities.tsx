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
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            {t('testimonialsCapabilities.capabilitiesEyebrow')}
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t('testimonialsCapabilities.capabilitiesTitle')}
          </h2>
        </div>

        {/* Capabilities 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Capability 1 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center text-blue-600 shrink-0 mb-6">
              <Factory className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-3">
              {t('testimonialsCapabilities.cap1Heading')}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {t('testimonialsCapabilities.cap1Desc')}
            </p>
          </div>

          {/* Capability 2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center text-blue-600 shrink-0 mb-6">
              <Package className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-3">
              {t('testimonialsCapabilities.cap2Heading')}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {t('testimonialsCapabilities.cap2Desc')}
            </p>
          </div>

          {/* Capability 3 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center text-blue-600 shrink-0 mb-6">
              <Activity className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-3">
              {t('testimonialsCapabilities.cap3Heading')}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {t('testimonialsCapabilities.cap3Desc')}
            </p>
          </div>

          {/* Capability 4 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center text-blue-600 shrink-0 mb-6">
              <Truck className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-3">
              {t('testimonialsCapabilities.cap4Heading')}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {t('testimonialsCapabilities.cap4Desc')}
            </p>
          </div>
        </div>

        {/* CTA Order Button */}
        <div className="mt-16 flex justify-center">
          <Link
            href={`/${locale}/quick-order`}
            className="inline-flex items-center justify-center gap-2 rounded-none bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            {t('testimonialsCapabilities.order')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

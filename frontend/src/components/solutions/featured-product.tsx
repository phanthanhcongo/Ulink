import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Activity, Truck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { CategoryNavLink } from './category-nav-link';

interface FeaturedProductProps {
  locale: string;
}

export default async function FeaturedProduct({ locale }: FeaturedProductProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  return (
    <section className="w-full bg-white border-t border-gray-150 py-16 lg:py-24">
      <div className="page-container">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
            <span className="text-caption-responsive font-bold uppercase tracking-wider text-blue-600">
              {t('featuredProduct.eyebrow')}
            </span>
          </div>
          <h2 className="mt-4 text-hero-title font-bold tracking-tight text-slate-900 leading-tight">
            {t('featuredProduct.title')}
          </h2>
          <p className="mt-4 text-caption-responsive leading-relaxed text-slate-500 max-w-4xl">
            {t('featuredProduct.subtitle')}
          </p>
        </div>

        {/* Row 1: Image Left, 4 Features Grid Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-6 w-full overflow-hidden shadow-sm bg-slate-50 border border-gray-100 rounded-[2px]">
            <Image
              src="/images/home/section2/placeholder-picture0.png"
              alt={t('featuredProduct.title')}
              width={600}
              height={420}
              className="w-full h-auto object-contain block"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right: 4 Features */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-4">
            {/* Feature 1 */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 rounded-[2px] flex items-center justify-center text-blue-600 shrink-0 mb-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <p className="text-caption-responsive leading-relaxed text-slate-600 font-medium">
                {t('featuredProduct.feat1')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 rounded-[2px] flex items-center justify-center text-blue-600 shrink-0 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <p className="text-caption-responsive leading-relaxed text-slate-600 font-medium">
                {t('featuredProduct.feat2')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 rounded-[2px] flex items-center justify-center text-blue-600 shrink-0 mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <p className="text-caption-responsive leading-relaxed text-slate-600 font-medium">
                {t('featuredProduct.feat3')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 rounded-[2px] flex items-center justify-center text-blue-600 shrink-0 mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <p className="text-caption-responsive leading-relaxed text-slate-600 font-medium">
                {t('featuredProduct.feat4')}
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: Image Left, Text Paragraph + CTA Button Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 lg:mt-24 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-6 w-full overflow-hidden shadow-sm bg-slate-50 border border-gray-100 rounded-[2px]">
            <Image
              src="/images/home/section2/placeholder-picture1.png"
              alt={t('featuredProduct.row2Heading')}
              width={600}
              height={530}
              className="w-full h-auto object-contain block"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right: Description & CTA */}
          <div className="lg:col-span-6 lg:pl-4">
            <h3 className="text-section-title font-bold text-slate-900 tracking-tight uppercase">
              {t('featuredProduct.row2Heading')}
            </h3>
            <p className="mt-5 text-caption-responsive leading-relaxed text-slate-600 font-medium">
              {t('featuredProduct.row2Desc')}
            </p>
            <div className="mt-8">
              <CategoryNavLink
                categorySlug="industrial-packaging"
                href="/solutions/listProduct"
                className="inline-flex items-center justify-center rounded-[2px] bg-blue-600 px-6 py-3 text-caption-responsive leading-relaxed font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                {t('featuredProduct.learnMore')}
              </CategoryNavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


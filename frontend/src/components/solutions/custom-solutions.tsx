import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface CustomSolutionsProps {
  locale: string;
}

export default async function CustomSolutions({ locale }: CustomSolutionsProps) {
  const t = await getTranslations({ locale, namespace: 'customSolutions' });

  return (
    <section className="w-full bg-white py-16 lg:py-24 border-t border-gray-150">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-lg sm:text-3xl lg:text-[48px] lg:leading-[56px] font-bold text-slate-900 tracking-tight">
              {t('title')}
            </h2>
            <p className="mt-6 text-sm sm:text-base lg:text-[20px] lg:leading-[30px] font-normal text-slate-600">
              {t('description')}
            </p>
            <div className="mt-8">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-[3px] bg-blue-600 px-6 py-3 text-sm sm:text-base lg:text-[16px] font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                {t('cta')}
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 ui-card-hover relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border border-gray-100 rounded-[3px]">
            <Image
              src="/images/solutions/Stretch-Hood-Packaging.png"
              alt={t('title')}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

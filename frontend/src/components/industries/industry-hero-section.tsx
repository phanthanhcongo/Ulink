'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { IndustryData } from './types';

interface IndustryHeroSectionProps {
  industryData: IndustryData;
  locale: string;
  translations: Record<string, string>;
  onCatalogueClick: (e: React.MouseEvent) => void;
}

export function IndustryHeroSection({
  industryData,
  locale,
  translations,
  onCatalogueClick
}: IndustryHeroSectionProps) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  const currentBreadcrumb = industryData.name;
  const industryCategoryName = isVi ? 'Ngành nghề' : isJa ? '業界別' : 'Industries';

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 flex flex-col justify-center min-h-[560px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={industryData.bannerImage}
          alt={industryData.title}
          fill
          className="object-cover"
          priority
        />
        {/* Figma Linear Gradient Overlay: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.55) 100%)'
          }}
        />
      </div>

      {/* Content Container - Vertically Centered */}
      <div className="page-container z-20 py-12 lg:py-16 relative flex flex-col justify-center h-full min-h-[560px]">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-[8px] text-[13px] leading-none mb-[24px] lg:mb-[32px]">
          <Link href="/" className="text-[#DDE1E6] hover:text-white transition-colors">
            {translations.home || 'Trang chủ'}
          </Link>
          <span className="text-[#DDE1E6] font-normal">{'>'}</span>
          <Link href="/industries" className="text-[#DDE1E6] hover:text-white transition-colors">
            {industryCategoryName}
          </Link>
          <span className="text-[#DDE1E6] font-normal">{'>'}</span>
          <span className="text-[#F9FAFB] font-bold">{currentBreadcrumb}</span>
        </nav>

        {/* Heading, Description & CTA */}
        <div className="flex flex-col gap-[20px] pb-[16px]">
          <h1 className="text-2xl sm:text-[40px] lg:text-[48px] lg:leading-[56px] font-bold tracking-[-0.0208em] text-white max-w-[1050px]">
            {industryData.title}
          </h1>
          <p className="text-[15px] sm:text-[16px] lg:text-[16px] lg:leading-[25.6px] font-normal text-[#E5E7EB] max-w-[740px]">
            {industryData.description}
          </p>

          {/* CTA Row (Figma Node #1119:10535) */}
          <div className="pt-[8px] flex items-center gap-[16px]">
            <Link
              href={industryData.catalogue.url}
              onClick={onCatalogueClick}
              className="inline-flex h-[44px] items-center justify-center gap-2 border-[1.5px] border-[#F9FAFB] bg-transparent hover:bg-white hover:text-[#141414] text-[#F9FAFB] font-semibold text-[14px] leading-none px-[24px] py-[12px] transition-all duration-300 rounded-[6px] shadow-sm"
            >
              {isVi ? 'Yêu cầu tư vấn kỹ thuật' : isJa ? '技術相談をリクエスト' : 'Request Technical Advice'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


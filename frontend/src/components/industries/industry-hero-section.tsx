'use client';

import React from 'react';
import { Download, ChevronRight } from 'lucide-react';
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
    <section className="relative w-full overflow-hidden bg-slate-950 flex flex-col justify-center min-h-[460px] lg:min-h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={industryData.bannerImage}
          alt={industryData.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="page-container z-20 pt-28 pb-16 lg:pt-32 lg:pb-20 relative flex flex-col items-start justify-center h-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[13px] text-white/70 font-semibold mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            {translations.home}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/50" />
          <Link href="/industries" className="hover:text-white transition-colors">
            {industryCategoryName}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/50" />
          <span className="text-white font-bold">{currentBreadcrumb}</span>
        </nav>

        {/* Heading & Description */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] lg:leading-[56px] font-bold tracking-tight text-white">
            {industryData.title}
          </h1>
          <p className="text-[15px] sm:text-[16px] lg:text-[18px] lg:leading-[28px] font-normal text-white/95 max-w-3xl">
            {industryData.description}
          </p>
        </div>

        {/* Download button */}
        <div className="mt-8">
          <Link
            href={industryData.catalogue.url}
            onClick={onCatalogueClick}
            className="inline-flex h-12 items-center justify-center gap-2.5 border border-white bg-transparent hover:bg-white hover:text-[#141414] text-white font-bold text-[14px] leading-none px-6 py-3 transition-all duration-300 rounded-[3px] shadow-sm"
          >
            <Download className="h-4.5 w-4.5" />
            {isVi ? 'Tải hồ sơ năng lực' : isJa ? '機能プロファイルをダウンロード' : 'Download Capability Profile'}
          </Link>
        </div>
      </div>
    </section>
  );
}

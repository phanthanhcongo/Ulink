'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { IndustryData } from './types';

interface IndustryCasesSectionProps {
  industryData: IndustryData;
  locale: string;
  translations: Record<string, string>;
}

export function IndustryCasesSection({
  industryData,
  locale,
  translations
}: IndustryCasesSectionProps) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  return (
    <section id="cases" className="scroll-mt-16 py-16 lg:py-[64px] w-full bg-white">
      <div className="page-container space-y-[40px]">
        {/* Header (Figma Node #1217:4897) */}
        <div className="space-y-[12px] max-w-5xl">
          <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.05em] text-[#1769E2] block">
            {translations.cases || 'TRƯỜNG HỢP ÁP DỤNG'}
          </span>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] lg:leading-[46px] font-bold text-[#0B153D] tracking-[-0.0158em]">
            {industryData.casesTitle}
          </h2>
        </div>

        {/* Grid of 3 columns (Figma Node #1217:4900 - Gap 24px) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-stretch">
          {industryData.cases.map((cs, idx) => {
            const badgeBg = (cs as any).badgeBg || (idx === 0 ? 'bg-[#DBEAFE]' : idx === 1 ? 'bg-[#DCFCE7]' : 'bg-[#FEF9C3]');
            const badgeText = (cs as any).badgeText || (idx === 0 ? 'text-[#1769E2]' : idx === 1 ? 'text-[#16A34A]' : 'text-[#CA8A04]');

            return (
              <div
                key={idx}
                className="group bg-white border border-[#DDE1E6] rounded-[3px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full shadow-2xs"
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Image wrapper (Figma Node height 200px) */}
                  <div className="relative h-[200px] w-full bg-[#F9FAFB] overflow-hidden border-b border-[#DDE1E6]">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Content Body (Figma Padding 20px, gap 10px) */}
                  <div className="p-[20px] space-y-[10px] flex flex-col justify-between flex-1">
                    <div className="space-y-[10px]">
                      {/* Pill Tag (Figma Padding 4px 10px, rounded 4px) */}
                      <div>
                        <span className={`inline-block px-[10px] py-[4px] rounded-[4px] text-[12px] font-semibold leading-none ${badgeBg} ${badgeText}`}>
                          {cs.badge}
                        </span>
                      </div>
                      <h4 className="text-[20px] font-semibold text-[#0B153D] line-clamp-2 leading-[28px] group-hover:text-[#1769E2] transition-colors">
                        {cs.title}
                      </h4>
                      <p className="text-[14px] text-[#495057] font-normal leading-[20px]">
                        {cs.description}
                      </p>
                    </div>

                    {/* Read more button link (Figma Node #1217:4909 - Height 40px, bg #1257C0) */}
                    <div className="pt-[10px]">
                      <Link
                        href="/resources"
                        className="inline-flex h-[40px] items-center justify-center gap-1.5 px-[20px] rounded-[6px] bg-[#1257C0] hover:bg-[#104ba6] text-white font-semibold text-[14px] leading-none transition-colors"
                      >
                        {isVi ? 'Đọc thêm' : isJa ? '続きを読む' : 'Read more'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


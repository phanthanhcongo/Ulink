'use client';

import React from 'react';
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
    <section id="cases" className="scroll-mt-16 py-12 sm:py-16 lg:py-[80px] w-full bg-[#F2F4F8]">
      <div className="page-container space-y-10 lg:space-y-[40px]">
        {/* Header (Figma Node #1228:11501) */}
        <div className="space-y-3 lg:space-y-[16px] text-center max-w-4xl mx-auto">
          <span className="text-[14px] sm:text-[18px] lg:text-[20px] font-bold uppercase tracking-[0.05em] text-[#1769E2] block">
            {translations.cases || (isVi ? 'ỨNG DỤNG THỰC TẾ' : isJa ? '実際の応用' : 'REAL-WORLD APPLICATIONS')}
          </span>
          <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] lg:leading-[46px] font-bold text-[#0B153D] tracking-[-0.0158em]">
            {isVi ? 'Đồng hành cùng những công trình trọng điểm' : industryData.casesTitle}
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#697077] font-normal">
            {isVi
              ? 'Giải pháp vật tư & bao bì ULINK đáp ứng tối đa yêu cầu kỹ thuật khắt khe nhất tại các nhà máy và dự án quy mô lớn.'
              : 'ULINK material & packaging solutions fulfill strict technical requirements for large-scale industrial projects.'}
          </p>
        </div>

        {/* Grid of 3 columns (Figma Node #1228:11505 - Gap 24px) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[24px] items-stretch">
          {industryData.cases.map((cs, idx) => {
            const badgeBg = (cs as any).badgeBg || (idx === 0 ? 'bg-[#DBEAFE]' : idx === 1 ? 'bg-[#DCFCE7]' : 'bg-[#FEF9C3]');
            const badgeText = (cs as any).badgeText || (idx === 0 ? 'text-[#1769E2]' : idx === 1 ? 'text-[#16A34A]' : 'text-[#CA8A04]');
            const defaultSlugs = ['hvac-office-building', 'fdi-electronics-plant', 'hospital-cleanroom'];
            const caseSlug = (cs as any).slug || defaultSlugs[idx % defaultSlugs.length];
            const targetHref = `/resources/${caseSlug}`;

            return (
              <Link
                key={idx}
                href={targetHref}
                className="group bg-white border border-[#DDE1E6] rounded-[2px] overflow-hidden shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between h-full cursor-pointer"
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Image wrapper (Figma Node height 200px) */}
                  <div className="relative h-[200px] w-full bg-[#F9FAFB] overflow-hidden border-b border-[#DDE1E6]">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Content Body (Figma Padding 20px, gap 10px) */}
                  <div className="p-5 sm:p-[20px] space-y-[10px] flex flex-col justify-between flex-1">
                    <div className="space-y-[10px]">
                      {/* Pill Tag (Figma Padding 4px 10px, rounded 2px) */}
                      <div>
                        <span className={`inline-block px-[10px] py-[4px] rounded-[2px] text-[12px] font-semibold leading-none transition-colors duration-300 ${badgeBg} ${badgeText}`}>
                          {cs.badge}
                        </span>
                      </div>
                      <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#0B153D] line-clamp-2 leading-[28px] group-hover:text-[#1769E2] transition-colors duration-300">
                        {cs.title}
                      </h3>
                      <p className="text-[14px] text-[#697077] font-normal leading-[20px] line-clamp-2">
                        {cs.description}
                      </p>
                    </div>

                    {/* Read more button link (Figma Node #1256:2190 - Height 40px, bg #2163D4, rounded 2px) */}
                    <div className="pt-2">
                      <span className="inline-flex h-[40px] items-center justify-center gap-1.5 px-[20px] rounded-[2px] bg-[#2163D4] group-hover:bg-[#1769E2] text-white font-medium text-[14px] leading-none transition-all duration-300 shadow-xs group-hover:shadow-md">
                        {isVi ? 'Đọc thêm' : isJa ? '続きを読む' : 'Read more'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

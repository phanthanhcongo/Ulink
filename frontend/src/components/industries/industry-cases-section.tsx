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
    <section id="cases" className="scroll-mt-16 py-16 lg:py-20 w-full bg-white">
      <div className="page-container space-y-10">
        {/* Header */}
        <div className="space-y-2 max-w-5xl">
          <span className="text-[14px] font-bold uppercase tracking-wider text-[#1769E2] block">
            {translations.cases}
          </span>
          <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#141414] tracking-tight">
            {industryData.casesTitle}
          </h2>
        </div>

        {/* Grid of 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industryData.cases.map((cs, idx) => {
            const badgeBg = (cs as any).badgeBg || (idx === 0 ? 'bg-[#DBEAFE]' : idx === 1 ? 'bg-[#DCFCE7]' : 'bg-[#FEF9C3]');
            const badgeText = (cs as any).badgeText || (idx === 0 ? 'text-[#1769E2]' : idx === 1 ? 'text-[#16A34A]' : 'text-[#CA8A04]');

            return (
              <div
                key={idx}
                className="group bg-white border border-[#DDE1E6] rounded-[3px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Image wrapper */}
                  <div className="relative aspect-[16/10] w-full bg-[#F9FAFB] overflow-hidden border-b border-[#DDE1E6]">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-6 space-y-3 flex flex-col justify-between flex-1">
                    <div className="space-y-2">
                      {/* Pill Tag */}
                      <div>
                        <span className={`inline-block px-2.5 py-1 rounded-[4px] text-[12px] font-semibold leading-none ${badgeBg} ${badgeText}`}>
                          {cs.badge}
                        </span>
                      </div>
                      <h4 className="text-[18px] font-semibold text-[#141414] line-clamp-2 leading-snug group-hover:text-[#1769E2] transition-colors">
                        {cs.title}
                      </h4>
                      <p className="text-[14px] text-[#495057] font-normal leading-[20px]">
                        {cs.description}
                      </p>
                    </div>

                    {/* Read more button link */}
                    <div className="pt-2">
                      <Link
                        href="/resources"
                        className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#1769E2] hover:text-[#1257BD] transition-colors"
                      >
                        {isVi ? 'Đọc thêm' : isJa ? '続きを読む' : 'Read more'}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

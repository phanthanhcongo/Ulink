'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Package, User } from 'lucide-react';
import { IndustryData } from './types';

interface IndustryStandardsSectionProps {
  industryData: IndustryData;
  locale: string;
}

export function IndustryStandardsSection({
  industryData,
  locale
}: IndustryStandardsSectionProps) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  return (
    <section id="standards" className="scroll-mt-16 py-16 lg:py-20 w-full bg-[#F2F4F8] border-y border-[#DDE1E6]">
      <div className="page-container space-y-10">
        {/* Header */}
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <span className="text-[14px] font-bold uppercase tracking-wider text-[#1769E2] block">
            {industryData.standardsTitle}
          </span>
          <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#141414] tracking-tight">
            {isVi ? 'Tiêu chuẩn chất lượng khắt khe nhất' : isJa ? '最も厳格な品質管理基準' : 'Strict Quality Standards'}
          </h2>
          <p className="text-[15px] lg:text-[16px] text-[#495057] font-normal leading-relaxed">
            {isVi
              ? `Tất cả sản phẩm dành cho ngành ${industryData.name} của ULink đều được kiểm định và đạt các tiêu chuẩn quốc tế uy tín nhất.`
              : isJa
                ? `ULinkの${industryData.name}向け製品はすべて検査を受け、最も信頼性の高い国際基準に適合しています。`
                : `All ULink products for ${industryData.name} are inspected and meet the most prestigious international standards.`}
          </p>
        </div>

        {/* Grid of 4 standards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industryData.standards.map((std, idx) => {
            const icons = [ShieldCheck, CheckCircle2, Package, User];
            const IconComp = icons[idx % icons.length];

            return (
              <div
                key={idx}
                className="bg-white border border-[#DDE1E6] rounded-[3px] p-6 space-y-4 flex flex-col justify-start hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EBF0F8] text-[#1769E2] border border-[#DBEAFE]">
                  <IconComp className="h-6 w-6 stroke-[2.2]" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-[18px] font-bold text-[#141414] leading-snug">
                    {std.name}
                  </h4>
                  <p className="text-[14px] text-[#495057] font-normal leading-[20px]">
                    {std.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

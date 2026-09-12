'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Award, FileCheck } from 'lucide-react';
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
    <section id="standards" className="scroll-mt-16 py-12 sm:py-16 lg:py-[64px] w-full bg-white">
      <div className="page-container space-y-10 lg:space-y-[40px]">
        {/* Header (Figma Node #1228:11531) */}
        <div className="space-y-3 lg:space-y-[16px] text-left sm:text-center max-w-5xl mx-0 sm:mx-auto">
          <span className="text-[14px] sm:text-[18px] lg:text-[20px] font-bold uppercase tracking-[0.05em] text-[#1769E2] block">
            {industryData.standardsTitle || (isVi ? 'TIÊU CHUẨN KỸ THUẬT' : isJa ? '技術基準' : 'TECHNICAL STANDARDS')}
          </span>
          <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] lg:leading-[46px] font-bold text-[#0B153D] tracking-[-0.0158em]">
            {isVi ? 'Sản phẩm kiểm định chất lượng quốc tế' : 'Internationally Certified Quality Products'}
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#697077] font-normal">
            {isVi
              ? 'ULINK tự hào cung cấp các sản phẩm băng keo nhôm đạt đầy đủ chứng nhận chất lượng cho thị trường Việt Nam và xuất khẩu.'
              : 'ULINK proudly supplies aluminum tape products fully certified for domestic and export markets.'}
          </p>
        </div>

        {/* Grid of 4 standards (Figma Node #1228:11535 - Gap 24px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[24px]">
          {industryData.standards.map((std, idx) => {
            const icons = [ShieldCheck, CheckCircle2, Award, FileCheck];
            const IconComp = icons[idx % icons.length];

            return (
              <div
                key={idx}
                className="group bg-white border border-[#DDE1E6] rounded-[2px] p-6 lg:p-[28px] space-y-4 flex flex-col items-start sm:items-center text-left sm:text-center justify-start shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer"
              >
                {/* 56x56 Icon Circle Wrapper */}
                <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#1769E2] border border-[#d0e2fb] transition-colors duration-300 group-hover:bg-[#1769E2] group-hover:border-[#1769E2] group-hover:text-white">
                  <IconComp className="h-8 w-8 stroke-[1.8] transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="space-y-[8px]">
                  <h4 className="text-[18px] sm:text-[20px] font-semibold text-[#0B153D] leading-[28px] group-hover:text-[#1769E2] transition-colors duration-300">
                    {std.name}
                  </h4>
                  <p className="text-[14px] text-[#697077] font-normal leading-[20px]">
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

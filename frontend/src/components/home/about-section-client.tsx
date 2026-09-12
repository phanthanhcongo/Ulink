'use client';

import React from 'react';
import Image from 'next/image';

interface AboutSectionClientProps {
  locale: string;
}

export function AboutSectionClient({ locale }: AboutSectionClientProps) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-[80px]">
      <div className="page-container flex flex-col lg:flex-row items-center gap-8 lg:gap-[64px]">
        {/* Left Column: Warehouse_Photo (#1228:11584 - 660px x 542px, rounded 2px) */}
        <div className="group w-full lg:w-[660px] lg:h-[542px] h-[300px] sm:h-[400px] shrink-0 relative rounded-[2px] overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
          <Image
            src="/images/industries/construction/hub_hanam-5bf401.png"
            alt="Hub Hà Nam - Trung tâm sản xuất & Phân phối"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 660px"
            priority
          />
        </div>

        {/* Right Column: Content (#1228:11585 - gap 32px) */}
        <div className="flex-1 w-full space-y-6 lg:space-y-[32px] py-1">
          {/* Header_Text (#1228:11586 - gap 16px) */}
          <div className="space-y-3 lg:space-y-[16px]">
            <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] lg:leading-[46px] font-bold text-[#0B153D] tracking-[-0.0158em]">
              {isVi
                ? 'Hub Hà Nam — Trung tâm sản xuất & Phân phối'
                : isJa
                  ? 'ハナムハブ — 生産・配送センター'
                  : 'Ha Nam Hub — Manufacturing & Distribution Center'}
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[24px] text-[#212529] font-normal">
              {isVi
                ? 'Tọa lạc tại vị trí chiến lược, Hub Hà Nam là nơi sản xuất, cung ứng các sản phẩm của ULink Industries, đảm bảo nguồn hàng dồi dào, đóng gói chuyên nghiệp và tiến độ phân phối hỏa tốc.'
                : 'Strategically located, the Ha Nam Hub manufactures and supplies ULink Industries products, ensuring abundant inventory, professional packaging, and express distribution.'}
            </p>
          </div>

          {/* Stats Rows (#1228:11589 & #1228:11596 - 2 columns, gap 16px) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Stat 1 */}
            <div className="group p-3.5 sm:p-4 rounded-[2px] bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
              <div className="text-[24px] sm:text-[28px] font-semibold leading-[36px] tracking-[-0.0107em] text-[#1B2A6B] group-hover:text-[#1769E2] transition-colors duration-300">
                10.000 m²
              </div>
              <div className="text-[13px] sm:text-[14px] text-[#617084] font-normal leading-tight mt-0.5">
                {isVi ? 'Diện tích kho hiện đại' : 'Modern Warehouse Area'}
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group p-3.5 sm:p-4 rounded-[2px] bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
              <div className="text-[24px] sm:text-[28px] font-semibold leading-[36px] tracking-[-0.0107em] text-[#1B2A6B] group-hover:text-[#1769E2] transition-colors duration-300">
                24-48h
              </div>
              <div className="text-[13px] sm:text-[14px] text-[#617084] font-normal leading-tight mt-0.5">
                {isVi ? 'Thời gian giao hàng toàn quốc' : 'Nationwide Delivery Time'}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group p-3.5 sm:p-4 rounded-[2px] bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
              <div className="text-[24px] sm:text-[28px] font-semibold leading-[36px] tracking-[-0.0107em] text-[#1B2A6B] group-hover:text-[#1769E2] transition-colors duration-300">
                WMS
              </div>
              <div className="text-[13px] sm:text-[14px] text-[#617084] font-normal leading-tight mt-0.5">
                {isVi ? 'Hệ thống quản lý kho hiện đại' : 'Modern WMS System'}
              </div>
            </div>

            {/* Stat 4 */}
            <div className="group p-3.5 sm:p-4 rounded-[2px] bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
              <div className="text-[24px] sm:text-[28px] font-semibold leading-[36px] tracking-[-0.0107em] text-[#1B2A6B] group-hover:text-[#1769E2] transition-colors duration-300">
                1000+ SKU
              </div>
              <div className="text-[13px] sm:text-[14px] text-[#617084] font-normal leading-tight mt-0.5">
                {isVi ? 'Bảo quản chuẩn phòng sạch' : 'Cleanroom Standard Storage'}
              </div>
            </div>
          </div>

          {/* Key_Metrics Bar (#1228:11603 - 3 Cards Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Metric Card 1: 3-color Donut Chart */}
            <div className="group p-4 flex flex-col justify-between h-[92px] rounded-[2px] bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
              <div className="h-8 flex items-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110">
                  <circle cx="16" cy="16" r="10" stroke="#F59E0B" strokeWidth="5" strokeDasharray="21 66" strokeDashoffset="0" />
                  <circle cx="16" cy="16" r="10" stroke="#10B981" strokeWidth="5" strokeDasharray="21 66" strokeDashoffset="-21" />
                  <circle cx="16" cy="16" r="10" stroke="#1769E2" strokeWidth="5" strokeDasharray="21 66" strokeDashoffset="-42" />
                </svg>
              </div>
              <span className="text-[14px] text-[#495057] font-normal leading-[20px] group-hover:text-[#1769E2] group-hover:font-semibold transition-colors duration-300">
                {isVi ? 'Tỷ lệ tiêu thụ' : 'Consumption Rate'}
              </span>
            </div>

            {/* Metric Card 2: Blue Dollar Sign */}
            <div className="group p-4 flex flex-col justify-between h-[92px] rounded-[2px] bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
              <div className="h-8 flex items-center">
                <span className="text-[30px] font-normal text-[#1769E2] leading-none transition-transform duration-300 group-hover:scale-110 inline-block">$</span>
              </div>
              <span className="text-[14px] text-[#495057] font-normal leading-[20px] group-hover:text-[#1769E2] group-hover:font-semibold transition-colors duration-300">
                {isVi ? 'Tối ưu chi phí' : 'Cost Optimization'}
              </span>
            </div>

            {/* Metric Card 3: 5 Outline Stars with 5th half filled */}
            <div className="group p-4 flex flex-col justify-between h-[92px] rounded-[2px] bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_12px_30px_-5px_rgba(23,105,226,0.2)] cursor-pointer">
              <div className="flex items-center gap-1.5 h-8 transition-transform duration-300 group-hover:scale-105">
                {[1, 2, 3, 4].map((i) => (
                  <svg key={i} className="w-4 h-4 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <svg className="w-4 h-4 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <defs>
                    <linearGradient id="halfStarRightGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="50%" stopColor="transparent" />
                      <stop offset="50%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#halfStarRightGrad)" />
                </svg>
              </div>
              <span className="text-[14px] text-[#495057] font-normal leading-[20px] group-hover:text-[#1769E2] group-hover:font-semibold transition-colors duration-300">
                {isVi ? 'Chất lượng' : 'Quality'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

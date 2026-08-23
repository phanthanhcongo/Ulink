'use client';

import React from 'react';
import { Smile, Copy, Package, Warehouse } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

interface HubOverviewProps {
  locale: string;
}

export default function HubOverview({ locale }: HubOverviewProps) {
  // Dictionary for multi-language support (vi, en, ja)
  const translations: Record<string, {
    eyebrow: string;
    title: string;
    desc: string;
    learnMore: string;
    stat1Val: string;
    stat1Lbl: string;
    stat2Val: string;
    stat2Lbl: string;
    stat3Val: string;
    stat3Lbl: string;
    stat4Val: string;
    stat4Lbl: string;
  }> = {
    vi: {
      eyebrow: 'Tổng quan',
      title: 'Đối tác sản xuất và phân phối',
      desc: 'ULink Industries hợp tác với hơn 50 đối tác sản xuất và phân phối trong nước và quốc tế, bao gồm các nhà máy gia công tại Việt Nam, Trung Quốc và Malaysia, cùng hệ thống kho vận và logistics trong hệ sinh thái ULINK. Mô hình đối tác giúp tối ưu chi phí sản xuất, rút ngắn thời gian giao hàng và đảm bảo chất lượng sản phẩm theo tiêu chuẩn quốc tế ISO 9001.',
      learnMore: 'Xem thêm',
      stat1Val: '98%',
      stat1Lbl: 'Tỷ lệ khách hàng hài lòng',
      stat2Val: '10,000+',
      stat2Lbl: 'Số đơn hàng thực hiện',
      stat3Val: '5,000+',
      stat3Lbl: 'Số lượng SKU',
      stat4Val: '10,000 m²',
      stat4Lbl: 'Quy mô Nhà xưởng'
    },
    en: {
      eyebrow: 'Overview',
      title: 'Manufacturing & Distribution Partners',
      desc: 'ULink Industries partners with over 50 domestic and international manufacturing and distribution partners, including contract manufacturers in Vietnam, China, and Malaysia, along with warehousing and logistics systems in the ULINK ecosystem. The partner model helps optimize production costs, shorten delivery times, and ensure product quality according to international ISO 9001 standards.',
      learnMore: 'Learn more',
      stat1Val: '98%',
      stat1Lbl: 'Customer Satisfaction Rate',
      stat2Val: '10,000+',
      stat2Lbl: 'Completed Orders',
      stat3Val: '5,000+',
      stat3Lbl: 'Total SKUs',
      stat4Val: '10,000 m²',
      stat4Lbl: 'Warehouse Space'
    },
    ja: {
      eyebrow: '概要',
      title: '製造・流通パートナー',
      desc: 'ULink Industriesは、ベトナム、中国、マレーシア di 委託製造工場をはじめ、ULINKエコシステム内の倉庫・物流システムを含む、50社以上の国内外 ng 🌐製造・流通パートナーと提携しています。パートナーモデルにより、製造コストの最適化、納期の短縮、および国際規格ISO 9001に準拠した製品品質の確保が実現します。',
      learnMore: '詳細を見る',
      stat1Val: '98%',
      stat1Lbl: '顧客満足度',
      stat2Val: '10,000+',
      stat2Lbl: '累計受注数',
      stat3Val: '5,000+',
      stat3Lbl: '取扱SKU数',
      stat4Val: '10,000 m²',
      stat4Lbl: '倉庫・工場規模'
    }
  };

  const t = translations[locale] || translations.en;

  return (
    <section className="w-full bg-white pt-24 pb-16 border-b border-slate-100">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-10">
        
        {/* === Part 1: Heading & Description === */}
        <div className="flex flex-col items-start text-left max-w-[1120px] mx-auto w-full">
          <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-brand block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-slate-500 max-w-[1100px]">
            {t.desc}
          </p>
          <Link
            href="/about"
            className="mt-4 text-[13px] sm:text-[14px] leading-relaxed font-semibold text-brand hover:underline inline-flex items-center"
          >
            {t.learnMore}
          </Link>
        </div>

        {/* === Part 2: Metrics Bar === */}
        <div className="w-full max-w-[1120px] mx-auto bg-[#E8F0FE]/40 rounded-[3px] border border-blue-100/80 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-blue-200/50">
            {/* Stat 1 */}
            <div className="flex items-center gap-4 lg:px-6 first:pl-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Smile className="h-5.5 w-5.5 stroke-[2]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-slate-900 leading-none">
                  {t.stat1Val}
                </span>
                <span className="mt-1.5 text-[12px] sm:text-[13px] font-medium text-slate-500 leading-tight">
                  {t.stat1Lbl}
                </span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 lg:px-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Copy className="h-5.5 w-5.5 stroke-[2]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-slate-900 leading-none">
                  {t.stat2Val}
                </span>
                <span className="mt-1.5 text-[12px] sm:text-[13px] font-medium text-slate-500 leading-tight">
                  {t.stat2Lbl}
                </span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 lg:px-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Package className="h-5.5 w-5.5 stroke-[2]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-slate-900 leading-none">
                  {t.stat3Val}
                </span>
                <span className="mt-1.5 text-[12px] sm:text-[13px] font-medium text-slate-500 leading-tight">
                  {t.stat3Lbl}
                </span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 lg:px-6 last:pr-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Warehouse className="h-5.5 w-5.5 stroke-[2]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-slate-900 leading-none">
                  {t.stat4Val}
                </span>
                <span className="mt-1.5 text-[12px] sm:text-[13px] font-medium text-slate-500 leading-tight">
                  {t.stat4Lbl}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === Part 3: Partner Brand Logos === */}
        <div className="w-full max-w-[1120px] mx-auto px-8 flex justify-center items-center">
          <div className="relative w-full max-w-full h-[128px] sm:h-[144px] lg:h-[160px]">
            <Image
              src="/images/regional_hubs/hub-2/icon/section.png"
              alt="Partner Brand Logos"
              fill
              className="object-contain pointer-events-none"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PartnersLogosOnly } from '@/components/home';

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
      stat4Lbl: 'Quy mô Nhà xưởng',
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
      stat4Lbl: 'Warehouse Space',
    },
    ja: {
      eyebrow: '概要',
      title: '製造・流通パートナー',
      desc: 'ULink Industriesは、ベトナム、中国、マレーシアの委託製造工場をはじめ、ULINKエコシステム内の倉庫・物流システムを含む、50社以上の国内外の製造・流通パートナーと提携しています。パートナーモデルにより、製造コストの最適化、納期の短縮、および国際規格ISO 9001に準拠した製品品質の確保が実現します。',
      learnMore: '詳細を見る',
      stat1Val: '98%',
      stat1Lbl: '顧客満足度',
      stat2Val: '10,000+',
      stat2Lbl: '累計受注数',
      stat3Val: '5,000+',
      stat3Lbl: '取扱SKU数',
      stat4Val: '10,000 m²',
      stat4Lbl: '倉庫・工場規模',
    }
  };

  const t = translations[locale] || translations.en;

  const statsData = [
    { id: 1, iconSrc: '/images/regional_hubs/hub-2/icon/smiley.svg', value: t.stat1Val, label: t.stat1Lbl },
    { id: 2, iconSrc: '/images/regional_hubs/hub-2/icon/files.svg', value: t.stat2Val, label: t.stat2Lbl },
    { id: 3, iconSrc: '/images/regional_hubs/hub-2/icon/product.svg', value: t.stat3Val, label: t.stat3Lbl },
    { id: 4, iconSrc: '/images/regional_hubs/hub-2/icon/industry.svg', value: t.stat4Val, label: t.stat4Lbl },
  ];

  return (
    <section className="w-full bg-white pt-24 sm:pt-28 lg:pt-[136px] pb-[80px] border-b border-slate-100">
      <div className="page-container flex flex-col gap-[48px]">

        {/* === Part 1: Heading & Description === */}
        <div className="flex flex-col items-start text-left w-full max-w-5xl">
          <span className="text-eyebrow font-semibold uppercase tracking-wider text-slate-900 block mb-1">
            {t.eyebrow}
          </span>
          <h2 className="text-section-title font-semibold tracking-tight text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="mt-3.5 text-body-regular sm:text-body-large leading-relaxed text-slate-600">
            {t.desc}
          </p>
          <Link
            href="/about"
            className="mt-3 text-body-regular font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            {t.learnMore}
          </Link>
        </div>

        {/* === Part 2: Metrics Bar === */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 w-full">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-[#F4F7FB] rounded-[4px] border border-slate-200/80 shadow-xs transition-all duration-300"
            >
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-blue-600/10 p-2.5">
                <div className="relative h-full w-full">
                  <Image
                    src={stat.iconSrc}
                    alt={stat.label}
                    fill
                    className="object-contain pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-stat-value font-semibold text-slate-900 leading-none">
                  {stat.value}
                </span>
                <span className="mt-1 text-caption-responsive sm:text-body-regular font-medium text-slate-600 leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* === Part 3: Partner Brand Logos === */}
        <PartnersLogosOnly />
      </div>
    </section>
  );
}


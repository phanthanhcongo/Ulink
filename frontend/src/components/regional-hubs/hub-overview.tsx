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
      title: 'Cụm Dược phẩm & Mỹ phẩm Số 2 - Yên Phong, Bắc Ninh',
      desc: 'Là một trong những trung tâm logistics và sản xuất trọng điểm của Ulink tại miền Bắc, Cụm Số 2 Yên Phong được thiết kế nhằm đáp ứng các tiêu chuẩn khắt khe nhất của ngành Dược phẩm, Mỹ phẩm và Thực phẩm chức năng. Hệ thống kho đạt chuẩn GDP/GSP cùng năng lực cung ứng nguyên liệu đầu vào đa dạng giúp các doanh nghiệp tối ưu hóa chi phí và đảm bảo tiến độ sản xuất liên tục.',
      learnMore: 'Tìm hiểu thêm về Cụm Yên Phong →',
      stat1Val: '99.8%',
      stat1Lbl: 'Độ chính xác đơn hàng',
      stat2Val: '24/7',
      stat2Lbl: 'Vận hành kho & Giao hàng',
      stat3Val: '500+',
      stat3Lbl: 'Doanh nghiệp FDI tin dùng',
      stat4Val: 'Top 1',
      stat4Lbl: 'Hạ tầng logistics Dược phẩm',
    },
    en: {
      eyebrow: 'Overview',
      title: 'Pharma & Cosmetics Hub No. 2 - Yen Phong, Bac Ninh',
      desc: 'As one of Ulink\'s key logistics and manufacturing hubs in the North, Yen Phong Hub No. 2 is designed to meet the strictest standards of the Pharmaceutical, Cosmetic, and Functional Food industries. GDP/GSP compliant warehouse system along with diverse raw material supply capability helps businesses optimize costs and ensure continuous production.',
      learnMore: 'Learn more about Yen Phong Hub →',
      stat1Val: '99.8%',
      stat1Lbl: 'Order Accuracy',
      stat2Val: '24/7',
      stat2Lbl: 'Warehouse & Delivery',
      stat3Val: '500+',
      stat3Lbl: 'FDI Enterprises Trust Us',
      stat4Val: 'Top 1',
      stat4Lbl: 'Pharma Logistics Infra',
    },
    ja: {
      eyebrow: '概要',
      title: '医薬品・化粧品ハブ第2 - バクニン省イエンフォン',
      desc: '北部におけるUlinkの主要なロジスティクスおよび製造ハブの1つとして、イエンフォン第2ハブは医薬品、化粧品、機能性食品産業の最も厳しい基準を満たすように設計されています。GDP/GSP準拠の倉庫システムと多様な raw material 供給能力により、企業はコストを最適化し、連続生産を確保できます。',
      learnMore: 'イエンフォンハブの詳細を見る →',
      stat1Val: '99.8%',
      stat1Lbl: '注文精度',
      stat2Val: '24/7',
      stat2Lbl: '倉庫運営・配送',
      stat3Val: '500+',
      stat3Lbl: '信頼するFDI企業',
      stat4Val: 'Top 1',
      stat4Lbl: '医薬品物流インフラ',
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
    <section className="w-full bg-white pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 border-b border-slate-100">
      <div className="page-container flex flex-col gap-10">
        
        {/* === Part 1: Heading & Description === */}
        <div className="flex flex-col items-start text-left w-full space-y-1 sm:space-y-2">
          <span className="text-body-regular min-[375px]:text-card-title font-semibold tracking-tight text-blue-600 leading-tight lg:leading-[36px] xl:leading-[40px] block">
            {t.eyebrow}
          </span>
          <h2 className="text-body-regular min-[375px]:text-card-title font-semibold tracking-tight text-slate-900 leading-tight lg:leading-[36px] xl:leading-[40px]">
            {t.title}
          </h2>
          <p className="pt-2 text-caption-responsive leading-relaxed text-slate-500 max-w-[1100px]">
            {t.desc}
          </p>
          <Link
            href="/about"
            className="pt-2 text-caption-responsive leading-relaxed font-semibold text-blue-600 hover:underline inline-flex items-center"
          >
            {t.learnMore}
          </Link>
        </div>

        {/* === Part 2: Metrics Bar (Individual Mapped Cards) === */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 w-full">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="group flex items-center gap-2.5 sm:gap-4 p-3.5 sm:p-6 bg-[#E8F0FE]/40 rounded-[3px] border border-blue-100/80 shadow-xs hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#E8F0FE]/60 transition-all duration-300"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 group-hover:scale-105 transition-transform p-2 sm:p-2.5">
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
                <span className="text-card-title min-[375px]:text-card-title font-bold text-slate-900 leading-none">
                  {stat.value}
                </span>
                <span className="mt-1 sm:mt-1.5 text-caption-responsive font-medium text-slate-500 leading-tight">
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


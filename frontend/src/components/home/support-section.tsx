'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckSquare, Shield, TrendingUp, Zap } from 'lucide-react';
import { SupportCard } from './support-card';

export function SupportSection() {
  const t = useTranslations('home.resourcesSection');

  const supportData = [
    { num: 1, iconSrc: '/images/icons/figma/check-square0.svg', icon: CheckSquare, title: t('supp1Title'), desc: t('supp1Desc') },
    { num: 2, iconSrc: '/images/icons/figma/shield1.svg', icon: Shield, title: t('supp2Title'), desc: t('supp2Desc') },
    { num: 3, iconSrc: '/images/icons/figma/_32-chart-combo-vectorized0.svg', icon: TrendingUp, title: t('supp3Title'), desc: t('supp3Desc') },
    { num: 4, iconSrc: '/images/icons/figma/zap0.svg', icon: Zap, title: t('supp4Title'), desc: t('supp4Desc') }
  ];

  return (
    <section className="w-full  py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* ── 5. SUB-SECTION HEADER BAR (TƯ VẤN & HỖ TRỢ) ── */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-cyan-500 shrink-0" />
          <h2 className="text-[18px] sm:text-[20px] lg:text-[20px] font-semibold text-slate-900 tracking-tight lg:leading-[28px]">
            {t('supportTitle')}
          </h2>
        </div>

        {/* ── 4 SUPPORT CARDS GRID ── */}
        <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {supportData.map((supp) => (
            <SupportCard
              key={supp.num}
              title={supp.title}
              desc={supp.desc}
              iconSrc={supp.iconSrc}
              icon={supp.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

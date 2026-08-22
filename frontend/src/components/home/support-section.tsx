'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckSquare, Shield, TrendingUp, Zap } from 'lucide-react';
import { SupportCard } from './support-card';

export function SupportSection() {
  const t = useTranslations('home.resourcesSection');

  const supportData = [
    { num: 1, icon: CheckSquare, title: t('supp1Title'), desc: t('supp1Desc') },
    { num: 2, icon: Shield, title: t('supp2Title'), desc: t('supp2Desc') },
    { num: 3, icon: TrendingUp, title: t('supp3Title'), desc: t('supp3Desc') },
    { num: 4, icon: Zap, title: t('supp4Title'), desc: t('supp4Desc') }
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
      {/* ── 5. SUB-SECTION HEADER BAR (TƯ VẤN & HỖ TRỢ) ── */}
      <div className="mt-16 flex items-center gap-3 border-t border-slate-100 pt-8">
        <div className="h-5 w-1 rounded-full bg-cyan-500" />
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          {t('supportTitle')}
        </h3>
      </div>

      {/* ── 4 SUPPORT CARDS GRID ── */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200/60 overflow-hidden">
        {supportData.map((supp) => (
          <SupportCard
            key={supp.num}
            title={supp.title}
            desc={supp.desc}
            icon={supp.icon}
          />
        ))}
      </div>
    </section>
  );
}

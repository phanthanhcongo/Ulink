'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';

export function HeroBanner() {
  const t = useTranslations('home');
  const [showToast, setShowToast] = useState(false);

  const handleCatalogueClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const mobileStats = [
    { value: '>10 năm', label: 'Kinh nghiệm Sản xuất' },
    { value: '2,000+', label: 'Doanh nghiệp tin dùng' },
    { value: '50,000+', label: 'Đơn hàng đã giao' },
    { value: '99.8%', label: 'Tỷ lệ hài lòng với Chất lượng' }
  ];

  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-slate-50 sm:aspect-[16/9] md:aspect-[16/8] lg:aspect-[1440/500] xl:aspect-[1440/540] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[460px] xl:min-h-[500px]">
      {/* Decorative Translucent Blue Glow */}
      <div
        className="pointer-events-none absolute -top-[140px] -left-[160px] sm:-left-[100px] lg:-left-[60px] z-20 h-[650px] w-[650px] rotate-[-15deg] rounded-[3px] bg-gradient-to-br from-[#1769E2]/25 via-[#1769E2]/12 to-transparent blur-[60px] sm:blur-[80px] opacity-90"
        aria-hidden="true"
      />

      {/* 1. Content Container Frame — Displays FIRST on mobile */}
      <div className="relative z-30 order-1 flex w-full items-center justify-center sm:justify-start sm:absolute sm:inset-0 sm:h-full">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-[40px] lg:py-[58px] flex items-center justify-center sm:justify-start h-full">
          {/* Content Container Frame */}
          <div className="group relative flex w-full max-w-full lg:w-[672px] lg:max-w-[672px] flex-col justify-between p-0 sm:p-8 lg:p-[48px] gap-5 sm:gap-[32px] transition-all duration-300 sm:hover:-translate-y-1 sm:hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            {/* Frosted Glass Card (Desktop only) */}
            <div className="hidden sm:block absolute inset-0 z-10 rounded-[3px] border border-white/50 bg-white/[0.92] backdrop-blur-[24px] shadow-[0px_20px_40px_-10px_rgba(0,0,0,0.102)]" />

            {/* Text content */}
            <div className="relative z-30 flex flex-col">
              <p className="text-[13px] sm:text-[18px] lg:text-[14px] font-semibold sm:font-normal uppercase tracking-wider text-brand">
                {t('hero.eyebrowTop')}
              </p>

              <p className="hidden sm:block mt-1 text-[14px] sm:text-[18px] lg:text-[16px] font-bold sm:font-semibold uppercase tracking-wider text-primary">
                {t('hero.eyebrowSub')}
              </p>

              <h1 className="mt-2 sm:mt-3 text-[26px] sm:text-[40px] md:text-[40px] lg:text-[56px] xl:text-[56px] font-extrabold leading-[1.15] sm:leading-[48px] lg:leading-[64px] tracking-tight text-slate-900">
                {t('hero.title')}
              </h1>

              <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed lg:leading-[28px] text-slate-600 font-normal">
                {t('hero.description')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="group relative z-30 flex flex-row items-center gap-3 pt-1 sm:pt-2">
              <Link
                href="/quick-order"
                className="group inline-flex h-[44px] sm:h-[48px] lg:h-[52px] flex-1 sm:flex-none sm:w-auto items-center justify-center gap-2 rounded-[3px] bg-brand px-4 sm:px-7 text-[14px] sm:text-[18px] lg:text-[18px] font-bold sm:font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:bg-brand-strong active:bg-[#0E4497]"
              >
                <span>{t('hero.ctaRfq')}</span>
                <ArrowRight className="hidden sm:inline-block h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/resources"
                onClick={handleCatalogueClick}
                className="group inline-flex h-[44px] sm:h-[48px] lg:h-[52px] flex-1 sm:flex-none sm:w-auto items-center justify-center gap-2 border border-brand bg-white/70 rounded-[3px] text-[14px] sm:text-[18px] lg:text-[18px] font-bold sm:font-semibold text-brand transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:bg-brand/10 hover:border-brand-strong px-4 sm:px-7 shadow-xs"
              >
                <span>{t('hero.ctaCatalogue')}</span>
                <Image
                  src={ASSETS.home.iconSend}
                  alt="Catalogue"
                  width={20}
                  height={20}
                  className="hidden sm:inline-block h-4.5 w-4.5 object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Image section — Displays SECOND below buttons on mobile */}
      <div className="relative order-2 w-full px-4 pb-2 pt-4 sm:px-0 sm:pb-0 sm:pt-0 h-[360px] sm:h-full sm:absolute sm:inset-0 select-none">
        <div className="relative h-full w-full overflow-hidden rounded-[2px] sm:rounded-none">
          <Image
            src={ASSETS.home.hero}
            alt="ULINK Industrial Consumable Materials"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* 3. Mobile Stats Section — 2x2 Grid (Visible on mobile below image) */}
      <div className="relative order-3 w-full px-4 pt-6 pb-5 sm:hidden z-30">
        <div className="grid grid-cols-2 gap-3">
          {mobileStats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-[3px] border border-slate-200/80 bg-white p-4 text-center shadow-xs transition-all hover:border-brand/40"
            >
              <span className="text-[20px] font-extrabold text-brand tracking-tight">
                {stat.value}
              </span>
              <span className="mt-1 text-[12px] font-medium text-slate-500 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-[3px] border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-500/20">
          <Clock className="h-5 w-5 text-amber-500 shrink-0 animate-pulse" />
          <span className="text-sm font-semibold">{t('hero.cataloguePending')}</span>
        </div>
      )}
    </section>
  );
}

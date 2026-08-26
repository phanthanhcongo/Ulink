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

  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-slate-50 sm:aspect-[16/9] md:aspect-[16/8] lg:aspect-[1440/500] xl:aspect-[1440/540] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[460px] xl:min-h-[500px]">
      {/* Image section — full viewport on mobile */}
      <div className="relative w-full h-screen sm:h-full sm:absolute sm:inset-0 select-none">
        {/* Mobile image (< sm) */}
        <Image
          src={ASSETS.home.heroMobile}
          alt="ULINK Industrial Consumable Materials"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center block sm:hidden"
        />
        {/* Desktop image (>= sm) */}
        <Image
          src={ASSETS.home.hero}
          alt="ULINK Industrial Consumable Materials"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center hidden sm:block"
        />
      </div>

      {/* Decorative Translucent Blue Glow */}
      <div
        className="pointer-events-none absolute -top-[140px] -left-[160px] sm:-left-[100px] lg:-left-[60px] z-20 h-[650px] w-[650px] rotate-[-15deg] rounded-[3px] bg-gradient-to-br from-[#1769E2]/25 via-[#1769E2]/12 to-transparent blur-[60px] sm:blur-[80px] opacity-90"
        aria-hidden="true"
      />

      <div className="relative flex w-full items-center justify-center sm:justify-start px-4 sm:px-8 lg:px-[80px] py-[28px] sm:py-[40px] lg:py-[58px] sm:absolute sm:inset-0 sm:h-full">
        {/* Content Container Frame */}
        <div className="group relative flex w-full max-w-full lg:w-[672px] lg:max-w-[672px] flex-col justify-between p-6 sm:p-8 lg:p-[48px] gap-[32px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
          {/* Frosted Glass Card */}
          <div className="absolute inset-0 z-10 rounded-[3px] border border-white/50 bg-white/[0.92] backdrop-blur-[24px] shadow-[0px_20px_40px_-10px_rgba(0,0,0,0.102)]" />

          {/* Text content */}
          <div className="relative z-30 flex flex-col">
            <p className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-brand">
              {t('hero.eyebrowTop')}
            </p>

            <p className="mt-1 text-[14px] sm:text-[15px] lg:text-[18px] font-extrabold uppercase tracking-wider text-primary">
              {t('hero.eyebrowSub')}
            </p>

            <h1 className="mt-3 text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold leading-[1.12] tracking-tight text-slate-900">
              {t('hero.title')}
            </h1>

            <p className="mt-3 text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed text-slate-600 font-medium">
              {t('hero.description')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="group relative z-30 flex flex-col sm:flex-row items-center gap-3.5 pt-2">
            <Link
              href="/quick-order"
              className="group inline-flex h-[48px] lg:h-[52px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-[3px] bg-brand px-7 text-[16px] lg:text-[17px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:bg-brand-strong active:bg-[#0E4497]"
            >
              {t('hero.ctaRfq')}
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/resources"
              onClick={handleCatalogueClick}
              className="group inline-flex h-[48px] lg:h-[52px] w-full sm:w-auto items-center justify-center gap-2.5 border border-brand bg-white/70 rounded-[3px] text-[16px] lg:text-[17px] font-bold text-brand transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:bg-brand/10 hover:border-brand-strong px-7 shadow-xs"
            >
              {t('hero.ctaCatalogue')}
              <Image
                src={ASSETS.home.iconSend}
                alt="Catalogue"
                width={20}
                height={20}
                className="h-4.5 w-4.5 object-contain"
              />
            </Link>
          </div>
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

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
    <section className="relative flex w-full items-center overflow-hidden bg-slate-50 aspect-auto sm:aspect-[16/9] md:aspect-[16/8] lg:aspect-[1440/500] xl:aspect-[1440/540] min-h-[380px] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[460px] xl:min-h-[500px]">
      {/* Full-width background image */}
      <div className="absolute inset-0 w-full h-full select-none">
        <Image
          src={ASSETS.home.hero}
          alt="ULINK Industrial Consumable Materials"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="mx-auto relative z-10 flex h-full w-full max-w-[1440px] items-center justify-center sm:justify-start px-4 sm:px-8 lg:px-[80px] py-[28px]">
        {/* Content Container (radius 12px theo thiết kế) */}
        <div className="relative flex w-full max-w-full lg:w-[672px] lg:max-w-[672px] lg:min-h-[538px] flex-col justify-between rounded-[5px] bg-white p-6 sm:p-8 lg:p-[48px] gap-[25px] shadow-[0px_20px_40px_-10px_rgba(0,0,0,0.102)] backdrop-blur-md opacity-[0.8]">
          <div className="flex flex-col gap-3">
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold uppercase tracking-wider text-brand">
              {t('hero.eyebrowTop')}
            </p>

            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-extrabold uppercase tracking-wider text-primary">
              {t('hero.eyebrowSub')}
            </p>

            <h1 className="mt-1 text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold leading-[1.12] tracking-tight text-primary">
              {t('hero.title')}
            </h1>

            <p className="mt-1 text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed text-slate-600 font-medium">
              {t('hero.description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <Link
              href="/quick-order"
              className="inline-flex h-12 lg:h-[50px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-[5px] bg-brand px-7 text-[15px] lg:text-[16px] font-bold text-white shadow-sm transition-all hover:bg-brand-strong"
            >
              {t('hero.ctaRfq')}
              <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
            </Link>
            <Link
              href="/resources"
              onClick={handleCatalogueClick}
              className="inline-flex h-12 lg:h-[50px] w-full sm:w-auto items-center justify-center gap-2.5 border border-brand bg-white/40 backdrop-blur-xs rounded-[5px] text-[15px] lg:text-[16px] font-bold text-brand transition-colors hover:bg-brand/10 px-7"
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
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-[5px] border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-500/20">
          <Clock className="h-5 w-5 text-amber-500 shrink-0 animate-pulse" />
          <span className="text-sm font-semibold">{t('hero.cataloguePending')}</span>
        </div>
      )}
    </section>
  );
}

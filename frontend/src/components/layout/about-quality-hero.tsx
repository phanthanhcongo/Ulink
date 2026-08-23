'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ShieldCheck, BadgeCheck, TrendingUp, Scale, Download, ExternalLink, Clock } from 'lucide-react';
import { ASSETS } from '@/lib/assets';

export function AboutQualityHero() {
  const t = useTranslations('aboutQuality.hero');
  const [showToast, setShowToast] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const pillars = [
    {
      key: 'safety',
      icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.4} />
    },
    {
      key: 'reliability',
      icon: <BadgeCheck className="h-6 w-6" strokeWidth={1.4} />
    },
    {
      key: 'improvement',
      icon: <TrendingUp className="h-6 w-6" strokeWidth={1.4} />
    },
    {
      key: 'compliance',
      icon: <Scale className="h-6 w-6" strokeWidth={1.4} />
    }
  ];

  return (
    <section className="relative overflow-hidden rounded-[3px] border border-border/40">
      {/* Background image */}
      <Image
        src={ASSETS.about.qualityLab}
        alt="Quality control laboratory — ULink Industries"
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      {/* Fade overlay — solid on text side, fully transparent on image side */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(to right, #F8F9FC 0%, #F8F9FC 35%, rgba(248,249,252,0) 55%)'
        }}
      />

      {/* Content on top */}
      <div className="relative z-10 px-6 py-8 sm:px-8 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Text content */}
          <div className="flex flex-col lg:max-w-[480px]">
            {/* Eyebrow */}
            <p className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-brand">{t('eyebrow')}</p>

            {/* Heading */}
            <h1 className="mt-4 text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold leading-[1.35] text-primary">
              <span className="block">{t('titleLine1')}</span>
              <span className="block">{t('titleLine2')}</span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[420px] text-[13px] sm:text-[14px] leading-relaxed text-foreground/60">
              {t('desc1')}
            </p>
            <p className="mt-2 max-w-[420px] text-[13px] sm:text-[14px] leading-relaxed text-foreground/50">
              {t('desc2')}
            </p>

            {/* Download button */}
            <a
              href="#"
              onClick={handleDownloadClick}
              className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-[3px] border border-border bg-white px-5 py-2.5 text-[13px] sm:text-[14px] font-medium text-brand transition-colors hover:bg-background"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={1.6} />
              {t('downloadBtn')}
              <ExternalLink className="h-3 w-3 opacity-60" strokeWidth={1.5} />
            </a>
          </div>

          {/* Right: 2x2 Pillar grid card */}
          <div className="w-full rounded-[3px] border border-border/40 bg-white p-6 lg:w-[360px]">
            <div className="grid h-full grid-cols-2 gap-x-6 gap-y-6">
              {pillars.map((pillar) => (
                <div key={pillar.key} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/40 bg-background text-brand">
                    {pillar.icon}
                  </div>
                  <div>
                    <p className="text-[15px] sm:text-[16px] lg:text-[18px] font-bold text-primary">
                      {t(`pillars.${pillar.key}.title`)}
                    </p>
                    <p className="mt-1.5 text-[13px] sm:text-[14px] leading-relaxed text-foreground/50">
                      {t(`pillars.${pillar.key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-[3px] border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-500/20">
          <Clock className="h-5 w-5 text-amber-500 shrink-0 animate-pulse" />
          <span className="text-sm font-semibold">{t('policyPending')}</span>
        </div>
      )}
    </section>
  );
}



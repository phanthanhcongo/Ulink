'use client';

import React, { useState } from 'react';
import { ArrowRight, PhoneCall, Mail, Send, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function CtaBanner({
  containerClassName = 'max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16'
}: {
  containerClassName?: string;
}) {
  const tCta = useTranslations('ctaBanner');
  const [showToast, setShowToast] = useState(false);

  const handleCatalogueClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <section className="w-full bg-[#3B82F6] text-white">
      <div className={`mx-auto w-full py-10 sm:py-12 lg:py-16 xl:py-20 ${containerClassName}`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* ── CỘT BÊN TRÁI: BÁO GIÁ NHANH 24H (7/12 COLS) ── */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-[13px] font-medium text-white/80 sm:text-[14px]">
              {tCta('eyebrow')}
            </p>
            <h2 className="mt-4 text-[22px] font-extrabold tracking-tight text-white sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] leading-tight">
              {tCta('title')}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/90 sm:text-[16px] lg:text-[18px] max-w-[720px]">
              {tCta('description')}
            </p>

            {/* Action Buttons Row */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Link
                href="/quick-order"
                className="inline-flex items-center justify-center gap-3 rounded-[3px] bg-white px-6 py-2.5 text-[14px] font-bold text-brand shadow-lg transition-all hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:bg-slate-50 w-full sm:w-auto h-11 sm:h-12 lg:h-11.5 xl:h-12 xl:px-8 xl:text-[15px]"
              >
                {tCta('ctaRfq')}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/resources"
                onClick={handleCatalogueClick}
                className="inline-flex items-center justify-center gap-3 rounded-[3px] border border-white/40 bg-transparent px-6 py-2.5 text-[14px] font-bold text-white transition-all hover:bg-white/10 hover:border-white w-full sm:w-auto h-11 sm:h-12 lg:h-11.5 xl:h-12 xl:px-8 xl:text-[15px]"
              >
                {tCta('ctaCatalogue')}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ── CỘT BÊN PHẢI: LIÊN HỆ TRỰC TIẾP (5/12 COLS WITH VERTICAL BORDER) ── */}
          <div className="flex flex-col justify-center border-t border-white/20 pt-10 lg:border-t-0 lg:border-l lg:border-white/30 lg:pt-0 lg:pl-12 xl:pl-16 lg:col-span-5">
            <h3 className="text-[16px] font-bold text-white sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]">
              {tCta('directContactTitle')}
            </h3>

            {/* 3 Contact Info Items */}
            <div className="mt-8 flex flex-col gap-6">
              {/* Item 1: Phone */}
              <div className="flex items-start gap-4 border-b border-white/20 pb-5">
                <PhoneCall className="h-6 w-6 shrink-0 text-white mt-1" aria-hidden="true" />
                <div>
                  <p className="text-[16px] font-extrabold text-white sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]">
                    {tCta('phone')}
                  </p>
                  <p className="mt-1 text-[12px] text-white/75 sm:text-[13px]">
                    {tCta('phoneHours')}
                  </p>
                </div>
              </div>

              {/* Item 2: Email */}
              <div className="flex items-start gap-4 border-b border-white/20 pb-5">
                <Mail className="h-6 w-6 shrink-0 text-white mt-1" aria-hidden="true" />
                <div>
                  <p className="text-[16px] font-extrabold text-white sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]">
                    {tCta('email')}
                  </p>
                  <p className="mt-1 text-[12px] text-white/75 sm:text-[13px]">
                    {tCta('emailSla')}
                  </p>
                </div>
              </div>

              {/* Item 3: IZ Connection */}
              <div className="flex items-start gap-4">
                <Send className="h-6 w-6 shrink-0 text-white mt-1" aria-hidden="true" />
                <div>
                  <p className="text-[16px] font-extrabold text-white sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]">
                    {tCta('izConnect')}
                  </p>
                  <p className="mt-1 text-[12px] text-white/75 sm:text-[13px]">{tCta('izList')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-[3px] border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-500/20">
          <Clock className="h-5 w-5 text-amber-500 shrink-0 animate-pulse" />
          <span className="text-sm font-semibold">{tCta('cataloguePending')}</span>
        </div>
      )}
    </section>
  );
}

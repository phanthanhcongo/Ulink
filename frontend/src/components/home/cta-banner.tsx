'use client';

import React, { useState } from 'react';
import { ArrowRight, PhoneCall, Mail, Send, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function CtaBanner({
  containerClassName = 'page-container'
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
      <div className={`w-full py-8 sm:py-8 lg:py-8 xl:py-8 ${containerClassName}`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* ── CỘT BÊN TRÁI: BÁO GIÁ NHANH 24H (7/12 COLS) ── */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-body-regular font-medium text-white/80">
              {tCta('eyebrow')}
            </p>
            <h2 className="text-section-title mt-4 font-extrabold text-white">
              {tCta('title')}
            </h2>
            <p className="mt-5 text-body-large leading-relaxed text-white/90 max-w-[720px]">
              {tCta('description')}
            </p>

            {/* Action Buttons Row */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Link
                href="/quick-order"
                className="inline-flex items-center justify-center gap-3 rounded-[3px] bg-white px-6 py-2.5 text-body-large font-bold text-brand shadow-lg transition-all hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:bg-slate-50 w-full sm:w-auto h-11 sm:h-12 lg:h-11.5 xl:h-12 xl:px-8"
              >
                {tCta('ctaRfq')}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/resources"
                onClick={handleCatalogueClick}
                className="inline-flex items-center justify-center gap-3 rounded-[3px] border border-white/40 bg-transparent px-6 py-2.5 text-body-large font-bold text-white transition-all hover:bg-white/10 hover:border-white w-full sm:w-auto h-11 sm:h-12 lg:h-11.5 xl:h-12 xl:px-8"
              >
                {tCta('ctaCatalogue')}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ── CỘT BÊN PHẢI: LIÊN HỆ TRỰC TIẾP (5/12 COLS WITH VERTICAL BORDER) ── */}
          <div className="flex flex-col justify-center border-t border-white/20 pt-10 lg:border-t-0 lg:border-l lg:border-white/30 lg:pt-0 lg:pl-12 xl:pl-16 lg:col-span-5">
            <h3 className="text-card-title text-white">
              {tCta('directContactTitle')}
            </h3>

            {/* 3 Contact Info Items */}
            <div className="mt-8 flex flex-col gap-6">
              {/* Item 1: Phone */}
              <div className="flex items-start gap-4 border-b border-white/20 pb-5">
                <PhoneCall className="h-6 w-6 shrink-0 text-white mt-1" aria-hidden="true" />
                <div>
                  <p className="text-card-title font-extrabold text-white">
                    {tCta('phone')}
                  </p>
                  <p className="mt-1 text-caption-responsive text-white/75">
                    {tCta('phoneHours')}
                  </p>
                </div>
              </div>

              {/* Item 2: Email */}
              <div className="flex items-start gap-4 border-b border-white/20 pb-5">
                <Mail className="h-6 w-6 shrink-0 text-white mt-1" aria-hidden="true" />
                <div>
                  <p className="text-card-title font-extrabold text-white">
                    {tCta('email')}
                  </p>
                  <p className="mt-1 text-caption-responsive text-white/75">
                    {tCta('emailSla')}
                  </p>
                </div>
              </div>

              {/* Item 3: IZ Connection */}
              <div className="flex items-start gap-4">
                <Send className="h-6 w-6 shrink-0 text-white mt-1" aria-hidden="true" />
                <div>
                  <p className="text-card-title font-extrabold text-white">
                    {tCta('izConnect')}
                  </p>
                  <p className="mt-1 text-caption-responsive text-white/75">{tCta('izList')}</p>
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
          <span className="text-body-regular font-semibold">{tCta('cataloguePending')}</span>
        </div>
      )}
    </section>
  );
}

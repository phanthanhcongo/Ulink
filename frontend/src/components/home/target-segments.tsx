'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, Building2, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function TargetSegments() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-slate-50/50 border-t border-b border-slate-100 font-sans select-none">

      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. MOBILE VIEW (Screens < 768px: md breakpoint)          */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="block md:hidden px-4 py-10">
        {/* Mobile Header: Centered 2-line equal size */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[20px] font-extrabold tracking-tight text-blue-600 leading-tight block">
            {t('targetSegments.sectionTitle')}
          </span>
          <h2 className="text-[20px] font-extrabold tracking-tight text-slate-900 leading-tight">
            {t('targetSegments.sectionSubTitle')}
          </h2>
        </div>

        {/* Mobile Grid: 1 column, flat white cards, Unicode ticks, no detail links */}
        <div className="flex flex-col gap-5">
          {/* Card 1: Doanh nghiệp FDI */}
          <div className="rounded-[4px] border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-[17px] font-bold text-slate-900 leading-tight">
              {t('targetSegments.fdiTitle')}
            </h3>
            <p className="mt-2.5 text-[12.5px] text-slate-500 font-medium leading-relaxed">
              {t('targetSegments.fdiDescMobile')}
            </p>
            <ul className="mt-5 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-extrabold text-[14px] leading-none select-none">✓</span>
                <span className="text-[13px] font-medium text-slate-700 leading-snug">
                  {t('targetSegments.fdiCheck1Mobile')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-extrabold text-[14px] leading-none select-none">✓</span>
                <span className="text-[13px] font-medium text-slate-700 leading-snug">
                  {t('targetSegments.fdiCheck2Mobile')}
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: Doanh nghiệp Sản xuất Trong nước */}
          <div className="rounded-[4px] border border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="text-[17px] font-bold text-slate-900 leading-tight">
              {t('targetSegments.smeTitleMobile')}
            </h3>
            <p className="mt-2.5 text-[12.5px] text-slate-500 font-medium leading-relaxed">
              {t('targetSegments.smeDescMobile')}
            </p>
            <ul className="mt-5 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-extrabold text-[14px] leading-none select-none">✓</span>
                <span className="text-[13px] font-medium text-slate-700 leading-snug">
                  {t('targetSegments.smeCheck1Mobile')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-900 font-extrabold text-[14px] leading-none select-none">✓</span>
                <span className="text-[13px] font-medium text-slate-700 leading-snug">
                  {t('targetSegments.smeCheck2Mobile')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. DESKTOP VIEW (Screens >= 768px: md breakpoint)        */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="hidden md:block mx-auto w-full max-w-[1440px] px-8 py-14 lg:px-12 xl:px-16 lg:py-16 xl:py-20">
        {/* Desktop Header: Centered 2-line equal size */}
        <div className="text-center max-w-3xl mx-auto space-y-1 sm:space-y-2 mb-10 sm:mb-12">
          <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-extrabold tracking-tight text-blue-600 leading-tight block">
            {t('targetSegments.sectionTitle')}
          </span>
          <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-extrabold tracking-tight text-slate-900 leading-tight">
            {t('targetSegments.sectionSubTitle')}
          </h2>
        </div>

        {/* Desktop Grid: 2 columns, grey headers, white bodies, blue circle ticks, detail links */}
        <div
          ref={ref}
          className="grid grid-cols-2 gap-6 lg:gap-8 xl:gap-10"
        >
          {/* CARD 1: DOANH NGHIỆP FDI */}
          <div
            className={`group overflow-hidden flex flex-col rounded-[3px] border border-slate-200 bg-white shadow-xs hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            style={{ transitionDelay: '0ms' }}
          >
            {/* Top Header Area: Light Background */}
            <div className="bg-[#F8FAFC] p-6 lg:p-8 border-b border-slate-200">
              {/* White Square Icon Box */}
              <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-white border border-slate-200 text-blue-600 shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-[20px] lg:text-[22px] font-bold text-slate-900 leading-tight">
                {t('targetSegments.fdiTitle')}
              </h3>
              <p className="mt-2 text-[13.5px] lg:text-[14px] text-slate-500 font-medium leading-relaxed">
                {t('targetSegments.fdiDesc')}
              </p>
            </div>

            {/* Bottom Content Area: White Background */}
            <div className="flex-1 bg-white p-6 lg:p-8 flex flex-col justify-between gap-6 lg:gap-8">
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[13.5px] lg:text-[14.5px] font-medium text-slate-700 leading-relaxed">
                    {t('targetSegments.fdiCheck1')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[13.5px] lg:text-[14.5px] font-medium text-slate-700 leading-relaxed">
                    {t('targetSegments.fdiCheck2')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[13.5px] lg:text-[14.5px] font-medium text-slate-700 leading-relaxed">
                    {t('targetSegments.fdiCheck3')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[13.5px] lg:text-[14.5px] font-medium text-slate-700 leading-relaxed">
                    {t('targetSegments.fdiCheck4')}
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/regional-hubs/cum-1"
                  className="inline-flex items-center gap-1.5 text-[13px] lg:text-[14px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {t('targetSegments.viewDetail')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 2: DOANH NGHIỆP SẢN XUẤT */}
          <div
            className={`group overflow-hidden flex flex-col rounded-[3px] border border-slate-200 bg-white shadow-xs hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            style={{ transitionDelay: '150ms' }}
          >
            {/* Top Header Area: Light Background */}
            <div className="bg-[#F8FAFC] p-6 lg:p-8 border-b border-slate-200">
              {/* White Square Icon Box */}
              <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-white border border-slate-200 text-blue-600 shadow-xs transition-transform duration-300 group-hover:scale-105">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-[20px] lg:text-[22px] font-bold text-slate-900 leading-tight">
                {t('targetSegments.smeTitle')}
              </h3>
              <p className="mt-2 text-[13.5px] lg:text-[14px] text-slate-500 font-medium leading-relaxed">
                {t('targetSegments.smeDesc')}
              </p>
            </div>

            {/* Bottom Content Area: White Background */}
            <div className="flex-1 bg-white p-6 lg:p-8 flex flex-col justify-between gap-6 lg:gap-8">
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[13.5px] lg:text-[14.5px] font-medium text-slate-700 leading-relaxed">
                    {t('targetSegments.smeCheck1')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[13.5px] lg:text-[14.5px] font-medium text-slate-700 leading-relaxed">
                    {t('targetSegments.smeCheck2')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[13.5px] lg:text-[14.5px] font-medium text-slate-700 leading-relaxed">
                    {t('targetSegments.smeCheck3')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[13.5px] lg:text-[14.5px] font-medium text-slate-700 leading-relaxed">
                    {t('targetSegments.smeCheck4')}
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href="/regional-hubs/cum-2"
                  className="inline-flex items-center gap-1.5 text-[13px] lg:text-[14px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {t('targetSegments.viewDetail')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

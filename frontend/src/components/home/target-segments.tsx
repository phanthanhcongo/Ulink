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
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-12 lg:py-16 xl:py-20 bg-slate-50/50 border-t border-b border-slate-100 font-sans">
      {/* ── SECTION HEADER ── */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 text-center mb-10 sm:mb-14">
        <span className="block text-[18px] sm:text-[20px] font-bold font-sans text-blue-600">
          {t('targetSegments.sectionTitle')}
        </span>
        <h2 className="mt-2 text-[22px] font-extrabold tracking-tight text-primary sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px]">
          {t('targetSegments.sectionSubTitle')}
        </h2>
      </div>

      {/* ── 2 CARDS GRID ── */}
      <div ref={ref} className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {/* CARD 1: DOANH NGHIỆP FDI */}
        <div className={`group overflow-hidden flex flex-col rounded-[3px] border border-slate-200 bg-white shadow-sm hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`} style={{ transitionDelay: '0ms' }}>
          {/* Card Top: Header Area (Light Background) */}
          <div className="bg-[#f4f7fc] p-6 sm:p-8 lg:p-10 border-b border-slate-200">
            {/* Icon box outline */}
            <div className="flex h-14 w-14 items-center justify-center rounded-[3px] bg-white border border-slate-200 text-blue-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Building2 className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="mt-5 text-[20px] sm:text-[22px] font-bold text-slate-900 leading-tight">
              {t('targetSegments.fdiTitle')}
            </h3>
            <p className="mt-2 text-[13.5px] sm:text-[14.5px] text-slate-500 font-medium leading-relaxed">
              {t('targetSegments.fdiDesc')}
            </p>
          </div>

          {/* Card Bottom: Checklist Area (White Background) */}
          <div className="flex-1 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-sm">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700 leading-relaxed">
                  {t('targetSegments.fdiCheck1')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-sm">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700 leading-relaxed">
                  {t('targetSegments.fdiCheck2')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-sm">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700 leading-relaxed">
                  {t('targetSegments.fdiCheck3')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-sm">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700 leading-relaxed">
                  {t('targetSegments.fdiCheck4')}
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/regional-hubs/cum-1"
                className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                {t('targetSegments.viewDetail')}
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* CARD 2: DOANH NGHIỆP SẢN XUẤT */}
        <div className={`group overflow-hidden flex flex-col rounded-[3px] border border-slate-200 bg-white shadow-sm hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`} style={{ transitionDelay: '150ms' }}>
          {/* Card Top: Header Area (Light Background) */}
          <div className="bg-[#f4f7fc] p-6 sm:p-8 lg:p-10 border-b border-slate-200">
            {/* Icon box outline */}
            <div className="flex h-14 w-14 items-center justify-center rounded-[3px] bg-white border border-slate-200 text-blue-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Settings className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="mt-5 text-[20px] sm:text-[22px] font-bold text-slate-900 leading-tight">
              {t('targetSegments.smeTitle')}
            </h3>
            <p className="mt-2 text-[13.5px] sm:text-[14.5px] text-slate-500 font-medium leading-relaxed">
              {t('targetSegments.smeDesc')}
            </p>
          </div>

          {/* Card Bottom: Checklist Area (White Background) */}
          <div className="flex-1 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-sm">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700 leading-relaxed">
                  {t('targetSegments.smeCheck1')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-sm">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700 leading-relaxed">
                  {t('targetSegments.smeCheck2')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-sm">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700 leading-relaxed">
                  {t('targetSegments.smeCheck3')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 shadow-sm">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700 leading-relaxed">
                  {t('targetSegments.smeCheck4')}
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/regional-hubs/cum-2"
                className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                {t('targetSegments.viewDetail')}
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

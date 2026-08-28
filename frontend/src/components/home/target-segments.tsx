'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section className="w-full py-10 sm:py-14 md:py-16 lg:py-20 bg-slate-50/50 border-t border-b border-slate-100 font-sans">
      {/* ── SECTION HEADER ── */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 text-left mb-8 sm:mb-12">
        <span className="block text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-600">
          {t('targetSegments.sectionTitle')}
        </span>
        <h2 className="mt-2 text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold tracking-tight text-slate-900 leading-snug">
          {t('targetSegments.sectionSubTitle')}
        </h2>
      </div>

      {/* ── 2 CARDS GRID ── */}
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
      >
        {/* CARD 1: DOANH NGHIỆP FDI */}
        <div
          className={`group overflow-hidden flex flex-col justify-between rounded-[4px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-300 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          <div>
            <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-slate-900 leading-tight">
              {t('targetSegments.fdiTitle')}
            </h3>
            <p className="mt-3 text-[13px] sm:text-[14px] md:text-[14.5px] text-slate-500 font-medium leading-relaxed">
              {t('targetSegments.fdiDesc')}
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="text-slate-900 font-extrabold text-[15px] sm:text-[16px] leading-none select-none">✓</span>
                <span className="text-[13px] sm:text-[14px] md:text-[14.5px] font-medium text-slate-700 leading-snug">
                  {t('targetSegments.fdiCheck1')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-slate-900 font-extrabold text-[15px] sm:text-[16px] leading-none select-none">✓</span>
                <span className="text-[13px] sm:text-[14px] md:text-[14.5px] font-medium text-slate-700 leading-snug">
                  {t('targetSegments.fdiCheck2')}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-2">
            <Link
              href="/regional-hubs/cum-1"
              className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t('targetSegments.viewDetail')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* CARD 2: DOANH NGHIỆP SẢN XUẤT */}
        <div
          className={`group overflow-hidden flex flex-col justify-between rounded-[4px] border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-300 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <div>
            <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold text-slate-900 leading-tight">
              {t('targetSegments.smeTitle')}
            </h3>
            <p className="mt-3 text-[13px] sm:text-[14px] md:text-[14.5px] text-slate-500 font-medium leading-relaxed">
              {t('targetSegments.smeDesc')}
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="text-slate-900 font-extrabold text-[15px] sm:text-[16px] leading-none select-none">✓</span>
                <span className="text-[13px] sm:text-[14px] md:text-[14.5px] font-medium text-slate-700 leading-snug">
                  {t('targetSegments.smeCheck1')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-slate-900 font-extrabold text-[15px] sm:text-[16px] leading-none select-none">✓</span>
                <span className="text-[13px] sm:text-[14px] md:text-[14.5px] font-medium text-slate-700 leading-snug">
                  {t('targetSegments.smeCheck2')}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-2">
            <Link
              href="/regional-hubs/cum-2"
              className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t('targetSegments.viewDetail')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

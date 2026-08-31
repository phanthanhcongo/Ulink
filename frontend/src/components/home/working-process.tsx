'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function WorkingProcess() {
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

  const steps = [
    { step: 1, iconSrc: '/images/icons/figma/_32-document-requirements0.svg' },
    { step: 2, iconSrc: '/images/icons/figma/_32-user-multiple0.svg' },
    { step: 3, iconSrc: '/images/icons/figma/_32-settings-check0.svg' },
    { step: 4, iconSrc: '/images/icons/figma/_32-shuttle0.svg' }
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 border-t border-slate-100">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-[20px] sm:text-[28px] lg:text-[28px] font-bold tracking-tight text-blue-600 leading-tight sm:leading-[36px] lg:leading-[36px] block">
            {t('workingProcess.sectionTitle')}
          </span>
          <p className="text-[13px] sm:text-[18px] lg:text-[18px] font-normal text-slate-600 leading-relaxed sm:leading-[28px] lg:leading-[28px]">
            {t('workingProcess.sectionSubTitle')}
          </p>
        </div>

        {/* ── 4 STEP CARDS GRID ── */}
        <div
          ref={ref}
          className="mt-10 sm:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {steps.map(({ step, iconSrc }, idx) => (
            <div
              key={step}
              className={`group flex flex-col justify-between rounded-[3px] border border-slate-200 bg-white p-4 sm:p-5 lg:p-6 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div>
                {/* Top Row: Left Icon + Right Text (Step Number & Step Title) */}
                <div className="flex items-center gap-3.5 sm:gap-4 mb-4">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-50/80 text-blue-600 shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Image
                      src={iconSrc}
                      alt={`Step ${step} Icon`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-slate-500">
                      {t(`workingProcess.step${step}Number` as any)}
                    </span>
                    <h3 className="mt-0.5 text-[15px] sm:text-[18px] lg:text-[20px] font-bold text-slate-900 leading-snug sm:leading-[24px] group-hover:text-blue-600 transition-colors">
                      {t(`workingProcess.step${step}Title` as any)}
                    </h3>
                  </div>
                </div>

                {/* Description Text */}
                <p className="text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed sm:leading-[20px] lg:leading-[24px] text-slate-600 font-normal">
                  {t(`workingProcess.step${step}Desc` as any)}
                </p>
              </div>

              {/* KPI Footer */}
              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[12.5px] sm:text-[13px] font-normal text-slate-500">
                  {t(`workingProcess.step${step}KpiLabel` as any)}
                </span>
                <span className="text-[13.5px] sm:text-[14px] lg:text-[14px] font-bold text-blue-600">
                  {t(`workingProcess.step${step}KpiValue` as any)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

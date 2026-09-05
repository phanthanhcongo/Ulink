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
    <section className="w-full bg-[#f3f7fc] py-8 sm:py-8 lg:py-8 border-t border-slate-200/60">
      <div className="page-container">
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-section-title font-bold text-brand leading-tight block">
            {t('workingProcess.sectionTitle')}
          </span>
          <p className="text-body-large font-normal text-slate-600 leading-relaxed">
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
              className={`group flex flex-col justify-between rounded-[2px] border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-6 xl:p-7 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div>
                {/* Top Row: Left Icon + Right Text (Step Number & Step Title) */}
                <div className="flex items-center gap-3.5 sm:gap-4 mb-4">
                  <div className="flex h-12 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#eff5fe] text-brand shrink-0 border border-[#d0e2fb] transition-colors duration-300 group-hover:bg-brand group-hover:border-brand group-hover:text-white">
                    <Image
                      src={iconSrc}
                      alt={`Step ${step} Icon`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-caption-responsive font-semibold text-brand">
                      {t(`workingProcess.step${step}Number` as any)}
                    </span>
                    <h3 className="mt-0.5 text-card-title font-bold text-slate-900 leading-snug group-hover:text-brand transition-colors">
                      {t(`workingProcess.step${step}Title` as any)}
                    </h3>
                  </div>
                </div>

                {/* Description Text */}
                <p className="text-body-regular leading-relaxed text-slate-600 font-normal">
                  {t(`workingProcess.step${step}Desc` as any)}
                </p>
              </div>

              {/* KPI Footer */}
              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-caption-responsive font-normal text-slate-500">
                  {t(`workingProcess.step${step}KpiLabel` as any)}
                </span>
                <span className="text-caption-responsive font-bold text-brand bg-[#eff5fe] px-2.5 py-0.5 rounded-[2px] border border-[#d0e2fb]">
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

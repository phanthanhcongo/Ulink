'use client';

import { useState, useEffect, useRef } from 'react';
import { FileCheck, UserCheck, Settings, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function WorkingProcess() {
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

  const steps = [
    { step: 1, icon: FileCheck },
    { step: 2, icon: UserCheck },
    { step: 3, icon: Settings },
    { step: 4, icon: Truck }
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-10 lg:py-12 xl:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* ── SECTION HEADER BAR (CĂN GIỮA) ── */}
        <div className="text-center mb-8 max-w-3xl mx-auto space-y-2">
          <span className="text-xs sm:text-sm font-bold text-[#0F62FE] uppercase tracking-widest block">
            {t('workingProcess.sectionTitle')}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('workingProcess.sectionSubTitle')}
          </h2>
        </div>

        {/* ── 4 STEP CARDS GRID ── */}
        <div ref={ref} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ step, icon: IconComponent }, idx) => (
            <div
              key={step}
              className={`group relative flex flex-col rounded-[3px] border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] sm:p-6 lg:p-5 xl:p-6 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Tầng 1: Icon tròn & Tiêu đề nằm ngang */}
              <div className="flex items-center gap-3">
                {/* Vòng tròn bọc icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                  <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                </div>
                
                {/* Khối Text (Số bước & Tên bước) */}
                <div className="flex flex-col">
                  <p className="text-[11px] font-semibold text-slate-500 sm:text-[12px]">
                    {t(`workingProcess.step${step}Number` as any)}
                  </p>
                  <h3 className="mt-0.5 text-[15px] font-bold text-slate-900 leading-tight transition-colors duration-300 group-hover:text-brand sm:text-[16px]">
                    {t(`workingProcess.step${step}Title` as any)}
                  </h3>
                </div>
              </div>

              {/* Tầng 2: Mô tả chi tiết */}
              <p className="mt-5 text-[13px] leading-relaxed text-slate-600 sm:text-[14px]">
                {t(`workingProcess.step${step}Desc` as any)}
              </p>

              {/* Tầng 3: Footer KPI */}
              <div className="mt-6 mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-[12px] font-semibold text-slate-500 sm:text-[13px]">
                  {t(`workingProcess.step${step}KpiLabel` as any)}
                </span>
                <span className="text-[14px] font-bold text-brand sm:text-[15px]">
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

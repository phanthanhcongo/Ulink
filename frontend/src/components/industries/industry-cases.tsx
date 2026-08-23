'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { IndustryData } from './types';

interface IndustryCasesProps {
  industryData: IndustryData;
  locale: string;
}

export function IndustryCases({ industryData, locale }: IndustryCasesProps) {
  return (
    <section id="cases" className="scroll-mt-36 pt-6 border-t border-slate-100 space-y-6">
      <h3 className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-primary">
        {industryData.casesTitle}
      </h3>

      <div className="grid gap-6 sm:grid-cols-3">
        {industryData.cases.map((cs, idx) => (
          <div key={idx} className="flex gap-4 items-start bg-transparent">
            <div className="relative w-24 h-18 sm:w-28 sm:h-20 shrink-0 overflow-hidden bg-slate-50 border border-slate-100">
              <Image src={cs.image} alt={cs.title} fill className="object-cover" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[15px] sm:text-[16px] lg:text-[18px] font-extrabold text-primary leading-snug">
                {cs.title}
              </h4>
              <p className="text-[12px] sm:text-[13px] text-slate-400 font-semibold leading-relaxed">
                {cs.description}
              </p>
              <div className="pt-1">
                <Link
                  href="/about"
                  className="text-[12px] sm:text-[13px] font-bold text-brand inline-flex items-center gap-1 hover:underline"
                >
                  {locale === 'vi'
                    ? 'Xem chi tiết'
                    : locale === 'ja'
                      ? '詳細を見る'
                      : 'View details'}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export interface DocCardProps {
  num?: number;
  category: string;
  title: string;
  meta: string;
  icon: string;
  onClick: (e: React.MouseEvent) => void;
}

const MOBILE_THEMES = [
  {
    cardBg: 'bg-[#F0F5FF] sm:bg-white',
    border: 'border border-blue-100/80 border-l-[4px] border-l-blue-600 sm:border-border sm:border-l-border',
    iconBg: 'bg-blue-100/80 sm:bg-transparent',
    arrowColor: 'text-blue-600',
  },
  {
    cardBg: 'bg-[#F0FDF4] sm:bg-white',
    border: 'border border-emerald-100/80 border-l-[4px] border-l-emerald-500 sm:border-border sm:border-l-border',
    iconBg: 'bg-emerald-100/80 sm:bg-transparent',
    arrowColor: 'text-emerald-600',
  },
  {
    cardBg: 'bg-[#FFFBEB] sm:bg-white',
    border: 'border border-amber-100/80 border-l-[4px] border-l-amber-500 sm:border-border sm:border-l-border',
    iconBg: 'bg-amber-100/80 sm:bg-transparent',
    arrowColor: 'text-amber-600',
  },
  {
    cardBg: 'bg-[#F5F3FF] sm:bg-white',
    border: 'border border-purple-100/80 border-l-[4px] border-l-purple-500 sm:border-border sm:border-l-border',
    iconBg: 'bg-purple-100/80 sm:bg-transparent',
    arrowColor: 'text-purple-600',
  },
];

export function DocCard({ num = 1, category, title, meta, icon, onClick }: DocCardProps) {
  const themeIndex = (num - 1) % MOBILE_THEMES.length;
  const theme = MOBILE_THEMES[themeIndex];

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col ${theme.border} ${theme.cardBg} rounded-[2px] p-4 shadow-sm sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] hover:bg-slate-50/20 hover:z-10`}
    >
      {/* Row 1: Icon & Top Right Arrow */}
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${theme.iconBg} sm:h-12 sm:w-12 sm:rounded-none sm:bg-transparent`}>
          <div className="relative h-5 w-5 sm:h-12 sm:w-12">
            <Image
              src={icon}
              alt="document icon"
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex items-center">
          <ArrowRight className={`h-5 w-5 ${theme.arrowColor} sm:hidden`} aria-hidden="true" />
          <ArrowUpRight className="hidden h-5 w-5 text-blue-600 opacity-60 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:block" aria-hidden="true" />
        </div>
      </div>

      {/* Row 2: Content (Category & Title) */}
      <div className="mt-3 flex-1 flex flex-col justify-start sm:mt-4">
        <p className="text-[12px] font-normal text-slate-500 sm:text-[12px] lg:text-[13px] xl:text-[14px]">
          {category}
        </p>
        <h4 className="mt-1 text-[14px] font-bold text-slate-900 leading-snug sm:mt-1.5 sm:text-[15px] sm:leading-[22px] lg:text-[16px] lg:leading-[24px] xl:text-[18px] xl:leading-[26px] group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h4>
      </div>

      {/* Row 3: Footer Metadata */}
      <div className="mt-3 sm:mt-4">
        <p className="text-[12px] font-normal text-slate-500 sm:text-[12px] lg:text-[13px] xl:text-[14px] lg:leading-[18px] xl:leading-[20px]">
          {meta}
        </p>
      </div>
    </div>
  );
}

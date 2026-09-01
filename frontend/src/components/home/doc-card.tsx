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

const cardThemes = [
  {
    // Theme 1: Blue
    mobileBg: 'bg-[#F0F6FF]',
    mobileBorder: 'border-l-4 border-l-[#1769E2] border-t border-r border-b border-blue-100/60',
    mobileIconBg: 'bg-[#DCEBFE]',
    mobileArrowColor: 'text-[#1769E2]',
  },
  {
    // Theme 2: Green
    mobileBg: 'bg-[#F0FDF4]',
    mobileBorder: 'border-l-4 border-l-[#12B76A] border-t border-r border-b border-emerald-100/60',
    mobileIconBg: 'bg-[#D1FAE5]',
    mobileArrowColor: 'text-[#12B76A]',
  },
  {
    // Theme 3: Amber / Yellow
    mobileBg: 'bg-[#FFFBEB]',
    mobileBorder: 'border-l-4 border-l-[#F59E0B] border-t border-r border-b border-amber-100/60',
    mobileIconBg: 'bg-[#FEF3C7]',
    mobileArrowColor: 'text-[#F59E0B]',
  },
  {
    // Theme 4: Purple
    mobileBg: 'bg-[#F5F3FF]',
    mobileBorder: 'border-l-4 border-l-[#8B5CF6] border-t border-r border-b border-purple-100/60',
    mobileIconBg: 'bg-[#EDE9FE]',
    mobileArrowColor: 'text-[#8B5CF6]',
  },
];

export function DocCard({ num = 1, category, title, meta, icon, onClick }: DocCardProps) {
  const themeIndex = (num - 1) % cardThemes.length;
  const theme = cardThemes[themeIndex];

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md 
        /* Mobile styling (< sm) */
        p-5 ${theme.mobileBg} ${theme.mobileBorder} rounded-[6px] shadow-xs min-h-[190px]
        /* Desktop & Tablet styling (>= sm) */
        sm:p-0 sm:bg-white sm:border sm:border-slate-200 sm:rounded-[3px] sm:shadow-sm sm:hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] sm:hover:scale-[1.01] sm:hover:z-10
      `}
    >
      {/* ── MOBILE VIEW (< sm) ── */}
      <div className="flex flex-col justify-between h-full sm:hidden">
        <div>
          {/* ROW 1: CIRCLE ICON & ARROW */}
          <div className="flex items-center justify-between">
            <div className={`flex h-11 w-11 items-center justify-center rounded-full ${theme.mobileIconBg} shrink-0`}>
              <Image
                src={icon}
                alt={title}
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </div>
            <ArrowRight
              className={`h-5 w-5 ${theme.mobileArrowColor} transition-transform duration-300 group-hover:translate-x-1`}
              aria-hidden="true"
            />
          </div>

          {/* ROW 2: CATEGORY & TITLE */}
          <div className="mt-4 flex flex-col">
            <span className="text-[12px] font-medium text-slate-500">
              {category}
            </span>
            <h4 className="mt-1 text-[15px] font-bold text-slate-900 leading-snug group-hover:text-brand transition-colors line-clamp-2">
              {title}
            </h4>
          </div>
        </div>

        {/* ROW 3: FOOTER META */}
        <div className="mt-4 pt-2">
          <span className="text-[12px] font-normal text-slate-500">
            {meta}
          </span>
        </div>
      </div>

      {/* ── DESKTOP & TABLET VIEW (>= sm) ── */}
      <div className="hidden sm:flex sm:flex-col sm:h-full sm:justify-between">
        <div>
          {/* ROW 1: ICON & TOP-RIGHT ARROW */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200">
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0">
              <Image
                src={icon}
                alt={title}
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <ArrowUpRight
              className="h-6 w-6 text-[#1769E2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>

          {/* ROW 2: CATEGORY & TITLE */}
          <div className="flex flex-col justify-start p-4 sm:p-5 border-b border-slate-200 min-h-[110px] sm:min-h-[120px]">
            <span className="text-[13px] sm:text-[14px] text-slate-500 font-normal">
              {category}
            </span>
            <h4 className="mt-3 text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-slate-900 leading-snug sm:leading-[24px] group-hover:text-[#1769E2] transition-colors line-clamp-2">
              {title}
            </h4>
          </div>
        </div>

        {/* ROW 3: FOOTER METADATA */}
        <div className="p-4 sm:p-5">
          <span className="text-[13px] sm:text-[14px] text-slate-500 font-normal">
            {meta}
          </span>
        </div>
      </div>
    </div>
  );
}

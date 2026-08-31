'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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
    bg: 'bg-[#F0F6FF]',
    border: 'border-l-4 border-l-[#1769E2] border-t border-r border-b border-blue-100/60',
    iconBg: 'bg-[#DCEBFE]',
    arrowColor: 'text-[#1769E2]',
  },
  {
    // Theme 2: Green
    bg: 'bg-[#F0FDF4]',
    border: 'border-l-4 border-l-[#12B76A] border-t border-r border-b border-emerald-100/60',
    iconBg: 'bg-[#D1FAE5]',
    arrowColor: 'text-[#12B76A]',
  },
  {
    // Theme 3: Amber / Yellow
    bg: 'bg-[#FFFBEB]',
    border: 'border-l-4 border-l-[#F59E0B] border-t border-r border-b border-amber-100/60',
    iconBg: 'bg-[#FEF3C7]',
    arrowColor: 'text-[#F59E0B]',
  },
  {
    // Theme 4: Purple
    bg: 'bg-[#F5F3FF]',
    border: 'border-l-4 border-l-[#8B5CF6] border-t border-r border-b border-purple-100/60',
    iconBg: 'bg-[#EDE9FE]',
    arrowColor: 'text-[#8B5CF6]',
  },
];

export function DocCard({ num = 1, category, title, meta, icon, onClick }: DocCardProps) {
  const themeIndex = (num - 1) % cardThemes.length;
  const theme = cardThemes[themeIndex];

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col justify-between p-5 sm:p-6 ${theme.bg} ${theme.border} rounded-[6px] shadow-xs cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md min-h-[190px] sm:min-h-[200px]`}
    >
      <div>
        {/* ── ROW 1: CIRCLE ICON & ARROW ── */}
        <div className="flex items-center justify-between">
          <div className={`flex h-11 w-11 items-center justify-center rounded-full ${theme.iconBg} shrink-0`}>
            <Image
              src={icon}
              alt={title}
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          </div>
          <ArrowRight
            className={`h-5 w-5 ${theme.arrowColor} transition-transform duration-300 group-hover:translate-x-1`}
            aria-hidden="true"
          />
        </div>

        {/* ── ROW 2: CATEGORY & TITLE ── */}
        <div className="mt-4 flex flex-col">
          <span className="text-[12px] sm:text-[13px] font-medium text-slate-500">
            {category}
          </span>
          <h4 className="mt-1 text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-slate-900 leading-snug group-hover:text-brand transition-colors line-clamp-2">
            {title}
          </h4>
        </div>
      </div>

      {/* ── ROW 3: FOOTER META ── */}
      <div className="mt-4 pt-2">
        <span className="text-[12px] sm:text-[13px] font-normal text-slate-500">
          {meta}
        </span>
      </div>
    </div>
  );
}

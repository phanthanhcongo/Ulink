'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export interface DocCardProps {
  num?: number;
  category: string;
  title: string;
  meta: string;
  icon: string;
  onClick: (e: React.MouseEvent) => void;
}

export function DocCard({ category, title, meta, icon, onClick }: DocCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col bg-white border border-slate-200 rounded-[3px] shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.01] hover:z-10"
    >
      {/* ── ROW 1: ICON & TOP-RIGHT ARROW ── */}
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

      {/* ── ROW 2: CATEGORY & TITLE ── */}
      <div className="flex flex-col justify-start p-4 sm:p-5 border-b border-slate-200 flex-1 min-h-[110px] sm:min-h-[120px]">
        <span className="text-[13px] sm:text-[14px] text-slate-500 font-normal">
          {category}
        </span>
        <h4 className="mt-3 text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-slate-900 leading-snug sm:leading-[24px] group-hover:text-[#1769E2] transition-colors line-clamp-2">
          {title}
        </h4>
      </div>

      {/* ── ROW 3: FOOTER METADATA ── */}
      <div className="p-4 sm:p-5">
        <span className="text-[13px] sm:text-[14px] text-slate-500 font-normal">
          {meta}
        </span>
      </div>
    </div>
  );
}

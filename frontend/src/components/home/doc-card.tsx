'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export interface DocCardProps {
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
      className="group relative flex flex-col border border-border bg-white p-4 shadow-sm sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] hover:bg-slate-50/20 hover:z-10"
    >
      {/* Row 1: Icon & Top Right Arrow */}
      <div className="flex items-center justify-between">
        <div className="relative h-12 w-12">
          <Image
            src={icon}
            alt="document icon"
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>
        <ArrowUpRight className="h-5 w-5 text-blue-600 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </div>

      {/* Row 2: Content (Category & Title) */}
      <div className="mt-4 flex-1 flex flex-col justify-start">
        <p className="text-[12px] font-normal text-slate-500 sm:text-[13px] lg:text-[16px]">
          {category}
        </p>
        <h4 className="mt-1.5 text-[14px] font-semibold text-slate-800 leading-snug sm:text-[15px] sm:font-bold sm:leading-[20px] lg:text-[16px] lg:leading-[24px] group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h4>
      </div>

      {/* Row 3: Footer Metadata */}
      <div className="mt-4">
        <p className="text-[12px] font-normal text-slate-400 sm:text-[13px] lg:text-[14px] lg:leading-[20px]">
          {meta}
        </p>
      </div>
    </div>
  );
}

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
      className="group flex flex-col border border-border bg-white p-4 shadow-sm sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:bg-slate-50/20 hover:z-10 relative"
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
        <p className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
          {category}
        </p>
        <h4 className="mt-2 text-sm sm:text-base font-extrabold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h4>
      </div>

      {/* Row 3: Footer Metadata */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-slate-500">
          {meta}
        </p>
      </div>
    </div>
  );
}

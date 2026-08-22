'use client';

import React from 'react';

export interface SupportCardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function SupportCard({ title, desc, icon: IconComp }: SupportCardProps) {
  return (
    <div className="group flex flex-col bg-white border border-slate-200 -ml-px -mt-px p-6 cursor-pointer transition-all duration-300 hover:bg-slate-50/20 hover:z-10 relative">
      <div className="flex h-10 w-10 items-center justify-start text-blue-600">
        <IconComp className="h-9 w-9 stroke-[1.5]" aria-hidden="true" />
      </div>
      <h4 className="mt-6 text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
        {title}
      </h4>
      <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium">
        {desc}
      </p>
    </div>
  );
}

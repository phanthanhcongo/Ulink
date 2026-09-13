'use client';

import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Activity,
  Utensils,
  Settings,
  Globe,
  Zap,
  Sparkles,
  Truck,
  CheckCircle2,
  Factory
} from 'lucide-react';
import { ValueProp } from './types';

// Map icon names to Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  Cpu,
  Activity,
  Utensils,
  ShieldCheck,
  Settings,
  Globe,
  Zap,
  Sparkles,
  Truck,
  CheckCircle2,
  Factory
};

interface IndustryValuePropsProps {
  valueProps: ValueProp[];
}

export function IndustryValueProps({ valueProps }: IndustryValuePropsProps) {
  return (
    <section className="w-full bg-[#E9EFF6] py-5 lg:py-6">
      <div className="page-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-[2px]">
          {valueProps.map((prop, idx) => {
            const PropIcon = iconMap[prop.iconName] || ShieldCheck;
            return (
              <div
                key={idx}
                className="group bg-white border border-[#DDE1E6] rounded-[3px] p-6 shadow-[0_4px_20px_-4px_rgba(6,26,54,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] hover:border-[#1769E2] flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EBF0F8] text-[#1769E2] border border-[#DBEAFE] transition-colors duration-300 group-hover:bg-[#1769E2] group-hover:border-[#1769E2] group-hover:text-white">
                  <PropIcon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[16px] font-bold text-[#141414] leading-snug group-hover:text-[#1769E2] transition-colors">{prop.title}</h3>
                  <p className="text-[14px] text-[#495057] font-normal leading-[20px]">{prop.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



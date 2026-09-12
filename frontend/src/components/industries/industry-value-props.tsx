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
    <section className="w-full bg-[#F2F4F8] border-y border-[#DDE1E6] py-10 lg:py-12">
      <div className="page-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, idx) => {
            const PropIcon = iconMap[prop.iconName] || ShieldCheck;
            return (
              <div
                key={idx}
                className="bg-white border border-[#DDE1E6] rounded-[3px] p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EBF0F8] text-[#1769E2] border border-[#DBEAFE]">
                  <PropIcon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[16px] font-bold text-[#141414] leading-snug">{prop.title}</h3>
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



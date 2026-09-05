'use client';

import React from 'react';
import {
  ChevronRight,
  ShieldCheck,
  Cpu,
  Activity,
  Utensils,
  Car,
  Sun,
  Shield,
  Settings,
  Globe,
  Sparkles,
  Zap,
  Truck,
  Factory
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { IndustryData } from './types';
import { Breadcrumb } from '@/components/ui/breadcrumb';

// Map icon names to Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  Cpu,
  Activity,
  Utensils,
  Car,
  Sun,
  Shield,
  Settings,
  Globe,
  Sparkles,
  Zap,
  Truck,
  ShieldCheck,
  Factory
};

interface IndustryHeroProps {
  industryData: IndustryData;
  locale: string;
  translations: any;
}

export function IndustryHero({ industryData, locale, translations }: IndustryHeroProps) {
  const HeroIcon = iconMap[industryData.iconName] || Cpu;

  return (
    <section className="w-full bg-white border-b border-slate-200/50 relative overflow-hidden min-h-[380px] md:min-h-[400px]">
      {/* Right Image Side */}
      <div className="hidden md:block absolute left-[50%] right-0 top-0 bottom-0 z-0">
        <Image
          src={industryData.bannerImage}
          alt={industryData.title}
          fill
          className="object-cover"
          priority
        />
        {/* White overlay gradient from left to right on top of the image to fade it into the white background */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      </div>

      {/* Inner Grid Alignment Wrapper */}
      <div className="page-container h-full flex flex-col md:flex-row items-stretch relative">
        {/* Left Content Side */}
        <div className="w-full md:w-[50%] lg:w-[45%] py-8 sm:py-10 lg:py-12 z-20 flex flex-col justify-between relative bg-white md:bg-transparent">
          {/* Breadcrumb Inside Hero Banner */}
          <Breadcrumb
            className="px-0 py-0 mx-0 max-w-none mb-6"
            items={[
              { label: translations.home, href: '/' },
              { label: translations.resources, href: '/resources' },
              { label: industryData.name }
            ]}
          />

          {/* Title & Icon Header */}
          <div className="flex items-start gap-4 sm:gap-6 mb-8">
            {/* Icon Container */}
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center bg-white border border-slate-100 shadow-md">
              <HeroIcon className="h-8 w-8 sm:h-10 sm:w-10 text-brand" />
            </div>
            <div className="space-y-2">
              <h1 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold tracking-tight leading-tight text-primary">
                {industryData.title}
              </h1>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-400 max-w-2xl font-semibold">
                {industryData.description}
              </p>
            </div>
          </div>

          {/* Value Propositions inside Hero Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {industryData.valueProps.map((prop, idx) => {
              const PropIcon = iconMap[prop.iconName] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className={`flex gap-3 items-start ${idx > 0 ? 'md:pl-6' : ''} ${idx > 0 ? 'pt-4 md:pt-0' : ''}`}
                >
                  <PropIcon className="h-6 w-6 text-brand shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-[13px] sm:text-[14px] font-bold text-primary leading-snug">
                      {prop.title}
                    </h4>
                    <p className="text-[12px] sm:text-[13px] text-slate-400 leading-relaxed font-semibold">
                      {prop.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


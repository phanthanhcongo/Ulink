'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export interface CaseStudyCardProps {
  num: number;
  category: string;
  title: string;
  description: string;
  image: string;
  avatar: string;
  authorName: string;
  authorRole: string;
  readMoreText: string;
}

export function CaseStudyCard({
  num,
  category,
  title,
  description,
  image,
  avatar,
  authorName,
  authorRole,
  readMoreText
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/resources/case-study-${num}`}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[3px] border border-border bg-white shadow-sm transition-all hover:z-10 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02]"
    >
      {/* Top Banner Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1769E2]/40 to-[#1769E2]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-5 xl:p-6">
        {/* Category */}
        <p className="text-[12px] font-bold text-slate-500 sm:text-[13px] lg:text-[13px] xl:text-[14px]">
          {category}
        </p>

        {/* Title */}
        <h3 className="mt-2 text-[15px] font-bold leading-snug text-slate-900 sm:text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] group-hover:text-brand transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[13px] text-slate-600 leading-relaxed line-clamp-4 sm:text-[14px]">
          {description}
        </p>

        {/* Author Section */}
        <div className="mt-auto pt-5 flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-50">
            <Image
              src={avatar}
              alt={authorName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-800 leading-tight">
              {authorName}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {authorRole}
            </p>
          </div>
        </div>

        {/* Read More Link */}
        <div className="pt-6">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand group-hover:text-brand-strong transition-colors">
            {readMoreText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

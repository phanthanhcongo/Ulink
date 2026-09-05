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
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[3px] border border-slate-200 bg-white shadow-xs transition-all duration-300 card-hover-standard"
    >
      {/* Top Banner Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-5 xl:p-6">
        {/* Category */}
        <p className="text-caption-responsive font-medium text-slate-600">
          {category}
        </p>

        {/* Title */}
        <h3 className="mt-2 text-body-large font-bold leading-snug text-slate-900 group-hover:text-brand transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-body-regular text-slate-600 font-normal leading-relaxed line-clamp-4">
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
            <p className="text-body-regular font-medium text-slate-800 leading-tight">
              {authorName}
            </p>
            <p className="text-caption-responsive font-normal text-slate-500 mt-0.5">
              {authorRole}
            </p>
          </div>
        </div>

        {/* Read More Link */}
        <div className="pt-6">
          <span className="inline-flex items-center gap-2 text-body-regular font-semibold text-brand group-hover:text-brand-strong transition-colors">
            {readMoreText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

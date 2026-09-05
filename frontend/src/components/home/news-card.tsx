'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export interface NewsCardProps {
  slug: string;
  date: string;
  title: string;
  image: string;
  readMoreText: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export function NewsCard({ slug, date, title, image, readMoreText, category, author }: NewsCardProps) {
  const [displayTitle, displayDesc] = title.includes(' - ')
    ? title.split(' - ')
    : [title, ''];

  return (
    <Link
      href={`/resources/news/${slug}`}
      className="ui-card-hover flex flex-col bg-white border border-slate-200 rounded-[4px] overflow-hidden shadow-xs transition-all duration-300 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]"
    >
      {/* Top Article Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
        <Image
          src={image}
          alt="News Article Image"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 text-left">
        {/* Category & Date */}
        <div className="flex items-center gap-2 text-caption-responsive font-semibold text-slate-600 mb-2">
          <span className="text-blue-600 font-bold uppercase tracking-tight">{category}</span>
          <span>•</span>
          <span>{date}</span>
        </div>

        {/* News Article Title */}
        <h4 className="text-body-large font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 line-clamp-2 min-h-[48px]">
          {displayTitle}
        </h4>

        {/* Short Description */}
        {displayDesc && (
          <p className="mt-3 text-body-regular leading-relaxed text-slate-600 font-normal line-clamp-3 flex-1">
            {displayDesc}
          </p>
        )}
        {/* Author Info Block */}
        <div className="mt-6 pt-5 flex items-center gap-3">
          <div className="relative w-10 h-10 overflow-hidden shrink-0 bg-slate-100 rounded-full border border-slate-200">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-body-regular font-semibold text-slate-800 truncate">{author.name}</span>
            <span className="text-caption-responsive font-medium text-slate-500 truncate mt-0.5">{author.role}</span>
          </div>
        </div>

        {/* Card Footer "Read More" */}
        <div className="mt-6 pt-4 flex items-center justify-between mt-auto">
          <span className="text-body-regular font-semibold sm:font-bold text-blue-600 transition-colors group-hover:text-blue-700 inline-flex items-center gap-1.5">
            {readMoreText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

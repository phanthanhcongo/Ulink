'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export interface NewsCardProps {
  num: number;
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

export function NewsCard({ num, date, title, image, readMoreText, category, author }: NewsCardProps) {
  const [displayTitle, displayDesc] = title.includes(' - ')
    ? title.split(' - ')
    : [title, ''];

  return (
    <Link
      href={`/resources/news-${num}`}
      className="group flex flex-col bg-white  border border-slate-100/80 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-500/20 hover:-translate-y-1"
    >
      {/* Top Article Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
        <Image
          src={image}
          alt="News Article Image"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-102"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 text-left">
        {/* Category & Date */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-500 mb-2">
          <span className="text-blue-600 font-bold uppercase tracking-wider">{category}</span>
          <span>•</span>
          <span>{date}</span>
        </div>

        {/* News Article Title */}
        <h4 className="text-base sm:text-lg font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 line-clamp-2 min-h-[48px]">
          {displayTitle}
        </h4>

        {/* Short Description */}
        {displayDesc && (
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 font-medium line-clamp-3 flex-1">
            {displayDesc}
          </p>
        )}
        {/* Author Info Block */}
        <div className="mt-6 pt-5 border-t border-slate-50 flex items-center gap-3">
          <div className="relative w-10 h-10 overflow-hidden shrink-0 bg-slate-100 border border-slate-100 rounded-full">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-slate-800 truncate">{author.name}</span>
            <span className="text-[11px] font-semibold text-slate-400 truncate mt-0.5">{author.role}</span>
          </div>
        </div>

        {/* Card Footer "Read More" */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-[13px] font-bold text-blue-600 transition-colors group-hover:text-blue-700 inline-flex items-center gap-1.5">
            {readMoreText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

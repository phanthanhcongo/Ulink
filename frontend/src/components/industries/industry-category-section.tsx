'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { getCategoryBullets } from './industry-category-bullets';

interface CategoryItem {
  name: string;
  desc?: string;
  image: string;
  slug?: string;
  href?: string;
}

interface IndustryCategorySectionProps {
  id: string;
  tagText: string;
  title: string;
  intro: string;
  categories: CategoryItem[];
  locale: string;
  defaultSlug?: string;
}

export function IndustryCategorySection({
  id,
  tagText,
  title,
  intro,
  categories,
  locale,
  defaultSlug = 'cleanroom-consumables'
}: IndustryCategorySectionProps) {
  const isVi = locale === 'vi';
  const isJa = locale === 'ja';

  return (
    <section id={id} className="scroll-mt-16 py-16 lg:py-20 w-full bg-white border-t border-[#DDE1E6]">
      <div className="page-container space-y-10">
        {/* Section Header */}
        <div className="space-y-2 max-w-5xl">
          <span className="text-[14px] font-bold uppercase tracking-wider text-[#1769E2] block">
            {tagText}
          </span>
          <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] lg:leading-[46px] font-bold text-[#141414] tracking-tight">
            {title}
          </h2>
          <p className="text-[15px] lg:text-[16px] leading-relaxed text-[#495057] font-normal">
            {intro}
          </p>
        </div>

        {/* Grid of 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, idx) => {
            const itemHref = item.href || `/solutions/listProduct?category=${item.slug || defaultSlug}`;
            const bullets = getCategoryBullets(item.name, locale);

            return (
              <div
                key={idx}
                className="group bg-white border border-[#DDE1E6] rounded-[3px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Square Image container */}
                  <Link href={itemHref} className="block relative aspect-square w-full bg-[#F9FAFB] border-b border-[#DDE1E6] overflow-hidden p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover p-2"
                    />
                  </Link>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <Link href={itemHref} className="block">
                        <h4 className="text-[16px] lg:text-[18px] font-bold text-[#141414] hover:text-[#1769E2] line-clamp-1 leading-snug transition-colors" title={item.name}>
                          {item.name}
                        </h4>
                      </Link>
                      {item.desc && (
                        <p className="text-[13px] text-[#64748B] font-normal leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    {/* Features bullets */}
                    <ul className="space-y-2 pt-1">
                      {bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-[13px] lg:text-[14px] text-[#495057] font-normal leading-snug">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#1769E2] shrink-0 mt-1.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* View product link */}
                <div className="px-5 pb-5 pt-2">
                  <Link
                    href={itemHref}
                    className="text-[14px] font-bold text-[#1769E2] hover:text-[#1257BD] inline-flex items-center gap-1.5 transition-colors"
                  >
                    {isVi ? 'Xem danh mục sản phẩm' : isJa ? '製品カテゴリを見る' : 'View product category'}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

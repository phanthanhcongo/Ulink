'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/product-card';
import type { Product } from '@/lib/directus';

interface SavedProductsSectionProps {
  allProducts: Product[];
  currentSlug: string;
  locale: string;
}

export default function SavedProductsSection({ allProducts, currentSlug, locale }: SavedProductsSectionProps) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ulink-favorites');
      if (saved) {
        try {
          setSavedSlugs(JSON.parse(saved) as string[]);
        } catch { }
      }
      setIsLoaded(true);
    }
  }, []);

  const savedProducts = useMemo(() => {
    if (!isLoaded) return [];
    return allProducts.filter((p) => savedSlugs.includes(p.slug) && p.slug !== currentSlug).slice(0, 4);
  }, [allProducts, savedSlugs, currentSlug, isLoaded]);

  if (savedProducts.length === 0) return null;

  return (
    <div className="mt-16 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-blue-600 shrink-0" />
          <h3 className="text-lg font-bold text-slate-800">
            {locale === 'vi' ? 'Sản phẩm đã lưu' : 'Saved Products'}
          </h3>
        </div>
        <Link
          href={`/${locale}/solutions/listProduct`}
          className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
        >
          {locale === 'vi' ? 'Xem tất cả' : 'View All'} &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {savedProducts.map((prod: Product) => (
          <ProductCard key={prod.id} product={prod} locale={locale} roundedClass="rounded-[3px]" />
        ))}
      </div>
    </div>
  );
}

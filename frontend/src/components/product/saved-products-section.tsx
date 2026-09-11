'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/solutions/product-card';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
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
    const readSaved = () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('ulink-favorites');
        if (saved) {
          try {
            setSavedSlugs(JSON.parse(saved) as string[]);
          } catch { }
        }
        setIsLoaded(true);
      }
    };

    readSaved();
    window.addEventListener('storage', readSaved);
    return () => window.removeEventListener('storage', readSaved);
  }, []);

  const savedProducts = useMemo(() => {
    if (!isLoaded) return [];
    const filtered = allProducts.filter((p) => savedSlugs.includes(p.slug) && p.slug !== currentSlug);
    if (filtered.length > 0) return filtered.slice(0, 4);
    return allProducts.filter((p) => p.slug !== currentSlug).slice(0, 4);
  }, [allProducts, savedSlugs, currentSlug, isLoaded]);

  if (savedProducts.length === 0) return null;

  const directusUrl = getDirectusUrl();

  const transformedProducts = savedProducts.map((prod: Product) => {
    const firstSku = prod.skus?.[0];
    const imageUrl = prod.hero
      ? (prod.hero.startsWith('http') || prod.hero.startsWith('/'))
        ? prod.hero
        : `${directusUrl}/assets/${prod.hero}`
      : undefined;

    let displayPrice: string;
    if (firstSku?.price) {
      const basePrice = firstSku.price;
      const packSize = firstSku.pack_size;
      const packSizeNum = packSize ? parseInt(String(packSize), 10) : null;
      const perUnitPrice = packSizeNum && packSizeNum > 0 ? basePrice / packSizeNum : basePrice;
      const minPrice = Math.round(perUnitPrice * 0.8);
      const maxPrice = Math.round(perUnitPrice);
      displayPrice = `${minPrice.toLocaleString('vi-VN')}-${maxPrice.toLocaleString('vi-VN')}đ`;
    } else {
      displayPrice = 'Liên hệ báo giá';
    }

    return {
      id: prod.id,
      name: prod.name,
      slug: prod.slug,
      image: imageUrl,
      price: displayPrice,
      unit: firstSku?.unit || '/per kg',
      moq: `MOQ: ${firstSku?.pack_size || 'Liên hệ'}`,
      status: firstSku?.stock_status === 'in_stock' ? (locale === 'vi' ? 'Có sẵn tại Kho' : 'In Stock') : (locale === 'vi' ? 'Sản xuất theo yêu cầu' : 'Custom orders'),
      location: locale === 'vi' ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam'
    };
  });

  return (
    <section className="mt-16 space-y-6 pt-10 border-t border-slate-200/60">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1769e2] shrink-0" />
          <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 tracking-tight">
            {locale === 'vi' ? 'Sản phẩm đã lưu' : 'Saved Products'}
          </h2>
        </div>
        <Link
          href={`/${locale}/solutions/listProduct`}
          className="text-[14px] font-bold text-[#1769e2] hover:underline flex items-center gap-1.5 transition-colors"
        >
          {locale === 'vi' ? 'Xem tất cả' : 'View all'} <span className="text-[16px]">&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {transformedProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} locale={locale} />
        ))}
      </div>
    </section>
  );
}



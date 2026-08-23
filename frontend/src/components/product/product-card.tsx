'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { getTranslatedName, getTranslatedField } from '@/lib/i18n-content';
import { ASSETS } from '@/lib/assets';
import { readCart, persistCart } from '@/components/rfq/cart-types';
import { getProductPricing } from '@/lib/product-data';
import type { Product } from '@/lib/directus';

interface ProductCardProps {
  product: Product;
  locale: string;
  roundedClass?: string;
}

export default function ProductCard({ product, locale, roundedClass }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ulink-favorites');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as string[];
          setIsSaved(parsed.includes(product.slug));
        } catch (e) {
          console.error('Failed to parse favorites from localStorage', e);
        }
      }
    }
  }, [product.slug]);

  const DIRECTUS_URL = getDirectusUrl();
  const productName = getTranslatedName(product, locale);

  const firstSku = product.skus?.[0];

  const shortDescription =
    getTranslatedField(product, 'short_description', locale) ||
    product.short_description ||
    '';

  const imageSrc = product.hero
    ? (product.hero.startsWith('http') || product.hero.startsWith('/')
      ? product.hero
      : `${DIRECTUS_URL}/assets/${product.hero}`)
    : ASSETS.home.solutionCleanroom;

  const { price, unit: priceUnit } = getProductPricing(product.slug, locale);

  const formatPrice = (amount: number) => {
    if (locale === 'vi') {
      return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    }
    return (
      '$' +
      new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount)
    );
  };

  const minPrice = Math.round(price * 0.95);
  const maxPrice = Math.round(price * 1.04);
  const priceRangeString = `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`;

  const getProductMOQ = (slug: string, unit: string, locale: string) => {
    const isVi = locale === 'vi';
    const cleanUnit = unit || (isVi ? 'cái' : 'pcs');
    if (
      slug.includes('gloves') ||
      slug.includes('wipers') ||
      slug.includes('mask') ||
      slug.includes('strap') ||
      slug.includes('bag')
    ) {
      const defaultMoq = slug.includes('bag')
        ? (isVi ? '5.000 túi' : '5,000 bags')
        : (isVi ? '1.000 đôi' : '1,000 pairs');
      return {
        moq: isVi ? `MOQ: ${defaultMoq}` : `MOQ: ${defaultMoq}`,
        status: isVi ? 'Quy cách sẵn có' : 'Standard sizes'
      };
    }
    if (slug.includes('coverall')) {
      return {
        moq: isVi ? 'MOQ: 100 bộ' : 'MOQ: 100 sets',
        status: isVi ? 'Sản xuất theo yêu cầu' : 'Made to order'
      };
    }
    if (slug.includes('table-mat') || slug.includes('mat')) {
      return {
        moq: isVi ? 'MOQ: 50 cuộn' : 'MOQ: 50 rolls',
        status: isVi ? 'Sẵn kho' : 'In stock'
      };
    }
    return {
      moq: isVi ? `MOQ: 500 ${cleanUnit}` : `MOQ: 500 ${cleanUnit}`,
      status: isVi ? 'Sản xuất theo yêu cầu' : 'Made to order'
    };
  };

  const getProductHub = (id: number, locale: string) => {
    const hubs = [
      locale === 'vi' ? 'Hub Hà Nam, Việt Nam' : 'Ha Nam Hub, Vietnam',
      locale === 'vi' ? 'Hub Bình Dương, Việt Nam' : 'Binh Duong Hub, Vietnam',
      locale === 'vi' ? 'Hub Hải Phòng, Việt Nam' : 'Hai Phong Hub, Vietnam',
      locale === 'vi' ? 'Hub Bắc Ninh, Việt Nam' : 'Bac Ninh Hub, Vietnam'
    ];
    return hubs[id % hubs.length];
  };

  const moqInfo = getProductMOQ(product.slug, priceUnit, locale);
  const hubLocation = getProductHub(product.id, locale);
  const quickViewText =
    locale === 'vi' ? 'Xem nhanh' : locale === 'ja' ? 'クイックビュー' : 'Quick View';

  const publishedSkus = (product.skus ?? []).filter(
    (s) => s.sku_code && s.status === 'published'
  );

  const handleRfqClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const cart = readCart();
      const skuCode = publishedSkus[0]?.sku_code || product.slug;

      const existingIndex = cart.findIndex(
        (item) => item.sku === skuCode || item.product_name === productName
      );

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({
          sku: skuCode,
          product_name: productName,
          spec: publishedSkus[0]?.pack_size || '',
          unit: publishedSkus[0]?.unit || priceUnit || (locale === 'vi' ? 'cái' : 'pcs'),
          quantity: 1,
          note: ''
        });
      }

      persistCart(cart);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    },
    [publishedSkus, product.slug, productName, priceUnit, locale]
  );

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextSavedState = !isSaved;
    setIsSaved(nextSavedState);

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ulink-favorites');
        let parsed: string[] = saved ? JSON.parse(saved) : [];
        if (nextSavedState) {
          if (!parsed.includes(product.slug)) {
            parsed.push(product.slug);
          }
        } else {
          parsed = parsed.filter((slug) => slug !== product.slug);
        }
        localStorage.setItem('ulink-favorites', JSON.stringify(parsed));
      } catch (err) {
        console.error('Failed to save favorite to localStorage', err);
      }
    }
  };

  return (
    <article
      className={`group relative min-w-0 flex flex-col overflow-hidden bg-white border border-[#d7e0ea] ${roundedClass || 'rounded-[3px]'
        } shadow-[0_8px_24px_rgba(16,43,73,0.045)] transition-all duration-[240ms] ease-out hover:-translate-y-1.5 hover:border-[#9fc2ef] hover:shadow-[0_18px_42px_rgba(16,61,111,0.13)]`}
      data-product={productName}
    >
      {/* Product Image Area */}
      <Link
        href={`/${locale}/solutions/listProduct/${product.slug}`}
        aria-label={locale === 'vi' ? `Xem ${productName}` : `View ${productName}`}
        className="relative block h-[250px] m-2 overflow-hidden bg-[#eef2f6] rounded-[3px]"
      >
        <Image
          src={imageSrc}
          alt={productName}
          fill
          className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1769E2]/40 to-[#1769E2]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Product Badge */}
        <span className="absolute top-3 left-3 px-[9px] py-[7px] bg-[rgba(255,255,255,0.94)] border border-[rgba(23,105,226,0.16)] text-[#1769e2] text-[9px] font-[900] tracking-[0.06em] uppercase shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-[3px] z-10">
          {moqInfo.status}
        </span>

        {/* Quick View Button */}
        <span className="absolute left-1/2 bottom-[14px] -translate-x-1/2 translate-y-3 px-4 py-[9px] bg-[rgba(15,39,68,0.88)] text-white text-[11px] font-extrabold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[220ms] ease-out pointer-events-none whitespace-nowrap z-10">
          {quickViewText}
        </span>
      </Link>

      {/* Product Content Body */}
      <div className="flex flex-col flex-1 p-[19px_14px_14px]">
        {/* Product Code */}
        <p className="mb-[7px] text-[#8290a1] text-[9px] font-[900] tracking-[0.08em] uppercase">
          {firstSku?.sku_code || product.slug.toUpperCase()}
        </p>

        {/* Title */}
        <h3 className="min-h-[44px] mb-[13px] text-[15px] font-bold leading-[1.45] text-[#202630]">
          <Link
            href={`/${locale}/solutions/listProduct/${product.slug}`}
            className="hover:text-[#1769e2] transition-colors line-clamp-2"
          >
            {productName}
          </Link>
        </h3>

        {/* Price Range */}
        <p className="flex items-baseline gap-2 mb-[15px] text-[#202630]">
          <strong className="text-[15px] font-extrabold">{priceRangeString}</strong>
          <span className="text-[#5d6979] text-xs font-normal">/ {priceUnit}</span>
        </p>

        {/* Meta Row: MOQ & specs status */}
        <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap mb-4 text-[#5d6979] text-[11px] font-medium">
          <strong className="text-[#202630] text-[11px] font-bold">{moqInfo.moq}</strong>
          <span className="pl-[9px] border-l border-[#d7e0ea] text-[10px]">{moqInfo.status}</span>
        </div>

        {/* Location / Hub */}
        <p className="flex items-center gap-2 mt-auto mb-4 text-[#566273] text-[13px] font-medium">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-[19px] h-[19px] shrink-0 stroke-[#76abf5]"
          >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {hubLocation}
        </p>

        {/* Action Buttons: Add to RFQ & Bookmark */}
        <div className="grid grid-cols-[1fr_42px] gap-2">
          <button
            type="button"
            onClick={handleRfqClick}
            className={`group/btn min-h-[42px] px-4 rounded-[3px] text-white text-[13px] font-[800] text-center shadow-[0_7px_16px_rgba(23,105,226,0.18)] transition-all duration-200 cursor-pointer flex items-center justify-center ${added
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-gradient-to-b from-[#2c7beb] to-[#1769e2] hover:from-[#0d57c9] hover:to-[#0d57c9]'
              }`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5] mr-1.5" />
                {locale === 'vi' ? 'Đã thêm' : locale === 'ja' ? '追加済み' : 'Added'}
              </>
            ) : (
              <>
                {locale === 'vi' ? 'Đặt hàng' : locale === 'ja' ? 'RFQに追加' : 'Add to RFQ'}
                <span className="ml-2 opacity-0 -translate-x-[5px] inline-block transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:translate-x-0">
                  →
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRfqClick}
            aria-label={locale === 'vi' ? `Lưu ${productName}` : `Save ${productName}`}
            aria-pressed={isSaved}
            className={`w-full h-[42px] grid place-items-center border rounded-[3px] transition-all duration-[180ms] cursor-pointer ${isSaved
                ? 'border-[#1769e2] bg-[#1769e2] text-white'
                : 'border-[#cfe0f6] bg-[#eaf3ff] text-[#1769e2] hover:border-[#1769e2] hover:bg-white'
              }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className={`w-[21px] h-[21px] ${isSaved ? 'fill-current' : ''}`}
            >
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}


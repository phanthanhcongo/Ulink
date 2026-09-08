'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Heart } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  price?: string | number;
  moq?: string;
  moqUnit?: string | null;
  status?: string;
  location?: string;
  unit?: string;
}

interface ProductCardProps {
  product: Product;
  locale: string;
  showWishlist?: boolean;
}

export function ProductCard({
  product,
  locale,
  showWishlist = true
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const productLink = `/solutions/listProduct/${product.slug}`;

  return (
    <div className="bg-white rounded-[3px] border border-slate-200/50 overflow-hidden h-full flex flex-col group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)]">
      <Link href={productLink} className="flex flex-col h-full">

        {/* IMAGE SECTION */}
        <div className="image-wrap relative w-full aspect-[3/3] overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center group">
          {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
          {!product.image || (!product.image.startsWith('http') && !product.image.startsWith('/')) ? (
            <div className="text-slate-400 text-center p-4">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-sm font-medium">{locale === 'vi' ? 'Chưa có hình ảnh' : 'No image'}</p>
            </div>
          ) : null}
        </div>

        {/* BOTTOM INFO SECTION */}
        <div className="bottom-info flex-1 p-4 sm:p-5 flex flex-col gap-3">

          {/* PRODUCT TITLE */}
          <div className="title3">
            <h3 className="text-body-small sm:text-body-regular font-bold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* PRICE INFO */}
          <div className="info-main">
            <div className="price-wrap flex items-baseline gap-1">
              <div className="price text-caption-responsive sm:text-body-small font-bold text-slate-900">
                {product.price || 'Liên hệ báo giá'}
              </div>
              <div className="text-caption-responsive text-slate-300 font-medium">/</div>
              <div className="price-old text-caption-responsive text-slate-400 font-medium">
                {product.unit || 'per kg'}
              </div>
            </div>
          </div>

          {/* MOQ / STATUS INFO */}
          <div className="info-main">
            <div className="price-wrap flex items-baseline justify-between">
              <div className="price text-caption-responsive font-semibold text-slate-700">
                {product.moq || 'MOQ: Liên hệ'}
              </div>
              <div className="price-old2 text-caption-responsive text-slate-500 font-medium">
                {product.status || (locale === 'vi' ? 'Sản xuất theo yêu cầu' : 'Custom orders')}
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="frame-1030 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <div className="location text-caption-responsive text-slate-600 font-medium">
              {product.location || 'Hub Hà Nam, Việt Nam'}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="frame-10302 flex items-center gap-2 mt-auto pt-3 border-t border-slate-50">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Navigate to product page or open order modal
                window.location.href = productLink;
              }}
              className="flex-1 button5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-caption-responsive py-2 sm:py-2.5 rounded-[3px] transition-colors shadow-xs cursor-pointer"
            >
              {locale === 'vi' ? 'Đặt hàng' : 'Order'}
            </button>

            {showWishlist && (
              <button
                onClick={handleWishlistClick}
                className={`button6 border rounded-[3px] p-2 sm:p-2.5 transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400 hover:text-red-500'
                }`}
                title={locale === 'vi' ? 'Thêm vào yêu thích' : 'Add to favorites'}
              >
                <Heart
                  className="h-4 w-4"
                  fill={isWishlisted ? 'currentColor' : 'none'}
                />
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

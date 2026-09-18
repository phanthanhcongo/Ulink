'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Bookmark } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface Product {
  id: number | string;
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
  className?: string;
}

export function ProductCard({
  product,
  locale,
  showWishlist = true,
  className
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !product.slug) return;
    try {
      const saved = localStorage.getItem('ulink-favorites');
      if (saved) {
        const arr = JSON.parse(saved) as string[];
        if (Array.isArray(arr) && arr.includes(product.slug)) {
          setIsWishlisted(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [product.slug]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window === 'undefined' || !product.slug) return;

    try {
      const saved = localStorage.getItem('ulink-favorites');
      let arr: string[] = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(arr)) arr = [];

      if (isWishlisted) {
        arr = arr.filter((s) => s !== product.slug);
        setIsWishlisted(false);
      } else {
        if (!arr.includes(product.slug)) {
          arr.push(product.slug);
        }
        setIsWishlisted(true);

        // Automatically Add to Cart (rfq-cart) when wishlisted
        try {
          const rawCart = localStorage.getItem('rfq-cart');
          const cart: Array<any> = rawCart ? JSON.parse(rawCart) : [];
          const existingIdx = cart.findIndex((item) => item.sku === product.slug);
          if (existingIdx === -1) {
            cart.push({
              sku: product.slug,
              product_name: product.name,
              qty: 500,
              quantity: 500,
              unit: product.unit || 'kg',
              note: ''
            });
            localStorage.setItem('rfq-cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('rfq-cart-changed'));
          }
        } catch (cartErr) {
          console.error('Failed to auto add saved item to rfq-cart:', cartErr);
        }
      }

      localStorage.setItem('ulink-favorites', JSON.stringify(arr));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('ulink-favorites-changed'));
    } catch (err) {
      console.error('Failed to update ulink-favorites:', err);
    }
  };

  const productLink = `/solutions/listProduct/${product.slug}`;

  return (
    <div
      className={`bg-white rounded-[3px] border border-[#DCE0E5] overflow-hidden h-full flex flex-col group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_8px_25px_-5px_rgba(23,105,226,0.2)] w-full lg:w-[300px] lg:max-w-[300px] ${className || ''}`}
    >
      <Link href={productLink} className="flex flex-col h-full">
        {/* IMAGE SECTION - Exact 270px height from Figma */}
        <div className="image-wrap relative w-full h-[240px] sm:h-[260px] lg:h-[270px] bg-white flex items-center justify-center p-2.5 overflow-hidden">
          {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
            <div className="relative w-full h-full rounded-[3px] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 300px"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="text-slate-400 text-center p-4">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-sm font-medium">{locale === 'vi' ? 'Chưa có hình ảnh' : 'No image'}</p>
            </div>
          )}
        </div>

        {/* BOTTOM INFO SECTION - Figma: padding 16px, gap 12px, border-t #DCE0E5 */}
        <div className="bottom-info flex-1 p-4 flex flex-col justify-between gap-3 border-t border-[#DCE0E5] bg-white">
          <div className="space-y-2.5">
            {/* PRODUCT TITLE */}
            <h3 className="text-[15px] leading-[1.4em] tracking-[-0.02em] font-normal text-[#14181F] line-clamp-2 hover:text-[#1769E2] transition-colors">
              {product.name}
            </h3>

            {/* PRICE INFO */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-[16px] leading-[24px] font-normal text-[#14181F]">
                {product.price || 'Liên hệ báo giá'}
              </span>
              <span className="text-[14px] sm:text-[16px] leading-[24px] font-normal text-[#495057]">
                {product.unit ? `${product.unit.startsWith('/') ? '' : '/'}${product.unit}` : '/per kg'}
              </span>
            </div>

            {/* MOQ / STATUS INFO */}
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[16px] leading-[24px] font-normal text-[#14181F]">
                 {product.moq || '500 kg'}
              </span>
              <span className="text-[14px] leading-[20px] font-normal text-[#495057] text-right truncate">
                {product.status || (locale === 'vi' ? 'Sản xuất theo yêu cầu' : 'Custom orders')}
              </span>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-2 pt-0.5">
              <MapPin className="h-[18px] w-[18px] text-[#495057] opacity-50 shrink-0" />
              <span className="text-[14px] sm:text-[16px] leading-[24px] font-normal text-[#495057] truncate">
                {product.location || 'Hub Hà Nam, Việt Nam'}
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS - Figma: height 40px, gap 8px, button primary & button soft */}
          <div className="flex items-stretch gap-2 pt-3 border-t border-slate-100 mt-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = productLink;
              }}
              className="flex-1 h-[40px] bg-[#1769E2] hover:bg-[#1257BD] text-white font-medium text-[15px] rounded-[3px] transition-colors shadow-xs cursor-pointer flex items-center justify-center px-3"
            >
              {locale === 'vi' ? 'Đặt hàng' : 'Order'}
            </button>

            {showWishlist && (
              <button
                onClick={handleWishlistClick}
                className={`h-[40px] w-[40px] shrink-0 rounded-[3px] transition-all cursor-pointer flex items-center justify-center ${
                  isWishlisted
                    ? 'bg-[#1769E2] text-white hover:bg-[#1257BD]'
                    : 'bg-[#E0EDFF] text-[#1769E2] hover:bg-[#d0e3ff]'
                }`}
                title={locale === 'vi' ? 'Lưu sản phẩm' : 'Bookmark product'}
              >
                <Bookmark
                  className="h-[20px] w-[20px] stroke-[2]"
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

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Heart, ChevronRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import ProductCard from '@/components/product/product-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import type { Product } from '@/lib/directus';

interface FavoritesClientProps {
  products: Product[];
  locale: string;
}

export default function FavoritesClient({ products, locale }: FavoritesClientProps) {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ulink-favorites');
      if (saved) {
        try {
          setFavoriteSlugs(JSON.parse(saved) as string[]);
        } catch (e) {
          console.error('Failed to parse favorites from localStorage', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Filter products by saved slugs
  const favoriteProducts = useMemo(() => {
    if (!isLoaded) return [];
    return products.filter((p) => favoriteSlugs.includes(p.slug));
  }, [products, favoriteSlugs, isLoaded]);

  const isVi = locale === 'vi';
  const titleText = isVi ? 'Sản phẩm yêu thích' : locale === 'ja' ? 'お気に入り製品' : 'Favorite Products';
  const descText = isVi
    ? 'Danh sách các sản phẩm và vật tư công nghiệp bạn đã lưu để tiện theo dõi, chuẩn bị hồ sơ hoặc gửi yêu cầu báo giá RFQ số lượng lớn.'
    : locale === 'ja'
      ? '追跡、書類準備、または大量見積依頼（RFQ）の送信のために保存した製品および工業材料のリスト。'
      : 'List of saved products and industrial supplies for tracking, document preparation, or sending bulk RFQs.';

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20 pt-6 relative">
      {/* ── BREADCRUMB HEADER ── */}
      <Breadcrumb
        className="pt-0 pb-4"
        items={[
          {
            label: isVi ? 'Trang chủ' : locale === 'ja' ? 'ホーム' : 'Home',
            href: '/'
          },
          {
            label: isVi ? 'Sản phẩm' : locale === 'ja' ? '製品' : 'Products',
            href: '/solutions/listProduct'
          },
          {
            label: titleText
          }
        ]}
        backLink={{
          label: isVi
            ? 'Quay lại Trang sản phẩm'
            : locale === 'ja'
              ? '製品ページに戻る'
              : 'Back to Products',
          href: '/solutions/listProduct'
        }}
      />

      {/* ── WISHLIST HERO BANNER ── */}
      <header className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 mb-8">
        <div className="rounded-[3px] bg-gradient-to-r from-primary via-brand to-brand-strong p-6 sm:p-8 lg:p-10 text-white shadow-md relative overflow-hidden">
          {/* Background Decorative Accent */}
          <div className="absolute right-0 top-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md border border-white/20">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
                {isVi ? 'BẢN LƯU DOANH NGHIỆP' : 'SAVED B2B ITEMS'}
              </span>
              {isLoaded && (
                <span className="text-xs text-blue-200 font-semibold bg-blue-900/40 px-2.5 py-0.5 rounded-full border border-blue-400/20">
                  {favoriteProducts.length} {isVi ? 'Sản phẩm' : 'Products'}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-tight leading-snug">
              {titleText}
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium">
              {descText}
            </p>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {!isLoaded ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
          </div>
        ) : favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-[3px] border border-slate-200/80 shadow-xs text-center max-w-xl mx-auto mt-8">
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-5 shadow-inner">
              <Heart className="h-7 w-7 fill-current animate-pulse" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 mb-2">
              {isVi
                ? 'Danh sách yêu thích đang trống'
                : locale === 'ja'
                  ? 'お気に入りリストは空です'
                  : 'Your wishlist is empty'}
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed font-medium">
              {isVi
                ? 'Hãy duyệt qua danh mục sản phẩm của chúng tôi và nhấn nút Lưu (biểu tượng Bookmark) để lưu lại các sản phẩm bạn quan tâm.'
                : locale === 'ja'
                  ? '製品カタログを閲覧し、ブックマークアイコンをクリックしてお気に入りの製品を保存してください。'
                  : 'Browse through our product catalog and click the Bookmark icon to save items you are interested in.'}
            </p>
            <Link
              href="/solutions/listProduct"
              className="inline-flex items-center justify-center px-6 py-3 rounded-[3px] bg-blue-600 text-white font-extrabold text-sm shadow-md hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {isVi ? 'Khám phá sản phẩm ngay' : locale === 'ja' ? '製品を探索する' : 'Explore products now'}
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

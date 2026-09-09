'use client';

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { ASSETS } from '@/lib/assets';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface CategoryHeroBannerProps {
  isSearchPage: boolean;
  currentCategoryName: string;
  categoryDescription?: string;
  categorySlug: string;
  locale: string;
  searchQuery: string;
  searchInput: string;
  filteredProductsCount: number;
  onSearchInputChange: (value: string) => void;
  onSearchSubmit: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'cleanroom-consumables': '/images/about/gallery/cleanroom-materials-warehouse.png',
  'cleanroom-gloves': ASSETS.home.productCutGloves,
  'cleanroom-wipers': ASSETS.home.solutionPackaging,
  'cleanroom-apparel': ASSETS.about.heroWarehouse,
  'cleanroom-masks': ASSETS.about.qualityLab,
  'industrial-packaging': ASSETS.home.productCustomPkg,
  'esd-supplies': ASSETS.home.productHvacTape,
  'cleanroom-chemicals': ASSETS.home.solutionCleanroom
};

export function CategoryHeroBanner({
  isSearchPage,
  currentCategoryName,
  categoryDescription,
  categorySlug,
  locale,
  searchQuery,
  searchInput,
  filteredProductsCount,
  onSearchInputChange,
  onSearchSubmit,
  sortBy,
  onSortChange
}: CategoryHeroBannerProps) {
  const ITEMS_PER_PAGE = 6;

  return (
    <header className="w-full">
      <div className="page-container pb-10 pt-6 text-slate-800 relative overflow-hidden">
        <div className="mb-2 hidden md:block">
          <Breadcrumb
            className="px-0 sm:px-0 lg:px-0 xl:px-0 mx-0 max-w-none"
            items={
              isSearchPage
                ? [
                    {
                      label: locale === 'vi' ? 'Trang chủ' : 'Home',
                      href: '/'
                    },
                    {
                      label: locale === 'vi' ? 'Sản phẩm' : 'Products',
                      href: '/solutions/listProduct'
                    },
                    {
                      label: locale === 'vi' ? 'Tìm kiếm' : 'Search'
                    }
                  ]
                : [
                    {
                      label: locale === 'vi' ? 'Trang chủ' : 'Home',
                      href: '/'
                    },
                    {
                      label: locale === 'vi' ? 'Sản phẩm' : 'Products',
                      href: '/solutions/listProduct'
                    },
                    {
                      label: locale === 'vi' ? 'Giải pháp phòng sạch' : 'Cleanroom Solutions',
                      href: '#'
                    },
                    {
                      label: currentCategoryName || ''
                    }
                  ]
            }
          />
        </div>

        {isSearchPage ? (
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              {searchQuery.trim() ? (
                <div suppressHydrationWarning>
                  <h1 className="text-section-title font-bold text-slate-900 tracking-tight leading-tight">
                    {locale === 'vi'
                      ? `Kết quả tìm kiếm cho "${searchQuery}"`
                      : `Search results for "${searchQuery}"`}
                  </h1>
                  <p className="mt-2 text-caption-responsive text-slate-500 font-semibold">
                    {locale === 'vi'
                      ? `Hiển thị 1-${Math.min(filteredProductsCount, ITEMS_PER_PAGE)} trong tổng số ${filteredProductsCount} sản phẩm`
                      : `Showing 1-${Math.min(filteredProductsCount, ITEMS_PER_PAGE)} of ${filteredProductsCount} products`}
                  </p>
                </div>
              ) : (
                <div>
                  <h1 className="text-section-title font-bold text-slate-900 tracking-tight leading-tight">
                    {locale === 'vi'
                      ? 'Hãy nhập từ khóa để tìm kiếm sản phẩm'
                      : 'Please enter keywords to search for products'}
                  </h1>
                </div>
              )}

              <div className="flex items-center gap-2 self-start md:self-end">
                <span className="text-caption-responsive text-slate-400 font-bold">{locale === 'vi' ? 'Sắp xếp:' : 'Sort:'}</span>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="px-3 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs cursor-pointer"
                >
                  <option value="popular">{locale === 'vi' ? 'Liên quan nhất' : 'Most Relevant'}</option>
                  <option value="newest">{locale === 'vi' ? 'Sản phẩm mới nhất' : 'Newest'}</option>
                  <option value="name_asc">{locale === 'vi' ? 'Tên A → Z' : 'Name A → Z'}</option>
                  <option value="name_desc">{locale === 'vi' ? 'Tên Z → A' : 'Name Z → A'}</option>
                </select>
              </div>
            </div>

            <div className="max-w-2xl bg-white border border-slate-200 rounded-full p-1.5 pl-4 flex items-center shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <div className="pl-3.5 pr-2 text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => onSearchInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearchSubmit();
                  }
                }}
                placeholder={locale === 'vi' ? 'Tìm kiếm sản phẩm...' : 'Search products...'}
                className="flex-1 bg-transparent text-body-regular text-slate-800 focus:outline-none font-medium placeholder:text-slate-400 py-1.5"
              />
              <button
                onClick={onSearchSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-caption-responsive px-6 py-2 rounded-full shadow-sm transition-colors cursor-pointer shrink-0"
              >
                {locale === 'vi' ? 'Tìm lại' : 'Search again'}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-section-title font-bold text-slate-900 tracking-tight leading-tight" suppressHydrationWarning>
                {currentCategoryName}
              </h1>

              <p className="text-body-regular text-slate-500 leading-relaxed font-medium max-w-2xl">
                {categoryDescription ||
                  `Tổng hợp các loại ${currentCategoryName.toLowerCase()} đạt tiêu chuẩn kiểm định phòng sạch ISO 14644-1, điện trở tĩnh điện ANSI/ESD S20.20 và chứng nhận CO/CQ chính hãng.`}
              </p>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative aspect-[16/9] w-full rounded-[3px] overflow-hidden border border-slate-200 shadow-sm">
                <Image
                  src={CATEGORY_IMAGE_MAP[categorySlug] || ASSETS.home.solutionCleanroom}
                  alt={currentCategoryName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

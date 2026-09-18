'use client';

import React from 'react';
import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

interface ProductsToolbarProps {
  locale: string;
  filteredProductsCount: number;
  currentCategoryName: string;
  isSearchPage: boolean;
  sortBy: string;
  viewType: 'grid' | 'list';
  onSortChange: (value: string) => void;
  onViewChange: (type: 'grid' | 'list') => void;
  onMobileFilterOpen: () => void;
  currentPage?: number;
  pageSize?: number;
}

export function ProductsToolbar({
  locale,
  filteredProductsCount,
  currentCategoryName,
  isSearchPage,
  sortBy,
  viewType,
  onSortChange,
  onViewChange,
  onMobileFilterOpen,
  currentPage = 1,
  pageSize = 12
}: ProductsToolbarProps) {
  const startItem = filteredProductsCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, filteredProductsCount);

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-[#DCE0E5] bg-white">
      {/* Left: Mobile filter button + Product count */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileFilterOpen}
          className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px] bg-blue-50 text-blue-700 border border-blue-200 text-[13px] font-semibold shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
          {locale === 'vi' ? 'Danh mục' : 'Filters'}
        </button>

        <p className="text-[14px] leading-[20px] text-[#495057] font-normal hidden sm:block">
          {locale === 'vi' ? (
            <>
              Hiển thị <span className="font-bold text-[#14181F]">{startItem}-{endItem}</span> trong tổng số{' '}
              <span className="font-bold text-[#14181F]">{filteredProductsCount}</span>{' '}
              sản phẩm{currentCategoryName ? ` ${currentCategoryName.toLowerCase()}` : ''}
            </>
          ) : (
            <>
              Showing <span className="font-bold text-[#14181F]">{startItem}-{endItem}</span> of{' '}
              <span className="font-bold text-[#14181F]">{filteredProductsCount}</span>{' '}
              products{currentCategoryName ? ` in ${currentCategoryName}` : ''}
            </>
          )}
        </p>

        {/* Mobile: short count */}
        <p className="text-[13px] text-[#495057] font-normal sm:hidden">
          <span className="font-bold text-[#14181F]">{filteredProductsCount}</span>{' '}
          {locale === 'vi' ? 'sản phẩm' : 'products'}
        </p>
      </div>

      {/* Right: Sort + View Toggle */}
      <div className="flex items-center gap-3 shrink-0">
        {!isSearchPage && (
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-[#495057] font-normal hidden sm:inline whitespace-nowrap">
              {locale === 'vi' ? 'Sắp xếp:' : 'Sort:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-1.5 rounded-[3px] border border-[#DCE0E5] text-[14px] font-normal text-[#14181F] bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="popular">{locale === 'vi' ? 'Liên quan nhất' : 'Most relevant'}</option>
              <option value="newest">{locale === 'vi' ? 'Mới nhất' : 'Newest'}</option>
              <option value="name_asc">{locale === 'vi' ? 'A → Z' : 'A → Z'}</option>
              <option value="name_desc">{locale === 'vi' ? 'Z → A' : 'Z → A'}</option>
            </select>
          </div>
        )}

        <div className="hidden sm:flex items-center border border-[#DCE0E5] rounded-[3px] overflow-hidden">
          <button
            onClick={() => onViewChange('grid')}
            className={`p-2 transition-colors cursor-pointer ${
              viewType === 'grid'
                ? 'bg-[#F1F5F9] text-[#14181F]'
                : 'bg-white text-[#ADB5BD] hover:text-[#495057]'
            }`}
          >
            <LayoutGrid className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <div className="w-px h-5 bg-[#DCE0E5]" />
          <button
            onClick={() => onViewChange('list')}
            className={`p-2 transition-colors cursor-pointer ${
              viewType === 'list'
                ? 'bg-[#F1F5F9] text-[#14181F]'
                : 'bg-white text-[#ADB5BD] hover:text-[#495057]'
            }`}
          >
            <List className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

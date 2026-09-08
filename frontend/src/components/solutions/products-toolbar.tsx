'use client';

import React from 'react';
import { SlidersHorizontal, Grid, List } from 'lucide-react';

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
  onMobileFilterOpen
}: ProductsToolbarProps) {
  return (
    <div className="rounded-[3px] bg-white p-4 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileFilterOpen}
          className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-[3px] bg-blue-50 text-blue-700 border border-blue-200 text-caption-responsive font-bold shadow-xs"
        >
          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
          Danh mục sản phẩm
        </button>

        <p className="text-caption-responsive font-semibold text-slate-700">
          Hiển thị{' '}
          <span className="font-bold text-blue-600">{filteredProductsCount}</span>{' '}
          sản phẩm thuộc{' '}
          <span className="font-bold text-slate-900">{currentCategoryName}</span>
        </p>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        {!isSearchPage && (
          <div className="flex items-center gap-2">
            <span className="text-caption-responsive text-slate-400 font-bold hidden sm:inline">{locale === 'vi' ? 'Sắp xếp:' : 'Sort:'}</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 rounded-[3px] border border-slate-200 text-caption-responsive font-bold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs cursor-pointer"
            >
              <option value="popular">{locale === 'vi' ? 'Nổi bật nhất' : 'Most Popular'}</option>
              <option value="newest">{locale === 'vi' ? 'Sản phẩm mới nhất' : 'Newest'}</option>
              <option value="name_asc">{locale === 'vi' ? 'Tên A → Z' : 'Name A → Z'}</option>
              <option value="name_desc">{locale === 'vi' ? 'Tên Z → A' : 'Name Z → A'}</option>
            </select>
          </div>
        )}

        <div className="hidden sm:flex items-center border border-slate-200 rounded-[3px] overflow-hidden p-0.5 bg-slate-50 gap-0.5">
          <button
            onClick={() => onViewChange('grid')}
            className={`p-1.5 rounded-[2px] transition-colors cursor-pointer ${
              viewType === 'grid'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`p-1.5 rounded-[2px] transition-colors cursor-pointer ${
              viewType === 'list'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

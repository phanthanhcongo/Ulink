'use client';

import React from 'react';
import {
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  Check
} from 'lucide-react';

interface FilterCounts {
  name: string;
  count: number;
}

interface ProductFiltersProps {
  locale: string;
  allCategories: Array<{ id: number; name: string; slug: string }>;
  categoryCounts: Record<string, number>;
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
  onSelectAllCategories?: () => void;

  brandCounts: Record<string, number>;
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;

  standardCounts: Record<string, FilterCounts>;
  selectedStandards: string[];
  onToggleStandard: (slug: string) => void;

  industryCounts: Record<string, FilterCounts>;
  selectedIndustries: string[];
  onToggleIndustry: (slug: string) => void;

  materialCounts: Record<string, FilterCounts>;
  selectedMaterials: string[];
  onToggleMaterial: (material: string) => void;

  minPrice: number;
  maxPrice: number;
  maxProductPrice: number;
  onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onResetFilters: () => void;
}

export function ProductFilters({
  locale,
  allCategories,
  categoryCounts,
  selectedCategories,
  onToggleCategory,
  onSelectAllCategories,
  brandCounts,
  selectedBrands,
  onToggleBrand,
  standardCounts,
  selectedStandards,
  onToggleStandard,
  industryCounts,
  selectedIndustries,
  onToggleIndustry,
  materialCounts,
  selectedMaterials,
  onToggleMaterial,
  minPrice,
  maxPrice,
  maxProductPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onResetFilters
}: ProductFiltersProps) {
  const [categoriesExpanded, setCategoriesExpanded] = React.useState(true);
  const [materialsExpanded, setMaterialsExpanded] = React.useState(false);
  const [industriesExpanded, setIndustriesExpanded] = React.useState(false);
  const [brandsExpanded, setBrandsExpanded] = React.useState(false);
  const [standardsExpanded, setStandardsExpanded] = React.useState(false);

  const formatCurrency = (val: number) => val.toLocaleString('vi-VN');

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedStandards.length > 0 ||
    selectedIndustries.length > 0 ||
    selectedMaterials.length > 0 ||
    minPrice > 0 ||
    maxPrice < maxProductPrice;

  return (
    <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 space-y-4">
      <div className="rounded-[3px] bg-white p-5 border border-slate-200 shadow-sm space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4.5 w-4.5 text-slate-700 stroke-[2.5]" />
            <h3 className="text-body-regular font-bold text-slate-900">
              {locale === 'vi' ? 'Bộ lọc tìm kiếm' : 'Search Filters'}
            </h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-caption-responsive font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              {locale === 'vi' ? 'Xóa tất cả' : 'Clear all'}
            </button>
          )}
        </div>

        {/* Categories Filter */}
        <div className="space-y-3">
          <button
            onClick={() => setCategoriesExpanded(!categoriesExpanded)}
            className="w-full flex items-center justify-between text-left text-body-regular font-bold text-slate-900 cursor-pointer group"
          >
            <span>{locale === 'vi' ? 'Danh mục sản phẩm' : 'Categories'}</span>
            {categoriesExpanded ? (
              <ChevronUp className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            )}
          </button>
          {categoriesExpanded && (
            <div className="space-y-0.5 max-h-60 overflow-y-auto pr-1 no-scrollbar">
              {onSelectAllCategories && (
                <button
                  onClick={onSelectAllCategories}
                  className="w-full flex items-center justify-between py-1.5 hover:text-blue-600 transition-colors text-left text-caption-responsive font-semibold text-slate-700 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                        selectedCategories.length === 0
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300 bg-slate-50/50 text-slate-300'
                      }`}
                    >
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className={selectedCategories.length === 0 ? 'text-slate-900 font-bold' : 'text-slate-750'}>
                      {locale === 'vi' ? 'Tất cả danh mục' : 'All Categories'}
                    </span>
                  </div>
                  <span className="text-slate-400 font-bold text-caption-responsive">({categoryCounts['all'] || 0})</span>
                </button>
              )}

              {allCategories.map((cat) => {
                const isSelected = selectedCategories.includes(cat.slug);
                const count = categoryCounts[cat.slug] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onToggleCategory(cat.slug)}
                    className="w-full flex items-center justify-between py-1.5 hover:text-blue-600 transition-colors text-left text-caption-responsive font-semibold text-slate-700 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-slate-50/50 text-slate-300'
                        }`}
                      >
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span className={isSelected ? 'text-slate-900 font-bold' : 'text-slate-750'}>
                        {cat.name}
                      </span>
                    </div>
                    {count > 0 && <span className="text-slate-400 font-bold text-caption-responsive">({count})</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Materials Filter */}
        {Object.keys(materialCounts).length > 0 && (
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <button
              onClick={() => setMaterialsExpanded(!materialsExpanded)}
              className="w-full flex items-center justify-between text-left text-body-regular font-bold text-slate-900 cursor-pointer group"
            >
              <span>{locale === 'vi' ? 'Chất liệu' : 'Materials'}</span>
              {materialsExpanded ? (
                <ChevronUp className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              )}
            </button>
            {materialsExpanded && (
              <div className="space-y-0.5 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                {Object.entries(materialCounts).map(([matName, info]) => {
                  const isChecked = selectedMaterials.includes(matName);
                  return (
                    <button
                      key={matName}
                      onClick={() => onToggleMaterial(matName)}
                      className="w-full flex items-center justify-between py-1.5 hover:text-blue-600 transition-colors text-left text-caption-responsive font-semibold text-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                            isChecked
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-300 bg-slate-50/50 text-slate-300'
                          }`}
                        >
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className={isChecked ? 'text-slate-900 font-bold' : 'text-slate-750'}>
                          {info.name}
                        </span>
                      </div>
                      <span className="text-slate-400 font-bold text-caption-responsive">({info.count})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Industries Filter */}
        {Object.keys(industryCounts).length > 0 && (
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <button
              onClick={() => setIndustriesExpanded(!industriesExpanded)}
              className="w-full flex items-center justify-between text-left text-body-regular font-bold text-slate-900 cursor-pointer group"
            >
              <span>{locale === 'vi' ? 'Ứng dụng' : 'Applications'}</span>
              {industriesExpanded ? (
                <ChevronUp className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              )}
            </button>
            {industriesExpanded && (
              <div className="space-y-0.5 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                {Object.entries(industryCounts).map(([slug, info]) => {
                  const isChecked = selectedIndustries.includes(slug);
                  return (
                    <button
                      key={slug}
                      onClick={() => onToggleIndustry(slug)}
                      className="w-full flex items-center justify-between py-1.5 hover:text-blue-600 transition-colors text-left text-caption-responsive font-semibold text-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                            isChecked
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-300 bg-slate-50/50 text-slate-300'
                          }`}
                        >
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className={isChecked ? 'text-slate-900 font-bold' : 'text-slate-750'}>
                          {info.name}
                        </span>
                      </div>
                      <span className="text-slate-400 font-bold text-caption-responsive">({info.count})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Brands Filter */}
        {Object.keys(brandCounts).length > 0 && (
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <button
              onClick={() => setBrandsExpanded(!brandsExpanded)}
              className="w-full flex items-center justify-between text-left text-body-regular font-bold text-slate-900 cursor-pointer group"
            >
              <span>{locale === 'vi' ? 'Thương hiệu' : 'Brands'}</span>
              {brandsExpanded ? (
                <ChevronUp className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              )}
            </button>
            {brandsExpanded && (
              <div className="space-y-0.5 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                {Object.entries(brandCounts).map(([brandName, count]) => {
                  const isChecked = selectedBrands.includes(brandName);
                  return (
                    <button
                      key={brandName}
                      onClick={() => onToggleBrand(brandName)}
                      className="w-full flex items-center justify-between py-1.5 hover:text-blue-600 transition-colors text-left text-caption-responsive font-semibold text-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                            isChecked
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-300 bg-slate-50/50 text-slate-300'
                          }`}
                        >
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className={isChecked ? 'text-slate-900 font-bold' : 'text-slate-750'}>
                          {brandName}
                        </span>
                      </div>
                      <span className="text-slate-400 font-bold text-caption-responsive">({count})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Price Range Filter */}
        <div className="space-y-3 border-t border-slate-100 pt-4">
          <h4 className="text-body-regular font-bold text-slate-900">
            {locale === 'vi' ? 'Khoảng giá (VNĐ)' : 'Price Range (VND)'}
          </h4>
          <div className="relative pt-4 pb-2 px-1">
            <div className="relative w-full h-1.5 bg-slate-100 rounded-full">
              <div
                className="absolute h-full bg-blue-600 rounded-full"
                style={{
                  left: `${(minPrice / maxProductPrice) * 100}%`,
                  right: `${100 - (maxPrice / maxProductPrice) * 100}%`
                }}
              />
            </div>

            <input
              type="range"
              min={0}
              max={maxProductPrice}
              value={minPrice}
              onChange={onMinPriceChange}
              className="absolute pointer-events-none appearance-none w-full h-1.5 top-4 bg-transparent outline-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow"
            />
            <input
              type="range"
              min={0}
              max={maxProductPrice}
              value={maxPrice}
              onChange={onMaxPriceChange}
              className="absolute pointer-events-none appearance-none w-full h-1.5 top-4 bg-transparent outline-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow"
            />

            <div className="flex items-center justify-between mt-5 text-caption-responsive font-bold text-slate-400">
              <span>{formatCurrency(minPrice)}đ</span>
              <span className="text-blue-600 font-bold">{formatCurrency(maxPrice)}đ</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

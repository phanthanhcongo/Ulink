'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface Tab {
  id: number;
  name: string;
  slug: string;
}

interface CategoryQuickTabsProps {
  tabs: Tab[];
  selectedCategories: string[];
  categoryCounts: Record<string, number>;
  locale: string;
  onCategoryChange: (slug: string) => void;
  onShowAll: () => void;
  hideShowAll?: boolean;
}

export function CategoryQuickTabs({
  tabs,
  selectedCategories,
  categoryCounts,
  locale,
  onCategoryChange,
  onShowAll,
  hideShowAll = false
}: CategoryQuickTabsProps) {
  return (
    <div className="w-full bg-white border-b" style={{ borderColor: '#E2E8F0' }}>
      <div className="page-container">
        <div className="py-3 flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {!hideShowAll && (
            <button
              onClick={onShowAll}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] transition-all whitespace-nowrap cursor-pointer border ${
                selectedCategories.length === 0
                  ? 'bg-[#EFF6FF] border-[#1769E2] text-[#1769E2] font-semibold'
                  : 'bg-white border-[#E2E8F0] text-[#1E293B] font-medium hover:bg-slate-50'
              }`}
            >
              {locale === 'vi' ? 'Tất cả' : 'All'}
            </button>
          )}
          {tabs.map((sub) => {
            const isActive = selectedCategories.includes(sub.slug);
            return (
              <button
                key={sub.id}
                onClick={() => onCategoryChange(sub.slug)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-[#EFF6FF] border-[#1769E2] text-[#1769E2] font-semibold'
                    : 'bg-white border-[#E2E8F0] text-[#1E293B] font-medium hover:bg-slate-50'
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

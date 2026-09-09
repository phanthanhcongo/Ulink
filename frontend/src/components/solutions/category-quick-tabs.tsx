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
    <div className="w-full bg-slate-50/70">
      <div className="page-container">
        <div className="bg-white py-4 px-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth">
            {!hideShowAll && (
              <button
                onClick={onShowAll}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-caption-responsive font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategories.length === 0
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/65'
                }`}
              >
                {selectedCategories.length === 0 && <Check className="h-3.5 w-3.5" />}
                {locale === 'vi' ? 'Tất cả' : 'All'}
              </button>
            )}
            {tabs.map((sub) => {
              const isActive = selectedCategories.includes(sub.slug);
              if (selectedCategories.length > 0 && !isActive) return null;
              return (
                <button
                  key={sub.id}
                  onClick={() => onCategoryChange(sub.slug)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-caption-responsive font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/65'
                  }`}
                >
                  {isActive && <Check className="h-3.5 w-3.5" />}
                  {sub.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

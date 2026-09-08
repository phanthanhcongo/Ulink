'use client';

import React from 'react';
import { Boxes, X } from 'lucide-react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  locale: string;
  allCategories: Array<{ id: number; name: string; slug: string }>;
  categoryCounts: Record<string, number>;
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
  onSelectAllCategories: () => void;
  onClose: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  locale,
  allCategories,
  categoryCounts,
  selectedCategories,
  onToggleCategory,
  onSelectAllCategories,
  onClose
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Boxes className="h-4 w-4 text-blue-600" />
            <h3 className="text-body-regular font-bold text-slate-900 uppercase tracking-wider">
              Danh mục sản phẩm
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-[3px] p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-2 flex-1">
          <button
            onClick={() => {
              onSelectAllCategories();
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-[3px] text-caption-responsive font-semibold ${
              selectedCategories.length === 0
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-700 bg-slate-50'
            }`}
          >
            Tất cả danh mục ({categoryCounts['all'] || 0})
          </button>

          {allCategories.map((c) => {
            const isSelected = selectedCategories.includes(c.slug);
            return (
              <button
                key={c.id}
                onClick={() => {
                  onToggleCategory(c.slug);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-[3px] text-caption-responsive font-semibold truncate flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-700 bg-slate-50'
                }`}
              >
                <span className="truncate pr-2">{c.name}</span>
                <span
                  className={`text-caption-responsive px-2 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {categoryCounts[c.slug] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ShieldCheck,
  Package,
  ArrowRight,
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronRight,
  Boxes,
  Plus,
  Check,
  CheckCircle2
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { readCart, persistCart } from '../rfq/cart-types';
import ProductCard from '@/components/product/product-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export interface CategoryInfo {
  id: number;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
  parentName?: string | null;
  subCategories?: Array<{ id: number; name: string; slug: string }>;
}

export interface ProductItem {
  id: number;
  name: string;
  slug: string;
  brand: string;
  categoryName: string;
  categorySlug: string;
  shortDescription: string;
  stockStatus: 'in_stock' | 'low_stock' | 'on_order';
  image?: string;
  specs?: string[];
  unit?: string;
  packSize?: string;
}

interface CategoryProductsClientProps {
  category: CategoryInfo;
  products: ProductItem[];
  allCategories: Array<{ id: number; name: string; slug: string }>;
  locale: string;
}

export function CategoryProductsClient({
  category,
  products: initialProducts,
  allCategories,
  locale
}: CategoryProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(category.slug || 'all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [addedProductIds, setAddedProductIds] = useState<Set<number>>(new Set());

  // Pagination states
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset page when category or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProducts.length };
    initialProducts.forEach((p) => {
      if (p.categorySlug) {
        counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
      }
    });
    return counts;
  }, [initialProducts]);

  // Filter products by Category & Subcategories
  const filteredProducts = useMemo(() => {
    const subSlugs = category.subCategories?.map((s) => s.slug) || [];
    let result = initialProducts.filter((product) => {
      if (selectedCategory === 'all') return true;
      if (product.categorySlug === selectedCategory) return true;
      if (
        selectedCategory === category.slug &&
        (subSlugs.includes(product.categorySlug) || !product.categorySlug)
      ) {
        return true;
      }
      return false;
    });

    if (result.length === 0 && initialProducts.length > 0) {
      result = [...initialProducts];
    }

    // Sorting logic
    if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [initialProducts, selectedCategory, category, sortBy]);

  // Compute total pages & displayed products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Active category display name
  const currentCategoryName = useMemo(() => {
    if (selectedCategory === 'all') return 'Tất cả sản phẩm';
    const found = allCategories.find((c) => c.slug === selectedCategory);
    return found ? found.name : category.name;
  }, [selectedCategory, allCategories, category.name]);

  // Add product to RFQ cart
  const handleAddToCart = (e: React.MouseEvent, product: ProductItem) => {
    e.preventDefault();
    e.stopPropagation();

    const cart = readCart();
    const existingIndex = cart.findIndex(
      (item) => item.product_name === product.name || item.sku === product.slug
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        sku: product.slug,
        product_name: product.name,
        spec: product.specs?.join(', ') || '',
        unit: product.unit || 'cái',
        quantity: 1,
        note: ''
      });
    }

    persistCart(cart);

    setAddedProductIds((prev) => new Set(prev).add(product.id));
    setAddedToast(product.name);
    setTimeout(() => {
      setAddedToast(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50/70  relative">
      {/* ── CATEGORY HERO BANNER ── */}
      <header className="w-full bg-gradient-to-r from-primary via-brand to-brand-strong shadow-md">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12 text-white relative overflow-hidden">
          {/* Background Decorative Accent */}
          <div className="absolute right-0 top-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md border border-white/20">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
                Vật tư Công nghiệp & Phòng sạch ISO / ESD
              </span>
              <span className="text-xs text-blue-200 font-semibold bg-blue-900/40 px-2.5 py-0.5 rounded-full border border-blue-400/20">
                {filteredProducts.length} Sản phẩm
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-tight leading-snug">
              {currentCategoryName}
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium">
              {category.description ||
                `Tổng hợp các loại ${currentCategoryName.toLowerCase()} đạt tiêu chuẩn kiểm định phòng sạch ISO 14644-1, điện trở tĩnh điện ANSI/ESD S20.20 và chứng nhận CO/CQ chính hãng.`}
            </p>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER WITH LEFT SIDEBAR FILTER ── */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ════════════════════════════════════════════════════════════
              LEFT SIDEBAR FILTER COLUMN (Only Product Categories)
             ════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24">
            <div className="rounded-[5px] bg-white p-5 border border-slate-200/90 shadow-sm space-y-4">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Boxes className="h-4 w-4 text-blue-600 stroke-[2.5]" />
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                    Danh mục sản phẩm
                  </h3>
                </div>
              </div>

              {/* PRODUCT CATEGORIES LIST */}
              <div className="space-y-1 text-xs">
                {/* All Categories Option */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[5px] text-left font-semibold transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100 font-semibold'
                  }`}
                >
                  <span>Tất cả danh mục</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      selectedCategory === 'all'
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {categoryCounts['all'] || 0}
                  </span>
                </button>

                {/* Individual Categories */}
                {allCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.slug;
                  const count = categoryCounts[cat.slug] || 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[5px] text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white font-extrabold shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100 font-semibold'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      {count > 0 && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ════════════════════════════════════════════════════════════
              RIGHT COLUMN: TOOLBAR & PRODUCT CARDS GRID
             ════════════════════════════════════════════════════════════ */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar */}
            <div className="rounded-[5px] bg-white p-4 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
              {/* Left: Result Count & Mobile Filter Toggle */}
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-[5px] bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold shadow-xs"
                >
                  <SlidersHorizontal className="h-4 w-4 text-blue-600" />
                  Danh mục sản phẩm
                </button>

                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  Hiển thị{' '}
                  <span className="font-extrabold text-blue-600">{filteredProducts.length}</span>{' '}
                  sản phẩm thuộc{' '}
                  <span className="font-extrabold text-slate-900">{currentCategoryName}</span>
                </p>
              </div>

              {/* Right: Sort Order Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-400 font-bold hidden sm:inline">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-[5px] border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs cursor-pointer"
                >
                  <option value="popular">Nổi bật nhất</option>
                  <option value="newest">Sản phẩm mới nhất</option>
                  <option value="name_asc">Tên A → Z</option>
                  <option value="name_desc">Tên Z → A</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID LIST */}
            {filteredProducts.length === 0 ? (
              <div className="rounded-[5px] bg-white p-12 border border-slate-200/80 shadow-sm text-center flex flex-col items-center justify-center">
                <Package className="h-16 w-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-extrabold text-slate-800">
                  Chưa có sản phẩm trong danh mục này
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md">
                  Vui lòng chọn danh mục sản phẩm khác ở cột bên trái.
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="mt-6 px-5 py-2.5 rounded-[5px] bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => {
                    const mappedProduct = {
                      id: product.id,
                      slug: product.slug,
                      name: product.name,
                      brand: product.brand || 'ULink',
                      short_description: product.shortDescription,
                      hero: product.image,
                      category: {
                        name: product.categoryName
                      },
                      skus: [
                        {
                          id: product.id,
                          sku_code: product.slug,
                          stock_status: product.stockStatus,
                          unit: product.unit,
                          pack_size: product.packSize,
                          status: 'published'
                        }
                      ]
                    } as any;
                    return (
                      <ProductCard key={product.id} product={mappedProduct} locale={locale} roundedClass="rounded-[5px]" />
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 pt-4">
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(1, prev - 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="h-9 w-9 rounded-[5px] border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className={`h-9 w-9 rounded-[5px] text-xs font-bold transition-all cursor-pointer ${
                          currentPage === page
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="h-9 w-9 rounded-[5px] border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          FLOATING TOAST NOTIFICATION ON ADD TO RFQ
         ════════════════════════════════════════════════════════════ */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white p-4 rounded-[5px] shadow-2xl border border-slate-800 animate-in slide-in-from-bottom duration-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="text-xs min-w-0">
            <p className="font-extrabold text-white">Đã thêm vào giỏ hàng!</p>
            <p className="text-slate-300 truncate max-w-[220px] font-medium mt-0.5">{addedToast}</p>
          </div>
          <Link
            href="/cart"
            className="ml-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-[5px] transition-colors shrink-0 shadow-sm"
          >
            Xem giỏ hàng &gt;
          </Link>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          MOBILE FILTER DRAWER / MODAL
         ════════════════════════════════════════════════════════════ */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Boxes className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Danh mục sản phẩm
                </h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="rounded-[5px] p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-2 flex-1">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMobileFilterOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-[5px] text-xs font-semibold ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white font-extrabold'
                    : 'text-slate-700 bg-slate-50'
                }`}
              >
                Tất cả danh mục ({categoryCounts['all'] || 0})
              </button>

              {allCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategory(c.slug);
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-[5px] text-xs font-semibold truncate flex items-center justify-between ${
                    selectedCategory === c.slug
                      ? 'bg-blue-600 text-white font-extrabold'
                      : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  <span className="truncate pr-2">{c.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      selectedCategory === c.slug
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {categoryCounts[c.slug] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



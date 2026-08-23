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
  CheckCircle2,
  Grid,
  List,
  Phone,
  Award,
  MapPin,
  Truck,
  Factory,
  Briefcase,
  Activity
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
  standards?: Array<{
    id: number;
    name: string;
    slug: string;
    translations?: any[];
  }>;
}

interface CategoryProductsClientProps {
  category: CategoryInfo;
  products: ProductItem[];
  allCategories: Array<{ id: number; name: string; slug: string }>;
  locale: string;
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

export function CategoryProductsClient({
  category,
  products: initialProducts,
  allCategories,
  locale
}: CategoryProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(category.slug || 'all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [addedProductIds, setAddedProductIds] = useState<Set<number>>(new Set());

  // Pagination states
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset page when category, sorting, or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, selectedBrands, selectedStandards]);

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

  // Dynamic brand list with count of products
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach((p) => {
      if (p.brand) {
        counts[p.brand] = (counts[p.brand] || 0) + 1;
      }
    });
    return counts;
  }, [initialProducts]);

  // Dynamic ISO standard list with count of products
  const standardCounts = useMemo(() => {
    const counts: Record<string, { name: string; count: number }> = {};
    initialProducts.forEach((p) => {
      p.standards?.forEach((std) => {
        if (std.slug) {
          const prev = counts[std.slug];
          counts[std.slug] = {
            name: std.name || std.slug,
            count: (prev?.count || 0) + 1
          };
        }
      });
    });
    return counts;
  }, [initialProducts]);

  // Filter products by Category, Subcategories, Brands, and ISO Standards
  const filteredProducts = useMemo(() => {
    const subSlugs = category.subCategories?.map((s) => s.slug) || [];
    const result = initialProducts.filter((product) => {
      // 1. Category Filter
      if (selectedCategory !== 'all') {
        const isDirectMatch = product.categorySlug === selectedCategory;
        const isParentMatch = selectedCategory === category.slug &&
          (subSlugs.includes(product.categorySlug) || !product.categorySlug);
        
        if (!isDirectMatch && !isParentMatch) {
          return false;
        }
      }

      // 2. Brand Filter
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand)) {
          return false;
        }
      }

      // 3. Standards Filter
      if (selectedStandards.length > 0) {
        const productStdSlugs = product.standards?.map((s) => s.slug).filter(Boolean) || [];
        const hasMatchingStandard = selectedStandards.some((stdSlug) => productStdSlugs.includes(stdSlug));
        if (!hasMatchingStandard) {
          return false;
        }
      }

      return true;
    });

    // Sorting logic
    if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [initialProducts, selectedCategory, category, sortBy, selectedBrands, selectedStandards]);

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

  const handleToggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleToggleStandard = (standardSlug: string) => {
    setSelectedStandards((prev) =>
      prev.includes(standardSlug)
        ? prev.filter((s) => s !== standardSlug)
        : [...prev, standardSlug]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setSelectedStandards([]);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 relative">
      {/* ── CATEGORY HERO BANNER (Including Breadcrumb) ── */}
      <header className="w-full bg-[#F4F6F9] border-b border-slate-200/50">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 pb-10 pt-6 text-slate-800 relative overflow-hidden">
          {/* Breadcrumb inside the Hero Banner container */}
          <div className="mb-2">
            <Breadcrumb
              className="px-0 sm:px-0 lg:px-0 xl:px-0 mx-0 max-w-none"
              items={[
                {
                  label: locale === 'vi' ? 'Trang chủ' : 'Home',
                  href: '/'
                },
                {
                  label: locale === 'vi' ? 'Sản phẩm' : 'Products',
                  href: '/solutions/products'
                },
                {
                  label: category.parentName || (locale === 'vi' ? 'Giải pháp phòng sạch' : 'Cleanroom Solutions'),
                  href: '#'
                },
                {
                  label: category.name || ''
                }
              ]}
            />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side text */}
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight">
                {currentCategoryName}
              </h1>

              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium max-w-2xl">
                {category.description ||
                  `Tổng hợp các loại ${currentCategoryName.toLowerCase()} đạt tiêu chuẩn kiểm định phòng sạch ISO 14644-1, điện trở tĩnh điện ANSI/ESD S20.20 và chứng nhận CO/CQ chính hãng.`}
              </p>
            </div>

            {/* Right side image */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative aspect-[16/9] w-full rounded-[3px] overflow-hidden border border-slate-200 shadow-sm">
                <Image
                  src={CATEGORY_IMAGE_MAP[category.slug] || ASSETS.home.solutionCleanroom}
                  alt={currentCategoryName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── QUICK TABS ── */}
      <div className="w-full bg-white border-b border-slate-200">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 py-4">
          <div className="flex flex-wrap items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/65'
              }`}
            >
              {selectedCategory === 'all' && <Check className="h-3.5 w-3.5" />}
              {locale === 'vi' ? 'Tất cả' : 'All'}
            </button>
            {category.subCategories?.map((sub) => {
              const isActive = selectedCategory === sub.slug;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedCategory(sub.slug)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
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

      {/* ── MAIN CONTENT CONTAINER WITH LEFT SIDEBAR FILTER ── */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* ════════════════════════════════════════════════════════════
              LEFT SIDEBAR FILTER COLUMN (Only Product Categories)
             ════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24 space-y-4">
            {/* Header: Bộ lọc tìm kiếm & Xoá bộ lọc */}
            <div className="rounded-[3px] bg-white p-5 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-blue-600 stroke-[2.5]" />
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                    {locale === 'vi' ? 'Bộ lọc tìm kiếm' : 'Search Filters'}
                  </h3>
                </div>
                {(selectedCategory !== 'all' || selectedBrands.length > 0 || selectedStandards.length > 0) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    {locale === 'vi' ? 'Xoá bộ lọc' : 'Clear filters'}
                  </button>
                )}
              </div>

              {/* Group 1: DANH MỤC SẢN PHẨM */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {locale === 'vi' ? 'Danh mục sản phẩm' : 'Categories'}
                </h4>
                <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                  {/* All Categories Option */}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[3px] text-left transition-all cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-blue-50 text-blue-700 font-extrabold border-l-2 border-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 font-semibold'
                    }`}
                  >
                    <span>{locale === 'vi' ? 'Tất cả danh mục' : 'All Categories'}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-500">
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
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[3px] text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-extrabold border-l-2 border-blue-600'
                            : 'text-slate-600 hover:bg-slate-50 font-semibold'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        {count > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-500 shrink-0">
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 2: TIÊU CHUẨN SẠCH (ISO) */}
              {Object.keys(standardCounts).length > 0 && (
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {locale === 'vi' ? 'Tiêu chuẩn sạch (ISO)' : 'Quality Standards (ISO)'}
                  </h4>
                  <div className="space-y-2 text-xs">
                    {Object.entries(standardCounts).map(([slug, info]) => {
                      const isChecked = selectedStandards.includes(slug);
                      return (
                        <label
                          key={slug}
                          className="flex items-center justify-between group cursor-pointer text-slate-600 hover:text-slate-900"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleStandard(slug)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                            />
                            <span className="font-semibold text-slate-700">{info.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">({info.count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Group 3: THƯƠNG HIỆU */}
              {Object.keys(brandCounts).length > 0 && (
                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {locale === 'vi' ? 'Thương hiệu' : 'Brands'}
                  </h4>
                  <div className="space-y-2 text-xs">
                    {Object.entries(brandCounts).map(([brandName, count]) => {
                      const isChecked = selectedBrands.includes(brandName);
                      return (
                        <label
                          key={brandName}
                          className="flex items-center justify-between group cursor-pointer text-slate-600 hover:text-slate-900"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleBrand(brandName)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                            />
                            <span className="font-semibold text-slate-700">{brandName}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ════════════════════════════════════════════════════════════
              RIGHT COLUMN: TOOLBAR & PRODUCT CARDS GRID
             ════════════════════════════════════════════════════════════ */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar */}
            <div className="rounded-[3px] bg-white p-4 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
              {/* Left: Result Count & Mobile Filter Toggle */}
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-[3px] bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold shadow-xs"
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

              {/* Right: Sort Order Selector & View Switcher */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold hidden sm:inline">{locale === 'vi' ? 'Sắp xếp:' : 'Sort:'}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-[3px] border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs cursor-pointer"
                  >
                    <option value="popular">{locale === 'vi' ? 'Nổi bật nhất' : 'Most Popular'}</option>
                    <option value="newest">{locale === 'vi' ? 'Sản phẩm mới nhất' : 'Newest'}</option>
                    <option value="name_asc">{locale === 'vi' ? 'Tên A → Z' : 'Name A → Z'}</option>
                    <option value="name_desc">{locale === 'vi' ? 'Tên Z → A' : 'Name Z → A'}</option>
                  </select>
                </div>

                <div className="hidden sm:flex items-center border border-slate-200 rounded-[3px] overflow-hidden p-0.5 bg-slate-50 gap-0.5">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-1.5 rounded-[2px] transition-colors cursor-pointer ${
                      viewType === 'grid'
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewType('list')}
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

            {/* PRODUCT GRID LIST */}
            {filteredProducts.length === 0 ? (
              <div className="rounded-[3px] bg-white p-12 border border-slate-200/80 shadow-sm text-center flex flex-col items-center justify-center">
                <Package className="h-16 w-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-extrabold text-slate-800">
                  Chưa có sản phẩm trong danh mục này
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md">
                  Vui lòng chọn danh mục sản phẩm khác ở cột bên trái.
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="mt-6 px-5 py-2.5 rounded-[3px] bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <div>
                <div className={viewType === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
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
                    
                    return viewType === 'grid' ? (
                      <ProductCard key={product.id} product={mappedProduct} locale={locale} roundedClass="rounded-[3px]" />
                    ) : (
                      <div key={product.id} className="bg-white border border-slate-200/80 rounded-[3px] p-4 flex flex-col md:flex-row gap-5 hover:shadow-md transition-shadow">
                        {/* Product Image */}
                        <div className="relative w-full md:w-44 h-32 shrink-0 rounded-[3px] overflow-hidden bg-slate-50 border border-slate-100">
                          <Link href={`/solutions/products/${product.slug}`} className="block w-full h-full">
                            <Image
                              src={product.image || ASSETS.home.solutionCleanroom}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 176px"
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[9px] font-extrabold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded-[2px] border border-blue-100">
                                {product.brand}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">
                                {product.categoryName}
                              </span>
                            </div>
                            <Link href={`/solutions/products/${product.slug}`} className="block">
                              <h4 className="text-base font-extrabold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1">
                                {product.name}
                              </h4>
                            </Link>
                            <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1.5 leading-relaxed">
                              {product.shortDescription || 'Mô tả chi tiết sản phẩm phòng sạch chất lượng cao từ ULink Industries.'}
                            </p>
                          </div>
                          
                          {/* Price, MOQ, and Location footer */}
                          <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-2.5 border-t border-slate-50">
                            <div className="flex items-center gap-3.5 text-xs font-semibold text-slate-500">
                              <div>
                                <span className="text-slate-400 font-medium">{locale === 'vi' ? 'Kho hàng:' : 'Warehouse:'}</span>{' '}
                                <span className="text-slate-700 font-bold">Hà Nam, Việt Nam</span>
                              </div>
                              <span className="text-slate-200">|</span>
                              <div>
                                <span className="text-slate-400 font-medium">MOQ:</span>{' '}
                                <span className="text-slate-700 font-bold">100 {product.unit || 'cái'}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-[3px] transition-colors shadow-xs cursor-pointer"
                              >
                                {locale === 'vi' ? 'Đặt hàng' : 'Add to RFQ'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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
                      className="h-9 w-9 rounded-[3px] border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
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
                        className={`h-9 w-9 rounded-[3px] text-xs font-bold transition-all cursor-pointer ${
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
                      className="h-9 w-9 rounded-[3px] border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
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

      {/* ── CALL TO ACTION BANNER ── */}
      <section className="w-full bg-[#0F62FE] text-white py-14 mt-16 shadow-inner">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {locale === 'vi' ? 'Bạn cần tư vấn giải pháp công nghiệp?' : 'Do You Need Industrial Solutions Consulting?'}
          </h2>
          <p className="text-sm sm:text-base text-blue-100/90 font-semibold max-w-2xl mx-auto">
            {locale === 'vi' 
              ? 'Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7' 
              : 'Our team of experts is ready to support you 24/7'}
          </p>
          <div className="pt-2">
            <span className="text-xs text-blue-200 uppercase tracking-widest block mb-1 font-bold">
              {locale === 'vi' ? 'Hoặc gọi ngay:' : 'Or call us now:'}
            </span>
            <a 
              href="tel:02473689999" 
              className="text-2xl sm:text-3xl font-extrabold hover:text-blue-100 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
              (0247) 368 9999
            </a>
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES SECTION ── */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold text-[#0F62FE] uppercase tracking-widest block">
              {locale === 'vi' ? 'NĂNG LỰC CỐT LÕI' : 'CORE CAPABILITIES'}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111827] max-w-3xl mx-auto leading-snug tracking-tight">
              {locale === 'vi' 
                ? 'Tích hợp công nghệ tự động hóa và giải pháp kết nối công nghiệp' 
                : 'Integrating Automation Technology & Industrial Connection Solutions'}
            </h2>
          </div>

          {/* Grid of 4 columns - Clean & Borderless */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {/* Col 1 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-[#0F62FE] mb-1.5 shrink-0 flex items-center justify-center">
                <Factory className="h-10 w-10 stroke-[1.5]" />
              </div>
              <h3 className="text-[15px] font-extrabold text-[#111827]">
                {locale === 'vi' ? 'Vật tư Phòng sạch' : 'Cleanroom Consumables'}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
                {locale === 'vi' 
                  ? 'Cung cấp đầy đủ vật tư phòng sạch đạt chuẩn ISO, từ găng tay, khẩu trang đến giấy lau chuyên dụng cho mọi cấp độ sạch.' 
                  : 'Providing full ISO-compliant cleanroom consumables, from gloves and masks to specialized wipers for all cleanliness levels.'}
              </p>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-[#0F62FE] mb-1.5 shrink-0 flex items-center justify-center">
                <Briefcase className="h-10 w-10 stroke-[1.5]" />
              </div>
              <h3 className="text-[15px] font-extrabold text-[#111827]">
                {locale === 'vi' ? 'Giải pháp Kiểm soát' : 'Contamination Control'}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
                {locale === 'vi' 
                  ? 'Thiết kế và triển khai giải pháp kiểm soát ô nhiễm toàn diện, đảm bảo môi trường sản xuất đạt tiêu chuẩn nghiêm ngặt.' 
                  : 'Designing and deploying comprehensive contamination control solutions, ensuring production environments meet strict standards.'}
              </p>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-[#0F62FE] mb-1.5 shrink-0 flex items-center justify-center">
                <Activity className="h-10 w-10 stroke-[1.5]" />
              </div>
              <h3 className="text-[15px] font-extrabold text-[#111827]">
                {locale === 'vi' ? 'Thiết bị Chuyên dụng' : 'Specialized Equipment'}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
                {locale === 'vi' 
                  ? 'Phân phối thiết bị phòng sạch chính hãng: buồng thổi khí, tủ an toàn sinh học, hệ thống lọc HEPA hiệu suất cao.' 
                  : 'Distributing authentic cleanroom equipment: air showers, biosafety cabinets, and high-efficiency HEPA filter systems.'}
              </p>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-[#0F62FE] mb-1.5 shrink-0 flex items-center justify-center">
                <Truck className="h-10 w-10 stroke-[1.5]" />
              </div>
              <h3 className="text-[15px] font-extrabold text-[#111827]">
                {locale === 'vi' ? 'Đồng hành Doanh nghiệp' : 'Enterprise Partnership'}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
                {locale === 'vi' 
                  ? 'Tư vấn thiết kế phòng sạch, đào tạo quy trình vận hành và hỗ trợ kỹ thuật liên tục cho doanh nghiệp sản xuất.' 
                  : 'Advising on cleanroom design, training on operation procedures, and providing continuous technical support for manufacturers.'}
              </p>
            </div>
          </div>

          {/* Action button - Centered & Premium Blue */}
          <div className="text-center pt-4">
            <Link 
              href="/cart"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#0F62FE] hover:bg-[#0050E6] text-white font-extrabold text-xs rounded-[3px] transition-all shadow-md shadow-blue-200/50 cursor-pointer group uppercase tracking-wider"
            >
              {locale === 'vi' ? 'Đặt hàng' : 'Order Now'}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FLOATING TOAST NOTIFICATION ON ADD TO RFQ
         ════════════════════════════════════════════════════════════ */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white p-4 rounded-[3px] shadow-2xl border border-slate-800 animate-in slide-in-from-bottom duration-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="text-xs min-w-0">
            <p className="font-extrabold text-white">Đã thêm vào giỏ hàng!</p>
            <p className="text-slate-300 truncate max-w-[220px] font-medium mt-0.5">{addedToast}</p>
          </div>
          <Link
            href="/cart"
            className="ml-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-[3px] transition-colors shrink-0 shadow-sm"
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
                className="rounded-[3px] p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
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
                className={`w-full text-left px-3.5 py-2.5 rounded-[3px] text-xs font-semibold ${
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
                  className={`w-full text-left px-3.5 py-2.5 rounded-[3px] text-xs font-semibold truncate flex items-center justify-between ${
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



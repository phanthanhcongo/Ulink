'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPendingCategoryFilter, clearPendingCategoryFilter } from '@/lib/filter-session';
import { readCart, persistCart } from '../rfq/cart-types';
import CoreCapabilities from '@/components/solutions/core-capabilities';
import { CategoryHeroBanner } from './category-hero-banner';
import { CategoryQuickTabs } from './category-quick-tabs';
import { ProductFilters } from './product-filters';
import { ProductsToolbar } from './products-toolbar';
import { ProductsGrid } from './products-grid';
import { AddToCartToast } from './add-to-cart-toast';
import { MobileFilterDrawer } from './mobile-filter-drawer';
import { CategoryCTA } from './category-cta';

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
  industries?: Array<{
    id: number;
    name: string;
    slug: string;
    translations?: any[];
  }>;
  specifications?: Record<string, string> | null;
  price?: number | null;
}

interface CategoryProductsClientProps {
  category: CategoryInfo;
  products: ProductItem[];
  allCategories: Array<{ id: number; name: string; slug: string }>;
  locale: string;
  isSearchPage?: boolean;
  initialSearchQuery?: string;
}

const PARENT_SUBCATEGORY_MAP: Record<string, string[]> = {
  'cleanroom-consumables': [
    'cleanroom-gloves',
    'cleanroom-wipers',
    'cleanroom-apparel',
    'cleanroom-masks',
    'cleanroom-chemicals'
  ],
  'industrial-packaging': [
    'esd-shielding-bag',
    'pe-stretch-wrap'
  ],
  'esd-supplies': [
    'esd-table-mat',
    'ionizer-fan'
  ]
};

export function CategoryProductsClient({
  category,
  products: initialProducts,
  allCategories,
  locale,
  isSearchPage = false,
  initialSearchQuery = ''
}: CategoryProductsClientProps) {
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    category.slug && category.slug !== 'all' ? [category.slug] : []
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const categoryFromUrl = searchParams?.get('category');
    const pendingCategory = getPendingCategoryFilter();

    if (pendingCategory) {
      setSelectedCategories([pendingCategory]);
      clearPendingCategoryFilter();
    } else if (categoryFromUrl) {
      const cats = categoryFromUrl.split(',').map((c) => c.trim()).filter(Boolean);
      setSelectedCategories(cats);
    } else if (category.slug && category.slug !== 'all') {
      setSelectedCategories([category.slug]);
    }
  }, [searchParams, category.slug]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [categoriesExpanded, setCategoriesExpanded] = useState<boolean>(true);
  const [standardsExpanded, setStandardsExpanded] = useState<boolean>(false);
  const [brandsExpanded, setBrandsExpanded] = useState<boolean>(false);
  const [industriesExpanded, setIndustriesExpanded] = useState<boolean>(false);
  const [materialsExpanded, setMaterialsExpanded] = useState<boolean>(false);
  const maxProductPrice = useMemo(() => {
    let max = 0;
    initialProducts.forEach((p) => {
      if (p.price && p.price > max) {
        max = p.price;
      }
    });
    return max > 0 ? max : 1000000;
  }, [initialProducts]);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(maxProductPrice);

  useEffect(() => {
    setMaxPrice(maxProductPrice);
  }, [maxProductPrice]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [addedProductIds, setAddedProductIds] = useState<Set<number>>(new Set());

  // Search states
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [searchInput, setSearchInput] = useState<string>(initialSearchQuery);

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (searchInput.trim() !== '') {
        url.searchParams.set('q', searchInput);
      } else {
        url.searchParams.delete('q');
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  // Pagination states
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset page when category, sorting, or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, sortBy, selectedBrands, selectedStandards, selectedIndustries, selectedMaterials, minPrice, maxPrice, searchQuery]);

  const tabsList = useMemo(() => {
    if (category.subCategories && category.subCategories.length > 0) {
      return category.subCategories;
    }
    if (category.slug === 'all') {
      return allCategories;
    }
    return [];
  }, [category, allCategories]);

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

  // Dynamic Industry (Application) list with count of products
  const industryCounts = useMemo(() => {
    const counts: Record<string, { name: string; count: number }> = {};
    initialProducts.forEach((p) => {
      p.industries?.forEach((ind) => {
        if (ind.slug) {
          const prev = counts[ind.slug];
          counts[ind.slug] = {
            name: ind.name || ind.slug,
            count: (prev?.count || 0) + 1
          };
        }
      });
    });
    return counts;
  }, [initialProducts]);

  // Dynamic Material (Chất liệu) list with count of products
  const materialCounts = useMemo(() => {
    const counts: Record<string, { name: string; count: number }> = {};
    initialProducts.forEach((p) => {
      const specs = p.specifications;
      if (specs) {
        const materialKey = Object.keys(specs).find(
          (key) => key.toLowerCase() === 'chất liệu' || key.toLowerCase() === 'material'
        );
        if (materialKey) {
          const rawValue = specs[materialKey];
          if (rawValue) {
            const values = rawValue.split(',').map((v) => v.trim()).filter(Boolean);
            values.forEach((val) => {
              const prev = counts[val];
              counts[val] = {
                name: val,
                count: (prev?.count || 0) + 1
              };
            });
          }
        }
      }
    });
    return counts;
  }, [initialProducts]);

  // Filter products by Category, Subcategories, Brands, and ISO Standards
  const filteredProducts = useMemo(() => {
    const subSlugs = category.subCategories?.map((s) => s.slug) || [];
    const result = initialProducts.filter((product) => {
      // 0. Search Query Filter
      if (isSearchPage && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesCategory = product.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // 1. Category Filter
      if (selectedCategories.length > 0) {
        const matchesCategory = selectedCategories.some((selCat) => {
          if (selCat === 'all') return true;

          const isDirectMatch = product.categorySlug === selCat;

          // If selCat is a parent category, match any product in its subcategories
          const subcategoriesOfSelected = PARENT_SUBCATEGORY_MAP[selCat] || [];
          const isSubMatch = subcategoriesOfSelected.includes(product.categorySlug);

          // If selCat is a subcategory, find its parent category
          const parentCategoryOfSelCat = Object.keys(PARENT_SUBCATEGORY_MAP).find((parentKey) =>
            PARENT_SUBCATEGORY_MAP[parentKey].includes(selCat)
          );
          const isParentMatch = Boolean(parentCategoryOfSelCat && product.categorySlug === parentCategoryOfSelCat);

          const isCustomParentMatch =
            selCat === category.slug &&
            (subSlugs.includes(product.categorySlug) || !product.categorySlug);

          // Keyword fallback for specific subcategories if DB product category is generic
          let isKeywordMatch = false;
          if (selCat === 'cleanroom-wipers') {
            const text = `${product.name} ${product.shortDescription}`.toLowerCase();
            isKeywordMatch = text.includes('wiper') || text.includes('khăn lau') || text.includes('lau');
          } else if (selCat === 'cleanroom-gloves') {
            const text = `${product.name} ${product.shortDescription}`.toLowerCase();
            isKeywordMatch = text.includes('găng') || text.includes('glove') || text.includes('nitrile') || text.includes('latex');
          } else if (selCat === 'industrial-packaging') {
            const text = `${product.name} ${product.shortDescription}`.toLowerCase();
            isKeywordMatch = text.includes('màng') || text.includes('bao bì') || text.includes('túi') || text.includes('băng keo') || text.includes('pallet');
          }

          return isDirectMatch || isSubMatch || isParentMatch || isCustomParentMatch || isKeywordMatch;
        });

        if (!matchesCategory) {
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

      // 4. Industries (Application) Filter
      if (selectedIndustries.length > 0) {
        const productIndSlugs = product.industries?.map((ind) => ind.slug).filter(Boolean) || [];
        const hasMatchingIndustry = selectedIndustries.some((indSlug) => productIndSlugs.includes(indSlug));
        if (!hasMatchingIndustry) {
          return false;
        }
      }

      // 5. Material Filter
      if (selectedMaterials.length > 0) {
        const specs = product.specifications;
        let hasMatchingMaterial = false;
        if (specs) {
          const materialKey = Object.keys(specs).find(
            (key) => key.toLowerCase() === 'chất liệu' || key.toLowerCase() === 'material'
          );
          if (materialKey) {
            const rawValue = specs[materialKey];
            if (rawValue) {
              const productMaterials = rawValue.split(',').map((v) => v.trim()).filter(Boolean);
              hasMatchingMaterial = selectedMaterials.some((selMat) => productMaterials.includes(selMat));
            }
          }
        }
        if (!hasMatchingMaterial) {
          return false;
        }
      }

      // 6. Price Filter
      const hasActivePriceFilter = minPrice > 0 || maxPrice < maxProductPrice;
      if (hasActivePriceFilter) {
        if (product.price === undefined || product.price === null) {
          return false;
        }
        if (product.price < minPrice || product.price > maxPrice) {
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
  }, [initialProducts, selectedCategories, category, sortBy, selectedBrands, selectedStandards, selectedIndustries, selectedMaterials, minPrice, maxPrice, maxProductPrice, isSearchPage, searchQuery]);

  // Compute total pages & displayed products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Active category display name
  const currentCategoryName = useMemo(() => {
    if (selectedCategories.length === 0) return 'Tất cả sản phẩm';
    if (selectedCategories.length === 1) {
      const found = allCategories.find((c) => c.slug === selectedCategories[0]);
      return found ? found.name : category.name;
    }
    return locale === 'vi' ? 'Nhiều danh mục' : 'Multiple Categories';
  }, [selectedCategories, allCategories, category.name, locale]);

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

  const handleToggleIndustry = (industrySlug: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industrySlug)
        ? prev.filter((i) => i !== industrySlug)
        : [...prev, industrySlug]
    );
  };

  const handleToggleCategory = (categorySlug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categorySlug)
        ? prev.filter((c) => c !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const handleToggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1000);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1000);
    setMaxPrice(value);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('vi-VN');
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedStandards([]);
    setSelectedIndustries([]);
    setSelectedMaterials([]);
    setMinPrice(0);
    setMaxPrice(maxProductPrice);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 relative">
      {/* Hero Banner */}
      <CategoryHeroBanner
        isSearchPage={isSearchPage}
        currentCategoryName={currentCategoryName}
        categoryDescription={category.description}
        categorySlug={category.slug}
        locale={locale}
        searchQuery={searchQuery}
        searchInput={searchInput}
        filteredProductsCount={filteredProducts.length}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Quick Tabs */}
      <CategoryQuickTabs
        tabs={tabsList}
        selectedCategories={selectedCategories}
        categoryCounts={categoryCounts}
        locale={locale}
        onCategoryChange={handleToggleCategory}
        onShowAll={() => setSelectedCategories([])}
      />

      {/* Main Content */}
      <div className="w-full bg-slate-50/70 py-8">
        <div className="page-container">
          <div className="bg-white py-8 px-6 rounded-[3px] shadow-xs border border-slate-200/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Filters Sidebar */}
              <ProductFilters
                locale={locale}
                allCategories={allCategories}
                categoryCounts={categoryCounts}
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
                onSelectAllCategories={() => setSelectedCategories([])}
                brandCounts={brandCounts}
                selectedBrands={selectedBrands}
                onToggleBrand={handleToggleBrand}
                standardCounts={standardCounts}
                selectedStandards={selectedStandards}
                onToggleStandard={handleToggleStandard}
                industryCounts={industryCounts}
                selectedIndustries={selectedIndustries}
                onToggleIndustry={handleToggleIndustry}
                materialCounts={materialCounts}
                selectedMaterials={selectedMaterials}
                onToggleMaterial={handleToggleMaterial}
                minPrice={minPrice}
                maxPrice={maxPrice}
                maxProductPrice={maxProductPrice}
                onMinPriceChange={handleMinChange}
                onMaxPriceChange={handleMaxChange}
                onResetFilters={handleResetFilters}
              />

              {/* Products Area */}
              <main className="lg:col-span-8 xl:col-span-9 space-y-6">
                {/* Toolbar */}
                <ProductsToolbar
                  locale={locale}
                  filteredProductsCount={filteredProducts.length}
                  currentCategoryName={currentCategoryName}
                  isSearchPage={isSearchPage}
                  sortBy={sortBy}
                  viewType={viewType}
                  onSortChange={setSortBy}
                  onViewChange={setViewType}
                  onMobileFilterOpen={() => setMobileFilterOpen(true)}
                />

                {/* Products Grid */}
                <ProductsGrid
                  products={displayedProducts}
                  viewType={viewType}
                  locale={locale}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                  onAddToCart={handleAddToCart}
                  addedProductIds={addedProductIds}
                  onShowAllProducts={() => setSelectedCategories([])}
                />
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <CategoryCTA locale={locale} />

      {/* === SECTION: Core Capabilities === */}
      <CoreCapabilities />

      {/* Toast Notification */}
      <AddToCartToast productName={addedToast} locale={locale} />

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        locale={locale}
        allCategories={allCategories}
        categoryCounts={categoryCounts}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        onSelectAllCategories={() => setSelectedCategories([])}
        onClose={() => setMobileFilterOpen(false)}
      />
    </div>
  );
}




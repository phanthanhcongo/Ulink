import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import {
  CategoryProductsClient,
  CategoryInfo,
  ProductItem
} from '@/components/solutions/category-products-client';
import { fetchProducts, fetchProductCategories } from '@/lib/product-data';
import { getTranslatedName, getTranslatedField } from '@/lib/i18n-content';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { resolveImageUrl } from '@/lib/image-url';
import { ASSETS } from '@/lib/assets';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

const ALL_CATEGORIES_LIST = [
  { id: 1, name: 'Vật tư phòng sạch', slug: 'cleanroom-consumables' },
  { id: 2, name: 'Găng tay phòng sạch', slug: 'cleanroom-gloves' },
  { id: 3, name: 'Khăn lau phòng sạch', slug: 'cleanroom-wipers' },
  { id: 4, name: 'Quần áo phòng sạch', slug: 'cleanroom-apparel' },
  { id: 5, name: 'Khẩu trang phòng sạch', slug: 'cleanroom-masks' },
  { id: 6, name: 'Bao bì công nghiệp', slug: 'industrial-packaging' },
  { id: 7, name: 'Vật tư ESD', slug: 'esd-supplies' },
  { id: 8, name: 'Hóa chất phòng sạch', slug: 'cleanroom-chemicals' }
];

// Map parent category slugs to their subcategory slugs
const PARENT_SUBCATEGORY_MAP: Record<string, string[]> = {
  'vat-tu-phong-sach': [
    'vat-tu-phong-sach', 'quan-ao-phong-sach', 'gang-tay-phong-sach',
    'khau-trang-phong-sach', 'vai-lau-phong-sach', 'tham-dinh-bui',
    'dung-cu-ve-sinh', 'phu-kien-khac'
  ],
  'bao-bi-dong-goi': [
    'bao-bi-dong-goi', 'mang-quan-pallet-cat', 'thung-carton-cac-loai',
    'bang-keo-cong-nghiep', 'tui-pe-pp-ziper', 'pallet-nhua-go',
    'day-dai-dong-hang', 'vat-lieu-dem-lot'
  ],
  'bang-keo-nhom': [
    'bang-keo-nhom', 'bang-keo-nhom-tieu-chuan', 'bang-keo-nhom-chiu-nhiet',
    'bang-keo-nhom-gia-co-luoi', 'bang-keo-nhom-cach-nhiet-cat',
    'bang-keo-nhom-ong-gio', 'bang-keo-nhom-ma-kem-cat', 'bang-keo-nhom-tu-dinh-cat'
  ]
};

export default async function ProductsSearchPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { q = '', category = '' } = await searchParams;
  setRequestLocale(locale);

  const { products: dbProducts } = await fetchProducts({ limit: 100 });
  const dbCategories = await fetchProductCategories();

  const categoriesList =
    dbCategories.length > 0
      ? dbCategories.map((c) => ({
          id: c.id,
          name: getTranslatedName(c, locale) || c.name,
          slug: c.slug
        }))
      : ALL_CATEGORIES_LIST;

  // Build all products
  const allProducts: ProductItem[] = dbProducts.map((p) => {
    const firstSku = p.skus?.find((s) => s.status === 'published') || p.skus?.[0];
    const catObj =
      typeof p.category === 'object' && p.category !== null ? (p.category as any) : null;
    const categoryName = catObj
      ? getTranslatedName(catObj, locale) || catObj.name
      : 'Vật tư công nghiệp';

    let resolvedImage: string | undefined = undefined;
    if (p.hero) {
      try {
        if (typeof p.hero === 'string') {
          const parsed = JSON.parse(p.hero);
          if (Array.isArray(parsed) && parsed[0]) {
            resolvedImage = parsed[0];
          } else if (typeof parsed === 'string') {
            resolvedImage = parsed;
          }
        } else if (Array.isArray(p.hero) && p.hero[0]) {
          resolvedImage = p.hero[0];
        } else if (typeof p.hero === 'object' && p.hero !== null) {
          const heroId = (p.hero as any).id;
          if (heroId) {
            resolvedImage = resolveImageUrl(heroId) ?? undefined;
          }
        }
      } catch (e) {
        resolvedImage = resolveImageUrl(p.hero as any) ?? undefined;
      }
    }
    if (!resolvedImage) {
      resolvedImage = ASSETS.home.solutionCleanroom;
    }
    const productStandards = Array.isArray(p.standards)
      ? p.standards.map((s: any) => s.standards_id).filter(Boolean)
      : [];

    const productIndustries = Array.isArray(p.industries)
      ? p.industries.map((ind: any) => ind.industries_id).filter(Boolean)
      : [];

    return {
      id: p.id,
      name: getTranslatedName(p, locale) || p.name,
      slug: p.slug,
      brand: p.brand || 'ULink',
      categoryName,
      categorySlug: catObj?.slug || 'cleanroom-consumables',
      shortDescription:
        getTranslatedField(p, 'short_description', locale) || p.short_description || '',
      stockStatus: (firstSku?.stock_status as any) || 'in_stock',
      image: resolvedImage,
      hero: p.hero,
      unit: firstSku?.unit ?? '',
      packSize: firstSku?.pack_size ?? '',
      specs: ['Tiêu chuẩn ISO / ESD', 'Chính hãng 100%'],
      standards: productStandards,
      industries: productIndustries,
      specifications: p.specifications || null,
      price: firstSku?.price || null
    };
  });

  // Pre-filter products based on search query and/or category
  const searchQuery = q.toLowerCase().trim();
  const categorySlug = category.trim();

  let filteredProducts = allProducts;

  // 1. Filter by category if provided
  if (categorySlug) {
    const subSlugs = PARENT_SUBCATEGORY_MAP[categorySlug] || [];
    filteredProducts = filteredProducts.filter((p) => {
      return (
        p.categorySlug === categorySlug ||
        subSlugs.includes(p.categorySlug)
      );
    });
  }

  // 2. Filter by search query if provided
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) => {
      const matchesName = p.name.toLowerCase().includes(searchQuery);
      const matchesDesc = p.shortDescription.toLowerCase().includes(searchQuery);
      const matchesCategory = p.categoryName.toLowerCase().includes(searchQuery);
      return matchesName || matchesDesc || matchesCategory;
    });
  }

  // Only show categories relevant to the current context
  let relevantCategories: typeof categoriesList;
  if (categorySlug) {
    // Show only sub-categories that have matching products (not the parent)
    const subSlugs = PARENT_SUBCATEGORY_MAP[categorySlug] || [];
    const matchedSlugs = new Set(filteredProducts.map((p) => p.categorySlug));
    relevantCategories = categoriesList.filter(
      (c) => subSlugs.includes(c.slug) && matchedSlugs.has(c.slug)
    );
  } else {
    // When searching, show categories that have at least one matching product
    const matchedCategorySlugs = new Set(filteredProducts.map((p) => p.categorySlug));
    relevantCategories = categoriesList.filter((c) => matchedCategorySlugs.has(c.slug));
  }

  // Build category info based on context
  const matchedCategory = categorySlug
    ? categoriesList.find((c) => c.slug === categorySlug)
    : null;

  const categoryInfo: CategoryInfo = {
    id: matchedCategory?.id ?? 0,
    name: matchedCategory?.name ?? (searchQuery
      ? (locale === 'vi' ? `Kết quả tìm kiếm: "${q}"` : `Search results: "${q}"`)
      : (locale === 'vi' ? 'Sản phẩm' : 'Products')),
    slug: categorySlug || 'search',
    description:
      matchedCategory
        ? ''
        : searchQuery
          ? (locale === 'vi'
            ? `Hiển thị ${filteredProducts.length} sản phẩm liên quan đến "${q}"`
            : `Showing ${filteredProducts.length} products related to "${q}"`)
          : ''
  };

  return (
    <CategoryProductsClient
      category={categoryInfo}
      products={filteredProducts}
      allCategories={relevantCategories}
      locale={locale}
      isSearchPage={true}
      initialSearchQuery={q}
    />
  );
}

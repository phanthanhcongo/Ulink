import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { fetchTopCategoriesWithProducts, getProductPricing } from '@/lib/product-data';
import { getTranslatedName } from '@/lib/i18n-content';
import type { Product } from '@/lib/directus';
import { ProductCard } from './product-card';
import { CategoryNavLink } from './category-nav-link';

interface CatalogShowcaseProps {
  locale: string;
}

export default async function CatalogShowcase({ locale }: CatalogShowcaseProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });
  const categoriesWithProducts = await fetchTopCategoriesWithProducts(4, 4);

  console.log('[CatalogShowcase] Data received:', {
    categoriesCount: categoriesWithProducts.length,
    categories: categoriesWithProducts.map(c => ({ name: c.category.name, productsCount: c.products.length }))
  });

  if (categoriesWithProducts.length === 0) {
    return (
      <section className="w-full bg-white border-t border-gray-150 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="page-container">
          <div className="text-center py-12">
            <p className="text-slate-500">{locale === 'vi' ? 'Không có sản phẩm nào' : 'No products available'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white border-t border-gray-150 py-8 sm:py-12 md:py-16 lg:py-24">
      <div className="page-container">
        {/* Section Header - Responsive */}
        <div className="flex flex-col items-start border-b border-gray-100 pb-6 sm:pb-8 mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-2">
            <span className="h-4 w-1.5 bg-blue-600 rounded-[3px] shrink-0" />
            <span className="text-caption-responsive sm:text-sm font-bold uppercase tracking-wider text-slate-800">
              {t('catalogSection.eyebrow')}
            </span>
          </div>
          <p className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-card-title font-bold text-slate-700 leading-snug max-w-3xl">
            {t('catalogSection.subtitle')}
          </p>
        </div>

        {/* Rows of categories - Responsive spacing */}
        <div className="space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16">
          {categoriesWithProducts.map((catData) => {
            const categoryName = getTranslatedName(catData.category, locale);
            return (
              <div key={catData.category.id} className="flex flex-col">
                {/* Category Title bar - Responsive (1 single row on all devices) */}
                <div className="flex flex-row items-center justify-between border-b border-gray-200 pb-3 sm:pb-4 mb-4 sm:mb-6 gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-5 w-1 bg-blue-600 rounded-[3px] shrink-0" />
                    <h3 className="text-base sm:text-card-title font-bold text-slate-900 leading-tight truncate">
                      {categoryName}
                    </h3>
                  </div>
                  <CategoryNavLink
                    categorySlug={catData.category.slug}
                    href="/solutions/listProduct"
                    className="group inline-flex items-center gap-1 sm:gap-1.5 text-caption-responsive font-semibold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    {t('catalogSection.viewAll')}
                    <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </CategoryNavLink>
                </div>

                {/* Product Grid - Responsive Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                  {catData.products.map((product: Product, index: number) => {
                    const firstSku = product.skus?.[0];

                    // DEBUG: Log product data
                    if (product.id === catData.products[0]?.id) {
                      console.log('DEBUG Product:', {
                        id: product.id,
                        name: product.name,
                        hero: product.hero,
                        skus: product.skus,
                        firstSkuPrice: firstSku?.price,
                        firstSkuUnit: firstSku?.unit,
                        directusUrl: process.env.NEXT_PUBLIC_DIRECTUS_URL
                      });
                    }

                    // Convert Directus file ID to image URL
                    const getImageUrl = (fileId: string | null | undefined) => {
                      if (!fileId) return undefined;
                      // Check if it's already a full URL
                      if (fileId.startsWith('http://') || fileId.startsWith('https://') || fileId.startsWith('/')) {
                        return fileId;
                      }
                      // It's a Directus file ID - convert to URL
                      const directusUrl = (process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055').replace(/\/$/, '');
                      return `${directusUrl}/assets/${fileId}`;
                    };

                    // Get price from SKU
                    let displayPrice: string;
                    let displayUnit: string;

                    if (firstSku?.price) {
                      // Price from database
                      const basePrice = firstSku.price;
                      const packSize = firstSku.pack_size;
                      let baseUnit = firstSku.unit || 'cái';

                      // Normalize unit display
                      if (baseUnit === 'đôi') baseUnit = 'pcs';

                      // Try to parse pack_size as number to calculate per-unit price
                      const packSizeNum = packSize ? parseInt(String(packSize), 10) : null;
                      const perUnitPrice = packSizeNum && packSizeNum > 0 ? basePrice / packSizeNum : basePrice;

                      // Calculate price range: 80-100% (discount tier)
                      const minPrice = Math.round(perUnitPrice * 0.8);
                      const maxPrice = Math.round(perUnitPrice);

                      displayPrice = `${minPrice.toLocaleString('vi-VN')}-${maxPrice.toLocaleString('vi-VN')}đ`;
                      displayUnit = `per ${baseUnit}`;
                    } else {
                      // No price in database
                      displayPrice = 'Liên hệ báo giá';
                      displayUnit = '';
                    }

                    return (
                      <div key={product.id} className={index >= 3 ? 'hidden lg:block' : ''}>
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name || '',
                            slug: product.slug || '',
                            description: product.short_description || undefined,
                            image: getImageUrl(product.hero),
                            price: displayPrice || 'Liên hệ báo giá',
                            unit: displayUnit || 'per kg',
                            moq: `MOQ: ${firstSku?.pack_size || 'Liên hệ'}`,
                            moqUnit: firstSku?.unit || undefined,
                            status: firstSku?.stock_status === 'in_stock' ? (locale === 'vi' ? 'Có sẵn tại Kho' : 'In Stock') : (locale === 'vi' ? 'Sản xuất theo yêu cầu' : 'Custom orders'),
                            location: 'Hub Hà Nam, Việt Nam'
                          }}
                          locale={locale}
                          showWishlist={true}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


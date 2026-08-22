import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { fetchTopCategoriesWithProducts } from '@/lib/product-data';
import { getTranslatedName } from '@/lib/i18n-content';
import type { Product } from '@/lib/directus';
import ProductCard from '@/components/product/product-card';

interface CatalogShowcaseProps {
  locale: string;
}

export default async function CatalogShowcase({ locale }: CatalogShowcaseProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });
  const categoriesWithProducts = await fetchTopCategoriesWithProducts(4, 4);

  if (categoriesWithProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#FAFAFA] border-t border-gray-150 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-start border-b border-gray-100 pb-8 mb-12">
          <div className="flex items-center gap-2">
            <span className="h-4 w-1.5 bg-blue-600 rounded-none shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t('catalogSection.eyebrow')}
            </span>
          </div>
          <p className="mt-4 text-lg font-bold text-slate-700 leading-snug">
            {t('catalogSection.subtitle')}
          </p>
        </div>

        {/* Rows of categories */}
        <div className="space-y-16">
          {categoriesWithProducts.map((catData) => {
            const categoryName = getTranslatedName(catData.category, locale);
            return (
              <div key={catData.category.id} className="flex flex-col">
                {/* Category Title bar */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-1 bg-blue-600 rounded-none shrink-0" />
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                      {categoryName}
                    </h3>
                  </div>
                  <Link
                    href={`/solutions/categories/${catData.category.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {t('catalogSection.viewAll')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {catData.products.map((product: Product) => (
                    <ProductCard key={product.id} product={product} locale={locale} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

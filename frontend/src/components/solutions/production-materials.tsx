import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CategoryNavLink } from './category-nav-link';
import { fetchProductCategories } from '@/lib/product-data';
import { getTranslatedName } from '@/lib/i18n-content';

interface ProductionMaterialsProps {
  locale: string;
}

export default async function ProductionMaterials({ locale }: ProductionMaterialsProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  // Dynamically fetch all categories from Directus DB
  const dbCategories = await fetchProductCategories();

  // Filter top-level parent categories (no parent)
  const parentCategories = dbCategories
    .filter((cat) => !cat.parent || (typeof cat.parent === 'object' && !(cat.parent as any).id))
    .slice(0, 3);

  // Default image mapping by slug
  const defaultImages: Record<string, string> = {
    'esd-supplies': '/images/solutions/bangkeo.png',
    'cleanroom-consumables': '/images/solutions/clean.png',
    'industrial-packaging': '/images/solutions/baobi.png'
  };

  const fallbackImages = [
    '/images/solutions/bangkeo.png',
    '/images/solutions/clean.png',
    '/images/solutions/baobi.png'
  ];

  const cards = (parentCategories.length > 0 ? parentCategories : dbCategories.slice(0, 3)).map((cat, idx) => {
    const title = getTranslatedName(cat, locale) || cat.name;
    const image = defaultImages[cat.slug] || fallbackImages[idx % fallbackImages.length];

    return {
      title,
      image,
      categorySlug: cat.slug
    };
  });

  return (
    <section className="w-full bg-white border-t border-gray-150 py-16 lg:py-24">
      <div className="page-container">
        {/* Section Header */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="h-4 w-1 bg-[#1769E2] rounded-[3px]" />
            <span className="text-xs sm:text-sm lg:text-[16px] font-bold uppercase tracking-wider text-[#1769E2]">
              {t('skuSection.eyebrow')}
            </span>
          </div>
          <h2 className="mt-4 text-xl sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold tracking-tight text-slate-900">
            {t('skuSection.title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-[18px] lg:leading-[28px] font-normal text-slate-500 max-w-none lg:whitespace-nowrap">
            {t('skuSection.subtitle')}
          </p>
        </div>

        {/* Cards Grid — 3 Parent Categories */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group ui-card-hover flex flex-col bg-white rounded-[3px] border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="h-[280px] sm:h-[300px] relative overflow-hidden bg-gray-50 flex items-center justify-center">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                <h3 className="text-lg sm:text-xl lg:text-[24px] lg:leading-[30px] font-bold text-slate-900 transition-colors duration-200 group-hover:text-[#1769E2]">
                  {card.title}
                </h3>

                {/* Blue Button */}
                <div className="mt-6 sm:mt-8">
                  <CategoryNavLink
                    categorySlug={card.categorySlug}
                    href={`/solutions/listProduct?category=${card.categorySlug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-[#1769E2] px-5 py-2.5 text-sm sm:text-base lg:text-[16px] font-semibold text-white shadow-sm hover:bg-[#1257BD] transition-colors w-full sm:w-auto"
                  >
                    {t('skuSection.cta')}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </CategoryNavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

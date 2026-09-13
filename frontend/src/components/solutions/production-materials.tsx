import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CategoryNavLink } from './category-nav-link';

interface ProductionMaterialsProps {
  locale: string;
}

export default async function ProductionMaterials({ locale }: ProductionMaterialsProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  const cards = [
    {
      title: t('skuSection.card1Title'),
      image: '/images/solutions/bangkeo.png',
      categorySlug: 'esd-supplies',
      items: [
        { label: t('skuSection.card1Item1'), slug: 'esd-supplies' },
        { label: t('skuSection.card1Item2'), slug: 'esd-supplies' },
        { label: t('skuSection.card1Item3'), slug: 'esd-supplies' }
      ]
    },
    {
      title: t('skuSection.card2Title'),
      image: '/images/solutions/clean.png',
      categorySlug: 'cleanroom-consumables',
      items: [
        { label: t('skuSection.card2Item1'), slug: 'cleanroom-gloves' },
        { label: t('skuSection.card2Item2'), slug: 'cleanroom-wipers' },
        { label: t('skuSection.card2Item3'), slug: 'cleanroom-apparel' }
      ]
    },
    {
      title: t('skuSection.card3Title'),
      image: '/images/solutions/baobi.png',
      categorySlug: 'industrial-packaging',
      items: [
        { label: t('skuSection.card3Item1'), slug: 'industrial-packaging' },
        { label: t('skuSection.card3Item2'), slug: 'industrial-packaging' },
        { label: t('skuSection.card3Item3'), slug: 'industrial-packaging' }
      ]
    }
  ];

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
          <p className="mt-4 text-sm sm:text-base lg:text-[18px] lg:leading-[28px] font-normal text-slate-500 max-w-3xl">
            {t('skuSection.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group ui-card-hover flex flex-col bg-white rounded-[3px] border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="h-[240px] relative overflow-hidden bg-gray-50">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl lg:text-[24px] lg:leading-[30px] font-bold text-slate-900 transition-colors duration-200 group-hover:text-[#1769E2]">{card.title}</h3>

                {/* List items */}
                <ul className="mt-6 space-y-3 flex-1">
                  {card.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <CategoryNavLink
                        categorySlug={item.slug}
                        href={`/solutions/listProduct?category=${item.slug}`}
                        className="flex items-center gap-2 text-sm sm:text-base lg:text-[16px] font-normal text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 shrink-0 rounded-[3px]" />
                        {item.label}
                      </CategoryNavLink>
                    </li>
                  ))}
                </ul>

                {/* Blue Button */}
                <div className="mt-8">
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

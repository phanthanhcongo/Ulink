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
      items: [
        t('skuSection.card1Item1'),
        t('skuSection.card1Item2'),
        t('skuSection.card1Item3'),
      ],
      image: '/images/solutions/bangkeo.png',
      imageFit: 'contain' as const,
      categorySlug: 'industrial-tapes',
    },
    {
      title: t('skuSection.card2Title'),
      items: [
        t('skuSection.card2Item1'),
        t('skuSection.card2Item2'),
        t('skuSection.card2Item3'),
      ],
      image: '/images/solutions/clean.png',
      imageFit: 'cover' as const,
      categorySlug: 'cleanroom-consumables',
    },
    {
      title: t('skuSection.card3Title'),
      items: [
        t('skuSection.card3Item1'),
        t('skuSection.card3Item2'),
        t('skuSection.card3Item3'),
      ],
      image: '/images/solutions/baobi.png',
      imageFit: 'contain' as const,
      categorySlug: 'industrial-packaging',
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="page-container">
        {/* Section Header */}
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center gap-1.5 text-[#1769E2] font-bold text-sm sm:text-base lg:text-lg">
            <span className="font-extrabold text-lg leading-none">|</span>
            <span>{t('skuSection.eyebrow')}</span>
          </div>

          <h2 className="mt-3.5 text-2xl sm:text-3xl lg:text-[34px] lg:leading-[42px] font-bold tracking-tight text-slate-900 w-full whitespace-normal lg:whitespace-nowrap">
            {t('skuSection.title')}
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-5xl">
            {t('skuSection.subtitle')}
          </p>
        </div>

        {/* 3 SKU Category Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group flex flex-col bg-white rounded-[3px] border border-slate-200/90 shadow-xs hover:border-[#1769E2] hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Image Box */}
              <div className="relative h-[250px] sm:h-[270px] w-full bg-white flex items-center justify-center overflow-hidden">
                {card.imageFit === 'contain' ? (
                  <div className="relative w-full h-full p-6 flex items-center justify-center">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white border-t border-slate-100">
                <div>
                  <h3 className="text-xl sm:text-[22px] font-bold text-slate-900 mb-4 transition-colors group-hover:text-[#1769E2]">
                    {card.title}
                  </h3>

                  {/* Sub-items list */}
                  <ul className="space-y-2 mb-6">
                    {card.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-[1px] border-[1.5px] border-[#1769E2] bg-[#ebf3fe] inline-block shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <CategoryNavLink
                    categorySlug={card.categorySlug}
                    href={`/solutions/listProduct?category=${card.categorySlug}`}
                    className="inline-flex items-center gap-1.5 rounded-[3px] bg-[#f1f5f9] px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-[#1769E2] hover:text-white transition-colors"
                  >
                    {t('skuSection.cta')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
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


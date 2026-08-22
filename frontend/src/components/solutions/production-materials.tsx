import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface ProductionMaterialsProps {
  locale: string;
}

export default async function ProductionMaterials({ locale }: ProductionMaterialsProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });

  const cards = [
    {
      title: t('skuSection.card1Title'),
      image: '/images/home/section2/product-hvac-tape.webp',
      href: '/solutions/categories/cleanroom-wipers',
      items: [
        t('skuSection.card1Item1'),
        t('skuSection.card1Item2'),
        t('skuSection.card1Item3')
      ]
    },
    {
      title: t('skuSection.card2Title'),
      image: '/images/about/quality-lab.webp',
      href: '/solutions/categories/cleanroom-consumables',
      items: [
        t('skuSection.card2Item1'),
        t('skuSection.card2Item2'),
        t('skuSection.card2Item3')
      ]
    },
    {
      title: t('skuSection.card3Title'),
      image: '/images/home/section2/product-custom-pkg.webp',
      href: '/solutions/categories/industrial-packaging',
      items: [
        t('skuSection.card3Item1'),
        t('skuSection.card3Item2'),
        t('skuSection.card3Item3')
      ]
    }
  ];

  return (
    <section className="w-full bg-white border-t border-gray-150 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="h-4 w-1 bg-blue-600 rounded-[3px]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              {t('skuSection.eyebrow')}
            </span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t('skuSection.title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-3xl leading-relaxed">
            {t('skuSection.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white rounded-[3px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
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
                <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>

                {/* List items */}
                <ul className="mt-6 space-y-3 flex-1">
                  {card.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-blue-500 shrink-0 rounded-[3px]" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Blue Button */}
                <div className="mt-8">
                  <Link
                    href={card.href}
                    className="inline-flex items-center justify-center gap-2 rounded-[3px] bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors w-full sm:w-auto"
                  >
                    {t('skuSection.cta')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

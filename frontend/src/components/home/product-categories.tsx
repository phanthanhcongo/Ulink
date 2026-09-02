import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { SectionHeader } from './section-header';

export async function ProductCategories() {
  const t = await getTranslations('home');

  const topTwoCards = [
    {
      id: 'cleanroom',
      title: t('categories.cleanroomTitle'),
      description: t('categories.cleanroomDesc'),
      href: '/solutions/listProduct?category=cleanroom-consumables',
      image: ASSETS.home.cateCleanroom,
      icon: ASSETS.home.solutionCleanroom,
      accentBorder: 'border-l-brand',
      indicatorBg: 'bg-brand',
      items: [
        { label: t('categories.cleanroomItem1'), href: '/solutions/listProduct?category=cleanroom-gloves' },
        { label: t('categories.cleanroomItem2'), href: '/solutions/listProduct?category=cleanroom-apparel' },
        { label: t('categories.cleanroomItem3'), href: '/solutions/listProduct?category=cleanroom-wipers' },
        { label: t('categories.cleanroomItem4'), href: '/solutions/listProduct?category=cleanroom-masks' },
        {
          label: t('categories.cleanroomItem5'),
          href: '/solutions/listProduct?category=cleanroom-consumables'
        },
        { label: t('categories.cleanroomItem6'), href: '/solutions/listProduct?category=esd-supplies' }
      ]
    },
    {
      id: 'packaging',
      title: t('categories.packagingTitle'),
      description: t('categories.packagingDesc'),
      href: '/solutions/listProduct?category=industrial-packaging',
      image: ASSETS.home.catePackaging,
      icon: ASSETS.home.solutionPackaging,
      accentBorder: 'border-l-[#dec5b4]',
      indicatorBg: 'bg-[#dec5b4]',
      items: [
        { label: t('categories.packagingItem1'), href: '/solutions/listProduct?category=industrial-packaging' },
        { label: t('categories.packagingItem2'), href: '/solutions/listProduct?category=industrial-packaging' },
        { label: t('categories.packagingItem3'), href: '/solutions/listProduct?category=industrial-packaging' },
        { label: t('categories.packagingItem4'), href: '/solutions/listProduct?category=industrial-packaging' },
        { label: t('categories.packagingItem5'), href: '/solutions/listProduct?category=industrial-packaging' },
        { label: t('categories.packagingItem6'), href: '/solutions/listProduct?category=industrial-packaging' }
      ]
    }
  ];

  const bottomThreeCards = [
    {
      id: 'cut-protection',
      title: t('categories.cutResistantTitle'),
      description: t('categories.cutResistantDesc'),
      href: '/solutions/listProduct?category=cleanroom-gloves',
      image: ASSETS.home.cateCutProtection,
      accentBorder: 'border-l-brand'
    },
    {
      id: 'hvac-tape',
      title: t('categories.hvacTapeTitle'),
      description: t('categories.hvacTapeDesc'),
      href: '/solutions/listProduct?category=industrial-packaging',
      image: ASSETS.home.cateHvacTape,
      accentBorder: 'border-l-brand'
    },
    {
      id: 'custom-packaging',
      title: t('categories.customPkgTitle'),
      description: t('categories.customPkgDesc'),
      href: '/solutions/listProduct?category=industrial-packaging',
      image: ASSETS.home.cateCustomPackaging,
      accentBorder: 'border-l-[#dec5b4]'
    }
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12 xl:px-16 lg:py-10 xl:py-12">
      {/* SECTION HEADER BAR */}
      <SectionHeader
        title={t('categories.sectionTitle')}
        subtitle={t('categories.sectionSubTitle')}
      />

      {/* TOP ROW: 2 BIG SOLUTION CARDS */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-6 xl:gap-8">
        {topTwoCards.map((card) => (
          <div
            key={card.id}
            className={`group ui-card-hover flex flex-col overflow-hidden rounded-[6px] border border-slate-200 bg-white border-l-[10px] sm:border-l-[12px] ${card.accentBorder} shadow-[0_4px_20px_-4px_rgba(6,26,54,0.08)]`}
          >
            {/* Top Image Banner */}
            <Link href={card.href} className="relative aspect-[16/9] h-[240px] sm:h-[310px] md:h-[460px] lg:h-[340px] xl:h-[370px] w-full overflow-hidden bg-slate-50 block">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </Link>

            {/* Card Content Body */}
            <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-6 xl:p-8">
              <Link href={card.href} className="block">
                <h3 className="flex items-center gap-2.5 text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[24px] font-bold text-slate-900 leading-[24px] sm:leading-[26px] lg:leading-[28px] xl:leading-[32px] group-hover:text-brand transition-colors">
                  <span className={`inline-block h-2.5 w-2.5 rotate-45 shrink-0 ${card.indicatorBg}`} />
                  <span>{card.title}</span>
                </h3>
              </Link>
              <p className="mt-2.5 text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-normal leading-[20px] sm:leading-[22px] lg:leading-[24px] text-slate-600">
                {card.description}
              </p>

              {/* 2-Column List of Sub-Items (Mobile: mỗi dòng border riêng | Desktop: bọc 2 cột border xám) */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                {/* Cột 1 */}
                <div className="flex flex-col gap-2.5 p-0 sm:p-3.5 sm:p-4 sm:rounded-[4px] sm:bg-[#F9FAFB] sm:border sm:border-[#CBD5E1]">
                  {card.items.slice(0, 3).map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex items-center gap-2 text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-normal leading-[18px] sm:leading-[18px] lg:leading-[20px] text-slate-800 transition-colors hover:text-brand p-3 rounded-[4px] bg-[#F9FAFB] border border-[#CAD5E2] sm:p-0 sm:rounded-none sm:bg-transparent sm:border-0"
                    >
                      <Image
                        src="/images/icons/iconBox.png"
                        alt="Icon Box"
                        width={20}
                        height={20}
                        className="h-5 w-5 shrink-0 object-contain"
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Cột 2 */}
                <div className="flex flex-col gap-2.5 p-0 sm:p-3.5 sm:p-4 sm:rounded-[4px] sm:bg-[#F9FAFB] sm:border sm:border-[#CBD5E1]">
                  {card.items.slice(3, 6).map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="flex items-center gap-2 text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-normal leading-[18px] sm:leading-[18px] lg:leading-[20px] text-slate-800 transition-colors hover:text-brand p-3 rounded-[4px] bg-[#F9FAFB] border border-[#CAD5E2] sm:p-0 sm:rounded-none sm:bg-transparent sm:border-0"
                    >
                      <Image
                        src="/images/icons/iconBox.png"
                        alt="Icon Box"
                        width={20}
                        height={20}
                        className="h-5 w-5 shrink-0 object-contain"
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Right Action Link */}
              <div className="mt-8 flex justify-end pt-3 border-t border-slate-100">
                <Link href={card.href} className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-bold text-brand transition-all group-hover:gap-2.5">
                  <span>{t('categories.viewDetail')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM ROW: 3 FEATURE CARDS */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-4 lg:grid-cols-3 lg:gap-4 xl:gap-5">
        {bottomThreeCards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className={`ui-card-hover flex flex-col overflow-hidden rounded-[6px] border border-slate-200 bg-white border-l-[10px] sm:border-l-[12px] ${card.accentBorder} shadow-[0_4px_12px_rgba(0,0,0,0.05)]`}
          >
            {/* Top Image Banner */}
            <div className="relative w-full aspect-[425/238] overflow-hidden bg-slate-50">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>

            {/* Card Content Body */}
            <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-6 xl:p-8 justify-between">
              <div>
                <h3 className="text-[15px] sm:text-[16px] lg:text-[18px] xl:text-[20px] font-bold text-slate-900 leading-[22px] sm:leading-[24px] lg:leading-[26px] xl:leading-[28px] group-hover:text-brand transition-colors">
                  {card.title}
                </h3>
                <div className="my-3 border-b border-dashed border-slate-300" />
                <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-normal leading-[20px] sm:leading-[22px] lg:leading-[24px] text-slate-600">
                  {card.description}
                </p>
              </div>

              {/* Bottom Right Action Link */}
              <div className="mt-6 flex justify-end pt-3 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-bold text-brand transition-all group-hover:gap-2.5">
                  <span>{t('categories.viewMore')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}



import Image from 'next/image';
import { AboutSectionHeader } from './about-section-header';
import { getTranslations } from 'next-intl/server';

export async function AboutInfrastructure() {
  const t = await getTranslations('aboutHub.operations');
  const items = [
    { image: '/images/about/gallery/cleanroom-materials-warehouse.png', title: t('warehouse'), desc: t('warehouseDesc') },
    { image: '/images/about/gallery/smart-wms-warehouse.png', title: t('wms'), desc: t('wmsDesc') },
    { image: '/images/about/gallery/logistics-delivery-truck.png', title: t('network'), desc: t('networkDesc') },
    { image: '/images/about/gallery/operation-team.png', title: t('team'), desc: t('teamDesc') }
  ];
  return (
    <section className="py-6 lg:py-8 xl:py-10">
      <AboutSectionHeader
        eyebrow={t('title')}
        title={t('title')}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col gap-4 overflow-hidden rounded-[6px] bg-white border border-slate-200 p-4 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base sm:text-lg lg:text-[20px] lg:leading-[28px] font-semibold text-[#162233] group-hover:text-[#1769e2] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm lg:text-[16px] lg:leading-[24px] font-normal text-[#617084]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

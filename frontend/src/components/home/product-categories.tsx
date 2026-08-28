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
      title: 'Giải pháp - Sản phẩm Phòng sạch',
      description:
        'Sản phẩm bảo vệ và kiểm soát bụi, ô nhiễm cho phòng sạch tại các nhà sản xuất: Điện tử, Thực phẩm, Dược phẩm, Y tế.',
      href: '/solutions/listProduct/categories/cleanroom-consumables',
      image: ASSETS.home.cateCleanroom,
      accentBorder: 'border-l-brand',
      diamondColor: 'text-brand',
      items: [
        { label: 'Găng tay Nitrile/Latex', href: '/solutions/listProduct/categories/cleanroom-gloves' },
        { label: 'Trang phục phòng sạch', href: '/solutions/listProduct/categories/cleanroom-apparel' },
        { label: 'Khăn lau / Cleanroom Wiper', href: '/solutions/listProduct/categories/cleanroom-wipers' },
        { label: 'Khẩu trang Y tế', href: '/solutions/listProduct/categories/cleanroom-masks' },
        {
          label: 'Sticky Mat/Thảm phòng sạch',
          href: '/solutions/listProduct/categories/cleanroom-consumables'
        },
        { label: 'Thiết bị đo lường', href: '/solutions/listProduct/categories/esd-supplies' }
      ]
    },
    {
      id: 'packaging',
      title: 'Giải pháp - Sản phẩm Bao bì',
      description:
        'Sản phẩm sản xuất theo yêu cầu và đơn đặt hàng của khách hàng — phục vụ các nhà sản xuất trong ngành Điện tử, Thực phẩm, Dược phẩm và Y tế.',
      href: '/solutions/listProduct/categories/industrial-packaging',
      image: ASSETS.home.catePackaging,
      accentBorder: 'border-l-amber-600',
      diamondColor: 'text-amber-600',
      items: [
        { label: 'Màng co PE/Shrink film', href: '/solutions/listProduct/categories/industrial-packaging' },
        { label: 'Màng bọc thực phẩm', href: '/solutions/listProduct/categories/industrial-packaging' },
        { label: 'Màng quấn PE Pallet', href: '/solutions/listProduct/categories/industrial-packaging' },
        { label: 'Màng/Túi nhôm', href: '/solutions/listProduct/categories/industrial-packaging' },
        { label: 'Túi PE/PP/Shield Bag', href: '/solutions/listProduct/categories/industrial-packaging' },
        { label: 'Băng Keo', href: '/solutions/listProduct/categories/industrial-packaging' }
      ]
    }
  ];

  const bottomThreeCards = [
    {
      id: 'cut-protection',
      title: 'Chống cắt - Chống cắt chuyên dụng',
      description:
        'Được thiết kế chuyên dụng để bảo vệ đôi tay khỏi các vật liệu sắc cạnh trong môi trường công nghiệp như: tấm kim loại, kính nhôm, linh kiện cơ khí và các công việc bảo trì. Phù hợp cho thao tác trong sản xuất kho vận, lắp đặt và bảo trì công nghiệp',
      href: '/solutions/listProduct/categories/cleanroom-gloves',
      image: ASSETS.home.cateCutProtection,
      accentBorder: 'border-l-brand',
      diamondColor: 'text-brand'
    },
    {
      id: 'hvac-tape',
      title: 'Băng Keo Nhôm - Ứng dụng trong HVAC',
      description:
        'Băng keo nhôm - Vật tư chuyên dụng dùng để dán kín mối nối, bề mặt bảo ôn và hệ thống gió HVAC. Với cấu trúc bề mặt nhôm, keo acrylic chất lượng cao, sản phẩm giúp tăng hiệu quả làm kín, chống thoát nhiệt và hỗ trợ giải pháp tổng thể tùy chỉnh theo yêu cầu kỹ thuật.',
      href: '/solutions/listProduct/categories/esd-supplies',
      image: ASSETS.home.cateHvacTape,
      accentBorder: 'border-l-brand',
      diamondColor: 'text-brand'
    },
    {
      id: 'custom-packaging',
      title: 'Bao bì - sản xuất theo yêu cầu',
      description:
        'ULink Industries chuyên sản xuất các sản phẩm bao bì chất lượng cao bao gồm: màng co PE bảo vệ hàng hóa, màng quấn pallet giúp cố định và bảo vệ hàng trong vận chuyển, túi PE theo yêu cầu phù hợp với mọi nhu cầu đóng gói của khách hàng.',
      href: '/solutions/listProduct/categories/industrial-packaging',
      image: ASSETS.home.cateCustomPackaging,
      accentBorder: 'border-l-amber-600',
      diamondColor: 'text-amber-600'
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
          <Link
            key={card.id}
            href={card.href}
            className={`ui-card-hover flex flex-col overflow-hidden rounded-[3px] border border-slate-200 bg-white border-l-4 sm:border-l-[5px] ${card.accentBorder} shadow-sm`}
          >
            {/* Top Image Banner */}
            <div className="relative h-[280px] w-full overflow-hidden bg-slate-50 sm:h-[340px]">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Card Content Body */}
            <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-6 xl:p-8">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-slate-900 sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] group-hover:text-brand transition-colors">
                <span className={card.diamondColor}>◇</span> {card.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-600 sm:text-[13px] lg:text-[13px] xl:text-[14px]">
                {card.description}
              </p>

              {/* 2-Column List of Sub-Items */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {card.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[11.5px] text-slate-700 transition-colors sm:text-[13px] lg:text-[13px] xl:text-[14px] font-medium"
                  >
                    <Image
                      src="/images/icons/iconBox.png"
                      alt="Icon Box"
                      width={20}
                      height={20}
                      className="h-5 w-5 shrink-0 object-contain"
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Right Action Link */}
              <div className="mt-8 flex justify-end pt-3 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-brand transition-all sm:text-[13.5px] group-hover:gap-2.5">
                  <span>{t('categories.viewDetail')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* BOTTOM ROW: 3 FEATURE CARDS */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        {bottomThreeCards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className={`ui-card-hover flex flex-col overflow-hidden rounded-[3px] border border-slate-200 bg-white border-l-4 sm:border-l-[5px] ${card.accentBorder} shadow-sm`}
          >
            {/* Top Image Banner */}
            <div className="relative h-[280px] w-full overflow-hidden bg-slate-50 sm:h-[340px]">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            {/* Card Content Body */}
            <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-6 xl:p-8">
              <div>
                <h3 className="text-[16px] font-bold text-slate-900 sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] group-hover:text-brand transition-colors">
                  {card.title}
                </h3>
                <div className="my-3 border-b border-dashed border-slate-300" />
                <p className="text-[12px] leading-relaxed text-slate-600 sm:text-[13px] lg:text-[13px] xl:text-[14px]">
                  {card.description}
                </p>
              </div>

              {/* Bottom Right Action Link */}
              <div className="mt-auto flex justify-end pt-3">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-brand transition-all sm:text-[13.5px] group-hover:gap-2.5">
                  <span>{t('categories.viewDetail')}</span>
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



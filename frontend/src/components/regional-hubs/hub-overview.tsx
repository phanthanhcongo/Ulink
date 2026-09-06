'use client';

import React from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ASSETS } from '@/lib/assets';

interface HubOverviewProps {
  locale: string;
}

export default function HubOverview({ locale }: HubOverviewProps) {
  // Dictionary for multi-language support (vi, en, ja)
  const translations: Record<string, {
    eyebrow: string;
    title: string;
    desc: string;
    learnMore: string;
    stat1Val: string;
    stat1Lbl: string;
    stat2Val: string;
    stat2Lbl: string;
    stat3Val: string;
    stat3Lbl: string;
    stat4Val: string;
    stat4Lbl: string;
  }> = {
    vi: {
      eyebrow: 'Tổng quan',
      title: 'Đối tác sản xuất và phân phối',
      desc: 'ULink Industries hợp tác với hơn 50 đối tác sản xuất và phân phối trong nước và quốc tế, bao gồm các nhà máy gia công tại Việt Nam, Trung Quốc và Malaysia, cùng hệ thống kho vận và logistics trong hệ sinh thái ULINK. Mô hình đối tác giúp tối ưu chi phí sản xuất, rút ngắn thời gian giao hàng và đảm bảo chất lượng sản phẩm theo tiêu chuẩn quốc tế ISO 9001.',
      learnMore: 'Xem thêm',
      stat1Val: '98%',
      stat1Lbl: 'Tỷ lệ khách hàng hài lòng',
      stat2Val: '10,000+',
      stat2Lbl: 'Số đơn hàng thực hiện',
      stat3Val: '5,000+',
      stat3Lbl: 'Số lượng SKU',
      stat4Val: '10,000 m²',
      stat4Lbl: 'Quy mô Nhà xưởng'
    },
    en: {
      eyebrow: 'Overview',
      title: 'Manufacturing & Distribution Partners',
      desc: 'ULink Industries partners with over 50 domestic and international manufacturing and distribution partners, including contract manufacturers in Vietnam, China, and Malaysia, along with warehousing and logistics systems in the ULINK ecosystem. The partner model helps optimize production costs, shorten delivery times, and ensure product quality according to international ISO 9001 standards.',
      learnMore: 'Learn more',
      stat1Val: '98%',
      stat1Lbl: 'Customer Satisfaction Rate',
      stat2Val: '10,000+',
      stat2Lbl: 'Completed Orders',
      stat3Val: '5,000+',
      stat3Lbl: 'Total SKUs',
      stat4Val: '10,000 m²',
      stat4Lbl: 'Warehouse Space'
    },
    ja: {
      eyebrow: '概要',
      title: '製造・流通パートナー',
      desc: 'ULink Industriesは、ベトナム、中国、マレーシア di 委託製造工場をはじめ、ULINKエコシステム内の倉庫・物流システムを含む、50社以上の国内外 ng 🌐製造・流通パートナーと提携しています。パートナーモデルにより、製造コストの最適化、納期の短縮、および国際規格ISO 9001に準拠した製品品質の確保が実現します。',
      learnMore: '詳細を見る',
      stat1Val: '98%',
      stat1Lbl: '顧客満足度',
      stat2Val: '10,000+',
      stat2Lbl: '累計受注数',
      stat3Val: '5,000+',
      stat3Lbl: '取扱SKU数',
      stat4Val: '10,000 m²',
      stat4Lbl: '倉庫・工場規模'
    }
  };

  const t = translations[locale] || translations.en;
  const tHome = useTranslations('home');

  const row1Logos = [
    { src: ASSETS.home.partnerSamsung, alt: 'Samsung', width: 'max-w-[70%]' },
    { src: ASSETS.home.partnerCanon, alt: 'Canon', width: 'max-w-[60%]' },
    { src: ASSETS.home.partnerPanasonic, alt: 'Panasonic', width: 'max-w-[75%]' },
    { src: ASSETS.home.partnerIbm, alt: 'IBM', width: 'max-w-[55%]' },
    { src: ASSETS.home.partnerTraphaco, alt: 'Traphaco', width: 'max-w-[70%]' },
    { src: ASSETS.home.partnerCocaCola, alt: 'Coca Cola', width: 'max-w-[65%]' },
  ];

  const row2Logos = [
    { src: ASSETS.home.partnerVinfast, alt: 'Vinfast', width: 'max-w-[40%]' },
    { src: ASSETS.home.partnerLg, alt: 'LG', width: 'max-w-[60%]' },
    { src: ASSETS.home.partnerAmkor, alt: 'Amkor', width: 'max-w-[75%]' },
    { src: ASSETS.home.partnerVinamilk, alt: 'Vinamilk', width: 'max-w-[65%]' },
    { src: ASSETS.home.partner3m, alt: '3M', width: 'max-w-[40%]' },
    { src: ASSETS.home.partnerByd, alt: 'BYD', width: 'max-w-[70%]' },
  ];

  const statsData = [
    { id: 1, iconSrc: '/images/regional_hubs/hub-2/icon/smiley.svg', value: t.stat1Val, label: t.stat1Lbl },
    { id: 2, iconSrc: '/images/regional_hubs/hub-2/icon/files.svg', value: t.stat2Val, label: t.stat2Lbl },
    { id: 3, iconSrc: '/images/regional_hubs/hub-2/icon/product.svg', value: t.stat3Val, label: t.stat3Lbl },
    { id: 4, iconSrc: '/images/regional_hubs/hub-2/icon/industry.svg', value: t.stat4Val, label: t.stat4Lbl },
  ];

  return (
    <section className="w-full bg-white pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 border-b border-slate-100">
      <div className="page-container flex flex-col gap-10">
        
        {/* === Part 1: Heading & Description === */}
        <div className="flex flex-col items-start text-left w-full space-y-1 sm:space-y-2">
          <span className="text-body-regular min-[375px]:text-card-title font-semibold tracking-tight text-blue-600 leading-tight lg:leading-[36px] xl:leading-[40px] block">
            {t.eyebrow}
          </span>
          <h2 className="text-body-regular min-[375px]:text-card-title font-semibold tracking-tight text-slate-900 leading-tight lg:leading-[36px] xl:leading-[40px]">
            {t.title}
          </h2>
          <p className="pt-2 text-caption-responsive leading-relaxed text-slate-500 max-w-[1100px]">
            {t.desc}
          </p>
          <Link
            href="/about"
            className="pt-2 text-caption-responsive leading-relaxed font-semibold text-blue-600 hover:underline inline-flex items-center"
          >
            {t.learnMore}
          </Link>
        </div>

        {/* === Part 2: Metrics Bar (Individual Mapped Cards) === */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 w-full">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="group flex items-center gap-2.5 sm:gap-4 p-3.5 sm:p-6 bg-[#E8F0FE]/40 rounded-[3px] border border-blue-100/80 shadow-xs hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-[#E8F0FE]/60 transition-all duration-300"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 group-hover:scale-105 transition-transform p-2 sm:p-2.5">
                <div className="relative h-full w-full">
                  <Image
                    src={stat.iconSrc}
                    alt={stat.label}
                    fill
                    className="object-contain pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-card-title min-[375px]:text-card-title font-bold text-slate-900 leading-none">
                  {stat.value}
                </span>
                <span className="mt-1 sm:mt-1.5 text-caption-responsive font-medium text-slate-500 leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* === Part 3: Partner Brand Logos === */}
        <div className="hidden lg:block w-full pt-4 pb-2 px-2 lg:px-4 xl:px-10">
          <div className="flex flex-nowrap items-center justify-between gap-2 lg:gap-4 xl:gap-8 w-full">
            {/* Logo 1: SHELLS */}
            <div className="flex items-center gap-1.5 lg:gap-2.5 text-[#697077] hover:text-slate-900 transition-colors shrink-0">
              <div className="relative h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 shrink-0">
                <Image
                  src="/images/regional_hubs/hub-2/icon/shells.svg"
                  alt="SHELLS Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-body-regular font-bold tracking-wider uppercase whitespace-nowrap">
                SHELLS
              </span>
            </div>

            {/* Logo 2: SmartFinder */}
            <div className="flex items-center gap-1.5 lg:gap-2.5 text-[#697077] hover:text-slate-900 transition-colors shrink-0">
              <div className="relative h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 shrink-0">
                <Image
                  src="/images/regional_hubs/hub-2/icon/smart-finder.svg"
                  alt="SmartFinder Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-body-regular font-bold tracking-tight whitespace-nowrap">
                SmartFinder
              </span>
            </div>

            {/* Logo 3: Zoomerr */}
            <div className="flex items-center gap-1.5 lg:gap-2.5 text-[#697077] hover:text-slate-900 transition-colors shrink-0">
              <div className="relative h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 shrink-0">
                <Image
                  src="/images/regional_hubs/hub-2/icon/zoomerr.svg"
                  alt="Zoomerr Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-body-regular font-bold tracking-tight whitespace-nowrap">
                Zoomerr
              </span>
            </div>

            {/* Logo 4: ArtVenue */}
            <div className="flex items-center gap-1.5 lg:gap-2.5 text-[#697077] hover:text-slate-900 transition-colors shrink-0">
              <div className="relative h-6 w-10 lg:h-7 lg:w-12 xl:h-8 xl:w-14 shrink-0">
                <Image
                  src="/images/regional_hubs/hub-2/icon/art-venue.svg"
                  alt="ArtVenue Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-body-regular font-bold tracking-tight whitespace-nowrap">
                ArtVenue
              </span>
            </div>

            {/* Logo 5: kontrastr */}
            <div className="flex items-center gap-1.5 lg:gap-2.5 text-[#697077] hover:text-slate-900 transition-colors shrink-0">
              <div className="relative h-6 w-5 lg:h-7 lg:w-6 xl:h-8 xl:w-7 shrink-0">
                <Image
                  src="/images/regional_hubs/hub-2/icon/kontrastr.svg"
                  alt="kontrastr Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-body-regular font-bold tracking-tight whitespace-nowrap">
                kontrastr
              </span>
            </div>

            {/* Logo 6: WAVES MARATHON */}
            <div className="flex items-center gap-1.5 lg:gap-2.5 text-[#697077] hover:text-slate-900 transition-colors shrink-0">
              <div className="relative h-6 w-5 lg:h-7 lg:w-6 xl:h-8 xl:w-7 shrink-0">
                <Image
                  src="/images/regional_hubs/hub-2/icon/waves-marathon.svg"
                  alt="WAVES MARATHON Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-none whitespace-nowrap">
                <span className="text-caption-responsive font-bold tracking-wider uppercase">
                  WAVES
                </span>
                <span className="text-[8px] font-medium tracking-widest uppercase text-[#697077]/80">
                  MARATHON
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* === Partner Marquee Logos === */}
        <div className="lg:hidden w-full mt-4 flex flex-col gap-5 overflow-hidden mask-gradient-x py-2 select-none">
          {/* Row 1 Marquee: Left scrolling */}
          <div className="flex w-max animate-marquee-left">
            {[...row1Logos, ...row1Logos].map((logo, index) => (
              <div
                key={`row1-logo-${index}`}
                className="flex shrink-0 w-[106px] h-[69px] sm:w-[213.3px] sm:h-[138px] items-center justify-center bg-white"
              >
                <div className={`relative w-full h-[60%] flex items-center justify-center ${logo.width}`}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 Marquee: Right scrolling */}
          <div className="flex w-max animate-marquee-right">
            {[...row2Logos, ...row2Logos].map((logo, index) => (
              <div
                key={`row2-logo-${index}`}
                className="flex shrink-0 w-[106px] h-[69px] sm:w-[213.3px] sm:h-[138px] items-center justify-center bg-white"
              >
                <div className={`relative w-full h-[60%] flex items-center justify-center ${logo.width}`}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


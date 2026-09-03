import Image from 'next/image';
import {
  ArrowRight,
  Download,
  ShieldCheck,
  Layers,
  Eye,
  Settings,
  Ruler,
  Thermometer,
  Paperclip,
  Award,
  Activity,
  Recycle,
  Droplets
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';
import { SectionHeader } from '@/components/home/section-header';

interface FeaturedProductsProps {
  locale?: string;
}

export default async function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const t = await getTranslations('regionalHubs');

  const rfqHref = '/quick-order';

  // Exact Figma HTML Image Assets
  const gloveSlug = '/solutions/listProduct/categories/cleanroom-gloves';
  const gloveImgSrc = '/images/home/section2/frame-4273183070.png';

  const filmSlug = '/solutions/listProduct/categories/industrial-packaging';
  const filmImgSrc = '/images/home/section2/frame-4273183071.png';

  const tapeSlug = '/solutions/listProduct/categories/industrial-packaging';
  const tapeImgSrc = '/images/home/section2/frame-4273183072.png';

  const palletSlug = '/solutions/listProduct/categories/industrial-packaging';
  const palletImgSrc = '/images/home/section2/frame-4273183073.png';

  return (
    <section className="w-full bg-white py-14">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="mb-10">
          <SectionHeader
            title={t('featuredProducts.title')}
            subtitle={t('featuredProducts.subtitle')}
            viewAllHref="/solutions"
            viewAllLabel={t('featuredProducts.viewAll')}
          />
        </div>

        {/* Cards Grid: 2 columns to display 2 rows of 2 cards each */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">

          {/* Card 1: Glove */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1 hover:border-[#9fc2ef] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <Link href={gloveSlug} className="relative block m-4 mb-2 h-[180px] sm:h-[204px] lg:h-[323px] overflow-hidden bg-transparent rounded-[3px]">
              <Image
                src={gloveImgSrc}
                alt={t('featuredProducts.glove.title')}
                fill
                className="object-contain object-center lg:object-cover lg:object-center transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 1024px) 100vw, 588px"
              />
            </Link>

            <div className="flex flex-col flex-1 p-4 sm:p-6 pt-2">
              <p className="text-[14px] font-semibold text-brand uppercase tracking-[0.5px] mb-2">
                {t('featuredProducts.glove.category')}
              </p>
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#212529] leading-[24px] tracking-[-0.2px] mb-2 line-clamp-1">
                <Link href={gloveSlug} className="hover:text-brand transition-colors">
                  {t('featuredProducts.glove.title')}
                </Link>
              </h3>
              <p className="text-[14px] font-normal text-[#495057] mb-5 leading-[20px] tracking-[0.1px] line-clamp-2">
                {t('featuredProducts.glove.desc')}
              </p>

              {/* Key Attributes Box - Exact Figma SVGs */}
              <div className="bg-[#F4F7FC] p-2.5 sm:p-3 grid grid-cols-4 gap-1 mb-5 rounded-[3px] border border-slate-100">
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-security-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.glove.feat1')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-xls-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.glove.feat2')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/rectangle-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.glove.feat3')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-chart-t-sne-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.glove.feat4')}
                  </p>
                </div>
              </div>

              {/* Main Products Badges */}
              <p className="text-[11px] font-bold text-[#495057] uppercase tracking-wider mb-2">
                {t('featuredProducts.mainProducts')}
              </p>
              <div className="flex items-center gap-2 flex-wrap mb-6">
                {['Nitrile', 'PU', 'ESD', 'Latex'].map(tag => (
                  <span key={tag} className="text-[13px] font-semibold text-[#0b5fd7] bg-[#f5f8fc] border border-[#ced4da] border-dashed px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={rfqHref}
                  className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-strong text-white font-medium text-[14px] leading-[20px] px-4 py-2 h-[36px] rounded-[3px] shadow-sm transition-all whitespace-nowrap"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center justify-center gap-2 text-[#1769e2] hover:text-blue-700 font-medium text-[14px] leading-[20px] px-3 py-2 h-[36px] rounded-[3px] transition-colors whitespace-nowrap"
                >
                  {t('featuredProducts.catalogue')}
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Card 2: Shrink Film */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1 hover:border-[#9fc2ef] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <Link href={filmSlug} className="relative block m-4 mb-2 h-[180px] sm:h-[204px] lg:h-[323px] overflow-hidden bg-transparent rounded-[3px]">
              <Image
                src={filmImgSrc}
                alt={t('featuredProducts.film.title')}
                fill
                className="object-contain object-center lg:object-cover lg:object-center transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 1024px) 100vw, 588px"
              />
            </Link>

            <div className="flex flex-col flex-1 p-4 sm:p-6 pt-2">
              <p className="text-[14px] font-semibold text-brand uppercase tracking-[0.5px] mb-2">
                {t('featuredProducts.film.category')}
              </p>
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#212529] leading-[24px] tracking-[-0.2px] mb-2 line-clamp-1">
                <Link href={filmSlug} className="hover:text-brand transition-colors">
                  {t('featuredProducts.film.title')}
                </Link>
              </h3>
              <p className="text-[14px] font-normal text-[#495057] mb-5 leading-[20px] tracking-[0.1px] line-clamp-2">
                {t('featuredProducts.film.desc')}
              </p>

              {/* Key Attributes Box - Exact Figma SVGs */}
              <div className="bg-[#F4F7FC] p-2.5 sm:p-3 grid grid-cols-4 gap-1 mb-5 rounded-[3px] border border-slate-100">
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/layers0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.film.feat1')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-smoke-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.film.feat2')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-view-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.film.feat3')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-tools-alt-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.film.feat4')}
                  </p>
                </div>
              </div>

              {/* Main Products Badges */}
              <p className="text-[11px] font-bold text-[#495057] uppercase tracking-wider mb-2">
                {t('featuredProducts.mainProducts')}
              </p>
              <div className="flex items-center gap-2 flex-wrap mb-6">
                {['LDPE', 'PVC', 'ESD', 'POF'].map(tag => (
                  <span key={tag} className="text-[13px] font-semibold text-[#0b5fd7] bg-[#f5f8fc] border border-[#ced4da] border-dashed px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={rfqHref}
                  className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-strong text-white font-medium text-[14px] leading-[20px] px-4 py-2 h-[36px] rounded-[3px] shadow-sm transition-all whitespace-nowrap"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center justify-center gap-2 text-[#1769e2] hover:text-blue-700 font-medium text-[14px] leading-[20px] px-3 py-2 h-[36px] rounded-[3px] transition-colors whitespace-nowrap"
                >
                  {t('featuredProducts.catalogue')}
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Card 3: HVAC Tape */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1 hover:border-[#9fc2ef] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <Link href={tapeSlug} className="relative block m-4 mb-2 h-[180px] sm:h-[204px] lg:h-[323px] overflow-hidden bg-transparent rounded-[3px]">
              <Image
                src={tapeImgSrc}
                alt={t('featuredProducts.tape.title')}
                fill
                className="object-contain object-center lg:object-cover lg:object-center transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 1024px) 100vw, 588px"
              />
            </Link>

            <div className="flex flex-col flex-1 p-4 sm:p-6 pt-2">
              <p className="text-[14px] font-semibold text-brand uppercase tracking-[0.5px] mb-2">
                {t('featuredProducts.tape.category')}
              </p>
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#212529] leading-[24px] tracking-[-0.2px] mb-2 line-clamp-1">
                <Link href={tapeSlug} className="hover:text-brand transition-colors">
                  {t('featuredProducts.tape.title')}
                </Link>
              </h3>
              <p className="text-[14px] font-normal text-[#495057] mb-5 leading-[20px] tracking-[0.1px] line-clamp-2">
                {t('featuredProducts.tape.desc')}
              </p>

              {/* Key Attributes Box - Exact Figma SVGs */}
              <div className="bg-[#F4F7FC] p-2.5 sm:p-3 grid grid-cols-4 gap-1 mb-5 rounded-[3px] border border-slate-100">
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-layers-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.tape.feat1')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-ruler-alt-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.tape.feat2')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-temperature-max-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.tape.feat3')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-direct-link-vectorized0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.tape.feat4')}
                  </p>
                </div>
              </div>

              {/* Main Products Badges */}
              <p className="text-[11px] font-bold text-[#495057] uppercase tracking-wider mb-2">
                {t('featuredProducts.mainProducts')}
              </p>
              <div className="flex items-center gap-2 flex-wrap mb-6">
                {['FSK', 'Woven Fabric', 'Glass Fiber'].map(tag => (
                  <span key={tag} className="text-[13px] font-semibold text-[#0b5fd7] bg-[#f5f8fc] border border-[#ced4da] border-dashed px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={rfqHref}
                  className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-strong text-white font-medium text-[14px] leading-[20px] px-4 py-2 h-[36px] rounded-[3px] shadow-sm transition-all whitespace-nowrap"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center justify-center gap-2 text-[#1769e2] hover:text-blue-700 font-medium text-[14px] leading-[20px] px-3 py-2 h-[36px] rounded-[3px] transition-colors whitespace-nowrap"
                >
                  {t('featuredProducts.catalogue')}
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Card 4: Pallet Wrap */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1 hover:border-[#9fc2ef] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <Link href={palletSlug} className="relative block m-4 mb-2 h-[180px] sm:h-[204px] lg:h-[323px] overflow-hidden bg-transparent rounded-[3px]">
              <Image
                src={palletImgSrc}
                alt={t('featuredProducts.pallet.title')}
                fill
                className="object-contain object-center lg:object-cover lg:object-center transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 1024px) 100vw, 588px"
              />
            </Link>

            <div className="flex flex-col flex-1 p-4 sm:p-6 pt-2">
              <p className="text-[14px] font-semibold text-brand uppercase tracking-[0.5px] mb-2">
                {t('featuredProducts.pallet.category')}
              </p>
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#212529] leading-[24px] tracking-[-0.2px] mb-2 line-clamp-1">
                <Link href={palletSlug} className="hover:text-brand transition-colors">
                  {t('featuredProducts.pallet.title')}
                </Link>
              </h3>
              <p className="text-[14px] font-normal text-[#495057] mb-5 leading-[20px] tracking-[0.1px] line-clamp-2">
                {t('featuredProducts.pallet.desc')}
              </p>

              {/* Key Attributes Box - Exact Figma SVGs */}
              <div className="bg-[#F4F7FC] p-2.5 sm:p-3 grid grid-cols-4 gap-1 mb-5 rounded-[3px] border border-slate-100">
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-recycle0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.pallet.feat1')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-attachment0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.pallet.feat2')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-rain0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.pallet.feat3')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-8 items-center justify-center">
                    <Image src="/images/home/section2/_32-security0.svg" alt="" width={32} height={32} className="h-7 w-7" />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#212529] font-medium leading-tight mt-1 truncate">
                    {t('featuredProducts.pallet.feat4')}
                  </p>
                </div>
              </div>

              {/* Main Products Badges */}
              <p className="text-[11px] font-bold text-[#495057] uppercase tracking-wider mb-2">
                {t('featuredProducts.mainProducts')}
              </p>
              <div className="flex items-center gap-2 flex-wrap mb-6">
                {['Màng quấn tay', 'Màng quấn máy', 'Màng jumbo'].map(tag => (
                  <span key={tag} className="text-[13px] font-semibold text-[#0b5fd7] bg-[#f5f8fc] border border-[#ced4da] border-dashed px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={rfqHref}
                  className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-strong text-white font-medium text-[14px] leading-[20px] px-4 py-2 h-[36px] rounded-[3px] shadow-sm transition-all whitespace-nowrap"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center justify-center gap-2 text-[#1769e2] hover:text-blue-700 font-medium text-[14px] leading-[20px] px-3 py-2 h-[36px] rounded-[3px] transition-colors whitespace-nowrap"
                >
                  {t('featuredProducts.catalogue')}
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

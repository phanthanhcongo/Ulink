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
  Briefcase
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/lib/directus';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';
import { SectionHeader } from '@/components/home/section-header';

interface FeaturedProductsProps {
  products: Product[];
  locale: string;
}

export default async function FeaturedProducts({ products, locale }: FeaturedProductsProps) {
  const t = await getTranslations('regionalHubs');
  const DIRECTUS_URL = getDirectusUrl();

  // 1. Glove
  const gloveProduct = products.find(p => p.slug.includes('glove') || p.slug.includes('gang-tay'));
  const gloveSlug = gloveProduct ? `/${locale}/products/${gloveProduct.slug}` : `/${locale}/solutions`;
  const gloveImgSrc = gloveProduct?.hero
    ? (gloveProduct.hero.startsWith('http') || gloveProduct.hero.startsWith('/') ? gloveProduct.hero : `${DIRECTUS_URL}/assets/${gloveProduct.hero}`)
    : ASSETS.home.productCutGloves;

  // 2. Shrink Film
  const filmProduct = products.find(p => p.slug.includes('film') || p.slug.includes('mang-co') || p.slug.includes('pkg') || p.slug.includes('packaging'));
  const filmSlug = filmProduct ? `/${locale}/products/${filmProduct.slug}` : `/${locale}/solutions`;
  const filmImgSrc = filmProduct?.hero
    ? (filmProduct.hero.startsWith('http') || filmProduct.hero.startsWith('/') ? filmProduct.hero : `${DIRECTUS_URL}/assets/${filmProduct.hero}`)
    : ASSETS.home.productCustomPkg;

  // 3. HVAC Tape
  const tapeProduct = products.find(p => p.slug.includes('tape') || p.slug.includes('bang-keo'));
  const tapeSlug = tapeProduct ? `/${locale}/products/${tapeProduct.slug}` : `/${locale}/solutions`;
  const tapeImgSrc = tapeProduct?.hero
    ? (tapeProduct.hero.startsWith('http') || tapeProduct.hero.startsWith('/') ? tapeProduct.hero : `${DIRECTUS_URL}/assets/${tapeProduct.hero}`)
    : ASSETS.home.productHvacTape;

  // 4. Fourth Product (Any product left that is not glove, film, or tape)
  const usedIds = new Set([gloveProduct?.id, filmProduct?.id, tapeProduct?.id].filter(Boolean));
  const fourthProduct = products.find(p => !usedIds.has(p.id)) || products.find(p => p.id !== gloveProduct?.id) || products[0] || {
    id: 'fallback-4',
    name: 'Vật tư Công nghiệp ULink',
    slug: 'solutions',
    short_description: 'Giải pháp cung ứng tổng thể cho nhà máy sản xuất.',
    hero: ASSETS.home.factory
  };
  const fourthSlug = fourthProduct.slug.startsWith('http') || fourthProduct.slug === 'solutions' ? `/${locale}/solutions` : `/${locale}/products/${fourthProduct.slug}`;
  const fourthImgSrc = fourthProduct.hero
    ? (fourthProduct.hero.startsWith('http') || fourthProduct.hero.startsWith('/') ? fourthProduct.hero : `${DIRECTUS_URL}/assets/${fourthProduct.hero}`)
    : ASSETS.home.factory; // default fallback

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Glove */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1 hover:border-[#9fc2ef] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <Link href={gloveSlug} className="relative block h-[320px] m-2 overflow-hidden bg-[#eef2f6] rounded-[3px]">
              <Image
                src={gloveImgSrc}
                alt={gloveProduct?.name || t('featuredProducts.glove.title')}
                fill
                className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-3 right-3 flex items-center justify-center bg-white/95 border border-blue-500/20 shadow-sm p-1 rounded-[3px]">
                <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-widest px-1">
                  CERTIFIED
                </span>
              </div>
            </Link>

            <div className="flex flex-col flex-1 p-6">
              <p className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold text-brand uppercase tracking-wider mb-2">
                {t('featuredProducts.glove.category')}
              </p>
              <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 leading-snug mb-2 line-clamp-1">
                <Link href={gloveSlug} className="hover:text-brand transition-colors">
                  {gloveProduct?.name || t('featuredProducts.glove.title')}
                </Link>
              </h3>
              <p className="text-[12px] sm:text-[13px] text-slate-500 mb-5 leading-relaxed line-clamp-2">
                {gloveProduct?.short_description || t('featuredProducts.glove.desc')}
              </p>

              {/* Key Attributes Box */}
              <div className="bg-[#F4F7FC] p-3 grid grid-cols-4 gap-1.5 mb-5 rounded-[3px] border border-slate-100">
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.glove.feat1')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center font-bold text-[13px] text-brand">
                    XL5
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.glove.feat2')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Award className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.glove.feat3')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Activity className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.glove.feat4')}
                  </p>
                </div>
              </div>

              {/* Main Products Badges */}
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                {t('featuredProducts.mainProducts')}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap mb-6">
                {['Nitrile', 'PU', 'ESD', 'Latex'].map(tag => (
                  <span key={tag} className="text-[11px] font-bold text-brand bg-[#B2EDFF]/25 border border-blue-200 px-2.5 py-0.5 rounded-[3px]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={gloveSlug}
                  className="flex items-center justify-center gap-1.5 bg-brand hover:bg-brand-strong text-white font-bold text-[12px] sm:text-[13px] px-4 py-2 rounded-[3px] shadow-sm transition-all whitespace-nowrap"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center gap-2 text-[#4285f4] hover:text-blue-700 font-bold text-[13px] sm:text-[14px] transition-colors whitespace-nowrap"
                >
                  {t('featuredProducts.catalogue')}
                  <Download className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </article>

          {/* Card 2: Shrink Film */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1 hover:border-[#9fc2ef] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <Link href={filmSlug} className="relative block h-[320px] m-2 overflow-hidden bg-[#eef2f6] rounded-[3px]">
              <Image
                src={filmImgSrc}
                alt={filmProduct?.name || t('featuredProducts.film.title')}
                fill
                className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-3 right-3 flex items-center justify-center bg-white/95 border border-blue-500/20 shadow-sm p-1 rounded-[3px]">
                <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-widest px-1">
                  CERTIFIED
                </span>
              </div>
            </Link>

            <div className="flex flex-col flex-1 p-6">
              <p className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold text-brand uppercase tracking-wider mb-2">
                {t('featuredProducts.film.category')}
              </p>
              <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 leading-snug mb-2 line-clamp-1">
                <Link href={filmSlug} className="hover:text-brand transition-colors">
                  {filmProduct?.name || t('featuredProducts.film.title')}
                </Link>
              </h3>
              <p className="text-[12px] sm:text-[13px] text-slate-500 mb-5 leading-relaxed line-clamp-2">
                {filmProduct?.short_description || t('featuredProducts.film.desc')}
              </p>

              {/* Key Attributes Box */}
              <div className="bg-[#F4F7FC] p-3 grid grid-cols-4 gap-1.5 mb-5 rounded-[3px] border border-slate-100">
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Layers className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.film.feat1')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Activity className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.film.feat2')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Eye className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.film.feat3')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Settings className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.film.feat4')}
                  </p>
                </div>
              </div>

              {/* Main Products Badges */}
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                {t('featuredProducts.mainProducts')}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap mb-6">
                {['LDPE', 'PVC', 'ESD', 'POF'].map(tag => (
                  <span key={tag} className="text-[11px] font-bold text-brand bg-[#B2EDFF]/25 border border-blue-200 px-2.5 py-0.5 rounded-[3px]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={filmSlug}
                  className="flex items-center justify-center gap-1.5 bg-brand hover:bg-brand-strong text-white font-bold text-[12px] sm:text-[13px] px-4 py-2 rounded-[3px] shadow-sm transition-all whitespace-nowrap"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center gap-2 text-[#4285f4] hover:text-blue-700 font-bold text-[13px] sm:text-[14px] transition-colors whitespace-nowrap"
                >
                  {t('featuredProducts.catalogue')}
                  <Download className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </article>

          {/* Card 3: HVAC Tape */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1 hover:border-[#9fc2ef] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
            <Link href={tapeSlug} className="relative block h-[320px] m-2 overflow-hidden bg-[#eef2f6] rounded-[3px]">
              <Image
                src={tapeImgSrc}
                alt={tapeProduct?.name || t('featuredProducts.tape.title')}
                fill
                className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-3 right-3 flex items-center justify-center bg-white/95 border border-blue-500/20 shadow-sm p-1 rounded-[3px]">
                <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-widest px-1">
                  CERTIFIED
                </span>
              </div>
            </Link>

            <div className="flex flex-col flex-1 p-6">
              <p className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold text-brand uppercase tracking-wider mb-2">
                {t('featuredProducts.tape.category')}
              </p>
              <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 leading-snug mb-2 line-clamp-1">
                <Link href={tapeSlug} className="hover:text-brand transition-colors">
                  {tapeProduct?.name || t('featuredProducts.tape.title')}
                </Link>
              </h3>
              <p className="text-[12px] sm:text-[13px] text-slate-500 mb-5 leading-relaxed line-clamp-2">
                {tapeProduct?.short_description || t('featuredProducts.tape.desc')}
              </p>

              {/* Key Attributes Box */}
              <div className="bg-[#F4F7FC] p-3 grid grid-cols-4 gap-1.5 mb-5 rounded-[3px] border border-slate-100">
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Layers className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.tape.feat1')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Ruler className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.tape.feat2')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Thermometer className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.tape.feat3')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex h-7 items-center justify-center">
                    <Paperclip className="h-5 w-5 text-brand" />
                  </div>
                  <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                    {t('featuredProducts.tape.feat4')}
                  </p>
                </div>
              </div>

              {/* Main Products Badges */}
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                {t('featuredProducts.mainProducts')}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap mb-6">
                {['Alu Foil', 'FSK', 'Woven Fabric', 'Glass fiber cloth'].map(tag => (
                  <span key={tag} className="text-[11px] font-bold text-brand bg-[#B2EDFF]/25 border border-blue-200 px-2.5 py-0.5 rounded-[3px]">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={tapeSlug}
                  className="flex items-center justify-center gap-1.5 bg-brand hover:bg-brand-strong text-white font-bold text-[12px] sm:text-[13px] px-4 py-2 rounded-[3px] shadow-sm transition-all whitespace-nowrap"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center gap-2 text-[#4285f4] hover:text-blue-700 font-bold text-[13px] sm:text-[14px] transition-colors whitespace-nowrap"
                >
                  {t('featuredProducts.catalogue')}
                  <Download className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </article>

          {/* Card 4: Fourth Product */}
          {fourthProduct && (
            <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1 hover:border-[#9fc2ef] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
              <Link href={fourthSlug} className="relative block h-[320px] m-2 overflow-hidden bg-[#eef2f6] rounded-[3px]">
                <Image
                  src={fourthImgSrc}
                  alt={fourthProduct.name}
                  fill
                  className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-3 right-3 flex items-center justify-center bg-white/95 border border-blue-500/20 shadow-sm p-1 rounded-[3px]">
                  <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-widest px-1">
                    CERTIFIED
                  </span>
                </div>
              </Link>

              <div className="flex flex-col flex-1 p-6">
                <p className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold text-brand uppercase tracking-wider mb-2">
                  {(fourthProduct.category && typeof fourthProduct.category === 'object' ? (fourthProduct.category as any).name : null) || t('featuredProducts.film.category')}
                </p>
                <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-slate-900 leading-snug mb-2 line-clamp-1">
                  <Link href={fourthSlug} className="hover:text-brand transition-colors">
                    {fourthProduct.name}
                  </Link>
                </h3>
                <p className="text-[12px] sm:text-[13px] text-slate-500 mb-5 leading-relaxed line-clamp-2">
                  {fourthProduct.short_description || ''}
                </p>

                {/* Key Attributes Box */}
                <div className="bg-[#F4F7FC] p-3 grid grid-cols-4 gap-1.5 mb-5 rounded-[3px] border border-slate-100">
                  <div className="text-center">
                    <div className="flex h-7 items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-brand" />
                    </div>
                    <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                      {t('featuredProducts.glove.feat1')}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-7 items-center justify-center">
                      <Briefcase className="h-5 w-5 text-brand" />
                    </div>
                    <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                      B2B Standard
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-7 items-center justify-center">
                      <Award className="h-5 w-5 text-brand" />
                    </div>
                    <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                      {t('featuredProducts.glove.feat3')}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-7 items-center justify-center">
                      <Settings className="h-5 w-5 text-brand" />
                    </div>
                    <p className="text-[9px] text-slate-600 font-bold leading-tight mt-1 truncate">
                      Industrial
                    </p>
                  </div>
                </div>

                {/* Main Products Badges */}
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                  {t('featuredProducts.mainProducts')}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap mb-6">
                  {['Ulink', 'OEM/ODM', 'Premium'].map(tag => (
                    <span key={tag} className="text-[11px] font-bold text-brand bg-[#B2EDFF]/25 border border-blue-200 px-2.5 py-0.5 rounded-[3px]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-6 mt-auto border-t border-slate-100 pt-4">
                  <Link
                    href={fourthSlug}
                    className="flex items-center justify-center gap-1.5 bg-brand hover:bg-brand-strong text-white font-bold text-[12px] sm:text-[13px] px-4 py-2 rounded-[3px] shadow-sm transition-all whitespace-nowrap"
                  >
                    {t('featuredProducts.rfqButton')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="/documents/lien-he-nha-phat-trien.pdf"
                    download="lien-he-nha-phat-trien.pdf"
                    className="flex items-center gap-2 text-[#4285f4] hover:text-blue-700 font-bold text-[13px] sm:text-[14px] transition-colors whitespace-nowrap"
                  >
                    {t('featuredProducts.catalogue')}
                    <Download className="h-4.5 w-4.5" />
                  </a>
                </div>
              </div>
            </article>
          )}

        </div>
      </div>
    </section>
  );
}

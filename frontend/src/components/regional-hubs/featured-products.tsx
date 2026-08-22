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
  Activity 
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/lib/directus';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';
import { getDirectusUrl } from '@/lib/directus-runtime.mjs';

interface FeaturedProductsProps {
  products: Product[];
  locale: string;
}

export default async function FeaturedProducts({ products, locale }: FeaturedProductsProps) {
  const t = await getTranslations('regionalHubs');
  const DIRECTUS_URL = getDirectusUrl();

  // Dynamically map Directus products to the highlight slots based on slug keywords
  const gloveProduct = products.find(p => p.slug.includes('glove') || p.slug.includes('gang-tay'));
  const filmProduct = products.find(p => p.slug.includes('film') || p.slug.includes('mang-co') || p.slug.includes('pkg') || p.slug.includes('packaging'));
  const tapeProduct = products.find(p => p.slug.includes('tape') || p.slug.includes('bang-keo'));

  // Define fallback target paths
  const gloveSlug = gloveProduct ? `/${locale}/products/${gloveProduct.slug}` : `/${locale}/solutions`;
  const filmSlug = filmProduct ? `/${locale}/products/${filmProduct.slug}` : `/${locale}/solutions`;
  const tapeSlug = tapeProduct ? `/${locale}/products/${tapeProduct.slug}` : `/${locale}/solutions`;

  // Define image sources
  const gloveImgSrc = gloveProduct?.hero
    ? (gloveProduct.hero.startsWith('http') || gloveProduct.hero.startsWith('/') ? gloveProduct.hero : `${DIRECTUS_URL}/assets/${gloveProduct.hero}`)
    : ASSETS.home.productCutGloves;

  const filmImgSrc = filmProduct?.hero
    ? (filmProduct.hero.startsWith('http') || filmProduct.hero.startsWith('/') ? filmProduct.hero : `${DIRECTUS_URL}/assets/${filmProduct.hero}`)
    : ASSETS.home.productCustomPkg;

  const tapeImgSrc = tapeProduct?.hero
    ? (tapeProduct.hero.startsWith('http') || tapeProduct.hero.startsWith('/') ? tapeProduct.hero : `${DIRECTUS_URL}/assets/${tapeProduct.hero}`)
    : ASSETS.home.productHvacTape;

  return (
    <section className="w-full bg-white py-14">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="flex items-start gap-3">
            <div className="flex flex-col gap-1.5 mt-1.5">
              <span className="h-1.5 w-1.5 bg-brand" />
              <span className="h-1.5 w-1.5 bg-brand" />
              <span className="h-1.5 w-1.5 bg-brand" />
            </div>
            <div>
              <h2 className="text-[22px] font-bold text-slate-900 leading-tight">
                {t('featuredProducts.title')}
              </h2>
              <p className="mt-2 text-[12px] text-slate-500 max-w-[600px]">
                {t('featuredProducts.subtitle')}
              </p>
            </div>
          </div>
          <Link
            href="/solutions"
            className="group text-[13px] font-semibold text-brand flex items-center gap-1 transition-colors hover:text-brand-strong shrink-0"
          >
            {t('featuredProducts.viewAll')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Glove */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1.5 hover:border-[#9fc2ef] hover:shadow-[0_18px_42px_rgba(16,61,111,0.13)]">
            <Link href={gloveSlug} className="relative block h-[240px] m-2 overflow-hidden bg-[#eef2f6] rounded-[3px]">
              <Image
                src={gloveImgSrc}
                alt={t('featuredProducts.glove.title')}
                fill
                className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Quality certified stamp */}
              <div className="absolute bottom-3 right-3 flex items-center justify-center bg-white/95 border border-blue-500/20 shadow-sm p-1 rounded-[3px]">
                <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-widest px-1">
                  CERTIFIED
                </span>
              </div>
            </Link>

            <div className="flex flex-col flex-1 p-6">
              <p className="text-[13px] font-bold text-brand uppercase tracking-wider mb-2">
                {t('featuredProducts.glove.category')}
              </p>
              <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-2 line-clamp-1">
                <Link href={gloveSlug} className="hover:text-brand transition-colors">
                  {t('featuredProducts.glove.title')}
                </Link>
              </h3>
              <p className="text-[12px] text-slate-500 mb-5 leading-relaxed line-clamp-2">
                {t('featuredProducts.glove.desc')}
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
              <div className="flex items-center justify-between gap-4 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={gloveSlug}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand-strong text-white font-bold text-[13px] py-2.5 rounded-[3px] shadow-sm transition-all"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center gap-1.5 text-brand hover:text-brand-strong font-bold text-[13px] transition-colors whitespace-nowrap"
                >
                  <Download className="h-4 w-4" />
                  {t('featuredProducts.catalogue')}
                </a>
              </div>
            </div>
          </article>

          {/* Card 2: Shrink Film */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1.5 hover:border-[#9fc2ef] hover:shadow-[0_18px_42px_rgba(16,61,111,0.13)]">
            <Link href={filmSlug} className="relative block h-[240px] m-2 overflow-hidden bg-[#eef2f6] rounded-[3px]">
              <Image
                src={filmImgSrc}
                alt={t('featuredProducts.film.title')}
                fill
                className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute bottom-3 right-3 flex items-center justify-center bg-white/95 border border-blue-500/20 shadow-sm p-1 rounded-[3px]">
                <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-widest px-1">
                  CERTIFIED
                </span>
              </div>
            </Link>

            <div className="flex flex-col flex-1 p-6">
              <p className="text-[13px] font-bold text-brand uppercase tracking-wider mb-2">
                {t('featuredProducts.film.category')}
              </p>
              <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-2 line-clamp-1">
                <Link href={filmSlug} className="hover:text-brand transition-colors">
                  {t('featuredProducts.film.title')}
                </Link>
              </h3>
              <p className="text-[12px] text-slate-500 mb-5 leading-relaxed line-clamp-2">
                {t('featuredProducts.film.desc')}
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
              <div className="flex items-center justify-between gap-4 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={filmSlug}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand-strong text-white font-bold text-[13px] py-2.5 rounded-[3px] shadow-sm transition-all"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center gap-1.5 text-brand hover:text-brand-strong font-bold text-[13px] transition-colors whitespace-nowrap"
                >
                  <Download className="h-4 w-4" />
                  {t('featuredProducts.catalogue')}
                </a>
              </div>
            </div>
          </article>

          {/* Card 3: HVAC Tape */}
          <article className="group relative flex flex-col bg-white border border-slate-200 shadow-sm rounded-[3px] overflow-hidden h-full transition-all duration-[240ms] ease-out hover:-translate-y-1.5 hover:border-[#9fc2ef] hover:shadow-[0_18px_42px_rgba(16,61,111,0.13)]">
            <Link href={tapeSlug} className="relative block h-[240px] m-2 overflow-hidden bg-[#eef2f6] rounded-[3px]">
              <Image
                src={tapeImgSrc}
                alt={t('featuredProducts.tape.title')}
                fill
                className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute bottom-3 right-3 flex items-center justify-center bg-white/95 border border-blue-500/20 shadow-sm p-1 rounded-[3px]">
                <span className="text-[8px] font-extrabold text-blue-600 uppercase tracking-widest px-1">
                  CERTIFIED
                </span>
              </div>
            </Link>

            <div className="flex flex-col flex-1 p-6">
              <p className="text-[13px] font-bold text-brand uppercase tracking-wider mb-2">
                {t('featuredProducts.tape.category')}
              </p>
              <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-2 line-clamp-1">
                <Link href={tapeSlug} className="hover:text-brand transition-colors">
                  {t('featuredProducts.tape.title')}
                </Link>
              </h3>
              <p className="text-[12px] text-slate-500 mb-5 leading-relaxed line-clamp-2">
                {t('featuredProducts.tape.desc')}
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
              <div className="flex items-center justify-between gap-4 mt-auto border-t border-slate-100 pt-4">
                <Link
                  href={tapeSlug}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand hover:bg-brand-strong text-white font-bold text-[13px] py-2.5 rounded-[3px] shadow-sm transition-all"
                >
                  {t('featuredProducts.rfqButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/documents/lien-he-nha-phat-trien.pdf"
                  download="lien-he-nha-phat-trien.pdf"
                  className="flex items-center gap-1.5 text-brand hover:text-brand-strong font-bold text-[13px] transition-colors whitespace-nowrap"
                >
                  <Download className="h-4 w-4" />
                  {t('featuredProducts.catalogue')}
                </a>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

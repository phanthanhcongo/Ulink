import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SearchSection from '@/components/solutions/search-section';
import ProductionMaterials from '@/components/solutions/production-materials';
import CatalogShowcase from '@/components/solutions/catalog-showcase';
import CustomSolutions from '@/components/solutions/custom-solutions';
import HubAndPartner from '@/components/solutions/hub-and-partner';
import TestimonialCarousel from '@/components/regional-hubs/testimonial-carousel';
import CoreCapabilities from '@/components/solutions/core-capabilities';
import FeaturedProduct from '@/components/solutions/featured-product';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface SolutionsPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: SolutionsPageProps) {
  const t = await getTranslations({ locale, namespace: 'solutions' });
  return { title: t('title') };
}

export default async function SolutionsPage({ params: { locale } }: SolutionsPageProps) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'solutions' });
  const tHubs = await getTranslations('regionalHubs');

  const testimonialLabels = {
    eyebrow: tHubs('testimonials.eyebrow'),
    title: tHubs('testimonials.title'),
    subtitle: tHubs('testimonials.subtitle'),
    company1: tHubs('testimonials.company1'),
    quote1: tHubs('testimonials.quote1'),
    name1: tHubs('testimonials.name1'),
    role1: tHubs('testimonials.role1'),
    company2: tHubs('testimonials.company2'),
    quote2: tHubs('testimonials.quote2'),
    name2: tHubs('testimonials.name2'),
    role2: tHubs('testimonials.role2'),
    company3: tHubs('testimonials.company3'),
    quote3: tHubs('testimonials.quote3'),
    name3: tHubs('testimonials.name3'),
    role3: tHubs('testimonials.role3'),
    company4: tHubs('testimonials.company4'),
    quote4: tHubs('testimonials.quote4'),
    name4: tHubs('testimonials.name4'),
    role4: tHubs('testimonials.role4')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-24 sm:py-32 lg:py-44 min-h-[500px] sm:min-h-[600px] lg:min-h-[680px] flex items-center">
        {/* Background Video */}
        <video
          src="/images/solutions/atlantic-stretch.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        />

        {/* Dark overlay for text readability over video */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        <div className="relative page-container z-10 section-padding w-full">


          {/* Text and Button block */}
          <div className="max-w-3xl mt-4">
            <h1 className="text-2xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold text-white leading-tight lg:leading-[54px] tracking-tight whitespace-pre-line drop-shadow-xs">
              {t('heroTitle')}
            </h1>
            <p className="mt-5 text-base sm:text-lg lg:text-[20px] font-normal leading-relaxed lg:leading-[30px] text-slate-100 max-w-2xl drop-shadow-xs">
              {t('heroSubtitle')}
            </p>

            {/* Button: Báo giá nhanh */}
            <div className="mt-8">
              <Link
                href="/quick-order"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'lg' }),
                  'bg-white px-7 py-3.5 text-base sm:text-lg lg:text-[18px] font-bold text-blue-600 shadow-lg hover:bg-slate-50 transition-all rounded-[3px] inline-flex items-center gap-2.5'
                )}
              >
                {t('heroCta')}
                <ArrowRight className="h-5 w-5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION: Production SKU & Materials === */}
      <ProductionMaterials locale={locale} />

      {/* === SECTION: Search === */}
      <Suspense fallback={null}>
        <SearchSection locale={locale} />
      </Suspense>

      {/* === SECTION: Product Catalog Showcase === */}
      <Suspense fallback={<div className="w-full bg-white border-t border-gray-150 py-16 md:py-24"><div className="page-container"><div className="h-64 bg-gradient-to-r from-slate-200 to-slate-100 rounded animate-pulse" /></div></div>}>
        <CatalogShowcase locale={locale} />
      </Suspense>
      {/*Hight light product*/}
      <FeaturedProduct locale={locale} />
      {/* === SECTION: Custom Tailored Solutions === */}
      <CustomSolutions locale={locale} />

      {/* === SECTION: Hub & Partner === */}
      <HubAndPartner locale={locale} />

      {/* === SECTION: Customer Testimonials === */}
      <TestimonialCarousel labels={testimonialLabels} />

      {/* === SECTION: Core Capabilities === */}
      <CoreCapabilities />
    </div>
  );
}

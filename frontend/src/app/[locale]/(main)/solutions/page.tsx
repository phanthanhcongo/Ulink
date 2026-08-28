import { setRequestLocale, getTranslations } from 'next-intl/server';
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
      <section className="relative w-full overflow-hidden py-6 sm:py-10">
        {/* Background Image */}
        <Image
          src="/images/solutions/solution.png"
          alt="Cleanroom Solutions"
          fill
          priority
          className="object-cover object-center pointer-events-none"
        />

        {/* Dark overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-black/25 z-0" />

        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 z-10 py-10 lg:py-16">
         

          {/* Text and Button block */}
          <div className="max-w-2xl mt-4">
            <h1 className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[44px] font-extrabold text-white leading-tight tracking-tight whitespace-pre-line">
              {t('heroTitle')}
            </h1>
            <p className="mt-5 text-white text-sm lg:text-base leading-relaxed max-w-xl">
              {t('heroSubtitle')}
            </p>

            {/* Button: Báo giá nhanh */}
            <div className="mt-8">
              <Link
                href="/quick-order"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'md' }),
                  'bg-white px-6 py-3 text-[14px] font-bold text-blue-600 shadow-md hover:bg-slate-50'
                )}
              >
                {t('heroCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION: Production SKU & Materials === */}
      <ProductionMaterials locale={locale} />

      {/* === SECTION: Product Catalog Showcase === */}
      <CatalogShowcase locale={locale} />

      {/* === SECTION: Custom Tailored Solutions === */}
      <CustomSolutions locale={locale} />

      {/* === SECTION: Hub & Partner === */}
      <HubAndPartner locale={locale} />

      {/* === SECTION: Customer Testimonials === */}
      <TestimonialCarousel labels={testimonialLabels} />

      {/* === SECTION: Core Capabilities === */}
      <CoreCapabilities locale={locale} />
    </div>
  );
}

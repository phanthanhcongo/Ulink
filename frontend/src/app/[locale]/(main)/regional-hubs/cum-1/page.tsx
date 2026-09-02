import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchRegionalHubs } from '@/lib/regional-hub-data';
import { VietnamMap } from '@/components/vietnam-map';
import LiveMetricsBar from '@/components/regional-hubs/live-metrics-bar';
import FeaturedProducts from '@/components/regional-hubs/featured-products';
import SolutionCarousel from '@/components/regional-hubs/solution-carousel';
import CoreCapabilities from '@/components/regional-hubs/core-capabilities';
import HanamOverview from '@/components/regional-hubs/hanam-overview';
import TestimonialCarousel from '@/components/regional-hubs/testimonial-carousel';
import { WorkingProcess, ResourcesNews, CtaBanner, DocSection, SupportSection } from '@/components/home';
import { fetchProducts } from '@/lib/product-data';
import { AboutContact } from '@/components/about/about-contact';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';

export default async function RegionalHubsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('regionalHubs');

  const hubs = await fetchRegionalHubs();

  // Fetch up to 12 products from Directus to filter
  const { products: dbProducts } = await fetchProducts({ limit: 12 });

  // Filter products that have at least one published SKU (fallback to dbProducts if fewer than 4)
  const productsWithSkus = dbProducts.filter(
    (p) => p.skus && p.skus.some((s) => s.status === 'published')
  );
  const availableProducts = productsWithSkus.length >= 4 ? productsWithSkus : (dbProducts.length > 0 ? dbProducts : []);

  // Select 4 products to display in the Featured Products section
  const randomProducts = availableProducts.slice(0, 4);

  const carouselSlides = [
    {
      eyebrow: t('carousel.slide1.eyebrow'),
      title: t('carousel.slide1.title'),
      feat1: t('carousel.slide1.feat1'),
      feat2: t('carousel.slide1.feat2'),
      image: '/images/home/section2/solution-packaging.webp',
      alt: 'Pallet Wrap'
    },
    {
      eyebrow: t('carousel.slide2.eyebrow'),
      title: t('carousel.slide2.title'),
      feat1: t('carousel.slide2.feat1'),
      feat2: t('carousel.slide2.feat2'),
      image: '/images/home/section2/product-cut-gloves.webp',
      alt: 'Industrial Gloves'
    },
    {
      eyebrow: t('carousel.slide3.eyebrow'),
      title: t('carousel.slide3.title'),
      feat1: t('carousel.slide3.feat1'),
      feat2: t('carousel.slide3.feat2'),
      image: '/images/home/section2/product-hvac-tape.webp',
      alt: 'Aluminum Foil Tape'
    },
    {
      eyebrow: t('carousel.slide4.eyebrow'),
      title: t('carousel.slide4.title'),
      feat1: t('carousel.slide4.feat1'),
      feat2: t('carousel.slide4.feat2'),
      image: '/images/home/section2/solution-cleanroom.webp',
      alt: 'Cleanroom Wiper'
    },
    {
      eyebrow: t('carousel.slide5.eyebrow'),
      title: t('carousel.slide5.title'),
      feat1: t('carousel.slide5.feat1'),
      feat2: t('carousel.slide5.feat2'),
      image: '/images/home/section2/product-custom-pkg.webp',
      alt: 'PE Shrink Film'
    }
  ];

  const carouselLabels = {
    rfqButton: t('carousel.rfqButton'),
    learnMore: t('carousel.learnMore')
  };

  const testimonialLabels = {
    eyebrow: t('testimonials.eyebrow'),
    title: t('testimonials.title'),
    subtitle: t('testimonials.subtitle'),
    company1: t('testimonials.company1'),
    quote1: t('testimonials.quote1'),
    name1: t('testimonials.name1'),
    role1: t('testimonials.role1'),
    company2: t('testimonials.company2'),
    quote2: t('testimonials.quote2'),
    name2: t('testimonials.name2'),
    role2: t('testimonials.role2'),
    company3: t('testimonials.company3'),
    quote3: t('testimonials.quote3'),
    name3: t('testimonials.name3'),
    role3: t('testimonials.role3'),
    company4: t('testimonials.company4'),
    quote4: t('testimonials.quote4'),
    name4: t('testimonials.name4'),
    role4: t('testimonials.role4')
  };

  return (
    <>
      <VietnamMap hubs={hubs} locale={locale} />

      {/* === SECTION 2: Real-time Live Data Bar === */}
      <LiveMetricsBar />
      <SectionDivider />

      {/* === SECTION 3: Featured Products (100% Static Standard Data) === */}
      <ScrollReveal><FeaturedProducts locale={locale} /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 4: Interactive Solution Carousel === */}
      <ScrollReveal><SolutionCarousel slides={carouselSlides} labels={carouselLabels} /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 5: Core Capabilities === */}
      <ScrollReveal><CoreCapabilities /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 3.5: Ha Nam Distribution Center Overview === */}
      <ScrollReveal><HanamOverview /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 7: Customer Testimonials === */}
      <ScrollReveal><TestimonialCarousel labels={testimonialLabels} /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 8: Working Process === */}
      <ScrollReveal><WorkingProcess /></ScrollReveal>
      <SectionDivider />

      {/* === SECTION 9: Resources & News === */}
      <ScrollReveal><ResourcesNews /></ScrollReveal>
      <SectionDivider />

      <DocSection />
      <SectionDivider />
      <SupportSection />
      <SectionDivider />
      <ScrollReveal><AboutContact /></ScrollReveal>

    </>
  );
}




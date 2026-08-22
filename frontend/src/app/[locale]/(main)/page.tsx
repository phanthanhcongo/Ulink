import { setRequestLocale } from 'next-intl/server';
import {
  HeroBanner,
  FeatureValueBar,
  ProductCategories,
  IndustrySolutions,
  AboutSection,
  TargetSegments,
  PartnersCertifications,
  CaseStudies,
  WorkingProcess,
  ResourcesNews,
  DocSection,
  SupportSection
} from '@/components/home';
import { AboutContact } from '@/components/about/about-contact';

/** ISR — revalidate every hour; on-demand revalidation via content webhooks */
// export const revalidate = 3600;

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="w-full bg-white">
      <HeroBanner />
      <FeatureValueBar />
      <ProductCategories />
      <IndustrySolutions />
      <AboutSection />
      <TargetSegments />
      <PartnersCertifications />
      <CaseStudies />
      <WorkingProcess />
      <ResourcesNews />
      <DocSection />
      <SupportSection />
      <AboutContact />

    </div>
  );
}

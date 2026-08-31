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
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';

/** ISR — revalidate every hour; on-demand revalidation via content webhooks */
// export const revalidate = 3600;

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="w-full ">
      <HeroBanner />
      <ScrollReveal><FeatureValueBar /></ScrollReveal>
      <SectionDivider />
      <ScrollReveal><ProductCategories /></ScrollReveal>
      <SectionDivider />
      <ScrollReveal><IndustrySolutions /></ScrollReveal>
      <SectionDivider />
      <ScrollReveal><AboutSection /></ScrollReveal>
      <SectionDivider />
      <ScrollReveal><TargetSegments /></ScrollReveal>
      <SectionDivider />
      <ScrollReveal><PartnersCertifications /></ScrollReveal>
      <SectionDivider />
      <ScrollReveal><CaseStudies /></ScrollReveal>
      <SectionDivider />
      <ScrollReveal><WorkingProcess /></ScrollReveal>
      <SectionDivider />
      <ScrollReveal><ResourcesNews /></ScrollReveal>
      <SectionDivider />
      <DocSection />
      <SectionDivider />
      <SupportSection />
      <SectionDivider />
      <ScrollReveal><AboutContact /></ScrollReveal>

    </div>
  );
}

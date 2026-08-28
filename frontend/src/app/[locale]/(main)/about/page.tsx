import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { AboutHero } from '@/components/about/about-hero';
import { AboutStats } from '@/components/about/about-stats';
import { AboutLocation } from '@/components/about/about-location';
import { AboutInfrastructure } from '@/components/about/about-infrastructure';
import { AboutStandards } from '@/components/about/about-standards';
import { AboutSustainability } from '@/components/about/about-sustainability';
import { AboutNews } from '@/components/about/about-news';
import { AboutContact } from '@/components/about/about-contact';
import { DocSection, ResourcesNews, SupportSection } from '@/components/home';

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4">
        {/* 8 Section chính */}
        <AboutHero />
        <AboutStats />
        <AboutLocation />
        <AboutInfrastructure />
      </div>

      <AboutStandards />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4">
        <AboutSustainability />
        <ResourcesNews />
         <DocSection />
              <SupportSection />
              <AboutContact />
      </div>
    </div>
  );
}

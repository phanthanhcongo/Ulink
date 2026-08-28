import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { CareersHero } from '@/components/about/careers/careers-hero';
import { CareersCulture } from '@/components/about/careers/careers-culture';
import { CareersNews } from '@/components/about/careers/careers-news';
import { CareersGallery } from '@/components/about/careers/careers-gallery';
import { CareersJobList } from '@/components/about/careers/careers-job-list';
import { CareersNewsletter } from '@/components/about/careers/careers-newsletter';
import { CareersContact } from '@/components/about/careers/careers-contact';

export default async function CareersPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="w-full bg-[#FFFFFF]">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4">
        {/* 7 Section chính */}
        <CareersHero />
        <CareersCulture />
        <CareersNews />
        <CareersGallery />
        <CareersJobList />
        <CareersNewsletter />
        <CareersContact />
      </div>
    </div>
  );
}

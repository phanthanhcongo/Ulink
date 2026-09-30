import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { CareersHero } from '@/components/about/careers/careers-hero';
import { CareersCulture } from '@/components/about/careers/careers-culture';
import { CareersNews } from '@/components/about/careers/careers-news';
import { CareersGallery } from '@/components/about/careers/careers-gallery';
import { CareersJobList, type JobCardVM } from '@/components/about/careers/careers-job-list';
import { CareersNewsletter } from '@/components/about/careers/careers-newsletter';
import { CareersContact } from '@/components/about/careers/careers-contact';
import {
  fetchJobOpenings,
  getJobTranslation,
  getEmploymentTypeLabel,
  getDaysLeftLabel
} from '@/lib/careers-data';

export default async function CareersPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const jobs = await fetchJobOpenings();
  const jobCards: JobCardVM[] = jobs.map((job) => {
    const t = getJobTranslation(job, locale);
    return {
      id: String(job.id),
      slug: job.slug,
      title: t.title,
      code: job.code || '',
      isUrgent: Boolean(job.is_urgent),
      location: job.location || '',
      type: getEmploymentTypeLabel(job.employment_type),
      salary: job.salary_range || '',
      daysLeft: getDaysLeftLabel(job.deadline),
      department: job.department || ''
    };
  });

  return (
    <div className="w-full bg-[#FFFFFF]">
      <div className="page-container py-4">
        {/* 7 Section chính */}
        <CareersHero />
        <CareersCulture />
        <CareersNews />
        <CareersGallery />
        <CareersJobList jobs={jobCards} />
        <CareersNewsletter />
        <CareersContact />
      </div>
    </div>
  );
}

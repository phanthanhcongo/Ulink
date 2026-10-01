import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JobDetailHeader } from '@/components/about/careers/detail/job-detail-header';
import { JobDetailContent } from '@/components/about/careers/detail/job-detail-content';
import { JobDetailSidebar } from '@/components/about/careers/detail/job-detail-sidebar';
import { JobDetailProcess } from '@/components/about/careers/detail/job-detail-process';
import { JobDetailRelated } from '@/components/about/careers/detail/job-detail-related';
import {
  fetchJobBySlug,
  fetchJobOpenings,
  buildJobDetailVM,
  toJobCardVM
} from '@/lib/careers-data';

export const dynamic = 'force-dynamic';

export default async function JobDetailPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);

  const job = await fetchJobBySlug(slug);
  if (!job) {
    notFound();
  }

  const vm = buildJobDetailVM(job, locale);

  const all = await fetchJobOpenings();
  const siblings = all
    .filter((j) => j.slug !== slug)
    .slice(0, 3)
    .map((j) => toJobCardVM(j, locale));

  return (
    <div className="w-full bg-white">
      <div className="page-container py-2 sm:py-3 lg:py-4">
        <Breadcrumb
          className="px-0 py-0 mx-0 max-w-none mb-2 sm:mb-3 lg:mb-4"
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Về chúng tôi', href: '/about' },
            { label: 'Cơ hội nghề nghiệp', href: '/about/careers' },
            { label: vm.title }
          ]}
        />

        {/* 1. Header Banner & Quick Info */}
        <JobDetailHeader job={vm} />

        {/* 2. Main Content 2 Columns */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <JobDetailContent job={vm} />
            <JobDetailProcess />
          </div>
          <div className="lg:col-span-4">
            <JobDetailSidebar job={vm} similarJobs={siblings} />
          </div>
        </div>

        {/* 3. Related Jobs */}
        <JobDetailRelated jobs={siblings} />
      </div>
    </div>
  );
}

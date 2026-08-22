import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JobDetailHeader } from '@/components/about/careers/detail/job-detail-header';
import { JobDetailContent } from '@/components/about/careers/detail/job-detail-content';
import { JobDetailSidebar } from '@/components/about/careers/detail/job-detail-sidebar';
import { JobDetailProcess } from '@/components/about/careers/detail/job-detail-process';
import { JobDetailRelated } from '@/components/about/careers/detail/job-detail-related';

export default async function JobDetailPage({
  params: { locale }
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4">
        {/* Breadcrumbs */}
        {/* Breadcrumbs */}
        <Breadcrumb
          className="px-0 py-0 mx-0 max-w-none mb-4"
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Về chúng tôi', href: '/about' },
            { label: 'Cơ hội nghề nghiệp', href: '/about/careers' },
            { label: 'Chuyên viên Phát triển Kinh doanh B2B' }
          ]}
        />

        {/* 1. Header Banner & Quick Info */}
        <JobDetailHeader />

        {/* 2. Main Content 2 Columns */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <JobDetailContent />
            <JobDetailProcess />
          </div>
          <div className="lg:col-span-4">
            <JobDetailSidebar />
          </div>
        </div>

        {/* 3. Related Jobs */}
        <JobDetailRelated />
      </div>
    </div>
  );
}

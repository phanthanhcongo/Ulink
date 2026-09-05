import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ApplyHeader } from '@/components/about/careers/apply/apply-header';
import { ApplyForm } from '@/components/about/careers/apply/apply-form';
import { ApplySidebar } from '@/components/about/careers/apply/apply-sidebar';

export default async function ApplyJobPage({
  params: { locale }
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="w-full bg-slate-50/50 min-h-screen py-4">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Breadcrumbs */}
        <Breadcrumb
          className="px-0 py-0 mx-0 max-w-none mb-4"
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Tuyển dụng', href: '/about/careers' },
            { label: 'Kinh doanh', href: '/about/careers/b2b-sales' },
            { label: 'Nộp đơn ứng tuyển' }
          ]}
        />

        {/* Header */}
        <ApplyHeader />

        {/* Main 2 Columns Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ApplyForm />
          </div>
          <div className="lg:col-span-4">
            <ApplySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

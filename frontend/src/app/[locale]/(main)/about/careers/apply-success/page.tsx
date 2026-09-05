import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ApplySuccessHero } from '@/components/about/careers/apply-success/apply-success-hero';
import { ApplySuccessRecap } from '@/components/about/careers/apply-success/apply-success-recap';
import { ApplySuccessSteps } from '@/components/about/careers/apply-success/apply-success-steps';
import { ApplySuccessRecommendations } from '@/components/about/careers/apply-success/apply-success-recommendations';

export default async function ApplySuccessPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="w-full bg-slate-50/50 min-h-screen py-4">
      <div className="page-container">
        {/* Breadcrumbs */}
        <Breadcrumb
          className="px-0 py-0 mx-0 max-w-none mb-4"
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Vị trí tuyển dụng', href: '/about/careers' },
            { label: 'Ứng tuyển thành công' }
          ]}
        />

        {/* 4 Section chính */}
        <ApplySuccessHero />
        <ApplySuccessRecap />
        <ApplySuccessSteps />
        <ApplySuccessRecommendations />
      </div>
    </div>
  );
}

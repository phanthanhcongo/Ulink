import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { QualityHero } from '@/components/about/standards/quality-hero';
import { QualityStandardsGrid } from '@/components/about/standards/quality-standards-grid';
import { QualityBadges } from '@/components/about/standards/quality-badges';
import { QualityProcess } from '@/components/about/standards/quality-process';
import { QualityCommitments } from '@/components/about/standards/quality-commitments';

export default async function QualityStandardsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-4">
        {/* Breadcrumbs */}
        <Breadcrumb
          className="px-0 py-0 mx-0 max-w-none mb-4"
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Về chúng tôi', href: '/about' },
            { label: 'Chất lượng & Tiêu chuẩn' }
          ]}
        />

        {/* Các section chính */}
        <QualityHero />
        <QualityStandardsGrid />
        <QualityBadges />
        <QualityProcess />
        <QualityCommitments />
      </div>
    </div>
  );
}

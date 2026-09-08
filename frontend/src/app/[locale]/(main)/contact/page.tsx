import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ContactHero } from '@/components/contact/contact-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ContactInfoCards } from '@/components/contact/contact-info-cards';
import { ContactCapabilities } from '@/components/contact/contact-capabilities';

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="w-full bg-white">
      <div className="page-container space-y-6 sm:space-y-8 lg:space-y-10 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumbs */}
        <Breadcrumb
          className="px-0 py-0 mx-0 max-w-none"
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Liên hệ', href: '/contact' },
            { label: 'Hub Hà Nam - Trung tâm phân phối' }
          ]}
        />

        {/* 3 Section chính */}
        <ContactHero />
        <ContactInfoCards />
        <ContactCapabilities />
      </div>
    </div>
  );
}

import { setRequestLocale } from 'next-intl/server';
import { ContactSuccessHero } from '@/components/about/contact-success/contact-success-hero';
import { ContactNextSteps } from '@/components/about/contact-success/contact-next-steps';
import { ContactFeaturedSolutions } from '@/components/about/contact-success/contact-featured-solutions';

export default async function ContactSuccessPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="w-full bg-slate-50/50 min-h-screen py-6">
      <div className="page-container">
        <ContactSuccessHero />
        <div className="my-6 h-px w-full bg-slate-200/80 max-w-6xl mx-auto" />
        <ContactNextSteps />
        <div className="my-6 h-px w-full bg-slate-200/80 max-w-6xl mx-auto" />
        <ContactFeaturedSolutions />
      </div>
    </div>
  );
}

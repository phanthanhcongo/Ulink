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
    <div className="w-full min-h-screen bg-white">
      <ContactSuccessHero />
      <ContactNextSteps />
      <ContactFeaturedSolutions />
    </div>
  );
}

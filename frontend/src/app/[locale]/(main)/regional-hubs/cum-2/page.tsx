import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchRegionalHubs } from '@/lib/regional-hub-data';
import HubHeroSection from '@/components/regional-hubs/hub-hero-section';
import HubOverview from '@/components/regional-hubs/hub-overview';
import HubSolutions from '@/components/regional-hubs/hub-solutions';
import HanamFulfillmentHub from '@/components/regional-hubs/hanam-fulfillment-hub';
import HubBenefits from '@/components/regional-hubs/hub-benefits';
import HubOffers from '@/components/regional-hubs/hub-offers';
import HubPartner from '@/components/regional-hubs/hub-partner';
import HubTeam from '@/components/regional-hubs/hub-team';
import { CaseStudies, ResourcesNews } from '@/components/home';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function Cum2Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'regionalHubs' });

  const hubs = await fetchRegionalHubs();

  return (
    <>
      <HubHeroSection locale={locale} hubs={hubs} />
      <HubOverview locale={locale} />
      <HubSolutions locale={locale} />
      <HanamFulfillmentHub />
      <HubTeam />
      <CaseStudies />
      <HubBenefits />
      <HubOffers />
      <ResourcesNews />
      <HubPartner />


    </>
  );
}

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchRegionalHubs } from '@/lib/regional-hub-data';
import HubHeroSection from '@/components/regional-hubs/hub-hero-section';
import HubOverview from '@/components/regional-hubs/hub-overview';
import HubSolutions from '@/components/regional-hubs/hub-solutions';
import HanamFulfillmentHub from '@/components/regional-hubs/hanam-fulfillment-hub';
import HubTeam from '@/components/regional-hubs/hub-team';

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

    </>
  );
}

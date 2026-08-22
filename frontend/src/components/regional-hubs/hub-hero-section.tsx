import { ArrowRight, Clock, Users, Route } from 'lucide-react';
import { VietnamMap, type ClusterMarker } from '@/components/vietnam-map';
import {
  parseCoordinates,
  getHubName,
  getIndustrialZoneName,
  type RegionalHubWithZones
} from '@/lib/regional-hub-data';
import HubClusterList from '@/components/regional-hubs/hub-cluster-list';
import { getTranslations } from 'next-intl/server';

interface HubHeroSectionProps {
  locale: string;
  hubs: RegionalHubWithZones[];
}

export default async function HubHeroSection({ locale, hubs }: HubHeroSectionProps) {
  const t = await getTranslations('regionalHubs');

  // Parse coordinates for map markers
  const mapClusters: ClusterMarker[] = hubs
    .map((hub) => {
      const coords = parseCoordinates(hub.coordinates);
      if (!coords) return null;
      return { id: String(hub.id), lat: coords.lat, lon: coords.lon };
    })
    .filter((c): c is ClusterMarker => c !== null);

  return (
    <section
      className="relative w-full bg-brand text-background"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 sm:py-14 lg:px-12 xl:px-16 lg:py-16">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-1.5">
          <span className="text-[13px] text-blue-300/60">{t('eyebrow')}</span>
          <ArrowRight className="h-3 w-3 text-blue-300/40" />
        </div>

        {/* Main layout: left info + center-right visualization */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[340px_1fr] xl:grid-cols-[360px_1fr]">
          {/* === LEFT COLUMN: Title + Description + Stats === */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Title */}
              <h1 className="text-[26px] font-bold leading-[1.3] text-white sm:text-[30px] lg:text-[34px] xl:text-[38px]">
                {t('title')}
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-[500px] text-[13px] leading-[1.8] text-blue-100/75">
                {t('description')}
              </p>
            </div>

            {/* Stats Cards Stack */}
            <div className="mt-8 flex flex-col gap-4 w-full max-w-[340px]">
              {/* Stat 1: Distance */}
              <div className="w-full bg-white rounded-[3px] border border-slate-300 border-l-[4px] border-l-brand p-5 shadow-sm">
                <StatRow
                  icon={<Route className="h-[22px] w-[22px] text-brand" />}
                  label={t('stats.distanceLabel')}
                  value={t('stats.distanceValue')}
                  unit={t('stats.distanceUnit')}
                  note={t('stats.distanceNote')}
                />
              </div>

              {/* Stat 2: Time */}
              <div className="w-full bg-white rounded-[3px] border border-slate-300 border-l-[4px] border-l-brand p-5 shadow-sm">
                <StatRow
                  icon={<Clock className="h-[22px] w-[22px] text-brand" />}
                  label={t('stats.timeLabel')}
                  value={t('stats.timeValue')}
                  unit={t('stats.timeUnit')}
                  note={t('stats.timeNote')}
                />
              </div>

              {/* Stat 3: Partners */}
              <div className="w-full bg-white rounded-[3px] border border-slate-300 border-l-[4px] border-l-brand p-5 shadow-sm">
                <StatRow
                  icon={<Users className="h-[22px] w-[22px] text-brand" />}
                  label={t('stats.partnersLabel')}
                  value={t('stats.partnersValue')}
                  note={t('stats.partnersNote')}
                />
              </div>
            </div>
          </div>

          {/* === CENTER-RIGHT COLUMN: Map & Hub List Side-by-Side (Seamless connections) === */}
          <div className="relative flex items-center justify-between gap-0">
            {/* Map container - left side of this section with cyber-tech borders */}
            <div className="relative hidden h-[640px] w-[420px] shrink-0 rounded-[3px] border border-blue-400/40 lg:block">
              {/* L-shaped corner notches */}
              <div className="absolute -top-[2px] -left-[2px] h-4 w-4 border-t-2 border-l-2 border-blue-400" />
              <div className="absolute -top-[2px] -right-[2px] h-4 w-4 border-t-2 border-r-2 border-blue-400" />
              <div className="absolute -bottom-[2px] -left-[2px] h-4 w-4 border-b-2 border-l-2 border-blue-400" />
              <div className="absolute -bottom-[2px] -right-[2px] h-4 w-4 border-b-2 border-r-2 border-blue-400" />

              {/* Tech dots inside the corners */}
              <div className="absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full bg-white" />
              <div className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-white" />

              {/* Center horizontal segments */}
              <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 h-[2px] w-12 bg-blue-400/70" />
              <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 h-[2px] w-12 bg-blue-400/70" />

              <VietnamMap className="h-full w-full" clusters={mapClusters} />
            </div>

            {/* Hub List & Status Header - right side of this section */}
            <div className="flex flex-1 flex-col justify-start max-w-[340px] pl-6 z-10">
              {/* Network Status Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-blue-300/40 font-mono tracking-wider font-semibold">
                  NETWORK STATUS
                </span>
                <div className="inline-flex items-center gap-1.5 rounded-[3px] border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Network Online
                </div>
              </div>

              {/* Cluster List — client component for RFQ modal interaction */}
              <HubClusterList
                hubs={hubs.map((hub) => ({
                  id: hub.id,
                  name: hub.name,
                  slug: hub.slug,
                  localizedName: getHubName(hub, locale),
                  zonesStr:
                    hub.industrial_zones && hub.industrial_zones.length > 0
                      ? hub.industrial_zones
                        .map((z) => getIndustrialZoneName(z, locale))
                        .join(', ')
                      : ''
                }))}
                labels={{
                  title: t('hubRfq.title'),
                  hubLabel: t('hubRfq.hubLabel'),
                  contactName: t('hubRfq.contactName'),
                  company: t('hubRfq.company'),
                  phone: t('hubRfq.phone'),
                  email: t('hubRfq.email'),
                  note: t('hubRfq.note'),
                  notePlaceholder: t('hubRfq.notePlaceholder'),
                  submit: t('hubRfq.submit'),
                  submitting: t('hubRfq.submitting'),
                  success: t('hubRfq.success'),
                  error: t('hubRfq.error'),
                  required: t('hubRfq.required'),
                  invalidEmail: t('hubRfq.invalidEmail'),
                  invalidPhone: t('hubRfq.invalidPhone')
                }}
              />

              {/* Technical Live Data Footer */}
              <div className="mt-2 text-right">
                <p className="text-[9px] font-mono tracking-widest text-blue-300/30 uppercase">
                  ULINK INDUSTRIAL NETWORK // LIVE DATA • 04 HUBS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatRow({
  icon,
  label,
  value,
  unit,
  note
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  note: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] border border-blue-300 bg-[#B2EDFF]/25">
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[13px] leading-none text-slate-500">{label}</p>
        <div className="text-[26px] font-bold leading-none text-brand">
          {value}
          {unit && <span className="ml-1">{unit}</span>}
        </div>
        <p className="text-[13px] leading-none text-slate-500">{note}</p>
      </div>
    </div>
  );
}

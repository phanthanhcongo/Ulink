'use client';

import React, { useState } from 'react';
import { MapPin, Truck, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export type ClusterMarker = {
  id: string;
  name: string;
  subName: string;
  lat: number;
  lon: number;
  num: string;
};

const DEFAULT_CLUSTERS: ClusterMarker[] = [
  { id: '03', name: 'Hưng Yên', subName: 'KCN Thăng Long II', lat: 20.75, lon: 106.05, num: '03' },
  { id: '01', name: 'Bắc Ninh', subName: 'VSIP Bắc Ninh, Tiên Sơn', lat: 21.12, lon: 106.07, num: '01' },
  { id: '02', name: 'Hải Phòng', subName: 'DEEP C, Tràng Duệ', lat: 20.86, lon: 106.68, num: '02' },
  { id: '04', name: 'Bình Dương', subName: 'VSIP I, II, III', lat: 10.95, lon: 106.83, num: '04' }
];

// Projection settings for the SVG map
const PAD = 15;
const VIEW_W = 380;
const VIEW_H = 580;

const LON_MIN = 102.0;
const LON_MAX = 110.0;
const LAT_MIN = 7.2;
const LAT_MAX = 23.5;

function geoToSvg(lat: number, lon: number): { x: number; y: number } {
  const x = PAD + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (VIEW_W - 2 * PAD);
  const y = PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (VIEW_H - 2 * PAD);
  return { x, y };
}

function computeListTargets(count: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [VIEW_H / 2];

  const containerHeight = 580;
  const paddingY = 80;
  const usable = containerHeight - 2 * paddingY;
  const step = usable / (count - 1);
  const scale = VIEW_H / containerHeight;

  return Array.from({ length: count }, (_, i) => Math.round((paddingY + i * step) * scale));
}

interface VietnamMapProps {
  className?: string;
  locale?: string;
  hubs?: any[];
}

export function VietnamMap({ className, locale = 'vi', hubs = [] }: VietnamMapProps) {
  const activeMarkers = React.useMemo(() => {
    if (!hubs || hubs.length === 0) return DEFAULT_CLUSTERS;
    
    return hubs.map((hub, idx) => {
      // Parse coordinates
      let lat = 21.0;
      let lon = 105.8;
      if (hub.coordinates) {
        const parts = hub.coordinates.split(',').map((s: string) => s.trim());
        if (parts.length >= 2) {
          const parsedLat = parseFloat(parts[0]);
          const parsedLon = parseFloat(parts[1]);
          if (!isNaN(parsedLat) && !isNaN(parsedLon)) {
            lat = parsedLat;
            lon = parsedLon;
          }
        }
      }
      
      // Get translated name of hub
      const nameTranslation = hub.translations?.find(
        (t: any) => t.languages_code === locale || t.languages_code.startsWith(locale)
      );
      const hubName = nameTranslation?.name || hub.name;
      
      // Get list of industrial zone names
      const zoneNames = hub.industrial_zones?.map((z: any) => {
        const zTrans = z.translations?.find(
          (t: any) => t.languages_code === locale || t.languages_code.startsWith(locale)
        );
        return zTrans?.name || z.name;
      }).join(', ') || '';

      const numStr = String(idx + 1).padStart(2, '0');
      
      return {
        id: String(hub.id),
        name: hubName,
        subName: zoneNames || hub.hub_code || '',
        lat,
        lon,
        num: numStr,
        slug: hub.slug
      };
    });
  }, [hubs, locale]);

  const listTargets = computeListTargets(activeMarkers.length);
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  const t = {
    eyebrow: locale === 'vi' ? 'MẠNG LƯỚI CÔNG NGHIỆP' : 'INDUSTRIAL NETWORK',
    title: locale === 'vi' ? 'Kết nối các Khu công nghiệp trọng điểm tại Việt Nam' : 'Connecting Key Industrial Zones in Vietnam',
    desc: locale === 'vi' 
      ? 'ULink cung cấp giải pháp và dịch vụ cho các khu công nghiệp trên toàn quốc, tối ưu chuỗi cung ứng và nâng cao hiệu quả sản xuất.'
      : 'ULink provides solutions and services to industrial parks nationwide, optimizing the supply chain and improving production efficiency.',
    distanceTitle: locale === 'vi' ? 'Khoảng cách trung bình' : 'Average Distance',
    distanceVal: '15 km',
    distanceSub: locale === 'vi' ? 'Từ trung tâm cụm công nghiệp' : 'From industrial cluster centers',
    slaTitle: locale === 'vi' ? 'Cam kết giao đúng hẹn' : 'On-time Commitment',
    slaVal: 'T+1 ngày',
    slaSub: locale === 'vi' ? 'Trong phạm vi miền Bắc' : 'Within Northern Vietnam area',
    partnerTitle: locale === 'vi' ? 'Số lượng đối tác' : 'Total Partners',
    partnerVal: '120+',
    partnerSub: locale === 'vi' ? 'Đồng hành và phát triển' : 'Accompanying & developing',
    networkOnline: 'NETWORK ONLINE'
  };

  return (
    <section className={`w-full bg-[#0F62FE] text-white py-16 relative overflow-hidden font-sans ${className ?? ''}`}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ════════════════════════════════════════════════════════════
              LEFT COLUMN: HEADER & STATS CARDS
             ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-widest block">
                {t.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold leading-tight tracking-tight">
                {t.title}
              </h2>
              <p className="text-sm text-blue-100/80 leading-relaxed max-w-md">
                {t.desc}
              </p>
            </div>

            {/* White Stats Cards */}
            <div className="space-y-4 max-w-sm w-full">
              {/* Stat 1 */}
              <div className="bg-white rounded-[4px] p-4 flex items-start gap-4 shadow-lg border border-white/10 hover:scale-[1.01] transition-transform">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-500">{t.distanceTitle}</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-0.5">{t.distanceVal}</span>
                  <span className="text-[11px] text-slate-400 font-medium mt-0.5">{t.distanceSub}</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white rounded-[4px] p-4 flex items-start gap-4 shadow-lg border border-white/10 hover:scale-[1.01] transition-transform">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-500">{t.slaTitle}</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-0.5">{t.slaVal}</span>
                  <span className="text-[11px] text-slate-400 font-medium mt-0.5">{t.slaSub}</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white rounded-[4px] p-4 flex items-start gap-4 shadow-lg border border-white/10 hover:scale-[1.01] transition-transform">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-500">{t.partnerTitle}</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-0.5">{t.partnerVal}</span>
                  <span className="text-[11px] text-slate-400 font-medium mt-0.5">{t.partnerSub}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              MIDDLE COLUMN: MAP WITH TECHNICAL FRAME CORNERS
             ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 relative flex items-center justify-center min-h-[500px] xl:min-h-[580px]">
            {/* Tech frame corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/40 rounded-tl-[2px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/40 rounded-tr-[2px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/40 rounded-bl-[2px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/40 rounded-br-[2px] pointer-events-none" />

            {/* Map Silhouette */}
            <div className="relative w-[340px] h-[520px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/illustrations/vietnam-provinces.svg"
                alt="Bản đồ Việt Nam"
                className="h-full w-full object-contain select-none"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                draggable={false}
              />

              {/* Overlay SVG for connectors & glowing dots */}
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
              >
                {/* S-curve connector lines to the right hub cards */}
                {activeMarkers.map((cluster, i) => {
                  const { x, y } = geoToSvg(cluster.lat, cluster.lon);
                  const targetY = listTargets[i];
                  const targetX = VIEW_W + 100; // extend lines slightly past map border
                  const isHovered = hoveredHub === cluster.id;
                  
                  const d = `M ${x} ${y} C ${(x + targetX) / 2} ${y}, ${(x + targetX) / 2} ${targetY}, ${targetX} ${targetY}`;
                  return (
                    <path
                      key={`line-${cluster.id}`}
                      d={d}
                      fill="none"
                      stroke={isHovered ? '#00FFFF' : '#ffffff'}
                      strokeWidth={isHovered ? '2' : '1.2'}
                      strokeDasharray={isHovered ? 'none' : '4 3'}
                      opacity={isHovered ? '0.9' : '0.5'}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* Glowing pulsating hub dots */}
                {activeMarkers.map((cluster) => {
                  const { x, y } = geoToSvg(cluster.lat, cluster.lon);
                  const isHovered = hoveredHub === cluster.id;
                  return (
                    <g key={`dot-${cluster.id}`}>
                      {/* Pulsating ripple ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? '12' : '8'}
                        fill="#00FFFF"
                        opacity={isHovered ? '0.5' : '0.3'}
                        className="animate-ping"
                        style={{ transformOrigin: `${x}px ${y}px` }}
                      />
                      {/* Glow border ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? '9' : '6'}
                        fill="none"
                        stroke="#00FFFF"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />
                      {/* Solid center dot */}
                      <circle cx={x} cy={y} r="3.5" fill="#ffffff" />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              RIGHT COLUMN: NETWORK STATUS & HUB CARDS
             ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            
            {/* Status Badge */}
            <div className="flex justify-start lg:justify-end">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {t.networkOnline}
              </span>
            </div>

            {/* Hub Cards List */}
            <div className="space-y-4 w-full">
              {activeMarkers.map((cluster) => {
                const isHovered = hoveredHub === cluster.id;
                return (
                  <div
                    key={cluster.id}
                    onMouseEnter={() => setHoveredHub(cluster.id)}
                    onMouseLeave={() => setHoveredHub(null)}
                    className={`group rounded-[4px] p-4 flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 border ${
                      isHovered
                        ? 'bg-blue-900/50 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.15)] scale-[1.02]'
                        : 'bg-[#0B3C9B]/30 border-white/10 hover:border-white/25 hover:bg-[#0B3C9B]/40'
                    }`}
                  >
                    {/* Badge Number */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] bg-blue-600 text-white font-extrabold text-[16px] shadow-sm">
                      {cluster.num}
                    </div>

                    {/* Middle Text */}
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="text-[15px] font-extrabold text-white truncate">
                        {cluster.name}
                      </h4>
                      <p className="text-[11px] text-blue-200 font-semibold truncate mt-0.5">
                        {cluster.subName}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <ArrowRight className={`h-4 w-4 shrink-0 transition-transform duration-300 text-white/50 group-hover:text-white group-hover:translate-x-0.5`} />
                  </div>
                );
              })}
            </div>

            {/* Footer Text */}
            <div className="text-left lg:text-right pt-4">
              <span className="text-[10px] font-extrabold text-blue-200/60 uppercase tracking-widest block">
                ULINK INDUSTRIAL NETWORK // LIVE DATA • 04 HUBS
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

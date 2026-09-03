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
  { id: '01', name: 'Bắc Ninh', subName: 'VSIP Bắc Ninh, Tiên Sơn', lat: 21.12, lon: 106.07, num: '01' },
  { id: '02', name: 'Hải Phòng', subName: 'DEEP C, Tràng Duệ', lat: 20.86, lon: 106.68, num: '02' },
  { id: '03', name: 'Hưng Yên', subName: 'KCN Thăng Long II', lat: 20.75, lon: 106.05, num: '03' },
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

  // Line 1 & Line 2 moved DOWN a bit more:
  // Line 1: 104px, Line 2: 222px, Line 3: 330px, Line 4: 440px
  if (count === 4) {
    return [104, 222, 330, 440];
  }

  const startY = 104;
  const step = 112;
  return Array.from({ length: count }, (_, i) => startY + i * step);
}

interface VietnamMapProps {
  className?: string;
  locale?: string;
}

export function VietnamMap({ className, locale = 'vi' }: VietnamMapProps) {
  const activeMarkers = DEFAULT_CLUSTERS;

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
    <section className={`w-full bg-[#1769e2] text-white py-16 relative overflow-hidden font-sans ${className ?? ''}`}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ════════════════════════════════════════════════════════════
              QUADRANT 1 (TOP LEFT - Ô TRÊN TRÁI): HEADER COPY & MOBILE LOCATION CARDS
             ════════════════════════════════════════════════════════════ */}
          <div className="md:col-span-1 lg:col-span-4 lg:col-start-1 lg:row-start-1 space-y-4">
            <span className="text-[14px] font-normal text-[#ccf2ff] uppercase tracking-[1px] block">
              {t.eyebrow}
            </span>
            <h2 className="text-[32px] sm:text-[36px] xl:text-[38px] font-bold text-white leading-[46px] tracking-[-0.6px]">
              {t.title}
            </h2>
            <p className="text-[15px] sm:text-[16px] font-normal text-[#e8f7ff]/90 leading-[24px] max-w-md">
              {t.desc}
            </p>

            {/* Mobile Location Cards: Displayed only on Mobile (< lg), replaces map silhouette */}
            <div className="block lg:hidden w-full space-y-3 pt-4 pb-2">
              {[
                { num: '01', title: 'Khu vực Bắc Bộ', href: '/quick-order' },
                { num: '02', title: 'Khu vực Bắc Bộ', href: '/quick-order' },
                { num: '03', title: 'Khu vực Duyên Hải', href: '/quick-order' },
                { num: '04', title: 'Khu vực Nam Bộ', href: '/quick-order' },
              ].map((card, idx) => (
                <Link
                  key={idx}
                  href={card.href}
                  className="flex items-center justify-between bg-[#f4f8fc] hover:bg-white text-[#212529] px-4 py-3.5 rounded-[2px] border border-blue-100 shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full border border-[#9ed0ff] bg-[#e6f2ff] text-[#1769e2] font-bold text-[15px] flex items-center justify-center shrink-0">
                      {card.num}
                    </div>
                    <span className="text-[15px] font-medium text-[#212529] leading-snug">
                      {card.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#a0b3d1] group-hover:text-[#1769e2] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              QUADRANT 2 (TOP RIGHT - Ô TRÊN PHẢI): MAP SILHOUETTE (DESKTOP ONLY)
             ════════════════════════════════════════════════════════════ */}
          <div className="hidden lg:flex md:col-span-1 lg:col-span-4 lg:col-start-5 lg:row-start-1 lg:row-span-2 relative items-center justify-center min-h-[460px] xl:min-h-[580px]">
            {/* Status Badge - Top Left between Quadrant 1 & 2 */}
            <div className="absolute top-2 left-2 sm:left-4 z-20 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 bg-[#0940a8]/90 text-white border border-[#a1edff]/60 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md">
                <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                {t.networkOnline}
              </span>
              <div className="hidden sm:block h-[1px] w-16 bg-gradient-to-r from-[#a1edff]/60 to-transparent" />
            </div>

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

              {/* Connector lines (hidden on mobile & tablet) */}
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-full w-full overflow-visible pointer-events-none hidden lg:block"
              >
                {activeMarkers.map((cluster, i) => {
                  const { x, y } = geoToSvg(cluster.lat, cluster.lon);
                  const targetY = listTargets[i];
                  const targetX = VIEW_W + 100;
                  const isHovered = hoveredHub === cluster.id;

                  const dx = targetX - x;
                  const dy = targetY - y;
                  const curveBias = Math.abs(dy) < 45 ? (dy >= 0 ? -18 : 18) : 0;
                  const cp1x = x + dx * 0.45;
                  const cp1y = y + curveBias;
                  const cp2x = x + dx * 0.8;
                  const cp2y = targetY;

                  const d = `M ${x} ${y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;
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
              </svg>

              {/* Glowing pulsating hub dots */}
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
              >
                {activeMarkers.map((cluster) => {
                  const { x, y } = geoToSvg(cluster.lat, cluster.lon);
                  const isHovered = hoveredHub === cluster.id;
                  return (
                    <g key={`dot-${cluster.id}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? '12' : '8'}
                        fill="#00FFFF"
                        opacity={isHovered ? '0.5' : '0.3'}
                        className="animate-ping"
                        style={{ transformOrigin: `${x}px ${y}px` }}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? '9' : '6'}
                        fill="none"
                        stroke="#00FFFF"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />
                      <circle cx={x} cy={y} r="3.5" fill="#ffffff" />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              QUADRANT 3 (BOTTOM LEFT - Ô DƯỚI TRÁI): 3 WHITE STAT CARDS
             ════════════════════════════════════════════════════════════ */}
          <div className="md:col-span-1 lg:col-span-4 lg:col-start-1 lg:row-start-2 flex flex-col justify-between h-full space-y-4 w-full">
            {/* Stat 1 */}
            <div className="group bg-white/95 rounded-[2px] p-4 sm:p-5 flex-1 min-h-[96px] flex items-center gap-4 shadow-lg border border-[#bfedff]/80 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-[#e0f5ff] border border-[#5cc7ff]/40 text-[#094aad] transition-colors duration-200 group-hover:bg-[#1769E2] group-hover:text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="flex flex-col text-left justify-center">
                <span className="text-[14px] font-normal text-[#385782] leading-[20px] transition-colors duration-200 group-hover:text-[#1769E2]">{t.distanceTitle}</span>
                <span className="text-[24px] font-bold text-[#094aad] leading-[30px] transition-colors duration-200 group-hover:text-[#1769E2]">{t.distanceVal}</span>
                <span className="text-[14px] font-normal text-[#4d6b96] leading-[20px]">{t.distanceSub}</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group bg-white/95 rounded-[2px] p-4 sm:p-5 flex-1 min-h-[96px] flex items-center gap-4 shadow-lg border border-[#bfedff]/80 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-[#e0f5ff] border border-[#5cc7ff]/40 text-[#094aad] transition-colors duration-200 group-hover:bg-[#1769E2] group-hover:text-white">
                <Truck className="h-6 w-6" />
              </div>
              <div className="flex flex-col text-left justify-center">
                <span className="text-[14px] font-normal text-[#385782] leading-[20px] transition-colors duration-200 group-hover:text-[#1769E2]">{t.slaTitle}</span>
                <span className="text-[24px] font-bold text-[#094aad] leading-[30px] transition-colors duration-200 group-hover:text-[#1769E2]">{t.slaVal}</span>
                <span className="text-[14px] font-normal text-[#4d6b96] leading-[20px]">{t.slaSub}</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group bg-white/95 rounded-[2px] p-4 sm:p-5 flex-1 min-h-[96px] flex items-center gap-4 shadow-lg border border-[#bfedff]/80 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-[#e0f5ff] border border-[#5cc7ff]/40 text-[#094aad] transition-colors duration-200 group-hover:bg-[#1769E2] group-hover:text-white">
                <Users className="h-6 w-6" />
              </div>
              <div className="flex flex-col text-left justify-center">
                <span className="text-[14px] font-normal text-[#385782] leading-[20px] transition-colors duration-200 group-hover:text-[#1769E2]">{t.partnerTitle}</span>
                <span className="text-[24px] font-bold text-[#094aad] leading-[30px] transition-colors duration-200 group-hover:text-[#1769E2]">{t.partnerVal}</span>
                <span className="text-[14px] font-normal text-[#4d6b96] leading-[20px]">{t.partnerSub}</span>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              QUADRANT 4 (BOTTOM RIGHT - Ô DƯỚI PHẢI): HUB CARDS LIST (DESKTOP ONLY)
             ════════════════════════════════════════════════════════════ */}
          <div className="hidden lg:flex md:col-span-1 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:row-span-2 flex-col justify-center h-full my-auto">

            {/* Hub Cards List */}
            <div className="space-y-4 w-full">
              {activeMarkers.map((cluster) => {
                const isHovered = hoveredHub === cluster.id;
                return (
                  <div
                    key={cluster.id}
                    onMouseEnter={() => setHoveredHub(cluster.id)}
                    onMouseLeave={() => setHoveredHub(null)}
                    className={`group rounded-[2px] p-4 sm:p-5 min-h-[96px] flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 border ${isHovered
                      ? 'bg-[#093fa0] border-[#6cdcfb] shadow-[0_10px_26px_rgba(3,31,97,0.45),0_0_20px_rgba(108,220,251,0.5)] scale-[1.02]'
                      : 'bg-[#0940a8] border-[#a1edff]/40 hover:border-[#a1edff]/80 hover:bg-[#083896] shadow-[0_10px_26px_rgba(3,31,97,0.3)]'
                      }`}
                  >
                    {/* Badge Number */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-[#0d63e5] border border-[#abf0ff]/60 text-white font-bold text-[20px] shadow-sm">
                      {cluster.num}
                    </div>

                    {/* Middle Text */}
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="text-[16px] font-semibold text-white leading-[22px] truncate">
                        {cluster.name}
                      </h4>
                      <p className="text-[13px] text-[#d9f0ff]/80 font-normal leading-[18px] truncate mt-0.5">
                        {cluster.subName}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 text-white/80 group-hover:text-white group-hover:translate-x-1" />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Section Footer Signature (Outside the 4 quadrants) */}
        <div className="text-left md:text-right pt-6 mt-2 border-t border-white/10">
          <span className="text-[11px] font-semibold text-[#8ce8ff]/80 uppercase tracking-[1.5px] block">
            ULINK INDUSTRIAL NETWORK // LIVE DATA • 04 HUBS
          </span>
        </div>
      </div>
    </section>
  );
}

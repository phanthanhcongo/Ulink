'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { ResourceItem } from './types';
import { EventItem } from './mock-data';
import { getResourceHref } from './resource-utils';

interface EventCardProps {
  event: ResourceItem | EventItem;
  locale: 'vi' | 'en' | 'ja';
}

function getMonthAbbr(month: number, locale: string) {
  if (locale === 'vi') {
    return `Th${month}`;
  }
  if (locale === 'ja') {
    return `${month}月`;
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month - 1] || '';
}

function formatEventDateBadge(dateStr: string, locale: 'vi' | 'en' | 'ja') {
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    if (locale === 'vi') {
      return `${day} ${getMonthAbbr(month, locale)}`;
    }
    if (locale === 'ja') {
      return `${getMonthAbbr(month, locale)}${day}日`;
    }
    return `${getMonthAbbr(month, locale)} ${day}`;
  }
  return dateStr;
}

export function EventCard({ event, locale }: EventCardProps) {
  // Determine if it is a ResourceItem or an EventItem
  const isResource = 'category' in event;

  const href = isResource
    ? getResourceHref(event as ResourceItem)
    : `/resources/events/${event.id.toLowerCase()}`;

  const titleText = typeof event.title === 'string'
    ? event.title
    : event.title[locale] || '';

  const descText = isResource
    ? (event as ResourceItem).description[locale]
    : (event as EventItem).description?.[locale] || '';

  const badgeText = isResource
    ? (event as ResourceItem).badge[locale]
    : (event as EventItem).badge?.[locale] || 'Event';

  const dateBadge = formatEventDateBadge(event.date, locale);

  const timeText = event.time || '09:00 - 17:00';

  const locationText = typeof event.location === 'string'
    ? event.location
    : event.location
      ? event.location[locale]
      : '';

  const priceText = isResource
    ? (event as ResourceItem).price?.[locale]
    : (event as EventItem).price?.[locale];

  const ctaText = locale === 'vi'
    ? 'Đăng ký ngay'
    : locale === 'ja'
      ? '今すぐ登録'
      : 'Register now';

  return (
    <Link
      href={href}
      className="group ui-card-hover flex flex-col bg-white border border-slate-100 rounded-[6px] overflow-hidden shadow-[0_4px_16px_rgba(10,26,59,0.09)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9fc2ef] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] h-full cursor-pointer"
    >
      {/* Top Image Area */}
      <div className="relative aspect-[16/10] w-full bg-slate-50 overflow-hidden">
        {'images' in event && event.images && event.images.length > 1 ? (
          <>
            <Image
              src={event.images[0]}
              alt={titleText}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:opacity-0 transition-opacity duration-500"
            />
            <Image
              src={event.images[1]}
              alt={titleText}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </>
        ) : (
          <Image
            src={event.image}
            alt={titleText}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Top Left Date Badge - Figma: 11px / SemiBold 600 */}
        <div className="absolute top-4 left-4 z-10 bg-[#1769e2] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
          {dateBadge}
        </div>

        {/* Top Right Category Badge - Figma: 11px / SemiBold 600 */}
        <div className="absolute top-4 right-4 z-10 bg-[#16a34a] text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
          {badgeText}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          {/* Title - Figma: 15px / Bold 700 / #0a1a3b */}
          <h3 className="text-[15px] font-bold text-[#0a1a3b] leading-[140%] group-hover:text-blue-600 transition-colors line-clamp-2">
            {titleText}
          </h3>

          {/* Description - Figma: 13px / Regular 400 / #6b7a99 */}
          {descText && (
            <p className="text-[13px] font-normal text-[#6b7a99] leading-[150%] line-clamp-2">
              {descText}
            </p>
          )}

          {/* Details list - Figma: 13px / Regular 400 / #6b7a99 */}
          <div className="space-y-2 text-[13px] font-normal text-[#6b7a99] pt-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#1769e2] shrink-0" />
              <span>
                {dateBadge} • {event.date} • {timeText}
              </span>
            </div>

            {locationText && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#1769e2] shrink-0" />
                <span className="line-clamp-1">{locationText}</span>
              </div>
            )}

            {priceText && (
              <div className="flex items-center gap-2 pt-1">
                <Ticket className="h-4 w-4 text-[#1769e2] shrink-0" />
                <span className="text-[14px] font-bold text-[#1769e2]">{priceText}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button - Figma: 14px / Bold 700 / Height 45px / Border 1.25px #1769e2 */}
        <div className="pt-2 border-t border-slate-50">
          <span
            className="w-full inline-flex items-center justify-center h-[45px] border-[1.25px] border-[#1769e2] group-hover:bg-[#ebf3fe] text-[#1769e2] font-bold rounded-[3px] text-[14px] transition-colors shadow-xs"
          >
            {ctaText}
          </span>
        </div>
      </div>
    </Link>
  );
}

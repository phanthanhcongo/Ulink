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
    : (event as EventItem).link || `/events/${event.id.toLowerCase()}`;

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
    <div
      className="flex flex-col bg-white border border-slate-100 rounded-[3px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
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
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        )}

        {/* Top Left Date Badge */}
        <div className="absolute top-4 left-4 z-10 bg-blue-600/90 backdrop-blur-xs text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
          {dateBadge}
        </div>

        {/* Top Right Category Badge */}
        <div className="absolute top-4 right-4 z-10 bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
          {badgeText}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
            {titleText}
          </h3>

          {/* Description */}
          {descText && (
            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal line-clamp-2">
              {descText}
            </p>
          )}

          {/* Details list */}
          <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="font-medium">
                {event.date} • {timeText}
              </span>
            </div>

            {locationText && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                <span className="font-medium text-slate-500">{locationText}</span>
              </div>
            )}

            {priceText && (
              <div className="flex items-center gap-3">
                <Ticket className="h-4 w-4 text-blue-600 shrink-0" />
                <span className="font-bold text-blue-600">{priceText}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-50">
          <Link
            href={href}
            className="w-full inline-flex items-center justify-center py-3 border-2 border-blue-600 hover:bg-blue-50 text-blue-600 font-bold rounded-[3px] text-xs sm:text-sm transition-colors shadow-xs"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
}

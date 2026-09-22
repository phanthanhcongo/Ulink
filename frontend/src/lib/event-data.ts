import { getDirectusUrl } from './directus-runtime.mjs';
import { getTranslatedField } from './i18n-content';

export interface EventAgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface EventSpeaker {
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar?: string;
}

export interface EventTranslation {
  id?: number;
  languages_code: string;
  title?: string | null;
  summary?: string | null;
  overview?: string | null;
  location_name?: string | null;
  address?: string | null;
  price?: string | null;
  organizer_description?: string | null;
  organizer_role?: string | null;
  organizer_name?: string | null;
  highlights?: string[] | null;
  agenda?: EventAgendaItem[] | null;
  speakers?: EventSpeaker[] | null;
  hosts?: EventSpeaker[] | null;
  benefits?: string[] | null;
}

export interface EventItem {
  id: number;
  status: string;
  slug: string;
  title: string;
  summary: string | null;
  image: string | null;
  date: string | null;
  time: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  location_name: string | null;
  address: string | null;
  registration_status: string | null;
  price: string | null;
  overview: string | null;
  highlights: string[];
  agenda: EventAgendaItem[];
  speakers: EventSpeaker[];
  hosts: EventSpeaker[];
  sponsors: string[];
  benefits: string[];
  organizer_name: string | null;
  organizer_description: string | null;
  organizer_contact: string | null;
  organizer_role: string | null;
  organizer_logo: string | null;
  date_created: string | null;
  date_updated: string | null;
  translations?: EventTranslation[];
}

const EVENT_FIELDS = '*,translations.*';

export async function fetchEvents(): Promise<EventItem[]> {
  const url = getDirectusUrl();
  const params = new URLSearchParams({
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    limit: '-1',
    fields: EVENT_FIELDS
  });
  const res = await fetch(`${url}/items/events?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export async function fetchEventBySlug(slug: string): Promise<EventItem | null> {
  const url = getDirectusUrl();
  const params = new URLSearchParams({
    'filter[slug][_eq]': slug,
    'filter[status][_eq]': 'published',
    limit: '1',
    fields: EVENT_FIELDS
  });
  const res = await fetch(`${url}/items/events?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.[0] || null;
}

/**
 * Resolve a translated string field on an event for a locale, falling back
 * to the base column on the event row.
 */
export function tEvent(ev: EventItem, field: keyof EventTranslation, locale: string): string {
  return getTranslatedField(ev, field as string, locale);
}

/**
 * Resolve a translated JSON array field (agenda, speakers, hosts, benefits, highlights).
 * Returns the locale translation if non-empty; otherwise falls back to the base column
 * (which mirrors vi).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tEventArray<T = any>(ev: EventItem, field: keyof EventTranslation, locale: string): T[] {
  const row = ev.translations?.find((t) => t.languages_code === locale);
  const val = row ? (row[field] as unknown) : null;
  if (Array.isArray(val) && val.length > 0) return val as T[];
  const base = (ev as unknown as Record<string, unknown>)[field as string];
  return (Array.isArray(base) ? base : []) as T[];
}

export interface EventListItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  date: string;
  time: string;
  location: string;
  locationName: string;
  price: string;
  registrationStatus: string;
}

export function mapEventToListItem(ev: EventItem, locale: string = 'vi'): EventListItem {
  return {
    id: ev.slug,
    slug: ev.slug,
    title: tEvent(ev, 'title', locale) || ev.title,
    summary: tEvent(ev, 'summary', locale) || ev.summary || '',
    image: ev.image,
    date: ev.date || '',
    time: ev.time || '',
    location: ev.location || '',
    locationName: tEvent(ev, 'location_name', locale) || ev.location_name || '',
    price: tEvent(ev, 'price', locale) || ev.price || '',
    registrationStatus: ev.registration_status || '',
  };
}

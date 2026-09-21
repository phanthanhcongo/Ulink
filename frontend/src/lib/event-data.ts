import { getDirectusUrl } from './directus-runtime.mjs';

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
}

export async function fetchEvents(): Promise<EventItem[]> {
  const url = getDirectusUrl();
  const params = new URLSearchParams({
    'filter[status][_eq]': 'published',
    sort: '-date_created',
    limit: '-1'
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
    limit: '1'
  });
  const res = await fetch(`${url}/items/events?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.[0] || null;
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

export function mapEventToListItem(ev: EventItem): EventListItem {
  return {
    id: ev.slug,
    slug: ev.slug,
    title: ev.title,
    summary: ev.summary || '',
    image: ev.image,
    date: ev.date || '',
    time: ev.time || '',
    location: ev.location || '',
    locationName: ev.location_name || '',
    price: ev.price || '',
    registrationStatus: ev.registration_status || '',
  };
}

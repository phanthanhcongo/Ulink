import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { getEventDetailBySlug } from '@/components/events/event-detail-data';
import { fetchEventBySlug, tEvent, tEventArray } from '@/lib/event-data';
import { EventSidebar } from '@/components/events/event-sidebar';
import { resolveImageUrl } from '@/lib/image-url';

const SPONSOR_LOGOS: Record<string, React.ReactNode> = {
  SHELLS: (
    <div className="flex items-center gap-2 text-slate-500 select-none">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6a6 6 0 0 1 6 6c0 1.5-.75 2.5-1.5 3s-1.5 1-2.5 1-2-.5-2.5-1.5S11 12 11 11" />
        <circle cx="12" cy="12" r="1" />
      </svg>
      <span className="font-sans font-bold text-body-regular tracking-tight uppercase">SHELLS</span>
    </div>
  ),
  SmartFinder: (
    <div className="flex items-center gap-2 text-slate-500 select-none">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 22 22 22" />
        <circle cx="12" cy="13" r="3" />
      </svg>
      <span className="font-sans font-bold text-body-regular tracking-tight">SmartFinder</span>
    </div>
  ),
  kontrastr: (
    <div className="flex items-center gap-2 text-slate-500 select-none">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9Z" />
        <path d="M12 3v18" />
        <path d="M12 7.5a4.5 4.5 0 0 1 0 9" fill="currentColor" opacity="0.3" />
      </svg>
      <span className="font-sans font-bold text-body-regular tracking-normal lowercase">kontrastr</span>
    </div>
  ),
  WAVESMARATHON: (
    <div className="flex items-center gap-1.5 text-slate-500 select-none">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="12" x2="4" y2="12" />
        <line x1="9" y1="8" x2="9" y2="16" />
        <line x1="14" y1="4" x2="14" y2="20" />
        <line x1="19" y1="10" x2="19" y2="14" />
      </svg>
      <span className="font-sans text-body-regular font-semibold tracking-tighter uppercase">
        WAVES<span className="font-black text-slate-600">MARATHON</span>
      </span>
    </div>
  )
};

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateMetadata({ params: { slug, locale } }: Props): Promise<Metadata> {
  const dbEvent = await fetchEventBySlug(slug);
  const fallback = getEventDetailBySlug(slug);

  if (!dbEvent && !fallback) {
    return { title: 'Sự kiện không tồn tại' };
  }

  const title = dbEvent ? (tEvent(dbEvent, 'title', locale) || dbEvent.title) : fallback!.title;
  const summary = dbEvent ? (tEvent(dbEvent, 'summary', locale) || dbEvent.summary || '') : fallback!.summary;

  return {
    title: `${title} | Chi tiết sự kiện`,
    description: summary
  };
}

const L = {
  overview: { vi: 'Tổng quan', en: 'Overview', ja: '概要' },
  schedule: { vi: 'Thời gian tổ chức', en: 'Schedule', ja: '開催日時' },
  venue: { vi: 'Địa điểm tổ chức', en: 'Venue', ja: '開催場所' },
  agenda: { vi: 'Agenda chương trình', en: 'Agenda', ja: 'アジェンダ' },
  benefits: { vi: 'Quyền lợi người tham gia', en: 'Participant Benefits', ja: '参加者特典' },
  speakers: { vi: 'Diễn giả', en: 'Speakers', ja: '登壇者' },
  hosts: { vi: 'Host / MC', en: 'Host', ja: '司会' },
  organizer: { vi: 'Đơn vị tổ chức', en: 'Organizer', ja: '主催者' },
  date: { vi: 'Ngày', en: 'Date', ja: '日付' },
  time: { vi: 'Thời gian', en: 'Time', ja: '時間' },
  address: { vi: 'Địa chỉ', en: 'Address', ja: '住所' }
} as const;

export default async function EventDetailPage({ params }: Props) {
  const { slug, locale } = params;
  setRequestLocale(locale);
  const l = (locale === 'en' || locale === 'ja' ? locale : 'vi') as 'vi' | 'en' | 'ja';

  const dbEvent = await fetchEventBySlug(slug);
  const hardcodedEvent = getEventDetailBySlug(slug);

  const event = dbEvent ? {
    slug: dbEvent.slug,
    title: tEvent(dbEvent, 'title', locale) || dbEvent.title,
    summary: tEvent(dbEvent, 'summary', locale) || dbEvent.summary || '',
    image: resolveImageUrl(dbEvent.image) || '/images/resources/autohtml/thumb16.png',
    images: dbEvent.image ? [resolveImageUrl(dbEvent.image) || '/images/resources/autohtml/thumb16.png'] : [],
    date: dbEvent.date || '',
    time: dbEvent.time || '',
    startTime: dbEvent.start_time || undefined,
    endTime: dbEvent.end_time || undefined,
    timezone: 'UTC+07:00',
    location: dbEvent.location || '',
    locationName: tEvent(dbEvent, 'location_name', locale) || dbEvent.location_name || undefined,
    address: tEvent(dbEvent, 'address', locale) || dbEvent.address || undefined,
    registrationStatus: dbEvent.registration_status || 'UPCOMING',
    price: tEvent(dbEvent, 'price', locale) || dbEvent.price || undefined,
    overview: tEvent(dbEvent, 'overview', locale) || dbEvent.overview || '',
    highlights: tEventArray<string>(dbEvent, 'highlights', locale),
    agenda: tEventArray<any>(dbEvent, 'agenda', locale),
    speakers: tEventArray<any>(dbEvent, 'speakers', locale),
    hosts: tEventArray<any>(dbEvent, 'hosts', locale),
    sponsors: dbEvent.sponsors || [],
    benefits: tEventArray<string>(dbEvent, 'benefits', locale),
    organizer: {
      name: tEvent(dbEvent, 'organizer_name', locale) || dbEvent.organizer_name || 'ULink Industries',
      description: tEvent(dbEvent, 'organizer_description', locale) || dbEvent.organizer_description || '',
      contact: dbEvent.organizer_contact || '',
      logo: dbEvent.organizer_logo || undefined,
      role: tEvent(dbEvent, 'organizer_role', locale) || dbEvent.organizer_role || undefined
    }
  } : hardcodedEvent;

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="page-container pt-3 sm:pt-4 md:pt-6">
        <Breadcrumb
          className="px-0 py-0 mx-0 max-w-none"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Resources', href: '/resources' },
            { label: 'Events', href: '/resources/events' },
            { label: event.title }
          ]}
        />
      </div>

      {/* Main Grid Section */}
      <section className="page-container pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-8 sm:pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 sm:gap-8 md:gap-10 items-start">

          {/* Left Content Column */}
          <div>
            {/* Banner Cover Image */}
            <div className="relative overflow-hidden rounded-[3px] border border-slate-100 aspect-[16/9] shadow-md bg-slate-50">
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Sponsor/Partner Logos Row */}
            {event.sponsors && event.sponsors.length > 0 && (
              <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap items-center justify-center sm:justify-around gap-3 sm:gap-4 md:gap-6 border border-slate-200 bg-slate-50/50 px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 rounded-[3px] shadow-sm select-none min-h-[60px] sm:min-h-[70px] md:h-[72px]">
                {event.sponsors.map((sponsor) => (
                  <div key={sponsor}>
                    {SPONSOR_LOGOS[sponsor] || (
                      <span className="text-xs sm:text-caption-responsive font-bold tracking-tight text-slate-400 uppercase">
                        {sponsor}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Overview Section */}
            <div className="mt-6 sm:mt-7 md:mt-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight text-left">{L.overview[l]}</h2>
              <div className="mt-3 sm:mt-4 text-slate-600 leading-relaxed text-xs sm:text-sm md:text-base text-justify whitespace-pre-line font-sans">
                {event.overview}
              </div>
            </div>

            {/* Thời gian tổ chức */}
            <div className="mt-6 sm:mt-8 md:mt-10 border-t border-slate-100 pt-6 sm:pt-7 md:pt-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight text-left">{L.schedule[l]}</h2>
              <div className="mt-3 sm:mt-4 text-slate-600 text-xs sm:text-sm md:text-base space-y-1.5 sm:space-y-2 font-sans">
                <p className="font-semibold text-slate-900">
                  {L.date[l]}: <span className="font-normal text-slate-600">{event.date}</span>
                </p>
                <p className="font-semibold text-slate-900">
                  {L.time[l]}: <span className="font-normal text-slate-600">{event.time} {event.timezone ? `(${event.timezone})` : ''}</span>
                </p>
              </div>
            </div>

            {/* Địa điểm tổ chức */}
            <div className="mt-6 sm:mt-8 md:mt-10 border-t border-slate-100 pt-6 sm:pt-7 md:pt-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight text-left">{L.venue[l]}</h2>
              <div className="mt-3 sm:mt-4 text-slate-600 text-xs sm:text-sm md:text-base space-y-1.5 sm:space-y-2 font-sans">
                <p className="font-bold text-slate-900">
                  {event.locationName || event.location}
                </p>
                {event.address && (
                  <p className="text-slate-500">
                    {L.address[l]}: {event.address}
                  </p>
                )}
              </div>
            </div>

            {/* Agenda Section */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="mt-6 sm:mt-8 md:mt-10 border-t border-slate-100 pt-6 sm:pt-7 md:pt-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight text-left">{L.agenda[l]}</h2>
                <div className="mt-4 sm:mt-5 md:mt-6 space-y-3 sm:space-y-4 font-sans">
                  {event.agenda.map((item, index) => (
                    <div
                      key={`${item.time}-${index}`}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-[3px] border border-slate-100 p-3 sm:p-4 bg-slate-50/50"
                    >
                      <div className="min-w-[70px] sm:min-w-[92px] text-xs sm:text-sm md:text-base font-bold text-sky-700">{item.time}</div>
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-sm md:text-base font-bold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-caption-responsive leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits Section */}
            {event.benefits && event.benefits.length > 0 && (
              <div className="mt-6 sm:mt-8 md:mt-10 border-t border-slate-100 pt-6 sm:pt-7 md:pt-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight text-left">{L.benefits[l]}</h2>
                <div className="mt-4 sm:mt-5 md:mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 font-sans">
                  {event.benefits.map((item) => (
                    <div
                      key={item}
                      className="rounded-[3px] border border-slate-100 bg-slate-50/50 p-3 sm:p-4 text-xs sm:text-caption-responsive leading-relaxed text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers Section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mt-6 sm:mt-8 md:mt-10 border-t border-slate-100 pt-6 sm:pt-7 md:pt-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight text-left">{L.speakers[l]}</h2>
                <div className="mt-4 sm:mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 font-sans">
                  {event.speakers.map((speaker) => (
                    <div
                      key={speaker.name}
                      className="flex flex-col items-center text-center p-4 sm:p-5 md:p-6 bg-white border border-slate-100 rounded-[3px] shadow-sm card-hover-standard"
                    >
                      <div className="relative h-16 sm:h-18 md:h-20 w-16 sm:w-18 md:w-20 overflow-hidden rounded-full bg-slate-100 border border-slate-100 shrink-0">
                        {speaker.avatar ? (
                          <Image
                            src={speaker.avatar}
                            alt={speaker.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-bold text-slate-400 bg-slate-200 text-sm md:text-base">
                            {speaker.name[0]}
                          </div>
                        )}
                      </div>
                      <h3 className="mt-2 sm:mt-3 md:mt-4 font-bold text-slate-900 text-xs sm:text-sm md:text-base line-clamp-2">{speaker.name}</h3>
                      <p className="mt-0.5 sm:mt-1 text-xs sm:text-caption-responsive text-sky-700 font-semibold leading-none line-clamp-1">{speaker.title}</p>
                      <p className="text-xs sm:text-caption-responsive text-slate-400 uppercase font-bold tracking-tight mt-0.5 sm:mt-1 line-clamp-1">{speaker.company}</p>
                      <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-caption-responsive text-slate-500 leading-relaxed text-center line-clamp-3">{speaker.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Host Section */}
            {event.hosts && event.hosts.length > 0 && (
              <div className="mt-6 sm:mt-8 md:mt-10 border-t border-slate-100 pt-6 sm:pt-7 md:pt-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight text-left">{L.hosts[l]}</h2>
                <div className="mt-4 sm:mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 font-sans">
                  {event.hosts.map((host) => (
                    <div
                      key={host.name}
                      className="flex flex-col items-center text-center p-4 sm:p-5 md:p-6 bg-white border border-slate-100 rounded-[3px] shadow-sm card-hover-standard"
                    >
                      <div className="relative h-16 sm:h-18 md:h-20 w-16 sm:w-18 md:w-20 overflow-hidden rounded-full bg-slate-100 border border-slate-100 shrink-0">
                        {host.avatar ? (
                          <Image
                            src={host.avatar}
                            alt={host.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-bold text-slate-400 bg-slate-200 text-sm md:text-base">
                            {host.name[0]}
                          </div>
                        )}
                      </div>
                      <h3 className="mt-2 sm:mt-3 md:mt-4 font-bold text-slate-900 text-xs sm:text-sm md:text-base line-clamp-2">{host.name}</h3>
                      <p className="mt-0.5 sm:mt-1 text-xs sm:text-caption-responsive text-sky-700 font-semibold leading-none line-clamp-1">{host.title}</p>
                      <p className="text-xs sm:text-caption-responsive text-slate-400 uppercase font-bold tracking-tight mt-0.5 sm:mt-1 line-clamp-1">{host.company}</p>
                      <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-caption-responsive text-slate-500 leading-relaxed text-center line-clamp-3">{host.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer Section */}
            <div className="mt-6 sm:mt-8 md:mt-10 border-t border-slate-100 pt-6 sm:pt-7 md:pt-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight text-left">{L.organizer[l]}</h2>
              <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 p-4 sm:p-5 md:p-6 border border-slate-100 rounded-[3px] bg-white shadow-xs items-start font-sans">
                <div className="relative h-20 sm:h-22 md:h-24 w-20 sm:w-22 md:w-24 overflow-hidden flex items-center justify-center shrink-0">
                  {event.organizer.logo ? (
                    <Image
                      src={event.organizer.logo}
                      alt={event.organizer.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="font-bold text-blue-600 text-xl">{event.organizer.name[0]}</div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">{event.organizer.name}</h3>
                  {event.organizer.role && (
                    <p className="text-xs sm:text-caption-responsive text-slate-400 font-semibold mt-0.5">{event.organizer.role}</p>
                  )}
                  <p className="mt-2 sm:mt-3 text-xs sm:text-caption-responsive text-slate-600 leading-relaxed">
                    {event.organizer.description}
                  </p>
                </div>
              </div>
            </div>



          </div>

          {/* Right Sticky Sidebar Column */}
          <aside className="lg:sticky lg:top-6">
            <EventSidebar
              title={event.title}
              slug={event.slug}
              organizerName={event.organizer.name}
              startTime={event.startTime}
              endTime={event.endTime}
              timezone={event.timezone}
              date={event.date}
              price={event.price}
              registrationStatus={event.registrationStatus}
            />
          </aside>

        </div>
      </section>
    </main>
  );
}

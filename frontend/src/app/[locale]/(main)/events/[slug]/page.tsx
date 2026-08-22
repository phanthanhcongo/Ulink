import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getEventDetailBySlug } from '@/components/events/event-detail-data';
import { EventSidebar } from '@/components/events/event-sidebar';

const SPONSOR_LOGOS: Record<string, React.ReactNode> = {
  SHELLS: (
    <div className="flex items-center gap-2 text-slate-500 select-none">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6a6 6 0 0 1 6 6c0 1.5-.75 2.5-1.5 3s-1.5 1-2.5 1-2-.5-2.5-1.5S11 12 11 11" />
        <circle cx="12" cy="12" r="1" />
      </svg>
      <span className="font-sans font-extrabold text-sm tracking-wider uppercase">SHELLS</span>
    </div>
  ),
  SmartFinder: (
    <div className="flex items-center gap-2 text-slate-500 select-none">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 22 22 22" />
        <circle cx="12" cy="13" r="3" />
      </svg>
      <span className="font-sans font-bold text-sm tracking-tight">SmartFinder</span>
    </div>
  ),
  kontrastr: (
    <div className="flex items-center gap-2 text-slate-500 select-none">
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9Z" />
        <path d="M12 3v18" />
        <path d="M12 7.5a4.5 4.5 0 0 1 0 9" fill="currentColor" opacity="0.3" />
      </svg>
      <span className="font-sans font-bold text-sm tracking-normal lowercase">kontrastr</span>
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
      <span className="font-sans text-sm font-semibold tracking-tighter uppercase">
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

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const event = getEventDetailBySlug(slug);

  if (!event) {
    return {
      title: 'Sự kiện không tồn tại'
    };
  }

  return {
    title: `${event.title} | Chi tiết sự kiện`,
    description: event.summary
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = params;
  setRequestLocale(params.locale);

  const event = getEventDetailBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">


      {/* Main Grid Section */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-10 items-start">

          {/* Left Content Column */}
          <div>
            {/* Banner Cover Image */}
            <div className="relative overflow-hidden rounded-[5px] border border-slate-100 aspect-[16/9] shadow-md bg-slate-50">
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
              <div className="mt-6 flex flex-wrap items-center justify-around gap-6 border border-slate-200 bg-slate-50/50 h-[72px] px-8 rounded-[5px] shadow-sm select-none">
                {event.sponsors.map((sponsor) => (
                  <div key={sponsor}>
                    {SPONSOR_LOGOS[sponsor] || (
                      <span className="text-xs sm:text-sm font-extrabold tracking-widest text-slate-400 uppercase">
                        {sponsor}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Overview Section */}
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">Overview</h2>
              <div className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base text-justify whitespace-pre-line font-sans">
                {event.overview}
              </div>
            </div>

            {/* Thời gian tổ chức */}
            <div className="mt-10 border-t border-slate-100 pt-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">Thời gian tổ chức</h2>
              <div className="mt-4 text-slate-600 text-sm sm:text-base space-y-2 font-sans">
                <p className="font-semibold text-slate-900">
                  Ngày: <span className="font-normal text-slate-600">{event.date}</span>
                </p>
                <p className="font-semibold text-slate-900">
                  Thời gian: <span className="font-normal text-slate-600">{event.time} {event.timezone ? `(${event.timezone})` : ''}</span>
                </p>
              </div>
            </div>

            {/* Địa điểm tổ chức */}
            <div className="mt-10 border-t border-slate-100 pt-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">Địa điểm tổ chức</h2>
              <div className="mt-4 text-slate-600 text-sm sm:text-base space-y-2 font-sans">
                <p className="font-bold text-slate-900">
                  {event.locationName || event.location}
                </p>
                {event.address && (
                  <p className="text-slate-500">
                    Địa chỉ: {event.address}
                  </p>
                )}
              </div>
            </div>

            {/* Agenda Section */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="mt-10 border-t border-slate-100 pt-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">Agenda chương trình</h2>
                <div className="mt-6 space-y-4 font-sans">
                  {event.agenda.map((item, index) => (
                    <div
                      key={`${item.time}-${index}`}
                      className="flex gap-4 rounded-[5px] border border-slate-100 p-4 bg-slate-50/50"
                    >
                      <div className="min-w-[92px] text-sm font-bold text-sky-700">{item.time}</div>
                      <div className="flex-1">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-500">
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
              <div className="mt-10 border-t border-slate-100 pt-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">Quyền lợi người tham gia</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 font-sans">
                  {event.benefits.map((item) => (
                    <div
                      key={item}
                      className="rounded-[5px] border border-slate-100 bg-slate-50/50 p-4 text-xs sm:text-sm leading-relaxed text-slate-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers Section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mt-10 border-t border-slate-100 pt-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">Speakers</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                  {event.speakers.map((speaker) => (
                    <div
                      key={speaker.name}
                      className="flex flex-col items-center text-center p-6 bg-white border border-slate-100 rounded-[5px] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-100 border border-slate-100">
                        {speaker.avatar ? (
                          <Image
                            src={speaker.avatar}
                            alt={speaker.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-bold text-slate-400 bg-slate-200">
                            {speaker.name[0]}
                          </div>
                        )}
                      </div>
                      <h3 className="mt-4 font-bold text-slate-900 text-sm sm:text-base">{speaker.name}</h3>
                      <p className="mt-1 text-xs text-sky-700 font-semibold leading-none">{speaker.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">{speaker.company}</p>
                      <p className="mt-4 text-xs text-slate-500 leading-relaxed text-justify">{speaker.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Host Section */}
            {event.hosts && event.hosts.length > 0 && (
              <div className="mt-10 border-t border-slate-100 pt-8">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">Host</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                  {event.hosts.map((host) => (
                    <div
                      key={host.name}
                      className="flex flex-col items-center text-center p-6 bg-white border border-slate-100 rounded-[5px] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-100 border border-slate-100">
                        {host.avatar ? (
                          <Image
                            src={host.avatar}
                            alt={host.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-bold text-slate-400 bg-slate-200">
                            {host.name[0]}
                          </div>
                        )}
                      </div>
                      <h3 className="mt-4 font-bold text-slate-900 text-sm sm:text-base">{host.name}</h3>
                      <p className="mt-1 text-xs text-sky-700 font-semibold leading-none">{host.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">{host.company}</p>
                      <p className="mt-4 text-xs text-slate-500 leading-relaxed text-justify">{host.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer Section */}
            <div className="mt-10 border-t border-slate-100 pt-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left">Organizer</h2>
              <div className="mt-6 flex flex-col sm:flex-row gap-6 p-6 border border-slate-100 rounded-[5px] bg-white shadow-xs items-start font-sans">
                <div className="relative h-24 w-24 overflow-hidden  flex items-center justify-center">
                  {event.organizer.logo ? (
                    <Image
                      src={event.organizer.logo}
                      alt={event.organizer.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="font-extrabold text-blue-600">{event.organizer.name[0]}</div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{event.organizer.name}</h3>
                  {event.organizer.role && (
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{event.organizer.role}</p>
                  )}
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
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

import { getTranslations } from 'next-intl/server';

interface BenefitItem {
  id: number;
  icon: React.ReactNode;
  titleKey: string;
}

export default async function HubBenefits() {
  const t = await getTranslations('regionalHubs');

  const items: BenefitItem[] = [
    {
      id: 1,
      titleKey: 'hubBenefits.feat1',
      icon: (
        <svg className="h-9 w-9 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    },
    {
      id: 2,
      titleKey: 'hubBenefits.feat2',
      icon: (
        <svg className="h-9 w-9 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="4" height="4" />
          <rect x="10" y="3" width="4" height="4" />
          <rect x="17" y="3" width="4" height="4" />
          <rect x="3" y="10" width="4" height="4" />
          <rect x="10" y="10" width="4" height="4" />
          <rect x="17" y="10" width="4" height="4" />
          <rect x="3" y="17" width="4" height="4" />
          <rect x="10" y="17" width="4" height="4" />
          <rect x="17" y="17" width="4" height="4" />
        </svg>
      )
    },
    {
      id: 3,
      titleKey: 'hubBenefits.feat3',
      icon: (
        <svg className="h-9 w-9 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="9" x2="11" y2="9" />
          <line x1="4" y1="13" x2="11" y2="13" />
          <path d="M18.5 5.5H15.5A2.5 2.5 0 0 0 13 8v0a2.5 2.5 0 0 0 2.5 2.5h3A2.5 2.5 0 0 1 21 13v0a2.5 2.5 0 0 1-2.5 2.5h-3" />
          <line x1="17" y1="3" x2="17" y2="18" />
        </svg>
      )
    },
    {
      id: 4,
      titleKey: 'hubBenefits.feat4',
      icon: (
        <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none">
          <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.21 13.89L7 21l5-2.5 5 2.5-1.21-7.12" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.5 5.5l.6 1.2 1.3.2-1 1 .2 1.3-1.1-.7-1.1.7.2-1.3-1-1 1.3-.2z" fill="#facc15" stroke="#facc15" strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 5,
      titleKey: 'hubBenefits.feat5',
      icon: (
        <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" stroke="#0d9488" strokeWidth="2" />
          <path d="M14 9.5l-3.5 3.5M9.5 14.5l1-1M8.5 13.5l1-1" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-white pt-20 pb-20 border-t border-slate-100">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-12 md:px-16 lg:px-20 flex flex-col items-center gap-16">
        
        {/* Header */}
        <div className="text-center max-w-[900px] w-full">
          <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-brand block mb-3">
            {t('hubBenefits.eyebrow')}
          </span>
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-extrabold text-[#0F2942] leading-tight max-w-[850px] mx-auto">
            {t('hubBenefits.title')}
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 xl:gap-x-8 w-full">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center px-2 group">
              {/* Icon */}
              <div className="flex items-center justify-center mb-4 h-12 w-12 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              {/* Title */}
              <h3 className="font-medium text-slate-800 text-[13px] sm:text-[14px] leading-snug max-w-[180px]">
                {t(item.titleKey as any)}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

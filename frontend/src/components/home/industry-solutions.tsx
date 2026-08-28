'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from './section-header';

export function IndustrySolutions() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      title: t('industries.card1Title'),
      desc: t('industries.card1Desc'),
      href: '/industries/electronics',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      icon: (
        <svg className="h-6 w-6 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      )
    },
    {
      title: t('industries.card2Title'),
      desc: t('industries.card2Desc'),
      href: '/industries/food-beverage',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      icon: (
        <svg className="h-6 w-6 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M9 2v4M6 2v4M17 2v11h3V2c0-1.1-.9-2-2-2h-1zM19 13v9h-2v-9" />
        </svg>
      )
    },
    {
      title: t('industries.card3Title'),
      desc: t('industries.card3Desc'),
      href: '/industries/logistics',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      icon: (
        <svg className="h-6 w-6 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    },
    {
      title: t('industries.card4Title'),
      desc: t('industries.card4Desc'),
      href: '/industries/pharma-medical',
      bgColor: 'bg-red-50',
      textColor: 'text-red-500',
      icon: (
        <svg className="h-6 w-6 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      title: t('industries.card5Title'),
      desc: t('industries.card5Desc'),
      href: '/industries/furniture-wood',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      icon: (
        <svg className="h-6 w-6 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path d="M9 22V12h6v10" />
        </svg>
      )
    },
    {
      title: t('industries.card6Title'),
      desc: t('industries.card6Desc'),
      href: '/industries/construction-hvac',
      bgColor: 'bg-slate-100',
      textColor: 'text-slate-600',
      icon: (
        <svg className="h-6 w-6 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      )
    }
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12 xl:px-16 lg:py-10 xl:py-12 overflow-hidden">
      {/* ── SECTION HEADER BAR ── */}
      <SectionHeader
        title={t('industries.sectionTitle')}
        subtitle={t('industries.sectionSubTitle')}
      />

      <div
        ref={ref}
        className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6"
      >
        {cards.map((card, idx) => (
          <Link
            key={idx}
            href={card.href}
            className={`group relative flex items-center gap-2.5 sm:gap-3.5 rounded-[3px] border border-slate-200 bg-white p-3 sm:p-4 shadow-xs transition-all duration-300 hover:z-10 hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-md hover:scale-[1.01] ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
            {/* Left Circle Icon */}
            <div
              className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center shrink-0 ${card.bgColor} ${card.textColor}`}
            >
              {card.icon}
            </div>

            {/* Right Text Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[12px] sm:text-[14px] md:text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                {card.title}
              </h4>
              <p className="text-[10px] sm:text-[11.5px] text-slate-500 font-medium leading-snug mt-1 line-clamp-2">
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

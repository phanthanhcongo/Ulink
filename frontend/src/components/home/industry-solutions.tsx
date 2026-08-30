'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
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
      iconSrc: '/images/icons/figma/icon-i-n-t-2-vectorized0.svg'
    },
    {
      title: t('industries.card2Title'),
      desc: t('industries.card2Desc'),
      href: '/industries/food-beverage',
      iconSrc: '/images/icons/figma/icon-th-c-ph-m-1-vectorized0.svg'
    },
    {
      title: t('industries.card3Title'),
      desc: t('industries.card3Desc'),
      href: '/industries/logistics',
      iconSrc: '/images/icons/figma/iocn-logistics-2-vectorized0.svg'
    },
    {
      title: t('industries.card4Title'),
      desc: t('industries.card4Desc'),
      href: '/industries/pharma-medical',
      iconSrc: '/images/icons/figma/iocn-pharmacity-1-vectorized0.svg'
    },
    {
      title: t('industries.card5Title'),
      desc: t('industries.card5Desc'),
      href: '/industries/furniture-wood',
      iconSrc: '/images/icons/figma/icon-n-i-th-t-2-vectorized0.svg'
    },
    {
      title: t('industries.card6Title'),
      desc: t('industries.card6Desc'),
      href: '/industries/construction-hvac',
      iconSrc: '/images/icons/figma/iocn-x-y-d-ng-1-vectorized0.svg'
    }
  ];

  const desktopCards = [
    {
      title: t('industries.card1Title'),
      desc: t('industries.card1Desc'),
      href: '/industries/electronics',
      iconSrc: '/images/icons/figma/icon-i-n-t-2-vectorized0.svg'
    },
    {
      title: t('industries.card2Title'),
      desc: t('industries.card2Desc'),
      href: '/industries/food-beverage',
      iconSrc: '/images/icons/figma/icon-th-c-ph-m-1-vectorized0.svg'
    },
    {
      title: t('industries.card3Title'),
      desc: t('industries.card3Desc'),
      href: '/industries/logistics',
      iconSrc: '/images/icons/figma/iocn-logistics-2-vectorized0.svg'
    },
    {
      title: t('industries.card4Title'),
      desc: t('industries.card4Desc'),
      href: '/industries/pharma-medical',
      iconSrc: '/images/icons/figma/iocn-pharmacity-1-vectorized0.svg'
    },
    {
      title: t('industries.card5Title'),
      desc: t('industries.card5Desc'),
      href: '/industries/furniture-wood',
      iconSrc: '/images/icons/figma/icon-n-i-th-t-2-vectorized0.svg'
    },
    {
      title: t('industries.card6Title'),
      desc: t('industries.card6Desc'),
      href: '/industries/construction-hvac',
      iconSrc: '/images/icons/figma/iocn-x-y-d-ng-1-vectorized0.svg'
    }
  ];

  return (
    <div ref={ref}>
      {/* ── 1. MOBILE VIEW (Visible below md: < 768px) ── */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 md:hidden overflow-hidden">
        {/* ── SECTION HEADER BAR ── */}
        <SectionHeader
          title={t('industries.sectionTitle')}
          subtitle={t('industries.sectionSubTitle')}
        />

        <div
          className="mt-8 grid grid-cols-2 gap-3"
        >
          {cards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className={`group relative flex items-center gap-2.5 sm:gap-3.5 rounded-[2px] border border-slate-200 bg-white p-3 sm:p-4 shadow-xs transition-all duration-300 hover:z-10 hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-md hover:scale-[1.01] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Left Icon (No background) */}
              <div
                className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center shrink-0"
              >
                <div className="relative h-7 w-7">
                  <Image
                    src={card.iconSrc}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right Text Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                  {card.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-normal leading-snug mt-1">
                  {card.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 2. DESKTOP & IPAD VIEW (Visible on md and up: >= 768px) ── */}
      <section className="hidden md:block mx-auto w-full max-w-[1440px] px-6 py-10 md:px-8 md:py-12 lg:px-12 xl:px-16 lg:py-16 xl:py-20 overflow-hidden">
        {/* ── SECTION HEADER BAR ── */}
        <SectionHeader
          title={t('industries.sectionTitle')}
          subtitle={t('industries.sectionSubTitle')}
        />

        <div className="mt-8 md:mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {desktopCards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className={`group flex flex-col justify-between min-h-[190px] md:min-h-[200px] lg:min-h-[220px] bg-white border border-slate-200 lg:border-slate-100 rounded-[2px] p-5 md:p-6 lg:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-blue-500/30 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Top Text Content */}
              <div>
                <h4 className="text-[15px] md:text-[18px] lg:text-[18px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug md:leading-[28px] lg:leading-[28px]">
                  {card.title}
                </h4>
                <p className="text-[11.5px] md:text-[14px] lg:text-[14px] text-slate-500 font-normal leading-relaxed md:leading-[20px] lg:leading-[20px] mt-2">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Icon & Arrow */}
              <div className="flex items-end justify-between mt-4 md:mt-6">
                <div className="relative h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 flex items-center justify-center shrink-0">
                  <Image
                    src={card.iconSrc}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-blue-600/80 group-hover:text-blue-600 transition-colors">
                  <svg
                    className="h-5 w-5 md:h-6 md:w-6 lg:h-6.5 lg:w-6.5 stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

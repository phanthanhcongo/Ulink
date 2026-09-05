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
    <div ref={ref} className="bg-[#f4f7fb] w-full">
      {/* ── 1. MOBILE VIEW (Visible below md: < 768px) ── */}
      <section className="page-container overflow-hidden py-8 md:hidden">
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
              className={`group relative flex flex-col gap-2 rounded-[4px] p-3.5 sm:p-4 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.08)] transition-all duration-300 hover:z-10 card-hover-standard ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              style={{
                border: '1px solid #CBD5E1',
                background: 'linear-gradient(0deg, #FFF 0%, #FFF 100%), #FFF',
                transitionDelay: `${idx * 80}ms`
              }}
            >
              {/* Icon Row (w-full) */}
              <div
                className="w-full flex items-start"
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

              {/* Text Row (w-full) */}
              <div className="w-full">
                <h4 className="text-body-large font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                  {card.title}
                </h4>
                <p className="text-caption-responsive text-slate-600 font-normal leading-snug mt-1">
                  {card.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 2. DESKTOP & IPAD VIEW (Visible on md and up: >= 768px) ── */}
      <section className="page-container hidden overflow-hidden py-8 md:block">
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
              className={`group flex flex-col justify-between min-h-[190px] md:min-h-[200px] lg:min-h-[220px] rounded-[4px] p-5 md:p-6 lg:p-8 shadow-[0_4px_16px_-2px_rgba(15,23,42,0.08)] transition-all duration-300 card-hover-standard ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              style={{
                border: '1px solid #CBD5E1',
                background: 'linear-gradient(0deg, #FFF 0%, #FFF 100%), #FFF',
                transitionDelay: `${idx * 80}ms`
              }}
            >
              {/* Top Text Content */}
              <div>
                <h4 className="text-body-large font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {card.title}
                </h4>
                <p className="text-caption-responsive text-slate-600 font-normal leading-relaxed mt-2">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Icon & Arrow */}
              <div className="flex items-end justify-between mt-4 md:mt-6">
                <div className="relative h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
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

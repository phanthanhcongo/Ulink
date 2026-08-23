'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
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
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      title: t('industries.card1Title'),
      desc: t('industries.card1Desc'),
      iconSrc: ASSETS.home.indElectronics,
      href: '/industries/electronics'
    },
    {
      title: t('industries.card2Title'),
      desc: t('industries.card2Desc'),
      iconSrc: ASSETS.home.indFood,
      href: '/industries/food-beverage'
    },
    {
      title: t('industries.card3Title'),
      desc: t('industries.card3Desc'),
      iconSrc: ASSETS.home.indLogistics,
      href: '/industries/logistics'
    },
    {
      title: t('industries.card4Title'),
      desc: t('industries.card4Desc'),
      iconSrc: ASSETS.home.indPharma,
      href: '/industries/pharma-medical'
    },
    {
      title: t('industries.card5Title'),
      desc: t('industries.card5Desc'),
      iconSrc: ASSETS.home.indFurniture,
      href: '/industries/furniture-wood'
    },
    {
      title: t('industries.card6Title'),
      desc: t('industries.card6Desc'),
      iconSrc: ASSETS.home.indConstruction,
      href: '/industries/construction-hvac'
    }
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12 xl:px-16 lg:py-10 xl:py-12">
      {/* ── SECTION HEADER BAR ── */}
      <SectionHeader
        title={t('industries.sectionTitle')}
        subtitle={t('industries.sectionSubTitle')}

      />

      {/* ── LƯỚI 6 THẺ NGÀNH NGHỀ (GRID 6 CARDS: 3 COLUMNS x 2 ROWS) ── */}
      <div ref={ref} className="mt-8 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => (
          <Link
            key={idx}
            href={card.href}
            className={`group flex flex-col justify-between rounded-[3px] border border-border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] sm:p-6 lg:p-6 xl:p-7 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
            <div>
              <h3 className="text-[16px] font-bold text-primary transition-colors group-hover:text-brand sm:text-[18px] lg:text-[18px] xl:text-[20px]">
                {card.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground sm:text-[14px] lg:text-[13.5px] xl:text-[14.5px]">
                {card.desc}
              </p>
            </div>

            {/* Bottom Row: Left 60x60 PNG Icon & Right Up-Arrow */}
            <div className="mt-8 flex items-end justify-between pt-2">
              <div className="relative flex h-[50px] w-[50px] lg:h-[52px] lg:w-[52px] xl:h-[60px] xl:w-[60px] shrink-0 items-center justify-center">
                <Image
                  src={card.iconSrc}
                  alt="Industry Icon"
                  width={60}
                  height={60}
                  className="h-[50px] w-[50px] lg:h-[52px] lg:w-[52px] xl:h-[60px] xl:w-[60px] object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <ArrowUpRight
                className="h-6 w-6 lg:h-6 lg:w-6 xl:h-7 xl:w-7 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

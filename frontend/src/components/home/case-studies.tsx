'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { SectionHeader } from './section-header';
import { CaseStudyCard } from './case-study-card';

export function CaseStudies() {
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

  const cardImages: Record<number, string> = {
    1: ASSETS.home.case1Banner,
    2: ASSETS.home.case2Banner,
    3: ASSETS.home.case3Banner,
    4: ASSETS.home.case4Banner
  };

  const cardAvatars: Record<number, string> = {
    1: ASSETS.home.avatar1,
    2: ASSETS.home.avatar2,
    3: ASSETS.home.avatar3,
    4: ASSETS.home.avatar4
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12 xl:px-16 lg:py-12 xl:py-16">
      {/* ── SECTION HEADER BAR ── */}
      <SectionHeader
        title={t('caseStudy.sectionTitle')}
        subtitle={t('caseStudy.sectionSubTitle')}
      />

      {/* ── 4 CASE STUDY CARDS GRID ── */}
      <div ref={ref} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`transition-all duration-500 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: `${(num - 1) * 100}ms` }}
          >
            <CaseStudyCard
              num={num}
              category={t(`caseStudy.card${num}Category` as any)}
              title={t(`caseStudy.card${num}Title` as any)}
              description={t(`caseStudy.card${num}Desc` as any)}
              image={cardImages[num] || ASSETS.home.solutionPackaging}
              avatar={cardAvatars[num]}
              authorName={t(`caseStudy.card${num}AuthorName` as any)}
              authorRole={t(`caseStudy.card${num}AuthorRole` as any)}
              readMoreText={t('caseStudy.readMore')}
            />
          </div>
        ))}
      </div>

      {/* ── BOTTOM VIEW ALL BUTTON ── */}
      <div className="mt-10 flex justify-center sm:mt-12">
        <Link
          href="/resources"
          className="inline-flex items-center justify-center rounded-[3px] bg-brand px-8 py-3 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-brand-strong hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] active:scale-95"
        >
          {t('caseStudy.viewAll')}
        </Link>
      </div>
    </section>
  );
}

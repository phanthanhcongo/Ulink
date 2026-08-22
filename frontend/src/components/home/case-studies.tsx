import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { SectionHeader } from './section-header';
import { CaseStudyCard } from './case-study-card';

export async function CaseStudies() {
  const t = await getTranslations('home');

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
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6">
        {[1, 2, 3, 4].map((num) => (
          <CaseStudyCard
            key={num}
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
        ))}
      </div>

      {/* ── BOTTOM VIEW ALL BUTTON ── */}
      <div className="mt-10 flex justify-center sm:mt-12">
        <Link
          href="/resources"
          className="inline-flex items-center justify-center rounded-lg bg-brand px-8 py-3 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-brand-strong hover:shadow-md"
        >
          {t('caseStudy.viewAll')}
        </Link>
      </div>
    </section>
  );
}

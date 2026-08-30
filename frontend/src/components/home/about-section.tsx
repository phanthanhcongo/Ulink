import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Check, Cpu, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { SectionHeader } from './section-header';

export async function AboutSection() {
  const t = await getTranslations('home');

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12 xl:px-16 lg:py-10 xl:py-12">
      {/* ── SECTION HEADER BAR ── */}
      <SectionHeader
        title={t('about.sectionTitle')}
        subtitle={t('about.sectionSubTitle')}
      />

      {/* ── 2 COLUMNS CONTENT GRID ── */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        {/* Left Column: Factory Building Photo with Floating Caption Card */}
        <div className="ui-card-hover relative w-full aspect-[16/11] lg:aspect-auto lg:h-full lg:col-span-6 overflow-hidden rounded-[3px] border border-[#E5E7EB]">
          <Image
            src={ASSETS.home.companyFactory}
            alt="ULINK Industries Ha Nam Factory Hub"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Floating Photo Caption Card (535x73px style) */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col items-start gap-1 bg-white/90 p-3 rounded-[3px] opacity-[0.8] backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-[12px] sm:text-[14px] lg:text-[14px] font-bold text-slate-700 leading-normal">
              {t('about.captionHub')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[12px] lg:text-[12px] font-bold bg-blue-50 text-blue-600 border border-blue-100/50">
              {t('about.captionStatus')}
            </span>
          </div>
        </div>

        {/* Right Column: Text Content & 4 Key Metric Items */}
        <div className="flex flex-col lg:col-span-6 justify-between bg-white border border-[#E5E7EB] p-6 rounded-[3px] gap-10">
          <div>
            <h3 className="text-[18px] font-bold leading-tight text-primary transition-colors duration-300 group-hover:text-brand sm:text-[24px] md:text-[24px] sm:leading-[32px] lg:text-[24px]">
              {t('about.mainTitle')}
            </h3>

            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground sm:text-[16px] sm:font-normal sm:leading-[26px] lg:text-[16px] xl:text-[16px] lg:leading-[26px]">
              {t('about.mainDesc')}
            </p>

            <div className="my-6 border-b border-border" />

            {/* Bullet Points */}
            <ul className="space-y-4 text-[13px] text-foreground sm:text-[13px] lg:text-[13px] xl:text-[14px] lg:leading-[22px]">
              <li className="flex items-center gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand dark:bg-blue-950/50 dark:text-blue-400">
                  <Check className="h-4.5 w-4.5" />
                </div>
                <span className="font-medium text-slate-700">{t('about.bullet1')}</span>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand dark:bg-blue-950/50 dark:text-blue-400">
                  <Cpu className="h-4.5 w-4.5" />
                </div>
                <span className="font-medium text-slate-700">{t('about.bullet2')}</span>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand dark:bg-blue-950/50 dark:text-blue-400">
                  <Users className="h-4.5 w-4.5" />
                </div>
                <span className="font-medium text-slate-700">{t('about.bullet3')}</span>
              </li>
            </ul>
          </div>

          {/* 4 Metric Items Grid with radius/xs (rounded-[3px]) cards */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-6 sm:grid-cols-4">
            {/* Metric 1 */}
            <div className="ui-card-hover flex flex-col items-start bg-slate-50 border border-slate-100 p-3 rounded-[3px] hover:border-slate-200 gap-2 justify-between w-full min-h-[76px]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-blue-50/80">
                <Image
                  src={ASSETS.home.iconSlack}
                  alt="Experience"
                  width={20}
                  height={20}
                  className="h-4.5 w-4.5 object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-[11px] font-semibold text-slate-800 lg:text-[13px] xl:text-[13px] whitespace-nowrap leading-none sm:leading-[15px]">
                {t('about.metric1')}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="ui-card-hover flex flex-col items-start bg-slate-50 border border-slate-100 p-3 rounded-[3px] hover:border-slate-200 gap-2 justify-between w-full min-h-[76px]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-blue-50/80">
                <Image
                  src={ASSETS.home.iconShield}
                  alt="Quality"
                  width={20}
                  height={20}
                  className="h-4.5 w-4.5 object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-[11px] font-semibold text-slate-800 lg:text-[13px] xl:text-[13px] whitespace-nowrap leading-none sm:leading-[15px]">
                {t('about.metric2')}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="ui-card-hover flex flex-col items-start bg-slate-50 border border-slate-100 p-3 rounded-[3px] hover:border-slate-200 gap-2 justify-between w-full min-h-[76px]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-blue-50/80">
                <Image
                  src={ASSETS.home.iconTag}
                  alt="SKU Count"
                  width={20}
                  height={20}
                  className="h-4.5 w-4.5 object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-[11px] font-semibold text-slate-800 lg:text-[13px] xl:text-[13px] whitespace-nowrap leading-none sm:leading-[15px]">
                {t('about.metric3')}
              </span>
            </div>

            {/* Metric 4 */}
            <div className="ui-card-hover flex flex-col items-start bg-slate-50 border border-slate-100 p-3 rounded-[3px] hover:border-slate-200 gap-2 justify-between w-full min-h-[76px]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-blue-50/80">
                <Image
                  src={ASSETS.home.iconTruck}
                  alt="Fast Delivery"
                  width={20}
                  height={20}
                  className="h-4.5 w-4.5 object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-[11px] font-semibold text-slate-800 lg:text-[13px] xl:text-[13px] whitespace-nowrap leading-none sm:leading-[15px]">
                {t('about.metric4')}
              </span>
            </div>
          </div>
           {/* ── BOTTOM LEFT ACTION BUTTON ── */}
      <div className="mt-6 flex justify-start">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-[3px] bg-brand px-5 py-2.5 text-sm lg:text-[14px] font-semibold text-white transition-all hover:bg-brand-strong"
        >
          Tìm hiểu thêm
        </Link>
      </div>
        </div>
      </div>

     
    </section>
  );
}

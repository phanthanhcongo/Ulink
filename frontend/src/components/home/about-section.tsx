import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Check, Cpu, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { SectionHeader } from './section-header';

export async function AboutSection() {
  const t = await getTranslations('home');

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12 xl:px-16 lg:py-8 xl:py-8">
      {/* ── SECTION HEADER BAR ── */}
      <SectionHeader
        title={t('about.sectionTitle')}
        subtitle={t('about.sectionSubTitle')}
      />

      {/* ── 2 COLUMNS CONTENT GRID ── */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-5 xl:gap-6">
        {/* Left Column: Factory Building Photo with Floating Caption Card */}
        <div className="group ui-card-hover relative w-full aspect-[1.18/1] lg:aspect-auto lg:h-full lg:col-span-6 overflow-hidden rounded-[3px] border border-[#E5E7EB]">
          <Image
            src={ASSETS.home.companyFactory}
            alt="ULINK Industries Ha Nam Factory Hub"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Floating Photo Caption Card (535x73px style) */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col items-start gap-1 bg-white/95 border border-slate-200/90 p-3 rounded-[3px] opacity-95 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 shadow-sm">
            <span className="text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-bold text-slate-900 leading-normal">
              {t('about.captionHub')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
              {t('about.captionStatus')}
            </span>
          </div>
        </div>

        {/* Right Column: Text Content & 4 Key Metric Items */}
        <div className="group ui-card-hover flex flex-col lg:col-span-6 justify-between bg-white border border-slate-200 shadow-[0_4px_16px_rgba(15,23,42,0.06)] p-4 sm:p-6 lg:p-6 xl:p-7 rounded-[3px] gap-8">
          <div>
            <h3 className="text-[16px] font-bold leading-[24px] text-primary transition-colors duration-300 group-hover:text-brand sm:text-[18px] sm:leading-[26px] lg:text-[20px] lg:leading-[28px] xl:text-[24px] xl:leading-[32px]">
              {t('about.mainTitle')}
            </h3>

            <p className="mt-4 text-[13px] leading-[20px] text-slate-600 font-medium sm:text-[14px] sm:leading-[22px] lg:text-[15px] lg:leading-[24px] xl:text-[16px] xl:leading-[26px]">
              {t('about.mainDesc')}
            </p>

            <div className="my-6 border-b border-slate-200" />

            {/* Bullet Points */}
            <ul className="space-y-4 text-[11px] font-medium leading-[16px] text-foreground sm:text-[12px] sm:leading-[18px] lg:text-[13px] lg:leading-[20px] xl:text-[14px] xl:leading-[22px]">
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
          <div className="mt-6 grid grid-cols-2 gap-1.5 sm:gap-2 lg:gap-2 lg:mt-4 sm:grid-cols-4 w-full">
            {/* Metric 1 */}
            <div className="ui-card-hover flex flex-col items-start bg-slate-50/80 border border-slate-200 p-2.5 sm:p-3 rounded-[3px] hover:border-brand/60 gap-2 justify-between w-full min-h-[76px]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-blue-50">
                <Image
                  src={ASSETS.home.iconSlack}
                  alt="Experience"
                  width={20}
                  height={20}
                  className="h-4.5 w-4.5 object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-[11px] font-semibold text-slate-800 lg:text-[12px] xl:text-[13px] whitespace-nowrap leading-none sm:leading-[15px]">
                {t('about.metric1')}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="ui-card-hover flex flex-col items-start bg-slate-50/80 border border-slate-200 p-2.5 sm:p-3 rounded-[3px] hover:border-brand/60 gap-2 justify-between w-full min-h-[76px]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-blue-50">
                <Image
                  src={ASSETS.home.iconShield}
                  alt="Quality"
                  width={20}
                  height={20}
                  className="h-4.5 w-4.5 object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-[11px] font-semibold text-slate-800 lg:text-[12px] xl:text-[13px] whitespace-nowrap leading-none sm:leading-[15px]">
                {t('about.metric2')}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="ui-card-hover flex flex-col items-start bg-slate-50/80 border border-slate-200 p-2.5 sm:p-3 rounded-[3px] hover:border-brand/60 gap-2 justify-between w-full min-h-[76px]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-blue-50">
                <Image
                  src={ASSETS.home.iconTag}
                  alt="SKU Count"
                  width={20}
                  height={20}
                  className="h-4.5 w-4.5 object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-[11px] font-semibold text-slate-800 lg:text-[12px] xl:text-[13px] whitespace-nowrap leading-none sm:leading-[15px]">
                {t('about.metric3')}
              </span>
            </div>

            {/* Metric 4 */}
            <div className="ui-card-hover flex flex-col items-start bg-slate-50/80 border border-slate-200 p-2.5 sm:p-3 rounded-[3px] hover:border-brand/60 gap-2 justify-between w-full min-h-[76px]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-blue-50">
                <Image
                  src={ASSETS.home.iconTruck}
                  alt="Fast Delivery"
                  width={20}
                  height={20}
                  className="h-4.5 w-4.5 object-contain"
                />
              </div>
              <span className="text-[11px] sm:text-[11px] font-semibold text-slate-800 lg:text-[12px] xl:text-[13px] whitespace-nowrap leading-none sm:leading-[15px]">
                {t('about.metric4')}
              </span>
            </div>
          </div>
          {/* ── BOTTOM LEFT ACTION BUTTON ── */}
          <div className="mt-6 flex justify-start">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-[3px] bg-brand px-5 py-2.5 text-[11px] sm:text-[12px] lg:text-[13px] xl:text-[14px] font-semibold text-white transition-all hover:bg-brand-strong"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </div>


    </section>
  );
}

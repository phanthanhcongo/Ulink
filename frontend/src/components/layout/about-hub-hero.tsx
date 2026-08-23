import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';

export async function AboutHubHero() {
  const t = await getTranslations('aboutHub.hero');

  return (
    <section className="relative overflow-hidden rounded-[3px] border border-border bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Left: text */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-8 sm:px-8 lg:w-[46%] lg:py-10">
          <p className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-primary">{t('eyebrow')}</p>

          <h1 className="mt-3 text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold leading-[1.25]">
            <span className="block text-primary">{t('titleLine1')}</span>
            <span className="block text-primary">{t('titleLine2')}</span>
          </h1>

          <p className="mt-5 max-w-[420px] text-[13px] sm:text-[14px] leading-relaxed text-foreground/70">
            {t('intro')}
          </p>

          <p className="mt-4 max-w-[420px] text-[13px] sm:text-[14px] leading-relaxed font-bold text-foreground/80">
            {t('commitment')}
          </p>
        </div>

        {/* Right: warehouse photo */}
        <div className="relative h-[220px] w-full sm:h-[280px] lg:h-auto lg:flex-1">
          <Image
            src={ASSETS.about.heroWarehouse}
            alt="Trung tâm phân phối Hà Nam — ULink Industries"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />
          {/* Soft fade into the offwhite panel on the left edge (desktop) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-background to-transparent lg:block" />
        </div>
      </div>
    </section>
  );
}




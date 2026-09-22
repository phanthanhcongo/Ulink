import Image from 'next/image';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function AboutSustainability() {
  const t = await getTranslations('aboutHub.sustainability');
  return (
    <section className="py-6 lg:py-8 xl:py-10 bg-white">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        {/* Left Column: Image */}
        <div className="lg:col-span-6">
          <div className="ui-card-hover relative aspect-[16/10] w-full overflow-hidden rounded-[6px] shadow-lg border border-slate-100">
            <Image
              src="/images/about/gallery/sustainability-solar-warehouse.png"
              alt={t('title')}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-[#10b981]">
            <Leaf className="h-6 w-6 shrink-0" />
            <span className="text-base sm:text-lg lg:text-[20px] lg:leading-[28px] font-semibold">{t('title')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold tracking-[-0.6px] text-[#162233]">
            {t('title')}
          </h2>

          <p className="text-sm sm:text-base lg:text-[18px] lg:leading-[28px] font-normal text-[#617084] max-w-xl">
            {t('desc')}
          </p>

          <div className="pt-2">
            <Link
              href="/about/sustainability"
              className="text-base lg:text-[18px] lg:leading-[28px] inline-flex items-center gap-1.5 font-semibold text-[#10b981] hover:text-[#059669] transition-colors"
            >
              {t('desc')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default async function HanamFulfillmentHub() {
  const t = await getTranslations('regionalHubs');

  return (
    <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-100">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-12 lg:gap-16">
        
        {/* Title Area */}
        <div className="text-center max-w-[900px] mx-auto w-full">
          <span className="text-[12px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-bold uppercase tracking-wider text-brand block mb-3">
            {t('hanamHub.eyebrow')}
          </span>
          <h2 className="text-[16px] min-[375px]:text-[18px] sm:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold sm:font-bold tracking-tight text-slate-900 leading-tight lg:leading-[36px] xl:leading-[40px] max-w-[850px] mx-auto">
            {t('hanamHub.title')}
          </h2>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          
          {/* Left Side: 4 Features & CTA */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              
              {/* Feature 1 */}
              <div className="flex flex-col text-center sm:text-left items-center sm:items-start">
                <h3 className="font-bold text-slate-900 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] leading-snug mb-2">
                  {t('hanamHub.feat1Title')}
                </h3>
                <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] leading-relaxed text-slate-500">
                  {t('hanamHub.feat1Desc')}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col text-center sm:text-left items-center sm:items-start">
                <h3 className="font-bold text-slate-900 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] leading-snug mb-2">
                  {t('hanamHub.feat2Title')}
                </h3>
                <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] leading-relaxed text-slate-500">
                  {t('hanamHub.feat2Desc')}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col text-center sm:text-left items-center sm:items-start">
                <h3 className="font-bold text-slate-900 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] leading-snug mb-2">
                  {t('hanamHub.feat3Title')}
                </h3>
                <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] leading-relaxed text-slate-500">
                  {t('hanamHub.feat3Desc')}
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col text-center sm:text-left items-center sm:items-start">
                <h3 className="font-bold text-slate-900 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] leading-snug mb-2">
                  {t('hanamHub.feat4Title')}
                </h3>
                <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] leading-relaxed text-slate-500">
                  {t('hanamHub.feat4Desc')}
                </p>
              </div>

            </div>

            {/* CTA Button */}
            <div className="flex justify-center sm:justify-start mt-2">
              <Link
                href="/about"
                className="bg-brand text-white text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] leading-relaxed font-semibold py-2.5 px-6 rounded-[3px] hover:bg-brand-strong transition-all inline-flex items-center gap-1 min-h-[44px]"
              >
                {t('hanamHub.learnMore')}
                <span className="ml-1 text-[14px]">→</span>
              </Link>
            </div>
          </div>

          {/* Right Side: Image Showcase */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-[420px] lg:max-w-none aspect-[4/5] rounded-[8px] overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
              <Image
                src="/images/regional_hubs/hub-2/hanam-warehouse-shelves.jpg"
                alt="Ha Nam Fulfillment Hub Warehouse"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover hover:scale-[1.02] transition-transform duration-500"
                priority
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

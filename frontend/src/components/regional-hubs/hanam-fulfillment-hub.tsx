import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default async function HanamFulfillmentHub() {
  const t = await getTranslations('regionalHubs');

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-20 border-t border-slate-100">
      <div className="page-container flex flex-col gap-8 sm:gap-12 lg:gap-16">

        {/* Title Area (Căn lề trái ở mobile, căn giữa ở desktop) */}
        <div className="text-left sm:text-center w-full mx-auto">
          <h2 className="text-body-regular min-[375px]:text-card-title lg:text-[25px] font-bold tracking-tight text-blue-600 leading-snug sm:leading-normal uppercase block mb-2 sm:mb-3">
            {t('hanamHub.eyebrow')}
          </h2>
          <div className="text-body-regular min-[375px]:text-card-title lg:text-[25px] font-bold tracking-tight text-slate-900 leading-snug sm:leading-normal w-full">
            <span className="inline sm:block">{t('hanamHub.title').split(',')[0]}, </span>
            <span className="inline sm:block sm:mt-1 w-full">{t('hanamHub.title').split(',').slice(1).join(',').trim()}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">

          {/* Left Side: 4 Features & CTA (2 cột 1 hàng trên mobile) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-8 gap-y-6 sm:gap-y-10">

              {/* Feature 1 */}
              <div className="flex flex-col text-left items-start">
                <h3 className="font-bold text-slate-900 text-body-regular leading-snug mb-1.5 sm:mb-2">
                  {t('hanamHub.feat1Title')}
                </h3>
                <p className="text-caption-responsive leading-relaxed text-slate-500">
                  {t('hanamHub.feat1Desc')}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col text-left items-start">
                <h3 className="font-bold text-slate-900 text-body-regular leading-snug mb-1.5 sm:mb-2">
                  {t('hanamHub.feat2Title')}
                </h3>
                <p className="text-caption-responsive leading-relaxed text-slate-500">
                  {t('hanamHub.feat2Desc')}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col text-left items-start">
                <h3 className="font-bold text-slate-900 text-body-regular leading-snug mb-1.5 sm:mb-2">
                  {t('hanamHub.feat3Title')}
                </h3>
                <p className="text-caption-responsive leading-relaxed text-slate-500">
                  {t('hanamHub.feat3Desc')}
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col text-left items-start">
                <h3 className="font-bold text-slate-900 text-body-regular leading-snug mb-1.5 sm:mb-2">
                  {t('hanamHub.feat4Title')}
                </h3>
                <p className="text-caption-responsive leading-relaxed text-slate-500">
                  {t('hanamHub.feat4Desc')}
                </p>
              </div>

            </div>

            {/* CTA Button */}
            <div className="flex justify-start mt-2">
              <Link
                href="/about"
                className="w-full sm:w-auto bg-brand text-white text-caption-responsive leading-relaxed font-semibold py-2.5 px-6 rounded-[3px] hover:bg-brand-strong transition-all inline-flex items-center justify-center gap-1 min-h-[44px]"
              >
                {t('hanamHub.learnMore')}
                <span className="ml-1 text-body-regular">→</span>
              </Link>
            </div>
          </div>

          {/* Right Side: Image Showcase */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full aspect-[4/5] rounded-[2px] overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
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


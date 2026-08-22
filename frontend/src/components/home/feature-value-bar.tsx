import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';

export async function FeatureValueBar() {
  const t = await getTranslations('home');

  return (
    <section className="w-full bg-[#f0f4f8] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 divide-y divide-border rounded-lg border border-border bg-white shadow-sm sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-y-0 lg:divide-x lg:divide-border">
          {/* Card 1 */}
          <div className="flex flex-col items-start gap-4 p-6 sm:p-8 xl:p-10">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <Image
                src={ASSETS.home.iconNation}
                alt="Nationwide"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <p className="text-[16px] font-bold leading-snug text-slate-900 sm:text-[17px] xl:text-[18px]">
                {t('features.nationwideTitle')}
              </p>
              <p className="mt-1.5 text-[13px] text-slate-500 sm:text-[14px]">
                {t('features.nationwideDesc')}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-start gap-4 p-6 sm:p-8 xl:p-10">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <Image
                src={ASSETS.home.iconAdapter}
                alt="Flexible"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <p className="text-[16px] font-bold leading-snug text-slate-900 sm:text-[17px] xl:text-[18px]">
                {t('features.flexibleTitle')}
              </p>
              <p className="mt-1.5 text-[13px] text-slate-500 sm:text-[14px]">
                {t('features.flexibleDesc')}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-start gap-4 p-6 sm:p-8 xl:p-10">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <Image
                src={ASSETS.home.iconFile}
                alt="Cost Optimization"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <p className="text-[16px] font-bold leading-snug text-slate-900 sm:text-[17px] xl:text-[18px]">
                {t('features.costTitle')}
              </p>
              <p className="mt-1.5 text-[13px] text-slate-500 sm:text-[14px]">
                {t('features.costDesc')}
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-start gap-4 p-6 sm:p-8 xl:p-10">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <Image
                src={ASSETS.home.iconSecurity}
                alt="Quality Assurance"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <p className="text-[16px] font-bold leading-snug text-slate-900 sm:text-[17px] xl:text-[18px]">
                {t('features.qualityTitle')}
              </p>
              <p className="mt-1.5 text-[13px] text-slate-500 sm:text-[14px]">
                {t('features.qualityDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

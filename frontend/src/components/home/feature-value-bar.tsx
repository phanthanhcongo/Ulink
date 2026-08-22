import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';

const features = [
  { icon: ASSETS.home.iconNation, alt: 'Nationwide', titleKey: 'nationwideTitle', descKey: 'nationwideDesc' },
  { icon: ASSETS.home.iconAdapter, alt: 'Flexible', titleKey: 'flexibleTitle', descKey: 'flexibleDesc' },
  { icon: ASSETS.home.iconFile, alt: 'Cost Optimization', titleKey: 'costTitle', descKey: 'costDesc' },
  { icon: ASSETS.home.iconSecurity, alt: 'Quality Assurance', titleKey: 'qualityTitle', descKey: 'qualityDesc' },
] as const;

export async function FeatureValueBar() {
  const t = await getTranslations('home');

  return (
    <section className="w-full bg-[#f0f4f8] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-[1px] sm:grid-cols-2 sm:gap-[1px] lg:grid-cols-4 lg:gap-[1px]">
          {features.map((f) => (
            <div key={f.alt} className="flex flex-row items-center gap-3 border border-border bg-white p-4 shadow-sm sm:flex-col sm:items-start sm:p-5 lg:p-6">
              <div className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center">
                <Image
                  src={f.icon}
                  alt={f.alt}
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px] object-contain"
                />
              </div>
              <div>
                <p className="text-[17px] font-bold leading-snug text-slate-900 sm:text-[18px] xl:text-[20px]">
                  {t(`features.${f.titleKey}`)}
                </p>
                <p className="mt-1.5 text-[14px] text-slate-500 sm:text-[15px]">
                  {t(`features.${f.descKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

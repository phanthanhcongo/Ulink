import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';

const features = [
  {
    icon: ASSETS.home.iconNation,
    alt: 'Nationwide',
    titleKey: 'nationwideTitle',
    descKey: 'nationwideDesc',
    bgClass: 'bg-[#1769E2] shadow-[0_4px_12px_rgba(23,105,226,0.35)]',
  },
  {
    icon: ASSETS.home.iconAdapter,
    alt: 'Flexible',
    titleKey: 'flexibleTitle',
    descKey: 'flexibleDesc',
    bgClass: 'bg-[#12b76a] shadow-[0_4px_12px_rgba(18,183,106,0.35)]',
  },
  {
    icon: ASSETS.home.iconFile,
    alt: 'Cost Optimization',
    titleKey: 'costTitle',
    descKey: 'costDesc',
    bgClass: 'bg-[#e67e22] shadow-[0_4px_12px_rgba(230,126,34,0.35)]',
  },
  {
    icon: ASSETS.home.iconSecurity,
    alt: 'Quality Assurance',
    titleKey: 'qualityTitle',
    descKey: 'qualityDesc',
    bgClass: 'bg-[#7C3AED] shadow-[0_4px_12px_rgba(124,58,237,0.35)]',
  },
] as const;

export async function FeatureValueBar() {
  const t = await getTranslations('home');

  return (
    <section className="hidden sm:block w-full bg-[#f0f4f8] py-6 sm:py-7 lg:py-8">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4">
          {features.map((f) => (
            <div
              key={f.alt}
              className="group relative flex h-full flex-row items-center gap-3.5 rounded-[3px] border border-slate-200 bg-white p-4 shadow-xs transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] sm:flex-col sm:items-start sm:p-4.5 sm:min-h-[135px] lg:px-4.5 lg:py-4 lg:min-h-[140px] xl:px-5 xl:py-5 xl:min-h-[155px] 2xl:px-6 2xl:py-5.5 2xl:min-h-[165px]"
            >
              <div
                className={`relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110 ${f.bgClass}`}
              >
                <Image
                  src={f.icon}
                  alt={f.alt}
                  width={44}
                  height={44}
                  className="h-8 w-8 sm:h-9 sm:w-9 object-contain brightness-0 invert"
                />
              </div>
              <div className="w-full min-w-0">
                <p className="text-[15px] font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-brand whitespace-nowrap sm:text-[16px] lg:text-[18px] xl:text-[20px] lg:font-semibold">
                  {t(`features.${f.titleKey}`)}
                </p>
                <p className="mt-1 text-[11px] text-slate-600 font-medium sm:text-[12px] sm:leading-[17px] lg:text-[13px] lg:leading-[18px] xl:text-[14px]">
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


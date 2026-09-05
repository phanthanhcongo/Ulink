import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default async function HubPartner() {
  const t = await getTranslations('regionalHubs');

  return (
    <div className="w-full flex flex-col">
      {/* ── PART 1: BECOME PARTNER ── */}
      <section className="w-full bg-gradient-to-br from-[#EBF4FF] to-[#E5EEFF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-10 sm:gap-14">
          
          {/* Header & Play Button */}
          <div className="flex flex-col items-start w-full">
            <h2 className="text-[24px] min-[375px]:text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[48px] font-bold tracking-tight text-slate-900 leading-tight lg:leading-[48px] xl:leading-[56px] mb-4 sm:mb-6 max-w-[1100px]">
              {t('hubPartner.title')}
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] leading-relaxed text-slate-600 mb-6 sm:mb-8 max-w-[950px]">
              {t('hubPartner.desc')}
            </p>
            
            {/* Play Video Button */}
            <button className="border-2 border-[#0066FF] text-[#0066FF] font-bold py-3 px-10 sm:px-12 rounded-none hover:bg-blue-50/50 transition-all inline-flex items-center justify-center text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] leading-relaxed min-h-[48px] min-w-[180px] sm:min-w-[210px] whitespace-nowrap">
              {t('hubPartner.playVideo')}
            </button>
          </div>

          {/* Details & Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left Column: Image */}
            <div className="relative w-full aspect-[3/2] overflow-hidden border border-slate-200/50 shadow-md rounded-none">
              <Image
                src="/images/regional_hubs/hub-2/partner-warehouse.jpg"
                alt="Partner Warehouse"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
            </div>
            
            {/* Right Column: Text Details */}
            <div className="flex flex-col justify-center">
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] leading-relaxed text-slate-700 font-normal">
                {t('hubPartner.detailText')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── PART 2: CTA REGISTER BANNER ── */}
      <section className="w-full bg-[#A5C7F9] py-12 sm:py-16 border-t border-blue-200/30">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left Text */}
          <div className="flex flex-col items-start text-left max-w-[750px]">
            <span className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-bold uppercase tracking-wider text-blue-900 mb-2 block">
              {t('hubPartner.ctaEyebrow')}
            </span>
            <h3 className="text-[20px] sm:text-[26px] lg:text-[32px] xl:text-[36px] font-bold tracking-tight text-slate-900 leading-tight mb-3">
              {t('hubPartner.ctaTitle')}
            </h3>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] leading-relaxed text-slate-800 font-normal">
              {t('hubPartner.ctaDesc')}
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto justify-end shrink-0">
            <Link
              href="/contact"
              className="border border-blue-900 text-blue-900 font-semibold py-3 px-7 rounded-none hover:bg-blue-900/5 transition-all text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] leading-relaxed text-center w-full sm:w-auto inline-flex justify-center items-center min-h-[48px]"
            >
              {t('hubPartner.ctaBtnConsult')}
            </Link>
            <Link
              href="/contact"
              className="bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-3 px-7 rounded-none transition-all text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] leading-relaxed text-center w-full sm:w-auto inline-flex justify-center items-center shadow-sm min-h-[48px]"
            >
              {t('hubPartner.ctaBtnSchedule')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

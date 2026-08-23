import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default async function HubPartner() {
  const t = await getTranslations('regionalHubs');

  return (
    <div className="w-full flex flex-col">
      {/* ── PART 1: BECOME PARTNER ── */}
      <section className="w-full bg-gradient-to-br from-[#EBF4FF] to-[#E5EEFF] py-16 sm:py-20 lg:py-24 border-t border-slate-100">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-10 sm:gap-14">
          
          {/* Header & Play Button */}
          <div className="flex flex-col items-start w-full max-w-[1000px]">
            <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[52px] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
              {t('hubPartner.title')}
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600 mb-6 max-w-[900px]">
              {t('hubPartner.desc')}
            </p>
            
            {/* Play Video Button */}
            <button className="border-2 border-[#0066FF] text-[#0066FF] font-bold py-2.5 px-6 rounded-none hover:bg-blue-50/50 transition-all inline-flex items-center justify-center gap-2.5 text-[13px] sm:text-[14px] leading-relaxed w-[140px] min-h-[44px]">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              {t('hubPartner.playVideo')}
            </button>
          </div>

          {/* Details & Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-[1120px]">
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
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-700 font-normal">
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
          <div className="flex flex-col items-start text-left max-w-[700px]">
            <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-bold uppercase tracking-wider text-blue-900 mb-2 block">
              {t('hubPartner.ctaEyebrow')}
            </span>
            <h3 className="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-extrabold text-slate-900 leading-tight mb-3">
              {t('hubPartner.ctaTitle')}
            </h3>
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-800 font-normal">
              {t('hubPartner.ctaDesc')}
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto justify-end shrink-0">
            <Link
              href="/contact"
              className="border border-blue-900 text-blue-900 font-semibold py-2.5 px-6 rounded-none hover:bg-blue-900/5 transition-all text-[13px] sm:text-[14px] leading-relaxed text-center w-full sm:w-auto inline-flex justify-center items-center min-h-[44px]"
            >
              {t('hubPartner.ctaBtnConsult')}
            </Link>
            <Link
              href="/contact"
              className="bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-none transition-all text-[13px] sm:text-[14px] leading-relaxed text-center w-full sm:w-auto inline-flex justify-center items-center shadow-sm min-h-[44px]"
            >
              {t('hubPartner.ctaBtnSchedule')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

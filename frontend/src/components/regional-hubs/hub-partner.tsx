import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default async function HubPartner() {
  const t = await getTranslations('regionalHubs');

  return (
    <div className="w-full flex flex-col">
      {/* ── PART 1: BECOME PARTNER ── */}
      <section className="w-full bg-gradient-to-br from-[#EBF4FF] to-[#E5EEFF] py-12 sm:py-16 lg:py-20">
        <div className="page-container flex flex-col gap-8 sm:gap-12">
          
          {/* Header & Play Button */}
          <div className="flex flex-col items-start w-full">
            <h2 className="text-partner-title font-bold tracking-tight text-slate-900 leading-tight mb-3 sm:mb-4 max-w-[1100px]">
              {t('hubPartner.title')}
            </h2>
            <p className="text-body-regular leading-relaxed text-slate-600 mb-6 max-w-[950px]">
              {t('hubPartner.desc')}
            </p>
            
            {/* Play Video Button */}
            <button className="border-2 border-[#0F62FE] text-[#0F62FE] font-bold py-3 px-8 sm:px-10 rounded-[3px] hover:bg-blue-50/50 transition-all inline-flex items-center justify-center text-body-regular whitespace-nowrap">
              {t('hubPartner.playVideo')}
            </button>
          </div>

          {/* Details & Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
            {/* Left Column: Image */}
            <div className="relative w-full aspect-[3/2] overflow-hidden border border-slate-200/60 shadow-xs rounded-[2px]">
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
              <p className="text-body-regular leading-relaxed text-slate-700 font-normal">
                {t('hubPartner.detailText')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── PART 2: CTA REGISTER BANNER ── */}
      <section className="w-full bg-[#A6C8FF] py-12 sm:py-16 lg:py-20 border-t border-blue-200/50">
        <div className="page-container flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          {/* Header text block */}
          <div className="flex flex-col items-start text-left max-w-3xl space-y-3">
            <span className="text-body-regular font-bold uppercase tracking-wider text-[#001D6C]">
              {t('hubPartner.ctaEyebrow')}
            </span>
            <h3 className="text-section-title font-bold tracking-tight text-[#212529] leading-tight sm:leading-snug">
              {t('hubPartner.ctaTitle')}
            </h3>
            <p className="text-body-regular leading-relaxed text-slate-800/90 pt-1">
              {t('hubPartner.ctaDesc')}
            </p>
          </div>

          {/* Action Buttons (centered on mobile/iPad, right-aligned on same row on Desktop) */}
          <div className="flex flex-row items-center justify-center lg:justify-end gap-3 sm:gap-4 flex-wrap w-full lg:w-auto shrink-0">
            <Link
              href="/contact"
              className="border border-[#001D6C] text-[#001D6C] font-semibold py-3 px-5 sm:px-6 rounded-[3px] hover:bg-white/20 transition-all text-body-regular inline-flex justify-center items-center min-h-[46px] whitespace-nowrap"
            >
              {t('hubPartner.ctaBtnConsult')}
            </Link>
            <Link
              href="/contact"
              className="bg-[#0F62FE] hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-[3px] transition-all text-body-regular inline-flex justify-center items-center shadow-sm min-h-[46px] whitespace-nowrap"
            >
              {t('hubPartner.ctaBtnSchedule')}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}


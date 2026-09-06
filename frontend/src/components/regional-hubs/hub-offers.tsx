import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default async function HubOffers() {
  const t = await getTranslations('regionalHubs');

  return (
    <section className="w-full bg-white py-16 sm:py-20 border-t border-slate-100">
      <div className="page-container flex flex-col items-start">
        
        {/* Header */}
        <div className="max-w-3xl w-full text-left space-y-2">
          <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold tracking-tight text-slate-900 leading-snug sm:leading-[36px] uppercase block">
            {t('hubOffer.eyebrow')}
          </span>
          <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold tracking-tight text-slate-900 leading-snug sm:leading-[36px]">
            {t('hubOffer.title')}
          </h2>
          <p className="text-slate-500 text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed font-normal pt-1">
            {t('hubOffer.subtitle')}
          </p>
        </div>

        {/* Two Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full mt-10">
          
          {/* Card 1: FDI */}
          <div className="relative overflow-hidden aspect-[4/4.5] sm:aspect-[16/13] w-full min-h-[380px] flex flex-col justify-end p-6 group rounded-[2px] border border-slate-200/60 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            {/* Background Image */}
            <Image
              src="/images/regional_hubs/hub-2/fdi-handshake.jpg"
              alt="FDI Handshake"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5 duration-500" />
            
            {/* Inner Floating Translucent Popup (24px margin from outer card edges via parent p-6) */}
            <div className="relative z-10 w-full p-6 bg-white/85 backdrop-blur-md rounded-[2px] border border-white/60 flex flex-col items-start gap-4 shadow-md">
              <h3 className="font-bold text-slate-900 text-[18px] sm:text-[20px] lg:text-[22px] leading-snug">
                {t('hubOffer.fdiTitle')}
              </h3>
              <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
                {t('hubOffer.fdiDesc')}
              </p>
              
              {/* CTA Button */}
              <Link
                href="/contact"
                className="w-full bg-[#1769E2] hover:bg-blue-700 text-white font-semibold text-[14px] sm:text-[15px] py-3.5 px-6 rounded-[2px] flex items-center justify-between transition-all group/btn"
              >
                <span>{t('hubOffer.learnMore')}</span>
                <svg className="h-5 w-5 fill-none stroke-current transition-transform group-hover/btn:translate-x-1" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2: SME */}
          <div className="relative overflow-hidden aspect-[4/4.5] sm:aspect-[16/13] w-full min-h-[380px] flex flex-col justify-end p-6 group rounded-[2px] border border-slate-200/60 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            {/* Background Image */}
            <Image
              src="/images/regional_hubs/hub-2/sme-worker.jpg"
              alt="SME Owner"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5 duration-500" />
            
            {/* Inner Floating Translucent Popup (24px margin from outer card edges via parent p-6) */}
            <div className="relative z-10 w-full p-6 bg-white/85 backdrop-blur-md rounded-[2px] border border-white/60 flex flex-col items-start gap-4 shadow-md">
              <h3 className="font-bold text-slate-900 text-[18px] sm:text-[20px] lg:text-[22px] leading-snug">
                {t('hubOffer.smeTitle')}
              </h3>
              <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
                {t('hubOffer.smeDesc')}
              </p>
              
              {/* CTA Button */}
              <Link
                href="/contact"
                className="w-full bg-[#1769E2] hover:bg-blue-700 text-white font-semibold text-[14px] sm:text-[15px] py-3.5 px-6 rounded-[2px] flex items-center justify-between transition-all group/btn"
              >
                <span>{t('hubOffer.learnMore')}</span>
                <svg className="h-5 w-5 fill-none stroke-current transition-transform group-hover/btn:translate-x-1" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


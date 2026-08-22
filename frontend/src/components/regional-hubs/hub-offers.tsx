import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default async function HubOffers() {
  const t = await getTranslations('regionalHubs');

  return (
    <section className="w-full bg-white py-16 sm:py-20 border-t border-slate-100">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col items-start">
        
        {/* Header */}
        <div className="max-w-[900px] w-full text-left">
          <span className="text-[13px] font-bold text-brand tracking-widest uppercase block mb-2">
            {t('hubOffer.eyebrow')}
          </span>
          <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-[#0F2942] leading-tight mb-3">
            {t('hubOffer.title')}
          </h2>
          <p className="text-slate-500 text-[14px] sm:text-[15px] font-normal">
            {t('hubOffer.subtitle')}
          </p>
        </div>

        {/* Two Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full mt-10">
          
          {/* Card 1: FDI */}
          <div className="relative overflow-hidden aspect-[16/10] w-full min-h-[300px] flex items-end justify-start group">
            {/* Background Image */}
            <Image
              src="/images/regional_hubs/hub-2/fdi-handshake.jpg"
              alt="FDI Handshake"
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5 duration-500" />
            
            {/* Bottom-left Translucent Card Overlay */}
            <div className="relative z-10 w-[90%] sm:w-[85%] mb-4 ml-4 sm:mb-6 sm:ml-6">
              <div className="absolute inset-0 bg-white opacity-70 backdrop-blur-md shadow-lg rounded-none" />
              <div className="relative z-10 p-6 sm:p-7 flex flex-col items-start">
                <h3 className="font-bold text-slate-800 text-[17px] sm:text-[19px] mb-1.5">
                  {t('hubOffer.fdiTitle')}
                </h3>
                <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed mb-5">
                  {t('hubOffer.fdiDesc')}
                </p>
                
                {/* Buttons Row */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-[13px] sm:text-[14px] py-2.5 px-5 rounded-none flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    {t('hubOffer.learnMore')}
                    <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white hover:bg-slate-50 text-[#0066FF] border border-slate-200 font-semibold text-[13px] sm:text-[14px] py-2.5 px-6 rounded-none transition-all flex items-center justify-center shadow-sm"
                  >
                    {t('hubOffer.contact')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: SME */}
          <div className="relative overflow-hidden aspect-[16/10] w-full min-h-[300px] flex items-end justify-start group">
            {/* Background Image */}
            <Image
              src="/images/regional_hubs/hub-2/sme-worker.jpg"
              alt="SME Owner"
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5 duration-500" />
            
            {/* Bottom-left Translucent Card Overlay */}
            <div className="relative z-10 w-[90%] sm:w-[85%] mb-4 ml-4 sm:mb-6 sm:ml-6">
              <div className="absolute inset-0 bg-white opacity-70 backdrop-blur-md shadow-lg rounded-none" />
              <div className="relative z-10 p-6 sm:p-7 flex flex-col items-start">
                <h3 className="font-bold text-slate-800 text-[17px] sm:text-[19px] mb-1.5">
                  {t('hubOffer.smeTitle')}
                </h3>
                <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed mb-5">
                  {t('hubOffer.smeDesc')}
                </p>
                
                {/* Buttons Row */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="bg-[#0066FF] hover:bg-blue-700 text-white font-semibold text-[13px] sm:text-[14px] py-2.5 px-5 rounded-none flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    {t('hubOffer.learnMore')}
                    <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white hover:bg-slate-50 text-[#0066FF] border border-slate-200 font-semibold text-[13px] sm:text-[14px] py-2.5 px-6 rounded-none transition-all flex items-center justify-center shadow-sm"
                  >
                    {t('hubOffer.contact')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

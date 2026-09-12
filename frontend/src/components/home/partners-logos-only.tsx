import Image from 'next/image';
import { ASSETS } from '@/lib/assets';

interface PartnersLogosOnlyProps {
  title?: string;
}

export function PartnersLogosOnly({ title }: PartnersLogosOnlyProps = {}) {
  const displayTitle = title || 'HƠN 300 DOANH NGHIỆP FDI & TẬP ĐOÀN DƯỢC PHẨM ĐỒNG HÀNH CÙNG ULINK INDUSTRIES';

  const row1Logos = [
    { src: ASSETS.home.partnerSamsung, alt: 'Samsung', width: 'max-w-[70%]' },
    { src: ASSETS.home.partnerCanon, alt: 'Canon', width: 'max-w-[60%]' },
    { src: ASSETS.home.partnerPanasonic, alt: 'Panasonic', width: 'max-w-[75%]' },
    { src: ASSETS.home.partnerIbm, alt: 'IBM', width: 'max-w-[55%]' },
    { src: ASSETS.home.partnerTraphaco, alt: 'Traphaco', width: 'max-w-[70%]' },
    { src: ASSETS.home.partnerCocaCola, alt: 'Coca Cola', width: 'max-w-[65%]' },
  ];

  const row2Logos = [
    { src: ASSETS.home.partnerVinfast, alt: 'Vinfast', width: 'max-w-[40%]' },
    { src: ASSETS.home.partnerLg, alt: 'LG', width: 'max-w-[60%]' },
    { src: ASSETS.home.partnerAmkor, alt: 'Amkor', width: 'max-w-[75%]' },
    { src: ASSETS.home.partnerVinamilk, alt: 'Vinamilk', width: 'max-w-[65%]' },
    { src: ASSETS.home.partner3m, alt: '3M', width: 'max-w-[40%]' },
    { src: ASSETS.home.partnerByd, alt: 'BYD', width: 'max-w-[70%]' },
  ];

  return (
    <div className="flex flex-col gap-5 overflow-hidden mask-gradient-x py-8 select-none w-full">
      <h3 className="text-center text-[14px] sm:text-[16px] lg:text-[18px] font-bold uppercase tracking-wide text-slate-800 px-4 sm:px-6 max-w-6xl mx-auto">
        {displayTitle}
      </h3>
      {/* Row 1 Marquee: Left scrolling */}
      <div className="flex w-max animate-marquee-left">
        {[...row1Logos, ...row1Logos].map((logo, index) => (
          <div
            key={`row1-logo-${index}`}
            className="flex shrink-0 w-[106px] h-[69px] sm:w-[213.3px] sm:h-[138px] items-center justify-center bg-white"
          >
            <div className={`relative w-full h-[60%] flex items-center justify-center ${logo.width}`}>
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 Marquee: Right scrolling */}
      <div className="flex w-max animate-marquee-right">
        {[...row2Logos, ...row2Logos].map((logo, index) => (
          <div
            key={`row2-logo-${index}`}
            className="flex shrink-0 w-[106px] h-[69px] sm:w-[213.3px] sm:h-[138px] items-center justify-center bg-white"
          >
            <div className={`relative w-full h-[60%] flex items-center justify-center ${logo.width}`}>
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

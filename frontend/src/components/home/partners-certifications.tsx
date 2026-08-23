import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';
import { SectionHeader } from './section-header';

interface PartnerItem {
  name: string;
  src: string;
  width: number;
  height: number;
  className: string;
}

export async function PartnersCertifications() {
  const t = await getTranslations('home');

  const row1: PartnerItem[] = [
    {
      name: 'Samsung',
      src: ASSETS.home.partnerSamsung,
      width: 168,
      height: 86,
      className: 'w-[110px] sm:w-[140px] lg:w-[168px] h-[56px] sm:h-[72px] lg:h-[86px] object-cover',
    },
    {
      name: 'Canon',
      src: ASSETS.home.partnerCanon,
      width: 150,
      height: 55,
      className: 'w-[100px] sm:w-[125px] lg:w-[150px] h-[36px] sm:h-[46px] lg:h-[55px] object-cover',
    },
    {
      name: 'Panasonic',
      src: ASSETS.home.partnerPanasonic,
      width: 138,
      height: 138,
      className: 'w-[90px] sm:w-[115px] lg:w-[138px] h-[90px] sm:h-[115px] lg:h-[138px] object-cover',
    },
    {
      name: 'IBM',
      src: ASSETS.home.partnerIbm,
      width: 92,
      height: 92,
      className: 'w-[60px] sm:w-[76px] lg:w-[92px] h-[60px] sm:h-[76px] lg:h-[92px] object-cover',
    },
    {
      name: 'Traphaco',
      src: ASSETS.home.partnerTraphaco,
      width: 150,
      height: 86,
      className: 'w-[100px] sm:w-[125px] lg:w-[150px] h-[56px] sm:h-[72px] lg:h-[86px] object-cover',
    },
    {
      name: 'Coca-Cola',
      src: ASSETS.home.partnerCocaCola,
      width: 170,
      height: 84,
      className: 'w-full h-[54px] sm:h-[70px] lg:h-[84px] object-cover',
    },
  ];

  const row2: PartnerItem[] = [
    {
      name: 'VinFast',
      src: ASSETS.home.partnerVinfast,
      width: 188,
      height: 115,
      className: 'w-[120px] sm:w-[155px] lg:w-[188px] h-[74px] sm:h-[96px] lg:h-[115px] object-cover',
    },
    {
      name: 'LG',
      src: ASSETS.home.partnerLg,
      width: 156,
      height: 98,
      className: 'w-[100px] sm:w-[130px] lg:w-[156px] h-[64px] sm:h-[82px] lg:h-[98px] object-cover',
    },
    {
      name: 'Amkor Technology',
      src: ASSETS.home.partnerAmkor,
      width: 154,
      height: 57,
      className: 'w-[100px] sm:w-[128px] lg:w-[154px] h-[36px] sm:h-[48px] lg:h-[57px] object-cover',
    },
    {
      name: 'Vinamilk',
      src: ASSETS.home.partnerVinamilk,
      width: 146,
      height: 84,
      className: 'w-[96px] sm:w-[122px] lg:w-[146px] h-[54px] sm:h-[70px] lg:h-[84px] object-cover',
    },
    {
      name: '3M',
      src: ASSETS.home.partner3m,
      width: 120,
      height: 60,
      className: 'w-[80px] sm:w-[100px] lg:w-[120px] h-[40px] sm:h-[50px] lg:h-[60px] object-cover',
    },
    {
      name: 'BYD',
      src: ASSETS.home.partnerByd,
      width: 212,
      height: 92,
      className: 'w-[140px] sm:w-[176px] lg:w-[212px] h-[60px] sm:h-[76px] lg:h-[92px] object-cover',
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12 xl:px-16 lg:py-12 xl:py-16">
      <SectionHeader
        title={t('partners.sectionTitle')}
        subtitle={t('partners.sectionSubTitle')}
      />

      <div className="group mt-8 flex flex-col gap-[10px]">
        {/* Row 1 */}
        <div className="group/row1 flex flex-row items-center size-full gap-px overflow-x-auto pb-2 lg:overflow-visible lg:pb-0">
          {row1.map((partner) => (
            <div
              key={partner.name}
              className="group/item flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 group-hover/row1:scale-[1.15] hover:scale-[1.3] group-hover/row1:z-10 hover:z-20"
            >
              <div className="relative shrink-0" style={{ width: partner.width, height: partner.height }}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-cover pointer-events-none opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover/item:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="group/row2 hidden sm:flex flex-row items-center size-full gap-px overflow-x-auto pb-2 lg:overflow-visible lg:pb-0 cursor-pointer">
          {row2.map((partner) => (
            <div
              key={partner.name}
              className="group/item flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 group-hover/row2:scale-[1.15] hover:scale-[1.3] group-hover/row2:z-10 hover:z-20"
            >
              <div className="relative shrink-0" style={{ width: partner.width, height: partner.height }}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-cover pointer-events-none opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover/item:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS & ISO STANDARDS ROW (Row 3) */}
      <div className="hidden sm:flex flex-row items-center justify-between gap-3 mt-8 sm:mt-10 lg:mt-12">
        {/* Col 1+2: Title & Desc - chiem 2 o */}
        <div className="flex w-[calc(160px*2+theme(gap.3))] sm:w-[calc(190px*2+theme(gap.3))] lg:w-[calc(212px*2+theme(gap.3))] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 flex-col justify-center bg-white px-4 text-left">
          <h3 className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-primary leading-tight">
            {t('partners.isoTitle')}
          </h3>
          <p className="mt-2 text-[12px] sm:text-[14px] lg:text-[16px] leading-relaxed text-muted-foreground">
            {t('partners.isoDesc')}
          </p>
        </div>

        {/* Col 3: ISO 9001:2015 */}
        <div className="flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 hover:scale-[1.15] hover:z-10">
          <Image
            src={ASSETS.home.certIso9001}
            alt="ISO 9001:2015 QUACERT JAS-ANZ"
            width={500}
            height={250}
            className="h-16 sm:h-20 lg:h-24 w-auto max-w-[80%] object-contain"
          />
        </div>

        {/* Col 4: SGS */}
        <div className="flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 hover:scale-[1.15] hover:z-10">
          <Image
            src={ASSETS.home.certSgs}
            alt="SGS Certification"
            width={500}
            height={250}
            className="w-[120%] h-[120%] max-w-none object-cover"
          />
        </div>

        {/* Col 5: RoHS */}
        <div className="flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 hover:scale-[1.15] hover:z-10">
          <Image
            src={ASSETS.home.certRohs}
            alt="RoHS Compliant"
            width={500}
            height={250}
            className="h-16 sm:h-20 lg:h-24 w-auto max-w-[80%] object-contain"
          />
        </div>

        {/* Col 6: MSDS */}
        <div className="flex w-[160px] sm:w-[190px] lg:w-[212px] h-[105px] sm:h-[120px] lg:h-[138px] shrink-0 items-center justify-center bg-white transition-all duration-300 hover:scale-[1.15] hover:z-10">
          <Image
            src={ASSETS.home.certMsds}
            alt="MSDS Material Safety Data Sheet"
            width={500}
            height={250}
            className="h-16 sm:h-20 lg:h-24 w-auto max-w-[80%] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

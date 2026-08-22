import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ASSETS } from '@/lib/assets';

export async function PartnersCertifications() {
  const t = await getTranslations('home');

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12 xl:px-16 lg:py-12 xl:py-16">
      {/* ── SECTION HEADER BAR ── */}
      <div className="flex items-start gap-3">
        {/* 3 dots cyan accent indicator */}
        <div className="mt-1.5 flex flex-col gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="h-2 w-2 rounded-full bg-brand/60" />
          <span className="h-2 w-2 rounded-full bg-brand/30" />
        </div>
        <div>
          <h2 className="text-[22px] font-extrabold tracking-tight text-primary sm:text-[26px] lg:text-[26px] xl:text-[30px] 2xl:text-[32px]">
            {t('partners.sectionTitle')}
          </h2>
          <p className="mt-1 text-[12.5px] text-muted-foreground sm:text-[13px] lg:text-[13px] xl:text-[14px]">
            {t('partners.sectionSubTitle')}
          </p>
        </div>
      </div>

      {/* ── PARTNERS LOGO GRID (6 COLS x 2 ROWS) ── */}
      <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6 xl:gap-12">
        {/* 1. Samsung */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerSamsung}
            alt="Samsung"
            width={260}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>
        {/* 2. Canon */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerCanon}
            alt="Canon"
            width={260}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>
        {/* 3. Panasonic */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerPanasonic}
            alt="Panasonic"
            width={260}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>
        {/* 4. IBM */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerIbm}
            alt="IBM"
            width={240}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>
        {/* 5. Traphaco */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerTraphaco}
            alt="Traphaco"
            width={260}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>
        {/* 6. Coca-Cola */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerCocaCola}
            alt="Coca-Cola"
            width={260}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>

        {/* 7. VinFast */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerVinfast}
            alt="VinFast"
            width={260}
            height={120}
            className="h-11 sm:h-16 lg:h-18 xl:h-22 w-auto max-w-full object-contain"
          />
        </div>
        {/* 8. LG */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerLg}
            alt="LG"
            width={240}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>
        {/* 9. Amkor */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerAmkor}
            alt="Amkor Technology"
            width={260}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>
        {/* 10. Vinamilk */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerVinamilk}
            alt="Vinamilk"
            width={260}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>
        {/* 11. 3M */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partner3m}
            alt="3M"
            width={240}
            height={120}
            className="h-9 sm:h-14 lg:h-16 xl:h-20 w-auto max-w-full object-contain"
          />
        </div>
        {/* 12. BYD */}
        <div className="flex h-14 items-center justify-center p-2 transition-transform hover:scale-105 sm:h-20 lg:h-22 xl:h-26">
          <Image
            src={ASSETS.home.partnerByd}
            alt="BYD"
            width={240}
            height={120}
            className="h-7 sm:h-10 lg:h-12 xl:h-16 w-auto max-w-full object-contain"
          />
        </div>
      </div>

      {/* ── CERTIFICATIONS & ISO STANDARDS ROW (5 COLUMNS) ── */}
      <div className="mt-3 lg:mt-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-5 items-center">
          {/* Col 1: Title & Desc */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex flex-col justify-center text-center lg:text-left pr-0 lg:pr-4 mb-6 lg:mb-0">
            <h3 className="text-[16px] font-bold text-primary sm:text-[18px] lg:text-[18px] xl:text-[20px]">
              {t('partners.isoTitle')}
            </h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground sm:text-[13px] lg:text-[13px] xl:text-[14px]">
              {t('partners.isoDesc')}
            </p>
          </div>

          {/* Col 2: ISO 9001:2015 / QUACERT / JAS-ANZ */}
          <div className="flex h-20 sm:h-28 lg:h-30 xl:h-36 items-center justify-center p-2">
            <Image
              src={ASSETS.home.certIso9001}
              alt="ISO 9001:2015 QUACERT JAS-ANZ"
              width={320}
              height={140}
              className="h-12 sm:h-18 lg:h-20 xl:h-24 w-auto max-w-full object-contain"
            />
          </div>

          {/* Col 3: SGS */}
          <div className="flex h-20 sm:h-28 lg:h-30 xl:h-36 items-center justify-center p-2">
            <Image
              src={ASSETS.home.certSgs}
              alt="SGS Certification"
              width={300}
              height={140}
              className="h-10 sm:h-16 lg:h-18 xl:h-22 w-auto max-w-full object-contain"
            />
          </div>

          {/* Col 4: RoHS compliant */}
          <div className="flex h-20 sm:h-28 lg:h-30 xl:h-36 items-center justify-center p-2">
            <Image
              src={ASSETS.home.certRohs}
              alt="RoHS Compliant"
              width={320}
              height={140}
              className="h-12 sm:h-18 lg:h-20 xl:h-24 w-auto max-w-full object-contain"
            />
          </div>

          {/* Col 5: MSDS Material Safety Data Sheet */}
          <div className="flex h-20 sm:h-28 lg:h-30 xl:h-36 items-center justify-center p-2">
            <Image
              src={ASSETS.home.certMsds}
              alt="MSDS Material Safety Data Sheet"
              width={340}
              height={160}
              className="h-14 sm:h-20 lg:h-22 xl:h-26 w-auto max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

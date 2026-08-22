import Image from 'next/image';
import { ASSETS } from '@/lib/assets';

export function PartnersLogosOnly() {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* ── PARTNERS LOGO GRID (6 COLS x 2 ROWS) ── */}
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6 xl:gap-12">
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

      {/* ── CERTIFICATIONS & ISO STANDARDS ROW (4 COLUMNS) ── */}
      <div className="mt-3 lg:mt-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 items-center justify-center">
          {/* Col 1: ISO 9001:2015 / QUACERT / JAS-ANZ */}
          <div className="flex h-20 sm:h-28 lg:h-30 xl:h-36 items-center justify-center p-2">
            <Image
              src={ASSETS.home.certIso9001}
              alt="ISO 9001:2015 QUACERT JAS-ANZ"
              width={320}
              height={140}
              className="h-12 sm:h-18 lg:h-20 xl:h-24 w-auto max-w-full object-contain"
            />
          </div>

          {/* Col 2: SGS */}
          <div className="flex h-20 sm:h-28 lg:h-30 xl:h-36 items-center justify-center p-2">
            <Image
              src={ASSETS.home.certSgs}
              alt="SGS Certification"
              width={300}
              height={140}
              className="h-10 sm:h-16 lg:h-18 xl:h-22 w-auto max-w-full object-contain"
            />
          </div>

          {/* Col 3: RoHS compliant */}
          <div className="flex h-20 sm:h-28 lg:h-30 xl:h-36 items-center justify-center p-2">
            <Image
              src={ASSETS.home.certRohs}
              alt="RoHS Compliant"
              width={320}
              height={140}
              className="h-12 sm:h-18 lg:h-20 xl:h-24 w-auto max-w-full object-contain"
            />
          </div>

          {/* Col 4: MSDS Material Safety Data Sheet */}
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
    </div>
  );
}

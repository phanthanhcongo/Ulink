import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { ASSETS } from '@/lib/assets';
import { FooterLocaleSwitcher } from './footer-locale-switcher';

export async function SiteFooter() {
  const t = await getTranslations('footer');

  return (
    <footer className="relative w-full overflow-hidden  bg-[#f3f7fc] text-slate-800">
      {/* ── TOP ACCENT LINE ── */}

      {/* ── MAIN FOOTER CONTAINER ── */}
      <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-8 lg:py-16">
        {/* ── 4-COLUMN GRID LAYOUT (1.5fr 1fr .86fr 1.05fr -> 4-3-2-3 COLS) ── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          
          {/* ── COL 1: BRAND, REGISTRATION, CONTACT & SOCIALS (4 COLS) ── */}
          <section className="lg:col-span-4 lg:pr-3" aria-label="Thông tin ULink Industries">
            <Link href="/" className="inline-block">
              <Image
                src={ASSETS.logo.main}
                alt="ULink Industries"
                width={226}
                height={72}
                className="h-14 w-auto object-contain sm:h-16"
              />
            </Link>
            
            <p className="mt-4 text-[13px] leading-relaxed text-[#485669] sm:text-[14px]">
              {t('descLine1')}
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-[#647084] sm:text-[13px]">
              {t('descLine2')}
            </p>

            {/* Address & Email */}
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-2.5 text-[13px] text-[#4d5a6b] sm:text-[14px]">
                <MapPin className="h-5 w-5 shrink-0 text-[#1769e2] mt-0.5" />
                <div>
                  <strong className="font-bold text-slate-900">{t('hubTitle')}</strong>
                  <p className="mt-0.5 leading-snug">{t('hubAddress')}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[13px] text-[#4d5a6b] sm:text-[14px]">
                <Mail className="h-5 w-5 shrink-0 text-[#1769e2]" />
                <a
                  href="mailto:contact@ulinkindustries.com"
                  className="text-[#4d5a6b] transition-colors hover:text-[#1769e2]"
                >
                  contact@ulinkindustries.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-[13px] font-bold text-[#4b5666] sm:text-[14px]">
                {t('connectSocials')}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-transform hover:-translate-y-0.5"
                  aria-label="LinkedIn"
                >
                  <Image
                    src={ASSETS.footer.linkedin}
                    alt="LinkedIn"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-transform hover:-translate-y-0.5"
                  aria-label="Facebook"
                >
                  <Image
                    src={ASSETS.footer.facebook}
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-transform hover:-translate-y-0.5"
                  aria-label="TikTok"
                >
                  <Image
                    src={ASSETS.footer.tiktok}
                    alt="TikTok"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-transform hover:-translate-y-0.5"
                  aria-label="YouTube"
                >
                  <Image
                    src={ASSETS.footer.youtube}
                    alt="YouTube"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </a>
              </div>
            </div>
          </section>

          {/* ── COL 2: VỀ CHÚNG TÔI & DISTRIBUTOR & BADGE (3 COLS) ── */}
          <nav className="lg:col-span-3 lg:pl-4" aria-label="Về chúng tôi">
            <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-2 lg:border-b-0 lg:pb-0">
              <Link
                href="/about"
                className="group inline-flex items-center gap-1 text-[14px] font-extrabold uppercase tracking-wider text-[#151b2a] transition-colors hover:text-[#1769e2] sm:text-[15px]"
              >
                {t('aboutTitle')}
                <ChevronRight className="h-4 w-4 text-slate-800 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="hidden h-[2px] w-8 bg-[#bfd3ec] lg:block" />
            </div>

            <ul className="space-y-2 text-[13px] sm:text-[14px]">
              <li>
                <Link
                  href="/regional-hubs"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('aboutHub')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about/quality"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('aboutQuality')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about/sustainability"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('aboutSustainability')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about/standards"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('aboutSupply')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about/careers"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('aboutCareers')}
                </Link>
              </li>
            </ul>

            {/* Partner Block */}
            <div className="mt-6 border-t border-[#d7e1ed] pt-5">
              <strong className="block text-[12px] font-bold text-[#4a5667]">
                {t('becomeDistributor')}
              </strong>
              <a
                href="tel:02473099899"
                className="mt-2 inline-flex items-center gap-2 text-[17px] font-black tracking-tight text-[#1769e2] hover:underline sm:text-[18px]"
              >
                <Phone className="h-5 w-5 shrink-0" />
                0247 309 9899
              </a>
              <div className="mt-4">
                <Image
                  src={ASSETS.footer.boCongThuong}
                  alt="Đã thông báo Bộ Công Thương"
                  width={200}
                  height={65}
                  className="h-14 w-auto object-contain sm:h-16"
                />
              </div>
            </div>
          </nav>

          {/* ── COL 3: NGÀNH NGHỀ (2 COLS) ── */}
          <nav className="lg:col-span-2" aria-label="Ngành nghề">
            <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-2 lg:border-b-0 lg:pb-0">
              <Link
                href="/industries"
                className="group inline-flex items-center gap-1 text-[14px] font-extrabold uppercase tracking-wider text-[#151b2a] transition-colors hover:text-[#1769e2] sm:text-[15px]"
              >
                {t('industriesTitle')}
                <ChevronRight className="h-4 w-4 text-slate-800 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="hidden h-[2px] w-8 bg-[#bfd3ec] lg:block" />
            </div>

            <ul className="space-y-2 text-[13px] sm:text-[14px]">
              <li>
                <Link
                  href="/industries/electronics"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('indElectronics')}
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/pharma-medical"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('indPharma')}
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/food"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('indFood')}
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/construction-hvac"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('indMachinery')}
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('indLab')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* ── COL 4: SẢN PHẨM, LANGUAGE SWITCHER & QR CARD (3 COLS) ── */}
          <nav className="lg:col-span-3" aria-label="Sản phẩm">
            <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-2 lg:border-b-0 lg:pb-0">
              <Link
                href="/solutions"
                className="group inline-flex items-center gap-1 text-[14px] font-extrabold uppercase tracking-wider text-[#151b2a] transition-colors hover:text-[#1769e2] sm:text-[15px]"
              >
                {t('productsTitle')}
                <ChevronRight className="h-4 w-4 text-slate-800 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="hidden h-[2px] w-8 bg-[#bfd3ec] lg:block" />
            </div>

            <ul className="space-y-2 text-[13px] sm:text-[14px]">
              <li>
                <Link
                  href="/solutions/categories/cleanroom-consumables"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('prodCleanroom')}
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/categories/industrial-packaging"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('prodPackaging')}
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/categories/esd-supplies"
                  className="text-[#4d5969] transition-colors hover:text-[#1769e2]"
                >
                  {t('prodHvac')}
                </Link>
              </li>
            </ul>

            {/* Language Switcher */}
            <div className="mt-5">
              <FooterLocaleSwitcher />
            </div>

            {/* QR Card */}
            <div className="mt-5 rounded-lg border border-[#dfe8f3] bg-[#eaf1fa] p-4 text-center">
              <strong className="block text-[15px] font-bold text-[#172033]">
                {t('downloadApp')}
              </strong>
              <div className="relative mx-auto mt-2.5 h-32 w-32 rounded bg-white p-1">
                <Image
                  src={ASSETS.footer.qrCode}
                  alt="Mã QR tải ứng dụng ULink"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* ── BOTTOM BAR: COPYRIGHT & LEGAL LINKS ── */}
      <div className="border-t border-[#d7e1ed] bg-[#eaf1fa] py-4">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-3 px-4 text-[11px] text-[#748196] sm:flex-row sm:px-8 sm:text-[12px]">
          <span>{t('copyright')}</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-[#1769e2]">
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#1769e2]">
              {t('termsOfUse')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

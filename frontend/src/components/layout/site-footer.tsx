import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { ASSETS } from '@/lib/assets';
import { FooterLocaleSwitcher } from './footer-locale-switcher';

export async function SiteFooter() {
  const t = await getTranslations('footer');

  return (
    <footer className="relative w-full overflow-hidden bg-[#f3f7fc] text-slate-800">
      {/* ── MAIN FOOTER CONTAINER ── */}
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 pb-12 sm:px-8 sm:pt-10 lg:pt-12 lg:pb-16">

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* ── 1. MOBILE LAYOUT (< md) ── EXACT MATCH FOR MOBILE SCREENSHOT */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <div className="block md:hidden space-y-6">
          {/* Section 1: Logo & Description */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={ASSETS.logo.main}
                alt="ULink Industries"
                width={300}
                height={150}
                className="h-20 w-auto object-contain"
              />
            </Link>

            <p className="mt-3 text-[13px] leading-relaxed text-[#485669]">
              {t('descLine1')}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-[#647084]">
              {t('descLine2')}
            </p>

            {/* Contact Details */}
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2.5 text-[13px] text-[#4d5a6b]">
                <MapPin className="h-5 w-5 shrink-0 text-[#1769e2] mt-0.5" />
                <div>
                  <strong className="font-bold text-slate-900">{t('hubTitle')}</strong>
                  <p className="mt-0.5 leading-snug">{t('hubAddress')}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[13px] text-[#4d5a6b]">
                <Mail className="h-5 w-5 shrink-0 text-[#1769e2]" />
                <a
                  href="mailto:contact@ulinkindustries.com"
                  className="text-[#4d5a6b] transition-colors hover:text-[#1769e2]"
                >
                  contact@ulinkindustries.com
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[13px] text-[#4d5a6b]">
                <Phone className="h-5 w-5 shrink-0 text-[#1769e2]" />
                <a
                  href="tel:02473099899"
                  className="text-[#4d5a6b] transition-colors hover:text-[#1769e2] font-medium"
                >
                  0247 309 9899
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d7e1ed]" />

          {/* Section 2: Navigation Links (Về chúng tôi, Ngành nghề, Sản phẩm) */}
          <div className="space-y-6">
            {/* Về chúng tôi */}
            <nav aria-label="Về chúng tôi">
              <Link
                href="/about"
                className="group inline-flex items-center gap-1 text-[14px] font-bold uppercase tracking-wider text-[#151b2a]"
              >
                <span>{t('aboutTitle')}</span>
              </Link>
              <ul className="mt-2.5 space-y-2 text-[13px]">
                <li>
                  <Link href="/regional-hubs/cum-1" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('aboutHub')}
                  </Link>
                </li>
                <li>
                  <Link href="/about/quality" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('aboutQuality')}
                  </Link>
                </li>
                <li>
                  <Link href="/about/sustainability" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('aboutSustainability')}
                  </Link>
                </li>
                <li>
                  <Link href="/about/standards" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('aboutSupply')}
                  </Link>
                </li>
                <li>
                  <Link href="/about/careers" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('aboutCareers')}
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Ngành nghề */}
            <nav aria-label="Ngành nghề">
              <Link
                href="/industries"
                className="group inline-flex items-center gap-1 text-[14px] font-bold uppercase tracking-wider text-[#151b2a]"
              >
                <span>{t('industriesTitle')}</span>
              </Link>
              <ul className="mt-2.5 space-y-2 text-[13px]">
                <li>
                  <Link href="/industries/electronics" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('indElectronics')}
                  </Link>
                </li>
                <li>
                  <Link href="/industries/pharma-medical" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('indPharma')}
                  </Link>
                </li>
                <li>
                  <Link href="/industries/food" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('indFood')}
                  </Link>
                </li>
                <li>
                  <Link href="/industries/construction-hvac" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('indMachinery')}
                  </Link>
                </li>
                <li>
                  <Link href="/industries" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('indLab')}
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Sản phẩm */}
            <nav aria-label="Sản phẩm">
              <Link
                href="/solutions"
                className="group inline-flex items-center gap-1 text-[14px] font-bold uppercase tracking-wider text-[#151b2a]"
              >
                <span>{t('productsTitle')}</span>
              </Link>
              <ul className="mt-2.5 space-y-2 text-[13px]">
                <li>
                  <Link href="/solutions/listProduct/categories/cleanroom-consumables" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('prodCleanroom')}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/listProduct/categories/industrial-packaging" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('prodPackaging')}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/listProduct/categories/esd-supplies" className="text-[#4d5969] hover:text-[#1769e2]">
                    {t('prodHvac')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="border-t border-[#d7e1ed]" />

          {/* Section 3: Become Distributor */}
          <div>
            <span className="inline-block rounded bg-[#e8f0fa] px-3 py-1 text-[13px] font-semibold text-[#3c4150]">
              {t('becomeDistributor')}
            </span>
            <div className="mt-2">
              <a
                href="tel:02473099899"
                className="inline-flex items-center gap-2 text-[20px] font-bold text-[#1769e2]"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#1769e2]" />
                0247 309 9899
              </a>
            </div>
          </div>

          <div className="border-t border-[#d7e1ed]" />

          {/* Section 4: Connect Socials & Logo Bộ Công Thương */}
          <div className="space-y-4">
            <p className="text-[13px] font-bold text-[#4b5666]">
              {t('connectSocials')}
            </p>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Image src={ASSETS.footer.linkedin} alt="LinkedIn" width={40} height={40} className="h-10 w-10 object-contain" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Image src={ASSETS.footer.facebook} alt="Facebook" width={40} height={40} className="h-10 w-10 object-contain" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <Image src={ASSETS.footer.youtube} alt="YouTube" width={40} height={40} className="h-10 w-10 object-contain" />
              </a>
            </div>
            <div>
              <Image
                src={ASSETS.footer.boCongThuong}
                alt="Đã thông báo Bộ Công Thương"
                width={260}
                height={68}
                className="h-14 w-auto object-contain"
                unoptimized
              />
            </div>
          </div>

          <div className="border-t border-[#d7e1ed]" />

          {/* Section 5: Language Switcher & QR Code Card */}
          <div className="space-y-4">
            <FooterLocaleSwitcher />
            <div className="rounded-[3px] border border-[#dfe8f3] bg-[#eaf1fa] p-4 text-center">
              <strong className="block text-[15px] font-semibold text-[#172033]">
                {t('downloadApp')}
              </strong>
              <div className="relative mx-auto mt-2.5 h-32 w-32 rounded bg-white p-1 shadow-xs">
                <Image
                  src={ASSETS.footer.qrCode}
                  alt="Mã QR tải ứng dụng ULink"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* ── 2. TABLET & DESKTOP LAYOUT (>= md) ──                      */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {/* ── 2. TABLET & DESKTOP LAYOUT (>= md) ──                      */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <div className="hidden md:grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-6 items-start">

          {/* ── COL 1: BRAND, CONTACT & SOCIALS (3 COLS ON DESKTOP) ── */}
          <section className="lg:col-span-3 lg:pr-2" aria-label="Thông tin ULink Industries">
            <Link href="/" className="inline-block">
              <Image
                src={ASSETS.logo.main}
                alt="ULink Industries"
                width={360}
                height={180}
                className="h-20 w-auto object-contain sm:h-24 md:h-24 lg:h-24"
              />
            </Link>

            <p className="mt-4 text-[13px] leading-relaxed text-[#485669]">
              {t('descLine1')}
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-[#647084]">
              {t('descLine2')}
            </p>

            {/* Address & Email */}
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-2.5 text-[13px] text-[#4d5a6b]">
                <MapPin className="h-5 w-5 shrink-0 text-[#1769e2] mt-0.5" />
                <div>
                  <strong className="font-bold text-slate-900">{t('hubTitle')}</strong>
                  <p className="mt-0.5 leading-snug">{t('hubAddress')}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[13px] text-[#4d5a6b]">
                <Mail className="h-5 w-5 shrink-0 text-[#1769e2]" />
                <a
                  href="mailto:contact@ulinkindustries.com"
                  className="text-[#4d5a6b] transition-colors hover:text-[#1769e2]"
                >
                  contact@ulinkindustries.com
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <p className="text-[13px] font-bold text-[#4b5666]">
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

            {/* On Tablet: Become Distributor & Bộ Công Thương show here */}
            <div className="block lg:hidden mt-6 pt-4 border-t border-[#d7e1ed]">
              <span className="block text-[13px] font-semibold text-[#4a5667]">
                {t('becomeDistributor')}
              </span>
              <a
                href="tel:02473099899"
                className="mt-1 inline-flex items-center gap-2 text-[18px] font-bold tracking-tight text-[#1769e2]"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#1769e2]" />
                0247 309 9899
              </a>
              <div className="mt-4">
                <Image
                  src={ASSETS.footer.boCongThuong}
                  alt="Đã thông báo Bộ Công Thương"
                  width={260}
                  height={68}
                  className="h-14 w-auto object-contain"
                  unoptimized
                />
              </div>
            </div>
          </section>

          {/* ── COL 2: VỀ CHÚNG TÔI, DISTRIBUTOR & BỘ CÔNG THƯƠNG (3 COLS ON DESKTOP) ── */}
          <nav className="lg:col-span-3 flex flex-col justify-between" aria-label="Về chúng tôi">
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-2">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-1.5 text-[15px] lg:text-[16px] font-bold uppercase tracking-wider text-[#151b2a] transition-colors hover:text-[#1769e2]"
                >
                  <span>{t('aboutTitle')}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#1769e2] transition-colors" />
                </Link>
              </div>

              <ul className="space-y-2.5 text-[13px] sm:text-[14px] lg:text-[15px]">
                <li>
                  <Link href="/regional-hubs/cum-1" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                    {t('aboutHub')}
                  </Link>
                </li>
                <li>
                  <Link href="/about/quality" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                    {t('aboutQuality')}
                  </Link>
                </li>
                <li>
                  <Link href="/about/sustainability" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                    {t('aboutSustainability')}
                  </Link>
                </li>
                <li>
                  <Link href="/about/standards" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                    {t('aboutSupply')}
                  </Link>
                </li>
                <li>
                  <Link href="/about/careers" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                    {t('aboutCareers')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* On Desktop: Become Distributor & Logo Bộ Công Thương */}
            <div className="hidden lg:block mt-8 pt-4 border-t border-[#d7e1ed]">
              <span className="block text-[13px] font-semibold text-[#4a5667]">
                {t('becomeDistributor')}
              </span>
              <a
                href="tel:02473099899"
                className="mt-1 inline-flex items-center gap-2 text-[18px] lg:text-[20px] font-bold tracking-tight text-[#1769e2] hover:underline"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#1769e2]" />
                0247 309 9899
              </a>
              <div className="mt-4">
                <Image
                  src={ASSETS.footer.boCongThuong}
                  alt="Đã thông báo Bộ Công Thương"
                  width={260}
                  height={68}
                  className="h-14 w-auto object-contain"
                  unoptimized
                />
              </div>
            </div>
          </nav>

          {/* ── COL 3: NGÀNH NGHỀ (2 COLS ON DESKTOP) ── */}
          <nav className="lg:col-span-2" aria-label="Ngành nghề">
            <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-2">
              <Link
                href="/industries"
                className="group inline-flex items-center gap-1.5 text-[15px] lg:text-[16px] font-bold uppercase tracking-wider text-[#151b2a] transition-colors hover:text-[#1769e2]"
              >
                <span>{t('industriesTitle')}</span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#1769e2] transition-colors" />
              </Link>
            </div>

            <ul className="space-y-2.5 text-[13px] sm:text-[14px] lg:text-[15px]">
              <li>
                <Link href="/industries/electronics" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                  {t('indElectronics')}
                </Link>
              </li>
              <li>
                <Link href="/industries/pharma-medical" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                  {t('indPharma')}
                </Link>
              </li>
              <li>
                <Link href="/industries/food" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                  {t('indFood')}
                </Link>
              </li>
              <li>
                <Link href="/industries/construction-hvac" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                  {t('indMachinery')}
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                  {t('indLab')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* ── COL 4: SẢN PHẨM & LANGUAGE SWITCHER (2 COLS ON DESKTOP) ── */}
          <nav className="lg:col-span-2" aria-label="Sản phẩm">
            <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-2">
              <Link
                href="/solutions"
                className="group inline-flex items-center gap-1.5 text-[15px] lg:text-[16px] font-bold uppercase tracking-wider text-[#151b2a] transition-colors hover:text-[#1769e2]"
              >
                <span>{t('productsTitle')}</span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#1769e2] transition-colors" />
              </Link>
            </div>

            <ul className="space-y-2.5 text-[13px] sm:text-[14px] lg:text-[15px]">
              <li>
                <Link href="/solutions/listProduct/categories/cleanroom-consumables" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                  {t('prodCleanroom')}
                </Link>
              </li>
              <li>
                <Link href="/solutions/listProduct/categories/industrial-packaging" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                  {t('prodPackaging')}
                </Link>
              </li>
              <li>
                <Link href="/solutions/listProduct/categories/esd-supplies" className="text-[#4d5969] transition-colors hover:text-[#1769e2]">
                  {t('prodHvac')}
                </Link>
              </li>
            </ul>

            {/* Language Switcher */}
            <div className="mt-8">
              <FooterLocaleSwitcher />
            </div>
          </nav>

          {/* ── COL 5: APP DOWNLOAD CARD (2 COLS ON DESKTOP) ── */}
          <section className="lg:col-span-2" aria-label="Tải ứng dụng">
            <div className="rounded-[3px] border border-[#dfe8f3] bg-[#eaf1fa] p-4 text-center">
              <strong className="block text-[15px] sm:text-[16px] lg:text-[18px] font-semibold text-[#172033]">
                {t('downloadApp')}
              </strong>
              <div className="relative mx-auto mt-3 h-36 w-36 rounded bg-white p-1 shadow-xs">
                <Image
                  src={ASSETS.footer.qrCode}
                  alt="Mã QR tải ứng dụng ULink"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── BOTTOM BAR: COPYRIGHT & LEGAL LINKS ── */}
      <div className="border-t border-[#d7e1ed] bg-[#eaf1fa] py-4">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-3 px-4 text-[11px] sm:text-[12px] lg:text-[14px] text-[#748196] sm:flex-row sm:px-8">
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

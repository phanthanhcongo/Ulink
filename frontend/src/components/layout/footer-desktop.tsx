import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { ASSETS } from '@/lib/assets';
import { FooterLocaleSwitcher } from './footer-locale-switcher';

export function FooterDesktop() {
  const t = useTranslations('footer');

  return (
    <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
      {/* ── COL 1: BRAND, CONTACT & SOCIALS (4 COLS ON DESKTOP) ── */}
      <section className="lg:col-span-4" aria-label="Thông tin ULink Industries">
        <div className="h-20 flex items-center mb-4">
          <Link href="/" className="inline-block">
            <Image
              src={ASSETS.logo.main}
              alt="ULink Industries"
              width={360}
              height={180}
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        <p className="text-[13px] leading-relaxed text-[#485669]">
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
              className="rounded-full overflow-hidden transition-transform hover:-translate-y-0.5"
              aria-label="LinkedIn"
            >
              <Image
                src={ASSETS.footer.linkedin}
                alt="LinkedIn"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full overflow-hidden transition-transform hover:-translate-y-0.5"
              aria-label="Facebook"
            >
              <Image
                src={ASSETS.footer.facebook}
                alt="Facebook"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full overflow-hidden transition-transform hover:-translate-y-0.5"
              aria-label="YouTube"
            >
              <Image
                src={ASSETS.footer.youtube}
                alt="YouTube"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            </a>
          </div>
        </div>
      </section>

      {/* ── COL 2: VỀ CHÚNG TÔI, DISTRIBUTOR & BỘ CÔNG THƯƠNG (2 COLS ON DESKTOP) ── */}
      <nav className="lg:col-span-2 flex flex-col justify-between" aria-label="Về chúng tôi">
        <div>
          <div className="h-20 flex items-center mb-4">
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 text-[16px] font-bold uppercase tracking-wider text-[#151b2a] transition-colors hover:text-[#1769e2]"
            >
              <span>{t('aboutTitle')}</span>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#1769e2] transition-colors" />
            </Link>
          </div>

          <ul className="space-y-2.5 text-[15px]">
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

        {/* Become Distributor & Logo Bộ Công Thương */}
        <div className="mt-8 pt-4">
          <span className="block text-[13px] font-semibold text-[#4a5667]">
            {t('becomeDistributor')}
          </span>
          <a
            href="tel:02473099899"
            className="mt-1 inline-flex items-center gap-2 text-[20px] font-bold tracking-tight text-[#1769e2] hover:underline"
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
        <div className="h-20 flex items-center mb-4">
          <Link
            href="/industries"
            className="group inline-flex items-center gap-1.5 text-[16px] font-bold uppercase tracking-wider text-[#151b2a] transition-colors hover:text-[#1769e2]"
          >
            <span>{t('industriesTitle')}</span>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#1769e2] transition-colors" />
          </Link>
        </div>

        <ul className="space-y-2.5 text-[15px]">
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
        <div className="h-20 flex items-center mb-4">
          <Link
            href="/solutions"
            className="group inline-flex items-center gap-1.5 text-[16px] font-bold uppercase tracking-wider text-[#151b2a] transition-colors hover:text-[#1769e2]"
          >
            <span>{t('productsTitle')}</span>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#1769e2] transition-colors" />
          </Link>
        </div>

        <ul className="space-y-2.5 text-[15px]">
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
        <div className="h-20 flex items-center justify-start mb-4">
          <strong className="block text-[16px] font-bold uppercase tracking-wider text-[#151b2a]">
            {t('downloadApp')}
          </strong>
        </div>
        <div className="rounded-[3px] bg-[#eaf1fa] p-4 text-left">
          <div className="relative h-32 w-32 rounded bg-white p-1 shadow-xs">
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
  );
}

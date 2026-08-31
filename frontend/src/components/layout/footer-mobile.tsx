import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { ASSETS } from '@/lib/assets';
import { FooterLocaleSwitcher } from './footer-locale-switcher';

export function FooterMobile() {
  const t = useTranslations('footer');

  return (
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
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-full overflow-hidden transition-transform hover:-translate-y-0.5" aria-label="LinkedIn">
            <Image src={ASSETS.footer.linkedin} alt="LinkedIn" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-full overflow-hidden transition-transform hover:-translate-y-0.5" aria-label="Facebook">
            <Image src={ASSETS.footer.facebook} alt="Facebook" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="rounded-full overflow-hidden transition-transform hover:-translate-y-0.5" aria-label="YouTube">
            <Image src={ASSETS.footer.youtube} alt="YouTube" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
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
  );
}

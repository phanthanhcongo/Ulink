import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FooterMobile } from './footer-mobile';
import { FooterTablet } from './footer-tablet';
import { FooterDesktop } from './footer-desktop';

export async function SiteFooter() {
  const t = await getTranslations('footer');

  return (
    <footer className="relative w-full overflow-hidden bg-[#f3f7fc] text-slate-800">
      {/* ── MAIN FOOTER CONTAINER ── */}
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 pb-12 sm:px-8 sm:pt-10 lg:pt-12 lg:pb-16">
        {/* 1. MOBILE VIEW (< md) */}
        <FooterMobile />

        {/* 2. TABLET VIEW (md to < lg) */}
        <FooterTablet />

        {/* 3. DESKTOP VIEW (>= lg) */}
        <FooterDesktop />
      </div>

      {/* ── BOTTOM BAR: COPYRIGHT & LEGAL LINKS (COMMON TO ALL VIEWPORTS) ── */}
      <div className="bg-[#eaf1fa] py-4">
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

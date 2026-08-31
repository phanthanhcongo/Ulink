import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { MobileNav } from './mobile-nav';
import { HeaderNav, type NavItem } from './header-nav';
import { HeaderAuthButton } from './header-auth-button';
import { CartBadge } from './cart-badge';
import { HeaderRfqButton } from './header-rfq-button';

import { getCurrentUser, isAdminUser } from '@/lib/auth-helpers';

/**
 * Header trang chủ — bám sát thiết kế Figma với Hover Dropdown Menu.
 */
export async function SiteHeader() {
  const t = await getTranslations('nav');
  const user = await getCurrentUser();
  const isAdmin = isAdminUser(user);

  const items: NavItem[] = [
    {
      href: '/regional-hubs',
      label: t('hubs'),
      children: [
        { href: '/regional-hubs/cum-2', label: 'Hub Hà Nam' },
      ]
    },
    { href: '/solutions', label: t('products') },
    { href: '/industries', label: t('industries') },
    { href: '/resources', label: t('resources') },
    { href: '/about', label: t('about') },
    ...(isAdmin ? [{ href: '/admin', label: t('adminDashboard') }] : [])
  ];

  return (
    <header className="relative bg-white border-b border-slate-100">
      <div className="mx-auto flex h-16 sm:h-20 md:h-[88px] w-full max-w-[1440px] items-center justify-between px-3 sm:px-6 lg:px-16">
        
        {/* ── MOBILE HEADER LAYOUT (< xl) ── */}
        <div className="flex w-full items-center justify-between xl:hidden relative">
          {/* Left: Hamburger Menu + Search */}
          <div className="flex items-center gap-1">
            <MobileNav items={items} />
            <Link
              href="/solutions/searchProduct"
              aria-label={t('search')}
              className="flex h-10 w-10 items-center justify-center text-slate-700 hover:text-brand transition-colors"
            >
              <Search className="h-6 w-6" />
            </Link>
          </div>

          {/* Center: Logo */}
          <Link
            href="/"
            aria-label="ULink Industries"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
          >
            <Image
              src={ASSETS.logo.full}
              alt="ULink Industries"
              width={280}
              height={76}
              priority
              className="h-14 sm:h-16 w-auto object-contain max-h-[56px] sm:max-h-[64px]"
            />
          </Link>

          {/* Right: User Icon + Cart */}
          <div className="flex items-center gap-1">
            <HeaderAuthButton />
            <Link
              href="/cart"
              aria-label={t('cart')}
              className="relative flex h-10 w-10 items-center justify-center text-slate-700 hover:text-brand transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <CartBadge />
            </Link>
          </div>
        </div>

        {/* ── DESKTOP HEADER LAYOUT (≥ xl) ── */}
        <div className="hidden w-full items-center justify-between gap-3 xl:flex">
          {/* Logo */}
          <Link href="/" aria-label="ULink Industries" className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.02]">
            <Image
              src={ASSETS.logo.full}
              alt="ULink Industries"
              width={196}
              height={54}
              priority
              className="h-14 w-auto sm:h-16 md:h-[72px] lg:h-[80px]"
            />
          </Link>

          {/* Menu chính dạng Hover Dropdown */}
          <HeaderNav items={items} />

          {/* Hành động bên phải: Search -> Cart -> Đặt hàng/RFQ -> Đăng nhập */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <Link
              href="/solutions/searchProduct"
              aria-label={t('search')}
              className="flex h-9 w-9 items-center justify-center rounded-[3px] text-foreground hover:bg-muted hover:text-brand transition-all duration-200 hover:scale-110 sm:h-10 sm:w-10"
            >
              <Search className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              aria-label={t('cart')}
              className="relative flex h-9 w-9 items-center justify-center rounded-[3px] text-foreground hover:bg-muted hover:text-brand transition-all duration-200 hover:scale-110 sm:h-10 sm:w-10"
            >
              <ShoppingCart className="h-5 w-5" />
              <CartBadge />
            </Link>

            <HeaderRfqButton label={t('quickOrder')} />
            <HeaderAuthButton />
          </div>
        </div>

      </div>
    </header>
  );
}

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Search, ShoppingCart, Heart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { MobileNav } from './mobile-nav';
import { HeaderAuthButton } from './header-auth-button';
import { CartBadge } from './cart-badge';
import { HeaderRfqButton } from './header-rfq-button';

import { getCurrentUser, isAdminUser } from '@/lib/auth-helpers';

/**
 * Header trang chủ — bám sát thiết kế Figma (node 2071:1118):
 * logo · menu (có chevron) · tìm kiếm · giỏ hàng (badge) · Đặt hàng nhanh · Đăng nhập.
 */
export async function SiteHeader() {
  const t = await getTranslations('nav');
  const user = await getCurrentUser();
  const isAdmin = isAdminUser(user);

  const items = [
    { href: '/regional-hubs', label: t('hubs') },
    { href: '/solutions', label: t('solutions') },
    { href: '/industries', label: t('industries') },
    { href: '/resources', label: t('resources') },
    { href: '/events', label: t('events') },
    { href: '/about', label: t('about') },
    ...(isAdmin ? [{ href: '/admin', label: t('adminDashboard') }] : [])
  ];

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-8 md:h-[88px] lg:px-16">
        {/* Logo */}
        <Link href="/" aria-label="ULink Industries" className="flex shrink-0 items-center">
          <Image
            src={ASSETS.logo.full}
            alt="ULink Industries"
            width={196}
            height={54}
            priority
            className="h-10 w-auto sm:h-12 md:h-[54px]"
          />
        </Link>

        {/* Menu chính — ẩn dưới md, hiện từ md trở lên */}
        <nav className="hidden flex-1 items-center justify-evenly md:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="whitespace-nowrap text-[13px] font-semibold text-foreground transition-colors hover:text-brand"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Hành động bên phải: Search -> Cart -> Đặt hàng/RFQ -> Đăng nhập */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          {/* Tìm kiếm */}
          <Link
            href="/products"
            aria-label={t('search')}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-muted hover:text-brand transition-colors"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Sản phẩm yêu thích (Wishlist) */}
          <Link
            href="/favorites"
            aria-label={t('favorites')}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-muted hover:text-brand transition-colors"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* Giỏ hàng với Badge */}
          <Link
            href="/cart"
            aria-label={t('cart')}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-muted hover:text-brand transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <CartBadge />
          </Link>

          {/* Nút Đặt hàng/RFQ */}
          <HeaderRfqButton label={t('quickOrder')} />

          {/* Nút Đăng nhập / Account */}
          <HeaderAuthButton />

          {/* Mobile nav — hiện dưới md */}
          <MobileNav items={items} />
        </div>
      </div>
    </header>
  );
}

import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ASSETS } from '@/lib/assets';
import { MobileNav } from './mobile-nav';
import { HeaderNav, type NavItem, type NavCategoryItem, type NavRegionItem } from './header-nav';
import { HeaderAuthButton } from './header-auth-button';
import { CartBadge } from './cart-badge';
import { HeaderRfqButton } from './header-rfq-button';

import { getCurrentUser, isAdminUser } from '@/lib/auth-helpers';
import { fetchTopCategoriesWithProducts } from '@/lib/product-data';
import { getTranslatedName, getTranslatedField } from '@/lib/i18n-content';
import { fetchRegionalHubs } from '@/lib/regional-hub-data';

const colors = [
  'bg-blue-50 text-blue-600',
  'bg-violet-50 text-violet-600',
  'bg-indigo-50 text-indigo-600',
  'bg-orange-50 text-orange-600',
  'bg-teal-50 text-teal-600',
  'bg-amber-50 text-amber-600',
  'bg-emerald-50 text-emerald-600',
  'bg-rose-50 text-rose-600'
];

const categoryIconMapString: Record<string, string> = {
  'industrial-packaging': 'package',
  'cleanroom-gloves': 'hand',
  'cleanroom-chemicals': 'flask',
  'cleanroom-wipers': 'brush',
  'cleanroom-masks': 'shield',
  'cleanroom-apparel': 'layers',
  'esd-supplies': 'zap',
  'cleanroom-consumables': 'grid'
};

/**
 * Header trang chủ — bám sát thiết kế Figma với Hover Dropdown Menu.
 */
export async function SiteHeader() {
  const t = await getTranslations('nav');
  const user = await getCurrentUser();
  const isAdmin = isAdminUser(user);
  const locale = await getLocale();

  const items: NavItem[] = [
    {
      href: '/regional-hubs',
      label: t('hubs'),
      children: [
        { href: '/regional-hubs/cum-1', label: 'Cụm/KCN 1' },
        { href: '/regional-hubs/cum-2', label: 'Cụm/KCN 2' },
      ]
    },
    { href: '/solutions', label: t('products') },
    { href: '/industries', label: t('industries') },
    { href: '/resources', label: t('resources') },
    { href: '/about', label: t('about') },
    ...(isAdmin ? [{ href: '/admin', label: t('adminDashboard') }] : [])
  ];

  // Fetch dynamic categories and products for the megamenu
  let dynamicCategories: NavCategoryItem[] = [];
  try {
    const rawCategories = await fetchTopCategoriesWithProducts(8, 8);
    dynamicCategories = rawCategories.map((catData) => {
      const categoryName = getTranslatedName(catData.category, locale) || catData.category.name;
      return {
        id: catData.category.slug,
        name: categoryName,
        link: `/solutions/listProduct/categories/${catData.category.slug}`,
        products: catData.products.slice(0, 8).map((prod, prodIdx) => {
          const prodName = getTranslatedName(prod, locale) || prod.name;
          const prodDesc = getTranslatedField(prod, 'short_description', locale) || prod.short_description || '';
          return {
            title: prodName,
            description: prodDesc,
            icon: categoryIconMapString[catData.category.slug] || 'package',
            bgColor: colors[prodIdx % colors.length],
            slug: prod.slug
          };
        })
      };
    });
  } catch (err) {
    console.error('Error loading dynamic navigation categories:', err);
  }

  // Fetch dynamic regional hubs and industrial zones (KCN) for the megamenu
  let dynamicRegions: NavRegionItem[] = [];
  try {
    const rawHubs = await fetchRegionalHubs();
    dynamicRegions = rawHubs.map((hub, hubIdx) => {
      const hubName = getTranslatedName(hub, locale) || hub.name;
      return {
        id: hub.slug,
        name: hubName,
        link: '/regional-hubs',
        hubName: hubName,
        hubLink: hub.slug === 'binh-duong' || hub.slug === 'dong-nai' || hub.slug === 'long-an'
          ? '/regional-hubs/cum-2'
          : '/regional-hubs/cum-1',
        hubImage: hubIdx % 2 === 0
          ? '/images/regional_hubs/hub-2/hanam-warehouse-shelves.jpg'
          : '/images/regional_hubs/hub-1/binhduong-outside.jpg',
        hubs: hub.industrial_zones.slice(0, 8).map((zone, zoneIdx) => {
          const zoneName = getTranslatedName(zone, locale) || zone.name;
          return {
            title: zoneName,
            description: `Khu công nghiệp trọng điểm phục vụ sản xuất và phụ trợ tại ${hubName.replace('HUB ', '')}.`,
            icon: 'factory',
            bgColor: colors[zoneIdx % colors.length]
          };
        })
      };
    });
  } catch (err) {
    console.error('Error loading dynamic navigation hubs:', err);
  }

  return (
    <header className="relative bg-white border-b border-slate-100">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-8 md:h-[88px] lg:px-16">
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
        <HeaderNav items={items} categoriesData={dynamicCategories} regionsData={dynamicRegions} />

        {/* Hành động bên phải: Search -> Cart -> Đặt hàng/RFQ -> Đăng nhập */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          {/* Tìm kiếm */}
          <Link
            href="/solutions/listProduct"
            aria-label={t('search')}
            className="flex h-9 w-9 items-center justify-center rounded-[3px] text-foreground hover:bg-muted hover:text-brand transition-all duration-200 hover:scale-110 sm:h-10 sm:w-10"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Giỏ hàng với Badge */}
          <Link
            href="/cart"
            aria-label={t('cart')}
            className="relative flex h-9 w-9 items-center justify-center rounded-[3px] text-foreground hover:bg-muted hover:text-brand transition-all duration-200 hover:scale-110 sm:h-10 sm:w-10"
          >
            <ShoppingCart className="h-5 w-5" />
            <CartBadge />
          </Link>

          {/* Nút Đặt hàng/RFQ */}
          <HeaderRfqButton label={t('quickOrder')} />

          {/* Nút Đăng nhập / Account */}
          <HeaderAuthButton />

          {/* Mobile nav */}
          <MobileNav items={items} />
        </div>
      </div>
    </header>
  );
}

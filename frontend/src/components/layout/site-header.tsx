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
        { href: '/regional-hubs/ha-nam', label: 'KCN Đồng Văn I - Hà Nam', description: 'Trung tâm phân phối miền Bắc' },
        { href: '/regional-hubs/dong-van-2', label: 'KCN Đồng Văn II', description: 'Cụm công nghiệp vật liệu' },
        { href: '/regional-hubs/thang-long', label: 'KCN Thăng Long - Hà Nội', description: 'Cụm điện tử & cơ khí chính xác' },
        { href: '/regional-hubs/vsip-bac-ninh', label: 'KCN VSIP - Bắc Ninh', description: 'Cụm công nghệ cao & bán dẫn' },
        { href: '/regional-hubs', label: 'Tất cả Cụm / KCN →' }
      ]
    },
    {
      href: '/products',
      label: t('products'),
      children: [
        { href: '/products?category=cleanroom', label: 'Phòng sạch & ESD', description: 'Trang thiết bị & vật tư chống tĩnh điện' },
        { href: '/products?category=packaging', label: 'Bao bì & Đóng gói', description: 'Màng quấn, băng keo & phụ liệu đóng gói' },
        { href: '/products?category=cut-protection', label: 'Găng tay chống cắt', description: 'Găng tay bảo hộ lao động tiêu chuẩn' },
        { href: '/products?category=tapes', label: 'Băng keo công nghiệp', description: 'Băng keo nhôm, xốp & dán nền' },
        { href: '/products', label: 'Tất cả Sản phẩm →' }
      ]
    },
    {
      href: '/industries',
      label: t('industries'),
      children: [
        { href: '/industries#electronics', label: 'Điện tử & Bán dẫn', description: 'Giải pháp cho nhà máy linh kiện' },
        { href: '/industries#food', label: 'Thực phẩm & Đồ uống', description: 'Vật tư đạt chuẩn vệ sinh an toàn' },
        { href: '/industries#logistics', label: 'Logistics & Kho vận', description: 'Tối ưu đóng gói & lưu kho' },
        { href: '/industries#pharma', label: 'Dược phẩm & Y tế', description: 'Phòng sạch & vật tư y tế' },
        { href: '/industries', label: 'Tất cả Ngành nghề →' }
      ]
    },
    {
      href: '/resources',
      label: t('resources'),
      children: [
        { href: '/resources#catalogue', label: 'Catalogue sản phẩm', description: 'Tải xuống tài liệu tổng hợp' },
        { href: '/resources#msds', label: 'Tài liệu kỹ thuật & MSDS', description: 'Bảng chỉ dẫn an toàn hóa chất' },
        { href: '/resources#news', label: 'Tin tức & Chuyên gia', description: 'Xu hướng chuỗi cung ứng B2B' },
        { href: '/resources', label: 'Tất cả Tài nguyên →' }
      ]
    },
    {
      href: '/about',
      label: t('about'),
      children: [
        { href: '/about', label: 'Tổng quan doanh nghiệp', description: 'Giới thiệu về ULINK Industries' },
        { href: '/about#capabilities', label: 'Năng lực chuỗi cung ứng', description: 'Hệ thống kho vận & phân phối' },
        { href: '/about#quality', label: 'Chứng nhận ISO & Tiêu chuẩn', description: 'ISO 9001, 14001, RoHS' },
        { href: '/contact', label: 'Liên hệ & Hợp tác', description: 'Tư vấn giải pháp vật tư' }
      ]
    },
    ...(isAdmin ? [{ href: '/admin', label: t('adminDashboard') }] : [])
  ];

  return (
    <header className="bg-white border-b border-slate-100">
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

        {/* Menu chính dạng Hover Dropdown */}
        <HeaderNav items={items} />

        {/* Hành động bên phải: Search -> Cart -> Đặt hàng/RFQ -> Đăng nhập */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          {/* Tìm kiếm */}
          <Link
            href="/products"
            aria-label={t('search')}
            className="flex h-9 w-9 items-center justify-center rounded-[3px] text-foreground hover:bg-muted hover:text-brand transition-colors"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Giỏ hàng với Badge */}
          <Link
            href="/cart"
            aria-label={t('cart')}
            className="relative flex h-9 w-9 items-center justify-center rounded-[3px] text-foreground hover:bg-muted hover:text-brand transition-colors"
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

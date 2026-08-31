'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  UserRound,
  ShieldCheck,
  ChevronDown,
  MapPin,
  Package,
  Factory,
  FileText,
  Users,
  ArrowRight,
  LogOut,
  ClipboardList,
  Wrench,
  Briefcase,
  Archive,
  Milestone,
  Hand,
  Brush,
  ShoppingBag,
  Layers,
  Footprints,
  Recycle,
  Thermometer,
  Droplet,
  Zap,
  Cpu,
  Warehouse,
  Shield,
  Grid,
  Navigation
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTranslations } from 'next-intl';
import { isAdminUser } from '@/lib/auth';
import { ASSETS } from '@/lib/assets';
import { CartBadge } from './cart-badge';
import type { NavItem } from './header-nav';

interface MobileNavProps {
  items: NavItem[];
}

interface ItemMeta {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  subtitle: string;
  isFeatured?: boolean;
}

const ITEM_META_MAP: Record<string, ItemMeta> = {
  '/regional-hubs': {
    icon: MapPin,
    color: '#2168df',
    subtitle: 'Thông tin các Khu công nghiệp & Hub toàn quốc.',
    isFeatured: true
  },
  '/solutions': {
    icon: Package,
    color: '#16a66b',
    subtitle: 'Khám phá giải pháp và sản phẩm của chúng tôi.'
  },
  '/industries': {
    icon: Factory,
    color: '#9747e8',
    subtitle: 'Giải pháp theo từng ngành nghề cụ thể.'
  },
  '/resources': {
    icon: FileText,
    color: '#f07a11',
    subtitle: 'Blog, case studies và tài liệu kỹ thuật.'
  },
  '/about': {
    icon: Users,
    color: '#e93662',
    subtitle: 'Tìm hiểu về đội ngũ và sứ mệnh của chúng tôi.'
  }
};

/* ── RICH DESKTOP-STYLE DATA FOR MOBILE DROPDOWNS ── */
const RICH_MOBILE_NAV_DATA: Record<string, Array<{
  title: string;
  link: string;
  items: Array<{
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    slug?: string;
    link?: string;
  }>;
}>> = {
  '/solutions': [
    {
      title: 'Bao bì & Đóng gói',
      link: '/solutions/listProduct',
      items: [
        { title: 'Màng co POF', desc: 'Bao gói thực phẩm & hàng tiêu dùng', icon: Package, color: 'bg-blue-50 text-blue-600', slug: '/solutions/listProduct/mang-co-pof' },
        { title: 'Băng keo đóng gói', desc: 'Băng keo OPP, in logo, niêm phong', icon: Wrench, color: 'bg-violet-50 text-violet-600', slug: '/solutions/listProduct/bang-keo' },
        { title: 'Màng co PE', desc: 'Màng co nhiệt bọc kín chống bụi & ẩm', icon: FileText, color: 'bg-indigo-50 text-indigo-600', slug: '/solutions/listProduct/mang-co-pe' },
        { title: 'Màng quấn Pallet', desc: 'Màng stretch quấn pallet chịu lực', icon: Briefcase, color: 'bg-orange-50 text-orange-600', slug: '/solutions/listProduct/mang-quan-pallet' },
        { title: 'Thùng carton', desc: 'Thùng carton 3-5-7 lớp in flexo', icon: Users, color: 'bg-teal-50 text-teal-600', slug: '/solutions/listProduct/thung-carton' },
        { title: 'Màng HIPS/PP', desc: 'Khay chứa linh kiện chống tĩnh điện', icon: ClipboardList, color: 'bg-amber-50 text-amber-600', slug: '/solutions/listProduct/mang-hips-pp' },
        { title: 'Túi PE / HD', desc: 'Túi đựng hàng công nghiệp, túi lót thùng', icon: Archive, color: 'bg-emerald-50 text-emerald-600', slug: '/solutions/listProduct/tui-pe-hd' },
        { title: 'Pallet gỗ / nhựa', desc: 'Pallet EUR tiêu chuẩn xuất khẩu', icon: Milestone, color: 'bg-rose-50 text-rose-600', slug: '/solutions/listProduct/pallet' },
      ]
    },
    {
      title: 'Vật tư phòng sạch',
      link: '/solutions/listProduct',
      items: [
        { title: 'Găng tay phòng sạch', desc: 'Găng Nitrile, Latex chuẩn ISO', icon: Hand, color: 'bg-blue-50 text-blue-600' },
        { title: 'Giấy lau phòng sạch', desc: 'Giấy lau không bụi, khăn polyester', icon: Brush, color: 'bg-orange-50 text-orange-600' },
        { title: 'Túi phòng sạch', desc: 'Túi PE, túi chống tĩnh điện ESD', icon: ShoppingBag, color: 'bg-violet-50 text-violet-600' },
        { title: 'Quần áo phòng sạch', desc: 'Bộ áo liền quần, mũ trùm ESD', icon: Layers, color: 'bg-indigo-50 text-indigo-600' },
        { title: 'Bọc giày phòng sạch', desc: 'Bọc giày PE, CPE chống trượt', icon: Footprints, color: 'bg-emerald-50 text-emerald-600' },
        { title: 'Vật tư tiêu hao', desc: 'Bảng dính, sticky mat, swab bông', icon: Recycle, color: 'bg-amber-50 text-amber-600' },
      ]
    },
    {
      title: 'Băng keo Nhôm',
      link: '/solutions/listProduct',
      items: [
        { title: 'Băng keo nhôm chịu nhiệt', desc: 'Chịu nhiệt độ cao, dùng HVAC', icon: Thermometer, color: 'bg-rose-50 text-rose-600' },
        { title: 'Băng keo nhôm chống ẩm', desc: 'Chống thấm bảo vệ đường ống', icon: Droplet, color: 'bg-teal-50 text-teal-600' },
        { title: 'Băng keo nhôm dán ống gió', desc: 'Dán nối ống gió HVAC công nghiệp', icon: Zap, color: 'bg-blue-50 text-blue-600' },
        { title: 'Băng keo nhôm dẫn nhiệt', desc: 'Tản nhiệt cho linh kiện & bo mạch', icon: Cpu, color: 'bg-indigo-50 text-indigo-600' },
      ]
    }
  ],
  '/regional-hubs': [
    {
      title: 'KCN Trọng điểm Miền Bắc',
      link: '/regional-hubs',
      items: [
        { title: 'KCN Đình Vũ', desc: 'Hải Phòng, kết nối cảng biển quốc tế', icon: MapPin, color: 'bg-blue-50 text-blue-600' },
        { title: 'KCN Thăng Long', desc: 'Hà Nội, điện tử & lắp ráp ô tô', icon: Factory, color: 'bg-orange-50 text-orange-600' },
        { title: 'KCN Quế Võ', desc: 'Bắc Ninh, cơ khí & linh kiện', icon: Factory, color: 'bg-teal-50 text-teal-600' },
        { title: 'KCN Yên Phong', desc: 'Bắc Ninh, thủ phủ Samsung & hitech', icon: Factory, color: 'bg-violet-50 text-violet-600' },
      ]
    },
    {
      title: 'KCN Miền Trung',
      link: '/regional-hubs',
      items: [
        { title: 'KCN Phú Bài', desc: 'Thừa Thiên Huế, chế biến & hàng tiêu dùng', icon: MapPin, color: 'bg-blue-50 text-blue-600' },
        { title: 'KCN Hòa Khánh', desc: 'Đà Nẵng, đa ngành từ cơ khí đến thực phẩm', icon: Factory, color: 'bg-teal-50 text-teal-600' },
        { title: 'KCN Dung Quất', desc: 'Quảng Ngãi, lọc hóa dầu & công nghiệp nặng', icon: Factory, color: 'bg-violet-50 text-violet-600' },
      ]
    },
    {
      title: 'KCN Miền Nam',
      link: '/regional-hubs',
      items: [
        { title: 'KCN VSIP Bình Dương', desc: 'Quy mô 500ha, sản xuất đa ngành', icon: Users, color: 'bg-blue-50 text-blue-600' },
        { title: 'KCN Nhơn Trạch', desc: 'Đồng Nai, gần cảng Cát Lái', icon: Briefcase, color: 'bg-orange-50 text-orange-600' },
        { title: 'KCN Long Hậu', desc: 'Long An, kho vận & logistics xuất khẩu', icon: Navigation, color: 'bg-emerald-50 text-emerald-600' },
      ]
    },
    {
      title: 'Trung tâm Phân phối & HUB Hà Nam',
      link: '/regional-hubs/cum-2',
      items: [
        { title: 'HUB Hà Nam (Trung tâm Logistics)', desc: 'Kho logistics 10.000m² trung tâm Miền Bắc', icon: Warehouse, color: 'bg-orange-100 text-orange-600 font-bold', slug: '/regional-hubs/cum-2' },
        { title: 'Nhà máy bao bì ULink Hà Nam', desc: 'Sản xuất màng co, túi PE, khay nhựa & băng keo nhôm', icon: Factory, color: 'bg-blue-50 text-blue-600', slug: '/about' },
      ]
    }
  ],
  '/industries': [
    {
      title: 'Thực phẩm & Đồ uống',
      link: '/industries',
      items: [
        { title: 'Đóng gói thực phẩm khô', desc: 'Màng co, túi PE, bao bì gia vị & ngũ cốc', icon: Package, color: 'bg-blue-50 text-blue-600' },
        { title: 'Bao bì thực phẩm tươi sống', desc: 'Khay xốp, màng bọc thực phẩm, hút chân không', icon: ClipboardList, color: 'bg-blue-50 text-blue-600' },
        { title: 'Pallet & kệ hàng F&B', desc: 'Pallet nhựa thực phẩm, kệ kho lạnh', icon: Archive, color: 'bg-rose-50 text-rose-600' },
      ]
    },
    {
      title: 'Dược phẩm & Y tế',
      link: '/industries',
      items: [
        { title: 'Bao bì dược phẩm', desc: 'Màng nhôm ép vỉ, chai lọ nhựa dược', icon: Archive, color: 'bg-blue-50 text-blue-600' },
        { title: 'Vật tư phòng sạch y tế', desc: 'Khăn lau vô trùng, khẩu trang y tế', icon: Shield, color: 'bg-indigo-50 text-indigo-600' },
      ]
    },
    {
      title: 'Điện tử & Linh kiện',
      link: '/industries',
      items: [
        { title: 'Bao bì chống tĩnh điện ESD', desc: 'Túi shielding bag, túi bong bóng ESD', icon: Zap, color: 'bg-amber-50 text-amber-600' },
        { title: 'Khay chứa linh kiện', desc: 'Khay nhựa định hình ESD, hộp chống tĩnh điện', icon: Grid, color: 'bg-violet-50 text-violet-600' },
      ]
    },
    {
      title: 'Logistics & Vận tải',
      link: '/industries',
      items: [
        { title: 'Đóng gói pallet', desc: 'Màng quấn stretch film, dây đai PET', icon: Layers, color: 'bg-blue-50 text-blue-600' },
        { title: 'Túi khí chèn container', desc: 'Dunnage bag, hạt hút ẩm công nghiệp', icon: Briefcase, color: 'bg-orange-50 text-orange-600' },
      ]
    }
  ],
  '/resources': [
    {
      title: 'Chuyên ngành',
      link: '/resources',
      items: [
        { title: 'Hướng dẫn chọn màng co', desc: 'So sánh màng co POF, PE, PVC', icon: Package, color: 'bg-blue-50 text-blue-600' },
        { title: 'Tra cứu kích thước carton', desc: 'Bảng thông số thùng chuẩn', icon: ClipboardList, color: 'bg-blue-50 text-blue-600' },
        { title: 'Cẩm nang xuất khẩu', desc: 'Tiêu chuẩn ISPM15 & pallet xuất khẩu', icon: Briefcase, color: 'bg-orange-50 text-orange-600' },
      ]
    },
    {
      title: 'Tài liệu kỹ thuật',
      link: '/resources',
      items: [
        { title: 'TDS (Technical Data Sheet)', desc: 'Bảng thông số kỹ thuật chi tiết', icon: Archive, color: 'bg-blue-50 text-blue-600' },
        { title: 'MSDS (Material Safety)', desc: 'An toàn hóa chất & vật liệu', icon: Shield, color: 'bg-indigo-50 text-indigo-600' },
        { title: 'Bản vẽ CAD 2D/3D', desc: 'Thùng carton & pallet nhựa', icon: Grid, color: 'bg-sky-50 text-sky-600' },
      ]
    }
  ],
  '/about': [
    {
      title: 'Giới thiệu & Năng lực',
      link: '/about',
      items: [
        { title: 'Về ULink Industries', desc: '15 năm giải pháp bao bì công nghiệp', icon: Package, color: 'bg-blue-50 text-blue-600' },
        { title: 'Trung tâm phân phối Hà Nam', desc: 'Kho logistics 10.000m² phục vụ miền Bắc', icon: Factory, color: 'bg-blue-50 text-blue-600' },
        { title: 'Tiêu chuẩn ISO 9001:2015', desc: 'Hệ thống quản lý chất lượng quốc tế', icon: Shield, color: 'bg-indigo-50 text-indigo-600' },
      ]
    }
  ]
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const t = useTranslations('nav');
  const { status, user, logout } = useAuth();
  const isAdmin = isAdminUser(user);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const menuContent = (
    <>
      {/* Shade Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[9998] bg-[#0c1a2d]/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sheet Panel */}
      <aside
        aria-hidden={!open}
        aria-label="Menu điều hướng"
        className={`fixed inset-y-0 right-0 z-[9999] flex w-full max-w-[430px] flex-col bg-white shadow-[-24px_0_70px_rgba(15,34,58,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex h-[76px] shrink-0 items-center justify-between gap-3 border-b border-[#e4e9f0] px-4 py-3 bg-white/97">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Image
              src={ASSETS.logo.full}
              alt="ULink Industries"
              width={140}
              height={38}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/solutions/searchProduct"
              onClick={() => setOpen(false)}
              aria-label="Tìm kiếm"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f7fb] text-[#2168df] transition-colors hover:bg-blue-100"
            >
              <Search className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              aria-label="Giỏ hàng"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f7fb] text-[#2168df] transition-colors hover:bg-blue-100"
            >
              <ShoppingCart className="h-5 w-5" />
              <CartBadge />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2168df] text-white transition-colors hover:bg-[#1a55b8]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 overscroll-contain">
          <div className="mb-4 px-1 pt-1">
            <p className="text-[10px] font-extrabold tracking-[0.17em] text-[#2168df] uppercase mb-1">
              MENU
            </p>
            <h2 className="text-[25px] font-extrabold tracking-[-0.7px] text-[#152944]">
              Khám phá ULink
            </h2>
          </div>

          <nav className="grid gap-3">
            {items.map((it) => {
              const meta = ITEM_META_MAP[it.href] || {
                icon: Package,
                color: '#2168df',
                subtitle: 'Khám phá thông tin ULink'
              };
              const IconComp = meta.icon;
              const richSubGroups = RICH_MOBILE_NAV_DATA[it.href];
              const hasRichData = !!richSubGroups && richSubGroups.length > 0;
              const isExpanded = !!expandedItems[it.href];
              const isFeatured = meta.isFeatured;

              return (
                <div
                  key={it.href}
                  className={`relative flex flex-col rounded-[12px] border transition-all ${
                    isFeatured
                      ? 'border-2 border-[#2168df] bg-gradient-to-br from-[#f8fbff] to-[#f1f6fd] p-4 shadow-[inset_4px_0_0_#2168df]'
                      : 'border-[#e4e9f0] bg-white p-4 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 flex-1 min-w-0 group"
                    >
                      <div
                        className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[8px] border bg-white transition-transform group-hover:scale-105"
                        style={{ color: meta.color, borderColor: `${meta.color}40` }}
                      >
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <b className="text-[17.5px] font-bold text-[#152944] leading-tight group-hover:text-brand transition-colors">
                          {it.label}
                        </b>
                        <small className="mt-0.5 text-[12.5px] font-medium text-[#66717e] leading-snug">
                          {meta.subtitle}
                        </small>
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleExpand(it.href)}
                      className="p-1.5 text-slate-400 hover:text-brand transition-colors"
                      aria-label={`Toggle ${it.label}`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-brand' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 flex flex-col gap-3.5 border-t border-slate-100 pt-3">
                      {hasRichData ? (
                        richSubGroups.map((subGroup, sIdx) => (
                          <div key={sIdx} className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 px-1">
                              <div className="h-3.5 w-[3px] rounded-full bg-[#2168df]" />
                              <span className="text-[13px] font-bold text-[#152944] tracking-tight">
                                {subGroup.title}
                              </span>
                            </div>

                            <div className="grid gap-2 pl-2">
                              {subGroup.items.map((subItem, iIdx) => {
                                const SubIcon = subItem.icon;
                                return (
                                  <Link
                                    key={iIdx}
                                    href={subItem.slug || subItem.link || subGroup.link}
                                    onClick={() => setOpen(false)}
                                    className="flex items-start gap-3 rounded-lg border border-slate-100 bg-[#f8fafc]/70 p-2.5 transition-all hover:border-blue-200 hover:bg-blue-50/40 active:scale-[0.99]"
                                  >
                                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] ${subItem.color}`}>
                                      <SubIcon className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <span className="text-[13px] font-bold text-[#152944] leading-snug truncate">
                                        {subItem.title}
                                      </span>
                                      <span className="mt-0.5 text-[11px] font-medium text-[#66717e] leading-snug line-clamp-2">
                                        {subItem.desc}
                                      </span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))
                      ) : (
                        it.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="relative pl-3 text-[12.5px] font-medium text-[#566373] transition-colors hover:text-[#2168df] flex items-center gap-2"
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: meta.color }}
                            />
                            <span>{child.label}</span>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <Link
            href="/solutions"
            onClick={() => setOpen(false)}
            className="mt-5 flex min-h-[72px] items-center gap-3 rounded-[12px] border border-[#dfe6ef] bg-[#f4f8fd] p-3.5 transition-colors hover:bg-[#e8f2fc]"
          >
            <em className="not-italic text-[10px] font-extrabold px-2 py-1 rounded bg-[#d9efff] text-[#076caa] uppercase shrink-0">
              MỚI
            </em>
            <b className="text-[12.5px] font-bold text-[#152944] leading-snug flex-1">
              Giải pháp Tự động hóa sản xuất thông minh 2026
            </b>
            <ArrowRight className="h-4 w-4 text-[#2168df] shrink-0" />
          </Link>

          <div className="mt-5 flex flex-col gap-3 pt-4 border-t border-slate-100">
            {status === 'authenticated' && user ? (
              <div className="rounded-[12px] border border-blue-100 bg-[#f4f8fd] p-3.5 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2168df] text-white font-bold text-[15px]">
                    {(user.first_name?.[0] || user.email[0] || 'U').toUpperCase()}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[14px] font-bold text-[#152944] truncate">
                      {user.first_name
                        ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`
                        : user.email.split('@')[0]}
                    </span>
                    <span className="text-[12px] font-medium text-[#66717e] truncate">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid gap-1 border-t border-blue-100/70 pt-2.5">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-brand transition-colors hover:bg-white"
                    >
                      <ShieldCheck className="h-4 w-4 text-brand" />
                      <span>{t('adminDashboard') || 'Trang quản trị'}</span>
                    </Link>
                  )}
                  <Link
                    href="/my-rfqs"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-[#152944] transition-colors hover:bg-white"
                  >
                    <ClipboardList className="h-4 w-4 text-[#2168df]" />
                    <span>{t('myRfqs') || 'Yêu cầu báo giá của tôi'}</span>
                  </Link>
                  <Link
                    href="/sample-requests"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-[#152944] transition-colors hover:bg-white"
                  >
                    <Package className="h-4 w-4 text-[#2168df]" />
                    <span>{t('sampleRequests') || 'Yêu cầu mẫu sản phẩm'}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50 text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('logout') || 'Đăng xuất'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-[12px] border border-slate-200/80 bg-slate-50/80 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2168df]">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13.5px] font-bold text-[#152944] truncate">
                        Tài khoản ULink
                      </span>
                      <span className="text-[11.5px] font-medium text-[#66717e] truncate">
                        Đăng nhập để xem báo giá
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="shrink-0 rounded-lg bg-[#2168df] px-3.5 py-1.5 text-[12.5px] font-bold text-white transition-colors hover:bg-[#1a55b8]"
                  >
                    {t('login') || 'Đăng nhập'}
                  </Link>
                </div>
              </div>
            )}

            <Link
              href="/quick-order"
              onClick={() => setOpen(false)}
              className="min-h-[48px] w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2168df] text-white text-[13px] font-bold transition-colors hover:bg-[#1a55b8] shadow-sm"
            >
              <span>{t('quickOrder') || 'Yêu cầu báo giá'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        className="flex h-10 w-10 items-center justify-center text-slate-700 hover:text-brand transition-colors focus:outline-none xl:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {mounted && typeof document !== 'undefined'
        ? createPortal(menuContent, document.body)
        : null}
    </>
  );
}

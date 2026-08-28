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
  ArrowRight
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
  defaultSubs?: string[];
}

const ITEM_META_MAP: Record<string, ItemMeta> = {
  '/regional-hubs': {
    icon: MapPin,
    color: '#2168df',
    subtitle: 'Thông tin các Khu công nghiệp toàn quốc.',
    isFeatured: true,
    defaultSubs: ['Giao nhanh tới các KCN Miền Bắc', 'Trở thành Đối tác phân phối']
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

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const t = useTranslations('nav');
  const { status, user } = useAuth();
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

        {/* Scroll Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 overscroll-contain">
          {/* Intro */}
          <div className="mb-4 px-1 pt-1">
            <p className="text-[10px] font-extrabold tracking-[0.17em] text-[#2168df] uppercase mb-1">
              MENU
            </p>
            <h2 className="text-[25px] font-extrabold tracking-[-0.7px] text-[#152944]">
              Khám phá ULink
            </h2>
          </div>

          {/* Cards List */}
          <nav className="grid gap-2.5">
            {items.map((it) => {
              const meta = ITEM_META_MAP[it.href] || {
                icon: Package,
                color: '#2168df',
                subtitle: 'Khám phá thông tin ULink'
              };
              const IconComp = meta.icon;
              const hasChildren = it.children && it.children.length > 0;
              const isExpanded = !!expandedItems[it.href];
              const isFeatured = meta.isFeatured;

              if (isFeatured) {
                return (
                  <div
                    key={it.href}
                    className="relative flex flex-col min-h-[160px] rounded-[12px] border-2 border-[#2168df] bg-gradient-to-br from-[#f8fbff] to-[#f1f6fd] p-4 shadow-[inset_4px_0_0_#2168df] transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="flex items-start gap-3 flex-1 min-w-0 group"
                      >
                        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[8px] border border-[#2168df]/30 bg-white text-[#2168df] transition-transform group-hover:scale-105">
                          <IconComp className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <b className="text-[18px] font-extrabold text-[#152944] leading-tight group-hover:text-[#2168df] transition-colors">
                            {it.label}
                          </b>
                          <small className="mt-1 text-[12.5px] font-medium text-[#66717e] leading-snug">
                            {meta.subtitle}
                          </small>
                        </div>
                      </Link>

                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => toggleExpand(it.href)}
                          className="p-1 text-[#2168df] hover:scale-110 transition-transform"
                          aria-label={`Toggle ${it.label}`}
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={it.href}
                          onClick={() => setOpen(false)}
                          className="text-[#2168df] text-xl font-bold hover:translate-x-1 transition-transform"
                        >
                          ›
                        </Link>
                      )}
                    </div>

                    {/* Sub Items */}
                    <div className="mt-4 grid gap-2 border-t border-[#2168df]/15 pt-3">
                      {hasChildren
                        ? it.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="relative pl-3 text-[12px] font-semibold text-[#566373] transition-colors hover:text-[#2168df] flex items-center gap-2"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#2168df] shrink-0" />
                              <span>{child.label}</span>
                            </Link>
                          ))
                        : meta.defaultSubs?.map((sub, idx) => (
                            <div
                              key={idx}
                              className="relative pl-3 text-[12px] font-semibold text-[#566373] flex items-center gap-2"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#2168df] shrink-0" />
                              <span>{sub}</span>
                            </div>
                          ))}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={it.href}
                  className="relative flex flex-col rounded-[12px] border border-[#e4e9f0] bg-white p-4 shadow-2xs transition-all hover:border-slate-300"
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

                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => toggleExpand(it.href)}
                        className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                        aria-label={`Toggle ${it.label}`}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="text-slate-400 text-xl font-bold hover:text-brand hover:translate-x-1 transition-transform"
                      >
                        ›
                      </Link>
                    )}
                  </div>

                  {hasChildren && isExpanded && (
                    <div className="mt-3 grid gap-2 border-t border-slate-100 pt-2.5">
                      {it.children!.map((child) => (
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
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* News Banner */}
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

          {/* Footer Actions */}
          <div className="mt-5 grid grid-cols-[1fr_1.2fr] gap-2.5 pt-4 border-t border-slate-100">
            {status === 'authenticated' && user ? (
              <Link
                href={isAdmin ? '/admin' : '/my-rfqs'}
                onClick={() => setOpen(false)}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-lg border border-[#2168df] text-[#2168df] text-[13px] font-bold transition-colors hover:bg-blue-50"
              >
                <ShieldCheck className="h-4 w-4" />
                <span className="truncate">{isAdmin ? t('adminDashboard') : t('myRfqs')}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-lg border border-[#2168df] text-[#2168df] text-[13px] font-bold transition-colors hover:bg-blue-50"
              >
                <UserRound className="h-4 w-4" />
                <span>{t('login') || 'Đăng nhập'}</span>
              </Link>
            )}

            <Link
              href="/quick-order"
              onClick={() => setOpen(false)}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-lg bg-[#2168df] text-white text-[13px] font-bold transition-colors hover:bg-[#1a55b8] shadow-sm"
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
      {/* Hamburger button — visible on mobile and iPad Pro 11 (< xl) */}
      <button
        type="button"
        aria-label="Menu"
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2168df] text-white shadow-sm transition-all hover:bg-[#1a55b8] active:scale-95 xl:hidden"
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

'use client';

import React, { useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  Package,
  FileSpreadsheet,
  Users,
  Mail,
  LogOut,
  Menu,
  X,
  User,
  Layers,
  FolderTree,
  Sliders,
  MapPin,
  Home,
  ChevronLeft,
  ChevronRight,
  Factory
  ,ShoppingCart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

export function AdminSidebar({ isCollapsed = false, toggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      href: '/admin',
      label: 'Tổng quan',
      icon: LayoutDashboard,
      exact: true
    },
    {
      href: '/admin/orders',
      label: 'Quản lý Order',
      icon: ShoppingCart
    },
    {
      href: '/admin/inventory',
      label: 'Quản lý tồn kho',
      icon: Package
    },
    {
      href: '/admin/products',
      label: 'Sản phẩm',
      icon: Package
    },
    {
      href: '/admin/categories',
      label: 'Danh mục',
      icon: FolderTree
    },
    {
      href: '/admin/attributes',
      label: 'Thuộc tính',
      icon: Sliders
    },
    {
      href: '/admin/skus',
      label: 'Mã SKUs',
      icon: Layers
    },
    {
      href: '/admin/rfqs',
      label: 'Yêu cầu Báo giá',
      icon: FileSpreadsheet
    },
    {
      href: '/admin/hubs',
      label: 'Chi nhánh / Hubs',
      icon: MapPin
    },
    {
      href: '/admin/industrial-zones',
      label: 'Khu công nghiệp (KCN)',
      icon: Factory
    },
    {
      href: '/admin/users',
      label: 'Tài khoản User',
      icon: Users
    },
    {
      href: '/admin/contact-requests',
      label: 'Liên hệ gửi về',
      icon: Mail
    }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Top Header Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-sky-100 flex items-center justify-between px-5 z-30 md:hidden shadow-sm">
        <div className="flex items-center gap-2.5">
          <img src="/images/logo/ulink-mark.svg" alt="ULink" className="h-9 w-9 shrink-0 object-contain" />
          <span className="font-bold text-body-regular tracking-tight text-slate-900">
            ULink Admin
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-[3px] bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors border border-sky-100"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/45 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 bg-[#EFF6FF] text-[#162233] flex flex-col justify-between transition-all duration-300 ease-in-out md:translate-x-0 border-r border-[#D8E6F5] shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-20' : 'w-[228px]'
        )}
      >
        {/* Header Branding */}
        <div className={cn(
          "relative p-3 border-b border-sky-100 flex items-center bg-white/70 backdrop-blur-sm transition-all duration-300 min-h-[76px]",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-2.5 pr-20">
            <img src="/images/logo/ulink-logo.svg" alt="ULink Industries" className="h-12 w-[116px] shrink-0 object-contain object-left" />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-slate-900">
                  ULink Industries
                </span>
                <span className="text-caption-responsive text-sky-500 font-semibold uppercase tracking-widest mt-0.5">
                  Control Panel
                </span>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors border border-sky-150"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!isCollapsed && <div className="absolute right-2 top-1/2 hidden -translate-y-1/2 md:block">
            {toggleCollapse && <button
              onClick={toggleCollapse}
              title="Thu gọn Sidebar"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-colors border border-sky-200"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>}
          </div>}

          {isCollapsed && toggleCollapse && <div className="absolute right-2 top-3 hidden md:block">
              <button
                onClick={toggleCollapse}
                title="Mở rộng Sidebar"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-colors border border-sky-200"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin');

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center transition-all group',
                  isCollapsed
                    ? 'justify-center h-10 w-10 mx-auto rounded-[3px]'
                    : 'gap-3 px-3 py-2.5 rounded-[3px] text-sm font-bold',
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-300/40'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-sky-100/80'
                )}
              >
                <item.icon
                  className={cn(
                    'h-4 w-4 shrink-0 transition-transform group-hover:scale-105 duration-200',
                    isActive ? 'text-white' : 'text-sky-500 group-hover:text-sky-700'
                  )}
                />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer User Profile & Logout */}
        <div className={cn(
          "hidden",
          "p-3 border-t border-sky-100 bg-white/70 backdrop-blur-sm transition-all duration-300",
          isCollapsed ? "flex flex-col items-center gap-3" : ""
        )}>
          <Link
            href="/"
            title="Quay lại trang chủ website"
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center justify-center border border-sky-200 bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors",
              isCollapsed ? "h-9 w-9 rounded-[3px] mx-auto mb-2" : "w-full gap-2 rounded-[3px] px-3 py-2 text-xs font-bold mb-2"
            )}
          >
            <Home className="h-4 w-4" />
            {!isCollapsed && <span>Về Trang chủ Website</span>}
          </Link>

          <button
            onClick={handleLogout}
            title={isCollapsed ? "Đăng xuất" : undefined}
            className={cn(
              "flex items-center justify-center font-bold bg-sky-100 hover:bg-red-600 hover:text-white text-sky-700 border border-sky-200 transition-colors shadow-sm",
              isCollapsed ? "h-9 w-9 rounded-[3px]" : "gap-2 w-full px-4 py-2.5 rounded-[3px] text-caption-responsive"
            )}
          >
            <LogOut className="h-3.5 w-3.5" />
            {!isCollapsed && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

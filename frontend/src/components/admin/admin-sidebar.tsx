'use client';

import React, { useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  Package,
  FileSpreadsheet,
  FileCheck,
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
    // {
    //   href: '/admin/articles',
    //   label: 'Bài viết CMS',
    //   icon: FileText
    // },
    {
      href: '/admin/rfqs',
      label: 'Yêu cầu Báo giá',
      icon: FileSpreadsheet
    },
    {
      href: '/admin/sample-requests',
      label: 'Hàng mẫu thử',
      icon: FileCheck
    },
    {
      href: '/admin/users',
      label: 'Tài khoản User',
      icon: Users
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
      href: '/admin/subscribers',
      label: 'Đăng ký bản tin',
      icon: Mail
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
          <div className="w-8 h-8 rounded-[3px] bg-sky-600 flex items-center justify-center font-black text-white tracking-wider text-sm shadow-inner shadow-sky-300/40">
            U
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
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
          'fixed top-0 bottom-0 left-0 z-50 bg-gradient-to-b from-sky-50 via-white to-sky-50 text-slate-900 flex flex-col justify-between transition-all duration-300 ease-in-out md:translate-x-0 border-r border-sky-100 shadow-[0_20px_60px_rgba(56,189,248,0.08)]',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-20' : 'w-72'
        )}
      >
        {/* Header Branding */}
        <div className={cn(
          "p-5 border-b border-sky-100 flex items-center bg-white/70 backdrop-blur-sm transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[3px] bg-sky-600 flex items-center justify-center font-black text-white tracking-wider text-base shadow-inner shadow-sky-300/40 shrink-0">
              U
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-slate-900">
                  ULink Industries
                </span>
                <span className="text-[10px] text-sky-500 font-semibold uppercase tracking-widest mt-0.5">
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

          {!isCollapsed && (
            <div className="hidden md:flex gap-2">
              <Link
                href="/"
                title="Quay lại trang chủ website"
                className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-colors border border-sky-200"
              >
                <Home className="h-4 w-4" />
              </Link>
              {toggleCollapse && (
                <button
                  onClick={toggleCollapse}
                  title="Thu gọn Sidebar"
                  className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-colors border border-sky-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {isCollapsed && toggleCollapse && (
            <div className="hidden md:block">
              <button
                onClick={toggleCollapse}
                title="Mở rộng Sidebar"
                className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white transition-colors border border-sky-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
          {!isCollapsed ? (
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3.5 px-4 py-3 rounded-[3px] text-xs font-bold text-sky-700 bg-sky-100 hover:bg-sky-200 hover:text-sky-900 border border-sky-200 transition-all mb-4"
            >
              <Home className="h-4 w-4 text-sky-600" />
              <span>Về Trang chủ Website</span>
            </Link>
          ) : (
            <Link
              href="/"
              title="Về Trang chủ Website"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center h-10 w-10 mx-auto rounded-[3px] text-sky-700 bg-sky-100 hover:bg-sky-200 hover:text-sky-900 border border-sky-200 transition-all mb-4"
            >
              <Home className="h-4 w-4 text-sky-600" />
            </Link>
          )}

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
                    : 'gap-3.5 px-4 py-3 rounded-[3px] text-sm font-bold',
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
          "p-4 border-t border-sky-100 bg-white/70 backdrop-blur-sm transition-all duration-300",
          isCollapsed ? "flex flex-col items-center gap-3" : ""
        )}>
          {!isCollapsed ? (
            <div className="flex items-center gap-3 px-2 py-2 mb-4">
              <div className="w-9 h-9 rounded-[3px] bg-sky-100 flex items-center justify-center text-sky-600 border border-sky-200 shrink-0">
                <User className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.email}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold truncate capitalize mt-0.5">
                  {user?.role ? 'Administrator' : 'Sales Representative'}
                </span>
              </div>
            </div>
          ) : (
            <div
              className="w-9 h-9 rounded-[3px] bg-sky-100 flex items-center justify-center text-sky-600 border border-sky-200 shrink-0 cursor-default"
              title={user?.first_name ? `${user.first_name} ${user.last_name || ''} (${user?.role ? 'Administrator' : 'Sales Representative'})` : user?.email}
            >
              <User className="h-4.5 w-4.5" />
            </div>
          )}

          <button
            onClick={handleLogout}
            title={isCollapsed ? "Đăng xuất" : undefined}
            className={cn(
              "flex items-center justify-center font-bold bg-sky-100 hover:bg-red-600 hover:text-white text-sky-700 border border-sky-200 transition-colors shadow-sm",
              isCollapsed ? "h-9 w-9 rounded-[3px]" : "gap-2 w-full px-4 py-2.5 rounded-[3px] text-xs"
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

'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './admin-sidebar';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { Home, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem('admin_sidebar_collapsed');
    if (saved === 'true') {
      setIsCollapsed(true);
    }
    setMounted(true);
  }, []);

  const toggleCollapse = () => {
    const newVal = !isCollapsed;
    setIsCollapsed(newVal);
    localStorage.setItem('admin_sidebar_collapsed', String(newVal));
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] text-[#162233] flex flex-col md:flex-row">
      {/* Navigation panel */}
      <AdminSidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

      {/* Main content viewport with dynamic padding left */}
      <main
        className={cn(
          "flex-1 min-h-screen flex flex-col pt-16 md:pt-0 transition-all duration-300 ease-in-out",
          mounted && isCollapsed ? "md:pl-20" : "md:pl-[228px]"
        )}
      >
        <div className="flex-1 overflow-y-auto w-full">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-end gap-2 border-b border-[#E4E9F0] bg-white/90 px-4 backdrop-blur-md md:px-6">
            <div className="mr-2 hidden items-center gap-2 text-right sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-sky-200 bg-sky-100 text-sky-600"><User className="h-4 w-4" /></div>
              <div className="leading-tight"><p className="max-w-[150px] truncate text-xs font-bold text-slate-800">{user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.email || 'Admin User'}</p><p className="text-[10px] text-slate-500">{user?.role ? 'Administrator' : 'Sales Representative'}</p></div>
            </div>
            <Link href="/" title="Về trang chủ website" className="flex h-8 items-center gap-1.5 rounded-[3px] border border-sky-200 bg-sky-50 px-2.5 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-100"><Home className="h-3.5 w-3.5" /><span className="hidden sm:inline">Về website</span></Link>
            <button onClick={() => logout()} title="Đăng xuất" className="flex h-8 items-center gap-1.5 rounded-[3px] border border-sky-200 bg-sky-50 px-2.5 text-xs font-semibold text-sky-700 transition-colors hover:bg-red-600 hover:text-white"><LogOut className="h-3.5 w-3.5" /><span className="hidden sm:inline">Đăng xuất</span></button>
          </header>
          {/* Add responsive container for content */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

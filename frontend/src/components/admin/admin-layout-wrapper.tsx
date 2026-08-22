'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './admin-sidebar';
import { cn } from '@/lib/utils';

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row">
      {/* Navigation panel */}
      <AdminSidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

      {/* Main content viewport with dynamic padding left */}
      <main
        className={cn(
          "flex-1 min-h-screen flex flex-col pt-16 md:pt-0 transition-all duration-300 ease-in-out",
          mounted && isCollapsed ? "md:pl-20" : "md:pl-72"
        )}
      >
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}

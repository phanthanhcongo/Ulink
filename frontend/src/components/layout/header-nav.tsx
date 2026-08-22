'use client';

import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export interface NavSubChildItem {
  href: string;
  label: string;
}

export interface NavChildItem {
  href: string;
  label: string;
  description?: string;
  subChildren?: NavSubChildItem[];
}

export interface NavItem {
  href: string;
  label: string;
  children?: NavChildItem[];
}

interface HeaderNavProps {
  items: NavItem[];
}

export function HeaderNav({ items }: HeaderNavProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (href: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(href);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <nav className="hidden flex-1 items-center justify-evenly md:flex">
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = activeMenu === item.href;

        return (
          <div
            key={item.href}
            className="relative py-4"
            onMouseEnter={() => handleMouseEnter(item.href)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.href}
              className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${
                isOpen ? 'text-brand' : 'text-foreground hover:text-brand'
              }`}
            >
              {item.label}
              {hasChildren && (
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand' : 'text-slate-400'
                  }`}
                  aria-hidden="true"
                />
              )}
            </Link>

            {hasChildren && (
              <div
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-1 transition-all duration-200 z-50 ${
                  isOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="w-[260px] rounded-[3px] border border-slate-200/80 bg-white/95 p-2 shadow-lg backdrop-blur-md">
                  <div className="flex flex-col gap-0.5">
                    {item.children!.map((child) => {
                      const hasSub = child.subChildren && child.subChildren.length > 0;
                      if (hasSub) {
                        return (
                          <div key={child.href} className="flex flex-col rounded-[3px] px-3 py-2">
                            <span className="text-[13px] font-semibold text-slate-800">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 text-[11px] text-slate-500">
                                {child.description}
                              </span>
                            )}
                            <div className="mt-1 flex flex-col gap-0.5 pl-3 border-l border-slate-200">
                              {child.subChildren!.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setActiveMenu(null)}
                                  className="rounded-[3px] px-2 py-1.5 text-[12px] text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveMenu(null)}
                          className="group flex flex-col rounded-[3px] px-3 py-2 transition-colors hover:bg-slate-50"
                        >
                          <span className="text-[13px] font-semibold text-slate-800 transition-colors group-hover:text-brand">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-0.5 text-[11px] text-slate-500">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

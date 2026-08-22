'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu,
  X,
  UserRound,
  LogOut,
  FileText,
  Package,
  ClipboardList,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTranslations } from 'next-intl';
import { isAdminUser } from '@/lib/auth';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { NavItem } from './header-nav';

interface MobileNavProps {
  items: NavItem[];
}

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

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const menuContent = open && (
        <div className="fixed inset-0 z-[9999] md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          {/* Sheet from bottom */}
          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto bg-background pb-safe animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-sm font-semibold text-primary">Menu</span>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col px-5 py-3">
              {items.map((it) => {
                const hasChildren = it.children && it.children.length > 0;
                const isExpanded = !!expandedItems[it.href];

                return (
                  <div key={it.href} className="border-b border-border py-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="py-1 text-sm font-semibold text-primary transition-colors hover:text-brand"
                      >
                        {it.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(it.href)}
                          className="p-2 text-slate-500 hover:text-brand"
                          aria-label={`Toggle ${it.label}`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-brand' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {hasChildren && isExpanded && (
                      <div className="flex flex-col gap-1 pl-4 pt-1 pb-2">
                        {it.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="py-1 text-xs font-medium text-slate-600 transition-colors hover:text-brand"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Authentication links for Mobile */}
              {status === 'authenticated' && user ? (
                <>
                  <div className="py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4">
                    {t('account')}
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 border-b border-border py-3 text-sm font-bold text-brand transition-colors hover:text-brand"
                    >
                      <ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" />
                      {t('adminDashboard')}
                    </Link>
                  )}
                  <Link
                    href="/rfqs"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 border-b border-border py-3 text-sm text-primary transition-colors hover:text-brand"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    {t('rfqs')}
                  </Link>
                  <Link
                    href="/my-rfqs"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 border-b border-border py-3 text-sm text-primary transition-colors hover:text-brand"
                  >
                    <ClipboardList className="h-4 w-4" aria-hidden="true" />
                    {t('myRfqs')}
                  </Link>
                  <Link
                    href="/sample-requests"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 border-b border-border py-3 text-sm text-primary transition-colors hover:text-brand"
                  >
                    <Package className="h-4 w-4" aria-hidden="true" />
                    {t('sampleRequests')}
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 border-b border-border py-3 text-sm text-primary transition-colors hover:text-brand"
                  >
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                    {t('settings')}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 py-3 text-left text-sm text-destructive transition-colors hover:text-destructive/80"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    {t('logout')}
                  </button>
                </>
              ) : (
                status !== 'loading' && (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-6 w-full')}
                  >
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                    {t('login')}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      );

  return (
    <>
      {/* Hamburger button — visible below md */}
      <button
        type="button"
        aria-label="Menu"
        className="flex h-10 w-10 items-center justify-center text-primary md:hidden"
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


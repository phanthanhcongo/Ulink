'use client';

import { useTranslations } from 'next-intl';
import {
  UserRound,
  LogOut,
  ChevronDown,
  FileText,
  Package,
  ClipboardList,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth-context';
import { isAdminUser } from '@/lib/auth';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function HeaderAuthButton() {
  const t = useTranslations('nav');
  const { status, user, logout } = useAuth();
  const isAdmin = isAdminUser(user);

  // Loading placeholder
  if (status === 'idle' || status === 'loading') {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-muted sm:h-[38px] sm:w-[100px] sm:rounded-[3px]" />
    );
  }

  // Authenticated
  if (status === 'authenticated' && user) {
    const displayName = user.first_name
      ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`
      : user.email.split('@')[0];

    return (
      <>
        {/* Mobile View: Clean User Icon Link */}
        <Link
          href="/order-tracking"
          aria-label="Tài khoản"
          className="flex h-10 w-10 items-center justify-center text-slate-700 hover:text-brand transition-colors xl:hidden"
        >
          <UserRound className="h-6 w-6" />
        </Link>

        {/* Desktop View: Full Button with Dropdown */}
        <div className="hidden xl:flex group relative">
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'sm' }),
              'h-9 w-9 xl:h-[38px] xl:w-auto xl:px-3'
            )}
          >
            <span className="max-w-[120px] truncate">{displayName}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          </button>

          {/* Dropdown */}
          <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-[230px] w-max rounded-[4px] border border-border bg-card py-1.5 shadow-xl opacity-0 transition-all group-hover:visible group-hover:opacity-100">
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2.5 border-b border-border/80 px-4 py-2.5 text-[14px] font-bold text-brand transition-colors hover:bg-blue-50/80 whitespace-nowrap"
              >
                <ShieldCheck className="h-4 w-4 text-brand shrink-0" aria-hidden="true" />
                <span>{t('adminDashboard')}</span>
              </Link>
            )}
            <Link
              href="/order-tracking"
              className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-foreground transition-colors hover:bg-muted whitespace-nowrap font-medium"
            >
              <ShoppingBag className="h-4 w-4 text-brand shrink-0" aria-hidden="true" />
              <span>Danh sách đơn hàng</span>
            </Link>
            <Link
              href="/my-rfqs"
              className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-foreground transition-colors hover:bg-muted whitespace-nowrap font-medium"
            >
              <ClipboardList className="h-4 w-4 text-slate-500 shrink-0" aria-hidden="true" />
              <span>{t('myRfqs')}</span>
            </Link>
            <Link
              href="/sample-requests"
              className="flex items-center gap-2.5 px-4 py-2.5 text-[14px] text-foreground transition-colors hover:bg-muted whitespace-nowrap font-medium"
            >
              <Package className="h-4 w-4 text-slate-500 shrink-0" aria-hidden="true" />
              <span>{t('sampleRequests')}</span>
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[14px] text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600 whitespace-nowrap font-medium cursor-pointer border-t border-border/40 mt-1"
            >
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </>
    );
  }

  // Unauthenticated
  return (
    <>
      {/* Mobile View: Clean User Icon Link */}
      <Link
        href="/login"
        aria-label={t('login')}
        className="flex h-10 w-10 items-center justify-center text-slate-700 hover:text-brand transition-colors xl:hidden"
      >
        <UserRound className="h-6 w-6" />
      </Link>

      {/* Desktop View: Login Button */}
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'secondary', size: 'sm' }),
          'hidden xl:inline-flex border-brand text-brand hover:bg-brand/10 xl:h-[42px] xl:w-auto xl:px-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)]'
        )}
      >
        <UserRound className="h-4 w-4" aria-hidden="true" />
        <span className="text-button-responsive font-medium">{t('login')}</span>
      </Link>
    </>
  );
}


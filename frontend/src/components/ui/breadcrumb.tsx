import React from 'react';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BackLink {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  backLink?: BackLink;
  className?: string;
  theme?: 'light' | 'dark';
}

export function Breadcrumb({ items, backLink, className, theme = 'light' }: BreadcrumbProps) {
  const isDark = theme === 'dark';
  return (
    <div className={cn("page-container", className)}>
      {/* Breadcrumb Trail */}
      <nav
        aria-label="Breadcrumb"
        className={cn(
          "mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold",
          isDark ? "text-blue-200/90" : "text-slate-500"
        )}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              {idx > 0 && <span className={cn("font-normal", isDark ? "text-blue-200/40" : "text-slate-400")}>/</span>}
              {isLast || !item.href ? (
                <span className={cn("font-bold", isDark ? "text-white" : "text-slate-900")}>{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    isDark ? "hover:text-white" : "hover:text-brand"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Back Button */}
      {backLink && (
        <Link
          href={backLink.href}
          className={cn(
            "inline-flex items-center gap-2 text-xs font-extrabold transition-colors mb-8",
            isDark ? "text-blue-200/90 hover:text-white" : "text-slate-600 hover:text-brand"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          {backLink.label}
        </Link>
      )}
    </div>
  );
}

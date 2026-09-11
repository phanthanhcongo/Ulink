import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, viewAllHref, viewAllLabel, centered }: SectionHeaderProps) {
  if (centered) {
    return (
      <div className="text-center max-w-3xl mx-auto space-y-1 sm:space-y-2">
        <span className="text-section-title font-semibold sm:font-bold text-blue-600 block">
          {title}
        </span>
        <h2 className="text-section-title font-semibold sm:font-bold text-slate-900">
          {subtitle}
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex flex-col gap-0.5 shrink-0 justify-center">
            <span className="h-1 w-1 rounded-full bg-brand" />
            <span className="h-1 w-1 rounded-full bg-brand" />
            <span className="h-1 w-1 rounded-full bg-brand" />
          </div>
          <h2 className="text-section-title font-semibold text-primary truncate">
            {title}
          </h2>
        </div>
        {viewAllHref && viewAllLabel && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-caption-responsive font-semibold text-brand transition-colors hover:text-brand-strong shrink-0 whitespace-nowrap"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
      {subtitle && (
        <p className="mt-1 text-body-large text-muted-foreground sm:font-normal xl:font-normal">{subtitle}</p>
      )}
    </div>
  );
}

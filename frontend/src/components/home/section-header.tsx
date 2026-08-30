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
        <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-extrabold tracking-tight text-blue-600 leading-tight block">
          {title}
        </span>
        <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-extrabold tracking-tight text-slate-900 leading-tight">
          {subtitle}
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col gap-0.5 shrink-0 justify-center">
            <span className="h-1 w-1 rounded-full bg-brand" />
            <span className="h-1 w-1 rounded-full bg-brand" />
            <span className="h-1 w-1 rounded-full bg-brand" />
          </div>
          <h2 className="text-[20px] font-extrabold tracking-tight text-primary sm:text-[24px] lg:text-[28px] lg:font-semibold lg:leading-[36px]">
            {title}
          </h2>
        </div>
        <p className="mt-1 text-[12.5px] text-muted-foreground sm:text-[13px] lg:text-[18px] lg:font-normal lg:leading-[28px]">{subtitle}</p>
      </div>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-semibold text-brand transition-colors hover:text-brand-strong"
        >
          {viewAllLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

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
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2.5">
          <div className="flex flex-col gap-0.5 shrink-0 justify-center">
            <span className="h-1 w-1 rounded-full bg-brand" />
            <span className="h-1 w-1 rounded-full bg-brand" />
            <span className="h-1 w-1 rounded-full bg-brand" />
          </div>
          <h2 className="text-[22px] font-extrabold tracking-tight text-primary sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px]">
            {title}
          </h2>
        </div>
        <p className="mt-2 text-[12.5px] text-muted-foreground sm:text-[13px] lg:text-[14px] max-w-[700px] leading-relaxed">
          {subtitle}
        </p>
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
          <h2 className="text-[22px] font-extrabold tracking-tight text-primary sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px]">
            {title}
          </h2>
        </div>
        <p className="mt-1 text-[12.5px] text-muted-foreground sm:text-[13px] lg:text-[14px]">{subtitle}</p>
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

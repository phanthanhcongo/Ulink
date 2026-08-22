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
        <h2 className="text-[22px] font-extrabold tracking-tight text-primary sm:text-[26px] lg:text-[26px] xl:text-[30px] 2xl:text-[32px]">
          {title}
        </h2>
        <p className="mt-2 text-[12.5px] text-muted-foreground sm:text-[13px] lg:text-[13px] xl:text-[14px] max-w-[700px] leading-relaxed">
          {subtitle}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3">
        {/* 3 dots cyan accent indicator */}
        <div className="mt-1.5 flex flex-col gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="h-2 w-2 rounded-full bg-brand/60" />
          <span className="h-2 w-2 rounded-full bg-brand/30" />
        </div>
        <div>
          <h2 className="text-[22px] font-extrabold tracking-tight text-primary sm:text-[26px] lg:text-[26px] xl:text-[30px] 2xl:text-[32px]">
            {title}
          </h2>
          <p className="mt-1 text-[12.5px] text-muted-foreground sm:text-[13px] lg:text-[13px] xl:text-[14px]">{subtitle}</p>
        </div>
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

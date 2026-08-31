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
        <span className="text-[20px] leading-[28px] font-semibold sm:text-[24px] lg:text-[28px] xl:text-[32px] sm:font-bold tracking-tight text-blue-600 sm:leading-[32px] lg:leading-[36px] xl:leading-[40px] block">
          {title}
        </span>
        <h2 className="text-[20px] leading-[28px] font-semibold sm:text-[24px] lg:text-[28px] xl:text-[32px] sm:font-bold tracking-tight text-slate-900 sm:leading-[32px] lg:leading-[36px] xl:leading-[40px]">
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
          <h2 className="text-[18px] leading-[26px] font-semibold tracking-tight text-primary sm:text-[20px] sm:leading-[28px] lg:text-[24px] lg:leading-[32px] xl:text-[28px] xl:font-semibold xl:leading-[36px]">
            {title}
          </h2>
        </div>
        <p className="mt-1 text-[14px] leading-[20px] text-muted-foreground sm:text-[15px] sm:font-normal sm:leading-[22px] lg:text-[16px] lg:leading-[24px] xl:text-[18px] xl:font-normal xl:leading-[28px]">{subtitle}</p>
      </div>
      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2 text-[13px] font-semibold sm:text-[14px] lg:text-[15px] xl:text-[16px] sm:font-normal text-brand transition-colors hover:text-brand-strong"
        >
          {viewAllLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

import Image from 'next/image';

export interface SupportCardProps {
  title: string;
  desc: string;
  iconSrc?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function SupportCard({ title, desc, iconSrc, icon: IconComp }: SupportCardProps) {
  return (
    <div className="group relative flex flex-col border border-border bg-white p-4 shadow-sm sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_#1769E2,0_4px_20px_-4px_rgba(23,105,226,0.25)] hover:scale-[1.02] hover:bg-slate-50/20 hover:z-10">
      <div className="flex h-10 w-10 items-center justify-start text-blue-600">
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt={title}
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
        ) : IconComp ? (
          <IconComp className="h-9 w-9 stroke-[1.5]" aria-hidden="true" />
        ) : null}
      </div>
      <h4 className="mt-4 text-[14px] font-semibold sm:text-[16px] lg:text-[20px] sm:font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug sm:leading-[22px] lg:leading-[28px]">
        {title}
      </h4>
      <p className="mt-1.5 text-[13px] leading-relaxed sm:text-[13px] lg:text-[14px] sm:leading-[18px] lg:leading-[20px] text-slate-500 font-normal">
        {desc}
      </p>
    </div>
  );
}

import { ReactNode } from 'react';

interface AboutSectionHeaderProps {
  eyebrow: ReactNode;
  title: string;
  eyebrowColorClass?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function AboutSectionHeader({
  eyebrow,
  title,
  eyebrowColorClass = 'text-[#1769e2]',
  className = 'mb-8',
  align = 'left'
}: AboutSectionHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-3 ${
        align === 'center'
          ? 'items-start text-left sm:items-center sm:text-center'
          : 'items-start text-left'
      } ${className}`}
    >
      <span
        className={`text-base sm:text-lg lg:text-[20px] lg:leading-[28px] font-semibold ${eyebrowColorClass}`}
      >
        {eyebrow}
      </span>
      <h2 className="text-xl sm:text-3xl lg:text-[38px] lg:leading-[46px] font-bold tracking-[-0.6px] text-[#162233]">
        {title}
      </h2>
    </div>
  );
}

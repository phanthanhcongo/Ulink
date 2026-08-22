import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
}

export function Card({ className, strong = false, ...props }: CardProps) {
  return (
    <div
      className={cn(strong ? 'ui-surface-strong' : 'ui-surface', 'rounded-2xl', className)}
      {...props}
    />
  );
}

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva('ui-badge rounded-full', {
  variants: {
    variant: {
      solid: 'bg-brand text-brand-foreground',
      soft: 'bg-brand/10 text-brand',
      muted: 'bg-muted text-foreground',
      outline: 'border border-border bg-card text-foreground'
    }
  },
  defaultVariants: {
    variant: 'soft'
  }
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

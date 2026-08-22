import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'ui-btn rounded-[3px] transition-all disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'ui-btn-primary shadow-sm shadow-brand/20 hover:shadow-md hover:shadow-brand/25',
        secondary: 'ui-btn-secondary',
        ghost: 'ui-btn-ghost',
        soft: 'bg-brand/10 text-brand hover:bg-brand/15',
        danger: 'bg-red-600 text-white hover:bg-red-700'
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-11 px-4 text-sm',
        lg: 'h-12 px-5 text-sm',
        icon: 'h-9 w-9 p-0'
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), fullWidth && 'w-full', className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

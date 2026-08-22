import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || props['aria-invalid']}
        className={cn('ui-input rounded-[5px]', invalid && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10', className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

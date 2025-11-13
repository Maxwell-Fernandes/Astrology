import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, fullWidth, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'px-4 py-3 rounded-lg',
          'bg-surface-elevated border border-border-subtle',
          'text-white placeholder:text-white/40',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'border-red-500 focus:ring-red-500': error,
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

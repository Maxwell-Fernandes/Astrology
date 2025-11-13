import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, fullWidth, className, children, ...props }, ref) => {
    return (
      <div className={clsx('relative', { 'w-full': fullWidth })}>
        <select
          ref={ref}
          className={clsx(
            'appearance-none px-4 py-3 pr-10 rounded-lg',
            'bg-surface-elevated border border-border-subtle',
            'text-white',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            '[&>option]:bg-surface-elevated [&>option]:text-white [&>option]:py-2',
            {
              'border-red-500 focus:ring-red-500': error,
              'w-full': fullWidth,
            },
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = 'Select';

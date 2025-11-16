import { type SelectHTMLAttributes, forwardRef } from 'react';
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
          aria-invalid={error}
          className={clsx(
            'appearance-none px-4 py-3 pr-10 rounded-full',
            'bg-white border border-gray-300',
            'text-gray-800',
            'transition-all duration-200',
            'focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100',
            '[&>option]:bg-white [&>option]:text-gray-800 [&>option]:py-2',
            {
              'border-red-200 focus:border-red-300 focus:ring-red-200/20': error,
              'w-full': fullWidth,
            },
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = 'Select';

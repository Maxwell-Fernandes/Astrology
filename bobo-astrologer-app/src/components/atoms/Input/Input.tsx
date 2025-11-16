import { type InputHTMLAttributes, forwardRef } from 'react';
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
        aria-invalid={error}
        className={clsx(
          'px-4 py-3 rounded-full',
          'bg-white border border-gray-300',
          'text-gray-800 placeholder:text-gray-400',
          'transition-all duration-200',
          'focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100',
          {
            'border-red-200 text-red-600 focus:border-red-300 focus:ring-red-200/20': error,
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

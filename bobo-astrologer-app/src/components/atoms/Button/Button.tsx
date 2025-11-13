import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2',
        'font-semibold uppercase tracking-wide transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-primary-dark',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          // Variants
          'bg-accent-purple hover:bg-purple-700 text-white shadow-md hover:shadow-lg':
            variant === 'primary' && !disabled,
          'bg-transparent border-2 border-white/40 hover:border-white hover:bg-white/10 text-white':
            variant === 'secondary' && !disabled,
          'bg-transparent hover:bg-white/5 text-white': variant === 'ghost' && !disabled,

          // Sizes
          'px-4 py-2 text-sm rounded-md': size === 'sm',
          'px-6 py-3 text-base rounded-lg': size === 'md',
          'px-8 py-4 text-lg rounded-lg': size === 'lg',

          // Full width
          'w-full': fullWidth,

          // Hover effect
          'hover:-translate-y-0.5 active:translate-y-0': !disabled && !isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

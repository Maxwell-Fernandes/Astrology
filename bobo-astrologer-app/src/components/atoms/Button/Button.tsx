import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
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
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
      className={clsx(
        'inline-flex items-center justify-center gap-2',
        'font-medium transition-all',
        'focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          // Primary Button - Golden Gradient
          'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white shadow-md hover:shadow-lg':
            variant === 'primary' && !disabled,

          // Secondary Button - White with Golden Text
          'bg-white text-[#FFD700] border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md':
            variant === 'secondary' && !disabled,

          // Ghost Button - Transparent
          'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900':
            variant === 'ghost' && !disabled,

          // Sizes with full border radius
          'px-4 py-2 text-sm rounded-full': size === 'sm',
          'px-6 sm:px-8 py-3 sm:py-4 text-base rounded-full': size === 'md',
          'px-8 sm:px-10 py-4 sm:py-5 text-lg rounded-full': size === 'lg',

          // Full width
          'w-full': fullWidth,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
};

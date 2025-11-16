import { type HTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  highlighted?: boolean;
  gradient?: boolean;
}

export const Card = ({
  children,
  hover = false,
  highlighted = false,
  gradient = false,
  className,
  ...props
}: CardProps) => {
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={clsx(
          'rounded-[20px] p-6 sm:p-8',
          'transition-all duration-300',
          {
            // Standard white card
            'bg-white border border-gray-200 shadow-sm': !gradient && !highlighted,

            // Highlighted card with golden border
            'bg-white border-2 border-[#FFD700] shadow-lg': highlighted && !gradient,

            // Gradient background card
            'bg-gradient-to-r from-[#FFF7CC] to-[#FFE066] border-2 border-[#FFD700]':
              gradient,

            // Hover effects
            'hover:border-gray-300 hover:shadow-lg cursor-pointer':
              !highlighted && !gradient,
            'hover:shadow-xl cursor-pointer': highlighted || gradient,
          },
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={clsx(
        'rounded-[20px] p-6 sm:p-8',
        'transition-all duration-300',
        {
          // Standard white card
          'bg-white border border-gray-200 shadow-sm': !gradient && !highlighted,

          // Highlighted card with golden border
          'bg-white border-2 border-[#FFD700] shadow-lg': highlighted && !gradient,

          // Gradient background card
          'bg-gradient-to-r from-[#FFF7CC] to-[#FFE066] border-2 border-[#FFD700]':
            gradient,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

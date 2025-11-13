import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
}

export const Card = ({
  children,
  hover = false,
  glass = false,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={clsx(
        'rounded-xl p-6',
        'border border-border-subtle',
        'transition-all duration-300',
        {
          'bg-surface-elevated': !glass,
          'glass': glass,
          'hover:border-border-emphasis hover:-translate-y-1 hover:shadow-xl cursor-pointer':
            hover,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-luxe backdrop-blur-sm', className)}>
      {children}
    </div>
  );
}

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs uppercase tracking-wide text-gold-light', className)}>
      {children}
    </span>
  );
}

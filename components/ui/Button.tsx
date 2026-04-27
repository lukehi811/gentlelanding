import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Variant = 'gold' | 'outline-light' | 'outline-gold' | 'ghost-dark';

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-text-dark hover:bg-gold-light',
  'outline-light': 'border border-white/80 text-white hover:bg-white/10',
  'outline-gold': 'border border-gold text-gold hover:bg-gold/10',
  'ghost-dark': 'border border-text-dark/30 text-text-dark hover:bg-text-dark/5'
};

export function Button({ href, children, className, variant = 'gold', type = 'button', onClick }: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-medium transition duration-300',
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={base} onClick={onClick}>
      {children}
    </button>
  );
}

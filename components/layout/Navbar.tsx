'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Themed Stays', href: '/themed-stays' },
  { label: 'Stays', href: '/stays' },
  { label: 'About Us', href: '/about' },
  { label: 'Partner With Us', href: '/partner' }
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'bg-cream/95 text-text-dark shadow-lg backdrop-blur-xl' : 'bg-transparent text-white'
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="font-display text-3xl tracking-wide">
            Gentle Landing
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm tracking-wide transition',
                    isActive ? 'font-semibold underline decoration-gold underline-offset-8' : 'opacity-85 hover:opacity-100'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href="/stays" className="ml-2">
              Book Now
            </Button>
          </div>

          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-bg/95 px-8 pb-10 pt-28 text-white transition duration-300 md:hidden',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block font-display text-4xl">
                {item.label}
              </Link>
            ))}
          </div>
          <Button href="/stays" className="w-full">
            Book Now
          </Button>
        </div>
      </div>
    </>
  );
}

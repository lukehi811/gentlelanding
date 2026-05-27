import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Music2, MapPin, Mail } from 'lucide-react';
import type { SocialLinks } from '@/lib/site-content';

const navItems = [
  { label: 'Themed Stays', href: '/themed-stays' },
  { label: 'Stays', href: '/stays' },
  { label: 'About Us', href: '/about' },
  { label: 'Partner With Us', href: '/partner' }
];

type FooterProps = {
  brandDisplayName: string;
  logoSrc: string;
  email: string;
  socials: SocialLinks;
};

export function Footer({ brandDisplayName, logoSrc, email, socials }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-black py-14 text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4 md:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src={logoSrc}
              alt={brandDisplayName}
              width={52}
              height={52}
              className="h-12 w-auto"
            />
            <span className="font-display text-3xl">{brandDisplayName}</span>
          </Link>
          <p className="mt-3 text-sm text-cream/80">Luxury themed and premium stays in Kansas City.</p>
        </div>

        <div>
          <p className="mb-3 font-medium">Explore</p>
          <ul className="space-y-2 text-sm text-cream/80">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-medium">Connect</p>
          <div className="flex items-center gap-4 text-cream/80">
            <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-gold-light">
              <Music2 className="h-5 w-5" />
            </a>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold-light">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold-light">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-cream/80">
            <Mail className="h-4 w-4" /> <a href={`mailto:${email}`} className="hover:text-gold-light">{email}</a>
          </p>
        </div>

        <div>
          <p className="mb-3 font-medium">Based in Kansas City</p>
          <p className="flex items-start gap-2 text-sm text-cream/80">
            <MapPin className="mt-0.5 h-4 w-4" />
            Kansas City, MO
          </p>
          <p className="mt-6 text-xs text-cream/60">© {new Date().getFullYear()} Gentle Landing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

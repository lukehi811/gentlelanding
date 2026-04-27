import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import type { ReactNode } from 'react';
import '../styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '600']
});

const body = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600']
});

export const metadata: Metadata = {
  title: {
    default: 'Gentle Landing | Luxury Themed Rentals in Kansas City',
    template: '%s | Gentle Landing'
  },
  description:
    'Premium themed and luxury short-term rentals in Kansas City. Book immersive homes or large luxury properties for World Cup 2026 groups.',
  keywords: [
    'Kansas City rentals',
    'World Cup 2026 housing',
    'themed Airbnb',
    'luxury vacation rental Kansas City'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Gentle Landing',
    title: 'Gentle Landing | Luxury Themed Rentals in Kansas City',
    description:
      'Premium themed and luxury short-term rentals in Kansas City. Book immersive homes or large luxury properties for World Cup 2026 groups.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Gentle Landing',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kansas City',
      addressRegion: 'MO',
      addressCountry: 'US'
    },
    areaServed: 'Kansas City Metro',
    email: 'hello@gentlelandingkc.com',
    url: 'https://example.com'
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-bg text-text-light">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}

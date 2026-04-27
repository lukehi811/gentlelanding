import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        cream: 'var(--color-cream)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        'text-dark': 'var(--color-text-dark)',
        'text-light': 'var(--color-text-light)',
        muted: 'var(--color-muted)',
        'green-deep': 'var(--color-green-deep)',
        navy: 'var(--color-navy)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      boxShadow: {
        luxe: '0 20px 60px rgba(0, 0, 0, 0.25)'
      },
      keyframes: {
        heroFadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        heroFadeUp: 'heroFadeUp 0.9s ease forwards'
      }
    }
  },
  plugins: []
};

export default config;

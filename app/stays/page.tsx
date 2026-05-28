import Image from 'next/image';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { StaysFilterGrid } from '@/components/sections/StaysFilterGrid';
import { PageTransition } from '@/components/sections/PageTransition';
import { getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Luxury Stays',
  description: 'Spacious luxury homes in Kansas City for groups, events, and World Cup 2026 travelers.'
};

function isVideoSource(src: string) {
  const lower = src.toLowerCase();
  return lower.startsWith('data:video/') || ['.mp4', '.webm', '.ogg', '.mov', '.m4v'].some((ext) => lower.endsWith(ext));
}

export default async function StaysPage() {
  const { themedStays, luxuryStays, settings } = await getSiteContent();
  const allStays = [...themedStays, ...luxuryStays];
  const heroCoverSrc = settings.staysHeroCoverSrc || '/images/beautiful-3-king-bedrooms-retreat/exterior1.avif';
  const heroIsVideo = isVideoSource(heroCoverSrc);

  return (
    <PageTransition>
      <div className="pt-20">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        {heroIsVideo ? (
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="none">
            <source src={heroCoverSrc} />
          </video>
        ) : (
          <Image
            src={heroCoverSrc}
            alt={settings.staysHeroHeadline}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-center md:px-8">
          <Badge className="mx-auto border-gold/60 bg-gold/15 text-gold-light">{settings.staysHeroBadgeText}</Badge>
          <h1 className="mt-4 font-display text-6xl">{settings.staysHeroHeadline}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            {settings.staysHeroSubheadline}
          </p>
        </div>
      </section>

      <section className="bg-bg py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 rounded-[28px] border border-gold/30 bg-gradient-to-r from-gold/10 via-white/5 to-gold/10 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-gold-light">Flash Sale</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h2 className="font-display text-4xl">Select June and July dates are priced to move fast.</h2>
                <p className="mt-2 text-white/80">
                  These are the off-peak windows around the biggest World Cup demand dates, so guests can book quickly without paying peak-event pricing.
                </p>
              </div>
              <a href="/" className="inline-flex items-center justify-center rounded-full border border-gold px-5 py-3 text-sm font-medium text-gold transition hover:bg-gold/10">
                View Flash Sale Highlights
              </a>
            </div>
          </div>

          <StaysFilterGrid properties={allStays} />

          <div className="my-10 rounded-2xl border border-gold/40 bg-navy p-8 text-center">
            <h2 className="font-display text-5xl">Hosting for the World Cup?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/85">
              Stay near the stadium with group-ready accommodations, premium amenities, and flexible booking options.
            </p>
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
}

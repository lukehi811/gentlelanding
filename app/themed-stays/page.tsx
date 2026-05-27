import Image from 'next/image';
import { Metadata } from 'next';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { PageTransition } from '@/components/sections/PageTransition';
import { getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Themed Stays',
  description: 'Immersive themed short-term rentals across the Kansas City metro designed for magical, shareable experiences.'
};

export default async function ThemedStaysPage() {
  const { settings, themedStays } = await getSiteContent();

  return (
    <PageTransition>
      <div className="pt-20">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src={settings.themedHeroImage}
          alt="Themed stay hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-center md:px-8">
          <h1 className="font-display text-6xl">{settings.themedHeroHeadline}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            {settings.themedHeroSubheadline}
          </p>
        </div>
      </section>

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <PropertyGrid properties={themedStays} basePath="/themed-stays" />
          <div className="sticky bottom-4 mx-auto mt-8 w-fit rounded-full border border-gold/60 bg-black/70 px-5 py-2 text-sm text-gold-light backdrop-blur-md">
            Follow on TikTok @snazzy.stays
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
}

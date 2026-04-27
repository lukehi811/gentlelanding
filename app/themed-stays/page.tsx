import Image from 'next/image';
import { Metadata } from 'next';
import { themedStays } from '@/lib/data';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { PageTransition } from '@/components/sections/PageTransition';

export const metadata: Metadata = {
  title: 'Themed Stays',
  description: 'Immersive themed short-term rentals in Kansas City designed for magical, shareable experiences.'
};

export default function ThemedStaysPage() {
  return (
    <PageTransition>
      <div className="pt-20">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2000&q=80"
          alt="Themed stay hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-center md:px-8">
          <h1 className="font-display text-6xl">Live the Magic</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Our themed stays are unlike anywhere else on earth. Designed for dreamers, families, and anyone who believes in a little magic.
          </p>
        </div>
      </section>

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <PropertyGrid properties={themedStays} basePath="/themed-stays" />
          <div className="sticky bottom-4 mx-auto mt-8 w-fit rounded-full border border-gold/60 bg-black/70 px-5 py-2 text-sm text-gold-light backdrop-blur-md">
            📱 Follow us on TikTok @gentlelandingkc for tours
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
}

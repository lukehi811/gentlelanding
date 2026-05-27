import { Trophy, House } from 'lucide-react';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { Reveal } from '@/components/sections/Reveal';
import { themedStays, guestTestimonials } from '@/lib/data';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { WorldCupBanner } from '@/components/sections/WorldCupBanner';
import { TestimonialCarousel } from '@/components/sections/TestimonialCarousel';
import { FlashSaleSection } from '@/components/sections/FlashSaleSection';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/sections/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <Hero
        videoSrc="/videos/StadiumOverhead.mp4"
        posterImage="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80"
        headline="Game Day Starts Here."
        subheadline="Stay close to the action and make every moment count."
        ctaButtons={[
          { label: 'Explore Themed Stays', href: '/themed-stays', variant: 'gold' },
          { label: 'View All Homes', href: '/stays', variant: 'outline-light' }
        ]}
        badgeText="Hosting World Cup 2026 Groups? We’ve Got You."
        badgeHref="/stays"
      />

      <section className="bg-white py-14 text-text-dark">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-8">
          <Reveal>
            <Link href="/stays" className="block rounded-2xl border border-gold/30 bg-cream/60 p-6 transition hover:-translate-y-1 hover:shadow-luxe">
              <Trophy className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-3xl">World Cup Ready</h3>
              <p className="mt-3 text-text-dark/80">Large luxury homes in prime Kansas City locations for your entire match-day crew.</p>
            </Link>
          </Reveal>

          <Reveal>
            <Link href="/themed-stays" className="block rounded-2xl border border-gold/30 bg-cream/60 p-6 transition hover:-translate-y-1 hover:shadow-luxe">
              <h3 className="font-display text-3xl leading-tight">FLASH SALE — UP TO 40% OFF</h3>
              <p className="mt-3 text-text-dark/80">
                World Cup demand is rising fast. Lock in lower pricing before rates climb.
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-gold">View Flash Sale</p>
            </Link>
          </Reveal>

          <Reveal>
            <Link href="/stays" className="block rounded-2xl border border-gold/30 bg-cream/60 p-6 transition hover:-translate-y-1 hover:shadow-luxe">
              <House className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-3xl">Luxury You Can Trust</h3>
              <p className="mt-3 text-text-dark/80">Every property is professionally managed, immaculate, and guest-obsessed.</p>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-20">
        <Reveal className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="font-display text-5xl">Step Into Another World</h2>
          <p className="mt-4 text-white/80">
            Our themed homes are not just places to sleep — they are immersive experiences built to be remembered.
          </p>
        </Reveal>
        <div className="mx-auto mt-10 max-w-7xl px-4 md:px-8">
          <PropertyGrid properties={themedStays} basePath="/themed-stays" />
          <div className="mt-8 text-center">
            <Button href="/themed-stays" variant="outline-gold">
              See All Themed Stays →
            </Button>
          </div>
        </div>
      </section>

      <FlashSaleSection />

      <WorldCupBanner />

      <section className="bg-cream py-20 text-text-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <h2 className="font-display text-5xl">Why Book With Us</h2>
          </Reveal>
          <div className="mt-8">
            <TestimonialCarousel testimonials={guestTestimonials} />
          </div>
          <p className="mt-10 text-center text-sm uppercase tracking-[0.12em] text-text-dark/70">
            As seen on Airbnb · VRBO · Direct Book
          </p>
        </div>
      </section>

      <section className="bg-green-deep py-20">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <p className="font-display text-5xl">Own property in Kansas City?</p>
            <p className="mt-2 text-white/85">Get consistent rent from a tenant who treats your property like a flagship asset.</p>
          </div>
          <Button href="/partner" variant="outline-gold">
            Learn More →
          </Button>
        </Reveal>
      </section>
    </PageTransition>
  );
}

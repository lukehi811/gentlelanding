import { Castle, Trophy, House } from 'lucide-react';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { Reveal } from '@/components/sections/Reveal';
import { PropertyGrid } from '@/components/sections/PropertyGrid';
import { WorldCupBanner } from '@/components/sections/WorldCupBanner';
import { TestimonialCarousel } from '@/components/sections/TestimonialCarousel';
import { FlashSaleSection } from '@/components/sections/FlashSaleSection';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/sections/PageTransition';
import { getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

const featureIcons = {
  castle: Castle,
  trophy: Trophy,
  house: House
};

export default async function HomePage() {
  const { settings, themedStays, testimonials } = await getSiteContent();

  return (
    <PageTransition>
      <Hero
        videoSrc={settings.heroVideoSrc}
        posterImage={settings.heroPosterImage}
        headline={settings.heroHeadline}
        subheadline={settings.heroSubheadline}
        ctaButtons={[
          { label: 'Explore Themed Stays', href: '/themed-stays', variant: 'gold' },
          { label: 'View All Homes', href: '/stays', variant: 'outline-light' }
        ]}
        badgeText={settings.heroBadgeText}
        badgeHref={settings.heroBadgeHref}
      />

      <section className="bg-white py-14 text-text-dark">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-8">
          {settings.homeFeatures.map((item) => {
            const Icon = featureIcons[item.icon] ?? Castle;

            return (
              <Reveal key={item.title}>
                <Link href={item.href} className="block rounded-2xl border border-gold/30 bg-cream/60 p-6 transition hover:-translate-y-1 hover:shadow-luxe">
                  <Icon className="h-6 w-6 text-gold" />
                  <h3 className="mt-4 font-display text-3xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-text-dark/80">{item.body}</p>
                </Link>
              </Reveal>
            );
          })}
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
              <TestimonialCarousel testimonials={testimonials.guest} />
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

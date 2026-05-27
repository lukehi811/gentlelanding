import Image from 'next/image';
import { Metadata } from 'next';
import { teamMembers } from '@/lib/data';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { PageTransition } from '@/components/sections/PageTransition';
import { HighlightsGallery } from '@/components/sections/HighlightsGallery';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind Gentle Landing and the story behind our immersive, luxury stays.'
};

export default function AboutPage() {
  const highlights = [
    {
      image: '/images/galaxys-edge-retreat/livroom1.avif',
      title: "Galaxy's Edge Retreat",
      href: '/themed-stays/galaxys-edge-retreat'
    },
    {
      image: '/images/immersive-harry-potter-house/livroom1.avif',
      title: 'Immersive Harry Potter House',
      href: '/themed-stays/immersive-harry-potter-house'
    },
    {
      image: '/images/rapunzels-retreat/livroom1.avif',
      title: "Rapunzel's Retreat",
      href: '/themed-stays/rapunzels-retreat'
    },
    {
      image: '/images/game-day-basement-hangout/seclivroom1.jpeg',
      title: 'Game Day Basement Hangout',
      href: '/stays/game-day-basement-hangout'
    },
    {
      image: '/images/renovated-ranch-retreat/livingroom1.jpeg',
      title: 'Renovated Ranch Retreat',
      href: '/stays/renovated-ranch-retreat'
    },
    {
      image: '/images/beautiful-home-fenced-yard/exterior1.avif',
      title: 'Beautiful Home with Fenced Yard',
      href: '/stays/beautiful-home-fenced-yard'
    },
    {
      image: '/images/entire-home-2755sf-quiet-area/firstlivroom1.avif',
      title: 'Entire Home, 2755 SF, Quiet Area',
      href: '/stays/entire-home-2755sf-quiet-area'
    },
    {
      image: '/images/beautiful-3-king-bedrooms-retreat/livroom1.avif',
      title: 'Beautiful 3 King Bedrooms Retreat',
      href: '/stays/beautiful-3-king-bedrooms-retreat'
    }
  ];

  return (
    <PageTransition>
      <div className="pt-20">
      <section className="relative h-[58vh] min-h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80"
          alt="Team hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-center px-4 text-center md:px-8">
          <h1 className="font-display text-6xl">Meet the Team Behind the Magic</h1>
          <p className="mt-4 text-white/90">Friendly, local, and relentlessly focused on unforgettable guest experiences.</p>
        </div>
      </section>

      <section className="bg-cream py-16 text-text-dark">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="font-display text-5xl">Our Story</h2>
          <p className="mt-5 leading-relaxed text-text-dark/85">
            {/* TODO: Replace with client copy */}
            What started as a passion for creating incredible spaces quickly became something much bigger. We are two Kansas City locals who believe that where you stay shapes how you feel. We set out to build something different — homes that do not just house you, but transport you.
          </p>
        </div>
      </section>

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">Meet the Team</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="rounded-2xl border border-white/10 bg-surface p-6">
                <div className="relative h-56 overflow-hidden rounded-xl">
                  <Image src={member.image} alt={member.name} fill sizes="33vw" className="object-cover" />
                </div>
                <h3 className="mt-4 font-display text-3xl">{member.name}</h3>
                <p className="text-gold-light">{member.role}</p>
                <p className="mt-2 text-white/80">“{member.quote}”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">What We Stand For</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Craftsmanship', 'Every space is intentionally designed, not decorated by checklist.'],
              ['Guest Experience', 'We obsess over delight from first click to final checkout.'],
              ['Community', 'Local partnerships and KC pride are built into our hospitality model.'],
              ['Trustworthiness', 'Clear communication, clean operations, and consistent quality.']
            ].map(([title, body]) => (
              <article key={title} className="rounded-xl border border-white/10 bg-bg p-5">
                <h3 className="font-display text-3xl text-gold-light">{title}</h3>
                <p className="mt-2 text-white/80">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-deep py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">By the Numbers</h2>
          <StatsCounter
            className="mt-8"
            items={[
              { label: 'Homes Managed', value: 8, suffix: '+' },
              { label: 'Happy Guests', value: 1200, suffix: '+' },
              { label: 'Five-Star Reviews', value: 480, suffix: '+' }
            ]}
          />
        </div>
      </section>

      <section className="bg-cream py-16 text-text-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">Photo Gallery Highlights</h2>
          <p className="mt-3 max-w-2xl text-text-dark/80">
            Open any highlight to view it larger, then jump straight to the listing where that photo came from.
          </p>
          <HighlightsGallery highlights={highlights} />
        </div>
      </section>
      </div>
    </PageTransition>
  );
}

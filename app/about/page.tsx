import Image from 'next/image';
import { Metadata } from 'next';
import { teamMembers } from '@/lib/data';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { PageTransition } from '@/components/sections/PageTransition';
import { HighlightsGallery } from '@/components/sections/HighlightsGallery';
import { getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind Gentle Landing and the story behind our immersive, luxury stays.'
};

export default async function AboutPage() {
  const { settings, aboutHighlights } = await getSiteContent();

  return (
    <PageTransition>
      <div className="pt-20">
      <section className="relative h-[58vh] min-h-[420px] overflow-hidden">
        <Image
          src={settings.aboutHeroImage}
          alt="Team hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-center px-4 text-center md:px-8">
          <h1 className="font-display text-6xl">{settings.aboutHeroHeadline}</h1>
          <p className="mt-4 text-white/90">{settings.aboutHeroSubheadline}</p>
        </div>
      </section>

      <section className="bg-cream py-16 text-text-dark">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="font-display text-5xl">Our Story</h2>
          <p className="mt-5 leading-relaxed text-text-dark/85">
            {settings.aboutStory}
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
          <HighlightsGallery highlights={aboutHighlights} />
        </div>
      </section>
      </div>
    </PageTransition>
  );
}

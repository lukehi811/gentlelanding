import Image from 'next/image';
import { Metadata } from 'next';
import { ClipboardList, Home, ShieldCheck, Sparkles, Wrench, HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { PartnerForm } from '@/components/sections/PartnerForm';
import { landlordTestimonials } from '@/lib/data';
import { Star } from 'lucide-react';
import { PageTransition } from '@/components/sections/PageTransition';
import { getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Partner With Us',
  description: 'Consistent-rent leasing for Kansas City area homeowners who want reliable income and a tenant that cares for the property.'
};

export default async function PartnerPage() {
  const { settings } = await getSiteContent();

  const faqs = [
    { question: 'How do I get paid?', answer: 'We pay a consistent monthly rent just like a traditional lease, so you know what to expect without wondering how bookings performed.' },
    { question: 'What kind of properties do you look for?', answer: 'Clean, well-located homes in the Kansas City area that fit our guest standards and can be cared for like a long-term flagship property.' },
    { question: 'What happens if something gets damaged?', answer: 'We handle issues quickly, carry business coverage, and coordinate professional repairs so the property is protected and restored fast.' },
    { question: 'Will I be hearing from you all the time?', answer: 'Ideally, no. We set things up cleanly, take care of the day-to-day ourselves, and only reach out when something actually needs your input.' },
    { question: 'Do you help improve the property?', answer: 'Yes. We often furnish, style, and level up the home so it shows better, functions better, and stays in strong condition.' },
    { question: 'How are you different from a normal property manager?', answer: 'We are not asking you to chase upside or study reports. We are offering dependable rent, professional care, and a low-maintenance tenant relationship.' }
  ];

  return (
    <PageTransition>
      <div className="pt-20">
      <section className="relative h-[62vh] min-h-[440px] overflow-hidden">
        <Image
          src={settings.partnerHeroImage}
          alt="Luxury interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-center md:px-8">
          <h1 className="font-display text-6xl">{settings.partnerHeroHeadline}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">{settings.partnerHeroSubheadline}</p>
          <div className="mt-8">
            <Button href="#estimate">See If Your Home Fits</Button>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 text-text-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">Why Owners Reach Out</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              'You want reliable rent without wondering who will be living in your home next.',
              'You are tired of vacancies, turnovers, and the constant risk of a bad tenant.',
              'You want the property cared for, not just occupied.',
              'You want a professional tenant who keeps things smooth with maintenance and neighbors.'
            ].map((text) => (
              <div key={text} className="rounded-xl border border-black/10 bg-white p-5">
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">What We Actually Offer</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: HandCoins, title: 'Consistent Monthly Rent', body: 'Predictable lease income instead of revenue swings, vacancy gaps, or daily booking volatility.' },
              { icon: Home, title: 'Property Pride', body: 'We furnish, improve, and maintain the home like a long-term brand asset, not a disposable rental.' },
              { icon: Sparkles, title: 'Cleanliness & Upkeep', body: 'Professional cleans, proactive resets, and fast attention to the small things that usually get ignored.' },
              { icon: Wrench, title: 'Maintenance Handled', body: 'We take care of most routine maintenance coordination so small issues do not pile up on you.' },
              { icon: ShieldCheck, title: 'Neighbor-First Operations', body: 'We stay respectful, responsive, and low-drama so the property remains an asset in the community.' },
              { icon: ClipboardList, title: 'Minimal Owner Hassle', body: 'This is built to feel simple: dependable rent, clear communication, and very few reasons for us to bother you.' }
            ].map((item) => (
              <article key={item.title} className="rounded-xl border border-white/10 bg-surface p-5">
                <item.icon className="h-5 w-5 text-gold" />
                <h3 className="mt-3 text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-white/80">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-8">
          <h2 className="font-display text-5xl">Why Choose Us</h2>
          {[
            ['We think like operators, not just renters.', 'That means cleaner systems, quicker follow-through, and better care than most owners get from ordinary tenants.'],
            ['The property should improve while we are there.', 'We notice details, solve problems early, and keep the home presentation-ready instead of letting wear build up.'],
            ['The goal is peace and predictability.', 'Reliable rent, respectful communication, and as little owner involvement as possible once everything is in motion.']
          ].map(([title, body]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-bg p-6">
              <h3 className="font-display text-4xl text-gold-light">{title}</h3>
              <p className="mt-2 max-w-3xl text-white/80">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16 text-text-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">Landlord Testimonials</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {landlordTestimonials.map((item) => (
              <article key={item.name} className="rounded-xl border border-black/10 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-text-dark/70">{item.propertyType}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-3 text-text-dark/85">“{item.quote}”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">How It Works</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              ['1', 'Quick Fit Call', 'We learn about the property, confirm it fits our model, and walk through rent expectations.'],
              ['2', 'Simple Lease Setup', 'We put the agreement in place and create a clean operating plan from day one.'],
              ['3', 'We Upgrade & Care For It', 'Furnishing, maintenance coordination, cleanliness, and neighbor communication stay with us.'],
              ['4', 'You Collect Rent', 'The house performs, the lease stays steady, and you are not buried in constant updates.']
            ].map(([num, title, body]) => (
              <article key={num} className="rounded-xl border border-white/10 bg-surface p-5">
                <p className="font-display text-4xl text-gold">{num}</p>
                <h3 className="mt-2 text-lg">{title}</h3>
                <p className="mt-2 text-sm text-white/80">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 text-text-dark">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h2 className="font-display text-5xl">FAQ</h2>
          <div className="mt-6">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <section id="estimate" className="bg-green-deep py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-5xl">Want a Property Partner You Hardly Have to Think About?</h2>
            <p className="mt-4 text-white/85">If you want dependable rent, respectful communication, and a home that stays cared for, send the details and we will tell you if it is a fit.</p>
          </div>
          <PartnerForm />
        </div>
      </section>
      </div>
    </PageTransition>
  );
}

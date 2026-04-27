import Image from 'next/image';
import { Metadata } from 'next';
import { ChartNoAxesCombined, ClipboardList, Wrench, MessagesSquare, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { PartnerForm } from '@/components/sections/PartnerForm';
import { landlordTestimonials } from '@/lib/data';
import { Star } from 'lucide-react';
import { PageTransition } from '@/components/sections/PageTransition';

export const metadata: Metadata = {
  title: 'Partner With Us',
  description: 'Premium property management in Kansas City. Maximize returns with turnkey short-term rental operations.'
};

export default function PartnerPage() {
  const faqs = [
    { question: 'How much do you charge?', answer: 'Management fees vary by property profile. We provide a transparent proposal after your free estimate.' },
    { question: 'What kind of properties do you accept?', answer: 'We partner with homes that meet quality standards and fit our Kansas City guest demand profile.' },
    { question: 'What happens if something gets damaged?', answer: 'We coordinate guest claims, platform protections, and prompt repair workflows with owner approval.' },
    { question: 'How do I get paid?', answer: 'Payouts are sent on a regular schedule with clear monthly reporting.' },
    { question: 'Can I still use my property personally?', answer: 'Yes. Owner blocks are configurable around your schedule.' },
    { question: 'What makes you different from Vacasa or TurnKey?', answer: 'Boutique hospitality, local KC specialization, handcrafted design strategy, and high-touch communication.' }
  ];

  return (
    <PageTransition>
      <div className="pt-20">
      <section className="relative h-[62vh] min-h-[440px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-4 text-center md:px-8">
          <h1 className="font-display text-6xl">Your Property. Our Expertise. Exceptional Returns.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">We manage your home like it is our own — and we make it work harder for you.</p>
          <div className="mt-8">
            <Button href="#estimate">Get a Free Estimate</Button>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 text-text-dark">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">The Problem</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {['Tired of unreliable tenants?', 'Your property sitting empty?', 'No time for listings and guest communication?', 'Leaving money on the table during World Cup 2026?'].map((text) => (
              <div key={text} className="rounded-xl border border-black/10 bg-white p-5">
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-5xl">Our Solution</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: ClipboardList, title: 'Full Listing Management', body: 'Airbnb, VRBO, and direct booking setup with pricing optimization.' },
              { icon: Sparkles, title: 'Professional Cleaning & Turnover', body: 'Hotel-standard cleaning and property resets between stays.' },
              { icon: MessagesSquare, title: '24/7 Guest Communication', body: 'Responsive, hospitality-grade support for every reservation.' },
              { icon: Wrench, title: 'Maintenance Coordination', body: 'Fast issue handling and owner-approved escalation workflows.' },
              { icon: ChartNoAxesCombined, title: 'Revenue Optimization', body: 'Dynamic pricing to maximize annual earnings.' },
              { icon: Trophy, title: 'World Cup Opportunity', body: 'Special event strategy and promotion for 2026 demand spikes.' }
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
            ['We treat your home like our own.', 'Immaculate staging, proactive care, and standards that reflect luxury hospitality.'],
            ['Transparent. No surprises.', 'Owner reporting, communication, and approval workflows designed for peace of mind.'],
            ['Our guests come back.', 'Repeat bookings and high ratings from curated experiences that build long-term value.']
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
              ['1', 'Free Consultation', 'Tell us about your property and goals.'],
              ['2', 'Onboarding', 'We photograph, stage, list, and optimize.'],
              ['3', 'We Manage Everything', 'Guests, cleanings, maintenance, pricing — handled.'],
              ['4', 'You Earn', 'Receive regular payouts and transparent reports.']
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
            <h2 className="font-display text-5xl">Ready to Unlock Your Property’s Potential?</h2>
            <p className="mt-4 text-white/85">Limited partner spots available — especially ahead of World Cup 2026.</p>
          </div>
          <PartnerForm />
        </div>
      </section>
      </div>
    </PageTransition>
  );
}

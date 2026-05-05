import { ArrowRight, Zap } from 'lucide-react';
import { flashSaleOffers } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/sections/Reveal';

export function FlashSaleSection() {
  return (
    <section id="flash-sale" className="relative overflow-hidden bg-cream py-20 text-text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(176,141,87,0.22),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(9,43,47,0.12),_transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Badge className="border-text-dark/15 bg-white/70 text-text-dark">
              <Zap className="mr-2 h-4 w-4" /> June + July Flash Sale
            </Badge>
            <h2 className="mt-5 font-display text-5xl">Fast-book windows just outside the biggest game dates.</h2>
            <p className="mt-4 text-text-dark/80">
              We carved out a handful of June and July stays around the heaviest World Cup demand so guests can move fast, save money, and lock in a great home without the peak-weekend pricing.
            </p>
          </div>
          <Button href="/stays" variant="ghost-dark">
            See Sale-Ready Homes
          </Button>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {flashSaleOffers.map((offer) => (
            <Reveal key={offer.title}>
              <article className="flex h-full flex-col rounded-[28px] border border-text-dark/10 bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-text-dark/55">{offer.dateLabel}</p>
                <h3 className="mt-3 font-display text-4xl">{offer.title}</h3>
                <p className="mt-4 flex-1 text-text-dark/75">{offer.description}</p>
                <Button href={offer.href} variant="ghost-dark" className="mt-6 justify-between">
                  {offer.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { daysUntil } from '@/lib/utils';
import { StatsCounter } from '@/components/sections/StatsCounter';

export function WorldCupBanner() {
  const days = daysUntil(new Date('2026-06-11'));

  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1543357480-c60d40007a3f?auto=format&fit=crop&w=2000&q=80)'
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-8">
        <div>
          <Badge className="border-white/50 bg-white/10 text-white">FIFA WORLD CUP 2026 · KANSAS CITY</Badge>
          <h2 className="mt-5 font-display text-5xl">Kansas City Is Ready. Are You?</h2>
          <p className="mt-5 max-w-xl text-white/85">
            With Kansas City hosting World Cup 2026 matches, demand for quality group accommodations is at an all-time high.
            Our luxury homes sleep 8–16+ guests and are minutes from the action.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.12em] text-gold-light">{days} days until kickoff</p>
          <Button href="/stays" className="mt-7">
            Reserve Your World Cup Home
          </Button>
        </div>

        <div className="self-center rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
          <StatsCounter
            items={[
              { label: 'Guests per home', value: 16, prefix: '8–' },
              { label: 'Luxury homes available', value: 5, suffix: '+' },
              { label: 'Professionally managed', value: 100, suffix: '%' }
            ]}
          />
        </div>
      </div>
    </section>
  );
}

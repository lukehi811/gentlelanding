import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Property } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export function PropertyDetail({ property, mode }: { property: Property; mode: 'themed' | 'luxury' }) {
  const accent = mode === 'themed' ? 'text-gold-light' : 'text-white';

  return (
    <section className="rounded-2xl border border-white/10 bg-surface/70 p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        {property.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <h1 className="mt-5 font-display text-5xl">{property.name}</h1>
      <p className="mt-2 text-lg text-white/80">{property.tagline}</p>
      <p className="mt-6 max-w-3xl text-white/85">{property.description}</p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Info title="Price" value={`${formatCurrency(property.pricePerNight)}/night`} />
        <Info title="Sleeps" value={`${property.sleeps} guests`} />
        <Info title="Bedrooms" value={`${property.bedrooms}`} />
        <Info title="Bathrooms" value={`${property.bathrooms}`} />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button href={property.bookingUrl ?? '#'}>Book This Stay</Button>
        <Button href={mode === 'themed' ? '/themed-stays' : '/stays'} variant="outline-light" className={accent}>
          Back to Listings
        </Button>
      </div>
    </section>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-white/70">{title}</p>
      <p className="mt-2 font-medium">{value}</p>
    </div>
  );
}

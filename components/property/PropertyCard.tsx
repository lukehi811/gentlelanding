import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatApproxNightlyRate } from '@/lib/utils';

type PropertyCardProps = {
  property: Property;
  href: string;
};

export function PropertyCard({ property, href }: PropertyCardProps) {
  const location = property.city && property.state ? `${property.city}, ${property.state}` : property.neighborhood;

  return (
    <article className="property-card group overflow-hidden rounded-2xl border border-white/10 bg-surface">
      <Link href={href}>
        <div className="relative h-[400px] overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="card-image object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition group-hover:from-black/90" />
          <div className="absolute left-4 right-4 top-4 flex flex-wrap gap-2">
            {property.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full bg-black/45 px-3 py-1 text-xs text-white backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <p className="font-display text-3xl">{property.name}</p>
            <p className="text-sm text-white/80">{property.tagline}</p>
            {location ? <p className="mt-1 text-xs uppercase tracking-[0.1em] text-white/70">{location}</p> : null}
            <p className="mt-2 text-xs text-white/75">
              {property.bedrooms} BR · {property.bathrooms} BA · Sleeps {property.sleeps}
            </p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span>From {formatApproxNightlyRate(property.pricePerNight)}</span>
              <span className="inline-flex items-center gap-2 text-gold-light">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

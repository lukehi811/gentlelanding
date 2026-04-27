'use client';

import { useMemo, useState } from 'react';
import { Property } from '@/lib/types';
import { PropertyCard } from '@/components/property/PropertyCard';

type GridMode = 'grid' | 'list';

type SortMode = 'featured' | 'low-high' | 'popular';

export function StaysFilterGrid({ properties }: { properties: Property[] }) {
  const [guestFilter, setGuestFilter] = useState<'all' | '2-4' | '5-8' | '9-16+'>('all');
  const [worldCupOnly, setWorldCupOnly] = useState(false);
  const [sort, setSort] = useState<SortMode>('featured');
  const [view, setView] = useState<GridMode>('grid');

  const filtered = useMemo(() => {
    let result = [...properties];

    result = result.filter((property) => {
      if (guestFilter === '2-4') return property.sleeps <= 4;
      if (guestFilter === '5-8') return property.sleeps >= 5 && property.sleeps <= 8;
      if (guestFilter === '9-16+') return property.sleeps >= 9;
      return true;
    });

    if (worldCupOnly) {
      result = result.filter((property) => property.worldCupReady);
    }

    if (sort === 'low-high') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    }

    if (sort === 'popular') {
      result.sort((a, b) => b.sleeps - a.sleeps);
    }

    return result;
  }, [guestFilter, properties, sort, worldCupOnly]);

  return (
    <div>
      <div className="sticky top-20 z-30 mb-8 rounded-2xl border border-white/15 bg-black/70 p-4 backdrop-blur-md">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          <select
            className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm"
            value={guestFilter}
            onChange={(e) => setGuestFilter(e.target.value as typeof guestFilter)}
          >
            <option value="all">Guests: All</option>
            <option value="2-4">2–4</option>
            <option value="5-8">5–8</option>
            <option value="9-16+">9–16+</option>
          </select>
          <select className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm">
            <option>Bedrooms: Any</option>
            <option>3+</option>
            <option>4+</option>
            <option>5+</option>
          </select>
          <select className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm">
            <option>Price Range: Any</option>
            <option>$300+</option>
            <option>$500+</option>
          </select>
          <select
            className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
          >
            <option value="featured">Sort: Featured</option>
            <option value="low-high">Price Low-High</option>
            <option value="popular">Most Popular</option>
          </select>
          <label className="inline-flex items-center justify-center gap-2 rounded-lg border border-gold/60 bg-gold/10 px-3 py-2 text-sm text-gold-light">
            <input
              type="checkbox"
              checked={worldCupOnly}
              onChange={(e) => setWorldCupOnly(e.target.checked)}
            />
            World Cup Ready
          </label>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={() => setView('grid')}
            className={view === 'grid' ? 'rounded-full bg-gold px-4 py-1 text-sm text-black' : 'rounded-full border border-white/30 px-4 py-1 text-sm'}
          >
            Grid
          </button>
          <button
            onClick={() => setView('list')}
            className={view === 'list' ? 'rounded-full bg-gold px-4 py-1 text-sm text-black' : 'rounded-full border border-white/30 px-4 py-1 text-sm'}
          >
            List
          </button>
        </div>
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2' : 'grid grid-cols-1 gap-6'}>
        {filtered.map((property) => (
          <PropertyCard key={property.id} property={property} href={`/stays/${property.slug}`} />
        ))}
      </div>
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { Property } from '@/lib/types';
import { PropertyCard } from '@/components/property/PropertyCard';

type GridMode = 'grid' | 'list';

type SortMode = 'featured' | 'low-high' | 'popular';

export function StaysFilterGrid({ properties }: { properties: Property[] }) {
  const [guestFilter, setGuestFilter] = useState<'all' | 'up-to-4' | 'up-to-8' | 'up-to-16'>('all');
  const [bedroomFilter, setBedroomFilter] = useState<'all' | '3' | '4' | '5'>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [worldCupOnly, setWorldCupOnly] = useState(false);
  const [sort, setSort] = useState<SortMode>('featured');
  const [view, setView] = useState<GridMode>('grid');

  const filtered = useMemo(() => {
    let result = [...properties];
    const parsedMinPrice = minPrice ? Number(minPrice) : null;
    const parsedMaxPrice = maxPrice ? Number(maxPrice) : null;

    result = result.filter((property) => {
      if (guestFilter === 'up-to-4') return property.sleeps <= 4;
      if (guestFilter === 'up-to-8') return property.sleeps <= 8;
      if (guestFilter === 'up-to-16') return property.sleeps <= 16;
      return true;
    });

    result = result.filter((property) => {
      if (bedroomFilter === '3') return property.bedrooms >= 3;
      if (bedroomFilter === '4') return property.bedrooms >= 4;
      if (bedroomFilter === '5') return property.bedrooms >= 5;
      return true;
    });

    result = result.filter((property) => {
      if (parsedMinPrice !== null && property.pricePerNight < parsedMinPrice) return false;
      if (parsedMaxPrice !== null && property.pricePerNight > parsedMaxPrice) return false;
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
  }, [bedroomFilter, guestFilter, maxPrice, minPrice, properties, sort, worldCupOnly]);

  const clearFilters = () => {
    setGuestFilter('all');
    setBedroomFilter('all');
    setMinPrice('');
    setMaxPrice('');
    setWorldCupOnly(false);
    setSort('featured');
  };

  return (
    <div>
      <div className="sticky top-20 z-30 mb-8 rounded-2xl border border-white/15 bg-black/70 p-4 backdrop-blur-md">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
          <select
            className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm"
            value={guestFilter}
            onChange={(e) => setGuestFilter(e.target.value as typeof guestFilter)}
          >
            <option value="all">Guests: All</option>
            <option value="up-to-4">Up to 4</option>
            <option value="up-to-8">Up to 8</option>
            <option value="up-to-16">Up to 16</option>
          </select>
          <select
            className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm"
            value={bedroomFilter}
            onChange={(e) => setBedroomFilter(e.target.value as typeof bedroomFilter)}
          >
            <option value="all">Bedrooms: Any</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="Min price"
            className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm placeholder:text-white/45"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="Max price"
            className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm placeholder:text-white/45"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
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
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-white/70">Showing {filtered.length} {filtered.length === 1 ? 'home' : 'homes'}</p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={clearFilters}
              className="rounded-full border border-white/25 px-4 py-1 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Reset Filters
            </button>
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
      </div>

      {filtered.length ? (
        <div className={view === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2' : 'grid grid-cols-1 gap-6'}>
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} href={`/stays/${property.slug}`} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/20 bg-surface px-6 py-12 text-center">
          <h3 className="font-display text-3xl text-white">No homes match those filters.</h3>
          <p className="mt-3 text-white/75">Try widening the price range or clearing a few filters to see more options.</p>
        </div>
      )}
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Highlight = {
  image: string;
  title: string;
  href: string;
};

const INITIAL_VISIBLE = 6;

export function HighlightsGallery({ highlights }: { highlights: Highlight[] }) {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = expanded ? highlights : highlights.slice(0, INITIAL_VISIBLE);

  const goPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + highlights.length) % highlights.length);
  };

  const goNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % highlights.length);
  };

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <button
            key={`${item.href}-${item.image}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group overflow-hidden rounded-xl border border-black/10 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-52 overflow-hidden">
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <p className="font-display text-2xl text-text-dark">{item.title}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text-dark/65">Open Highlight</p>
            </div>
          </button>
        ))}
      </div>

      {highlights.length > INITIAL_VISIBLE ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-6 rounded-full border border-text-dark/30 px-5 py-2 text-sm font-semibold text-text-dark transition hover:bg-text-dark hover:text-cream"
        >
          {expanded ? 'Show fewer highlights' : 'Expand to see all highlights'}
        </button>
      ) : null}

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black">
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close highlight"
              className="absolute right-3 top-3 z-20 rounded-full bg-black/70 p-2 text-white hover:bg-black"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous highlight"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next highlight"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="relative h-[65vh] min-h-[360px]">
              <Image
                src={highlights[activeIndex].image}
                alt={highlights[activeIndex].title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/90 px-5 py-4 text-white">
              <p className="font-display text-3xl">{highlights[activeIndex].title}</p>
              <Link
                href={highlights[activeIndex].href}
                className="rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold-light transition hover:bg-gold/15"
              >
                View Listing
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

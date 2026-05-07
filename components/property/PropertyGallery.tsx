'use client';

import Image from 'next/image';
import { useState } from 'react';

const INITIAL_VISIBLE_THUMBNAILS = 8;

export function PropertyGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const visibleImages = expanded ? images : images.slice(0, INITIAL_VISIBLE_THUMBNAILS);
  const canExpand = images.length > INITIAL_VISIBLE_THUMBNAILS;

  return (
    <div>
      <div className="relative h-[380px] overflow-hidden rounded-2xl md:h-[520px]">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {visibleImages.map((image, index) => (
          <button
            key={image}
            onClick={() => setActive(index)}
            className={index === active ? 'ring-2 ring-gold' : 'opacity-75'}
            aria-label={`View image ${index + 1}`}
          >
            <div className="relative h-20 overflow-hidden rounded-lg">
              <Image src={image} alt={`${alt} ${index + 1}`} fill sizes="25vw" className="object-cover" />
            </div>
          </button>
        ))}
      </div>
      {canExpand ? (
        <button
          type="button"
          onClick={() => setExpanded(current => !current)}
          className="mt-4 inline-flex rounded-full border border-forest px-4 py-2 text-sm font-semibold text-forest transition hover:bg-forest hover:text-cream"
        >
          {expanded ? 'Show fewer photos' : `Show all ${images.length} photos`}
        </button>
      ) : null}
    </div>
  );
}

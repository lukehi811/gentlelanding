'use client';

import Image from 'next/image';
import { useState } from 'react';

export function PropertyGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

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
        {images.map((image, index) => (
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
    </div>
  );
}

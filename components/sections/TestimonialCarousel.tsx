import { Star } from 'lucide-react';
import { Testimonial } from '@/lib/types';

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {testimonials.map((item) => (
        <article key={item.guestName} className="rounded-2xl border border-black/10 bg-white p-6 shadow-md">
          <div className="mb-4 flex gap-1">
            {Array.from({ length: item.rating }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>
          <blockquote className="font-display text-2xl italic text-text-dark">“{item.quote}”</blockquote>
          <p className="mt-5 text-sm font-medium text-text-dark">{item.guestName}</p>
          <p className="text-sm text-text-dark/70">
            {item.location} · {item.propertyStayed}
          </p>
        </article>
      ))}
    </div>
  );
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { luxuryStays } from '@/lib/data';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { PropertyDetail } from '@/components/property/PropertyDetail';
import type { Property } from '@/lib/types';

type Params = { params: { slug: string } };

function getLuxuryProperty(slug: string): Property {
  const property = luxuryStays.find((item) => item.slug === slug);
  if (!property) {
    notFound();
    throw new Error('Property not found');
  }
  return property;
}

export function generateStaticParams() {
  return luxuryStays.map((stay) => ({ slug: stay.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const property = luxuryStays.find((item) => item.slug === params.slug);
  if (!property) return { title: 'Property Not Found' };

  return {
    title: property.name,
    description: property.description,
    openGraph: {
      images: property.images
    }
  };
}

export default function LuxuryStayDetailPage({ params }: Params) {
  const property = getLuxuryProperty(params.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.name,
    description: property.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.city ?? 'Kansas City',
      addressRegion: property.state ?? 'MO',
      addressCountry: 'US'
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-8">
      <PropertyGallery images={property.images} alt={property.name} />
      <div className="mt-8">
        <PropertyDetail property={property} mode="luxury" />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}

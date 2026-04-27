import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { themedStays } from '@/lib/data';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { PropertyDetail } from '@/components/property/PropertyDetail';
import type { Property } from '@/lib/types';

type Params = { params: { slug: string } };

function getThemedProperty(slug: string): Property {
  const property = themedStays.find((item) => item.slug === slug);
  if (!property) {
    notFound();
    throw new Error('Property not found');
  }
  return property;
}

export function generateStaticParams() {
  return themedStays.map((stay) => ({ slug: stay.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const property = themedStays.find((item) => item.slug === params.slug);
  if (!property) return { title: 'Property Not Found' };

  return {
    title: property.name,
    description: property.description,
    openGraph: {
      images: property.images
    }
  };
}

export default function ThemedStayDetailPage({ params }: Params) {
  const property = getThemedProperty(params.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.name,
    description: property.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kansas City',
      addressRegion: 'MO',
      addressCountry: 'US'
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-8">
      <PropertyGallery images={property.images} alt={property.name} />
      <div className="mt-8">
        <PropertyDetail property={property} mode="themed" />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}

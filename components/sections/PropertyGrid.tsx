import { PropertyCard } from '@/components/property/PropertyCard';
import { Property } from '@/lib/types';

type PropertyGridProps = {
  properties: Property[];
  basePath: '/themed-stays' | '/stays';
};

export function PropertyGrid({ properties, basePath }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} href={`${basePath}/${property.slug}`} />
      ))}
    </div>
  );
}

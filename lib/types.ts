export interface Property {
  id: string;
  name: string;
  tagline: string;
  theme?: string;
  description: string;
  images: string[];
  pricePerNight: number;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  tags: string[];
  bookingUrl?: string;
  slug: string;
  worldCupReady?: boolean;
  neighborhood?: string;
}

export interface Testimonial {
  quote: string;
  guestName: string;
  location: string;
  propertyStayed: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

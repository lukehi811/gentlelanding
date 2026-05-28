import type { Property, FlashSaleOffer, TeamMember } from '@/lib/types';

export type HomeFeatureCard = {
  title: string;
  body: string;
  href: string;
  icon: 'castle' | 'trophy' | 'house';
};

export type SocialLinks = {
  tiktok: string;
  instagram: string;
  facebook: string;
};

export type SiteSettings = {
  siteName: string;
  brandDisplayName: string;
  logoSrc: string;
  heroCoverSrc: string;
  heroVideoSrc: string;
  heroPosterImage: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadgeText: string;
  heroBadgeHref: string;
  staysHeroCoverSrc: string;
  staysHeroHeadline: string;
  staysHeroSubheadline: string;
  staysHeroBadgeText: string;
  staysHeroBadgeHref: string;
  homeFeatures: HomeFeatureCard[];
  themedHeroImage: string;
  themedHeroHeadline: string;
  themedHeroSubheadline: string;
  aboutHeroImage: string;
  aboutHeroHeadline: string;
  aboutHeroSubheadline: string;
  aboutStory: string;
  partnerHeroImage: string;
  partnerHeroHeadline: string;
  partnerHeroSubheadline: string;
  footerEmail: string;
  socials: SocialLinks;
};

export type Highlight = {
  image: string;
  title: string;
  href: string;
};

export type SiteContent = {
  settings: SiteSettings;
  themedStays: Property[];
  luxuryStays: Property[];
  aboutHighlights: Highlight[];
  flashSaleOffers: FlashSaleOffer[];
  teamMembers: TeamMember[];
  testimonials: {
    guest: Array<{
      quote: string;
      guestName: string;
      location: string;
      propertyStayed: string;
      rating: 1 | 2 | 3 | 4 | 5;
      avatar?: string;
    }>;
    landlord: Array<{
      quote: string;
      name: string;
      propertyType: string;
      rating: number;
      image: string;
    }>;
  };
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

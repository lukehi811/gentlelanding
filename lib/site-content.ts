import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { head, put } from '@vercel/blob';
import { flashSaleOffers as defaultFlashSaleOffers, guestTestimonials, landlordTestimonials, teamMembers as defaultTeamMembers, themedStays as defaultThemedStays, luxuryStays as defaultLuxuryStays } from '@/lib/data';
import type { FlashSaleOffer, Property, TeamMember } from '@/lib/types';

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
  heroVideoSrc: string;
  heroPosterImage: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadgeText: string;
  heroBadgeHref: string;
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
    guest: typeof guestTestimonials;
    landlord: typeof landlordTestimonials;
  };
};

const contentFilePath = path.join(process.cwd(), 'data', 'site-content.json');
const blobPathname = 'site-content.json';

function canUseBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function canUseFilesystemStorage() {
  return process.env.NODE_ENV !== 'production' || process.env.ALLOW_FILESITECONTENT === '1';
}

async function readSiteContentFromBlob(): Promise<Partial<SiteContent> | null> {
  if (!canUseBlobStorage()) return null;

  try {
    const blob = await head(blobPathname);
    const response = await fetch(blob.url, { cache: 'no-store' });
    if (!response.ok) return null;
    return (await response.json()) as Partial<SiteContent>;
  } catch {
    return null;
  }
}

async function writeSiteContentToBlob(content: SiteContent) {
  await put(blobPathname, JSON.stringify(content, null, 2), {
    access: 'private',
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: 'application/json'
  });
}

const defaultContent: SiteContent = {
  settings: {
    siteName: 'Gentle Landing Homes',
    brandDisplayName: 'Gentle Landing Homes',
    logoSrc: '/brand/LightLogo.png',
    heroVideoSrc: '/videos/StadiumOverhead.mp4',
    heroPosterImage:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80',
    heroHeadline: 'Game Day Starts Here.',
    heroSubheadline: 'Stay close to the action and make every moment count.',
    heroBadgeText: 'Hosting World Cup 2026 Groups? We\'ve Got You.',
    heroBadgeHref: '/stays',
    homeFeatures: [
      {
        title: 'World Cup Ready',
        body: 'Large luxury homes in prime Kansas City locations for your entire match-day crew.',
        href: '/stays',
        icon: 'trophy'
      },
      {
        title: 'FLASH SALE — UP TO 40% OFF',
        body: 'World Cup demand is rising fast. Lock in lower pricing before rates climb.',
        href: '/themed-stays',
        icon: 'castle'
      },
      {
        title: 'Luxury You Can Trust',
        body: 'Every property is professionally managed, immaculate, and guest-obsessed.',
        href: '/stays',
        icon: 'house'
      }
    ],
    themedHeroImage: '/images/galaxys-edge-retreat/livroom1.avif',
    themedHeroHeadline: 'Live the Magic',
    themedHeroSubheadline:
      'Our themed stays are unlike anywhere else on earth. Designed for dreamers, families, and anyone who believes in a little magic.',
    aboutHeroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80',
    aboutHeroHeadline: 'Meet the Team Behind the Magic',
    aboutHeroSubheadline: 'Friendly, local, and relentlessly focused on unforgettable guest experiences.',
    aboutStory:
      'What started as a passion for creating incredible spaces quickly became something much bigger. We are two Kansas City locals who believe that where you stay shapes how you feel. We set out to build something different — homes that do not just house you, but transport you.',
    partnerHeroImage: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2000&q=80',
    partnerHeroHeadline: 'Consistent Rent. Quiet Ownership. The Best Tenants You\'ve Ever Had.',
    partnerHeroSubheadline:
      'We lease quality homes, take exceptional care of them, handle the neighbors, stay ahead on upkeep, and make ownership feel easy again.',
    footerEmail: 'bella.gentlelanding@gmail.com',
    socials: {
      tiktok: 'https://www.tiktok.com/@snazzy.stays',
      instagram: 'https://www.instagram.com/snazzy.stays/',
      facebook: 'https://www.facebook.com/snazzystays'
    }
  },
  themedStays: defaultThemedStays,
  luxuryStays: defaultLuxuryStays,
  aboutHighlights: [
    {
      image: '/images/galaxys-edge-retreat/livroom1.avif',
      title: "Galaxy's Edge Retreat",
      href: '/themed-stays/galaxys-edge-retreat'
    },
    {
      image: '/images/immersive-harry-potter-house/livroom1.avif',
      title: 'Immersive Harry Potter House',
      href: '/themed-stays/immersive-harry-potter-house'
    },
    {
      image: '/images/rapunzels-retreat/livroom1.avif',
      title: "Rapunzel's Retreat",
      href: '/themed-stays/rapunzels-retreat'
    },
    {
      image: '/images/game-day-basement-hangout/seclivroom1.jpeg',
      title: 'Game Day Basement Hangout',
      href: '/stays/game-day-basement-hangout'
    },
    {
      image: '/images/renovated-ranch-retreat/livingroom1.jpeg',
      title: 'Renovated Ranch Retreat',
      href: '/stays/renovated-ranch-retreat'
    },
    {
      image: '/images/beautiful-home-fenced-yard/exterior1.avif',
      title: 'Beautiful Home with Fenced Yard',
      href: '/stays/beautiful-home-fenced-yard'
    },
    {
      image: '/images/entire-home-2755sf-quiet-area/firstlivroom1.avif',
      title: 'Entire Home, 2755 SF, Quiet Area',
      href: '/stays/entire-home-2755sf-quiet-area'
    },
    {
      image: '/images/beautiful-3-king-bedrooms-retreat/livroom1.avif',
      title: 'Beautiful 3 King Bedrooms Retreat',
      href: '/stays/beautiful-3-king-bedrooms-retreat'
    }
  ],
  flashSaleOffers: defaultFlashSaleOffers,
  teamMembers: defaultTeamMembers,
  testimonials: {
    guest: guestTestimonials,
    landlord: landlordTestimonials
  }
};

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function mergeSiteContent(partial?: Partial<SiteContent> | null): SiteContent {
  if (!partial) return deepClone(defaultContent);

  return {
    settings: {
      ...defaultContent.settings,
      ...(partial.settings ?? {})
    },
    themedStays: partial.themedStays ?? deepClone(defaultContent.themedStays),
    luxuryStays: partial.luxuryStays ?? deepClone(defaultContent.luxuryStays),
    aboutHighlights: partial.aboutHighlights ?? deepClone(defaultContent.aboutHighlights),
    flashSaleOffers: partial.flashSaleOffers ?? deepClone(defaultContent.flashSaleOffers),
    teamMembers: partial.teamMembers ?? deepClone(defaultContent.teamMembers),
    testimonials: {
      guest: partial.testimonials?.guest ?? deepClone(defaultContent.testimonials.guest),
      landlord: partial.testimonials?.landlord ?? deepClone(defaultContent.testimonials.landlord)
    }
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const fromBlob = await readSiteContentFromBlob();
  if (fromBlob) {
    return mergeSiteContent(fromBlob);
  }

  try {
    const raw = await readFile(contentFilePath, 'utf8');
    return mergeSiteContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return deepClone(defaultContent);
  }
}

export async function saveSiteContent(content: SiteContent) {
  if (canUseBlobStorage()) {
    await writeSiteContentToBlob(content);
    return;
  }

  if (!canUseFilesystemStorage()) {
    throw new Error('Blob storage is not configured. Set BLOB_READ_WRITE_TOKEN in production environment variables to enable admin saves.');
  }

  await mkdir(path.dirname(contentFilePath), { recursive: true });
  await writeFile(contentFilePath, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
}

export function getDefaultSiteContent() {
  return deepClone(defaultContent);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

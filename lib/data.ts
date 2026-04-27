import { Property, TeamMember, Testimonial } from './types';

export const themedStays: Property[] = [
  {
    id: 'rapunzel-tower',
    name: 'The Rapunzel Tower',
    tagline: 'Where every tower has a view',
    theme: 'Tangled / Fairytale',
    description:
      "Step into Rapunzel's world with stone textures, cascading faux vines, hand-painted murals, and warm lantern lighting.",
    pricePerNight: 249,
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    tags: ['TikTok Viral', 'Family Favorite', 'Most Booked'],
    images: [
      'https://images.unsplash.com/photo-1616593969747-4797dc75033e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'rapunzel-tower',
    bookingUrl: '#',
    neighborhood: 'Brookside KC'
  },
  {
    id: 'hogwarts-house',
    name: 'The Hogwarts House',
    tagline: 'Platform 9¾ starts here',
    theme: 'Wizarding',
    description:
      "Dark wood finishes, floating candle ambiance, crest banners, and hidden details create an immersive magical stay.",
    pricePerNight: 279,
    sleeps: 8,
    bedrooms: 4,
    bathrooms: 3,
    tags: ['Fan Favorite', 'Enchanted Design', 'New'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'hogwarts-house',
    bookingUrl: '#',
    neighborhood: 'Midtown KC'
  },
  {
    id: 'galactic-suite',
    name: 'The Galactic Suite',
    tagline: 'A long time ago in a galaxy far, far away',
    theme: 'Sci-Fi',
    description:
      'Sleek dark panels, LED accents, and cinematic space-age styling built for fans and creators.',
    pricePerNight: 299,
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    tags: ['Sci-Fi Dream', 'TikTok Viral'],
    images: [
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'galactic-suite',
    bookingUrl: '#',
    neighborhood: 'Crossroads KC'
  }
];

export const luxuryStays: Property[] = [
  {
    id: 'midtown-manor',
    name: 'Midtown Manor',
    tagline: 'The ultimate group home',
    description:
      "Five bedrooms, game room, chef's kitchen, and a sprawling backyard for your full crew.",
    pricePerNight: 549,
    sleeps: 14,
    bedrooms: 5,
    bathrooms: 4,
    tags: ['World Cup Ready', 'Sleeps 14', 'Game Room'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'midtown-manor',
    worldCupReady: true,
    bookingUrl: '#',
    neighborhood: 'Near Arrowhead'
  },
  {
    id: 'plaza-penthouse',
    name: 'Plaza Penthouse',
    tagline: 'Elevated city luxury',
    description: 'Designer interiors, skyline views, concierge touches, and effortless access to KC hotspots.',
    pricePerNight: 479,
    sleeps: 10,
    bedrooms: 4,
    bathrooms: 3,
    tags: ['Luxury', 'City Views', 'Fast WiFi'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'plaza-penthouse',
    worldCupReady: true,
    bookingUrl: '#',
    neighborhood: 'Country Club Plaza'
  },
  {
    id: 'stadium-estate',
    name: 'Stadium Estate',
    tagline: 'Minutes to match day',
    description: 'Built for event travel with large gathering spaces, premium amenities, and effortless logistics.',
    pricePerNight: 629,
    sleeps: 16,
    bedrooms: 6,
    bathrooms: 4,
    tags: ['World Cup Ready', 'Backyard', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'stadium-estate',
    worldCupReady: true,
    bookingUrl: '#',
    neighborhood: 'Near Stadium District'
  }
];

export const guestTestimonials: Testimonial[] = [
  {
    quote: 'Our kids were speechless the moment we walked in. It felt like stepping into a movie set.',
    guestName: 'The Alvarez Family',
    location: 'Dallas, TX',
    propertyStayed: 'The Rapunzel Tower',
    rating: 5
  },
  {
    quote: 'Everything was flawless for our group trip. Clean, spacious, and unforgettable.',
    guestName: 'Marcus T.',
    location: 'Chicago, IL',
    propertyStayed: 'Midtown Manor',
    rating: 5
  },
  {
    quote: 'Easily the most unique stay we have ever booked. Every corner was photo-worthy.',
    guestName: 'Jasmine R.',
    location: 'Nashville, TN',
    propertyStayed: 'The Galactic Suite',
    rating: 5
  }
];

export const landlordTestimonials = [
  {
    quote: 'Revenue increased in the first 90 days, and I stopped worrying about day-to-day management.',
    name: 'Derrick M.',
    propertyType: '4BR Luxury Home',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    quote: 'Transparent reporting, responsive communication, and excellent guests. Exactly what we needed.',
    name: 'Alyssa K.',
    propertyType: 'Downtown Condo',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80'
  },
  {
    quote: 'They handled setup, pricing, and operations. We just receive the payouts and updates.',
    name: 'Robert & Nina',
    propertyType: '5BR Event Home',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Joey',
    role: 'Co-Founder & Experience Director',
    quote: 'Every detail should make guests feel something unforgettable.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Taylor',
    role: 'Co-Founder & Operations Lead',
    quote: 'Luxury means consistency, precision, and care in every stay.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Morgan',
    role: 'Guest Success Manager',
    quote: 'Our mission is five-star memories from check-in to checkout.',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80'
  }
];

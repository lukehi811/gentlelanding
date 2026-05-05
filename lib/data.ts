import { FlashSaleOffer, Property, TeamMember, Testimonial } from './types';

export const themedStays: Property[] = [
  {
    id: 'immersive-harry-potter-house',
    name: 'Immersive Harry Potter House',
    tagline: '23 minutes to Arrowhead',
    theme: 'Wizarding',
    description:
      "Enter your own wizarding world just 23 minutes from Arrowhead with immersive rooms inspired by the Astronomy Tower, Potions class, and the Forbidden Forest.",
    pricePerNight: 279,
    sleeps: 8,
    bedrooms: 3,
    bathrooms: 1,
    tags: ['New Listing', 'Superhost', 'Game Day Favorite'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'immersive-harry-potter-house',
    bookingUrl: 'https://www.airbnb.co.nz/rooms/1677170505835772000?source_impression_id=p3_1778002352_P3082v11pm6gHbdA',
    city: 'Overland Park',
    state: 'KS'
  },
  {
    id: 'rapunzels-retreat',
    name: "Rapunzel's Retreat",
    tagline: 'Hot tub and private yard, 14 minutes to Arrowhead',
    theme: 'Fairytale',
    description:
      'A bright 3BR themed stay with subtle fairytale touches, fast Wi-Fi, a covered porch, private fenced yard, and a 6-person hot tub.',
    pricePerNight: 289,
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    tags: ['New Listing', 'Hot Tub', 'Arrowhead Nearby'],
    images: [
      'https://images.unsplash.com/photo-1616593969747-4797dc75033e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'rapunzels-retreat',
    bookingUrl: 'http://airbnb.co.nz/rooms/1660380626672314934?source_impression_id=p3_1778002352_P34Iv0RiiG-WYpDZ',
    city: 'Blue Springs',
    state: 'MO'
  },
  {
    id: 'galaxys-edge-retreat',
    name: "Galaxy's Edge Retreat",
    tagline: 'Immersive Star Wars stay, 13 minutes to Arrowhead',
    theme: 'Sci-Fi',
    description:
      'A fully immersive Star Wars home with themed rooms, cinematic lighting, and a movie-marathon-ready command center.',
    pricePerNight: 299,
    sleeps: 9,
    bedrooms: 3,
    bathrooms: 2,
    tags: ['Guest Favorite', 'Superhost', 'Immersive Design'],
    images: [
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'galaxys-edge-retreat',
    bookingUrl: 'https://www.airbnb.co.nz/rooms/1611159069862704237?source_impression_id=p3_1778002352_P3kg5-8iJdepG0hW',
    city: 'Independence',
    state: 'MO'
  }
];

export const luxuryStays: Property[] = [
  {
    id: 'game-day-basement-hangout',
    name: 'Game Day Basement Hangout',
    tagline: 'Near Arrowhead and Kauffman',
    description:
      'Entire home in Lee\'s Summit with a huge basement watch-party setup, foosball, fenced yard, and 1 gig fiber internet.',
    pricePerNight: 319,
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2.5,
    tags: ['Guest Favorite', '5.0 Rating', 'Self Check-in'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'game-day-basement-hangout',
    worldCupReady: true,
    bookingUrl:
      'https://www.airbnb.co.nz/rooms/1204394743507648639?source_impression_id=p3_1778002352_P3ZFlrHPW0DXnllA',
    city: "Lee's Summit",
    state: 'MO'
  },
  {
    id: 'renovated-ranch-retreat',
    name: 'Renovated Ranch Retreat',
    tagline: 'Single-level comfort in Lee\'s Summit',
    description:
      'Beautifully renovated ranch home with multiple living areas, fenced yard, dedicated workspace, and strong fiber internet.',
    pricePerNight: 279,
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    tags: ['Dedicated Workspace', 'Family Friendly', 'Lee\'s Summit'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'renovated-ranch-retreat',
    worldCupReady: true,
    bookingUrl:
      'https://www.airbnb.co.nz/rooms/1125364283632269325?source_impression_id=p3_1778002352_P3qy_PWklagc_OX6',
    city: "Lee's Summit",
    state: 'MO'
  },
  {
    id: 'beautiful-home-fenced-yard',
    name: 'Beautiful Home with Fenced Yard',
    tagline: 'Multiple living areas in quiet Lee\'s Summit neighborhood',
    description:
      'Updated appliances, vaulted ceilings, deck views, and quick highway access with room for family stays and game-day weekends.',
    pricePerNight: 289,
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2.5,
    tags: ['Great Host Communication', 'Fenced Yard', 'Quiet Area'],
    images: [
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'beautiful-home-fenced-yard',
    worldCupReady: true,
    bookingUrl:
      'https://www.airbnb.co.nz/rooms/1062426488102443691?source_impression_id=p3_1778002352_P3-AHxOXFSrT5JLT',
    city: "Lee's Summit",
    state: 'MO'
  },
  {
    id: 'entire-home-2755sf',
    name: 'Entire Home, 2755 SF, Quiet Area',
    tagline: 'Large fenced yard near Lakewood',
    description:
      'Spacious 2755-square-foot home with open layout, large bedrooms, primary suite with jet tub, and 1 gig fiber internet.',
    pricePerNight: 329,
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2.5,
    tags: ['5.0 Rating', 'Self Check-in', 'Royals and Chiefs Ready'],
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'entire-home-2755sf-quiet-area',
    worldCupReady: true,
    bookingUrl:
      'https://www.airbnb.co.nz/rooms/770605864141562762?source_impression_id=p3_1778002352_P31Fs7I9BHZOfstT',
    city: "Lee's Summit",
    state: 'MO'
  },
  {
    id: 'beautiful-3-king-greenwood',
    name: 'Beautiful 3 King Bedrooms Retreat',
    tagline: '5-bedroom family home in Greenwood',
    description:
      'Family-friendly Greenwood home with 3 king bedrooms, bunk rooms, 2.5 baths, fenced yard, and quick highway access.',
    pricePerNight: 339,
    sleeps: 6,
    bedrooms: 5,
    bathrooms: 2.5,
    tags: ['5.0 Rating', 'Self Check-in', 'Family Retreat'],
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
    ],
    slug: 'beautiful-3-king-bedrooms-retreat',
    worldCupReady: true,
    bookingUrl:
      'https://www.airbnb.co.nz/rooms/1092171713059255608?source_impression_id=p3_1778002352_P3wH8NcEfZ44i1Td',
    city: 'Greenwood',
    state: 'MO'
  }
];

export const guestTestimonials: Testimonial[] = [
  {
    quote: 'Our kids were speechless the moment we walked in. It felt like stepping into a movie set.',
    guestName: 'The Alvarez Family',
    location: 'Dallas, TX',
    propertyStayed: 'Immersive Harry Potter House',
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
    propertyStayed: "Galaxy's Edge Retreat",
    rating: 5
  }
];

export const landlordTestimonials = [
  {
    quote: 'They pay on time, keep the place in great shape, and handle the little things without constantly pulling me in.',
    name: 'Derrick M.',
    propertyType: '4BR Luxury Home',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    quote: 'It feels like having a dependable long-term tenant, except the home looks better now than when they moved in.',
    name: 'Alyssa K.',
    propertyType: 'Downtown Condo',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80'
  },
  {
    quote: 'Quiet, professional, proactive, and easy to work with. Honestly the least stressful lease we have had.',
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
    name: 'Bella',
    role: 'Co-Founder & Operations Lead',
    quote: 'Luxury means consistency, precision, and care in every stay.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Christian',
    role: 'Guest Success Manager',
    quote: 'Our mission is five-star memories from check-in to checkout.',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80'
  }
];

export const flashSaleOffers: FlashSaleOffer[] = [
  {
    title: 'June Flash Sale',
    dateLabel: 'Select June dates',
    description: 'A few discounted windows just outside the biggest match-day rush, perfect for early summer group trips.',
    href: '/stays',
    ctaLabel: 'Shop Luxury Homes'
  },
  {
    title: 'July Flash Sale',
    dateLabel: 'Select July dates',
    description: 'Quick-book pricing on a handful of July stays so guests can grab the trip before those weekends disappear.',
    href: '/themed-stays',
    ctaLabel: 'Browse Themed Stays'
  },
  {
    title: 'Fast Booking Focus',
    dateLabel: 'Limited-time availability',
    description: 'Each sale card can point straight to the best-fit homes now, and later to direct Airbnb or direct-book links when you send them over.',
    href: '/stays',
    ctaLabel: 'Book a Sale Stay'
  }
];

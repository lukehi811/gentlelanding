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
      '/images/immersive-harry-potter-house/exterior1.avif',
      '/images/immersive-harry-potter-house/exterior2.avif',
      '/images/immersive-harry-potter-house/livroom1.avif',
      '/images/immersive-harry-potter-house/livroom2.avif',
      '/images/immersive-harry-potter-house/ktichen1.avif',
      '/images/immersive-harry-potter-house/ktichen2.avif',
      '/images/immersive-harry-potter-house/dineroom1.avif',
      '/images/immersive-harry-potter-house/dineroom2.avif',
      '/images/immersive-harry-potter-house/firstbed1.avif',
      '/images/immersive-harry-potter-house/firstbed2.avif',
      '/images/immersive-harry-potter-house/firstbed3.avif',
      '/images/immersive-harry-potter-house/fisrtbed4.avif',
      '/images/immersive-harry-potter-house/secbed1.avif',
      '/images/immersive-harry-potter-house/secbed2.avif',
      '/images/immersive-harry-potter-house/secbed3.webp',
      '/images/immersive-harry-potter-house/thirdbed1.avif',
      '/images/immersive-harry-potter-house/thirdbed2.avif',
      '/images/immersive-harry-potter-house/extra.avif'
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
      '/images/rapunzels-retreat/exterior1.avif',
      '/images/rapunzels-retreat/exterior2.avif',
      '/images/rapunzels-retreat/exterior3.avif',
      '/images/rapunzels-retreat/exterior4.avif',
      '/images/rapunzels-retreat/livroom1.avif',
      '/images/rapunzels-retreat/livroom2.avif',
      '/images/rapunzels-retreat/livroom3.avif',
      '/images/rapunzels-retreat/livroom4.avif',
      '/images/rapunzels-retreat/kitchen.avif',
      '/images/rapunzels-retreat/dineroom.avif',
      '/images/rapunzels-retreat/firstbed1.avif',
      '/images/rapunzels-retreat/firstbed2.avif',
      '/images/rapunzels-retreat/secbed.avif',
      '/images/rapunzels-retreat/thirdbed.avif',
      '/images/rapunzels-retreat/thirdbed2.avif',
      '/images/rapunzels-retreat/thirdbed3.avif',
      '/images/rapunzels-retreat/bath.avif',
      '/images/rapunzels-retreat/backyard.avif',
      '/images/rapunzels-retreat/extra1.avif',
      '/images/rapunzels-retreat/extra2.avif',
      '/images/rapunzels-retreat/extra3.avif',
      '/images/rapunzels-retreat/extra4.avif'
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
      '/images/galaxys-edge-retreat/livroom1.avif',
      '/images/galaxys-edge-retreat/livroom2.avif',
      '/images/galaxys-edge-retreat/livroom3.avif',
      '/images/galaxys-edge-retreat/kitchen1.avif',
      '/images/galaxys-edge-retreat/ktichen2.avif',
      '/images/galaxys-edge-retreat/ktichen3.avif',
      '/images/galaxys-edge-retreat/dineroom1.avif',
      '/images/galaxys-edge-retreat/dineroom2.avif',
      '/images/galaxys-edge-retreat/dineroom3.avif',
      '/images/galaxys-edge-retreat/firstbed1.avif',
      '/images/galaxys-edge-retreat/firstbed2.avif',
      '/images/galaxys-edge-retreat/firstbed3.avif',
      '/images/galaxys-edge-retreat/secbed1.avif',
      '/images/galaxys-edge-retreat/secbed2.avif',
      '/images/galaxys-edge-retreat/thirdbed1.avif',
      '/images/galaxys-edge-retreat/thirdbed2.avif',
      '/images/galaxys-edge-retreat/thirdbed3.avif',
      '/images/galaxys-edge-retreat/thirdbed4.webp',
      '/images/galaxys-edge-retreat/firstbath1.avif',
      '/images/galaxys-edge-retreat/firstbath2.avif',
      '/images/galaxys-edge-retreat/secbath1.avif',
      '/images/galaxys-edge-retreat/secbath2.avif'
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
      '/images/game-day-basement-hangout/exterior.avif',
      '/images/game-day-basement-hangout/firstlivroom1.avif',
      '/images/game-day-basement-hangout/firstlivroom2.avif',
      '/images/game-day-basement-hangout/firstlivroom3.avif',
      '/images/game-day-basement-hangout/firstlivroom4.avif',
      '/images/game-day-basement-hangout/firstlivroom5.avif',
      '/images/game-day-basement-hangout/firstlivroom6.avif',
      '/images/game-day-basement-hangout/firstlivroom7.jpeg',
      '/images/game-day-basement-hangout/kitchen.avif',
      '/images/game-day-basement-hangout/dineroom.avif',
      '/images/game-day-basement-hangout/dineroom2.avif',
      '/images/game-day-basement-hangout/firstbed1.avif',
      '/images/game-day-basement-hangout/firstbed2.avif',
      '/images/game-day-basement-hangout/secbed1.avif',
      '/images/game-day-basement-hangout/thirdbed1.avif',
      '/images/game-day-basement-hangout/thirdbed2.avif',
      '/images/game-day-basement-hangout/firstbath1.avif',
      '/images/game-day-basement-hangout/firstbath2.avif',
      '/images/game-day-basement-hangout/secbath1.jpeg',
      '/images/game-day-basement-hangout/halfbath.jpeg',
      '/images/game-day-basement-hangout/seclivroom1.jpeg',
      '/images/game-day-basement-hangout/seclivroom2.avif',
      '/images/game-day-basement-hangout/seclivroom3.avif',
      '/images/game-day-basement-hangout/seclivroom4.jpeg',
      '/images/game-day-basement-hangout/seclivroom5.jpeg',
      '/images/game-day-basement-hangout/seclivroom6.avif',
      '/images/game-day-basement-hangout/seclivroom7.jpeg',
      '/images/game-day-basement-hangout/balcony.avif',
      '/images/game-day-basement-hangout/laundry.avif',
      '/images/game-day-basement-hangout/extra1.avif',
      '/images/game-day-basement-hangout/extra2.avif',
      '/images/game-day-basement-hangout/extra3.avif',
      '/images/game-day-basement-hangout/extra4.avif',
      '/images/game-day-basement-hangout/extra5.avif',
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
      '/images/renovated-ranch-retreat/exterior1.jpeg',
      '/images/renovated-ranch-retreat/exterior2.jpeg',
      '/images/renovated-ranch-retreat/exterior3.jpeg',
      '/images/renovated-ranch-retreat/livingroom1.jpeg',
      '/images/renovated-ranch-retreat/livingroom2.jpeg',
      '/images/renovated-ranch-retreat/livingroom3.jpeg',
      '/images/renovated-ranch-retreat/kitchen1.jpeg',
      '/images/renovated-ranch-retreat/kitchen2.jpeg',
      '/images/renovated-ranch-retreat/kitchen3.jpeg',
      '/images/renovated-ranch-retreat/kitchen4.jpeg',
      '/images/renovated-ranch-retreat/kitchen5.jpeg',
      '/images/renovated-ranch-retreat/firstbed1.jpeg',
      '/images/renovated-ranch-retreat/firstbed2.jpeg',
      '/images/renovated-ranch-retreat/secbed1.jpeg',
      '/images/renovated-ranch-retreat/secbed2.jpeg',
      '/images/renovated-ranch-retreat/thirdbed.jpeg',
      '/images/renovated-ranch-retreat/firstfullbath.jpeg',
      '/images/renovated-ranch-retreat/secfullbath.jpeg',
      '/images/renovated-ranch-retreat/Workspace1.jpeg',
      '/images/renovated-ranch-retreat/Workspace2.jpeg',
      '/images/renovated-ranch-retreat/Workspace3.jpeg',
      '/images/renovated-ranch-retreat/extra1.jpeg',
      '/images/renovated-ranch-retreat/extra2.jpeg',
      '/images/renovated-ranch-retreat/extra3.jpeg',
      '/images/renovated-ranch-retreat/extra4.jpeg',
      '/images/renovated-ranch-retreat/extra5.jpeg',
      '/images/renovated-ranch-retreat/extra6.jpeg',
      '/images/renovated-ranch-retreat/extra7.jpeg',
      '/images/renovated-ranch-retreat/extra8.jpeg',
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
      '/images/beautiful-home-fenced-yard/exterior1.avif',
      '/images/beautiful-home-fenced-yard/exterior2.avif',
      '/images/beautiful-home-fenced-yard/exterior3.avif',
      '/images/beautiful-home-fenced-yard/exterior4.avif',
      '/images/beautiful-home-fenced-yard/exterior5.avif',
      '/images/beautiful-home-fenced-yard/Diningroom.avif',
      '/images/beautiful-home-fenced-yard/firstbed1.avif',
      '/images/beautiful-home-fenced-yard/firstbed2.avif',
      '/images/beautiful-home-fenced-yard/secbed1.avif',
      '/images/beautiful-home-fenced-yard/secbed2.avif',
      '/images/beautiful-home-fenced-yard/thirdbed.avif',
      '/images/beautiful-home-fenced-yard/firstbath1.avif',
      '/images/beautiful-home-fenced-yard/firstbath2.avif',
      '/images/beautiful-home-fenced-yard/secbath1.avif',
      '/images/beautiful-home-fenced-yard/secbath2.avif',
      '/images/beautiful-home-fenced-yard/halfbath.avif',
      '/images/beautiful-home-fenced-yard/extra.avif'
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
      '/images/entire-home-2755sf-quiet-area/exterior1.avif',
      '/images/entire-home-2755sf-quiet-area/exterior2.avif',
      '/images/entire-home-2755sf-quiet-area/exterior3.jpeg',
      '/images/entire-home-2755sf-quiet-area/exterior4.avif',
      '/images/entire-home-2755sf-quiet-area/firstlivroom1.avif',
      '/images/entire-home-2755sf-quiet-area/firstlivroom2.jpeg',
      '/images/entire-home-2755sf-quiet-area/firstlivroom3.avif',
      '/images/entire-home-2755sf-quiet-area/firstlivroom4.avif',
      '/images/entire-home-2755sf-quiet-area/seclivroom1.avif',
      '/images/entire-home-2755sf-quiet-area/seclivroom2.jpeg',
      '/images/entire-home-2755sf-quiet-area/seclivroom3.jpeg',
      '/images/entire-home-2755sf-quiet-area/kitchen.avif',
      '/images/entire-home-2755sf-quiet-area/kitchette1.avif',
      '/images/entire-home-2755sf-quiet-area/kitchenette2.avif',
      '/images/entire-home-2755sf-quiet-area/dineroom1.avif',
      '/images/entire-home-2755sf-quiet-area/dineroom2.avif',
      '/images/entire-home-2755sf-quiet-area/firstbed1.jpeg',
      '/images/entire-home-2755sf-quiet-area/firstbed2.jpeg',
      '/images/entire-home-2755sf-quiet-area/firstbed3.avif',
      '/images/entire-home-2755sf-quiet-area/secbed1.jpeg',
      '/images/entire-home-2755sf-quiet-area/thirdbed.jpeg',
      '/images/entire-home-2755sf-quiet-area/firstbath.jpeg',
      '/images/entire-home-2755sf-quiet-area/secbath.avif',
      '/images/entire-home-2755sf-quiet-area/halfbath.jpeg',
      '/images/entire-home-2755sf-quiet-area/backyard1.avif',
      '/images/entire-home-2755sf-quiet-area/backyard2.avif',
      '/images/entire-home-2755sf-quiet-area/backyard3.avif',
      '/images/entire-home-2755sf-quiet-area/backyard4.jpeg',
      '/images/entire-home-2755sf-quiet-area/laundry1.avif',
      '/images/entire-home-2755sf-quiet-area/laundry2.jpeg',
      '/images/entire-home-2755sf-quiet-area/laundry3.jpeg',
      '/images/entire-home-2755sf-quiet-area/laundry4.avif',
      '/images/entire-home-2755sf-quiet-area/laundry5.avif',
      '/images/entire-home-2755sf-quiet-area/extra1.webp',
      '/images/entire-home-2755sf-quiet-area/extra2.avif',
      '/images/entire-home-2755sf-quiet-area/extra3.avif',
      '/images/entire-home-2755sf-quiet-area/extra4.jpeg'
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
      '/images/beautiful-3-king-bedrooms-retreat/exterior1.avif',
      '/images/beautiful-3-king-bedrooms-retreat/exterior2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/exterior3.avif',
      '/images/beautiful-3-king-bedrooms-retreat/livroom1.avif',
      '/images/beautiful-3-king-bedrooms-retreat/livroom2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/livroom3.avif',
      '/images/beautiful-3-king-bedrooms-retreat/livroom4.avif',
      '/images/beautiful-3-king-bedrooms-retreat/ktichen1.avif',
      '/images/beautiful-3-king-bedrooms-retreat/ktichen2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/ktichen3.avif',
      '/images/beautiful-3-king-bedrooms-retreat/dineroom1.avif',
      '/images/beautiful-3-king-bedrooms-retreat/dineroom2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/firstbed1.jpeg',
      '/images/beautiful-3-king-bedrooms-retreat/firstbed2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/firstbed3.avif',
      '/images/beautiful-3-king-bedrooms-retreat/secbed1.avif',
      '/images/beautiful-3-king-bedrooms-retreat/secbed2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/secbed3.jpeg',
      '/images/beautiful-3-king-bedrooms-retreat/thirdbed1.avif',
      '/images/beautiful-3-king-bedrooms-retreat/thirdbed2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/fourthbed.jpeg',
      '/images/beautiful-3-king-bedrooms-retreat/fifthbed.jpeg',
      '/images/beautiful-3-king-bedrooms-retreat/firstbath.avif',
      '/images/beautiful-3-king-bedrooms-retreat/secbath.avif',
      '/images/beautiful-3-king-bedrooms-retreat/halfbath1.avif',
      '/images/beautiful-3-king-bedrooms-retreat/halfbath2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/laundry1.avif',
      '/images/beautiful-3-king-bedrooms-retreat/laundry2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/extra1.avif',
      '/images/beautiful-3-king-bedrooms-retreat/extra2.avif',
      '/images/beautiful-3-king-bedrooms-retreat/extra3.avif',
      '/images/beautiful-3-king-bedrooms-retreat/extra4.jpeg'
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

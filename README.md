# Gentle Landing Website

Luxury-themed short-term rental website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features implemented
- Cinematic homepage hero with video background and CTA pair
- Themed stays and luxury stays listing pages
- Dynamic property detail pages for both stay types
- About and Partner pages with high-conversion sections
- Scroll reveals, page transitions, hover motion, and animated counters
- Responsive fixed navigation with mobile fullscreen menu
- SEO metadata + basic structured data (`LocalBusiness`, `LodgingBusiness`)
- Partner lead form using React Hook Form + Zod (placeholder submit handler)

## Start
1. Install dependencies: `npm install`
2. Run local dev server: `npm run dev`
3. Open `http://localhost:3000`

## TODO before production
- Replace placeholder copy marked with `TODO` comments
- Replace placeholder images/video with licensed brand assets
- Connect partner form to Resend/Formspree endpoint
- Add real booking URLs for Airbnb/VRBO/direct book
- Add GA4/Vercel analytics IDs

## Updating Listings And Site Content

Most of the editable listing content lives in `lib/data.ts`.

### Edit an existing listing
1. Open `lib/data.ts`.
2. Find the listing inside either `themedStays` or `luxuryStays`.
3. Update any of these fields:
	- `name`, `tagline`, `description`
	- `pricePerNight`, `sleeps`, `bedrooms`, `bathrooms`
	- `city`, `state`, `tags`, `bookingUrl`
	- `images` for photo URLs
4. Save the file and the cards/detail pages will update automatically.

### Add a new listing
1. Open `lib/data.ts`.
2. Copy an existing object from the correct array (`themedStays` or `luxuryStays`).
3. Paste it into the same array and update:
	- `id`: unique internal ID
	- `slug`: unique URL path segment, for example `storybook-suite`
	- all listing details and image URLs
4. Save the file. The site will automatically create the listing card and detail page.

### Add or replace listing photos
1. Upload the photos somewhere the site can access them, or place them in `public/images/...`.
2. If using local files, set image paths like `/images/listings/storybook-suite/photo-1.jpg`.
3. Replace the `images` array for that listing in `lib/data.ts`.

### Update the homepage flash sale
1. Open `lib/data.ts`.
2. Edit the `flashSaleOffers` array.
3. Update the `title`, `dateLabel`, `description`, `href`, and `ctaLabel` for each sale card.

### Swap the homepage video
1. Put the video file in `public/videos/` or use a hosted MP4 URL.
2. Open `app/page.tsx`.
3. Change the `videoSrc` prop passed into the `Hero` component.
4. Update `posterImage` if you want a new fallback image.

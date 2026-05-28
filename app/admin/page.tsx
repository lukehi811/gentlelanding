'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, ImagePlus, Pencil, Plus, Save, Scissors, Star, Trash2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { slugify, type Highlight, type HomeFeatureCard, type SiteContent } from '@/lib/site-content-client';
import type { Property } from '@/lib/types';
import type { ReactNode } from 'react';

type ListingMode = 'themed' | 'luxury';
type TabKey = 'branding' | 'listings' | 'gallery' | 'sales';
type SaleOffer = SiteContent['flashSaleOffers'][number];
type CropMode = 'cover' | 'logo' | 'generic';
type LogoShape = 'square' | 'circle';

type BrandingDraft = {
  siteName: string;
  brandDisplayName: string;
  logoSrc: string;
  heroVideoSrc: string;
  heroPosterImage: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadgeText: string;
  heroBadgeHref: string;
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
};

type ContactDraft = {
  footerEmail: string;
  tiktok: string;
  instagram: string;
  facebook: string;
};

type ActiveModal =
  | { type: 'branding'; draft: BrandingDraft }
  | { type: 'contact'; draft: ContactDraft }
  | { type: 'feature'; index: number; draft: HomeFeatureCard }
  | { type: 'listing'; mode: ListingMode; originalKey: string | null; draft: Property }
  | { type: 'highlight'; index: number | null; draft: Highlight }
  | { type: 'sale'; index: number | null; draft: SaleOffer };

const emptyListing = (mode: ListingMode): Property => ({
  id: '',
  slug: '',
  name: '',
  tagline: '',
  theme: mode === 'themed' ? 'Themed' : undefined,
  description: '',
  images: [''],
  pricePerNight: 99,
  sleeps: 6,
  bedrooms: 3,
  bathrooms: 2,
  tags: [''],
  bookingUrl: '',
  city: '',
  state: 'MO',
  worldCupReady: mode === 'luxury'
});

const emptyHighlight = (): Highlight => ({
  image: '',
  title: '',
  href: ''
});

const emptySaleOffer = () => ({
  title: '',
  dateLabel: '',
  description: '',
  href: '/stays',
  ctaLabel: ''
});

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

async function filesToDataUrls(files: File[]) {
  return Promise.all(files.map((file) => fileToDataUrl(file)));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image for cropping.'));
    image.src = src;
  });
}

async function createCroppedImageDataUrl({
  src,
  cropX,
  cropY,
  zoom,
  mode,
  logoShape
}: {
  src: string;
  cropX: number;
  cropY: number;
  zoom: number;
  mode: CropMode;
  logoShape: LogoShape;
}) {
  const image = await loadImage(src);
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;

  const outputAspect = mode === 'logo' ? 1 : mode === 'cover' ? 16 / 6 : 4 / 3;
  const outputWidth = mode === 'logo' ? 1200 : mode === 'cover' ? 2000 : 1400;
  const outputHeight = Math.round(outputWidth / outputAspect);

  let cropWidth = sourceWidth;
  let cropHeight = Math.round(cropWidth / outputAspect);
  if (cropHeight > sourceHeight) {
    cropHeight = sourceHeight;
    cropWidth = Math.round(cropHeight * outputAspect);
  }

  cropWidth = cropWidth / zoom;
  cropHeight = cropHeight / zoom;

  const centerX = (cropX / 100) * sourceWidth;
  const centerY = (cropY / 100) * sourceHeight;
  const left = clamp(centerX - cropWidth / 2, 0, sourceWidth - cropWidth);
  const top = clamp(centerY - cropHeight / 2, 0, sourceHeight - cropHeight);

  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Failed to initialize canvas context.');

  if (mode === 'logo' && logoShape === 'circle') {
    context.save();
    context.beginPath();
    const radius = Math.min(outputWidth, outputHeight) / 2;
    context.arc(outputWidth / 2, outputHeight / 2, radius, 0, Math.PI * 2);
    context.closePath();
    context.clip();
  }

  context.drawImage(image, left, top, cropWidth, cropHeight, 0, 0, outputWidth, outputHeight);

  if (mode === 'logo' && logoShape === 'circle') {
    context.restore();
  }

  return canvas.toDataURL('image/png');
}

function splitLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function joinLines(values: string[]) {
  return values.join('\n');
}

function listingKey(mode: ListingMode, listing: Property) {
  return `${mode}:${listing.slug || listing.id || listing.name}`;
}

function buildListingList(content: SiteContent | null) {
  if (!content) return [];

  return [
    ...content.themedStays.map((listing) => ({ listing, mode: 'themed' as const })),
    ...content.luxuryStays.map((listing) => ({ listing, mode: 'luxury' as const }))
  ];
}

function getBrandingDraft(content: SiteContent): BrandingDraft {
  const s = content.settings;
  return {
    siteName: s.siteName,
    brandDisplayName: s.brandDisplayName,
    logoSrc: s.logoSrc,
    heroVideoSrc: s.heroVideoSrc,
    heroPosterImage: s.heroPosterImage,
    heroHeadline: s.heroHeadline,
    heroSubheadline: s.heroSubheadline,
    heroBadgeText: s.heroBadgeText,
    heroBadgeHref: s.heroBadgeHref,
    themedHeroImage: s.themedHeroImage,
    themedHeroHeadline: s.themedHeroHeadline,
    themedHeroSubheadline: s.themedHeroSubheadline,
    aboutHeroImage: s.aboutHeroImage,
    aboutHeroHeadline: s.aboutHeroHeadline,
    aboutHeroSubheadline: s.aboutHeroSubheadline,
    aboutStory: s.aboutStory,
    partnerHeroImage: s.partnerHeroImage,
    partnerHeroHeadline: s.partnerHeroHeadline,
    partnerHeroSubheadline: s.partnerHeroSubheadline
  };
}

function getContactDraft(content: SiteContent): ContactDraft {
  const s = content.settings;
  return {
    footerEmail: s.footerEmail,
    tiktok: s.socials.tiktok,
    instagram: s.socials.instagram,
    facebook: s.socials.facebook
  };
}

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<TabKey>('branding');
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
  const [status, setStatus] = useState<string>('Loading admin content...');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/admin/content', { cache: 'no-store' });
        const data = (await response.json()) as SiteContent;
        setContent(data);
        setStatus('Content loaded.');
      } catch {
        setStatus('Failed to load content.');
      }
    };

    load();
  }, []);

  const listingOptions = useMemo(() => buildListingList(content), [content]);

  const updateContent = (updater: (current: SiteContent) => SiteContent) => {
    setContent((current) => (current ? updater(clone(current)) : current));
  };

  const openListingEditor = (mode: ListingMode, listing: Property) => {
    setActiveModal({
      type: 'listing',
      mode,
      originalKey: listingKey(mode, listing),
      draft: clone(listing)
    });
  };

  const createNewListing = (mode: ListingMode) => {
    setActiveModal({ type: 'listing', mode, originalKey: null, draft: emptyListing(mode) });
    setTab('listings');
  };

  const saveListingModal = () => {
    if (!content || !activeModal || activeModal.type !== 'listing') return;

    const data = clone(activeModal.draft);
    const slugSource = data.slug || data.name;
    data.slug = slugify(slugSource);
    data.id = data.id || data.slug;
    data.images = data.images.map((item) => item.trim()).filter(Boolean);
    data.tags = data.tags.map((item) => item.trim()).filter(Boolean);

    if (!data.theme && activeModal.mode === 'themed') {
      data.theme = 'Themed';
    }
    if (activeModal.mode === 'luxury') {
      data.theme = undefined;
    }

    updateContent((current) => {
      const nextThemed = current.themedStays.filter((item) => listingKey('themed', item) !== activeModal.originalKey);
      const nextLuxury = current.luxuryStays.filter((item) => listingKey('luxury', item) !== activeModal.originalKey);

      if (activeModal.mode === 'themed') {
        nextThemed.push(data);
      } else {
        nextLuxury.push(data);
      }

      return {
        ...current,
        themedStays: nextThemed,
        luxuryStays: nextLuxury
      };
    });

    setActiveModal(null);
    setStatus('Listing updated locally. Save all changes to publish.');
  };

  const deleteListingFromModal = () => {
    if (!content || !activeModal || activeModal.type !== 'listing' || !activeModal.originalKey) return;

    updateContent((current) => ({
      ...current,
      themedStays: current.themedStays.filter((item) => listingKey('themed', item) !== activeModal.originalKey),
      luxuryStays: current.luxuryStays.filter((item) => listingKey('luxury', item) !== activeModal.originalKey)
    }));

    setActiveModal(null);
    setStatus('Listing removed locally. Save all changes to publish.');
  };

  const saveAll = async () => {
    if (!content) return;

    try {
      setStatus('Saving changes...');
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        throw new Error('Save failed');
      }

      setStatus('Saved successfully. Refresh the site to view the updates.');
    } catch {
      setStatus('Save failed. Please try again.');
    }
  };

  if (!content) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-8">
        <p className="text-white/70">{status}</p>
      </div>
    );
  }

  const currentSettings = content.settings;
  const currentHighlights = content.aboutHighlights;
  const currentSales = content.flashSaleOffers;

  const uploadIntoListingImages = async (files: File[]) => {
    if (!files.length) return;
    const urls = await filesToDataUrls(files);
    setActiveModal((current) => {
      if (!current || current.type !== 'listing') return current;
      return {
        ...current,
        draft: {
          ...current.draft,
          images: [...current.draft.images, ...urls]
        }
      };
    });
  };

  return (
    <div className="min-h-screen bg-bg pb-16 pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold-light">Admin Dashboard</p>
            <h1 className="mt-2 font-display text-6xl">Site Editor</h1>
            <p className="mt-3 max-w-3xl text-white/75">
              Update the homepage, logo, videos, listings, and gallery highlights from one place.
            </p>
          </div>
          <div className="flex gap-3">
            <Button type="button" onClick={saveAll} className="gap-2">
              <Save className="h-4 w-4" />
              Save All Changes
            </Button>
            <Button href="/" variant="outline-light">
              View Site
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
          {[
            ['branding', 'Branding & Homepage'],
            ['listings', 'Listings'],
            ['gallery', 'About Gallery'],
            ['sales', 'Flash Sale Offers']
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key as TabKey)}
              className={tab === key ? 'rounded-full bg-gold px-4 py-2 text-sm font-semibold text-text-dark' : 'rounded-full px-4 py-2 text-sm text-white/80 hover:text-white'}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 text-sm text-white/70">{status}</div>

        {tab === 'branding' ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-[28px] border border-white/10 bg-surface/85 p-6">
              <SectionTitle title="Global Branding & Hero" description="Logo, hero video, key page hero words and media." />
              <p className="mt-3 text-sm text-white/70">Edit core brand + hero settings in one popup.</p>
              <button
                onClick={() => setActiveModal({ type: 'branding', draft: getBrandingDraft(content) })}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm text-gold-light hover:bg-gold/10"
              >
                <Pencil className="h-4 w-4" /> Edit Branding
              </button>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-surface/85 p-6">
              <SectionTitle title="Contact & Social Links" description="Footer email and social profile URLs." />
              <p className="mt-3 text-sm text-white/70">Email: {currentSettings.footerEmail}</p>
              <button
                onClick={() => setActiveModal({ type: 'contact', draft: getContactDraft(content) })}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm text-gold-light hover:bg-gold/10"
              >
                <Pencil className="h-4 w-4" /> Edit Contact Links
              </button>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-surface/85 p-6 lg:col-span-2">
              <SectionTitle title="Homepage Feature Cards" description="Edit each clickable card in a popup editor." />
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {currentSettings.homeFeatures.map((card, index) => (
                  <article key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-gold-light">Card {index + 1}</p>
                    <h3 className="mt-2 font-display text-3xl">{card.title}</h3>
                    <p className="mt-2 text-sm text-white/75">{card.body}</p>
                    <button
                      onClick={() => setActiveModal({ type: 'feature', index, draft: clone(card) })}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                      <Pencil className="h-4 w-4" /> Edit Card
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {tab === 'listings' ? (
          <div className="mt-8 grid gap-6">
            <section className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6">
              <SectionTitle title="All Listings" description="Edit any themed or regular stay, add new ones, or delete an existing listing." />
              <div className="flex gap-3">
                <button onClick={() => createNewListing('themed')} className="rounded-full border border-gold px-4 py-2 text-sm text-gold-light hover:bg-gold/10">New Themed</button>
                <button onClick={() => createNewListing('luxury')} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5">New Regular</button>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {listingOptions.map(({ listing, mode }) => {
                  const key = listingKey(mode, listing);
                  return (
                    <article key={key} className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left hover:bg-white/5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-display text-2xl">{listing.name}</p>
                        <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white/70">
                          {mode}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-white/70">{listing.tagline}</p>
                      <p className="mt-1 text-xs text-white/55">/{listing.slug}</p>
                      <button
                        onClick={() => openListingEditor(mode, listing)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                      >
                        <Pencil className="h-4 w-4" /> Edit Listing
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        ) : null}

        {tab === 'gallery' ? (
          <section className="mt-8 rounded-[28px] border border-white/10 bg-surface/85 p-6">
            <SectionTitle title="About Page Highlights" description="Edit the gallery tiles and what each one links to." />
            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal({ type: 'highlight', index: null, draft: emptyHighlight() })}
                className="inline-flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm text-gold-light hover:bg-gold/10"
              >
                <Plus className="h-4 w-4" /> Add Highlight
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentHighlights.map((item, index) => (
                <article key={`${item.href}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="font-display text-2xl">{item.title || 'Untitled Highlight'}</p>
                  <p className="mt-2 text-sm text-white/70">{item.href || 'No link yet'}</p>
                  <button
                    onClick={() => setActiveModal({ type: 'highlight', index, draft: clone(item) })}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                  >
                    <Pencil className="h-4 w-4" /> Edit Highlight
                  </button>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {tab === 'sales' ? (
          <section className="mt-8 rounded-[28px] border border-white/10 bg-surface/85 p-6">
            <SectionTitle title="Flash Sale Offers" description="Edit the card content used in the flash sale section." />
            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal({ type: 'sale', index: null, draft: emptySaleOffer() })}
                className="inline-flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm text-gold-light hover:bg-gold/10"
              >
                <Plus className="h-4 w-4" /> Add Offer
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentSales.map((offer, index) => (
                <article key={`${offer.title}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="font-display text-2xl">{offer.title || 'Untitled Offer'}</p>
                  <p className="mt-2 text-sm text-white/70">{offer.dateLabel || 'No date label'}</p>
                  <button
                    onClick={() => setActiveModal({ type: 'sale', index, draft: clone(offer) })}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                  >
                    <Pencil className="h-4 w-4" /> Edit Offer
                  </button>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activeModal ? (
          <Modal onClose={() => setActiveModal(null)}>
            {activeModal.type === 'branding' ? (
              <>
                <ModalHeader title="Edit Branding & Hero" onClose={() => setActiveModal(null)} />
                <div className="space-y-4">
                  <Field label="Site Name"><input className="input" value={activeModal.draft.siteName} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, siteName: e.target.value } })} /></Field>
                  <Field label="Brand Display Name"><input className="input" value={activeModal.draft.brandDisplayName} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, brandDisplayName: e.target.value } })} /></Field>
                  <SingleImageEditor
                    title="Logo"
                    value={activeModal.draft.logoSrc}
                    cropMode="logo"
                    onChange={(value) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, logoSrc: value } })}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Home Hero Video"><input className="input" value={activeModal.draft.heroVideoSrc} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, heroVideoSrc: e.target.value } })} /></Field>
                    <div className="md:col-span-1">
                      <SingleImageEditor
                        title="Home Hero Poster"
                        value={activeModal.draft.heroPosterImage}
                        cropMode="cover"
                        onChange={(value) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, heroPosterImage: value } })}
                      />
                    </div>
                  </div>
                  <Field label="Home Headline"><input className="input" value={activeModal.draft.heroHeadline} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, heroHeadline: e.target.value } })} /></Field>
                  <Field label="Home Tagline"><textarea className="input min-h-24" value={activeModal.draft.heroSubheadline} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, heroSubheadline: e.target.value } })} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Hero Badge Text"><input className="input" value={activeModal.draft.heroBadgeText} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, heroBadgeText: e.target.value } })} /></Field>
                    <Field label="Hero Badge Link"><input className="input" value={activeModal.draft.heroBadgeHref} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, heroBadgeHref: e.target.value } })} /></Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <SingleImageEditor
                      title="Themed Hero Image"
                      value={activeModal.draft.themedHeroImage}
                      cropMode="cover"
                      onChange={(value) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, themedHeroImage: value } })}
                    />
                    <Field label="Themed Hero Headline"><input className="input" value={activeModal.draft.themedHeroHeadline} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, themedHeroHeadline: e.target.value } })} /></Field>
                  </div>
                  <Field label="Themed Hero Subheadline"><textarea className="input min-h-20" value={activeModal.draft.themedHeroSubheadline} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, themedHeroSubheadline: e.target.value } })} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <SingleImageEditor
                      title="About Hero Image"
                      value={activeModal.draft.aboutHeroImage}
                      cropMode="cover"
                      onChange={(value) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, aboutHeroImage: value } })}
                    />
                    <Field label="About Headline"><input className="input" value={activeModal.draft.aboutHeroHeadline} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, aboutHeroHeadline: e.target.value } })} /></Field>
                  </div>
                  <Field label="About Subheadline"><input className="input" value={activeModal.draft.aboutHeroSubheadline} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, aboutHeroSubheadline: e.target.value } })} /></Field>
                  <Field label="About Story"><textarea className="input min-h-28" value={activeModal.draft.aboutStory} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, aboutStory: e.target.value } })} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <SingleImageEditor
                      title="Partner Hero Image"
                      value={activeModal.draft.partnerHeroImage}
                      cropMode="cover"
                      onChange={(value) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, partnerHeroImage: value } })}
                    />
                    <Field label="Partner Headline"><input className="input" value={activeModal.draft.partnerHeroHeadline} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, partnerHeroHeadline: e.target.value } })} /></Field>
                  </div>
                  <Field label="Partner Subheadline"><textarea className="input min-h-20" value={activeModal.draft.partnerHeroSubheadline} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, partnerHeroSubheadline: e.target.value } })} /></Field>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => {
                        const draft = activeModal.draft;
                        updateContent((current) => ({
                          ...current,
                          settings: {
                            ...current.settings,
                            ...draft
                          }
                        }));
                        setActiveModal(null);
                        setStatus('Branding updated locally. Save all changes to publish.');
                      }}
                    >
                      Save Branding
                    </Button>
                  </div>
                </div>
              </>
            ) : null}

            {activeModal.type === 'contact' ? (
              <>
                <ModalHeader title="Edit Contact & Social Links" onClose={() => setActiveModal(null)} />
                <div className="space-y-4">
                  <Field label="Footer Email"><input className="input" value={activeModal.draft.footerEmail} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, footerEmail: e.target.value } })} /></Field>
                  <Field label="TikTok URL"><input className="input" value={activeModal.draft.tiktok} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, tiktok: e.target.value } })} /></Field>
                  <Field label="Instagram URL"><input className="input" value={activeModal.draft.instagram} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, instagram: e.target.value } })} /></Field>
                  <Field label="Facebook URL"><input className="input" value={activeModal.draft.facebook} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, facebook: e.target.value } })} /></Field>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => {
                        const draft = activeModal.draft;
                        updateContent((current) => ({
                          ...current,
                          settings: {
                            ...current.settings,
                            footerEmail: draft.footerEmail,
                            socials: {
                              tiktok: draft.tiktok,
                              instagram: draft.instagram,
                              facebook: draft.facebook
                            }
                          }
                        }));
                        setActiveModal(null);
                        setStatus('Contact links updated locally. Save all changes to publish.');
                      }}
                    >
                      Save Contact Links
                    </Button>
                  </div>
                </div>
              </>
            ) : null}

            {activeModal.type === 'feature' ? (
              <>
                <ModalHeader title={`Edit Feature Card ${activeModal.index + 1}`} onClose={() => setActiveModal(null)} />
                <div className="space-y-4">
                  <Field label="Icon">
                    <select className="input" value={activeModal.draft.icon} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, icon: e.target.value as HomeFeatureCard['icon'] } })}>
                      <option value="castle">Castle</option>
                      <option value="trophy">Trophy</option>
                      <option value="house">House</option>
                    </select>
                  </Field>
                  <Field label="Title"><input className="input" value={activeModal.draft.title} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, title: e.target.value } })} /></Field>
                  <Field label="Body"><textarea className="input min-h-24" value={activeModal.draft.body} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, body: e.target.value } })} /></Field>
                  <Field label="Link"><input className="input" value={activeModal.draft.href} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, href: e.target.value } })} /></Field>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => {
                        updateContent((current) => {
                          const homeFeatures = [...current.settings.homeFeatures];
                          homeFeatures[activeModal.index] = activeModal.draft;
                          return {
                            ...current,
                            settings: {
                              ...current.settings,
                              homeFeatures
                            }
                          };
                        });
                        setActiveModal(null);
                        setStatus('Feature card updated locally. Save all changes to publish.');
                      }}
                    >
                      Save Feature Card
                    </Button>
                  </div>
                </div>
              </>
            ) : null}

            {activeModal.type === 'listing' ? (
              <>
                <ModalHeader title={activeModal.originalKey ? 'Edit Listing' : 'Create Listing'} onClose={() => setActiveModal(null)} />
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Listing Type">
                      <select className="input" value={activeModal.mode} onChange={(e) => setActiveModal({ ...activeModal, mode: e.target.value as ListingMode })}>
                        <option value="themed">Themed Stay</option>
                        <option value="luxury">Regular Stay</option>
                      </select>
                    </Field>
                    <Field label="Slug"><input className="input" value={activeModal.draft.slug} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, slug: e.target.value } })} /></Field>
                  </div>
                  <Field label="Title"><input className="input" value={activeModal.draft.name} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, name: e.target.value } })} /></Field>
                  <Field label="Tagline"><input className="input" value={activeModal.draft.tagline} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, tagline: e.target.value } })} /></Field>
                  <Field label="Description"><textarea className="input min-h-28" value={activeModal.draft.description} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, description: e.target.value } })} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Nightly Price"><input className="input" type="number" value={activeModal.draft.pricePerNight} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, pricePerNight: Number(e.target.value) } })} /></Field>
                    <Field label="Airbnb Link"><input className="input" value={activeModal.draft.bookingUrl ?? ''} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, bookingUrl: e.target.value } })} /></Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <Field label="Sleeps"><input className="input" type="number" value={activeModal.draft.sleeps} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, sleeps: Number(e.target.value) } })} /></Field>
                    <Field label="Bedrooms"><input className="input" type="number" value={activeModal.draft.bedrooms} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, bedrooms: Number(e.target.value) } })} /></Field>
                    <Field label="Bathrooms"><input className="input" type="number" value={activeModal.draft.bathrooms} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, bathrooms: Number(e.target.value) } })} /></Field>
                    <Field label="State"><input className="input" value={activeModal.draft.state ?? ''} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, state: e.target.value } })} /></Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="City"><input className="input" value={activeModal.draft.city ?? ''} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, city: e.target.value } })} /></Field>
                    <Field label="Theme"><input className="input" value={activeModal.draft.theme ?? ''} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, theme: e.target.value } })} /></Field>
                  </div>
                  <Field label="Tags (one per line)"><textarea className="input min-h-24" value={joinLines(activeModal.draft.tags)} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, tags: splitLines(e.target.value) } })} /></Field>
                  <ListingImageEditor
                    images={activeModal.draft.images}
                    onChange={(images) =>
                      setActiveModal({
                        ...activeModal,
                        draft: {
                          ...activeModal.draft,
                          images
                        }
                      })
                    }
                  />
                  <FileDropzone label="Upload listing images" multiple onFiles={uploadIntoListingImages} />
                  <label className="flex items-center gap-2 text-sm text-white/90">
                    <input type="checkbox" checked={Boolean(activeModal.draft.worldCupReady)} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, worldCupReady: e.target.checked } })} />
                    World Cup Ready
                  </label>
                  <div className="flex flex-wrap justify-end gap-3">
                    {activeModal.originalKey ? (
                      <button onClick={deleteListingFromModal} className="inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm text-red-200 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    ) : null}
                    <Button type="button" onClick={saveListingModal}>
                      Save Listing
                    </Button>
                  </div>
                </div>
              </>
            ) : null}

            {activeModal.type === 'highlight' ? (
              <>
                <ModalHeader title={activeModal.index === null ? 'Create Highlight' : 'Edit Highlight'} onClose={() => setActiveModal(null)} />
                <div className="space-y-4">
                  <SingleImageEditor
                    title="Highlight Image"
                    value={activeModal.draft.image}
                    cropMode="generic"
                    onChange={(value) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, image: value } })}
                  />
                  <Field label="Title"><input className="input" value={activeModal.draft.title} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, title: e.target.value } })} /></Field>
                  <Field label="Link"><input className="input" value={activeModal.draft.href} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, href: e.target.value } })} /></Field>
                  <div className="flex flex-wrap justify-end gap-3">
                    {activeModal.index !== null ? (
                      <button
                        onClick={() => {
                          updateContent((current) => ({
                            ...current,
                            aboutHighlights: current.aboutHighlights.filter((_, idx) => idx !== activeModal.index)
                          }));
                          setActiveModal(null);
                          setStatus('Highlight removed locally. Save all changes to publish.');
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm text-red-200 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    ) : null}
                    <Button
                      type="button"
                      onClick={() => {
                        updateContent((current) => {
                          const aboutHighlights = [...current.aboutHighlights];
                          if (activeModal.index === null) {
                            aboutHighlights.push(activeModal.draft);
                          } else {
                            aboutHighlights[activeModal.index] = activeModal.draft;
                          }
                          return {
                            ...current,
                            aboutHighlights
                          };
                        });
                        setActiveModal(null);
                        setStatus('Highlight updated locally. Save all changes to publish.');
                      }}
                    >
                      Save Highlight
                    </Button>
                  </div>
                </div>
              </>
            ) : null}

            {activeModal.type === 'sale' ? (
              <>
                <ModalHeader title={activeModal.index === null ? 'Create Flash Sale Offer' : 'Edit Flash Sale Offer'} onClose={() => setActiveModal(null)} />
                <div className="space-y-4">
                  <Field label="Title"><input className="input" value={activeModal.draft.title} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, title: e.target.value } })} /></Field>
                  <Field label="Date Label"><input className="input" value={activeModal.draft.dateLabel} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, dateLabel: e.target.value } })} /></Field>
                  <Field label="Description"><textarea className="input min-h-24" value={activeModal.draft.description} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, description: e.target.value } })} /></Field>
                  <Field label="Link"><input className="input" value={activeModal.draft.href} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, href: e.target.value } })} /></Field>
                  <Field label="CTA Label"><input className="input" value={activeModal.draft.ctaLabel} onChange={(e) => setActiveModal({ ...activeModal, draft: { ...activeModal.draft, ctaLabel: e.target.value } })} /></Field>
                  <div className="flex flex-wrap justify-end gap-3">
                    {activeModal.index !== null ? (
                      <button
                        onClick={() => {
                          updateContent((current) => ({
                            ...current,
                            flashSaleOffers: current.flashSaleOffers.filter((_, idx) => idx !== activeModal.index)
                          }));
                          setActiveModal(null);
                          setStatus('Offer removed locally. Save all changes to publish.');
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm text-red-200 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    ) : null}
                    <Button
                      type="button"
                      onClick={() => {
                        updateContent((current) => {
                          const flashSaleOffers = [...current.flashSaleOffers];
                          if (activeModal.index === null) {
                            flashSaleOffers.push(activeModal.draft);
                          } else {
                            flashSaleOffers[activeModal.index] = activeModal.draft;
                          }
                          return {
                            ...current,
                            flashSaleOffers
                          };
                        });
                        setActiveModal(null);
                        setStatus('Offer updated locally. Save all changes to publish.');
                      }}
                    >
                      Save Offer
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center bg-black/70 p-4 pt-16 backdrop-blur-sm" onClick={onClose}>
      <div
        className="max-h-[86vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-bg p-6"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
      <h2 className="font-display text-4xl text-white">{title}</h2>
      <button onClick={onClose} aria-label="Close editor" className="rounded-full border border-white/20 p-2 text-white/80 hover:bg-white/10 hover:text-white">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function FileDropzone({
  label,
  multiple = false,
  onFiles
}: {
  label: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void | Promise<void>;
}) {
  const [dragging, setDragging] = useState(false);

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setDragging(false);
      }}
      onDrop={async (event) => {
        event.preventDefault();
        setDragging(false);
        const files = Array.from(event.dataTransfer.files || []);
        if (files.length) {
          await onFiles(files);
        }
      }}
      className={dragging ? 'rounded-xl border-2 border-dashed border-gold bg-gold/10 p-4' : 'rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-4'}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm text-white/85">
          <ImagePlus className="h-4 w-4 text-gold-light" />
          <span>{label}</span>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/80 hover:bg-white/10">
          <Upload className="h-3.5 w-3.5" />
          Choose file{multiple ? 's' : ''}
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            onChange={async (event) => {
              const files = Array.from(event.target.files || []);
              if (files.length) {
                await onFiles(files);
              }
              event.currentTarget.value = '';
            }}
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-white/60">Drag and drop image files here, or choose files from your device.</p>
    </div>
  );
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="font-display text-4xl text-white">{title}</h2>
      <p className="mt-2 text-sm text-white/70">{description}</p>
    </div>
  );
}

function ListingImageEditor({ images, onChange }: { images: string[]; onChange: (next: string[]) => void }) {
  const [expanded, setExpanded] = useState(true);
  const [pendingImage, setPendingImage] = useState('');

  const normalizedImages = images.map((item) => item.trim()).filter(Boolean);

  const removeAt = (index: number) => {
    onChange(normalizedImages.filter((_, idx) => idx !== index));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= normalizedImages.length) return;
    const next = [...normalizedImages];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  const setMain = (index: number) => {
    if (index <= 0) return;
    const next = [...normalizedImages];
    const [selected] = next.splice(index, 1);
    next.unshift(selected);
    onChange(next);
  };

  const addPendingImage = () => {
    const value = pendingImage.trim();
    if (!value) return;
    onChange([...normalizedImages, value]);
    setPendingImage('');
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white/90">Images</p>
          <p className="text-xs text-white/60">Set the first image as the featured main image shown across the site.</p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/75 hover:bg-white/10"
        >
          {expanded ? 'Collapse' : 'Expand'}
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {expanded ? (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col gap-2 md:flex-row">
            <input
              className="input"
              placeholder="/images/listing/my-photo.avif or https://..."
              value={pendingImage}
              onChange={(event) => setPendingImage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addPendingImage();
                }
              }}
            />
            <button
              type="button"
              onClick={addPendingImage}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              Add Image
            </button>
          </div>

          {normalizedImages.length ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {normalizedImages.map((image, index) => (
                <article key={`${image}-${index}`} className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5 p-3">
                  <button
                    type="button"
                    onClick={() => removeAt(index)}
                    className="absolute right-2 top-2 z-10 rounded-full border border-white/30 bg-black/50 p-1 text-white/80 hover:bg-red-500/20 hover:text-red-100"
                    aria-label={`Remove image ${index + 1}`}
                    title="Remove image"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="mb-3 aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/35">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt={`Listing image ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                  <p className="truncate text-xs text-white/75" title={image}>{image}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {index === 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/60 bg-gold/15 px-2.5 py-1 text-xs text-gold-light">
                        <Star className="h-3 w-3" /> Main image
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setMain(index)}
                        className="inline-flex items-center gap-1 rounded-full border border-gold/50 px-2.5 py-1 text-xs text-gold-light hover:bg-gold/10"
                      >
                        <Star className="h-3 w-3" /> Set main
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      disabled={index === 0}
                      className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowLeft className="h-3 w-3" /> Left
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      disabled={index === normalizedImages.length - 1}
                      className="inline-flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Right <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
              No images yet. Add one above or use the uploader below.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function SingleImageEditor({
  title,
  value,
  cropMode,
  onChange
}: {
  title: string;
  value: string;
  cropMode: CropMode;
  onChange: (next: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const [showCrop, setShowCrop] = useState(false);
  const [zoom, setZoom] = useState(1.2);
  const [cropX, setCropX] = useState(50);
  const [cropY, setCropY] = useState(50);
  const [logoShape, setLogoShape] = useState<LogoShape>('square');
  const [cropError, setCropError] = useState('');

  const saveCropped = async () => {
    if (!value) return;
    try {
      const next = await createCroppedImageDataUrl({
        src: value,
        cropX,
        cropY,
        zoom,
        mode: cropMode,
        logoShape
      });
      onChange(next);
      setShowCrop(false);
      setCropError('');
    } catch {
      setCropError('Cropping failed. External URLs may block canvas export due to CORS. Try uploading the image first, then crop it.');
    }
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white/90">{title}</p>
          <p className="text-xs text-white/60">Expand to edit, upload, crop, or clear this image.</p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/75 hover:bg-white/10"
        >
          {expanded ? 'Collapse' : 'Expand'}
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {expanded ? (
        <div className="mt-4 space-y-3">
          <input className="input" value={value} onChange={(event) => onChange(event.target.value)} placeholder="/images/... or https://..." />

          {value ? (
            <div className="space-y-3">
              <div className={cropMode === 'logo' ? 'mx-auto aspect-square w-40 overflow-hidden rounded-xl border border-white/10 bg-black/35' : 'aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/35'}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} alt={title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCropError('');
                    setShowCrop(true);
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-gold/50 px-3 py-1.5 text-xs text-gold-light hover:bg-gold/10"
                >
                  <Scissors className="h-3.5 w-3.5" /> Crop
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-white/60">No image selected yet.</p>
          )}

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/80 hover:bg-white/10">
            <Upload className="h-3.5 w-3.5" /> Choose image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const files = Array.from(event.target.files || []);
                if (!files.length) return;
                const [dataUrl] = await filesToDataUrls([files[0]]);
                onChange(dataUrl);
                event.currentTarget.value = '';
              }}
            />
          </label>

          {showCrop ? (
            <Modal onClose={() => setShowCrop(false)}>
              <ModalHeader title={`Crop ${title}`} onClose={() => setShowCrop(false)} />
              <div className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-3">
                    <Field label="Zoom">
                      <input className="w-full" type="range" min={1} max={3} step={0.01} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
                    </Field>
                    <Field label="Horizontal position">
                      <input className="w-full" type="range" min={0} max={100} step={1} value={cropX} onChange={(event) => setCropX(Number(event.target.value))} />
                    </Field>
                    <Field label="Vertical position">
                      <input className="w-full" type="range" min={0} max={100} step={1} value={cropY} onChange={(event) => setCropY(Number(event.target.value))} />
                    </Field>
                    {cropMode === 'logo' ? (
                      <div>
                        <p className="mb-1 text-sm text-white/85">Logo shape</p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setLogoShape('square')}
                            className={logoShape === 'square' ? 'rounded-full border border-gold/60 bg-gold/10 px-3 py-1 text-xs text-gold-light' : 'rounded-full border border-white/20 px-3 py-1 text-xs text-white/80'}
                          >
                            Square
                          </button>
                          <button
                            type="button"
                            onClick={() => setLogoShape('circle')}
                            className={logoShape === 'circle' ? 'rounded-full border border-gold/60 bg-gold/10 px-3 py-1 text-xs text-gold-light' : 'rounded-full border border-white/20 px-3 py-1 text-xs text-white/80'}
                          >
                            Circle
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-white/90">Preview</p>
                    {cropMode === 'cover' ? (
                      <>
                        <div>
                          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-white/60">Desktop</p>
                          <div className="aspect-video overflow-hidden rounded-xl border border-white/15 bg-black/35">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={value} alt={`${title} desktop preview`} className="h-full w-full object-cover" style={{ transform: `scale(${zoom})`, transformOrigin: `${cropX}% ${cropY}%` }} />
                          </div>
                        </div>
                        <div>
                          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-white/60">Mobile</p>
                          <div className="mx-auto aspect-[4/5] w-36 overflow-hidden rounded-xl border border-white/15 bg-black/35">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={value} alt={`${title} mobile preview`} className="h-full w-full object-cover" style={{ transform: `scale(${zoom})`, transformOrigin: `${cropX}% ${cropY}%` }} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="mx-auto w-40">
                        <div className={cropMode === 'logo' && logoShape === 'circle' ? 'aspect-square overflow-hidden rounded-full border border-white/15 bg-black/35' : 'aspect-square overflow-hidden rounded-xl border border-white/15 bg-black/35'}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={value} alt={`${title} preview`} className="h-full w-full object-cover" style={{ transform: `scale(${zoom})`, transformOrigin: `${cropX}% ${cropY}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {cropError ? <p className="rounded-lg border border-red-300/40 bg-red-500/10 p-2 text-xs text-red-100">{cropError}</p> : null}

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowCrop(false)} className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10">
                    Cancel
                  </button>
                  <button type="button" onClick={saveCropped} className="rounded-full border border-gold/60 px-3 py-1.5 text-xs text-gold-light hover:bg-gold/10">
                    Apply Crop
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm text-white/85">
      <span className="mb-1 block font-medium text-white/90">{label}</span>
      {children}
    </label>
  );
}

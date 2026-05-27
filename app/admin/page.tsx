'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { slugify, type Highlight, type HomeFeatureCard, type SiteContent } from '@/lib/site-content';
import type { Property } from '@/lib/types';
import type { ReactNode } from 'react';

type ListingMode = 'themed' | 'luxury';
type TabKey = 'branding' | 'listings' | 'gallery' | 'sales';

type ListingDraft = {
  mode: ListingMode;
  originalKey: string | null;
  data: Property;
};

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

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<TabKey>('branding');
  const [listingDraft, setListingDraft] = useState<ListingDraft | null>(null);
  const [status, setStatus] = useState<string>('Loading admin content...');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/admin/content', { cache: 'no-store' });
        const data = (await response.json()) as SiteContent;
        setContent(data);
        setStatus('Content loaded.');
        setListingDraft({
          mode: 'themed',
          originalKey: null,
          data: clone(data.themedStays[0] ?? emptyListing('themed'))
        });
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

  const updateSetting = (key: keyof SiteContent['settings'], value: string) => {
    updateContent((current) => ({
      ...current,
      settings: {
        ...current.settings,
        [key]: value
      }
    }));
  };

  const updateFeatureCard = (index: number, field: keyof HomeFeatureCard, value: string) => {
    updateContent((current) => {
      const homeFeatures = [...current.settings.homeFeatures];
      homeFeatures[index] = {
        ...homeFeatures[index],
        [field]: field === 'icon' ? (value as HomeFeatureCard['icon']) : value
      };
      return {
        ...current,
        settings: {
          ...current.settings,
          homeFeatures
        }
      };
    });
  };

  const updateSocial = (field: keyof SiteContent['settings']['socials'], value: string) => {
    updateContent((current) => ({
      ...current,
      settings: {
        ...current.settings,
        socials: {
          ...current.settings.socials,
          [field]: value
        }
      }
    }));
  };

  const updateListingDraft = <K extends keyof Property>(field: K, value: Property[K]) => {
    setListingDraft((current) => (current ? { ...current, data: { ...current.data, [field]: value } } : current));
  };

  const selectListing = (mode: ListingMode, listing: Property) => {
    setListingDraft({
      mode,
      originalKey: listingKey(mode, listing),
      data: clone(listing)
    });
    setTab('listings');
  };

  const createNewListing = (mode: ListingMode) => {
    setListingDraft({ mode, originalKey: null, data: emptyListing(mode) });
    setTab('listings');
  };

  const saveListingDraft = () => {
    if (!content || !listingDraft) return;

    const data = clone(listingDraft.data);
    const slugSource = data.slug || data.name;
    data.slug = slugify(slugSource);
    data.id = data.id || data.slug;
    data.images = data.images.map((item) => item.trim()).filter(Boolean);
    data.tags = data.tags.map((item) => item.trim()).filter(Boolean);

    if (!data.theme && listingDraft.mode === 'themed') {
      data.theme = 'Themed';
    }
    if (listingDraft.mode === 'luxury') {
      data.theme = undefined;
    }

    updateContent((current) => {
      const nextThemed = current.themedStays.filter((item) => listingKey('themed', item) !== listingDraft.originalKey);
      const nextLuxury = current.luxuryStays.filter((item) => listingKey('luxury', item) !== listingDraft.originalKey);

      if (listingDraft.mode === 'themed') {
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

    setListingDraft({
      mode: listingDraft.mode,
      originalKey: listingKey(listingDraft.mode, data),
      data
    });
    setStatus('Listing updated locally. Save all changes to publish.');
  };

  const deleteListingDraft = () => {
    if (!content || !listingDraft || !listingDraft.originalKey) return;

    updateContent((current) => ({
      ...current,
      themedStays: current.themedStays.filter((item) => listingKey('themed', item) !== listingDraft.originalKey),
      luxuryStays: current.luxuryStays.filter((item) => listingKey('luxury', item) !== listingDraft.originalKey)
    }));

    setListingDraft({ mode: 'themed', originalKey: null, data: emptyListing('themed') });
    setStatus('Listing removed locally. Save all changes to publish.');
  };

  const addHighlight = () => {
    updateContent((current) => ({
      ...current,
      aboutHighlights: [...current.aboutHighlights, emptyHighlight()]
    }));
  };

  const updateHighlight = (index: number, field: keyof Highlight, value: string) => {
    updateContent((current) => {
      const aboutHighlights = [...current.aboutHighlights];
      aboutHighlights[index] = {
        ...aboutHighlights[index],
        [field]: value
      };
      return {
        ...current,
        aboutHighlights
      };
    });
  };

  const deleteHighlight = (index: number) => {
    updateContent((current) => ({
      ...current,
      aboutHighlights: current.aboutHighlights.filter((_, currentIndex) => currentIndex !== index)
    }));
  };

  const updateSaleOffer = (index: number, field: keyof SiteContent['flashSaleOffers'][number], value: string) => {
    updateContent((current) => {
      const flashSaleOffers = [...current.flashSaleOffers];
      flashSaleOffers[index] = {
        ...flashSaleOffers[index],
        [field]: value
      };
      return {
        ...current,
        flashSaleOffers
      };
    });
  };

  const addSaleOffer = () => {
    updateContent((current) => ({
      ...current,
      flashSaleOffers: [...current.flashSaleOffers, emptySaleOffer()]
    }));
  };

  const deleteSaleOffer = (index: number) => {
    updateContent((current) => ({
      ...current,
      flashSaleOffers: current.flashSaleOffers.filter((_, currentIndex) => currentIndex !== index)
    }));
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
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <section className="space-y-6 rounded-[28px] border border-white/10 bg-surface/85 p-6">
              <SectionTitle title="Brand & Hero" description="Site name, hero video, and main homepage copy." />
              <Field label="Site Name"><input className="input" value={currentSettings.siteName} onChange={(e) => updateSetting('siteName', e.target.value)} /></Field>
              <Field label="Brand Display Name"><input className="input" value={currentSettings.brandDisplayName} onChange={(e) => updateSetting('brandDisplayName', e.target.value)} /></Field>
              <Field label="Logo Image Path"><input className="input" value={currentSettings.logoSrc} onChange={(e) => updateSetting('logoSrc', e.target.value)} /></Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Homepage Hero Video"><input className="input" value={currentSettings.heroVideoSrc} onChange={(e) => updateSetting('heroVideoSrc', e.target.value)} /></Field>
                <Field label="Hero Poster Image"><input className="input" value={currentSettings.heroPosterImage} onChange={(e) => updateSetting('heroPosterImage', e.target.value)} /></Field>
              </div>
              <Field label="Homepage Headline"><input className="input" value={currentSettings.heroHeadline} onChange={(e) => updateSetting('heroHeadline', e.target.value)} /></Field>
              <Field label="Homepage Tagline"><textarea className="input min-h-24" value={currentSettings.heroSubheadline} onChange={(e) => updateSetting('heroSubheadline', e.target.value)} /></Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Hero Badge Text"><input className="input" value={currentSettings.heroBadgeText} onChange={(e) => updateSetting('heroBadgeText', e.target.value)} /></Field>
                <Field label="Hero Badge Link"><input className="input" value={currentSettings.heroBadgeHref} onChange={(e) => updateSetting('heroBadgeHref', e.target.value)} /></Field>
              </div>
            </section>

            <aside className="space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-6">
              <SectionTitle title="Contact & Socials" description="Footer email and social profile links." />
              <Field label="Footer Email"><input className="input" value={currentSettings.footerEmail} onChange={(e) => updateSetting('footerEmail', e.target.value)} /></Field>
              <Field label="TikTok URL"><input className="input" value={currentSettings.socials.tiktok} onChange={(e) => updateSocial('tiktok', e.target.value)} /></Field>
              <Field label="Instagram URL"><input className="input" value={currentSettings.socials.instagram} onChange={(e) => updateSocial('instagram', e.target.value)} /></Field>
              <Field label="Facebook URL"><input className="input" value={currentSettings.socials.facebook} onChange={(e) => updateSocial('facebook', e.target.value)} /></Field>
              <p className="text-sm text-white/65">
                Tip: use full URLs so the icons in the footer always go to the live profiles.
              </p>

              <SectionTitle title="Homepage Feature Cards" description="The three clickable cards below the hero." />
              <div className="space-y-4">
                {currentSettings.homeFeatures.map((card, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-medium text-gold-light">Card {index + 1}</p>
                      <select className="input w-32" value={card.icon} onChange={(e) => updateFeatureCard(index, 'icon', e.target.value)}>
                        <option value="castle">Castle</option>
                        <option value="trophy">Trophy</option>
                        <option value="house">House</option>
                      </select>
                    </div>
                    <Field label="Title"><input className="input" value={card.title} onChange={(e) => updateFeatureCard(index, 'title', e.target.value)} /></Field>
                    <Field label="Body"><textarea className="input min-h-24" value={card.body} onChange={(e) => updateFeatureCard(index, 'body', e.target.value)} /></Field>
                    <Field label="Link"><input className="input" value={card.href} onChange={(e) => updateFeatureCard(index, 'href', e.target.value)} /></Field>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        ) : null}

        {tab === 'listings' ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6">
              <SectionTitle title="All Listings" description="Edit any themed or regular stay, add new ones, or delete an existing listing." />
              <div className="flex gap-3">
                <button onClick={() => createNewListing('themed')} className="rounded-full border border-gold px-4 py-2 text-sm text-gold-light hover:bg-gold/10">New Themed</button>
                <button onClick={() => createNewListing('luxury')} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/5">New Regular</button>
              </div>
              <div className="max-h-[720px] space-y-2 overflow-y-auto pr-1">
                {listingOptions.map(({ listing, mode }) => {
                  const key = listingKey(mode, listing);
                  const isActive = listingDraft?.originalKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => selectListing(mode, listing)}
                      className={isActive ? 'w-full rounded-2xl border border-gold bg-gold/10 p-4 text-left' : 'w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left hover:bg-white/5'}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-display text-2xl">{listing.name}</p>
                        <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white/70">
                          {mode}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-white/70">{listing.tagline}</p>
                      <p className="mt-1 text-xs text-white/55">/{listing.slug}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="space-y-6 rounded-[28px] border border-white/10 bg-surface/85 p-6">
              <SectionTitle title="Listing Editor" description="Change the title, photos, Airbnb link, and all key listing details." />
              {listingDraft ? (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Listing Type">
                      <select className="input" value={listingDraft.mode} onChange={(e) => setListingDraft({ ...listingDraft, mode: e.target.value as ListingMode })}>
                        <option value="themed">Themed Stay</option>
                        <option value="luxury">Regular Stay</option>
                      </select>
                    </Field>
                    <Field label="Slug"><input className="input" value={listingDraft.data.slug} onChange={(e) => updateListingDraft('slug', e.target.value)} /></Field>
                  </div>
                  <Field label="Title"><input className="input" value={listingDraft.data.name} onChange={(e) => updateListingDraft('name', e.target.value)} /></Field>
                  <Field label="Tagline"><input className="input" value={listingDraft.data.tagline} onChange={(e) => updateListingDraft('tagline', e.target.value)} /></Field>
                  <Field label="Description"><textarea className="input min-h-28" value={listingDraft.data.description} onChange={(e) => updateListingDraft('description', e.target.value)} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Nightly Price"><input className="input" type="number" value={listingDraft.data.pricePerNight} onChange={(e) => updateListingDraft('pricePerNight', Number(e.target.value))} /></Field>
                    <Field label="Airbnb Link"><input className="input" value={listingDraft.data.bookingUrl ?? ''} onChange={(e) => updateListingDraft('bookingUrl', e.target.value)} /></Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <Field label="Sleeps"><input className="input" type="number" value={listingDraft.data.sleeps} onChange={(e) => updateListingDraft('sleeps', Number(e.target.value))} /></Field>
                    <Field label="Bedrooms"><input className="input" type="number" value={listingDraft.data.bedrooms} onChange={(e) => updateListingDraft('bedrooms', Number(e.target.value))} /></Field>
                    <Field label="Bathrooms"><input className="input" type="number" value={listingDraft.data.bathrooms} onChange={(e) => updateListingDraft('bathrooms', Number(e.target.value))} /></Field>
                    <Field label="State"><input className="input" value={listingDraft.data.state ?? ''} onChange={(e) => updateListingDraft('state', e.target.value)} /></Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="City"><input className="input" value={listingDraft.data.city ?? ''} onChange={(e) => updateListingDraft('city', e.target.value)} /></Field>
                    <Field label="Theme"><input className="input" value={listingDraft.data.theme ?? ''} onChange={(e) => updateListingDraft('theme', e.target.value)} /></Field>
                  </div>
                  <Field label="Tags (one per line)"><textarea className="input min-h-28" value={joinLines(listingDraft.data.tags)} onChange={(e) => updateListingDraft('tags', splitLines(e.target.value))} /></Field>
                  <Field label="Images (one path or URL per line)"><textarea className="input min-h-40" value={joinLines(listingDraft.data.images)} onChange={(e) => updateListingDraft('images', splitLines(e.target.value))} /></Field>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={Boolean(listingDraft.data.worldCupReady)} onChange={(e) => updateListingDraft('worldCupReady', e.target.checked)} />
                    World Cup Ready
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <Button type="button" onClick={saveListingDraft} className="gap-2">
                      <Save className="h-4 w-4" /> Save Listing Draft
                    </Button>
                    <button onClick={deleteListingDraft} className="inline-flex items-center gap-2 rounded-full border border-red-300 px-5 py-3 text-sm font-medium text-red-200 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4" /> Delete Listing
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-white/70">Select a listing to edit or create a new one.</p>
              )}
            </section>
          </div>
        ) : null}

        {tab === 'gallery' ? (
          <section className="mt-8 rounded-[28px] border border-white/10 bg-surface/85 p-6">
            <SectionTitle title="About Page Highlights" description="Edit the gallery tiles and what each one links to." />
            <div className="flex justify-end">
              <button onClick={addHighlight} className="inline-flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm text-gold-light hover:bg-gold/10">
                <Plus className="h-4 w-4" /> Add Highlight
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {currentHighlights.map((item, index) => (
                <div key={`${item.href}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="Image"><input className="input" value={item.image} onChange={(e) => updateHighlight(index, 'image', e.target.value)} /></Field>
                    <Field label="Title"><input className="input" value={item.title} onChange={(e) => updateHighlight(index, 'title', e.target.value)} /></Field>
                    <Field label="Link"><input className="input" value={item.href} onChange={(e) => updateHighlight(index, 'href', e.target.value)} /></Field>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button onClick={() => deleteHighlight(index)} className="text-sm text-red-200 hover:text-red-100">Remove highlight</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {tab === 'sales' ? (
          <section className="mt-8 rounded-[28px] border border-white/10 bg-surface/85 p-6">
            <SectionTitle title="Flash Sale Offers" description="Edit the card content used in the flash sale section." />
            <div className="flex justify-end">
              <button onClick={addSaleOffer} className="inline-flex items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm text-gold-light hover:bg-gold/10">
                <Plus className="h-4 w-4" /> Add Offer
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {currentSales.map((offer, index) => (
                <div key={`${offer.title}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Title"><input className="input" value={offer.title} onChange={(e) => updateSaleOffer(index, 'title', e.target.value)} /></Field>
                    <Field label="Date Label"><input className="input" value={offer.dateLabel} onChange={(e) => updateSaleOffer(index, 'dateLabel', e.target.value)} /></Field>
                  </div>
                  <Field label="Description"><textarea className="input min-h-24" value={offer.description} onChange={(e) => updateSaleOffer(index, 'description', e.target.value)} /></Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Link"><input className="input" value={offer.href} onChange={(e) => updateSaleOffer(index, 'href', e.target.value)} /></Field>
                    <Field label="CTA Label"><input className="input" value={offer.ctaLabel} onChange={(e) => updateSaleOffer(index, 'ctaLabel', e.target.value)} /></Field>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button onClick={() => deleteSaleOffer(index)} className="text-sm text-red-200 hover:text-red-100">Remove offer</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm text-white/85">
      <span className="mb-1 block font-medium text-white/90">{label}</span>
      {children}
    </label>
  );
}

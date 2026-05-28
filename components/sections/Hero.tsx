import { Button } from '@/components/ui/Button';

type HeroButton = {
  label: string;
  href: string;
  variant?: 'gold' | 'outline-light';
};

type HeroProps = {
  coverSrc: string;
  headline: string;
  subheadline: string;
  ctaButtons: HeroButton[];
  badgeText?: string;
  badgeHref?: string;
};

function isVideoSource(src: string) {
  const lower = src.toLowerCase();
  return lower.startsWith('data:video/') || ['.mp4', '.webm', '.ogg', '.mov', '.m4v'].some((ext) => lower.endsWith(ext));
}

export function Hero({ coverSrc, headline, subheadline, ctaButtons, badgeText, badgeHref }: HeroProps) {
  const isVideo = isVideoSource(coverSrc);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
      {isVideo ? (
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="none">
          <source src={coverSrc} />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={coverSrc} alt="Home cover" className="absolute inset-0 h-full w-full object-cover" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/70" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 text-center md:px-8">
        <h1 className="hero-title font-display text-5xl leading-tight md:text-7xl lg:text-8xl">{headline}</h1>
        <p className="hero-sub mt-5 max-w-3xl text-sm text-white/90 md:text-xl">{subheadline}</p>
        <div className="hero-ctas mt-8 flex flex-wrap items-center justify-center gap-4">
          {ctaButtons.map((button) => (
            <Button key={button.label} href={button.href} variant={button.variant ?? 'gold'}>
              {button.label}
            </Button>
          ))}
        </div>

        {badgeText && badgeHref ? (
          <Button
            href={badgeHref}
            variant="outline-light"
            className="world-cup-badge mt-8 border-gold/60 bg-black/30 text-gold-light"
          >
            {badgeText}
          </Button>
        ) : null}
      </div>
    </section>
  );
}

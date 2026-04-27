import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center text-white">
      <h1 className="font-display text-6xl">Page Not Found</h1>
      <p className="mt-3 text-white/80">The page you requested does not exist.</p>
      <Link href="/" className="mt-8 rounded-full bg-gold px-6 py-3 text-sm font-medium text-text-dark">
        Return Home
      </Link>
    </div>
  );
}

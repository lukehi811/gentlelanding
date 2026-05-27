import { NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent } from '@/lib/site-content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  const content = await request.json();
  await saveSiteContent(content);
  return NextResponse.json({ ok: true });
}

import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
  const hasKey = Boolean(process.env.OPENAI_API_KEY);

  const isLive = !useMock && hasKey;

  return NextResponse.json({
    isLive,
    useMock,
    hasKey,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  });
}


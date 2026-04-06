import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GenerationRequest, GenerationResponse, ReviewReply, ReviewType } from '@/lib/types';

export const runtime = 'edge';

const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const openai =
  process.env.OPENAI_API_KEY && new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ApiError = { error: string };

function buildPrompt(payload: GenerationRequest) {
  const {
    review,
    businessName,
    industry,
    responseLength = 'medium',
    includeCallToAction,
    isNegativeReview,
  } = payload;

  const lengthHints: Record<string, string> = {
    short: 'Keep each reply under 45 words.',
    medium: 'Keep each reply around 60-90 words.',
    long: 'Keep each reply up to 130 words, but stay concise.',
  };

  const sentimentFlag = isNegativeReview ? 'negative' : 'auto-detect';

  return [
    {
      role: 'system' as const,
      content:
        'You craft concise, human, brand-safe replies to customer reviews for local small businesses. ' +
        'No sarcasm, no aggression. Be empathetic for negative reviews and appreciative for positive ones. ' +
        'Never over-apologize on positive feedback.',
    },
    {
      role: 'user' as const,
      content: [
        `Review: """${review}"""`,
        `Business name: ${businessName || 'not provided'}`,
        `Industry: ${industry || 'general'}`,
        `Sentiment flag: ${sentimentFlag}`,
        `Include call to action: ${includeCallToAction ? 'yes' : 'no'}`,
        `Length preference: ${responseLength}`,
        'Return JSON with keys warm, professional, recovery plus reviewType (positive|neutral|negative).',
        lengthHints[responseLength] || lengthHints.medium,
        'Add a one-sentence explanation for when to use each reply.',
        'Tone guidance: warm=friendlier, professional=neutral and polished, recovery=calm/solution-focused for negative or mixed reviews.',
      ].join('\n'),
    },
  ];
}

export async function POST(req: NextRequest) {
  if (!openai) {
    return NextResponse.json<ApiError>(
      { error: 'OpenAI API key is not configured' },
      { status: 500 }
    );
  }

  const body = (await req.json()) as GenerationRequest;

  try {
    const messages = buildPrompt(body);

    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      max_tokens: 600,
    });

    const parsed = JSON.parse(completion.choices[0]?.message?.content || '{}') as {
      warm?: string;
      professional?: string;
      recovery?: string;
      reviewType?: ReviewType;
      explanations?: {
        warm?: string;
        professional?: string;
        recovery?: string;
      };
    };

    const replies: ReviewReply[] = [
      {
        tone: 'warm',
        content: parsed.warm || 'Thanks for sharing your experience with us!',
        explanation:
          parsed.explanations?.warm ||
          'Friendly and appreciative. Best for positive or neutral reviews.',
      },
      {
        tone: 'professional',
        content:
          parsed.professional ||
          'Thank you for the feedback. We value your business and will keep improving.',
        explanation:
          parsed.explanations?.professional ||
          'Balanced and polished. Use when you want a formal tone.',
      },
      {
        tone: 'recovery',
        content:
          parsed.recovery ||
          'We’re sorry this missed the mark. We’d like to make it right—please reach out so we can help.',
        explanation:
          parsed.explanations?.recovery ||
          'Calm and solution-focused. Use for negative or sensitive reviews.',
      },
    ];

    const response: GenerationResponse = {
      replies,
      reviewType: parsed.reviewType || 'neutral',
      originalReview: body.review,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json<ApiError>(
      { error: error?.message || 'Failed to generate replies' },
      { status: 500 }
    );
  }
}

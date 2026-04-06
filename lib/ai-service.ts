import { GenerationRequest, GenerationResponse, ReviewType } from './types';

/**
 * Mock AI Generation Service
 * This service generates professional review replies using deterministic logic.
 * Later, replace the implementation to connect to OpenAI, Claude, or another model API.
 * The interface will remain the same.
 */

/**
 * Detect the sentiment of a review
 * In a real implementation, this could connect to a sentiment analysis API
 */
function detectReviewType(review: string, isNegativeOverride?: boolean): ReviewType {
  if (isNegativeOverride) return 'negative';

  const review_lower = review.toLowerCase();

  const negativeKeywords = [
    'awful',
    'terrible',
    'horrible',
    'bad',
    'worst',
    'waste',
    'disappointed',
    'avoid',
    'poor',
    'rude',
    'dirty',
    'disgusting',
    'unpleasant',
    'unprofessional',
  ];

  const positiveKeywords = [
    'amazing',
    'excellent',
    'great',
    'fantastic',
    'wonderful',
    'love',
    'perfect',
    'best',
    'awesome',
    'outstanding',
    'highly recommend',
    'impressed',
    'delighted',
  ];

  const negativeCount = negativeKeywords.filter((kw) =>
    review_lower.includes(kw)
  ).length;
  const positiveCount = positiveKeywords.filter((kw) =>
    review_lower.includes(kw)
  ).length;

  if (negativeCount > positiveCount && negativeCount > 0) {
    return 'negative';
  } else if (positiveCount > negativeCount && positiveCount > 0) {
    return 'positive';
  }

  return 'neutral';
}

/**
 * Generate a warm, friendly response
 */
function generateWarmReply(
  review: string,
  businessName?: string,
  industry?: string,
  responseLength?: string,
  includeCallToAction?: boolean
): string {
  const businessRef = businessName
    ? `at ${businessName}`
    : `with us`;
  const lengthMultiplier = responseLength === 'short' ? 1 : responseLength === 'long' ? 1.5 : 1.2;

  let reply = `Thank you so much for taking the time to share your wonderful feedback! We're thrilled that you had such a positive experience ${businessRef}. `;

  if (businessName && industry) {
    reply += `Your kind words mean the world to our team in the ${industry} industry. `;
  } else if (businessName) {
    reply += `Your kind words mean the world to our entire team. `;
  }

  reply += `We genuinely appreciate clients like you and we look forward to welcoming you back soon!`;

  if (includeCallToAction) {
    reply += ` We'd love to serve you again!`;
  }

  return reply;
}

/**
 * Generate a professional, neutral response
 */
function generateProfessionalReply(
  review: string,
  businessName?: string,
  industry?: string,
  responseLength?: string,
  includeCallToAction?: boolean
): string {
  const businessRef = businessName ? businessName : `our business`;

  let reply = `We appreciate your feedback on your recent experience at ${businessRef}. `;
  reply += `We're committed to maintaining high standards and continuously improving our services. `;

  if (industry) {
    reply += `We take pride in our ${industry} expertise and attention to detail. `;
  }

  reply += `Thank you for choosing us.`;

  if (includeCallToAction) {
    reply += ` We'd welcome the opportunity to serve you again.`;
  }

  return reply;
}

/**
 * Generate a recovery-focused response (for negative reviews)
 */
function generateRecoveryReply(
  review: string,
  businessName?: string,
  industry?: string,
  responseLength?: string,
  includeCallToAction?: boolean
): string {
  let reply = `Thank you for sharing your feedback. We're genuinely sorry to hear that your recent experience didn't meet your expectations. `;

  if (businessName) {
    reply += `This doesn't represent the standards we uphold at ${businessName}, and we take your concerns seriously. `;
  } else {
    reply += `This doesn't represent the standards we ask of ourselves, and we sincerely apologize. `;
  }

  reply += `We'd very much like the opportunity to make things right. `;

  if (includeCallToAction) {
    reply += `Please reach out to us directly so we can resolve this and earn back your trust.`;
  } else {
    reply += `We value your business and hope you'll give us another chance.`;
  }

  return reply;
}

/**
 * Main generation function - entry point for AI response generation
 * TODO: Connect to real AI API here
 */
export async function generateReplyOptions(
  request: GenerationRequest
): Promise<GenerationResponse> {
  // Simulate a small delay to feel more realistic
  await new Promise((resolve) => setTimeout(resolve, 300));

  const reviewType = detectReviewType(
    request.review,
    request.isNegativeReview
  );

  let warmReply = '';
  let professionalReply = '';
  let recoveryReply = '';

  // Generate responses based on review type
  if (reviewType === 'positive') {
    warmReply = generateWarmReply(
      request.review,
      request.businessName,
      request.industry,
      request.responseLength,
      request.includeCallToAction
    );

    professionalReply = generateProfessionalReply(
      request.review,
      request.businessName,
      request.industry,
      request.responseLength,
      request.includeCallToAction
    );

    // For positive reviews, recovery-focused is still warm but more business-focused
    recoveryReply =
      `We're incredibly grateful for your thoughtful review and your loyalty. ` +
      `Your recommendation means so much to us and helps us continue to serve our community better. ` +
      `${request.includeCallToAction ? `Thank you for choosing us!` : ''}`;
  } else if (reviewType === 'negative') {
    warmReply =
      `Thank you for taking the time to share your feedback. We're sorry your experience wasn't what you hoped for. ` +
      `We'd love the opportunity to understand what happened and make it right.`;

    professionalReply = generateProfessionalReply(
      request.review,
      request.businessName,
      request.industry,
      request.responseLength,
      request.includeCallToAction
    );

    recoveryReply = generateRecoveryReply(
      request.review,
      request.businessName,
      request.industry,
      request.responseLength,
      request.includeCallToAction
    );
  } else {
    // Neutral
    warmReply = generateWarmReply(
      request.review,
      request.businessName,
      request.industry,
      request.responseLength,
      request.includeCallToAction
    );

    professionalReply = generateProfessionalReply(
      request.review,
      request.businessName,
      request.industry,
      request.responseLength,
      request.includeCallToAction
    );

    recoveryReply =
      `We appreciate your feedback and welcome the chance to improve. ` +
      `Your insights help us serve better. Thank you for taking the time to leave a review.`;
  }

  return {
    replies: [
      {
        tone: 'warm',
        content: warmReply,
        explanation:
          'Friendly and appreciative. Best for positive reviews where you want to build rapport.',
      },
      {
        tone: 'professional',
        content: professionalReply,
        explanation:
          'Balanced and formal. Good for all review types when you want to maintain professionalism.',
      },
      {
        tone: 'recovery',
        content: recoveryReply,
        explanation:
          'Empathetic and solution-focused. Best for negative reviews where you need to address concerns.',
      },
    ],
    reviewType,
    originalReview: request.review,
  };
}

/**
 * Get example placeholder reviews for testing
 */
export const EXAMPLE_REVIEWS = [
  {
    text: 'Amazing experience! The team was so friendly and professional. Highly recommend to anyone looking for great service.',
    label: 'Positive Review (Cafe)',
  },
  {
    text: "Had issues with the service today. Staff seemed disorganized and the wait time was longer than expected. Not our best visit.",
    label: 'Negative Review (Restaurant)',
  },
  {
    text: 'Did the job. Nothing special, but no complaints. Fair pricing.',
    label: 'Neutral Review (Plumber)',
  },
  {
    text: 'Absolutely terrible experience. The dentist was rude and the office was dirty. Never coming back.',
    label: 'Strong Negative Review (Dentist)',
  },
  {
    text: 'Love this gym! Perfect facilities, great instructors, and the community is so supportive.',
    label: 'Enthusiastic Positive (Gym)',
  },
];

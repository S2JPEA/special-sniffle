export type ReviewType = 'positive' | 'neutral' | 'negative';
export type Tone = 'warm' | 'professional' | 'recovery';
export type ResponseLength = 'short' | 'medium' | 'long';

export interface ReviewReply {
  tone: Tone;
  content: string;
  explanation: string;
}

export interface GenerationRequest {
  review: string;
  businessName?: string;
  industry?: string;
  tone?: Tone;
  responseLength?: ResponseLength;
  includeCallToAction?: boolean;
  isNegativeReview?: boolean;
}

export interface GenerationResponse {
  replies: ReviewReply[];
  reviewType: ReviewType;
  originalReview: string;
}

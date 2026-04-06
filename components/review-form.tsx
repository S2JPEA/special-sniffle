'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/toast';
import { generateReplyOptions, EXAMPLE_REVIEWS } from '@/lib/ai-service';
import { validate, parseReviewInput } from '@/lib/utils';
import { GenerationResponse, ResponseLength } from '@/lib/types';
import { Sparkles, Zap } from 'lucide-react';

interface ReviewFormProps {
  onSuccessfulGeneration: (responses: GenerationResponse) => void;
}

const INDUSTRIES = [
  'Cafe / Coffee Shop',
  'Restaurant',
  'Salon / Hair',
  'Dentist',
  'Plumber',
  'Electrician',
  'Gym / Fitness',
  'Hotel / Accommodation',
  'Pharmacy',
  'Accounting / Tax',
  'Veterinary',
  'Travel Agency',
  'Other',
];

export default function ReviewForm({ onSuccessfulGeneration }: ReviewFormProps) {
  const [review, setReview] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [responseLength, setResponseLength] = useState<ResponseLength>('medium');
  const [includeCallToAction, setIncludeCallToAction] = useState(true);
  const [isNegativeReview, setIsNegativeReview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ review?: string }>({});
  const { toast } = useToast();

  const charCount = review.length;
  const wordCount = review.trim().split(/\s+/).filter(Boolean).length;

  const resetForm = useCallback(() => {
    setReview('');
    setBusinessName('');
    setIndustry('');
    setResponseLength('medium');
    setIncludeCallToAction(true);
    setIsNegativeReview(false);
    setErrors({});
  }, []);

  const handleLoadExample = (exampleText: string) => {
    setReview(exampleText);
    setErrors({});
  };

  const handleGenerate = async () => {
    // Validate
    const validation = validate.review(review);
    if (!validation.valid) {
      setErrors({ review: validation.error });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await generateReplyOptions({
        review: parseReviewInput(review),
        businessName: businessName || undefined,
        industry: industry || undefined,
        responseLength,
        includeCallToAction,
        isNegativeReview,
      });

      onSuccessfulGeneration(response);

      toast({
        title: '✓ Replies generated!',
        variant: 'success',
        duration: 2000,
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: 'Failed to generate replies',
        description: 'Please try again',
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="sticky top-20 rounded-2xl border border-border/60 bg-surface/90 shadow-lg shadow-black/20 backdrop-blur">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-5 w-5 text-primary" />
            Review workspace
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Paste the review, adjust options, and generate polished replies.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Review Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="review" className="text-sm font-semibold text-foreground">
                Customer review
              </Label>
              <span className="text-xs text-muted-foreground">Required</span>
            </div>
            <Textarea
              id="review"
              placeholder="Paste the customer review here... (minimum 10 characters)"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
                if (errors.review) setErrors({});
              }}
              disabled={isLoading}
              className="min-h-[120px] resize-none"
              aria-describedby="review-count"
            />
            <div id="review-count" className="flex justify-between text-xs text-muted-foreground">
              <span>{charCount} characters • {wordCount} words</span>
              <span className={charCount > 4800 ? 'text-amber-500' : ''}>{charCount}/5000</span>
            </div>
            {errors.review && (
              <p className="text-xs text-destructive font-medium">{errors.review}</p>
            )}
          </div>

          {/* Business Info */}
          <div className="space-y-2">
            <Label htmlFor="business" className="text-sm font-semibold text-foreground">
              Business name (optional)
            </Label>
            <Input
              id="business"
              placeholder="e.g., Sarah's Coffee Shop"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Industry Select */}
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-semibold text-foreground">
              Industry (optional)
            </Label>
            <Select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select an industry...</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </Select>
          </div>

          {/* Response Length */}
          <div className="space-y-2">
            <Label htmlFor="length" className="text-sm font-semibold text-foreground">
              Response length
            </Label>
            <div className="grid grid-cols-3 gap-2 text-sm font-medium">
              {[
                { value: 'short', label: 'Short' },
                { value: 'medium', label: 'Medium' },
                { value: 'long', label: 'Long' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setResponseLength(option.value as ResponseLength)}
                  className={`h-10 rounded-lg border px-3 transition ${
                    responseLength === option.value
                      ? 'border-primary bg-primary/15 text-foreground'
                      : 'border-border/70 bg-surface-2 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                  type="button"
                  disabled={isLoading}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-lg border border-border/70 bg-surface-2 px-3 py-3 text-sm">
              <Checkbox
                id="cta"
                checked={includeCallToAction}
                onChange={(e) => setIncludeCallToAction(e.currentTarget.checked)}
                disabled={isLoading}
              />
              <div className="space-y-0.5">
                <div className="font-medium text-foreground">Include CTA</div>
                <p className="text-xs text-muted-foreground">Invite the customer back or to contact you.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 rounded-lg border border-border/70 bg-surface-2 px-3 py-3 text-sm">
              <Checkbox
                id="negative"
                checked={isNegativeReview}
                onChange={(e) => setIsNegativeReview(e.currentTarget.checked)}
                disabled={isLoading}
              />
              <div className="space-y-0.5">
                <div className="font-medium text-foreground">Negative review</div>
                <p className="text-xs text-muted-foreground">Switches tone to recovery-first.</p>
              </div>
            </label>
          </div>

          {/* Generate Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !review.trim()}
              className="w-full h-12 rounded-xl bg-primary font-semibold shadow-lg shadow-primary/30 transition hover:bg-primary-hover"
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate replies
                </>
              )}
            </Button>
          </motion.div>

          {/* Info Box */}
          <div className="rounded-xl border border-border/60 bg-surface-2 p-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Tip:</span> Be specific and include names, dates, or visit details for sharper replies.
          </div>

          {/* Clear Button */}
          {review && (
            <Button
              onClick={resetForm}
              variant="secondary"
              disabled={isLoading}
              className="w-full rounded-xl border border-border/60 bg-surface-2 text-foreground hover:border-primary/50 hover:text-primary"
            >
              Clear
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

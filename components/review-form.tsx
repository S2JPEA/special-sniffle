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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { generateReplyOptions, EXAMPLE_REVIEWS } from '@/lib/ai-service';
import { validate, parseReviewInput } from '@/lib/utils';
import { GenerationResponse, ResponseLength } from '@/lib/types';
import { Sparkles, Zap, Copy } from 'lucide-react';

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
      <Card className="sticky top-20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Paste Your Review
          </CardTitle>
          <CardDescription>Describe what the customer said</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Review Textarea */}
          <div className="space-y-2">
            <Label htmlFor="review" className="text-base font-semibold">
              Customer Review *
            </Label>
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
            <div
              id="review-count"
              className="flex justify-between text-xs text-muted-foreground"
            >
              <span>
                {charCount} characters • {wordCount} words
              </span>
              <span className={charCount > 4800 ? 'text-amber-600' : ''}>
                {charCount}/5000
              </span>
            </div>
            {errors.review && (
              <p className="text-xs text-destructive font-medium">{errors.review}</p>
            )}
          </div>

          {/* Quick Example Buttons */}
          {!review && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Try an example:</p>
              <div className="grid grid-cols-2 gap-2">
                {EXAMPLE_REVIEWS.slice(0, 2).map((example, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadExample(example.text)}
                    disabled={isLoading}
                    className="h-auto text-xs font-normal"
                  >
                    <span className="line-clamp-2 text-left">{example.label}</span>
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {EXAMPLE_REVIEWS.slice(2, 4).map((example, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadExample(example.text)}
                    disabled={isLoading}
                    className="h-auto text-xs font-normal"
                  >
                    <span className="line-clamp-2 text-left">{example.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Business Info */}
          <div className="space-y-2">
            <Label htmlFor="business" className="text-sm font-semibold">
              Business Name (optional)
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
            <Label htmlFor="industry" className="text-sm font-semibold">
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
            <Label htmlFor="length" className="text-sm font-semibold">
              Response Length
            </Label>
            <Select
              id="length"
              value={responseLength}
              onChange={(e) => setResponseLength(e.target.value as ResponseLength)}
              disabled={isLoading}
            >
              <option value="short">Short (1-2 sentences)</option>
              <option value="medium">Medium (2-3 sentences)</option>
              <option value="long">Long (3-4 sentences)</option>
            </Select>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="cta"
                checked={includeCallToAction}
                onChange={(e) => setIncludeCallToAction(e.currentTarget.checked)}
                disabled={isLoading}
              />
              <Label htmlFor="cta" className="text-sm cursor-pointer font-normal">
                Include call-to-action
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="negative"
                checked={isNegativeReview}
                onChange={(e) => setIsNegativeReview(e.currentTarget.checked)}
                disabled={isLoading}
              />
              <Label htmlFor="negative" className="text-sm cursor-pointer font-normal">
                Customer left a negative review
              </Label>
            </div>
          </div>

          {/* Generate Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !review.trim()}
              className="w-full h-11 font-semibold flex items-center gap-2"
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
                  Generate Replies
                </>
              )}
            </Button>
          </motion.div>

          {/* Info Box */}
          <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">💡 Tip:</span> Be as specific as possible with your review
              description for better tailored responses.
            </p>
          </div>

          {/* Clear Button */}
          {review && (
            <Button
              onClick={resetForm}
              variant="secondary"
              disabled={isLoading}
              className="w-full"
            >
              Clear
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

'use client';

import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { copyToClipboard, text } from '@/lib/utils';
import { GenerationResponse, Tone } from '@/lib/types';
import { generateReplyOptions } from '@/lib/ai-service';
import {
  Copy,
  Check,
  RotateCcw,
  Download,
  Share2,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';

interface ResponseCardsProps {
  responses: GenerationResponse;
  onRegenerate?: (next: GenerationResponse) => void; // optional upward notification
}

const TONE_CONFIG = {
  warm: {
    icon: '🌟',
    color: 'warm' as const,
    description: 'Friendly and appreciative',
  },
  professional: {
    icon: '💼',
    color: 'professional' as const,
    description: 'Balanced and formal',
  },
  recovery: {
    icon: '🔧',
    color: 'recovery' as const,
    description: 'Empathetic and solution-focused',
  },
};

export default function ResponseCards({ responses, onRegenerate }: ResponseCardsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cooldowns, setCooldowns] = useState<Record<Tone, number>>({
    warm: 0,
    professional: 0,
    recovery: 0,
  });
  const [isRegenLoading, setIsRegenLoading] = useState<Record<Tone, boolean>>({
    warm: false,
    professional: false,
    recovery: false,
  });
  const { toast } = useToast();
  const cardRefs = {
    warm: useRef<HTMLDivElement | null>(null),
    professional: useRef<HTMLDivElement | null>(null),
    recovery: useRef<HTMLDivElement | null>(null),
  };

  const startCooldown = (tone: Tone) => {
    const until = Date.now() + 15_000;
    setCooldowns((prev) => ({ ...prev, [tone]: until }));
    setTimeout(() => {
      setCooldowns((prev) => ({ ...prev, [tone]: 0 }));
    }, 15_000);
  };

  const handleRegenerate = async (tone: Tone) => {
    if (cooldowns[tone] > Date.now()) return;
    if (!generateReplyOptions) return;
    setIsRegenLoading((prev) => ({ ...prev, [tone]: true }));
    startCooldown(tone);

    try {
      const newResponse = await generateReplyOptions(baseRequest);
      const updatedReplies = responses.replies.map((r) =>
        r.tone === tone
          ? newResponse.replies.find((nr) => nr.tone === tone) || r
          : r
      );

      // Notify parent if provided; otherwise mutate local state
      if (onRegenerate) {
        onRegenerate({
          ...responses,
          replies: updatedReplies,
          reviewType: newResponse.reviewType,
        } as any);
      } else {
        responses.replies.splice(0, responses.replies.length, ...updatedReplies);
        responses.reviewType = newResponse.reviewType;
      }

      toast({
        title: 'Reply refreshed',
        description: `${tone} tone regenerated`,
        variant: 'success',
        duration: 1800,
      });
    } catch (err: any) {
      toast({
        title: 'Failed to regenerate',
        description: err?.message || 'Please try again',
        variant: 'destructive',
        duration: 2500,
      });
    } finally {
      setIsRegenLoading((prev) => ({ ...prev, [tone]: false }));
    }
  };

  // base request reconstructed from current response context
  const baseRequest = useMemo(() => {
    return {
      review: responses.originalReview,
      businessName: undefined,
      industry: undefined,
      responseLength: undefined,
      includeCallToAction: undefined,
      isNegativeReview: responses.reviewType === 'negative',
    };
  }, [responses.originalReview, responses.reviewType]);

  const handleCopy = async (text: string, tone: Tone) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(tone);
      toast({
        title: 'Copied to clipboard!',
        variant: 'success',
        duration: 2000,
      });
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDownload = () => {
    const content = responses.replies
      .map(
        (reply) =>
          `[${reply.tone.toUpperCase()}]\n${reply.content}\n\n---\n`
      )
      .join('\n');

    text.downloadAsFile(content, 'review-replies.txt');
    toast({
      title: 'Downloaded!',
      variant: 'success',
      duration: 2000,
    });
  };

  const handleShare = () => {
    const shareText = `Generated 3 professional review replies:\n\n${responses.replies
      .map((r) => `- [${r.tone}] ${r.content}`)
      .join('\n')}`;

    if (navigator.share) {
      navigator.share({
        title: 'Review Replies',
        text: shareText,
      });
    } else {
      copyToClipboard(shareText);
      toast({
        title: 'Copied to clipboard!',
        description: 'Share your replies',
        variant: 'success',
        duration: 2000,
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="space-y-3">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {(['warm', 'professional', 'recovery'] as Tone[]).map((tone) => (
              <button
                key={tone}
                onClick={() => cardRefs[tone].current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="rounded-full border border-border/70 bg-surface-2 px-3 py-1 text-xs font-semibold capitalize text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                {tone}
              </button>
            ))}
            <Badge variant="outline" className="text-xs border-border/70 bg-surface-2">
              {responses.reviewType === 'positive'
                ? 'Positive'
                : responses.reviewType === 'negative'
                  ? 'Negative'
                  : 'Neutral'}
            </Badge>
          </div>
        </motion.div>
      </div>

      {/* Response Cards */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {responses.replies.map((reply, index) => {
            const config = TONE_CONFIG[reply.tone];
            const isCopied = copiedId === reply.tone;

            return (
              <motion.div
                key={reply.tone}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                ref={cardRefs[reply.tone]}
              >
                <Card className="overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/15">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{config.icon}</span>
                        <div>
                          <CardTitle className="text-lg capitalize">{reply.tone} tone</CardTitle>
                          <CardDescription>{config.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={config.color} className="text-xs border-border/60">
                        {reply.tone}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Response Text */}
                    <div className="rounded-xl border border-border/60 bg-surface-2/80 p-4">
                      <p className="text-sm leading-relaxed text-foreground">{reply.content}</p>
                    </div>

                    {/* Explanation */}
                    <div className="flex gap-2 rounded-lg border border-accent/15 bg-accent/5 p-3">
                      <Lightbulb className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">{reply.explanation}</p>
                    </div>

                    {/* Character Count */}
                    <div className="text-xs text-muted-foreground">{reply.content.length} characters</div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button onClick={() => handleCopy(reply.content, reply.tone)} variant={isCopied ? 'default' : 'outline'} size="sm" className="w-full rounded-lg">
                          {isCopied ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => handleRegenerate(reply.tone)}
                          variant="outline"
                          size="sm"
                          className="w-full rounded-lg"
                          disabled={isRegenLoading[reply.tone] || cooldowns[reply.tone] > Date.now()}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          {isRegenLoading[reply.tone]
                            ? 'Refreshing...'
                            : cooldowns[reply.tone] > Date.now()
                              ? 'Cooling down'
                              : 'Regenerate'}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bulk Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex gap-2 pt-4 border-t border-border/40">
        <Button onClick={handleDownload} variant="secondary" className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-surface-2">
          <Download className="h-4 w-4" />
          Download all
        </Button>
        <Button onClick={handleShare} variant="secondary" className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-surface-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </motion.div>

      {/* Tips */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }} className="rounded-xl border border-border/60 bg-surface-2 p-4 space-y-2">
        <div className="flex gap-2">
          <TrendingUp className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">Pro tip</p>
            <p className="text-xs text-muted-foreground">Personalize the reply by including specific details from the review or your business name.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

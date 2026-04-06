'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { copyToClipboard, text } from '@/lib/utils';
import { GenerationResponse, Tone } from '@/lib/types';
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
  onRegenerate: () => void;
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
  const { toast } = useToast();

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Response Header */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Your Responses</h2>
            <Badge variant="outline" className="text-xs">
              {responses.reviewType === 'positive'
                ? '👍 Positive'
                : responses.reviewType === 'negative'
                  ? '👎 Negative'
                  : '➡️ Neutral'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Choose the response that fits your brand best. Click to copy.
          </p>
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
              >
                <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{config.icon}</span>
                        <div>
                          <CardTitle className="text-lg capitalize">
                            {reply.tone} Tone
                          </CardTitle>
                          <CardDescription>{config.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={config.color} className="text-xs">
                        {reply.tone}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Response Text */}
                    <div className="rounded-lg bg-muted/50 p-4 border border-border/30">
                      <p className="text-sm leading-relaxed text-foreground">
                        {reply.content}
                      </p>
                    </div>

                    {/* Explanation */}
                    <div className="flex gap-2 rounded-lg bg-accent/5 p-3 border border-accent/10">
                      <Lightbulb className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">{reply.explanation}</p>
                    </div>

                    {/* Character Count */}
                    <div className="text-xs text-muted-foreground">
                      {reply.content.length} characters
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => handleCopy(reply.content, reply.tone)}
                          variant={isCopied ? 'default' : 'outline'}
                          size="sm"
                          className="w-full"
                        >
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

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={onRegenerate}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Regenerate
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex gap-2 pt-4 border-t border-border/40"
      >
        <Button
          onClick={handleDownload}
          variant="secondary"
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download all
        </Button>
        <Button
          onClick={handleShare}
          variant="secondary"
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-2"
      >
        <div className="flex gap-2">
          <TrendingUp className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-foreground">Pro tip</p>
            <p className="text-xs text-muted-foreground">
              Personalize the reply even more by mentioning specific details from the review or your
              business name.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

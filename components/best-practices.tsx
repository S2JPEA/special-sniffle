'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BestPractices() {
  return (
    <div className="mx-auto max-w-6xl px-2 md:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <p className="text-xs uppercase tracking-[0.14em] text-primary">Guide</p>
        <h2 className="mb-3 text-3xl font-semibold md:text-4xl">Reply with confidence</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Keep every response concise, human, and brand-safe. Use these quick guardrails.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div variants={CONTAINER_VARIANTS} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card className="h-full rounded-2xl border border-border/60 bg-surface shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                What good replies do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.ul className="space-y-2 text-sm" variants={CONTAINER_VARIANTS} initial="hidden" whileInView="visible">
                {[
                  'Acknowledge the customer by name when provided',
                  'Reference a specific detail from their review',
                  'Keep it to 2-3 sentences',
                  'Close with appreciation and an invitation back',
                ].map((item, idx) => (
                  <motion.li key={idx} variants={ITEM_VARIANTS} className="flex gap-3">
                    <span className="text-success font-bold">•</span>
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={CONTAINER_VARIANTS} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card className="h-full rounded-2xl border border-border/60 bg-surface shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertCircle className="h-5 w-5" />
                What to avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.ul className="space-y-2 text-sm" variants={CONTAINER_VARIANTS} initial="hidden" whileInView="visible">
                {[
                  'Defensive language or blame',
                  'Copy-paste templates without specifics',
                  'Over-apologizing on positive reviews',
                  'Sharing private details in public replies',
                ].map((item, idx) => (
                  <motion.li key={idx} variants={ITEM_VARIANTS} className="flex gap-3">
                    <span className="text-warning font-bold">•</span>
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={CONTAINER_VARIANTS} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card className="h-full rounded-2xl border border-border/60 bg-surface shadow-lg shadow-black/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <XCircle className="h-5 w-5" />
                Common mistakes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground">
              <div>
                <p className="font-semibold">Sounding robotic</p>
                <p className="text-muted-foreground text-xs">Echoing the review without adding empathy or specificity.</p>
              </div>
              <div>
                <p className="font-semibold">Wrong tone</p>
                <p className="text-muted-foreground text-xs">Positive reviews need gratitude; negative reviews need accountability.</p>
              </div>
              <div>
                <p className="font-semibold">Too long</p>
                <p className="text-muted-foreground text-xs">Keep it concise; length often reads as defensive.</p>
              </div>
              <div>
                <p className="font-semibold">Requesting removal</p>
                <p className="text-muted-foreground text-xs">Focus on resolution; never ask to delete a review.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

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
    <div className="mx-auto max-w-7xl px-4">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Review Reply Best Practices</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Learn how to craft replies that improve your reputation and build customer loyalty.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Do's */}
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-200">
                <CheckCircle2 className="h-5 w-5" />
                What to Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.ul
                className="space-y-3"
                variants={CONTAINER_VARIANTS}
                initial="hidden"
                whileInView="visible"
              >
                {[
                  'Respond promptly (within 24-48 hours)',
                  'Be genuine and authentic',
                  'Address specific points from the review',
                  'Take responsibility for mistakes',
                  'Offer solutions or next steps',
                  'Keep responses under 3-4 sentences',
                  'Include your business name',
                  'Invite them back or invite further contact',
                ].map((item, idx) => (
                  <motion.li key={idx} variants={ITEM_VARIANTS} className="flex gap-3 text-sm">
                    <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Don'ts */}
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-200">
                <XCircle className="h-5 w-5" />
                What to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.ul
                className="space-y-3"
                variants={CONTAINER_VARIANTS}
                initial="hidden"
                whileInView="visible"
              >
                {[
                  'Over-apologizing for positive reviews',
                  'Being defensive or dismissive',
                  'Generic, copy-paste responses',
                  'Arguing about facts or experiences',
                  'Making excuses without solutions',
                  'Writing in all caps',
                  'Sharing personal information',
                  'Ignoring reviews entirely',
                ].map((item, idx) => (
                  <motion.li key={idx} variants={ITEM_VARIANTS} className="flex gap-3 text-sm">
                    <span className="text-red-600 dark:text-red-400 font-bold">✕</span>
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Common Mistakes Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-6"
      >
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
              <AlertCircle className="h-5 w-5" />
              Common Mistakes to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2 text-foreground">1. Sounding Robotic</h4>
              <p className="text-sm text-muted-foreground">
                Avoid templated responses that do not address the specific review. Reference details
                to show you actually read it.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2 text-foreground">2. Wrong Tone for the Situation</h4>
              <p className="text-sm text-muted-foreground">
                Negative reviews need empathy and solutions, not praise. Positive reviews don&apos;t need
                over-apologizing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2 text-foreground">3. Too Long or Too Short</h4>
              <p className="text-sm text-muted-foreground">
                Keep it concise. 2-3 sentences usually works best. Longer responses often seem
                defensive.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2 text-foreground">4. Asking for Removal</h4>
              <p className="text-sm text-muted-foreground">
                Never ask customers to remove negative reviews. Instead, focus on resolution and
                improvement.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

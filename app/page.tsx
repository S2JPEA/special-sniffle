'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ReviewForm from '@/components/review-form';
import ResponseCards from '@/components/response-cards';
import BestPractices from '@/components/best-practices';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { GenerationResponse } from '@/lib/types';

export default function Home() {
  const [responses, setResponses] = useState<GenerationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateResponses = async (responses: GenerationResponse) => {
    setResponses(responses);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background/80 to-transparent px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>Powered by intelligent reply generation</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Professional Review Replies
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                In Seconds
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Stop wasting time crafting the perfect response. Get three professional reply options
              tailored to your customer&apos;s review. Perfect for cafes, dentists, plumbers, salons,
              and any local business.
            </p>

            <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center">
              <span>✓ No login required</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ No data stored</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ Works on mobile</span>
            </div>
          </motion.div>
        </section>

        {/* Main App Section */}
        <section className="relative px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <ReviewForm onSuccessfulGeneration={handleGenerateResponses} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2"
              >
                {responses ? (
                  <ResponseCards responses={responses} onRegenerate={() => setResponses(null)} />
                ) : (
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border/50 bg-muted/20 px-6 py-16 text-center md:py-20">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-muted-foreground">
                        Ready to generate replies?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Paste a customer review on the left to get three professional response options.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="border-t border-border/40 bg-muted/20 px-4 py-12 md:py-16">
          <BestPractices />
        </section>
      </main>

      <Footer />
    </div>
  );
}

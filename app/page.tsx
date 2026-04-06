'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Smartphone, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(20,184,166,0.12),transparent_30%),var(--bg)] text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/30 bg-gradient-to-b from-surface/70 via-surface/40 to-transparent px-4 py-10 md:py-14">
          <div className="absolute inset-0 pointer-events-none" aria-hidden />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-start"
          >
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface-2/80 px-3 py-1 text-[12px] font-semibold text-muted-foreground backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Free forever · no login · no storage
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  Premium review replies
                  <span className="block text-primary">in seconds, not hours.</span>
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground">
                  Paste any customer review and get three polished, on-brand responses designed to build trust and win back time.
                </p>
                <p className="text-sm font-semibold text-primary">100% free, browser-based. No accounts ever.</p>
              </div>

              <div className="text-sm text-muted-foreground">
                Quality-checked wording · Optimized for mobile · Fast, browser-based
              </div>
            </div>

            {/* Form above the fold */}
            <div className="flex-1">
              <ReviewForm onSuccessfulGeneration={handleGenerateResponses} />
            </div>
          </motion.div>
        </section>

        {/* Main App Section */}
        <section id="workspace" className="relative scroll-mt-24 px-4 py-10 md:py-12 -mt-2 md:-mt-4">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {responses ? (
                <ResponseCards responses={responses} onRegenerate={(next) => setResponses(next)} />
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border/60 bg-surface/60 px-6 py-16 text-center md:py-20">
                  <div className="max-w-md space-y-3">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Ready to generate?</h3>
                    <p className="text-sm text-muted-foreground">
                      Paste a customer review above to instantly draft three polished responses tailored to your tone.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="border-t border-border/40 bg-surface-2/70 px-4 py-8 md:py-10">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 md:gap-4">
            {[
              { icon: ShieldCheck, label: 'No login required' },
              { icon: Smartphone, label: 'Built for mobile' },
              { icon: Sparkles, label: 'AI-assisted quality' },
              { icon: Zap, label: 'Fast, browser-based' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-2 text-sm text-muted-foreground shadow-sm"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="border-t border-border/40 bg-surface/60 px-4 py-12 md:py-16">
          <BestPractices />
        </section>
      </main>

      <Footer />
    </div>
  );
}

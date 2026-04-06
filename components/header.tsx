'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { IS_MOCK_MODE } from '@/lib/ai-service';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">ReviewReply</span>
          </div>
          <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
            <span className="hidden sm:inline">Professional replies for local businesses</span>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${
                IS_MOCK_MODE
                  ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-100'
                  : 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-100'
              }`}
              aria-label={IS_MOCK_MODE ? 'Mock mode enabled' : 'Live AI enabled'}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  IS_MOCK_MODE ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
              {IS_MOCK_MODE ? 'Mock Mode' : 'Live AI'}
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

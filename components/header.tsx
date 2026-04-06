'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Moon, Sun } from 'lucide-react';
import { IS_MOCK_MODE } from '@/lib/ai-service';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { useGenerationStatus } from '@/hooks/use-generation-status';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { status } = useGenerationStatus();

  const live = status ? status.isLive : !IS_MOCK_MODE;
  const chipLabel = status
    ? status.isLive
      ? 'Live AI'
      : status.useMock || !status.hasKey
        ? 'Mock'
        : 'Unavailable'
    : IS_MOCK_MODE
      ? 'Mock'
      : 'Live AI';
  const chipColor = status
    ? status.isLive
      ? 'emerald'
      : 'amber'
    : IS_MOCK_MODE
      ? 'amber'
      : 'emerald';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-border/30 bg-surface/80 backdrop-blur supports-[backdrop-filter]:bg-surface/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">ReviewReply</div>
              <div className="text-[11px] text-muted-foreground">Free AI replies</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                chipColor === 'emerald'
                  ? 'border-emerald-300/50 bg-emerald-500/10 text-emerald-50'
                  : 'border-amber-300/50 bg-amber-500/10 text-amber-100'
              }`}
              aria-label={chipLabel}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  chipColor === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              {chipLabel}
            </span>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="h-9 w-9 border border-border/50 bg-surface/60 hover:bg-card-hover"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <a
              href="#workspace"
              className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg border border-border/60 px-4 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              Generate
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

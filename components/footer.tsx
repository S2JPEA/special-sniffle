'use client';

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-surface px-4 py-12 text-sm">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <div className="flex items-center gap-2 text-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">ReviewReply</p>
                <p className="text-xs text-muted-foreground">Premium AI replies for real businesses — free forever.</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Keep customer conversations on-brand with fast, trustworthy responses; no accounts, no data stored.
            </p>
          </div>

          <div className="flex-1 space-y-3">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Stay updated</p>
            <div className="rounded-xl border border-border/60 bg-surface-2 p-3 text-xs text-muted-foreground">
              Newsletter coming soon — practical tips for faster, better replies.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/50 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {currentYear} ReviewReply. Built with care for local businesses.</span>
          <span>No login • No storage • Works on mobile</span>
        </div>
      </div>
    </footer>
  );
}

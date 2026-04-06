'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

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
          <div className="text-xs text-muted-foreground md:text-sm">
            Professional replies for local businesses
          </div>
        </div>
      </div>
    </motion.header>
  );
}

'use client';

import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  For Businesses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Placeholder */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Newsletter</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Get tips for better reviews
            </p>
            <div className="bg-muted rounded p-2 text-xs text-muted-foreground">
              [Newsletter signup coming soon]
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 pt-8 flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} ReviewReply. Made with{' '}
            <Heart className="inline h-3 w-3 text-destructive" /> for local businesses.
          </p>
          <p className="text-xs text-muted-foreground">No data stored • No accounts needed</p>
        </div>
      </div>
    </footer>
  );
}

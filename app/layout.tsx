import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import ThemeProvider from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Review Reply Generator - Professional Replies in Seconds',
  description:
    'Generate professional, personalized replies to customer reviews in seconds. Perfect for local businesses like cafes, dentists, plumbers, salons, and more.',
  keywords:
    'review reply, customer reviews, local business, Google reviews, business reputation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

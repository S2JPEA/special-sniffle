# Review Reply Generator

A production-ready MVP web app that helps local businesses generate professional replies to customer reviews in seconds.

**Live Demo:** [Coming soon]

## 🎯 Features

- ✅ **No login required** - Works completely client-side
- ✅ **No database** - All processing happens in your browser
- ✅ **3 response styles** - Warm, Professional, Recovery-focused
- ✅ **Mobile responsive** - Fully functional on desktop and mobile
- ✅ **Copy to clipboard** - One-click sharing
- ✅ **Download replies** - Export as text file
- ✅ **Sentiment detection** - Tailors responses to review type
- ✅ **Beautiful UI** - Modern SaaS design with Shadcn/UI
- ✅ **Fast generation** - Instant mock responses (ready for real AI API)

## 🏗️ Project Structure

```
review-reply-generator/
├── app/
│   ├── layout.tsx           # Root layout with Toast provider
│   ├── page.tsx             # Main page with sections
│   ├── globals.css          # Global Tailwind styles
│   └── favicon.ico
├── components/
│   ├── ui/                  # Shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── select.tsx
│   │   └── toast.tsx
│   ├── review-form.tsx      # Review input form
│   ├── response-cards.tsx   # Generated responses display
│   ├── best-practices.tsx   # Tips and guidelines
│   ├── header.tsx           # Site header
│   └── footer.tsx           # Site footer
├── lib/
│   ├── types.ts             # TypeScript type definitions
│   ├── ai-service.ts        # Mock AI generation (ready for real API)
│   ├── utils.ts             # Utility functions
│   └── cn.ts                # Classname utility (tailwind-merge)
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── .eslintrc.json          # ESLint config
├── .gitignore              # Git ignore rules
├── .npmrc                  # npm config
├── next.config.js          # Next.js config
├── package.json            # Dependencies
├── postcss.config.js       # PostCSS config
├── tailwind.config.ts      # Tailwind CSS config
└── tsconfig.json           # TypeScript config

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd review-reply-generator

# Install dependencies
npm install
# or
yarn install
pnpm install

# Copy environment variables (optional)
cp .env.example .env.local
```

### Development

```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start

# Or just build (for static deployment)
npm run build
```

## 🎨 Design Features

### Colors & Styling
- **Clean SaaS aesthetic** - Professional yet approachable
- **Rounded cards** - Modern component design
- **Soft shadows** - Depth without harshness
- **Spacious layout** - Breathing room between elements
- **Dark mode ready** - CSS variables support

### Typography
- **Clear hierarchy** - Optimal font sizes and weights
- **High readability** - Excellent contrast ratios
- **Responsive text** - Scales properly on mobile

### Responsive Design
- **Mobile-first approach** - Excellent mobile experience
- **Tablet optimized** - 3-column layout on desktop
- **Touch-friendly** - Large tap targets (44x44px minimum)
- **Sticky header** - Easy navigation

## 🤖 AI Generation

### Current Implementation (Mock)

The app uses **mock AI generation** with deterministic logic:
- Sentiment detection based on keyword analysis
- Tone-specific response templates
- Dynamic personalization with business name/industry
- Response length variations

This allows the MVP to work immediately without an API key.

### Connecting a Real AI Model

To connect to OpenAI, Claude, or another model:

1. **Place API call logic in `lib/ai-service.ts`**

   Replace the `generateReplyOptions` function:

   ```typescript
   export async function generateReplyOptions(
     request: GenerationRequest
   ): Promise<GenerationResponse> {
     // Call your real AI API here
     const response = await fetch('/api/generate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(request),
     });

     return response.json();
   }
   ```

2. **Create a backend API route** (optional, for security):

   ```typescript
   // app/api/generate/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   import OpenAI from 'openai';

   export async function POST(request: NextRequest) {
     const body = await request.json();

     const openai = new OpenAI({
       apiKey: process.env.OPENAI_API_KEY,
     });

     const prompt = buildPrompt(body);

     const response = await openai.chat.completions.create({
       model: 'gpt-4',
       messages: [{ role: 'user', content: prompt }],
       temperature: 0.7,
     });

     // Parse and format response
     return NextResponse.json(parseResponse(response));
   }
   ```

3. **Add API key to `.env.local`**:

   ```
   OPENAI_API_KEY=sk-...
   ```

4. **Update TypeScript types** if needed in `lib/types.ts`

**The interface stays the same**, so the rest of the app needs no changes!

## 📦 Component Library

### UI Components (Shadcn/ui based)

- **Button** - Multiple variants (default, outline, ghost, destructive)
- **Input** - Text input with validation styling
- **Textarea** - Multi-line text with auto character count
- **Label** - Accessible form labels
- **Select** - Native select with tailwind styling
- **Checkbox** - Custom checkbox with Tailwind
- **Card** - Container with header, title, description, content, footer
- **Badge** - Status indicators (warm, professional, recovery)
- **Toast** - Notification system with Framer Motion

All components are fully accessible with ARIA labels and keyboard support.

## ⚙️ Key Features Explained

### 1. Review Input Form

- Auto-detect if review is positive/negative/neutral
- Optional business name for personalization
- Industry selector for context
- Response length control (short/medium/long)
- Call-to-action toggle
- Negative review flag for special handling
- Character and word count display
- Example review buttons for quick testing

### 2. Response Generation

- Three tones: Warm, Professional, Recovery-focused
- Each response has an explanation of when to use it
- Character count for each response
- Copy-to-clipboard with toast feedback
- Regenerate individual responses
- Batch download as text file

### 3. User Experience

- **Loading states** - Spinner while generating
- **Empty state** - Helpful text before first generation
- **Error handling** - Toast notifications for failures
- **Mobile sticky** - CTA stays accessible on mobile
- **Dark mode support** - Full CSS variable system
- **Accessibility** - Keyboard navigation, ARIA labels, semantic HTML

### 4. Best Practices Guide

- "Do's and Don'ts" cards
- Common mistakes to avoid
- Color-coded guidance (green for good, red for bad)
- Motion animations for visual interest

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Then:
# 1. Go to https://vercel.com
# 2. Click "New Project"
# 3. Connect GitHub repository
# 4. Vercel will auto-detect Next.js
# 5. Click "Deploy"
```

Vercel auto-deploys on every push and provides:
- ✅ Edge caching
- ✅ Automatic HTTPS
- ✅ Performance optimizations
- ✅ Environment variables management

### Deploy to Netlify

```bash
# Build the static files
npm run build

# Netlify supports Node functions for API routes
# 1. Connect GitHub to Netlify
# 2. Set build command: npm run build
# 3. Set publish directory: .next
# 4. Deploy
```

### Deploy to Self-Hosted Server

```bash
# Build
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start "npm start" --name review-reply-generator
pm2 save
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Analytics Placeholders

The app is structured to support analytics. Add to header section:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 📧 Newsletter & Ads

Placeholder sections are designed for future monetization:
- Newsletter signup in footer
- "Ad space" areas clearly marked
- No tracking added yet (privacy-first design)

When ready to add monetization:
1. Newsletter service: Mailchimp, ConvertKit, or Substack
2. Ad network: Google AdSense or custom sponsorships

## 🔐 Security & Privacy

- ✅ **No server-side storage** - Everything client-side
- ✅ **No tracking by default** - Analytics optional
- ✅ **No authentication** - Stateless design
- ✅ **HTTPS everywhere** - Auto on Vercel/Netlify
- ✅ **No cookies** - Only localStorage (optional, user-controlled)
- ✅ **Open source ready** - MIT license compatible

## 🎓 Learning Resources

### Next.js 14
- [App Router Docs](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/api-routes/introduction)

### Tailwind CSS
- [Official Docs](https://tailwindcss.com/docs)
- [Component Examples](https://tailwindcss.com/docs/components)

### Shadcn/ui
- [Component Library](https://ui.shadcn.com)
- [Installation Guide](https://ui.shadcn.com/docs/installation)

### TypeScript
- [Official Docs](https://www.typescriptlang.org/docs)
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app)

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Clean build
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Type errors
```bash
npm run type-check
```

### Clear Next.js cache
```bash
rm -rf .next
npm run build
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this for commercial projects

## 🗺️ Roadmap

### Phase 1 ✅ (Current)
- Mock AI generation
- Core UI and components
- Client-side only (no backend)

### Phase 2 (Next)
- Real AI model integration (OpenAI/Claude)
- API backend (optional)
- Authentication (optional)
- Database for saved replies (optional)

### Phase 3 (Future)
- Mobile app (React Native)
- Browser extensions
- Email integration
- Bulk reply management
- Team/multi-user support

## 📞 Support

For issues or questions:
- GitHub Issues: [Link]
- Email: [support@reviewreply.app](mailto:support@reviewreply.app)
- Twitter: [@ReviewReply](https://twitter.com/ReviewReply)

---

**Built with ❤️ for small business owners**

Happy replying! 🚀

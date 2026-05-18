# ⚡ Siteforge — AI Website Builder for Small Businesses

A complete, production-ready Next.js platform that lets small business owners generate full websites with AI-powered content, SEO pages, and booking integration — in under 60 seconds.

## ✨ Features

- **AI Content Generation** — Full website copy via Claude (Anthropic)
- **SEO Pages Auto-Created** — Location + service pages generated automatically
- **Booking Integration** — Contact forms and appointment booking
- **4-Step Onboarding Wizard** — Business type → style → pages → generate
- **Dashboard** — Manage sites, view analytics, track SEO rankings
- **Pricing Page** — Monthly/yearly toggle with FAQ accordion
- **Vercel-Ready** — One-click deploy to edge CDN

## 🗂 Project Structure

```
ai-site-builder/
├── app/
│   ├── page.tsx              # Landing page (hero, features, pricing, CTA)
│   ├── onboarding/page.tsx   # 4-step wizard + AI generation loader
│   ├── dashboard/page.tsx    # Site management dashboard
│   ├── pricing/page.tsx      # Full pricing page with FAQs
│   ├── api/
│   │   ├── generate/route.ts # POST /api/generate — AI site generation
│   │   └── preview/route.ts  # GET /api/preview — Template previews
│   └── globals.css           # Design tokens, animations, utilities
├── tailwind.config.js
├── next.config.js
├── vercel.json
└── .env.example
```

## 🚀 Quick Start

### 1. Clone and install

```bash
git clone https://github.com/yourusername/ai-site-builder.git
cd ai-site-builder
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
```
ANTHROPIC_API_KEY=your_key_from_console.anthropic.com
```

### 3. Run locally

```bash
npm run dev
# → http://localhost:3000
```

## 🌐 Deploy to Vercel

### Option A: One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-site-builder)

### Option B: CLI

```bash
npm i -g vercel
vercel
# Follow prompts, add ANTHROPIC_API_KEY when asked
```

### Option C: GitHub + Vercel dashboard

1. Push to GitHub
2. Import repo at vercel.com/new
3. Add `ANTHROPIC_API_KEY` in Environment Variables
4. Deploy

## 🔑 API Reference

### `POST /api/generate`

Generate complete website content for any business type.

**Request:**
```json
{
  "businessType": "Hair Salon",
  "businessName": "Glow Beauty Studio",
  "location": "Austin, TX",
  "style": "Modern & Clean",
  "color": "#F59E0B",
  "pages": ["Home", "Services", "About", "Contact", "Book Now"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "businessName": "Glow Beauty Studio",
    "tagline": "Your best hair starts here.",
    "hero": { "headline": "...", "subheadline": "...", "cta": "Book Now" },
    "services": [{ "name": "Balayage", "description": "...", "price": "From $120" }],
    "seoPages": [{ "slug": "hair-salon-austin-tx", "title": "...", "content": "..." }],
    "faqs": [{ "question": "...", "answer": "..." }]
  },
  "meta": {
    "generatedAt": "2025-01-01T00:00:00Z",
    "pagesGenerated": 5,
    "seoPages": 5
  }
}
```

## 💰 Monetization

The platform supports three tiers:

| Plan | Price | Sites | SEO Pages |
|------|-------|-------|-----------|
| Starter | $19/mo | 1 | 5 |
| Growth | $49/mo | 3 | 25 |
| Agency | $149/mo | Unlimited | Unlimited |

To add billing, integrate [Stripe Checkout](https://stripe.com/docs/checkout) and protect `/dashboard` routes with middleware.

## 🛠 Extending the Project

### Add a database (Neon + Prisma)
```bash
npm install @prisma/client prisma
npx prisma init
```

### Add auth (NextAuth.js)
```bash
npm install next-auth
```

### Add payments (Stripe)
```bash
npm install stripe @stripe/stripe-js
```

### Add real-time site editor
Consider integrating [Craft.js](https://craft.js.org/) or [GrapesJS](https://grapesjs.com/) for a drag-and-drop editor.

## 🎨 Design System

- **Display Font:** Syne (Google Fonts)
- **Body Font:** DM Sans
- **Mono Font:** JetBrains Mono
- **Primary:** `#F59E0B` Amber
- **Accent:** `#00FF88` Electric Green
- **Background:** `#0A0A0F` Deep Ink

## 📄 License

MIT — build something great.

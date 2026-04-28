# NestCheck UK

AI-powered UK property area intelligence. Enter any UK address and get a comprehensive report covering broadband, schools, crime, flood risk, transport, healthcare, and more.

## Stack

- **Frontend**: React 18 + Next.js 15 (App Router)
- **AI**: Anthropic Claude (`claude-sonnet-4-20250514`) via server-side API routes
- **Auth**: Firebase Authentication (email/password + Google OAuth)
- **Hosting**: Vercel
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)
- A [Firebase project](https://console.firebase.google.com) with Authentication enabled

### Setup

```bash
# 1. Clone and install
git clone https://github.com/kagney1468/home-notes2
cd home-notes2
npm install

# 2. Configure environment variables
cp .env.example .env.local
# Fill in your ANTHROPIC_API_KEY and NEXT_PUBLIC_FIREBASE_* values

# 3. Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for the full list. Required variables:

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key (server-side only) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase project API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |

## Deploy to Vercel

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Deploy

## Features

- 🏠 **Property Area Reports** — AI-generated reports for any UK address
- 📊 **Side-by-Side Comparison** — compare two addresses simultaneously
- 🔍 **Deep Analysis** — streaming professional investment analysis
- 💬 **Professional Agent** — AI chat assistant for property professionals
- 🔐 **Email-Verified Auth** — secure sign-in with Firebase

## Migration Notes

Migrated from Google AI Studio (Gemini) to Anthropic Claude:
- `@google/genai` → `@anthropic-ai/sdk` via Next.js API routes
- Firebase credentials moved from hardcoded → environment variables
- Vite → Next.js (proper SSR + API routes, no CDN hacks)
- TTS feature gracefully disabled (Anthropic has no TTS API; re-enable with ElevenLabs/OpenAI)

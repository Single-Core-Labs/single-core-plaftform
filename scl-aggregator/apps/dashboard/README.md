# SCL Aggregator Dashboard

A Next.js 14 dashboard for managing and comparing AI models through the SCL Aggregator.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark Mode)
- **Auth:** NextAuth.js
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (`.env.local`):
   ```env
   # Auth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-here
   GITHUB_ID=...
   GITHUB_SECRET=...
   GOOGLE_ID=...
   GOOGLE_SECRET=...

   # Gateway
   GATEWAY_URL=http://localhost:8080
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- **Landing Page:** Modern hero section with features and pricing.
- **Model Playground:** Side-by-side comparison of any two models.
- **Usage Analytics:** Real-time tracking of requests, tokens, and costs.
- **Model Explorer:** Searchable and filterable database of available LLMs.
- **API Key Management:** Secure creation and revocation of access tokens.
- **Embedded Docs:** Integrated quickstart and API reference guides.

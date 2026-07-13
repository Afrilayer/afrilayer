# Afrilayer

> Discover the APIs powering Africa.

Afrilayer is the developer-first platform for discovering African APIs. Search, compare and explore APIs for payments, identity, logistics, banking, SMS, Mobile Money and more built for Africa.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Vercel + Supabase

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Setup

1. Clone the repository:

```bash
git clone https://github.com/your-org/afrilayer.git
cd afrilayer
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. Set up Supabase:

- Create a new Supabase project
- Run the SQL schema in `app/db/schema.sql` in the SQL Editor
- Enable authentication and storage

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
/app
  /admin          # Admin CMS routes
  /apis           # API detail pages
  /categories     # Category browsing
  /countries      # Country pages
  /providers      # Provider pages
  /search         # Search functionality
  /changelog      # Platform updates
  /db             # Database schema
  /components     # Reusable UI components
/lib
  /supabase       # Supabase client utilities
  /types.ts       # TypeScript types
  /utils.ts       # Helper functions
```

## Database Setup

Run the SQL schema in `app/db/schema.sql` in your Supabase SQL Editor. This creates all necessary tables with indexes and row-level security policies.

## Admin Access

Admin routes are protected by Supabase Auth. Configure admin users in your Supabase Auth settings.

## SEO Features

- Server-side rendering
- Dynamic metadata
- Structured data (Schema.org)
- XML sitemap generation
- Canonical URLs

## Contributing

See `TECHNICAL_SPEC.md` for architecture and contribution guidelines.

## License

MIT License
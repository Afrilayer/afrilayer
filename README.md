# Afrilayer

> Discover the APIs powering Africa's digital infrastructure.

Afrilayer is the developer-first platform for discovering African APIs. Search, compare and explore APIs for payments, identity, logistics, banking, SMS, Mobile Money and more built for Africa. Every listing is continuously monitored and verification-dated for operational confidence.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel + Supabase
- **Icons**: Lucide React
- **Animation**: Framer Motion

## Design System

Afrilayer uses a dark theme with Africa-inspired copper/amber accents:

- **Background**: `#0B0D0C` (Deep charcoal)
- **Surface**: `#14171A` (Dark gray)
- **Border**: `#262A25` (Charcoal border)
- **Text**: `#F2EFE9` (Warm off-white)
- **Primary**: `#C9722A` (Copper)
- **Secondary**: `#E0A34E` (Amber)

### Typography

- **Sans**: Inter (system fonts fallback)
- **Mono**: JetBrains Mono (for code/UI elements)

### Spacing Scale

Consistent 4px base scale: 4, 8, 12, 16, 24, 32, 48, 64px

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/mystrdan/afrilayer.git
cd afrilayer
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Configure Supabase:

- Create a new Supabase project at [supabase.com](https://supabase.com)
- Go to Settings → API to find your credentials
- Enable Email Auth in Authentication → Settings
- Create a storage bucket named `logos` for provider images

5. Set up the database:

- Open the SQL Editor in your Supabase dashboard
- Run the schema from `app/db/schema.sql`
- This creates tables with indexes and RLS policies

6. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Supabase Integration

### Authentication

Afrilayer uses Supabase Auth for admin access. To configure:

1. Go to Authentication → Settings
2. Enable Email Auth
3. Add admin user in Authentication → Users
4. Admin routes are protected in `app/admin/`

### Database Schema

The database includes these core tables:

| Table | Purpose |
|-------|---------|
| `afri_countries` | African countries with flags/regions |
| `afri_providers` | API providers with verification status |
| `afri_apis` | API listings with documentation links |
| `afri_categories` | API categories |
| `afri_tags` | API tags |
| `afri_updates` | Platform changelog entries |

### Row Level Security

The schema includes RLS policies:

- Public read access to published APIs
- Authenticated write access for admins
- Service role for backend operations

### Storage

Create a `logos` bucket for provider logos:

```sql
-- In Supabase Dashboard → Storage → Buckets
-- Create bucket: logos
-- Set public access for logo URLs
```

## Project Structure

```
/app
  /admin          # Admin CMS routes (protected)
  /apis           # API detail pages
  /categories     # Category browsing
  /countries      # Country pages
  /providers      # Provider pages
  /search         # Search functionality
  /changelog      # Platform updates
  /db             # Database schema
/components
  /layout         # Header, Footer components
  /ui             # Reusable UI components
/lib
  /types.ts       # TypeScript types
  /mock-data.ts   # Mock data for development
  /utils.ts       # Helper functions
/public
  /manifest.webmanifest
  /favicon.svg
  /favicon.ico
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run generate-favicons  # Generate favicon assets
```

## Features

- **API Discovery**: Search and filter African APIs
- **Verification Layer**: Real-time status and uptime monitoring
- **Provider Directory**: Curated list of African tech providers
- **Mobile-First**: Responsive design for all devices
- **Dark Theme**: Developer-friendly dark interface
- **Accessibility**: WCAG AA compliant with keyboard navigation

## Contributing

See `TECHNICAL_SPEC.md` for architecture and contribution guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

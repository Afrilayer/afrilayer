# Afrilayer Architecture

## Overview

Afrilayer is built on a file-based content architecture using Next.js 15. All provider data is stored as structured JSON and Markdown files, enabling easy community contributions via Pull Requests.

## Project Structure

```
afrilayer/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Homepage - loads APIs from filesystem
│   ├── apis/              # API detail pages
│   │   └── [slug]/        # Dynamic routes for each provider
│   ├── providers/         # Provider listing page
│   └── contribute/        # Contribution guide
├── components/            # React components
│   ├── layout/            # Header, Footer
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and data layer
│   ├── data.ts            # Main data loader API
│   └── providers/         # Provider filesystem loader
├── providers/             # Provider content (file-based)
│   ├── flutterwave/
│   │   ├── provider.json
│   │   ├── api.json
│   │   └── README.md
│   └── ...
├── public/                # Static assets
└── docs/                  # Documentation
```

## Data Layer

### Source of Truth

The `/providers` directory is the source of truth for all provider data. Each provider has:

- `provider.json` - Core metadata (required)
- `api.json` - Extended API details (optional)
- `README.md` - Documentation (required)

### Data Loading

```typescript
// lib/data.ts - Public API
export async function getAllApis(): Promise<ApiMock[]>
export async function getApiBySlug(slug: string): Promise<ApiMock | null>
export async function getAllApiSlugs(): Promise<string[]>
```

### Future Database Migration

The data layer is designed for future Supabase/PostgreSQL migration:

1. UI components consume `ApiMock` type
2. Data layer can be swapped without UI changes
3. Same interface whether data comes from filesystem or database

## Build Process

- Static Site Generation (SSG) for all provider pages
- ISR (Incremental Static Regeneration) every hour
- Zero runtime database queries

## Deployment

- Deployed to Vercel (or any static host)
- No server required for production
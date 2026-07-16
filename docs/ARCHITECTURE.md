# Afrilayer Architecture

## Core Philosophy

- **The repository itself is the database.**
- **GitHub is the CMS, audit log, and contributor system.**
- **GitHub powers statistics and changelogs.**
- **No traditional database, CMS, admin panel, or authentication.**

## Build-Time Index Generation

During `next build`, a script generates `public/generated/registry.json`:

```
public/generated/
├── registry.json          # Provider index, counts, search index
└── providers/             # Copied logos for CDN optimization
```

This index enables:
- Instant homepage statistics
- Fast search without filesystem I/O
- Clean separation between build and runtime

## Data Flow

```
/providers/{slug}/
    provider.json ──┐
    README.md ────┤
    imgs/ ────────┤   lib/providers/loader.ts
    api.json ─────┘   ├── getProviderSlugs()
                      ├── loadProviderJson()
                      ├── loadProviderReadme()
                      ├── loadProviderApiData()
                      └── getAllProviders()
                            │
                            ▼
lib/data.ts            getAllProviderData()
      │
      ▼
UI Components ──► Routes (apis/[slug], search, categories, countries)
```

## Runtime Architecture

- **Static Site Generation**: All pages generated at build time
- **ISR Revalidation**: 1 hour for fresh data
- **No client-side data fetching** (except interactive search facets)
- **No authentication or user management**

## Provider Object Model

All UI pages consume a unified `Provider` object from the provider loader, ensuring future storage migrations won't require UI rewrites.
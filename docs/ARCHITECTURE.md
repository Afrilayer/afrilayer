# Afrilayer Architecture

## Core Philosophy

- **The repository itself is the database.**
- **GitHub is the CMS, audit log, and contributor system.**
- **GitHub powers statistics and changelogs.**
- **No traditional database, CMS, admin panel, or authentication.**

## Build-Time Index Generation

During `next build`, a script generates `public/generated/registry.json`:

```
/public/generated/
├── registry.json          # Provider index, counts, search index
└── providers/             # All provider logos (copied for CDN optimization)
```

This index enables:
- Instant homepage statistics
- Fast search without filesystem I/O
- Clean separation between build and runtime

## Data Flow

```
/providers/{slug}/
    provider.json ──┐
    README.md ─────┤
    api.json ──────┤
    logo.svg ──────┤     lib/providers/loader.ts
                   ├── getProviderSlugs()
                   ├── loadProviderJson()
                   ├── loadProviderApiData()
                   ├── loadProviderReadme()
                   └── getAllProviders()
                         │
                         ▼
providers/verification/
    verify.txt ──────────► loadVerificationData()
                              │
                              ▼
                      Verification badge injection
                              │
                              ▼
lib/data.ts               getAllProviderData()
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

### Verification Layer

Verification data is loaded separately in `lib/providers/verification.ts` and merged into provider objects at runtime:

- `cv` = Community Verified
- `pv` = Provider Verified

This keeps provider data clean while adding trust signals.

## Project Structure

```
afrilayer/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── apis/[slug]/page.tsx     # API detail page
│   ├── categories/[slug]/page.tsx # Category filter page
│   ├── categories/page.tsx        # Category listing
│   ├── countries/[code]/page.tsx   # Country filter page
│   ├── countries/page.tsx         # Country listing
│   ├── search/page.tsx            # Search page
│   ├── changelog/page.tsx         # Changelog page
│   ├── contribute/                # Contribute pages
│   └── api/                        # API routes (logos, search-data, changelog-data)
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # OK
│   │   └── Footer.tsx            # OK
│   └── ui/
│       ├── Badge.tsx             # OK
│       ├── Button.tsx            # OK
│       ├── Card.tsx              # OK
│       ├── ConfidenceIndicator.tsx # OK
│       ├── CountryFlag.tsx         # OK
│       ├── DocPreview.tsx          # OK
│       ├── QuickFacts.tsx          # OK
│       ├── SimilarApisTable.tsx    # OK
│       ├── Stamp.tsx               # OK
│       ├── HeroDashboard.tsx         # OK
│       ├── LiveVerificationFeed.tsx  # OK
│       └── VerificationBadge.tsx      # Circular checkmark badge
├── lib/
│   ├── providers/
│   │   ├── loader.ts              # Core provider loader
│   │   ├── verification.ts          # Verification handler
│   │   ├── similarity.ts            # Similar provider calculation
│   │   └── index.ts                 # Barrel export
│   ├── data.ts                    # Data layer abstraction
│   ├── types.ts                   # TypeScript interfaces
│   ├── constants.ts               # Category/country constants
│   ├── countries.ts               # Country metadata
│   ├── stats.ts                   # Statistics calculation
│   └── utils.ts                   # Utility functions
├── providers/
│   ├── {provider-slug}/           # Each provider has its own folder
│   │   ├── provider.json          # Required
│   │   ├── README.md              # Required
│   │   ├── api.json (optional)    # Optional
│   │   └── logo.svg (optional)    # Optional
│   ├── verification/
│   │   └── verify.txt               # Verification metadata
│   ├── provider.template.json       # Template
│   └── README.template.md           # Template
├── scripts/
│   └── validate.ts                  # Provider validation
├── validation/
│   └── provider.schema.json           # JSON schema
└── public/
    └── generated/                   # Auto-generated at build
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production (includes registry generation)
- `npm run validate` — Run provider validation script
- `npm run generate` — Generate registry index

---

*Last updated: 2026-07-18*
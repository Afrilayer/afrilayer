# Codebase Audit

Generated: 2026-07-18

## Project Overview

Afrilayer is a Next.js 15 static-site application functioning as a Git-based registry of African digital infrastructure providers.

## Current Scale

- **Providers:** 65+ directories in `/providers/`
- **Categories:** 22+ categories defined in `lib/constants.ts`
- **Countries:** 22+ countries defined in `lib/countries.ts`
- **Verification entries:** 8 providers listed in `providers/verification/verify.txt`

## Project Structure

```
afrilayer/
├── app/
│   ├── page.tsx                 # Homepage - OK
│   ├── layout.tsx               # Root layout - OK
│   ├── globals.css              # Global styles - OK
│   ├── apis/[slug]/page.tsx     # API detail page - OK
│   ├── categories/[slug]/page.tsx # Category filter page - OK
│   ├── categories/page.tsx        # Category listing - OK
│   ├── countries/[code]/page.tsx   # Country filter page - OK
│   ├── countries/page.tsx          # Country listing - OK
│   ├── search/page.tsx             # Search page - OK
│   ├── changelog/page.tsx          # Changelog page - OK
│   ├── contribute/                 # Contribute pages - OK
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
│       └── LiveVerificationFeed.tsx  # OK
├── lib/
│   ├── providers/
│   │   ├── loader.ts              # OK - Core loader
│   │   ├── verification.ts          # OK - Verification handler
│   │   ├── similarity.ts            # OK - Similar provider calculation
│   │   └── index.ts                 # OK - Barrel export
│   ├── data.ts                    # OK - Data layer abstraction
│   ├── types.ts                   # OK - Git-native types
│   ├── constants.ts               # OK - Category/country constants
│   ├── countries.ts               # OK - Country metadata
│   ├── stats.ts                   # OK - Statistics calculation
│   └── utils.ts                   # OK - Utility functions
├── providers/
│   ├── {provider-slug}/           # 65+ provider folders
│   │   ├── provider.json          # Required
│   │   ├── README.md              # Required
│   │   ├── api.json (optional)    # 8 providers have this
│   │   └── logo.svg (optional)    # 6 providers have this
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

## Technical Health

### Dependencies

All dependencies are actively used:
- Next.js 15 with React 18
- Tailwind CSS for styling
- TypeScript for type safety
- No database dependencies
- No admin/authentication libraries

### Key Features

- Static site generation with ISR (1 hour revalidation)
- Provider data loaded from filesystem
- Verification layer separate from provider data
- Similar providers calculated by category overlap
- Search functionality on search page

---

*Next audit recommended: 2026-10-18*
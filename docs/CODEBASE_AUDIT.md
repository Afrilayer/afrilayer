# Codebase Audit

Generated: 2026-07-15

## Project Overview

Afrilayer is a Next.js 15 static-site application functioning as a Git-based registry of African digital infrastructure providers.

## Folder Structure Audit

```
afrilayer/
├── app/
│   ├── page.tsx                 # Homepage - OK
│   ├── layout.tsx                # Root layout - OK
│   ├── globals.css               # Global styles - OK
│   ├── providers/page.tsx        # DUPLICATE - Merge into /apis
│   ├── apis/[slug]/page.tsx      # API detail page - OK (some unused imports)
│   ├── categories/[slug]/page.tsx # Category filter - OK
│   ├── countries/[code]/page.tsx   # Country filter - OK
│   ├── search/page.tsx           # Search page - OK
│   ├── changelog/page.tsx        # Changelog page - OK
│   ├── contribute/page.tsx       # Contribute page - OK
│   ├── admin/                    # DEAD - Remove (against no-admin principle)
│   └── api/search-data/          # Will be replaced by build index
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # OK
│   │   └── Footer.tsx            # OK
│   └── ui/
│       ├── Badge.tsx            # OK
│       ├── Button.tsx           # OK
│       ├── Card.tsx             # OK
│       ├── ConfidenceIndicator.tsx # OK
│       ├── CountryFlag.tsx        # OK
│       ├── DocPreview.tsx         # OK
│       ├── QuickFacts.tsx         # Needs inline hover handler cleanup
│       ├── SimilarApisTable.tsx   # OK
│       └── ... (other components)
├── lib/
│   ├── providers/
│   │   ├── loader.ts              # OK - Core loader
│   │   └── index.ts               # OK - Barrel export
│   ├── data.ts                    # OK - Data layer abstraction
│   ├── mock-data.ts               # DEAD - Contains hardcoded APIS[] array
│   ├── stats.ts                   # OK
│   ├── types.ts                   # DEAD - Database-style types, doesn't match Git model
│   └── utils.ts                   # TBD - needs audit
├── providers/
│   ├── paystack/provider.json     # OK
│   ├── flutterwave/provider.json  # OK
│   ├── hubtel/provider.json       # OK
│   ├── mtn-momo/provider.json     # OK
│   ├── nalo-sms/provider.json     # OK
│   ├── dojah/provider.json        # OK
│   ├── smile-identity/provider.json # OK
│   └── prembly/provider.json      # OK
└── public/
    └── ...                        # OK
```

## Technical Debt

### High Priority (Must Fix)

| File | Issue | Recommendation |
|------|-------|----------------|
| `package.json` | `@supabase/ssr`, `@supabase/supabase-js` installed but unused | Remove dependencies |
| `afrilayer/app/db/` | Database schemas that violate no-database principle | Delete directory |
| `afrilayer/app/admin/` | Admin routes against architectural rules | Delete directory |
| `lib/types.ts` | Database-style types (AfriProvider, AfriApi, etc.) | Replace with Git-aligned types |
| `lib/mock-data.ts` | Hardcoded `APIS[]` array duplicates filesystem data | Delete |
| `app/providers/page.tsx` | Duplicates `/apis` functionality | Remove or redirect |

### Medium Priority (Should Fix)

| File | Issue | Recommendation |
|------|-------|----------------|
| `app/apis/[slug]/page.tsx` | Inline style hover handlers in QuickFacts | Replace with Tailwind |
| Multiple files | Hardcoded `COUNTRY_TO_CODE`, `CATEGORY_TO_SLUG` maps | Centralize in `lib/constants.ts` |
| `lib/logo/` | Exists but unused | Audit and remove if dead |
| `app/api/search-data/route.ts` | Will be replaced by build index | Mark for deletion |

### Low Priority (Nice to Have)

| File | Issue | Recommendation |
|------|-------|----------------|
| `components/ui/QuickFacts.tsx` | Inline onMouseEnter/Leave style manipulation | Replace with CSS |
| `components/ui/LiveVerificationFeed.tsx` | Heavy client component | Evaluate |
| `next.config.ts` | May need optimization rules | Review |

## Dead Routes

- `/admin/*` — Remove entirely
- `/providers` — Merge into `/` or redirect

## Unused Assets

- `public/apple-touch-icon.png` — Used
- `public/vercel.svg` — Likely unused
- `public/globe.svg` — Used?
- `public/window.svg` — Likely unused

## Broken Imports

- None detected during audit pass

## Duplicate Logic

- `COUNTRY_TO_CODE` mapping in `app/apis/[slug]/page.tsx` and `lib/stats.ts`
- Category enum in `lib/mock-data.ts` and inline maps
- `loadProviderJson` abstraction but also `getAllApis` with different data path
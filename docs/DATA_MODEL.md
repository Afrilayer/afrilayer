# Data Model

## Provider Object

```typescript
interface Provider {
  // Identity
  slug: string;              // Required. Unique identifier. URL-safe (kebab-case).
  name: string;              // Required. Display name.
  tagline: string;           // Required. Short description.

  // Content
  description: string;         // Required. Full description.
  documentation: string;     // Required. Developer docs URL.
  developerPortal?: string;    // Optional. Separate dev portal.
  website: string;             // Required. Official website.
  supportEmail?: string;       // Optional. Support contact.
  headquarters?: string;       // Optional. Company HQ location.

  // Media
  logoUrl: string;           // Required. URL or /api/logos/{slug} fallback.
  screenshots?: string[];      // Optional. Array of image paths.

  // Classification
  categories: string[];        // Required. From canonical category list.
  countries: string[];         // Required. From canonical country list.
  features: string[];          // Required. Array of feature strings.

  // Technical
  authentication: string;      // Required. e.g., "Bearer Token", "OAuth 2.0".
  apiStyle?: string;           // Optional. e.g., "REST", "GraphQL".
  pricingModel: string;        // Required. e.g., "transaction", "tiered", "Contact".
  sdkLanguages: string[];      // Optional. Supported SDK languages.
  openapiSpec?: string;        // Optional. Path or URL to spec.

  // Availability
  status: 'Live' | 'Estimated' | 'Cached' | 'Unavailable';
  sandboxAvailable: boolean;
  productionReady: boolean;

  // Verification
  verified: boolean;
  lastVerified: string;        // ISO date (YYYY-MM-DD).
  lastUpdated: string;         // ISO date (YYYY-MM-DD).

  // Runtime verification metadata (merged from verify.txt)
  verification?: {
    verified: boolean;
    level: 'community' | 'provider';
  };

  // People
  keyPeople?: KeyPerson[];     // Optional. Founders, maintainers, etc.

  // Extended data
  apiData?: ProviderApiData;   // Optional. Code samples, pricing, runtime.
  relatedProviders: string[];  // Computed. Similar providers by category.
}
```

## KeyPerson

```typescript
interface KeyPerson {
  name: string;              // Required.
  role: string;              // Required. e.g., "Co-founder & CEO".
  github?: string;           // Optional. GitHub profile URL.
}
```

## PricingTier

```typescript
interface PricingTier {
  tier: string;
  price: string;
  note: string;
}
```

## ChangelogEntry

```typescript
interface ChangelogEntry {
  date: string;
  note: string;
}
```

## ProviderApiData (api.json)

```typescript
interface ProviderApiData {
  // Code samples
  curl?: string;
  js?: string;
  python?: string;
  go?: string;

  // Runtime metrics
  uptime?: string;
  latency?: string;
  rateLimit?: string;

  // Pricing
  pricing: PricingTier[];

  // Features
  webhookSupport?: boolean;

  // Version/tracking
  version?: string;
  changelog: ChangelogEntry[];
}
```

## Canonical Lists

### Categories

From `lib/constants.ts`:

- Payments
- Mobile Money
- KYC
- Identity
- SMS
- Airtime
- Banking
- Logistics
- Government
- Geolocation
- Financial Infrastructure
- Messaging
- Insurance
- Agriculture
- Mobility
- Health
- Crypto
- Telecom
- Developer Tools
- Open Banking
- Voice
- USSD
- Maps

### Countries

From `lib/countries.ts` (ISO 3166-1 Alpha-2 codes):

| Code | Country | Flag |
|------|---------|------|
| NG | Nigeria | 🇳🇬 |
| ZA | South Africa | 🇿🇦 |
| GH | Ghana | 🇬🇭 |
| KE | Kenya | 🇰🇪 |
| UG | Uganda | 🇺🇬 |
| TZ | Tanzania | 🇹🇿 |
| EG | Egypt | 🇪🇬 |
| MA | Morocco | 🇲🇦 |
| CI | Côte d'Ivoire | 🇨🇮 |
| SN | Senegal | 🇸🇳 |
| RW | Rwanda | 🇷🇼 |
| TN | Tunisia | 🇹🇳 |
| CM | Cameroon | 🇨🇲 |
| ZM | Zambia | 🇿🇲 |
| ET | Ethiopia | 🇪🇹 |
| ZW | Zimbabwe | 🇿🇼 |
| BW | Botswana | 🇧🇼 |
| AO | Angola | 🇦🇴 |
| MZ | Mozambique | 🇲🇿 |
| MW | Malawi | 🇲🇼 |
| SL | Sierra Leone | 🇸🇱 |
| ML | Mali | 🇲🇱 |
| BF | Burkina Faso | 🇧🇫 |

## Registry Index (registry.json)

Generated at build time. Contains:

```json
{
  "generatedAt": "2026-07-18T12:00:00Z",
  "counts": {
    "providers": 65,
    "countries": 22,
    "categories": 22,
    "apis": 65
  },
  "countries": ["Nigeria", "Ghana", "Kenya", ...],
  "categories": [
    {"slug": "payments", "name": "Payments", "count": 25},
    {"slug": "mobile-money", "name": "Mobile Money", "count": 8},
    ...
  ],
  "index": [
    {
      "slug": "paystack",
      "name": "Paystack",
      "status": "Live",
      "categories": ["Payments"],
      "countries": ["Nigeria", "Ghana", "South Africa"],
      "lastVerified": "2026-07-12",
      "features": ["Card payments", "Bank transfers"],
      "description": "Accept card, bank transfer...",
      "logoUrl": "/api/logos/paystack",
      "verification": {
        "verified": true,
        "level": "community"
      }
    }
  ]
}
```

## Verification Layer

Verification data is stored separately in `providers/verification/verify.txt` and merged at runtime:

```
provider-slug: cv    # Community Verified
provider-slug: pv    # Provider Verified
```

The runtime loader merges this into the provider object as:

```json
{
  "verification": {
    "verified": true,
    "level": "community"
  }
}
```

---

*Last updated: 2026-07-18*
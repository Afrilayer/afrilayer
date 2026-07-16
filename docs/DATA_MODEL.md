# Data Model

## Provider Object

```typescript
interface Provider {
  // Identity
  slug: string;              // Required. Unique identifier. URL-safe.
  name: string;              // Required. Display name.
  tagline: string;           // Required. Short description.

  // Content
  description: string;         // Required. Full description.
  documentation: string;     // Required. Developer docs URL.
  developerPortal?: string;    // Optional. Separate dev portal.
  website: string;             // Required. Official website.
  supportEmail?: string;       // Optional. Support contact.

  // Media
  logoUrl: string;           // Required. Path: /providers/{slug}/imgs/logo.svg
  screenshots?: string[];      // Optional. Array of image paths.

  // Classification
  categories: string[];        // Required. From canonical category list.
  countries: string[];         // Required. From canonical country list.
  features: string[];          // Required. Array of feature strings.
  headquarters?: string;       // Optional. Company HQ location.

  // Technical
  authentication: string;      // Required. e.g., "Bearer Token", "OAuth 2.0".
  apiStyle?: string;           // Optional. e.g., "REST", "GraphQL".
  pricingModel: string;         // Required. e.g., "transaction", "tiered".
  sdkLanguages: string[];      // Optional. Supported SDK languages.
  openapiSpec?: string;        // Optional. Path or URL to spec.

  // Availability
  status: 'Live' | 'Estimated' | 'Cached' | 'Unavailable';
  sandboxAvailable: boolean;
  productionReady: boolean;

  // Verification
  verified: boolean;
  lastVerified: string;        // ISO date (YYYY-MM-DD).
  lastUpdated: string;         // ISO date.

  // People
  keyPeople?: KeyPerson[];     // Optional. Founders, maintainers, etc.
}

interface KeyPerson {
  name: string;              // Required.
  role: string;              // Required. e.g., "Co-founder & CEO".
  github?: string;           // Optional. GitHub profile URL.
}
```

## Canonical Lists

### Categories
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

### Countries
- Nigeria
- Ghana
- Kenya
- South Africa
- Uganda
- Tanzania
- Côte d'Ivoire
- Egypt
- Morocco
- Senegal
- Zambia
- Cameroon
- (and more...)

## API-Specific Data (api.json)

```typescript
interface ApiData {
  // Code samples
  curl?: string;
  js?: string;
  python?: string;
  go?: string;

  // Runtime
  uptime?: string;
  latency?: string;
  rateLimit?: string;

  // Pricing
  pricing: PricingTier[];

  // Features
  webhookSupport?: boolean;
}

interface PricingTier {
  tier: string;
  price: string;
  note: string;
}
```

## Registry Index (registry.json)

Generated at build time. Contains:

```json
{
  "generatedAt": "2026-07-15T12:00:00Z",
  "counts": {
    "providers": 8,
    "countries": 12,
    "categories": 11,
    "apis": 8
  },
  "countries": ["Nigeria", "Ghana", ...],
  "categories": [
    {"slug": "payments", "name": "Payments", "count": 45},
    ...
  ],
  "index": [
    {
      "slug": "paystack",
      "name": "Paystack",
      "status": "Live",
      "categories": ["Payments"],
      "countries": ["Nigeria", "Ghana", "South Africa"],
      "lastVerified": "2026-07-12"
    }
  ]
}
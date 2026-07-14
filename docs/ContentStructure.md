# Content Structure

## Provider Files

### provider.json

Core provider metadata. All fields required unless marked optional.

```typescript
interface ProviderJson {
  slug: string;              // kebab-case identifier
  name: string;              // Display name
  tagline: string;           // Short description
  description: string;       // Full description
  website: string;           // Provider website URL
  documentation: string;       // API docs URL
  developerPortal?: string;  // Optional: Developer portal
  supportEmail?: string;     // Optional: Support email
  headquarters?: string;     // Optional: Company HQ location
  categories: string[];      // From: Payments, Mobile Money, KYC, SMS, etc.
  countries: string[];       // Supported country names
  features: string[];        // List of key features
  pricingModel: string;      // transaction, subscription, etc.
  authentication: string;    // API Key, OAuth, etc.
  apiStyle?: string;         // REST, GraphQL, etc.
  sandboxAvailable: boolean;
  productionReady: boolean;
  sdkLanguages: string[];    // JavaScript, Python, Go, etc.
  openapiSpec?: string;      // Optional: URL to OpenAPI spec
  status: "Live" | "Estimated" | "Cached" | "Unavailable";
  verified: boolean;
  lastVerified: string;      // YYYY-MM-DD format
  lastUpdated: string;       // YYYY-MM-DD format
}
```

### api.json (Optional)

Extended API data for code samples and technical details.

```typescript
interface ProviderApiData {
  uptime?: string;           // e.g., "99.9%"
  pricing?: Array<{
    tier: string;
    price: string;
    note: string;
  }>;
  curl?: string;             // curl command example
  js?: string;               // JavaScript fetch example
  python?: string;           // Python requests example
  go?: string;               // Go example
  changelog?: Array<{
    date: string;
    note: string;
  }>;
  version?: string;
  latency?: string;
  rateLimit?: string;
  webhookSupport?: boolean;
}
```

### README.md (Required)

Markdown documentation describing the provider's API. Include:

- Overview and key features
- Authentication instructions
- Available endpoints
- Quick start example

## Categories

Valid categories:

- All
- Payments
- Mobile Money
- KYC
- SMS
- Banking
- Airtime
- Telecom
- Government
- Logistics

## Countries

Supported African countries:

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
# Afrilayer

Africa's API Infrastructure Platform — discover, compare, and evaluate trusted African APIs for payments, mobile money, identity, KYC, SMS, Airtime, telecom, government, geolocation, and digital infrastructure.

**Currently tracking 65+ verified African API providers across 15+ countries.**

## Features

- **Provider Directory**: Discover African API providers with logos and verification badges
- **Verification Badges**: Community Verified and Provider Verified indicators with sunburst checkmarks
- **Key People**: Founders and CEOs information for each provider with GitHub links
- **API Verification**: Confidence indicators with verification dates
- **Multi-language Code Samples**: curl, JavaScript, Python, Go examples
- **Pricing Transparency**: Clear pricing tiers for each API
- **Country Coverage**: Filter by 15+ supported African countries with counters
- **Category Pages**: Browse APIs by 20+ categories (Payments, Mobile Money, KYC, etc.)
- **Country Pages**: Browse APIs by country using ISO codes (ng, gh, ke, za, etc.)
- **Similar APIs**: Discover related providers based on shared categories and features
- **Report Issues**: Community-driven issue reporting via forms
- **Search**: Full-text search across APIs and providers
- **Changelog**: Track updates and changes to provider data
- **Contribute Page**: Easy-to-use form for community contributions

## Project Architecture

Afrilayer uses a **file-based content architecture**. All provider data lives in `/providers` as structured JSON and Markdown files.

```
/providers/
  /flutterwave/
    provider.json    # Core metadata
    README.md        # Documentation
    api.json         # Optional: code samples, pricing, runtime data
    logo.svg         # Optional: Provider logo
    openapi.yaml     # Optional: OpenAPI specification
  /paystack/
    provider.json
    README.md
    api.json
    logo.svg
  /verification/
    verify.txt       # Verification metadata layer (cv=community verified, pv=provider verified)
```

### Verification Layer

Verification data is stored separately in `providers/verification/verify.txt` and merged at runtime:

- `cv` = Community Verified
- `pv` = Provider Verified

This keeps provider data clean while adding trust signals.

## Provider Schema

Each `provider.json` includes:

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `slug` | Yes | string | URL-friendly identifier (kebab-case) |
| `name` | Yes | string | Provider display name |
| `tagline` | Yes | string | Short description |
| `logoUrl` | Recommended | string | URL to provider logo |
| `description` | Yes | string | Full description |
| `website` | Yes | string | Official website URL |
| `documentation` | Yes | string | API docs URL |
| `developerPortal` | No | string | Separate dev portal URL |
| `supportEmail` | No | string | Support contact email |
| `headquarters` | No | string | Company HQ location |
| `categories` | Yes | string[] | From canonical category list |
| `countries` | Yes | string[] | Supported countries |
| `features` | Yes | string[] | API features |
| `pricingModel` | Yes | string | e.g., "transaction", "tiered" |
| `authentication` | Yes | string | Auth method |
| `apiStyle` | No | string | e.g., "REST", "GraphQL" |
| `sdkLanguages` | No | string[] | Supported SDK languages |
| `openapiSpec` | No | string | Path or URL to spec |
| `status` | Yes | string | Live \| Estimated \| Cached \| Unavailable |
| `sandboxAvailable` | Yes | boolean | Sandbox environment available |
| `productionReady` | Yes | boolean | Production-ready status |
| `verified` | Yes | boolean | Verification status |
| `lastVerified` | Yes | string | Date (YYYY-MM-DD) |
| `lastUpdated` | Yes | string | Date (YYYY-MM-DD) |
| `keyPeople` | No | KeyPerson[] | Founders, maintainers, etc. |

### KeyPerson

```typescript
interface KeyPerson {
  name: string;        // Required
  role: string;        // Required. e.g., "Co-founder & CEO"
  github?: string;     // Optional: GitHub profile URL
}
```

## Local Development

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
npm run start
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Data Model](./docs/DATA_MODEL.md)
- [Roadmap](./docs/ROADMAP.md)
- [FAQ](./docs/FAQ.md)

## License

MIT License
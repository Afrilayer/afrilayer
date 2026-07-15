# Afrilayer

Africa's API Infrastructure Platform — discover, compare, and evaluate trusted African APIs for payments, mobile money, identity, KYC, SMS, Airtime, telecom, government, and digital infrastructure.

## What is Afrilayer?

Afrilayer provides verification metadata for every API listing — including uptime, latency, pricing, and verification dates — so developers can make informed decisions when integrating African APIs.

## Features

- **Provider Directory**: Discover African API providers with logos
- **Key People**: Founders and CEOs information for each provider (LinkedIn links commented out per requirements)
- **API Verification**: Confidence indicators with verification dates
- **Multi-language Code Samples**: curl, JavaScript, Python, Go examples
- **Pricing Transparency**: Clear pricing tiers for each API
- **Country Coverage**: Filter by supported African countries with counters
- **Search**: Full-text search across APIs and providers
- **Sorting**: Sort by Last Updated, Last Verified, or Name
- **Pagination**: 12 APIs per page on homepage
- **Changelog**: Git-based changelog showing commit history

## Project Architecture

Afrilayer uses a **file-based content architecture**. All provider data lives in `/providers` as structured JSON and Markdown files. This enables:

- Easy community contributions via Pull Requests
- No database required for provider content
- Static site generation for fast performance
- Simple local development

```
/providers/
  flutterwave/
    provider.json    # Core metadata, logoUrl, keyPeople
    api.json         # Code samples, pricing, changelog
    README.md        # Documentation
  paystack/
    ...
```

## Provider Schema

Each `provider.json` includes:

- `slug`: URL-friendly identifier
- `name`: Provider name
- `logoUrl`: Path to provider logo (e.g., `/logos/flutterwave.svg`)
- `tagline`: Short description
- `description`: Full description
- `website`, `documentation`, `developerPortal`: URLs
- `supportEmail`: Support contact
- `headquarters`: Company HQ country
- `categories`: Array of service categories
- `countries`: Supported countries
- `features`: API features
- `pricingModel`: Pricing structure type
- `authentication`: Auth method
- `apiStyle`: REST/GraphQL/etc.
- `sandboxAvailable`: Boolean
- `productionReady`: Boolean
- `sdkLanguages`: Supported SDKs
- `openapiSpec`: Optional OpenAPI spec URL
- `status`: Live | Estimated | Cached | Unavailable
- `verified`: Boolean
- `lastVerified`: Date string (YYYY-MM-DD)
- `lastUpdated`: Date string
- `keyPeople`: Array of founders/CEOs with name, role, and optional github

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on:

- Adding a new provider
- Updating provider information
- Required file formats
- Adding provider logos
- Pull Request guidelines

## Pages

- `/`: Homepage with API grid, filters, search, and pagination
- `/apis/[slug]`: API detail page with documentation and key people
- `/providers`: Provider listing page with logos
- `/categories`: Category listing with real API counts
- `/countries/[code]`: Country-specific API filtering
- `/search`: Full-text search page
- `/changelog`: Git-based commit history

## Documentation

- [Architecture](./docs/Architecture.md)
- [Content Structure](./docs/ContentStructure.md)
- [Data Model](./docs/DataModel.md)

## License

MIT License
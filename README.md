# Afrilayer

Africa's API Infrastructure Platform — discover, compare, and evaluate trusted African APIs for payments, mobile money, identity, KYC, SMS, Airtime, telecom, government, geolocation, and digital infrastructure.

## Features

- **Provider Directory**: Discover African API providers with logos and verification badges
- **Key People**: Founders and CEOs information for each provider with GitHub links
- **API Verification**: Confidence indicators with verification dates
- **Multi-language Code Samples**: curl, JavaScript, Python, Go examples
- **Pricing Transparency**: Clear pricing tiers for each API
- **Country Coverage**: Filter by supported African countries with counters
- **Search**: Full-text search across APIs and providers
- **Sorting**: Sort by Last Updated, Last Verified, or Name
- **Pagination**: 12 APIs per page on homepage
- **Changelog**: Git-based changelog showing commit history

## Project Architecture

Afrilayer uses a **file-based content architecture**. All provider data lives in `/providers` as structured JSON and Markdown files.

```
/providers/
  /flutterwave/
    provider.json    # Core metadata
    README.md        # Documentation
  /paystack/
    provider.json
    README.md
```

## Provider Schema

Each `provider.json` includes:

- `slug`: URL-friendly identifier
- `name`: Provider name
- `tagline`: Short description
- `description`: Full description
- `website`, `documentation`, `developerPortal`: URLs
- `categories`: Array of service categories
- `countries`: Supported countries
- `features`: API features
- `authentication`: Auth method
- `sdkLanguages`: Supported SDKs
- `status`: Live | Estimated | Cached | Unavailable
- `verified`: Boolean
- `lastVerified`: Date string (YYYY-MM-DD)
- `keyPeople`: Array of founders/CEOs

## Local Development

```bash
npm install
npm run dev
npm run build
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Documentation

- [Architecture](./docs/Architecture.md)
- [Data Model](./docs/DataModel.md)
- [Roadmap](./docs/ROADMAP.md)
- [FAQ](./docs/FAQ.md)

## License

MIT License
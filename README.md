# Afrilayer

Africa's API Infrastructure Platform — discover, compare, and evaluate trusted African APIs for payments, mobile money, identity, KYC, SMS, Airtime, telecom, government, and digital infrastructure.

## What is Afrilayer?

Afrilayer provides verification metadata for every API listing — including uptime, latency, pricing, and verification dates — so developers can make informed decisions when integrating African APIs.

## Features

- **Provider Directory**: Discover African API providers
- **API Verification**: Confidence indicators with verification dates
- **Multi-language Code Samples**: curl, JavaScript, Python, Go examples
- **Pricing Transparency**: Clear pricing tiers for each API
- **Country Coverage**: Filter by supported African countries

## Project Architecture

Afrilayer uses a **file-based content architecture**. All provider data lives in `/providers` as structured JSON and Markdown files. This enables:

- Easy community contributions via Pull Requests
- No database required for provider content
- Static site generation for fast performance
- Simple local development

```
/providers/
  flutterwave/
    provider.json    # Core metadata
    api.json         # Code samples, pricing
    README.md        # Documentation
  paystack/
    ...
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on:

- Adding a new provider
- Updating provider information
- Required file formats
- Pull Request guidelines

## Documentation

- [Architecture](./docs/Architecture.md)
- [Content Structure](./docs/ContentStructure.md)
- [Data Model](./docs/DataModel.md)

## License

MIT License
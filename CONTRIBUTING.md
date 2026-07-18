# Contributing to Afrilayer

Thank you for your interest in contributing to Afrilayer! This document explains how to add providers, update information, and contribute to the project.

## Quick Start

1. Fork the repository
2. Create a new branch for your changes
3. Add/edit provider data in `/providers` folder
4. Open a Pull Request

## Provider Templates

Start with the templates in `/providers/`:

```
/providers/
├── provider.template.json  # Template for provider.json
└── README.template.md      # Template for README.md
```

Copy and customize these templates for your provider.

## Folder Structure

```
/providers/{provider-slug}/       # URL-friendly slug (kebab-case)
  ├── provider.json              # REQUIRED - Provider metadata
  ├── README.md                  # REQUIRED - Human documentation
  ├── api.json                   # OPTIONAL - Code samples, pricing, runtime data
  ├── openapi.yaml               # OPTIONAL - OpenAPI specification
  └── logo.svg                   # OPTIONAL - Provider logo (or use logoUrl in provider.json)
```

## Required Files

### provider.json

Every provider must have a `provider.json` file with the following fields:

```json
{
  "slug": "provider-name",              // Required: kebab-case identifier
  "name": "Provider Name",              // Required: Display name
  "tagline": "Short tagline",           // Required: Short description
  "logoUrl": "https://...",             // Recommended: URL to provider logo
  "description": "Full description",      // Required: Detailed description
  "website": "https://provider.com",      // Required: Provider website
  "documentation": "https://docs.provider.com", // Required: API docs URL
  "developerPortal": "https://developer.provider.com", // Optional: Separate dev portal
  "categories": ["Payments"],           // Required: From canonical category list
  "countries": ["Nigeria", "Ghana"],    // Required: From canonical country list
  "features": ["Feature 1"],            // Required: API features
  "authentication": "Bearer Token",         // Required: Auth method
  "status": "Live",                     // Required: Live/Estimated/Cached/Unavailable
  "verified": true,                     // Required: Verification status
  "lastVerified": "2026-01-15",         // Required: Date (YYYY-MM-DD)
  "lastUpdated": "2026-01-15",          // Required: Date (YYYY-MM-DD)
  "pricingModel": "transaction",          // Required: Pricing model
  "sandboxAvailable": true,             // Required: Sandbox availability
  "productionReady": true,              // Required: Production readiness
  "sdkLanguages": ["JavaScript", "Python"], // Optional: SDK languages
  "openapiSpec": "https://...",         // Optional: OpenAPI spec URL/path
  "keyPeople": [                        // Optional: Founders/CEOs
    { "name": "Person Name", "role": "Co-founder & CEO", "github": "https://github.com/..." }
  ]
}
```

### README.md

Every provider must have a `README.md` file with documentation about:

- Overview and key features
- Authentication method
- Available API endpoints
- Links to official documentation

## Optional Files

### api.json

Add code samples and extended API data:

```json
{
  "uptime": "99.9%",
  "pricing": [
    { "tier": "Standard", "price": "1.5%", "note": "Local cards" }
  ],
  "curl": "curl https://api.example.com/...",
  "js": "const res = await fetch(...)",
  "python": "import requests...",
  "go": "req, _ := http.NewRequest(...)",
  "changelog": [
    { "date": "2026-01-15", "note": "Updated endpoint" }
  ],
  "version": "v2.0",
  "latency": "120ms",
  "rateLimit": "500 req/min",
  "webhookSupport": true
}
```

## Verification Layer

To add a provider to the verification list, add an entry to `/providers/verification/verify.txt`:

```
provider-slug: cv      # Community Verified
provider-slug: pv      # Provider Verified
```

The verification status is automatically merged into the provider object at runtime.

## Naming Conventions

- **Slug**: Use kebab-case (lowercase, hyphen-separated)
  - ✅ `flutterwave`, `mtn-momo`, `nalo-sms`
  - ❌ `Flutterwave`, `mtn_momo`, `Nalo SMS`

- **Folder name**: Must match slug exactly
- **JSON keys**: Use camelCase

## Pull Request Guidelines

1. Ensure all required fields are present in `provider.json`
2. Validate JSON syntax (use a linter or online validator)
3. Include a descriptive PR title: `feat: add {provider-name}` or `fix: update {provider-name}`
4. Verify URLs are valid and accessible
5. Use the official provider logo if available

## Validation

Run the build to validate your changes:

```bash
npm run build
```

This will catch any missing required fields or invalid JSON.

## Canonical Lists

### Categories

Use exact values from the canonical list in `lib/constants.ts`:

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

Use official country names (not ISO codes) from the canonical list in `lib/countries.ts`:

- Nigeria (NG)
- South Africa (ZA)
- Ghana (GH)
- Kenya (KE)
- Uganda (UG)
- Tanzania (TZ)
- Egypt (EG)
- Morocco (MA)
- Côte d'Ivoire (CI)
- Senegal (SN)
- Rwanda (RW)
- Tunisia (TN)
- Cameroon (CM)
- Zambia (ZM)
- Ethiopia (ET)
- Zimbabwe (ZW)
- Botswana (BW)
- Angola (AO)
- Mozambique (MZ)
- Malawi (MW)
- Sierra Leone (SL)
- Mali (ML)
- Burkina Faso (BF)

## Questions?

Open an issue or reach out on GitHub Discussions.
# Contributing to Afrilayer

Thank you for your interest in contributing to Afrilayer! This document explains how to add providers, update information, and contribute to the project.

## Quick Start

New to Git? No problem! Follow these steps to make your first contribution.

1. **Fork the repository** — Click the "Fork" button in the top-right of the [GitHub page](https://github.com/afrilayer/afrilayer). This creates your own copy of the project that you can edit.

2. **Clone your fork to your computer** — This downloads your copy so you can work on it locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/afrilayer.git
   cd afrilayer
   ```
   Why? You need the files on your computer to make changes.

3. **Install dependencies** — This downloads all the code libraries the project needs to run:
   ```bash
   npm install
   ```
   Why? The project needs these files to work properly.

4. **Create a new branch** — This keeps your changes organized and separate from other work:
   ```bash
   git checkout -b add-provider-name
   ```
   Why? If you make multiple changes, they go in different branches, keeping things organized.

5. **Copy the template files and fill them in** — Copy these files to a new folder named after the provider (use lowercase letters with hyphens between words, like `mtn-momo`):
   - [`providers/provider.template.json`](https://github.com/afrilayer/afrilayer/blob/main/providers/provider.template.json)
   - [`providers/README.template.md`](https://github.com/afrilayer/afrilayer/blob/main/providers/README.template.md)
   
   Why? Templates give you the correct file structure to start with.

6. **Preview your changes locally** — See your provider page before submitting:
   ```bash
   npm run dev
   ```
   This opens the site at `http://localhost:3000` in your browser. Why? To make sure your provider looks right before sharing it.

7. **Validate your data catches mistakes before you submit**:
   ```bash
   npm run validate
   ```
   Why? This finds errors (like missing fields) before you submit.

8. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add Provider Name to directory"
   git push origin add-provider-name
   ```
   Why? This saves your changes and uploads them to your fork on GitHub.

9. **Open the Pull Request** — Go to your fork on GitHub. You'll see a banner that says "Compare & pull request" – click it, describe what you added, and submit. Why? This asks the maintainers to review and add your changes to the main project.

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
/providers/{provider-slug}/       # URL-friendly identifier (lowercase, hyphen-separated: "mtn-momo")
  ├── provider.json              # REQUIRED - Provider metadata
  ├── README.md                  # REQUIRED - Human documentation
  ├── api.json                   # OPTIONAL - Code samples, pricing, runtime data
  ├── openapi.yaml               # OPTIONAL - OpenAPI specification
  └── logo.svg                   # OPTIONAL - Provider logo (or use logoUrl in provider.json)
```

## Required Files

### provider.json

Every provider must have a `provider.json` file. Copy this valid example and replace the placeholder values:

```json
{
  "slug": "provider-name",
  "name": "Provider Name",
  "tagline": "Short tagline",
  "description": "Full description of the provider and its API",
  "website": "https://provider.com",
  "documentation": "https://docs.provider.com",
  "categories": ["Payments"],
  "countries": ["Nigeria", "Ghana"],
  "features": ["Feature 1", "Feature 2"],
  "authentication": "API Key",
  "status": "Live",
  "verified": true,
  "lastVerified": "2026-07-12",
  "lastUpdated": "2026-07-12",
  "pricingModel": "transaction",
  "sandboxAvailable": true,
  "productionReady": true
}
```

### Field Reference

| Field | Required? | Description | Valid Values |
|-------|-----------|-------------|------------|
| `slug` | Required | URL-friendly identifier (lowercase, hyphen-separated words) | e.g., `mtn-momo`, `nalo-sms`, `flutterwave` |
| `name` | Required | Display name shown on the site | Any string |
| `tagline` | Required | Short description (1-2 sentences) | Any string |
| `logoUrl` | Recommended | URL to provider logo image | Full URL starting with `https://` |
| `description` | Required | Full description of the provider | Any string |
| `website` | Required | Provider's main website | Full URL |
| `documentation` | Required | API documentation URL | Full URL |
| `developerPortal` | Optional | Separate developer portal URL | Full URL |
| `supportEmail` | Optional | Support contact email | Email address |
| `headquarters` | Optional | Company HQ location | e.g., "Nigeria", "South Africa" |
| `categories` | Required | What the provider does | From canonical category list below |
| `countries` | Required | Where the provider operates | Country names from canonical list below |
| `features` | Required | Specific capabilities | e.g., "BVN verification", "Money transfer" |
| `pricingModel` | Required | How pricing works | "transaction", "tiered", "subscription", "Contact" |
| `authentication` | Required | Auth method | e.g., "API Key", "Bearer Token", "OAuth" |
| `apiStyle` | Optional | API type | e.g., "REST", "GraphQL" |
| `sdkLanguages` | Optional | Programming languages with SDKs | e.g., ["JavaScript", "Python", "Go"] |
| `openapiSpec` | Optional | OpenAPI specification URL/path | Full URL or path |
| `status` | Required | Current operational status | "Live", "Estimated", "Cached", "Unavailable" |
| `sandboxAvailable` | Required | Is test environment available? | `true` or `false` |
| `productionReady` | Required | Is it production-ready? | `true` or `false` |
| `verified` | Required | Has it been verified? | `true` or `false` |
| `lastVerified` | Required | Last verification date | Date in YYYY-MM-DD format |
| `lastUpdated` | Required | Last update date | Date in YYYY-MM-DD format |
| `keyPeople` | Optional | Founders/CEOs with optional GitHub links | Array of `{ name, role, github? }` objects |

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

- **cv = Community Verified** — Anyone can mark a provider this way after checking it works.
- **pv = Provider Verified** — Reserved for confirmation directly from the provider's team, don't self-assign this.

The verification status is automatically merged into the provider object at runtime.

## Naming Conventions

- **Slug**: Use lowercase letters with hyphens between words (e.g., `mtn-momo`, `nalosms` → `nalo-sms`)
  - ✅ `flutterwave`, `mtn-momo`, `nalo-sms`
  - ❌ `Flutterwave`, `mtn_momo`, `Nalo SMS`

- **Folder name**: Must match slug exactly

- **JSON keys**: Use camelCase (e.g., `lastVerified`, not `last-verified`)

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

- Nigeria
- South Africa
- Ghana
- Kenya
- Uganda
- Tanzania
- Egypt
- Morocco
- Côte d'Ivoire
- Senegal
- Rwanda
- Tunisia
- Cameroon
- Zambia
- Ethiopia
- Zimbabwe
- Botswana
- Angola
- Mozambique
- Malawi
- Sierra Leone
- Mali
- Burkina Faso

## Questions?

Open an issue or reach out on GitHub Discussions.
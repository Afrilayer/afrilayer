# Contributing to Afrilayer

Thank you for your interest in contributing to Afrilayer! This document explains how to add providers, update information, and contribute to the project.

## Quick Start

1. Fork the repository
2. Create a new branch for your changes
3. Add/edit provider data in `/providers` folder
4. Open a Pull Request

## Folder Structure

```
/providers
  /{provider-slug}/           # URL-friendly slug (kebab-case)
    provider.json             # Required: Provider metadata
    README.md                 # Required: Documentation
    api.json                  # Optional: Code samples, pricing
    /screenshots/             # Optional: Screenshots folder
    openapi.yaml              # Optional: OpenAPI specification
```

## Required Files

### provider.json

Every provider must have a `provider.json` file with the following fields:

```json
{
  "slug": "provider-name",              // Required: kebab-case identifier
  "name": "Provider Name",              // Required: Display name
  "tagline": "Short tagline",           // Required: Short description
  "description": "Full description",      // Required: Detailed description
  "website": "https://provider.com",      // Required: Provider website
  "documentation": "https://docs.provider.com", // Required: API docs URL
  "categories": ["Payments"],           // Required: From CATEGORIES list
  "countries": ["Nigeria", "Ghana"],    // Required: Supported countries
  "features": ["Feature 1"],            // Required: API features
  "authentication": "API Key",            // Required: Auth method
  "status": "Live",                     // Required: Live/Estimated/Cached/Unavailable
  "verified": true,                     // Required: Verification status
  "lastVerified": "2026-07-12"        // Required: Date (YYYY-MM-DD)
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
    { "date": "2026-07-12", "note": "Updated endpoint" }
  ],
  "version": "v2.0",
  "latency": "120ms",
  "rateLimit": "500 req/min",
  "webhookSupport": true
}
```

## Naming Conventions

- **Slug**: Use kebab-case (lowercase, hyphen-separated)
  - ✅ `flutterwave`, `mtn-momo`, `nalo-sms`
  - ❌ `Flutterwave`, `mtn_momo`, `Nalo SMS`

- **Folder name**: Must match slug exactly
- **JSON keys**: Use camelCase

## Pull Request Guidelines

1. Ensure all required fields are present in `provider.json`
2. Validate JSON syntax (use a linter)
3. Include a descriptive PR title: `feat: add {provider-name}` or `fix: update {provider-name}`
4. Add any relevant screenshots to `/screenshots` folder
5. Verify URLs are valid and accessible

## Validation

Run the build to validate your changes:

```bash
npm run build
```

This will catch any missing required fields or invalid JSON.

## Questions?

Open an issue or reach out on GitHub Discussions.
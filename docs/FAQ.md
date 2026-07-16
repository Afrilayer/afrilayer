# Frequently Asked Questions

## What is Afrilayer?

Afrilayer is a community-driven registry of African digital infrastructure APIs. We help developers discover, compare, and evaluate APIs powering payments, mobile money, KYC, messaging, and other services across Africa.

## How do providers get added?

Anyone can add a provider by opening a Pull Request with:
1. A folder under `/providers/{slug}/`
2. `provider.json` with required metadata
3. `README.md` with documentation
4. All fields validated against our schema

## What makes a provider "verified"?

Providers are verified when:
- Official documentation link is valid
- API endpoints are publicly accessible
- Categories and countries are validated
- Required fields are complete
- Last verified date is recent

## Is there an API for this data?

Yes! Afrilayer generates static JSON files that can be consumed programmatically. Access provider data at `/generated/registry.json`.

## How is this different from RapidAPI or other API directories?

Afrilayer focuses exclusively on African providers and emphasizes quality over quantity. Every listing includes verification dates, uptime data, and direct connections to official documentation.

## Can I contribute monetarily?

This is a community open-source project. We welcome contributions via PRs, not money. See CONTRIBUTING.md for details.

## How do you make money?

Afrilayer doesn't make money. It's maintained as a public good for African developers.

## I found incorrect information. How do I fix it?

Open an issue or submit a PR to correct the data. All changes are tracked via Git history.
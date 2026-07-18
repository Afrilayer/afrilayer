# Frequently Asked Questions

## What is Afrilayer?

Afrilayer is a community-driven registry of African digital infrastructure APIs. We help developers discover, compare, and evaluate APIs powering payments, mobile money, KYC, messaging, and other services across Africa. Currently tracking 65+ verified providers.

## How do providers get added?

Anyone can add a provider by opening a Pull Request with:
1. A folder under `/providers/{slug}/`
2. `provider.json` with required metadata
3. `README.md` with documentation
4. All fields validated against our schema

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

## What makes a provider "verified"?

Providers are verified when:
- Official documentation link is valid
- API endpoints are publicly accessible
- Categories and countries are validated against canonical lists
- Required fields are complete
- Last verified date is recent

There are two verification levels:
- **Community Verified (cv)**: Verified by the community through code review
- **Provider Verified (pv)**: Officially verified by the provider

## Is there an API for this data?

Yes! Afrilayer generates static JSON files that can be consumed programmatically. Access provider data at `/public/generated/registry.json`.

## How is this different from RapidAPI or other API directories?

Afrilayer focuses exclusively on African providers and emphasizes quality over quantity. Every listing includes verification dates, uptime data where available, and direct connections to official documentation. We're community-maintained and open source.

## Can I contribute monetarily?

This is a community open-source project. We welcome contributions via PRs, not money. See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

## How do you make money?

Afrilayer doesn't make money. It's maintained as a public good for African developers.

## I found incorrect information. How do I fix it?

Open an issue or submit a PR to correct the data. All changes are tracked via Git history.

## What does the verification badge mean?

- **Community Verified**: The community has verified this provider's documentation and endpoints
- **Provider Verified**: The provider organization has officially verified their listing

These badges help you quickly identify trust signals when evaluating African API providers.

## How often is the data updated?

Provider data is updated whenever someone submits a PR. The site uses ISR (Incremental Static Regeneration) with a 1-hour revalidation window to ensure fresh data.

## Contact

For questions, open an issue on GitHub or reach out via Discussions.
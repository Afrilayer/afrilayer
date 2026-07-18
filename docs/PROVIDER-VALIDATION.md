# Afrilayer Provider Validation Report

**Status: Historical Report - Regeneration Required**

This report was generated: 2026-07-17

For the most up-to-date validation status, run:
```bash
npm run validate
```

Or check the validation schema at `validation/provider.schema.json`.

---

## Summary Statistics

- Providers in Repository: 65+
- Validation Schema: `validation/provider.schema.json`

## Validation Criteria

All providers are validated against:
1. Required fields presence (slug, name, description, website, documentation)
2. Valid URLs (HTTP 200 response or valid URL format)
3. Slug uniqueness
4. Country validation against canonical list in `lib/countries.ts`
5. Category validation against canonical list in `lib/constants.ts`

## Verification Layer

Providers listed in `providers/verification/verify.txt`:
- **Community Verified (cv)**: Verified by community review
- **Provider Verified (pv)**: Officially verified by provider

Current verified providers (8 total):
- paystack, flutterwave, mono, youverify, okra, termii, kwik, africas-talking

---

*To regenerate this report with current data, run `npm run validate`*
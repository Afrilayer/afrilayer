# Dojah API

## Overview

Identity verification, BVN/NIN lookups and document checks for onboarding flows. Secure KYC and identity verification APIs for Africa.

## Key Features

- **BVN Verification**: Validate Bank Verification Numbers
- **NIN Lookup**: National Identity Number verification
- **Document Verification**: Check identity documents
- **Identity Checks**: Comprehensive identity verification

## Authentication

Uses API Key + AppId authentication. Include both headers in your requests.

```
AppId: YOUR_APP_ID
Authorization: YOUR_API_KEY
```

## API Endpoints

- `/api/v1/kyc/bvn` - BVN verification
- `/api/v1/kyc/nin` - NIN verification
- `/api/v1/verification` - Document verification

## Documentation

Full documentation available at [docs.dojah.io](https://docs.dojah.io)
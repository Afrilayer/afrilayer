# MTN Mobile Money API

## Overview

Integrate MTN Mobile Money for collections, disbursements and payment status across MTN markets in Ghana, Uganda, and Côte d'Ivoire.

## Key Features

- **Collections**: Receive payments from MTN mobile money users
- **Disbursements**: Send money to MTN mobile money wallets
- **Payment Status**: Query transaction status in real-time
- **Webhook Retries**: Automatic retry handling for webhooks

## Authentication

Uses OAuth 2.0 authentication. Obtain an access token before making API calls.

## API Endpoints

- `/momo/v2/collect` - Request payment collection
- `/momo/v2/payout` - Send disbursement
- `/momo/v2/status` - Check payment status

## Documentation

Full documentation available at [developers.mtn.com](https://developers.mtn.com)
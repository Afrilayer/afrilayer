# Hubtel API

## Overview

Ghana-focused mobile money and SMS API for collections, payouts and messaging. Send and receive mobile money, send SMS to any Ghanaian number.

## Key Features

- **Mobile Money**: Send and receive mobile money payments
- **SMS Messaging**: Send SMS to Ghanaian numbers
- **Collections**: Receive payments via mobile money
- **Payouts**: Send money to mobile money wallets

## Authentication

Uses Basic Auth authentication. Encode your API key in the Authorization header.

```
Authorization: Basic YOUR_BASE64_ENCODED_KEY
```

## API Endpoints

- `/v1/messages/send` - Send SMS
- `/v1/mmo/requests` - Mobile money requests
- `/v1/mmo/withdrawals` - Mobile money withdrawals

## Documentation

Full documentation available at [dev.hubtel.com](https://dev.hubtel.com)
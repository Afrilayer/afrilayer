# Paystack API

## Overview

Accept card, bank transfer and mobile money payments from customers across Africa with Paystack's simple, secure payments infrastructure.

## Key Features

- **Card Payments**: Accept payments via debit and credit cards
- **Bank Transfers**: Enable direct bank transfers
- **Mobile Money**: Support for mobile money payments
- **Recurring Billing**: Handle subscription payments
- **Split Payments**: Distribute payments to multiple recipients

## Authentication

Uses Bearer Token authentication. Include your secret key in the Authorization header.

```
Authorization: Bearer YOUR_SECRET_KEY
```

## API Endpoints

- `/transaction/initialize` - Initialize a transaction
- `/transaction/verify` - Verify transaction status
- `/transfer` - Initiate transfers
- `/subscription` - Manage subscriptions

## Documentation

Full documentation available at [paystack.com/docs](https://paystack.com/docs)
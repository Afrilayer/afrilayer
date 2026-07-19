# WatuPay API

Payment gateway and checkout API for Nigerian businesses.

## Overview

WatuPay is a payment gateway and checkout platform for Nigerian businesses,
part of the Watu ecosystem (watu.global). It provides card payments, bank
transfer, mobile money collection, payment links, and bill payment APIs,
plus a POS agent business line and a USSD-based voting/collection product.

## Products

- Checkout API — hosted and inline card checkout (Visa, Mastercard, Verve)
- Direct Charge API — AES-encrypted direct card charge
- Bank Transfer API — collect via Nigerian bank transfer
- Mobile Money API — mobile money collection
- Payment Links — shareable payment link generation
- Bill Payment API — electricity (e.g. EKEDC) and cable TV (DSTV) payments
- Airtime & Data API — mobile top-up and data bundle resale
- USSD Voting/Collection — USSD-based voting and fund collection

## Authentication

Bearer token authentication using public, private, secret, and encryption
keys. Test keys are prefixed `WTP-T-`, live keys `WTP-L-`. Sign up and get
API keys via the Watu dashboard (dashboard.watu.global).

## Sandbox

Full Test Mode available with dedicated test cards, test bank accounts
(Access Bank), and test OTPs. Switch between Test and Live mode from the
dashboard; API keys change accordingly.

## Coverage

Nigeria.
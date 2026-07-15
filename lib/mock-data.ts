// Afrilayer Mock Data
// Dark theme design tokens (matching reference design)

export const C = {
  bg: "#0B0D0C",
  surface: "#14171A",
  surfaceHover: "#1B1F1C",
  border: "#262A25",
  text: "#F2EFE9",
  muted: "#93968D",
  mutedDim: "#5D6058",
  copper: "#C9722A",
  amber: "#E0A34E",
  verified: "#5FA97C",
  estimated: "#D9B44E",
  cached: "#8A8D85",
  unavailable: "#C05A45",
};

export const STATUS_META: Record<string, { color: string; icon: string; label: string }> = {
  Live: { color: C.verified, icon: "Check", label: "Live" },
  Estimated: { color: C.estimated, icon: "Clock", label: "Estimated" },
  Cached: { color: C.cached, icon: "Clock", label: "Cached" },
  Unavailable: { color: C.unavailable, icon: "XCircle", label: "Unavailable" },
};

export const CATEGORIES = ["All", "Payments", "Mobile Money", "KYC", "SMS", "Banking", "Airtime", "Telecom", "Government", "Logistics"];

export const COUNTRIES = ["All", "Nigeria", "Ghana", "Kenya", "South Africa", "Uganda", "Tanzania", "CÃ´te d'Ivoire", "Egypt", "Morocco", "Senegal", "Zambia"];

// API Status type matching reference
export type ApiStatus = "Live" | "Estimated" | "Cached" | "Unavailable";

export interface PricingTier {
  tier: string;
  price: string;
  note: string;
}

export interface ChangelogEntry {
  date: string;
  note: string;
}

export interface ApiMock {
  id: string;
  name: string;
  provider: string;
  category: string;
  countries: string[];
  description: string;
  status: ApiStatus;
  lastVerified: string;
  uptime: string;
  pricing: PricingTier[];
  curl: string;
  js: string;
  python: string;
  go: string;
  changelog: ChangelogEntry[];
  version?: string;
  latency?: string;
  authMethod?: string;
  rateLimit?: string;
  webhookSupport?: boolean;
  logoUrl?: string;
}

export const APIS: ApiMock[] = [
  {
    id: "flutterwave",
    name: "Flutterwave API",
    provider: "Flutterwave",
    category: "Payments",
    countries: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda", "Tanzania"],
    description: "Unified payments API covering cards, mobile money, bank transfers and payouts across Africa.",
    status: "Live",
    lastVerified: "2026-07-08",
    uptime: "99.97%",
    pricing: [
      { tier: "Standard", price: "1.4%", note: "Local cards, capped at N2,000" },
    ],
    curl: `curl https://api.flutterwave.com/v3/payments \\
  -H "Authorization: Bearer $FLW_KEY" \\
  -d '{"tx_ref":"tx-001","amount":"5000","currency":"NGN"}'`,
    js: `const res = await fetch("https://api.flutterwave.com/v3/payments", {
  method: "POST",
  headers: { Authorization: \`Bearer \${FLW_KEY}\` },
  body: JSON.stringify({ tx_ref: "tx-001", amount: "5000", currency: "NGN" })
});`,
    python: `import requests
r = requests.post("https://api.flutterwave.com/v3/payments",
  headers={"Authorization": f"Bearer {FLW_KEY}"},
  json={"tx_ref": "tx-001", "amount": "5000", "currency": "NGN"})`,
    go: `req, _ := http.NewRequest("POST", "https://api.flutterwave.com/v3/payments",
  bytes.NewBufferString(\`{"tx_ref":"tx-001","amount":"5000","currency":"NGN"}\`))
req.Header.Set("Authorization", "Bearer "+FLW_KEY)`,
    changelog: [
      { date: "2026-07-08", note: "Re-verified. Added support for Kenyan M-Pesa payouts." },
      { date: "2026-05-15", note: "API version bumped to v3.4 with new settlement endpoints." },
    ],
    version: "v3.4",
    latency: "142ms",
    authMethod: "API Key",
    rateLimit: "1000 req/min",
    webhookSupport: true,
    logoUrl: "/logos/flutterwave.svg",
  },
  {
    id: "paystack",
    name: "Paystack API",
    provider: "Paystack",
    category: "Payments",
    countries: ["Nigeria", "Ghana", "South Africa"],
    description: "Accept card, bank transfer and mobile money payments from customers across Africa.",
    status: "Live",
    lastVerified: "2026-07-12",
    uptime: "99.99%",
    pricing: [
      { tier: "Standard", price: "1.5% + N100", note: "Capped at N2,000 for local cards" },
      { tier: "Enterprise", price: "Custom", note: "Contact sales" },
    ],
    curl: `curl https://api.paystack.co/transaction/initialize \\
  -H "Authorization: Bearer $SECRET_KEY" \\
  -d '{"email":"user@example.com","amount":"50000"}'`,
    js: `const res = await fetch("https://api.paystack.co/transaction/initialize", {
  method: "POST",
  headers: { Authorization: \`Bearer \${SECRET_KEY}\` },
  body: JSON.stringify({ email: "user@example.com", amount: "50000" })
});`,
    python: `import requests
r = requests.post("https://api.paystack.co/transaction/initialize",
  headers={"Authorization": f"Bearer {SECRET_KEY}"},
  json={"email": "user@example.com", "amount": "50000"})`,
    go: `req, _ := http.NewRequest("POST", "https://api.paystack.co/transaction/initialize",
  bytes.NewBufferString(\`{"email":"user@example.com","amount":"50000"}\`))
req.Header.Set("Authorization", "Bearer "+SECRET_KEY)`,
    changelog: [
      { date: "2026-07-12", note: "Confirmed new split-payment endpoint in docs." },
      { date: "2026-04-22", note: "Added Ghana Mobile Money collection support." },
    ],
    version: "v2.1",
    latency: "98ms",
    authMethod: "Bearer Token",
    rateLimit: "500 req/min",
    webhookSupport: true,
    logoUrl: "/logos/paystack.svg",
  },
  {
    id: "mtn-momo",
    name: "MTN Mobile Money API",
    provider: "MTN Group",
    category: "Mobile Money",
    countries: ["Ghana", "Uganda", "CÃ´te d'Ivoire", "Zambia", "Cameroon"],
    description: "Integrate MTN Mobile Money for collections, disbursements and payment status across MTN markets.",
    status: "Live",
    lastVerified: "2026-07-10",
    uptime: "99.95%",
    pricing: [
      { tier: "Sandbox", price: "Free", note: "Test credentials, rate-limited" },
      { tier: "Production", price: "1.5% per txn", note: "Volume discounts above N50k/mo" },
    ],
    curl: `curl -X POST https://api.mtn.com/momo/v2/collect \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"amount":"25.00","currency":"GHS","payer":"233241234567"}'`,
    js: `const res = await fetch("https://api.mtn.com/momo/v2/collect", {
  method: "POST",
  headers: { Authorization: \`Bearer \${TOKEN}\` },
  body: JSON.stringify({ amount: "25.00", currency: "GHS", payer: "233241234567" })
});`,
    python: `import requests
r = requests.post("https://api.mtn.com/momo/v2/collect",
  headers={"Authorization": f"Bearer {TOKEN}"},
  json={"amount": "25.00", "currency": "GHS", "payer": "233241234567"})`,
    go: `req, _ := http.NewRequest("POST", "https://api.mtn.com/momo/v2/collect",
  bytes.NewBufferString(\`{"amount":"25.00","currency":"GHS","payer":"233241234567"}\`))
req.Header.Set("Authorization", "Bearer "+TOKEN)`,
    changelog: [
      { date: "2026-07-10", note: "Re-verified endpoint latency and auth flow â€” no changes." },
      { date: "2026-05-22", note: "Provider added disbursement webhook retries." },
    ],
    version: "v3.2",
    latency: "234ms",
    authMethod: "OAuth 2.0",
    rateLimit: "2000 req/min",
    webhookSupport: true,
    logoUrl: "/logos/mtn.svg",
  },
  {
    id: "dojah",
    name: "Dojah API",
    provider: "Dojah",
    category: "KYC",
    countries: ["Nigeria", "Kenya", "Ghana"],
    description: "Identity verification, BVN/NIN lookups and document checks for onboarding flows.",
    status: "Live",
    lastVerified: "2026-07-14",
    uptime: "~99.5%",
    pricing: [
      { tier: "Pay as you go", price: "N150 / verification", note: "No minimum" },
    ],
    curl: `curl https://api.dojah.io/api/v1/kyc/bvn \\
  -H "AppId: $APP_ID" -H "Authorization: $API_KEY" \\
  -d '{"bvn":"22190123456"}'`,
    js: `const res = await fetch("https://api.dojah.io/api/v1/kyc/bvn", {
  method: "POST",
  headers: { AppId: APP_ID, Authorization: API_KEY },
  body: JSON.stringify({ bvn: "22190123456" })
});`,
    python: `import requests
r = requests.post("https://api.dojah.io/api/v1/kyc/bvn",
  headers={"AppId": APP_ID, "Authorization": API_KEY},
  json={"bvn": "22190123456"})`,
    go: `req, _ := http.NewRequest("POST", "https://api.dojah.io/api/v1/kyc/bvn",
  bytes.NewBufferString(\`{"bvn":"22190123456"}\`))
req.Header.Set("AppId", APP_ID)
req.Header.Set("Authorization", API_KEY)`,
    changelog: [
      { date: "2026-07-14", note: "Verified API status and updated countries list." },
    ],
    version: "v1.3",
    latency: "412ms",
    authMethod: "API Key + AppId",
    rateLimit: "100 req/min",
    webhookSupport: false,
    logoUrl: "/logos/dojah.svg",
  },
  {
    id: "hubtel",
    name: "Hubtel API",
    provider: "Hubtel",
    category: "Mobile Money",
    countries: ["Ghana"],
    description: "Ghana-focused mobile money and SMS API for collections, payouts and messaging.",
    status: "Live",
    lastVerified: "2026-07-11",
    uptime: "99.85%",
    pricing: [
      { tier: "Sandbox", price: "Free", note: "Test mode with sandbox numbers" },
      { tier: "Production", price: "1.2% + N10", note: "Standard rates apply" },
    ],
    curl: `curl https://teltoobdirect.hubtel.com/v1/messages/send \\
  -H "Authorization: Basic $TOKEN" \\
  -d '{"from":"Afrilayer","to":"233241234567","content":"Hello"}'`,
    js: `const res = await fetch("https://teltoobdirect.hubtel.com/v1/messages/send", {
  method: "POST",
  headers: { Authorization: \`Basic \${TOKEN}\` },
  body: JSON.stringify({ from: "Afrilayer", to: "233241234567", content: "Hello" })
});`,
    python: `import requests
r = requests.post("https://teltoobdirect.hubtel.com/v1/messages/send",
  headers={"Authorization": f"Basic {TOKEN}"},
  json={"from": "Afrilayer", "to": "233241234567", "content": "Hello"})`,
    go: `req, _ := http.NewRequest("POST", "https://teltoobdirect.hubtel.com/v1/messages/send",
  bytes.NewBufferString(\`{"from":"Afrilayer","to":"233241234567","content":"Hello"}\`))
req.Header.Set("Authorization", "Basic "+TOKEN)`,
    changelog: [
      { date: "2026-07-11", note: "Verified mobile money endpoints and webhook signatures." },
    ],
    version: "v2.0",
    latency: "156ms",
    authMethod: "Basic Auth",
    rateLimit: "500 req/min",
    webhookSupport: true,
    logoUrl: "/logos/hubtel.svg",
  },
  {
    id: "nalo-sms",
    name: "Nalo SMS API",
    provider: "Nalo Solutions",
    category: "SMS",
    countries: ["Ghana", "Nigeria"],
    description: "Bulk SMS and messaging API with delivery reports across West Africa.",
    status: "Live",
    lastVerified: "2026-07-10",
    uptime: "99.7%",
    pricing: [
      { tier: "Starter", price: "N0.02 / SMS", note: "First 10K SMS" },
      { tier: "Business", price: "N0.015 / SMS", note: "10K+ volume" },
    ],
    curl: `curl https://api.nalosolutions.com/sms/v1/send \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"from":"INFO","to":"233241234567","message":"Test"}'`,
    js: `const res = await fetch("https://api.nalosolutions.com/sms/v1/send", {
  method: "POST",
  headers: { Authorization: \`Bearer \${TOKEN}\` },
  body: JSON.stringify({ from: "INFO", to: "233241234567", message: "Test" })
});`,
    python: `import requests
r = requests.post("https://api.nalosolutions.com/sms/v1/send",
  headers={"Authorization": f"Bearer {TOKEN}"},
  json={"from": "INFO", "to": "233241234567", "message": "Test"})`,
    go: `req, _ := http.NewRequest("POST", "https://api.nalosolutions.com/sms/v1/send",
  bytes.NewBufferString(\`{"from":"INFO","to":"233241234567","message":"Test"}\`))
req.Header.Set("Authorization", "Bearer "+TOKEN)`,
    changelog: [
      { date: "2026-07-10", note: "Re-verified HTTP 429 handling and rate limit behavior." },
    ],
    version: "v1.1",
    latency: "89ms",
    authMethod: "Bearer Token",
    rateLimit: "1000 req/hour",
    webhookSupport: false,
    logoUrl: "/logos/nalo.svg",
  },
  {
    id: "smile-identity",
    name: "Smile ID API",
    provider: "Smile Identity",
    category: "KYC",
    countries: ["Nigeria", "Kenya", "South Africa", "Ghana"],
    description: "Biometric KYC â€” selfie liveness, document verification and AML screening.",
    status: "Live",
    lastVerified: "2026-07-14",
    uptime: "~300ms",
    pricing: [
      { tier: "Standard", price: "Custom", note: "Contact sales â€” pricing not publicly listed" },
    ],
    curl: `curl https://api.smileidentity.com/v1/id_verification \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"country":"NG","id_type":"NIN"}'`,
    js: `const res = await fetch("https://api.smileidentity.com/v1/id_verification", {
  method: "POST",
  headers: { Authorization: \`Bearer \${TOKEN}\` },
  body: JSON.stringify({ country: "NG", id_type: "NIN" })
});`,
    python: `import requests
r = requests.post("https://api.smileidentity.com/v1/id_verification",
  headers={"Authorization": f"Bearer {TOKEN}"},
  json={"country": "NG", "id_type": "NIN"})`,
    go: `req, _ := http.NewRequest("POST", "https://api.smileidentity.com/v1/id_verification",
  bytes.NewBufferString(\`{"country":"NG","id_type":"NIN"}\`))
req.Header.Set("Authorization", "Bearer "+TOKEN)`,
    changelog: [
      { date: "2026-07-14", note: "Updated verification status to Live." },
    ],
    version: "v2.3",
    latency: "~300ms",
    authMethod: "Bearer Token",
    rateLimit: "Unknown",
    webhookSupport: true,
    logoUrl: "/logos/smile-identity.svg",
  },
  {
    id: "prembly",
    name: "Prembly API",
    provider: "Prembly",
    category: "Identity",
    countries: ["Nigeria", "Ghana", "Kenya", "South Africa"],
    description: "Document verification, facial matching and AML checks for financial services.",
    status: "Live",
    lastVerified: "2026-07-09",
    uptime: "99.6%",
    pricing: [
      { tier: "Pay as you go", price: "$0.08 / check", note: "No monthly fee" },
    ],
    curl: `curl https://api.prembly.com/v1/verify \\
  -H "x-api-key: $API_KEY" \\
  -d '{"id_type":"passport"}'`,
    js: `const res = await fetch("https://api.prembly.com/v1/verify", {
  method: "POST",
  headers: { "x-api-key": API_KEY },
  body: JSON.stringify({ id_type: "passport" })
});`,
    python: `import requests
r = requests.post("https://api.prembly.com/v1/verify",
  headers={"x-api-key": API_KEY},
  json={"id_type": "passport"})`,
    go: `req, _ := http.NewRequest("POST", "https://api.prembly.com/v1/verify",
  bytes.NewBufferString(\`{"id_type":"passport"}\`))
req.Header.Set("x-api-key", API_KEY)`,
    changelog: [
      { date: "2026-07-09", note: "Verified document verification endpoints." },
    ],
    version: "v1.2",
    latency: "125ms",
    authMethod: "API Key",
    rateLimit: "500 req/min",
    webhookSupport: true,
    logoUrl: "/logos/prembly.svg",
  },
];
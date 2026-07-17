// Centralized constants for Afrilayer
// Re-exports country data from lib/countries.ts for single source of truth

export { 
  COUNTRY_TO_CODE, 
  CODE_TO_COUNTRY, 
  COUNTRIES, 
  COUNTRY_CODES,
  COUNTRY_NAMES,
  getCountry,
  getCountryFlag,
  getCountryName,
  normalizeCountryCode
} from './countries';

// Category slugs
export const CATEGORY_TO_SLUG: Record<string, string> = {
  'Mobile Money': 'mobile-money',
  'Payments': 'payments',
  'KYC': 'kyc',
  'Identity': 'identity',
  'SMS': 'sms',
  'Airtime': 'airtime',
  'Banking': 'banking',
  'Logistics': 'logistics',
  'Government': 'government',
  'Geolocation': 'geolocation',
  'Financial Infrastructure': 'financial-infrastructure',
  'Messaging': 'messaging',
  'Insurance': 'insurance',
  'Agriculture': 'agriculture',
  'Mobility': 'mobility',
  'Health': 'health',
  'Crypto': 'crypto',
  'Telecom': 'telecom',
  'Developer Tools': 'developer-tools',
  'Open Banking': 'open-banking',
  'Voice': 'voice',
  'USSD': 'ussd',
  'Maps': 'maps',
};

// Reverse mapping
export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_TO_SLUG).map(([k, v]) => [v, k])
);

// Canonical lists
export const CATEGORIES = Object.keys(CATEGORY_TO_SLUG);

// Status values for providers
export const STATUS_VALUES = ['Live', 'Estimated', 'Cached', 'Unavailable'] as const;
export type ProviderStatus = typeof STATUS_VALUES[number];

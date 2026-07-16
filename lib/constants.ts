// Centralized constants for Afrilayer

// ISO country codes
export const COUNTRY_TO_CODE: Record<string, string> = {
  'Nigeria': 'NG',
  'South Africa': 'ZA',
  'Ghana': 'GH',
  'Kenya': 'KE',
  'Uganda': 'UG',
  'Tanzania': 'TZ',
  'Egypt': 'EG',
  'Morocco': 'MA',
  "Côte d'Ivoire": 'CI',
  'Senegal': 'SN',
  'Rwanda': 'RW',
  'Tunisia': 'TN',
  'Zambia': 'ZM',
  'Cameroon': 'CM',
};

// Reverse mapping
export const CODE_TO_COUNTRY: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_TO_CODE).map(([k, v]) => [v, k])
);

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
  'Telecom': 'telecom',
};

// Reverse mapping
export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_TO_SLUG).map(([k, v]) => [v, k])
);

// Canonical lists
export const COUNTRIES = Object.values(COUNTRY_TO_CODE);
export const CATEGORIES = Object.keys(CATEGORY_TO_SLUG);

// Status values for providers
export const STATUS_VALUES = ['Live', 'Estimated', 'Cached', 'Unavailable'] as const;
export type ProviderStatus = typeof STATUS_VALUES[number];
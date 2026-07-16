// Single source of truth for country metadata
// ISO 3166-1 Alpha-2 code → metadata mapping

export interface CountryMetadata {
  code: string;
  name: string;
  flag: string;
  region?: string;
}

// Country metadata keyed by ISO code (uppercase)
export const COUNTRIES: Record<string, CountryMetadata> = {
  NG: { code: 'NG', name: 'Nigeria', flag: '🇳🇬', region: 'west' },
  ZA: { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'south' },
  GH: { code: 'GH', name: 'Ghana', flag: '🇬🇭', region: 'west' },
  KE: { code: 'KE', name: 'Kenya', flag: '🇰🇪', region: 'east' },
  UG: { code: 'UG', name: 'Uganda', flag: '🇺🇬', region: 'east' },
  TZ: { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', region: 'east' },
  EG: { code: 'EG', name: 'Egypt', flag: '🇪🇬', region: 'north' },
  MA: { code: 'MA', name: 'Morocco', flag: '🇲🇦', region: 'north' },
  CI: { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', region: 'west' },
  SN: { code: 'SN', name: 'Senegal', flag: '🇸🇳', region: 'west' },
  RW: { code: 'RW', name: 'Rwanda', flag: '🇷🇼', region: 'east' },
  TN: { code: 'TN', name: 'Tunisia', flag: '🇹🇳', region: 'north' },
  CM: { code: 'CM', name: 'Cameroon', flag: '🇨🇲', region: 'central' },
  ZM: { code: 'ZM', name: 'Zambia', flag: '🇿🇲', region: 'east' },
  // Additional countries from COUNTRY_TO_CODE in constants.ts
  ET: { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', region: 'east' },
  ZW: { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', region: 'east' },
  BW: { code: 'BW', name: 'Botswana', flag: '🇧🇼', region: 'south' },
  AO: { code: 'AO', name: 'Angola', flag: '🇦🇴', region: 'central' },
  MZ: { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', region: 'east' },
  AE: { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', region: 'north' },
  ML: { code: 'ML', name: 'Mali', flag: '🇲🇱', region: 'west' },
  BF: { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', region: 'west' },
};

// Re-export for backward compatibility with constants.ts
export const COUNTRY_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRIES).map(([code, meta]) => [meta.name, code])
);

export const CODE_TO_COUNTRY: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRIES).map(([code, meta]) => [code, meta.name])
);

// Canonical lists
export const COUNTRY_CODES = Object.keys(COUNTRIES);
export const COUNTRY_NAMES = Object.values(COUNTRIES).map(c => c.name);

// Helper: normalize country code (case-insensitive, returns uppercase code)
export function normalizeCountryCode(input: string): string {
  const normalized = input.toUpperCase();
  if (COUNTRIES[normalized]) {
    return normalized;
  }
  // Try to match by name (for backward compatibility)
  const code = COUNTRY_TO_CODE[input];
  return code || '';
}

// Helper: get country metadata (null if not found)
export function getCountry(code: string): CountryMetadata | null {
  return COUNTRIES[normalizeCountryCode(code)] || null;
}

// Helper: get flag for a country code
export function getCountryFlag(code: string): string {
  const country = getCountry(code);
  return country?.flag || code.toUpperCase();
}

// Helper: get name for a country code
export function getCountryName(code: string): string {
  const country = getCountry(code);
  return country?.name || code;
}
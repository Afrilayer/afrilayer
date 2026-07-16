// Git-native types for Afrilayer provider data

import type { ProviderStatus } from './constants';

// Key person for founder/maintainer attribution
export interface KeyPerson {
  name: string;
  role: string;
  github?: string;
}

// Pricing tier for API
export interface PricingTier {
  tier: string;
  price: string;
  note: string;
}

// Changelog entry
export interface ChangelogEntry {
  date: string;
  note: string;
}

// Provider API data (from api.json)
export interface ProviderApiData {
  curl?: string;
  js?: string;
  python?: string;
  go?: string;
  uptime?: string;
  latency?: string;
  rateLimit?: string;
  webhookSupport?: boolean;
  pricing: PricingTier[];
  changelog: ChangelogEntry[];
  version?: string;
}

// Unified Provider object - consumed by all UI components
export interface Provider {
  slug: string;
  name: string;
  tagline: string;
  logoUrl: string;
  description: string;
  website: string;
  documentation: string;
  developerPortal?: string;
  supportEmail?: string;
  headquarters?: string;
  categories: string[];
  countries: string[];
  features: string[];
  pricingModel: string;
  authentication: string;
  apiStyle?: string;
  sdkLanguages: string[];
  openapiSpec?: string;
  sandboxAvailable: boolean;
  productionReady: boolean;
  status: ProviderStatus;
  verified: boolean;
  lastVerified: string;
  lastUpdated: string;
  keyPeople: KeyPerson[];
  apiData?: ProviderApiData;
  relatedProviders: string[];
}

// ApiMock - legacy type for backward compatibility with UI components
// Used by ApiCard, ApiGrid, SimilarApisTable
export interface ApiMock {
  id: string;
  name: string;
  provider: string;
  category: string;
  countries: string[];
  description: string;
  status: ProviderStatus;
  lastVerified: string;
  uptime?: string;
  pricing?: PricingTier[];
  curl?: string;
  js?: string;
  python?: string;
  go?: string;
  changelog?: ChangelogEntry[];
  version?: string;
  latency?: string;
  authMethod?: string;
  rateLimit?: string;
  webhookSupport?: boolean;
  logoUrl?: string;
}

// Homepage stats - derived from registry
export interface HomepageStats {
  totalApis: number;
  totalProviders: number;
  totalCountries: number;
  liveApis: number;
  averageVerificationAge: string;
}

// Registry index entry (from registry.json)
export interface RegistryEntry {
  slug: string;
  name: string;
  status: ProviderStatus;
  categories: string[];
  countries: string[];
  lastVerified: string;
  features: string[];
  description: string;
  logoUrl?: string;
}
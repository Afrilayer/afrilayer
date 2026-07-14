// Provider Data Loader
// Reads provider content from the filesystem

import { promises as fs } from 'fs';
import path from 'path';
import type { ApiMock, ApiStatus } from '../mock-data';

// Provider JSON type - matches the mock data shape
export interface ProviderJson {
  slug: string;
  name: string;
  tagline: string;
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
  sandboxAvailable: boolean;
  productionReady: boolean;
  sdkLanguages: string[];
  openapiSpec?: string;
  status: ApiStatus;
  verified: boolean;
  lastVerified: string;
  lastUpdated: string;
}

// API-specific data that can be extended per provider
export interface ProviderApiData extends Partial<ApiMock> {
  // Code samples can be loaded from separate files
  curl?: string;
  js?: string;
  python?: string;
  go?: string;
}

// Get all provider directories
export async function getProviderSlugs(): Promise<string[]> {
  const providersPath = path.join(process.cwd(), 'providers');
  try {
    const entries = await fs.readdir(providersPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(slug => slug !== 'template');
  } catch {
    return [];
  }
}

// Load a single provider's JSON
export async function loadProviderJson(slug: string): Promise<ProviderJson | null> {
  const providersPath = path.join(process.cwd(), 'providers', slug, 'provider.json');
  try {
    const content = await fs.readFile(providersPath, 'utf-8');
    return JSON.parse(content) as ProviderJson;
  } catch {
    return null;
  }
}

// Load API-specific data
export async function loadProviderApiData(slug: string): Promise<ProviderApiData> {
  const providersPath = path.join(process.cwd(), 'providers', slug, 'api.json');
  try {
    const content = await fs.readFile(providersPath, 'utf-8');
    return JSON.parse(content) as ProviderApiData;
  } catch {
    return {};
  }
}

// Load a single provider's README
export async function loadProviderReadme(slug: string): Promise<string> {
  const providersPath = path.join(process.cwd(), 'providers', slug, 'README.md');
  try {
    return await fs.readFile(providersPath, 'utf-8');
  } catch {
    return '';
  }
}

// Load all providers (for SSR/build time)
export async function getAllProviders(): Promise<Array<{ slug: string; provider: ProviderJson; api: ApiMock }>> {
  const slugs = await getProviderSlugs();
  const results: Array<{ slug: string; provider: ProviderJson; api: ApiMock }> = [];

  for (const slug of slugs) {
    const provider = await loadProviderJson(slug);
    if (provider) {
      const apiData = await loadProviderApiData(slug);
      const api = providerToApiMock(provider, slug, apiData);
      results.push({ slug, provider, api });
    }
  }

  return results;
}

// Convert provider JSON to ApiMock format
export function providerToApiMock(provider: ProviderJson, slug: string, apiData: ProviderApiData = {}): ApiMock {
  return {
    id: slug,
    name: apiData.name || `${provider.name} API`,
    provider: provider.name,
    category: provider.categories[0] || 'Other',
    countries: provider.countries,
    description: apiData.description || provider.description,
    status: provider.status,
    lastVerified: provider.lastVerified,
    uptime: apiData.uptime || '99.9%',
    pricing: apiData.pricing || [{ tier: 'Standard', price: 'Contact', note: 'Contact sales for pricing' }],
    curl: apiData.curl || '',
    js: apiData.js || '',
    python: apiData.python || '',
    go: apiData.go || '',
    changelog: apiData.changelog || [],
    version: apiData.version,
    latency: apiData.latency,
    authMethod: provider.authentication,
    rateLimit: apiData.rateLimit,
    webhookSupport: apiData.webhookSupport,
  };
}
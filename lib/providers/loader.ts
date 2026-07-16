// Provider Data Loader
// Reads provider content from the filesystem

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Provider, ProviderApiData } from '../types';
import { STATUS_VALUES } from '../constants';

// Resolve base directory for file operations
const __filename = fileURLToPath(import.meta.url);
const baseDir = path.resolve(path.dirname(__filename), '../..');

// Raw provider.json shape
interface RawProvider {
  slug: string;
  name: string;
  tagline: string;
  logoUrl?: string;
  description: string;
  website: string;
  documentation: string;
  developerPortal?: string;
  supportEmail?: string;
  headquarters?: string;
  categories: string[];
  countries: string[];
  features: string[];
  pricingModel?: string;
  authentication: string;
  apiStyle?: string;
  sandboxAvailable: boolean;
  productionReady: boolean;
  sdkLanguages?: string[];
  openapiSpec?: string;
  status: string;
  verified: boolean;
  lastVerified: string;
  lastUpdated: string;
  keyPeople?: { name: string; role: string; github?: string }[];
}

// Get all provider directories
export async function getProviderSlugs(): Promise<string[]> {
  const providersPath = path.join(baseDir, 'providers');
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
export async function loadProviderJson(slug: string): Promise<RawProvider | null> {
  const providersPath = path.join(baseDir, 'providers', slug, 'provider.json');
  try {
    const content = await fs.readFile(providersPath, 'utf-8');
    return JSON.parse(content) as RawProvider;
  } catch {
    return null;
  }
}

// Load API-specific data
export async function loadProviderApiData(slug: string): Promise<ProviderApiData> {
  const providersPath = path.join(baseDir, 'providers', slug, 'api.json');
  try {
    const content = await fs.readFile(providersPath, 'utf-8');
    return JSON.parse(content) as ProviderApiData;
  } catch {
    return { pricing: [], changelog: [] };
  }
}

// Load a single provider's README
export async function loadProviderReadme(slug: string): Promise<string> {
  const providersPath = path.join(baseDir, 'providers', slug, 'README.md');
  try {
    return await fs.readFile(providersPath, 'utf-8');
  } catch {
    return '';
  }
}

// Normalize raw provider to unified Provider object
// Note: logoUrl resolution happens via resolveProviderLogo for consistent fallback chain
export function normalizeProvider(raw: RawProvider, apiData: ProviderApiData = { pricing: [], changelog: [] }): Provider {
  return {
    slug: raw.slug,
    name: raw.name,
    tagline: raw.tagline,
    logoUrl: raw.logoUrl || `/api/logos/${raw.slug}`,
    description: raw.description,
    website: raw.website,
    documentation: raw.documentation,
    developerPortal: raw.developerPortal,
    supportEmail: raw.supportEmail,
    headquarters: raw.headquarters,
    categories: raw.categories,
    countries: raw.countries,
    features: raw.features || [],
    pricingModel: raw.pricingModel || 'Contact',
    authentication: raw.authentication,
    apiStyle: raw.apiStyle,
    sdkLanguages: raw.sdkLanguages || [],
    openapiSpec: raw.openapiSpec,
    sandboxAvailable: raw.sandboxAvailable,
    productionReady: raw.productionReady,
    status: STATUS_VALUES.includes(raw.status as any) 
      ? (raw.status as typeof STATUS_VALUES[number]) 
      : 'Live',
    verified: raw.verified,
    lastVerified: raw.lastVerified,
    lastUpdated: raw.lastUpdated,
    keyPeople: raw.keyPeople || [],
    apiData,
    relatedProviders: [], // Computed later
  };
}

// Load all providers (for SSR/build time)
export async function getAllProviders(): Promise<Provider[]> {
  const slugs = await getProviderSlugs();
  const results: Provider[] = [];

  for (const slug of slugs) {
    const rawProvider = await loadProviderJson(slug);
    if (rawProvider) {
      const apiData = await loadProviderApiData(slug);
      results.push(normalizeProvider(rawProvider, apiData));
    }
  }

  // Compute related providers with enhanced similarity
  // Similarity based on: categories (highest weight), countries, authentication, features
  for (const provider of results) {
    const similarityScores = results
      .filter(p => p.slug !== provider.slug)
      .map(p => {
        let score = 0;
        // Category overlap (highest weight)
        const categoryOverlap = p.categories.filter(c => provider.categories.includes(c)).length;
        score += categoryOverlap * 3;
        // Country overlap
        const countryOverlap = p.countries.filter(c => provider.countries.includes(c)).length;
        score += countryOverlap * 2;
        // Authentication match
        if (p.authentication === provider.authentication && p.authentication) {
          score += 1;
        }
        // Feature overlap
        const featureOverlap = p.features.filter(f => provider.features.includes(f)).length;
        score += featureOverlap * 0.5;
        return { slug: p.slug, score };
      })
      .sort((a, b) => b.score - a.score);
    
    provider.relatedProviders = similarityScores
      .filter(s => s.score > 0)
      .map(s => s.slug)
      .slice(0, 3);
  }

  return results;
}

// Export types
export type { Provider, ProviderApiData };
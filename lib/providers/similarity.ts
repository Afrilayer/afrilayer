// Similarity utilities for providers
// Pure functions for calculating related/similar providers

import type { Provider } from '../types';
import { CODE_TO_COUNTRY } from '../constants';

// Get providers that operate in a specific country (code-insensitive)
export function getProvidersByCountry(providers: Provider[], countryCode: string): Provider[] {
  const normalizedCode = countryCode.toUpperCase();
  const countryName = CODE_TO_COUNTRY[normalizedCode];
  if (!countryName) return [];
  
  return providers.filter(p => 
    p.countries.some(c => c.toLowerCase() === countryName.toLowerCase())
  );
}

// Calculate statistics for a country
export function getCountryStatistics(providers: Provider[], countryCode: string): {
  totalProviders: number;
  categories: string[];
  verifiedProviders: number;
} {
  const countryProviders = getProvidersByCountry(providers, countryCode);
  
  const categories = [...new Set(
    countryProviders.flatMap(p => p.categories)
  )];
  
  const verifiedProviders = countryProviders.filter(p => p.verified).length;
  
  return {
    totalProviders: countryProviders.length,
    categories,
    verifiedProviders,
  };
}

// Group providers by country code
export function groupProvidersByCountry(providers: Provider[]): Record<string, Provider[]> {
  const grouped: Record<string, Provider[]> = {};
  
  for (const provider of providers) {
    for (const countryName of provider.countries) {
      const code = CODE_TO_COUNTRY[countryName];
      if (code && !grouped[code]) {
        grouped[code] = [];
      }
      if (code) {
        grouped[code].push(provider);
      }
    }
  }
  
  return grouped;
}

// Weighted similarity score for providers
interface SimilarityScore {
  slug: string;
  score: number;
}

export function calculateSimilarProviders(
  provider: Provider,
  allProviders: Provider[],
  limit: number = 6
): Provider[] {
  if (!provider) return [];
  
  const scores: SimilarityScore[] = allProviders
    .filter(p => p.slug !== provider.slug)
    .map(p => {
      let score = 0;
      
      // Shared Categories (weight: 5, highest priority)
      const categoryOverlap = p.categories.filter(c => provider.categories.includes(c)).length;
      score += categoryOverlap * 5;
      
      // Shared Countries (weight: 3)
      const countryOverlap = p.countries.filter(c => provider.countries.includes(c)).length;
      score += countryOverlap * 3;
      
      // Shared Features/Products (weight: 2)
      const featureOverlap = p.features.filter(f => provider.features.includes(f)).length;
      score += featureOverlap * 2;
      
      // Shared Authentication (weight: 1.5)
      if (p.authentication && provider.authentication && 
          p.authentication.toLowerCase() === provider.authentication.toLowerCase()) {
        score += 1.5;
      }
      
      // Shared API Style (weight: 1)
      if (p.apiStyle && provider.apiStyle && 
          p.apiStyle.toLowerCase() === provider.apiStyle.toLowerCase()) {
        score += 1;
      }
      
      // Shared SDK Languages (weight: 0.5)
      const sdkOverlap = p.sdkLanguages.filter(l => provider.sdkLanguages.includes(l)).length;
      score += sdkOverlap * 0.5;
      
      return { slug: p.slug, score };
    })
    .sort((a, b) => b.score - a.score)
    .filter(s => s.score > 0) // Only include providers with some similarity
    .slice(0, limit);
  
  // Map back to provider objects
  const scoreMap = new Map(scores.map(s => [s.slug, s.score]));
  const similarProviders = allProviders
    .filter(p => scoreMap.has(p.slug))
    .sort((a, b) => (scoreMap.get(b.slug) || 0) - (scoreMap.get(a.slug) || 0));
  
  return similarProviders.slice(0, limit);
}

// Convert Provider to ApiMock format for ApiCard compatibility
export function providerToApiMock(provider: Provider) {
  return {
    id: provider.slug,
    name: `${provider.name} API`,
    provider: provider.name,
    category: provider.categories[0] || '',
    countries: provider.countries,
    description: provider.description,
    status: provider.status,
    lastVerified: provider.lastVerified,
    uptime: provider.apiData?.uptime || 'N/A',
    pricing: provider.apiData?.pricing || [],
    curl: provider.apiData?.curl || '',
    js: provider.apiData?.js || '',
    python: provider.apiData?.python || '',
    go: provider.apiData?.go || '',
    changelog: provider.apiData?.changelog || [],
    version: provider.apiData?.version,
    latency: provider.apiData?.latency,
    authMethod: provider.authentication,
    rateLimit: provider.apiData?.rateLimit,
    webhookSupport: provider.apiData?.webhookSupport,
    logoUrl: provider.logoUrl || undefined,
  };
}
// Data Layer - Filesystem-based provider data
// This module provides a clean abstraction for loading provider data from /providers

import { getAllProviders, loadProviderJson, loadProviderApiData, getProviderSlugs } from './providers';
import type { ApiMock, ApiStatus } from './mock-data';
import type { ProviderJson } from './providers/loader';

// Re-export loadProviderJson for use in pages
export { loadProviderJson };

// Get all APIs (server-side for static generation)
export async function getAllApis(): Promise<ApiMock[]> {
  const providers = await getAllProviders();
  return providers.map(p => p.api);
}

// Get API by slug (for dynamic routes)
export async function getApiBySlug(slug: string): Promise<ApiMock | null> {
  const provider = await loadProviderJson(slug);
  if (!provider) return null;
  
  const apiData = await loadProviderApiData(slug);
  
  // Import the providerToApiMock function
  const { providerToApiMock } = await import('./providers/loader');
  return providerToApiMock(provider, slug, apiData);
}

// Get all slugs for static generation
export async function getAllApiSlugs(): Promise<string[]> {
  return getProviderSlugs();
}

// Get all providers with full data (for provider listing)
export async function getAllProvidersWithData(): Promise<Array<{ slug: string; provider: ProviderJson }>> {
  const slugs = await getProviderSlugs();
  const results: Array<{ slug: string; provider: ProviderJson }> = [];
  
  for (const slug of slugs) {
    const provider = await loadProviderJson(slug);
    if (provider) {
      results.push({ slug, provider });
    }
  }
  
  return results;
}
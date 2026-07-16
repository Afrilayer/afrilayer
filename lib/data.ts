// Data Layer - Filesystem-based provider data
// This module provides a clean abstraction for loading provider data from /providers

import { getAllProviders, loadProviderJson, loadProviderApiData, getProviderSlugs, loadProviderReadme, normalizeProvider } from './providers';
import type { Provider, ProviderApiData } from './types';

// Get all providers (server-side for static generation)
export async function getAllProvidersData(): Promise<Provider[]> {
  return getAllProviders();
}

// Get provider by slug (for dynamic routes)
export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  const rawProvider = await loadProviderJson(slug);
  if (!rawProvider) return null;
  
  const apiData = await loadProviderApiData(slug);
  return normalizeProvider(rawProvider, apiData);
}

// Get all slugs for static generation
export async function getAllProviderSlugs(): Promise<string[]> {
  return getProviderSlugs();
}

// Re-export for backward compatibility
export { loadProviderJson, loadProviderReadme, loadProviderApiData };
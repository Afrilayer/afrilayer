// Featured provider selection utilities
// Used at build time to select featured/suggested content for the homepage

import type { Provider } from '../types';
import { getVerificationTier } from './sort';
import { CODE_TO_COUNTRY } from '../constants';

// Get featured (most prominent) providers - top 6 by verification tier
export function getFeaturedProviders(providers: Provider[], count: number = 6): Provider[] {
  const sorted = [...providers].sort((a, b) => {
    const tierA = getVerificationTier(a);
    const tierB = getVerificationTier(b);
    if (tierA !== tierB) return tierA - tierB;
    return a.name.localeCompare(b.name);
  });
  return sorted.slice(0, count);
}

// Get recently added providers (by lastUpdated descending)
export function getRecentlyAdded(providers: Provider[], count: number = 6): Provider[] {
  return [...providers]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, count);
}

// Get recently verified providers (by lastVerified descending)
export function getRecentlyVerified(providers: Provider[], count: number = 6): Provider[] {
  return [...providers]
    .sort((a, b) => new Date(b.lastVerified).getTime() - new Date(a.lastVerified).getTime())
    .slice(0, count);
}

// Get featured categories (most common categories among verified providers)
export function getFeaturedCategories(
  providers: Provider[],
  count: number = 6
): Array<{ name: string; slug: string; count: number }> {
  const categoryCounts = new Map<string, number>();

  for (const p of providers) {
    for (const cat of p.categories) {
      categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
    }
  }

  return [...categoryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }));
}

// Get featured countries (most common countries among verified providers)
export function getFeaturedCountries(
  providers: Provider[],
  count: number = 6
): Array<{ name: string; code: string; count: number }> {
  const countryCounts = new Map<string, number>();

  for (const p of providers) {
    for (const countryName of p.countries) {
      countryCounts.set(countryName, (countryCounts.get(countryName) || 0) + 1);
    }
  }

  return [...countryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name]) => ({
      name,
      code: (CODE_TO_COUNTRY as Record<string, string>)[name] || name.toLowerCase(),
      count: countryCounts.get(name) || 0,
    }));
}
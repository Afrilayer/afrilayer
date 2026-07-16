// Statistics calculation from filesystem provider data

import { getAllProvidersData } from './data';
import { CODE_TO_COUNTRY, SLUG_TO_CATEGORY } from './constants';
import type { HomepageStats } from './types';

export async function getHomepageStats(): Promise<HomepageStats> {
  const providers = await getAllProvidersData();
  
  const totalApis = providers.length;
  const totalProviders = providers.length;
  const uniqueCountries = [...new Set(providers.flatMap(p => p.countries))];
  const totalCountries = uniqueCountries.length;
  const liveApis = providers.filter(p => p.status === 'Live').length;

  // Calculate average verification age (days)
  const now = new Date();
  const verificationDates = providers.map(p => new Date(p.lastVerified));
  const avgAge = verificationDates.reduce((sum, date) => {
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return sum + diffDays;
  }, 0) / verificationDates.length;

  const averageVerificationAge = `${Math.round(avgAge)} days`;

  return {
    totalApis,
    totalProviders,
    totalCountries,
    liveApis,
    averageVerificationAge,
  };
}

// Get recently verified providers for live feed
export async function getRecentVerifications(limit: number = 5) {
  const providers = await getAllProvidersData();
  
  return providers
    .sort((a, b) => {
      const dateA = new Date(a.lastVerified);
      const dateB = new Date(b.lastVerified);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit)
    .map(p => ({
      provider: p.name,
      status: p.status,
      lastVerified: p.lastVerified,
    }));
}

// Get providers by country code
export async function getProvidersByCountry(countryCode: string) {
  const providers = await getAllProvidersData();
  const countryName = CODE_TO_COUNTRY[countryCode.toUpperCase()];
  if (!countryName) return [];
  
  return providers.filter(p => p.countries.includes(countryName));
}

// Get providers by category slug
export async function getProvidersByCategory(categorySlug: string) {
  const providers = await getAllProvidersData();
  const categoryName = SLUG_TO_CATEGORY[categorySlug.toLowerCase()];
  if (!categoryName) return [];
  
  return providers.filter(p => p.categories.includes(categoryName));
}
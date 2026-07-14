// Statistics calculation from filesystem provider data

import { getAllApis } from './data';

export interface HomepageStats {
  totalApis: number;
  totalProviders: number;
  totalCountries: number;
  liveApis: number;
  averageVerificationAge: string;
}

export async function getHomepageStats(): Promise<HomepageStats> {
  const apis = await getAllApis();
  
  const totalApis = apis.length;
  const uniqueProviders = [...new Set(apis.map(api => api.provider))];
  const totalProviders = uniqueProviders.length;
  const uniqueCountries = [...new Set(apis.flatMap(api => api.countries))];
  const totalCountries = uniqueCountries.length;
  const liveApis = apis.filter(api => api.status === 'Live').length;

  // Calculate average verification age (days)
  const now = new Date();
  const verificationDates = apis.map(api => new Date(api.lastVerified));
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
  const apis = await getAllApis();
  
  return apis
    .sort((a, b) => {
      const dateA = new Date(a.lastVerified);
      const dateB = new Date(b.lastVerified);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit)
    .map(api => ({
      provider: api.provider,
      status: api.status,
      lastVerified: api.lastVerified,
    }));
}

// Get APIs by country code
export async function getApisByCountry(countryCode: string) {
  const apis = await getAllApis();
  // Map ISO codes to country names
  const countryNameMap: Record<string, string> = {
    'ng': 'Nigeria',
    'za': 'South Africa',
    'gh': 'Ghana',
    'ke': 'Kenya',
    'ug': 'Uganda',
    'tz': 'Tanzania',
    'eg': 'Egypt',
    'ma': 'Morocco',
    'ci': "Côte d'Ivoire",
    'sn': 'Senegal',
    'rw': 'Rwanda',
    'tn': 'Tunisia',
  };
  
  const countryName = countryNameMap[countryCode.toLowerCase()];
  if (!countryName) return [];
  
  return apis.filter(api => api.countries.includes(countryName));
}

// Get APIs by category
export async function getApisByCategory(categorySlug: string) {
  const apis = await getAllApis();
  const categoryNameMap: Record<string, string> = {
    'mobile-money': 'Mobile Money',
    'payments': 'Payments',
    'kyc': 'KYC',
    'identity': 'Identity',
    'sms': 'SMS',
    'airtime': 'Airtime',
    'banking': 'Banking',
    'logistics': 'Logistics',
    'government': 'Government',
    'crypto': 'Crypto',
    'maps': 'Maps',
    'ai': 'AI',
  };
  
  const categoryName = categoryNameMap[categorySlug.toLowerCase()];
  if (!categoryName) return [];
  
  return apis.filter(api => api.category.toLowerCase() === categorySlug.toLowerCase() || api.category === categoryName);
}
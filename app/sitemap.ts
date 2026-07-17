import { MetadataRoute } from 'next';
import { getAllProvidersData } from '@/lib/data';
import { CATEGORY_TO_SLUG, COUNTRY_TO_CODE } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Get all providers for dynamic routes
  const providers = await getAllProvidersData();

  // Provider URLs
  const providerUrls = providers.map(provider => ({
    url: `${baseUrl}/apis/${provider.slug}`,
    lastModified: new Date(provider.lastVerified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Country URLs - filter to only countries with providers
  // Use country codes (lowercase) for URLs
  const providerCountries = [...new Set(
    providers.flatMap(p => p.countries.map(c => COUNTRY_TO_CODE[c]))
  )].filter(Boolean);
  const countryUrls = providerCountries.map((countryCode: string) => ({
    url: `${baseUrl}/countries/${countryCode.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category URLs - filter to only categories with providers
  const providerCategories = [...new Set(providers.flatMap(p => p.categories))];
  const categoryUrls = providerCategories.map(categoryName => ({
    url: `${baseUrl}/categories/${CATEGORY_TO_SLUG[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/countries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/providers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...providerUrls,
    ...countryUrls,
    ...categoryUrls,
  ];
}

export const dynamic = 'force-static';
export const revalidate = 3600;

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllProvidersData } from '@/lib/data';
import { ApiCard } from '@/components/ui';
import { CODE_TO_COUNTRY } from '@/lib/constants';
import type { Provider, ApiMock } from '@/lib/types';

// Convert Provider to ApiMock format for ApiCard compatibility
function providerToApiMock(provider: Provider): ApiMock {
  return {
    id: provider.slug,
    name: `${provider.name} API`,
    provider: provider.name,
    category: provider.categories[0],
    countries: provider.countries,
    description: provider.description,
    status: provider.status,
    lastVerified: provider.lastVerified,
    uptime: provider.apiData?.uptime || '99.9%',
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

export async function generateStaticParams() {
  const providers = await getAllProvidersData();
  const codes = [...new Set(providers.flatMap(p => p.countries.map(c => CODE_TO_COUNTRY[c])))].filter(Boolean) as string[];
  return codes.map((code) => ({ code }));
}

export default async function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const providers = await getAllProvidersData();
  const apis = providers
    .filter((p) => p.countries.some(c => c.toLowerCase() === code.toLowerCase()))
    .map(providerToApiMock);

  const countryName = CODE_TO_COUNTRY[code.toUpperCase()];

  if (!countryName || apis.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <p className="text-text">Country not found or no APIs available.</p>
      </div>
    );
  }

  const COUNTRY_FLAGS: Record<string, string> = {
    'NG': '🇳🇬', 'ZA': '🇿🇦', 'GH': '🇬🇭', 'KE': '🇰🇪',
    'UG': '🇺🇬', 'TZ': '🇹🇿', 'EG': '🇪🇬', 'MA': '🇲🇦',
    'CI': '🇨🇮', 'SN': '🇸🇳', 'RW': '🇷🇼', 'TN': '🇹🇳',
    'CM': '🇨🇲',
  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      {/* Back Link */}
      <Link
        href="/countries"
        className="inline-flex items-center gap-1.5 text-xs font-mono mb-8 text-muted-dim hover:text-text transition-colors"
      >
        <ArrowLeft size={13} /> back to countries
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-4xl">{COUNTRY_FLAGS[code.toUpperCase()] || '🌍'}</span>
        <div>
          <h1 className="text-3xl font-semibold text-text">{countryName}</h1>
          <p className="text-sm text-muted mt-1 font-mono">{apis.length} verified APIs</p>
        </div>
      </div>

      {/* APIs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">
        {apis.map((api) => (
          <Link
            key={api.id}
            href={`/apis/${api.id}`}
            className="block"
          >
            <ApiCard api={api} showCountryLinks={false} showCategoryLink={true} />
          </Link>
        ))}
      </div>
    </div>
  );
}
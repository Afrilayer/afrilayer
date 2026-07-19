export const dynamic = 'force-static';
export const dynamicParams = false;

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllProvidersData } from '@/lib/data';
import { ApiCard, EmptyState } from '@/components/ui';
import { getCountry, COUNTRY_TO_CODE, CODE_TO_COUNTRY, COUNTRY_CODES } from '@/lib/countries';
import { getProvidersByCountry, getCountryStatistics, providerToApiMock } from '@/lib/providers/similarity';
import type { Metadata } from 'next';

// Generate static params for all countries with providers
export async function generateStaticParams() {
  const providers = await getAllProvidersData();
  const codes = [...new Set(
    providers.flatMap(p => p.countries.map(c => COUNTRY_TO_CODE[c] || '').filter(Boolean))
  )];
  return codes.map((code) => ({ code: code.toLowerCase() }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const country = getCountry(code);
  
  if (!country) {
    return { title: 'Country Not Found' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: `${country.name} APIs`,
    description: `Discover verified APIs operating in ${country.name}.`,
    alternates: {
      canonical: `${baseUrl}/countries/${code}`,
    },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const providers = await getAllProvidersData();

  // Use the utility to get providers by country code
  const countryProviders = getProvidersByCountry(providers, code);

  // Get country metadata
  const country = getCountry(code);

  if (!country || countryProviders.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <EmptyState
          icon="folder"
          title="No providers found"
          description={`No providers have been added for this country yet.`}
          action={{
            label: 'Contribute',
            href: '/contribute',
          }}
        />
      </div>
    );
  }

  // Get dynamic statistics
  const stats = getCountryStatistics(providers, code);

  // Convert providers to ApiMock format for the card
  const apis = countryProviders.map(providerToApiMock);

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
        <span className="text-4xl">{country.flag}</span>
        <div>
          <h1 className="text-3xl font-semibold text-text">{country.name}</h1>
          <p className="text-sm text-muted mt-1 font-mono">
            {stats.totalProviders} Provider{stats.totalProviders !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Categories represented */}
      {stats.categories.length > 0 && (
        <p className="text-sm text-muted mb-6 font-mono">
          {stats.categories.map((cat, i) => (
            <span key={cat}>
              {i > 0 && ' • '}
              <Link
                href={`/categories/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-copper hover:text-amber transition-colors"
              >
                {cat}
              </Link>
            </span>
          ))}
        </p>
      )}

      {/* APIs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">
        {apis.map((api) => (
          <Link
            key={api.id}
            href={`/apis/${api.id}`}
            className="block"
          >
            <ApiCard api={api} showCountryLinks={true} showCategoryLink={true} />
          </Link>
        ))}
      </div>
    </div>
  );
}
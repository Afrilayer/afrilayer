export const dynamic = 'force-static';
export const revalidate = 3600;

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getApisByCountry } from '@/lib/stats';
import { ApiCard } from '@/components/ui';

const COUNTRY_NAMES: Record<string, string> = {
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

const COUNTRY_FLAGS: Record<string, string> = {
  'NG': '🇳🇬', 'ZA': '🇿🇦', 'GH': '🇬🇭', 'KE': '🇰🇪',
  'UG': '🇺🇬', 'TZ': '🇹🇿', 'EG': '🇪🇬', 'MA': '🇲🇦',
  'CI': '🇨🇮', 'SN': '🇸🇳', 'RW': '🇷🇼', 'TN': '🇹🇳',
};

export async function generateStaticParams() {
  return Object.keys(COUNTRY_NAMES).map((code) => ({ code }));
}

export default async function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const countryName = COUNTRY_NAMES[code.toLowerCase()];
  const apis = await getApisByCountry(code);

  if (!countryName || apis.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <p className="text-text">Country not found or no APIs available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      {/* Back Link */}
      <Link
        href="/countries"
        className="inline-flex items-center gap-1.5 text-xs font-mono mb-8"
        style={{ color: "#5D6058" }}
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
            <ApiCard api={api} />
          </Link>
        ))}
      </div>
    </div>
  );
}
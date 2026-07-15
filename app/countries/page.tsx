import Link from 'next/link';
import { getAllApis } from '@/lib/data';

const countries = [
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
  { name: 'Ghana', code: 'GH', flag: '🇬🇭' },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
  { name: 'Uganda', code: 'UG', flag: '🇺🇬' },
  { name: 'Tanzania', code: 'TZ', flag: '🇹🇿' },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬' },
  { name: 'Morocco', code: 'MA', flag: '🇲🇦' },
  { name: 'CÃ´te d\'Ivoire', code: 'CI', flag: '🇨🇮' },
  { name: 'Senegal', code: 'SN', flag: '🇸🇳' },
  { name: 'Rwanda', code: 'RW', flag: '🇷🇼' },
  { name: 'Tunisia', code: 'TN', flag: '🇹🇳' },
];

const countryCodeMap: Record<string, string> = {
  'Nigeria': 'ng',
  'South Africa': 'za',
  'Ghana': 'gh',
  'Kenya': 'ke',
  'Uganda': 'ug',
  'Tanzania': 'tz',
  'Egypt': 'eg',
  'Morocco': 'ma',
  'CÃ´te d\'Ivoire': 'ci',
  'Senegal': 'sn',
  'Rwanda': 'rw',
  'Tunisia': 'tn',
};

// Country to region mapping
const countryToRegion: Record<string, string> = {
  'Nigeria': 'west',
  'Ghana': 'west',
  'Senegal': 'west',
  "CÃ´te d'Ivoire": 'west',
  'Kenya': 'east',
  'Uganda': 'east',
  'Tanzania': 'east',
  'Rwanda': 'east',
  'Egypt': 'north',
  'Morocco': 'north',
  'Tunisia': 'north',
  'South Africa': 'south',
};

export default async function CountriesPage() {
  const apis = await getAllApis();
  
  // Calculate real API counts per country
  const countryCounts = countries.map((country) => ({
    ...country,
    apiCount: apis.filter((api) => api.countries.includes(country.name)).length,
  }));

  // Group by region
  const regions = {
    west: countryCounts.filter((c) => countryToRegion[c.name] === 'west'),
    east: countryCounts.filter((c) => countryToRegion[c.name] === 'east'),
    north: countryCounts.filter((c) => countryToRegion[c.name] === 'north'),
    south: countryCounts.filter((c) => countryToRegion[c.name] === 'south'),
  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-text">
        API coverage by country
      </h1>
      <p className="mt-2 text-muted max-w-2xl">
        Discover verified APIs operating in African markets.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 stagger-children">
        {countryCounts.map((country) => (
          <Link
            key={country.code}
            href={`/countries/${country.code.toLowerCase()}`}
            className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface p-4 text-center transition-all hover-lift"
          >
            <span className="text-3xl">{country.flag}</span>
            <span className="text-sm font-medium text-text">
              {country.name}
            </span>
            <span className="text-xs text-muted">
              {country.apiCount} verified APIs
            </span>
          </Link>
        ))}
      </div>

      {/* Regions */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-text">
          By Region
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium text-muted">
              West Africa
            </h3>
            <ul className="mt-2 space-y-1">
              {regions.west.map((country) => (
                <li key={country.code}>
                  <Link
                    href={`/countries/${country.code.toLowerCase()}`}
                    className="text-sm text-copper hover:text-amber transition-colors"
                  >
                    {country.name} ({country.apiCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-muted">
              East Africa
            </h3>
            <ul className="mt-2 space-y-1">
              {regions.east.map((country) => (
                <li key={country.code}>
                  <Link
                    href={`/countries/${country.code.toLowerCase()}`}
                    className="text-sm text-copper hover:text-amber transition-colors"
                  >
                    {country.name} ({country.apiCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-muted">
              North Africa
            </h3>
            <ul className="mt-2 space-y-1">
              {regions.north.map((country) => (
                <li key={country.code}>
                  <Link
                    href={`/countries/${country.code.toLowerCase()}`}
                    className="text-sm text-copper hover:text-amber transition-colors"
                  >
                    {country.name} ({country.apiCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-muted">
              Southern Africa
            </h3>
            <ul className="mt-2 space-y-1">
              {regions.south.map((country) => (
                <li key={country.code}>
                  <Link
                    href={`/countries/${country.code.toLowerCase()}`}
                    className="text-sm text-copper hover:text-amber transition-colors"
                  >
                    {country.name} ({country.apiCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
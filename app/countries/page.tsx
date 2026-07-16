import Link from 'next/link';
import { getAllProvidersData } from '@/lib/data';
import { COUNTRIES } from '@/lib/countries';

export default async function CountriesPage() {
  const providers = await getAllProvidersData();
  
  // Calculate real API counts per country using dynamic data
  const countryCounts = Object.values(COUNTRIES).map((country) => ({
    ...country,
    apiCount: providers.filter((p) => p.countries.includes(country.name)).length,
  }));

  // Group by region
  const regions = {
    west: countryCounts.filter((c) => c.region === 'west'),
    east: countryCounts.filter((c) => c.region === 'east'),
    north: countryCounts.filter((c) => c.region === 'north'),
    south: countryCounts.filter((c) => c.region === 'south'),
    central: countryCounts.filter((c) => c.region === 'central'),
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
import Link from 'next/link';

const countries = [
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬', apiCount: 45 },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦', apiCount: 38 },
  { name: 'Ghana', code: 'GH', flag: '🇬🇭', apiCount: 28 },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪', apiCount: 24 },
  { name: 'Uganda', code: 'UG', flag: '🇺🇬', apiCount: 19 },
  { name: 'Tanzania', code: 'TZ', flag: '🇹🇿', apiCount: 15 },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬', apiCount: 18 },
  { name: 'Morocco', code: 'MA', flag: '🇲🇦', apiCount: 12 },
  { name: 'Côte d\'Ivoire', code: 'CI', flag: '🇨🇮', apiCount: 10 },
  { name: 'Senegal', code: 'SN', flag: '🇸🇳', apiCount: 8 },
  { name: 'Rwanda', code: 'RW', flag: '🇷🇼', apiCount: 7 },
  { name: 'Tunisia', code: 'TN', flag: '🇹🇳', apiCount: 6 },
];

export default function CountriesPage() {
  const regions = {
    west: ['Nigeria', 'Ghana', 'Senegal', "Côte d'Ivoire"],
    east: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda'],
    north: ['Egypt', 'Morocco', 'Tunisia'],
    south: ['South Africa'],
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold text-charcoal">
        Browse APIs by Country
      </h1>
      <p className="mt-2 text-charcoal/70 max-w-2xl">
        Find APIs available in specific African countries.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 stagger-children">
        {countries.map((country) => (
          <Link
            key={country.code}
            href={`/countries/${country.code.toLowerCase()}`}
            className="flex flex-col items-center gap-2 rounded-xl border border-sand-100 bg-white p-4 text-center transition-all hover-lift"
          >
            <span className="text-3xl">{country.flag}</span>
            <span className="text-sm font-medium text-charcoal">
              {country.name}
            </span>
            <span className="text-xs text-charcoal/60">
              {country.apiCount} APIs
            </span>
          </Link>
        ))}
      </div>

      {/* Regions */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-charcoal">
          By Region
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium text-charcoal/80">
              West Africa
            </h3>
            <ul className="mt-2 space-y-1">
              {regions.west.map((country) => (
                <li key={country}>
                  <Link
                    href={`/countries/${country.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-baobab-600 hover:text-baobab-700 transition-colors"
                  >
                    {country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-charcoal/80">
              East Africa
            </h3>
            <ul className="mt-2 space-y-1">
              {regions.east.map((country) => (
                <li key={country}>
                  <Link
                    href={`/countries/${country.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-baobab-600 hover:text-baobab-700 transition-colors"
                  >
                    {country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-charcoal/80">
              North Africa
            </h3>
            <ul className="mt-2 space-y-1">
              {regions.north.map((country) => (
                <li key={country}>
                  <Link
                    href={`/countries/${country.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-baobab-600 hover:text-baobab-700 transition-colors"
                  >
                    {country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-charcoal/80">
              Southern Africa
            </h3>
            <ul className="mt-2 space-y-1">
              {regions.south.map((country) => (
                <li key={country}>
                  <Link
                    href={`/countries/${country.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-baobab-600 hover:text-baobab-700 transition-colors"
                  >
                    {country}
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

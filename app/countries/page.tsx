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

const countryCodeMap: Record<string, string> = {
  'Nigeria': 'ng',
  'South Africa': 'za',
  'Ghana': 'gh',
  'Kenya': 'ke',
  'Uganda': 'ug',
  'Tanzania': 'tz',
  'Egypt': 'eg',
  'Morocco': 'ma',
  'Côte d\'Ivoire': 'ci',
  'Senegal': 'sn',
  'Rwanda': 'rw',
  'Tunisia': 'tn',
};

export default function CountriesPage() {
  const regions = {
    west: [
      { name: 'Nigeria', code: 'NG' },
      { name: 'Ghana', code: 'GH' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Côte d\'Ivoire', code: 'CI' },
    ],
    east: [
      { name: 'Kenya', code: 'KE' },
      { name: 'Uganda', code: 'UG' },
      { name: 'Tanzania', code: 'TZ' },
      { name: 'Rwanda', code: 'RW' },
    ],
    north: [
      { name: 'Egypt', code: 'EG' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Tunisia', code: 'TN' },
    ],
    south: [
      { name: 'South Africa', code: 'ZA' },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl font-semibold text-text">
        API coverage by country
      </h1>
      <p className="mt-2 text-muted max-w-2xl">
        Discover verified APIs operating in 15+ African markets.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 stagger-children">
        {countries.map((country) => (
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
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    {country.name}
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
                    {country.name}
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
                    {country.name}
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
                    {country.name}
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
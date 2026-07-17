'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search as SearchIcon, TrendingUp } from 'lucide-react';
import { VerificationBadge } from '@/components/ui';
import type { Provider } from '@/lib/types';

// Trending providers - most searched/popular APIs
const TRENDING_SLUGS = ['paystack', 'flutterwave', 'mtn-momo', 'hubtel', 'okra', 'mono', 'kora', 'valr', 'dojah', 'africas-talking'];

export default function SearchPage() {
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<Provider[]>([]);
  const [allProviders, setAllProviders] = React.useState<Provider[]>([]);

  // Load providers from registry on mount
  React.useEffect(() => {
    fetch('/generated/registry.json')
      .then(res => res.json())
      .then(data => setAllProviders(data.index || []))
      .catch(() => setAllProviders([]));
  }, []);

  // Perform search
  React.useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setResults(
          allProviders
            .filter((p) =>
              `${p.name} ${p.slug} ${p.categories?.join(' ')} ${p.countries?.join(' ')} ${p.features?.join(' ')}`
                .toLowerCase()
                .includes(query.toLowerCase())
            )
            .slice(0, 10)
        );
        setIsLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, allProviders]);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-text mb-6">
        Search APIs
      </h1>

      <div className="mb-8 max-w-2xl">
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg w-full bg-surface border border-border">
          <SearchIcon size={16} className="text-muted-dim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search APIs, providers, categories..."
            className="bg-transparent outline-none text-sm w-full font-mono text-text placeholder:text-muted-dim"
            aria-label="Search APIs and providers"
          />
        </div>
      </div>

      {/* Trending section - shown when no query */}
      {!isLoading && !query && (
        <TrendingSection providers={allProviders} />
      )}

      {/* Results count */}
      {query && !isLoading && (
        <p className="mb-4 text-sm text-muted" aria-live="polite">
          Found <span className="font-medium text-text">{results.length}</span> results for "{query}"
        </p>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-surface border border-border animate-pulse" />
          ))}
        </div>
      )}

      {/* Results */}
      {!isLoading && query && results.length > 0 && (
        <div className="space-y-4 stagger-children">
          {results.map((result) => (
            <Link
              key={result.slug}
              href={`/apis/${result.slug}`}
              className="block rounded-lg border border-border bg-surface p-6 transition-all hover-lift"
            >
              <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-text hover:text-clay transition-colors flex items-center gap-1.5">
                      {result.name}
                      {result.verification?.verified && (
                        <VerificationBadge level={result.verification.level} size={18} />
                      )}
                    </h2>
                  <p className="mt-1 text-sm text-muted">
                    {result.categories[0]}
                  </p>
                  <p className="mt-2 text-sm text-muted max-w-2xl">
                    {result.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted">
                      {result.categories[0]}
                    </span>
                    {result.countries?.slice(0, 3).map((c) => (
                      <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state - no query */}
      {!isLoading && !query && (
        <div className="text-center py-16 rounded-lg border border-dashed border-border">
          <h3 className="text-lg font-semibold text-text mb-2">Search for APIs and providers</h3>
          <p className="text-sm text-muted">
            Enter a search term above to find APIs built for Africa. Try searching for payment APIs, 
            mobile money, KYC services, or specific providers.
          </p>
        </div>
      )}

      {/* Empty state - no results */}
      {!isLoading && query && results.length === 0 && (
        <div className="text-center py-16 rounded-lg border border-dashed border-border">
          <h3 className="text-lg font-semibold text-text mb-2">No results found</h3>
          <p className="text-sm text-muted">
            We couldn't find any APIs matching "{query}". Try searching with different keywords or browse our categories.
          </p>
          <Link href="/" className="inline-block mt-4 text-xs font-mono text-clay hover:underline">
            Browse Providers →
          </Link>
        </div>
      )}
    </div>
  );
}

function TrendingSection({ providers }: { providers: Provider[] }) {
  const trendingProviders = providers.filter(p => TRENDING_SLUGS.includes(p.slug));

  if (trendingProviders.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-clay" />
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider">Trending Searches</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {trendingProviders.map(provider => (
          <Link
            key={provider.slug}
            href={`/apis/${provider.slug}`}
            className="px-3 py-1.5 text-xs font-mono rounded-md bg-surface border border-border text-muted hover:text-text hover:border-clay transition-colors"
          >
            {provider.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
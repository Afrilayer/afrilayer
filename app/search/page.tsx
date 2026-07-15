'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search as SearchIcon } from 'lucide-react';
import type { ApiMock } from '@/lib/mock-data';

// Search API function - will be called client-side with cached data
// Note: In production, this would fetch from an API endpoint
// For now, we'll use the mock data as fallback

export default function SearchPage() {
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<ApiMock[]>([]);
  const [allApis, setAllApis] = React.useState<ApiMock[]>([]);

  // Load APIs on mount
  React.useEffect(() => {
    fetch('/api/search-data')
      .then(res => res.json())
      .then(data => setAllApis(data.apis || []))
      .catch(() => setAllApis([]));
  }, []);

  // Perform search using real data
  React.useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      // Simulate slight delay for UX
      const timer = setTimeout(() => {
        setResults(
          allApis
            .filter((api) =>
              `${api.name} ${api.provider} ${api.category} ${api.countries?.join(' ')}`
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
  }, [query, allApis]);

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
              key={result.id}
              href={`/apis/${result.id}`}
              className="block rounded-lg border border-border bg-surface p-6 transition-all hover-lift"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-text hover:text-clay transition-colors">
                    {result.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    by {result.provider}
                  </p>
                  <p className="mt-2 text-sm text-muted max-w-2xl">
                    {result.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted">
                      {result.category}
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
          <Link href="/categories" className="inline-block mt-4 text-xs font-mono text-clay hover:underline">
            Browse Categories →
          </Link>
        </div>
      )}
    </div>
  );
}
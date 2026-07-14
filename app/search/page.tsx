'use client';

import * as React from 'react';
import Link from 'next/link';
import { SearchInput, Badge, EmptyState, SkeletonCard } from '@/components/ui';
import { Search, Database, Package } from 'lucide-react';

// Mock search results
const mockResults = [
  {
    id: '1',
    type: 'api',
    name: 'MTN Mobile Money API',
    slug: 'mtn-momo',
    provider: 'MTN Group',
    description: 'Integrate MTN Mobile Money for seamless payments across Africa.',
    categories: ['Mobile Money', 'Payments'],
  },
  {
    id: '2',
    type: 'api',
    name: 'Vodafone Cash API',
    slug: 'vodafone-cash',
    provider: 'Vodafone',
    description: 'Mobile money services for Ghana and Tanzania.',
    categories: ['Mobile Money'],
  },
  {
    id: '3',
    type: 'provider',
    name: 'Paystack',
    slug: 'paystack',
    description: 'Payments infrastructure for businesses in Africa.',
    apiCount: 3,
  },
];

export default function SearchPage() {
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<typeof mockResults>([]);

  // Simulate search with loading state
  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setResults(mockResults);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        Search APIs
      </h1>

      <div className="mb-8 max-w-2xl">
        <SearchInput
          placeholder="Search APIs, providers, categories..."
          value={query}
          onChange={handleSearch}
          showShortcutHint
        />
      </div>

      {/* Results count */}
      {query && !isLoading && (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
          Found <span className="font-medium">{results.length}</span> results for "{query}"
        </p>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Results */}
      {!isLoading && query && results.length > 0 && (
        <div className="space-y-6 stagger-children">
          {results.map((result) => (
            <div
              key={result.id}
              className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              {'type' in result && result.type === 'api' ? (
                <Link href={`/apis/${result.slug}`}>
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-primary-600 dark:text-white">
                    {result.name}
                  </h2>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    by {result.provider}
                  </p>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">
                    {result.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.categories?.map((cat) => (
                      <Badge key={cat} variant="default">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </Link>
              ) : (
                <Link href={`/providers/${(result as typeof mockResults[2]).slug}`}>
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-primary-600 dark:text-white">
                    {(result as typeof mockResults[2]).name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {(result as typeof mockResults[2]).apiCount} APIs
                  </p>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">
                    {result.description}
                  </p>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state - no query */}
      {!isLoading && !query && (
        <EmptyState
          icon="search"
          title="Search for APIs and providers"
          description="Enter a search term above to find APIs built for Africa. Try searching for payment APIs, mobile money, KYC services, or specific providers."
        />
      )}

      {/* Empty state - no results */}
      {!isLoading && query && results.length === 0 && (
        <EmptyState
          icon="alert"
          title="No results found"
          description={`We couldn't find any APIs or providers matching "${query}". Try searching with different keywords or browse our categories.`}
          action={{
            label: 'Browse Categories',
            href: '/categories',
          }}
        />
      )}
    </div>
  );
}
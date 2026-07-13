'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SearchInput, Badge } from '@/components/ui';

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
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        Search APIs
      </h1>

      <div className="mb-8">
        <SearchInput
          placeholder="Search APIs, providers, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-2xl"
        />
      </div>

      <div className="space-y-6">
        {mockResults.map((result) => (
          <div
            key={result.id}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            {'type' in result && result.type === 'api' ? (
              <Link href={`/apis/${result.slug}`}>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-primary-600 dark:text-white">
                  {result.name}
                </h2>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  by {(result as typeof mockResults[0]).provider}
                </p>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {result.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(result as typeof mockResults[0]).categories.map((cat) => (
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
    </div>
  );
}
'use client';

import * as React from 'react';
import Link from 'next/link';

interface GitCommit {
  hash: string;
  date: string;
  message: string;
  author: string;
}

// Fallback static data if git data unavailable
interface FallbackUpdate {
  id: string;
  title: string;
  date: string;
  content: string;
  author: string;
}

const fallbackUpdates: FallbackUpdate[] = [
  {
    id: '1',
    title: 'Added Flutterwave API Documentation',
    date: '2026-07-10',
    content: 'Complete API documentation, endpoints, and pricing information for Flutterwave payment APIs.',
    author: 'System',
  },
  {
    id: '2',
    title: 'New: API Confidence Indicators',
    date: '2026-07-01',
    content: 'Every API now shows a confidence indicator based on verification date and status.',
    author: 'System',
  },
];

export default function ChangelogPage() {
  const [commits, setCommits] = React.useState<GitCommit[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/changelog-data')
      .then(res => res.json())
      .then(data => {
        setCommits(data.commits || []);
      })
      .catch(() => setCommits([]))
      .finally(() => setLoading(false));
  }, []);

  const displayUpdates = commits.length > 0 
    ? commits.map((c) => ({ id: c.hash, title: c.message, date: c.date, content: '', author: c.author }))
    : fallbackUpdates;

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-text">
        Changelog
      </h1>
      <p className="mt-2 text-muted max-w-2xl">
        Latest updates to the Afrilayer platform and API listings.
      </p>

      <div className="mt-10">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
          <div className="space-y-8">
            {loading && (
              <div className="text-center py-8">
                <span className="text-sm text-muted">Loading changelog...</span>
              </div>
            )}
            {displayUpdates.map((update) => (
              <div key={update.id} className="relative pl-12">
                <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-copper" />
                <div>
                  <time className="text-sm text-muted-dim">
                    {new Date(update.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="mt-1 text-xl font-semibold text-text">
                    {update.title}
                  </h2>
                  {update.author && (
                    <p className="mt-1 text-xs text-muted-dim">
                      by{' '}
                      <a
                        href={`https://github.com/${update.author}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-clay hover:underline"
                      >
                        {update.author}
                      </a>
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted">
                    {update.content || 'Changes made to the platform.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
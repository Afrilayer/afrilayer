'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const ITEMS_PER_PAGE = 10;

export default function ChangelogPage() {
  const [commits, setCommits] = React.useState<GitCommit[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    fetch('/changelog-data.json')
      .then(res => res.json())
      .then(data => {
        setCommits(data.commits || []);
      })
      .catch(() => setCommits([]))
      .finally(() => setLoading(false));
  }, []);

  const allUpdates = commits.length > 0 
    ? commits.map((c) => ({ id: c.hash, title: c.message, date: c.date, content: '', author: c.author }))
    : fallbackUpdates;

  const totalPages = Math.ceil(allUpdates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayUpdates = allUpdates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Changelog
        </h1>
        <p className="mt-2 text-text-muted max-w-2xl">
          Latest updates to the Afrilayer platform and API listings.
        </p>
      </div>

      <div className="mt-10">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-border" />
          <div className="space-y-8">
            {loading && (
              <div className="text-center py-8">
                <span className="text-sm text-text-muted">Loading changelog...</span>
              </div>
            )}
            {displayUpdates.map((update) => (
              <div key={update.id} className="relative pl-12">
                <div className="absolute left-2 top-2 h-4 w-4 rounded-full border-2 bg-primary border-primary" />
                <div>
                  <time className="text-sm text-text-muted">
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
                    <p className="mt-1 text-xs text-text-muted">
                      by{' '}
                      <a
                        href={`https://github.com/${update.author}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {update.author}
                      </a>
                    </p>
                  )}
                  <p className="mt-2 text-sm text-text-muted">
                    {update.content || 'Changes made to the platform.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
          <div className="text-xs text-text-muted">
            Page {currentPage} of {totalPages} · {allUpdates.length} total changes
          </div>
          <div className="flex items-center gap-2">
                    <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-border bg-surface text-text-muted hover:text-text hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
                Previous
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-border bg-surface text-text-muted hover:text-text hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                Next
                <ChevronRight size={14} />
              </button>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-bg px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text mb-3">
            Page not found
          </h2>
          <p className="text-text-muted">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-accent text-bg text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            <Home size={16} />
            Go home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border text-sm font-medium text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-text-muted mb-3">
            Or search for what you need:
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Search size={14} />
            Search APIs and providers
          </Link>
        </div>
      </div>
    </div>
  );
}
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { SearchInput } from '@/components/ui';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Categories', href: '/categories' },
  { name: 'Countries', href: '/countries' },
  { name: 'Providers', href: '/providers' },
  { name: 'Changelog', href: '/changelog' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-sand-100 bg-sand-50/90 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-semibold text-charcoal">
              Afrilayer
            </Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-charcoal',
                    pathname === item.href
                      ? 'text-baobab-600'
                      : 'text-charcoal/70'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile search toggle */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal/70 hover:bg-sand-100 hover:text-charcoal"
              aria-label="Toggle search"
              onClick={() => {
                const event = new CustomEvent('open-mobile-search');
                window.dispatchEvent(event);
              }}
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="hidden w-64 md:block">
              <SearchInput placeholder="Search APIs, providers..." aria-label="Search APIs and providers" />
            </div>

            <Link
              href="/admin/login"
              className="text-sm font-medium text-charcoal/70 hover:text-charcoal"
            >
              Admin
            </Link>

            {/* Mobile menu button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal/70 hover:bg-sand-100 hover:text-charcoal md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            className="border-t border-sand-100 bg-sand-50"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-charcoal',
                      pathname === item.href
                        ? 'text-baobab-600'
                        : 'text-charcoal/70'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <SearchInput placeholder="Search APIs, providers..." aria-label="Search APIs and providers" />
                </div>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Moon, Sun } from 'lucide-react';
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
  const [isDark, setIsDark] = React.useState(false);
  const pathname = usePathname();

  // Check system preference and localStorage on mount
  React.useEffect(() => {
    const isDarkStored = localStorage.getItem('theme') === 'dark';
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkStored || (!isDarkStored && isSystemDark));
  }, []);

  // Apply theme changes
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Afrilayer
            </Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100',
                    pathname === item.href
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400'
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
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden dark:text-gray-400 dark:hover:bg-gray-800"
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

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link
              href="/admin/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Admin
            </Link>

            {/* Mobile menu button */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden dark:text-gray-400 dark:hover:bg-gray-800"
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
            className="border-t border-gray-200 bg-white md:hidden dark:border-gray-800 dark:bg-gray-950"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100',
                      pathname === item.href
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400'
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
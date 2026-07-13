import Link from 'next/link';
import { SearchInput } from '@/components/ui';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Afrilayer
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/categories"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Categories
            </Link>
            <Link
              href="/countries"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Countries
            </Link>
            <Link
              href="/providers"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Providers
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-64 hidden md:block">
            <SearchInput placeholder="Search APIs, providers..." />
          </div>
          <Link
            href="/admin/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
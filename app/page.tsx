import Link from 'next/link';
import { Search, ArrowRight, Globe, CreditCard, MessageSquare, Phone, Users, MapPin } from 'lucide-react';
import { BackToTop } from '@/components/ui';

// Mock data - will be replaced with database queries
const featuredCategories = [
  { id: '1', name: 'Mobile Money', slug: 'mobile-money', icon: Phone, count: 24 },
  { id: '2', name: 'Payments', slug: 'payments', icon: CreditCard, count: 32 },
  { id: '3', name: 'KYC', slug: 'kyc', icon: Globe, count: 18 },
  { id: '4', name: 'SMS', slug: 'sms', icon: MessageSquare, count: 15 },
  { id: '5', name: 'Banking', slug: 'banking', icon: CreditCard, count: 12 },
  { id: '6', name: 'Identity', slug: 'identity', icon: Globe, count: 9 },
];

const popularApis = [
  {
    id: '1',
    name: 'MTN Mobile Money API',
    slug: 'mtn-momo',
    provider: 'MTN Group',
    categories: ['Mobile Money'],
    countries: ['Ghana', 'Uganda'],
    description: 'Integrate MTN Mobile Money for seamless payments across Africa.',
  },
  {
    id: '2',
    name: 'Paystack API',
    slug: 'paystack',
    provider: 'Paystack',
    categories: ['Payments'],
    countries: ['Nigeria', 'Ghana', 'South Africa'],
    description: 'Accept payments online from customers anywhere in Africa.',
  },
  {
    id: '3',
    name: 'Dojah API',
    slug: 'dojah',
    provider: 'Dojah',
    categories: ['KYC', 'Identity'],
    countries: ['Nigeria', 'Kenya'],
    description: 'Comprehensive KYC and identity verification for businesses.',
  },
];

// Stats for the trust section
const stats = [
  { value: '50+', label: 'Verified APIs', icon: Globe },
  { value: '20+', label: 'Providers', icon: CreditCard },
  { value: '15+', label: 'Countries', icon: MapPin },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-primary dark:border-gray-800">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-gray-200/[0.05] dark:bg-grid-gray-700/[0.05]" />
        <div className="container relative mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Discover the APIs powering Africa.
            </h1>
            <p className="animate-fade-in mt-6 text-lg text-gray-600 dark:text-gray-400" style={{ animationDelay: '100ms' }}>
              Search, compare and explore APIs for payments, identity, logistics, banking, SMS, 
              Mobile Money and more built for Africa. Every API listing is verified for accuracy.
            </p>
            <div className="mt-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Link
                href="/search"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary-600 px-8 text-sm font-medium text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                Search APIs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-fade-in text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center gap-2">
                  <stat.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Featured Categories
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Browse APIs by their primary use case.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                  <category.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count} APIs
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular APIs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Popular APIs
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Most viewed APIs this month.
              </p>
            </div>
            <Link
              href="/apis"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 stagger-children">
            {popularApis.map((api, index) => (
              <Link
                key={api.id}
                href={`/apis/${api.slug}`}
                className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700 dark:bg-gray-800"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {api.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  by {api.provider}
                </p>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {api.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {api.countries.map((country) => (
                    <span
                      key={country}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Country */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Browse by Country
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Find APIs available in specific African countries.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 stagger-children">
            {['Nigeria', 'South Africa', 'Ghana', 'Kenya', 'Uganda', 'Tanzania', 'Egypt', 'Morocco', 'Senegal', "Côte d'Ivoire"].map((country) => (
              <Link
                key={country}
                href={`/countries/${country.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {country}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Trusted API Information
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Every API listing includes verification dates, official documentation links, and confidence indicators.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Verified Information
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-800 dark:bg-blue-950 dark:text-blue-200">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Provider Managed
            </span>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
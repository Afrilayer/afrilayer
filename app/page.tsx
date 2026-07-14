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
      <section className="relative border-b border-sand-100 bg-hero">
        <div className="absolute inset-0 bg-topo opacity-30" />
        <div className="container relative mx-auto px-4 py-32 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="animate-fade-in text-5xl font-semibold tracking-tight text-charcoal sm:text-6xl">
              Discover Africa's API infrastructure.
            </h1>
            <p className="animate-fade-in mt-8 text-lg text-charcoal/70" style={{ animationDelay: '100ms' }}>
              The trusted platform where developers find, compare, and evaluate APIs for payments, 
              telecom, identity, logistics, and digital infrastructure across Africa.
            </p>
            <div className="mt-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Link
                href="/search"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-baobab-600 px-8 text-sm font-medium text-white shadow-subtle hover:bg-baobab-700 transition-all"
              >
                Search APIs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-sand-100 bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-fade-in text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center gap-2">
                  <stat.icon className="h-5 w-5 text-baobab-600" />
                  <span className="text-3xl font-semibold text-charcoal">
                    {stat.value}
                  </span>
                </div>
                <p className="mt-2 text-sm text-charcoal/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-sand-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-charcoal">
            Featured Categories
          </h2>
          <p className="mt-2 text-charcoal/70">
            Browse APIs by their primary use case.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex items-center gap-4 rounded-xl border border-sand-100 bg-white p-5 transition-all hover-lift"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-baobab-100">
                  <category.icon className="h-6 w-6 text-baobab-600" />
                </div>
                <div>
                  <h3 className="font-medium text-charcoal">
                    {category.name}
                  </h3>
                  <p className="text-sm text-charcoal/60">
                    {category.count} APIs
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular APIs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-charcoal">
                Popular APIs
              </h2>
              <p className="mt-2 text-charcoal/70">
                Most viewed APIs this month.
              </p>
            </div>
            <Link
              href="/apis"
              className="inline-flex items-center gap-1 text-sm font-medium text-baobab-600 hover:text-baobab-700 transition-colors"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 stagger-children">
            {popularApis.map((api, index) => (
              <Link
                key={api.id}
                href={`/apis/${api.slug}`}
                className="rounded-xl border border-sand-100 bg-white p-6 transition-all hover-lift"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="font-semibold text-charcoal">
                  {api.name}
                </h3>
                <p className="mt-1 text-sm text-charcoal/60">
                  by {api.provider}
                </p>
                <p className="mt-3 text-charcoal/80">
                  {api.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {api.countries.map((country) => (
                    <span
                      key={country}
                      className="rounded-full bg-sand-100 px-2.5 py-0.5 text-xs text-charcoal/70"
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
      <section className="bg-sand-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-charcoal">
            Browse by Country
          </h2>
          <p className="mt-2 text-charcoal/70">
            Find APIs available in specific African countries.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 stagger-children">
            {['Nigeria', 'South Africa', 'Ghana', 'Kenya', 'Uganda', 'Tanzania', 'Egypt', 'Morocco', 'Senegal', "Côte d'Ivoire"].map((country) => (
              <Link
                key={country}
                href={`/countries/${country.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-center rounded-xl border border-sand-100 bg-white py-4 text-center text-sm font-medium text-charcoal/70 transition-all hover-lift"
              >
                {country}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-charcoal">
            Trusted API Information
          </h2>
          <p className="mt-4 text-charcoal/70">
            Every API listing includes verification dates, official documentation links, and confidence indicators.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-sm text-success">
              <span className="h-2 w-2 rounded-full bg-success" />
              Verified Information
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-sm text-warning">
              <span className="h-2 w-2 rounded-full bg-warning" />
              Provider Managed
            </span>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}

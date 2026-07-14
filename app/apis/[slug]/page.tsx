import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge, ConfidenceIndicator } from '@/components/ui';
import { Book, Globe, TestTube, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

// Mock API data - will be fetched from database
const mockApi = {
  id: '1',
  name: 'MTN Mobile Money API',
  slug: 'mtn-momo',
  provider: {
    name: 'MTN Group',
    slug: 'mtn-group',
  },
  description:
    'The MTN Mobile Money API enables businesses to integrate mobile money services for seamless payments across multiple African markets. Access to Ghana, Uganda, Zambia, and more.',
  short_summary:
    'Integrate MTN Mobile Money for seamless payments across Africa.',
  categories: [
    { name: 'Mobile Money', slug: 'mobile-money' },
    { name: 'Payments', slug: 'payments' },
  ],
  countries: [
    { name: 'Ghana', code: 'GH', flag_emoji: '🇬🇭' },
    { name: 'Uganda', code: 'UG', flag_emoji: '🇺🇬' },
  ],
  documentation_url: 'https://developers.mtn.com',
  official_website: 'https://mtn.com',
  pricing_model: 'Revenue share model - 1.5% transaction fee',
  auth_method: 'OAuth 2.0',
  sandbox_url: 'https://sandbox.mtn.com',
  status: 'active' as const,
  api_version: 'v3.2',
  rate_limit: '1000 requests per minute',
  webhook_support: true,
  support_email: 'support@mtn.com',
  support_url: 'https://support.mtn.com',
  last_verified: '2026-07-01',
  last_updated: '2026-07-12',
  verification_status: 'verified' as const,
};

// Breadcrumb component
function Breadcrumb() {
  return (
    <nav className="mb-6 flex items-center gap-2 text-sm text-charcoal/70" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-charcoal">
        Home
      </Link>
      <span className="text-charcoal/40">/</span>
      <Link href="/apis" className="hover:text-charcoal">
        APIs
      </Link>
      <span className="text-charcoal/40">/</span>
      <span className="text-charcoal">{mockApi.name}</span>
    </nav>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${mockApi.name} - Afrilayer`,
    description: mockApi.short_summary,
    openGraph: {
      title: `${mockApi.name} - Afrilayer`,
      description: mockApi.short_summary,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/apis/${mockApi.slug}`,
      type: 'website',
    },
  };
}

export default async function ApiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params; // Await params to satisfy Next.js 15 type requirements
  // In production, fetch from Supabase
  const api = mockApi;

  if (!api) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Hero Section */}
      <div className="border-b border-sand-100 pb-8">
        <h1 className="text-3xl font-semibold text-charcoal">
          {api.name}
        </h1>
        <div className="mt-4 flex items-center gap-4">
          <Link
            href={`/providers/${api.provider.slug}`}
            className="text-lg text-charcoal/70 hover:text-charcoal"
          >
            {api.provider.name}
          </Link>
          <ConfidenceIndicator
            lastVerified={api.last_verified}
            verificationStatus={api.verification_status}
            providerClaimed={false}
          />
        </div>
        <p className="mt-4 text-lg text-charcoal/80">
          {api.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {api.categories.map((category) => (
            <Badge key={category.slug} variant="default">
              <Link href={`/categories/${category.slug}`}>{category.name}</Link>
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - API Details */}
        <div className="lg:col-span-2">
          {/* Overview */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-charcoal">
              Overview
            </h2>
            <p className="mt-2 text-charcoal/80">
              {api.description}
            </p>
          </section>

          {/* Pricing */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-charcoal">
              Pricing
            </h2>
            <p className="mt-2 text-charcoal/80">
              {api.pricing_model}
            </p>
          </section>

          {/* Authentication */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-charcoal">
              Authentication
            </h2>
            <p className="mt-2 text-charcoal/80">
              {api.auth_method}
            </p>
          </section>

          {/* Rate Limits */}
          {api.rate_limit && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-charcoal">
                Rate Limits
              </h2>
              <p className="mt-2 text-charcoal/80">
                {api.rate_limit}
              </p>
            </section>
          )}

          {/* Webhooks */}
          {api.webhook_support && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-charcoal">
                Webhooks
              </h2>
              <p className="mt-2 text-charcoal/80">
                Webhooks are supported for real-time notifications.
              </p>
            </section>
          )}
        </div>

        {/* Right Column - Quick Links */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {/* Quick Links */}
          <div className="rounded-xl border border-sand-100 bg-sand-50 p-6">
            <h3 className="font-semibold text-charcoal">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={api.documentation_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-baobab-600 hover:text-baobab-700 transition-colors"
                >
                  <Book className="h-4 w-4" />
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href={api.official_website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-baobab-600 hover:text-baobab-700 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Official Website
                </a>
              </li>
              {api.sandbox_url && (
                <li>
                  <a
                    href={api.sandbox_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-baobab-600 hover:text-baobab-700 transition-colors"
                  >
                    <TestTube className="h-4 w-4" />
                    Sandbox
                  </a>
                </li>
              )}
              {api.support_url && (
                <li>
                  <a
                    href={api.support_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-baobab-600 hover:text-baobab-700 transition-colors"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Support
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* API Info */}
          <div className="mt-6 rounded-xl border border-sand-100 bg-sand-50 p-6">
            <h3 className="font-semibold text-charcoal">
              API Info
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-charcoal/60">Status</dt>
                <dd className="flex items-center gap-1 font-medium">
                  {api.status === 'active' ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-success">Active</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-warning" />
                      <span className="text-warning">Beta</span>
                    </>
                  )}
                </dd>
              </div>
              {api.api_version && (
                <div className="flex justify-between">
                  <dt className="text-charcoal/60">Version</dt>
                  <dd className="text-charcoal">
                    {api.api_version}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-charcoal/60">Last Updated</dt>
                <dd className="text-charcoal">
                  {api.last_updated}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

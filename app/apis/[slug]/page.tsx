import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge, ConfidenceIndicator } from '@/components/ui';
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
      {/* Hero Section */}
      <div className="border-b border-gray-200 pb-8 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {api.name}
        </h1>
        <div className="mt-4 flex items-center gap-4">
          <Link
            href={`/providers/${api.provider.slug}`}
            className="text-lg text-gray-600 hover:text-gray-900 dark:text-gray-400"
          >
            {api.provider.name}
          </Link>
          <ConfidenceIndicator
            lastVerified={api.last_verified}
            verificationStatus={api.verification_status}
            providerClaimed={false}
          />
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
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
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Overview
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {api.description}
            </p>
          </section>

          {/* Pricing */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Pricing
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {api.pricing_model}
            </p>
          </section>

          {/* Authentication */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Authentication
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {api.auth_method}
            </p>
          </section>

          {/* Rate Limits */}
          {api.rate_limit && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Rate Limits
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {api.rate_limit}
              </p>
            </section>
          )}

          {/* Webhooks */}
          {api.webhook_support && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Webhooks
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Webhooks are supported for real-time notifications.
              </p>
            </section>
          )}
        </div>

        {/* Right Column - Quick Links */}
        <div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={api.documentation_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                  📖 Documentation
                </a>
              </li>
              <li>
                <a
                  href={api.official_website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                  🌐 Official Website
                </a>
              </li>
              {api.sandbox_url && (
                <li>
                  <a
                    href={api.sandbox_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    🧪 Sandbox
                  </a>
                </li>
              )}
              {api.support_url && (
                <li>
                  <a
                    href={api.support_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    💬 Support
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* API Info */}
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              API Info
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="text-gray-900 dark:text-white">
                  {api.status === 'active' ? '✅ Active' : '⚠️ Beta'}
                </dd>
              </div>
              {api.api_version && (
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Version</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {api.api_version}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Last Updated</dt>
                <dd className="text-gray-900 dark:text-white">
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
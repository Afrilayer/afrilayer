import Link from 'next/link';
import { Badge, ConfidenceIndicator } from '@/components/ui';

const providers = [
  {
    id: '1',
    name: 'MTN Group',
    slug: 'mtn-group',
    description: 'Leading telecommunications company with mobile money services across Africa.',
    apiCount: 12,
    verification_status: 'verified' as const,
    last_verified: '2026-06-15',
  },
  {
    id: '2',
    name: 'Paystack',
    slug: 'paystack',
    description: 'Payments infrastructure for businesses in Africa.',
    apiCount: 3,
    verification_status: 'verified' as const,
    last_verified: '2026-07-01',
  },
  {
    id: '3',
    name: 'Dojah',
    slug: 'dojah',
    description: 'KYC and identity verification APIs for Africa.',
    apiCount: 5,
    verification_status: 'verified' as const,
    last_verified: '2026-05-20',
  },
  {
    id: '4',
    name: 'Flutterwave',
    slug: 'flutterwave',
    description: 'Unified payments API for Africa and global markets.',
    apiCount: 8,
    verification_status: 'verified' as const,
    last_verified: '2026-07-10',
  },
];

export default function ProvidersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        API Providers
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Explore companies building APIs for the African market.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {providers.map((provider) => (
          <Link
            key={provider.id}
            href={`/providers/${provider.slug}`}
            className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {provider.name}
              </h2>
              <Badge variant="success" className="text-xs">
                {provider.apiCount} APIs
              </Badge>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {provider.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
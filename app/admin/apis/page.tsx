import Link from 'next/link';
import { Badge } from '@/components/ui';
import type { ListingStatus } from '@/lib/types';

const apis = [
  {
    id: '1',
    name: 'MTN Mobile Money API',
    slug: 'mtn-momo',
    provider: 'MTN Group',
    listing_status: 'published' as ListingStatus,
    last_updated: '2026-07-12',
  },
  {
    id: '2',
    name: 'Paystack Payment API',
    slug: 'paystack',
    provider: 'Paystack',
    listing_status: 'published' as ListingStatus,
    last_updated: '2026-07-10',
  },
  {
    id: '3',
    name: 'Dojah KYC API',
    slug: 'dojah',
    provider: 'Dojah',
    listing_status: 'draft' as ListingStatus,
    last_updated: '2026-07-08',
  },
];

export default function AdminApisPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-charcoal">
          API Listings
        </h1>
        <Link
          href="/admin/apis/new"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-baobab-600 px-4 text-sm font-medium text-white hover:bg-baobab-700 shadow-subtle transition-all"
        >
          Add API
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm font-medium text-charcoal/60">
              <th className="pb-2">Name</th>
              <th className="pb-2">Provider</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Last Updated</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apis.map((api) => (
              <tr
                key={api.id}
                className="rounded-lg bg-white"
              >
                <td className="px-4 py-3 font-medium text-charcoal">
                  {api.name}
                </td>
                <td className="px-4 py-3 text-charcoal/70">
                  {api.provider}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      api.listing_status === 'published'
                        ? 'success'
                        : api.listing_status === 'draft'
                        ? 'default'
                        : 'warning'
                    }
                  >
                    {api.listing_status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-charcoal/70">
                  {api.last_updated}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/apis/${api.id}/edit`}
                    className="text-sm text-baobab-600 hover:text-baobab-700"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

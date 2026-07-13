import Link from 'next/link';
import { Phone, CreditCard, Globe, MessageSquare, Banknote, Fingerprint, Truck, Building, Bitcoin, Map, Bot } from 'lucide-react';

const categories = [
  { id: '1', name: 'Mobile Money', slug: 'mobile-money', icon: Phone, count: 24 },
  { id: '2', name: 'Payments', slug: 'payments', icon: CreditCard, count: 32 },
  { id: '3', name: 'KYC', slug: 'kyc', icon: Fingerprint, count: 18 },
  { id: '4', name: 'Identity', slug: 'identity', icon: Globe, count: 22 },
  { id: '5', name: 'SMS', slug: 'sms', icon: MessageSquare, count: 15 },
  { id: '6', name: 'Airtime', slug: 'airtime', icon: Banknote, count: 9 },
  { id: '7', name: 'Banking', slug: 'banking', icon: Banknote, count: 12 },
  { id: '8', name: 'Logistics', slug: 'logistics', icon: Truck, count: 8 },
  { id: '9', name: 'Government', slug: 'government', icon: Building, count: 6 },
  { id: '10', name: 'Crypto', slug: 'crypto', icon: Bitcoin, count: 5 },
  { id: '11', name: 'Maps', slug: 'maps', icon: Map, count: 4 },
  { id: '12', name: 'AI', slug: 'ai', icon: Bot, count: 7 },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Browse APIs by Category
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Discover African APIs organized by their primary use case.
      </p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
              <category.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.count} APIs
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
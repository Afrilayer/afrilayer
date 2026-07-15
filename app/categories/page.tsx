import Link from 'next/link';
import { Phone, CreditCard, Globe, MessageSquare, Banknote, Fingerprint, Truck, Building, Bitcoin, Map, Bot } from 'lucide-react';
import { getAllApis } from '@/lib/data';

const categoryIcons: Record<string, typeof CreditCard> = {
  'Mobile Money': Phone,
  'Payments': CreditCard,
  'KYC': Fingerprint,
  'Identity': Globe,
  'SMS': MessageSquare,
  'Airtime': Banknote,
  'Banking': Banknote,
  'Logistics': Truck,
  'Government': Building,
  'Crypto': Bitcoin,
  'Maps': Map,
  'AI': Bot,
};

export default async function CategoriesPage() {
  const apis = await getAllApis();
  
  // Calculate real counts for each category
  const categoriesWithCounts = [
    { slug: 'mobile-money', name: 'Mobile Money' },
    { slug: 'payments', name: 'Payments' },
    { slug: 'kyc', name: 'KYC' },
    { slug: 'identity', name: 'Identity' },
    { slug: 'sms', name: 'SMS' },
    { slug: 'airtime', name: 'Airtime' },
    { slug: 'banking', name: 'Banking' },
    { slug: 'logistics', name: 'Logistics' },
    { slug: 'government', name: 'Government' },
    { slug: 'crypto', name: 'Crypto' },
    { slug: 'maps', name: 'Maps' },
    { slug: 'ai', name: 'AI' },
  ].map((cat) => ({
    ...cat,
    count: apis.filter((api) => api.category === cat.name).length,
    icon: categoryIcons[cat.name] || CreditCard,
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-text">
        API categories
      </h1>
      <p className="mt-2 text-muted max-w-2xl">
        Compare infrastructure by type. Payments, KYC, SMS, and telecom APIs verified for production use.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
        {categoriesWithCounts.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="flex items-center gap-4 rounded-lg border border-border bg-surface p-6 transition-all hover-lift"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-copper/10">
              <category.icon className="h-6 w-6 text-copper" />
            </div>
            <div>
              <h2 className="font-semibold text-text">
                {category.name}
              </h2>
              <p className="text-sm text-muted">
                {category.count} verified APIs
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
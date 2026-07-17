import Link from 'next/link';
import { CreditCard, Phone, MessageSquare, Banknote, Fingerprint, Truck, Building, Bitcoin, Map, Bot, AtSign, Radio } from 'lucide-react';
import { getAllProvidersData } from '@/lib/data';
import { CATEGORY_TO_SLUG } from '@/lib/constants';

const categoryIcons: Record<string, typeof CreditCard> = {
  'Mobile Money': Phone,
  'Payments': CreditCard,
  'KYC': Fingerprint,
  'Identity': AtSign,
  'SMS': MessageSquare,
  'Airtime': Banknote,
  'Banking': Banknote,
  'Logistics': Truck,
  'Government': Building,
  'Crypto': Bitcoin,
  'Maps': Map,
  'AI': Bot,
  'Messaging': MessageSquare,
  'Telecom': Radio,
  'Geolocation': Map,
  'Financial Infrastructure': Banknote,
  'Insurance': Banknote,
  'Agriculture': Map,
  'Mobility': Truck,
  'Health': Banknote,
  'Developer Tools': Bot,
  'Open Banking': Banknote,
  'Voice': Phone,
  'USSD': Phone,
};

// Generate category list dynamically from CATEGORY_TO_SLUG
const ALL_CATEGORIES = Object.entries(CATEGORY_TO_SLUG).map(([name, slug]) => ({ name, slug }));

export default async function CategoriesPage() {
  const providers = await getAllProvidersData();
  
  // Calculate real counts for each category (only those with providers)
  const categoriesWithCounts = ALL_CATEGORIES.map((cat) => ({
    ...cat,
    count: providers.filter((p) => p.categories.includes(cat.name)).length,
    icon: categoryIcons[cat.name] || CreditCard,
  })).filter(cat => cat.count > 0); // Only show categories with providers

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
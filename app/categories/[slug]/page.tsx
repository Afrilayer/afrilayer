export const dynamic = 'force-static';
export const revalidate = 3600;

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllProvidersData } from '@/lib/data';
import { ApiCard, EmptyState } from '@/components/ui';
import { SLUG_TO_CATEGORY, CATEGORY_TO_SLUG } from '@/lib/constants';
import { providerToApiMock } from '@/lib/providers/similarity';
import type { Metadata } from 'next';

// Generate static params for all categories with providers
export async function generateStaticParams() {
  const providers = await getAllProvidersData();
  const categoryNames = [...new Set(providers.flatMap(p => p.categories))];
  const slugs = categoryNames.map(name => 
    CATEGORY_TO_SLUG[name] || name.toLowerCase().replace(/\s+/g, '-')
  );
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = SLUG_TO_CATEGORY[slug.toLowerCase()];
  
  if (!categoryName) {
    return { title: 'Category Not Found' };
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    title: `${categoryName} APIs`,
    description: `Discover verified ${categoryName} APIs operating in African markets.`,
    alternates: {
      canonical: `${baseUrl}/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const providers = await getAllProvidersData();
  
  // Get category name from slug
  const categoryName = SLUG_TO_CATEGORY[slug.toLowerCase()];
  
  if (!categoryName) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <EmptyState
          icon="folder"
          title="Category not found"
          description="The requested category does not exist."
        />
      </div>
    );
  }

  // Filter providers by category
  const categoryProviders = providers.filter(p => p.categories.includes(categoryName));

  if (categoryProviders.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <EmptyState
          icon="folder"
          title="No providers found"
          description={`No providers have been added for this category yet.`}
          action={{
            label: 'Contribute',
            href: '/contribute',
          }}
        />
      </div>
    );
  }

  // Convert to ApiMock format for cards
  const apis = categoryProviders.map(providerToApiMock);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      {/* Back Link */}
      <Link
        href="/categories"
        className="inline-flex items-center gap-1.5 text-xs font-mono mb-8 text-muted-dim hover:text-text transition-colors"
      >
        <ArrowLeft size={13} /> back to categories
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-text">{categoryName}</h1>
          <p className="text-sm text-muted mt-1 font-mono">
            {categoryProviders.length} Provider{categoryProviders.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* APIs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">
        {apis.map((api) => (
          <Link
            key={api.id}
            href={`/apis/${api.id}`}
            className="block"
          >
            <ApiCard api={api} showCountryLinks={true} showCategoryLink={false} />
          </Link>
        ))}
      </div>
    </div>
  );
}
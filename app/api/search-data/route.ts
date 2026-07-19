import { NextResponse } from 'next/server';
import { getAllProvidersData } from '@/lib/data';

// Provide registry index for search page client-side fetch
export async function GET() {
  const providers = await getAllProvidersData();
  
  // Convert to search-friendly format
  const searchData = providers.map(p => ({
    slug: p.slug,
    name: p.name,
    categories: p.categories,
    countries: p.countries,
    features: p.features,
    description: p.description,
    status: p.status,
    lastVerified: p.lastVerified,
  }));
  
  return NextResponse.json({ providers: searchData });
}

export const dynamic = 'force-static';
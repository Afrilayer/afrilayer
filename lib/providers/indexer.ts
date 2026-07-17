// Build-time registry generator
// Generates public/generated/registry.json for fast lookups

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllProviders } from './loader';

const __filename = fileURLToPath(import.meta.url);
const baseDir = path.resolve(path.dirname(__filename), '../..');

export interface Registry {
  generatedAt: string;
  counts: {
    providers: number;
    countries: number;
    categories: number;
    apis: number;
  };
  countries: string[];
  categories: { slug: string; name: string; count: number }[];
  index: {
    slug: string;
    name: string;
    status: string;
    categories: string[];
    countries: string[];
    lastVerified: string;
    features: string[];
    description: string;
    logoUrl?: string;
    verification?: {
      verified: boolean;
      level: string;
    };
  }[];
}

// Generate registry JSON for build-time
export async function generateRegistry(): Promise<void> {
  const providers = await getAllProviders();
  
  // Count unique countries and categories from providers
  const uniqueCountries = [...new Set(providers.flatMap(p => p.countries))];
  const categoryCounts: Record<string, number> = {};
  
  for (const provider of providers) {
    for (const category of provider.categories) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  }

  const registry: Registry = {
    generatedAt: new Date().toISOString(),
    counts: {
      providers: providers.length,
      countries: uniqueCountries.length,
      categories: Object.keys(categoryCounts).length,
      apis: providers.length,
    },
    countries: uniqueCountries,
    categories: Object.entries(categoryCounts).map(([name, count]) => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count,
    })),
    index: providers.map(p => ({
      slug: p.slug,
      name: p.name,
      status: p.status,
      categories: p.categories,
      countries: p.countries,
      lastVerified: p.lastVerified,
      features: p.features,
      description: p.description,
      logoUrl: p.logoUrl,
      verification: p.verification,
    })),
  };

  // Write to public/generated
  const outputDir = path.join(baseDir, 'public', 'generated');
  const outputPath = path.join(outputDir, 'registry.json');
  
  // Ensure directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  // Write registry
  await fs.writeFile(outputPath, JSON.stringify(registry, null, 2), 'utf-8');

  console.log(`[Afrilayer] Generated registry.json with ${providers.length} providers`);
}
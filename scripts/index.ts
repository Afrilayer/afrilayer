// Registry generator script
// Runs generateRegistry and outputs statistics + data-quality report

import { generateRegistry } from '../lib/providers/indexer';
import { getAllProviders } from '../lib/providers/loader';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '..');

interface RegistryStats {
  timestamp: string;
  counts: {
    providers: number;
    countries: number;
    categories: number;
    screenshots: number;
    sdks: number;
    verifiedProviders: number;
  };
  countries: string[];
  categories: { slug: string; name: string; count: number }[];
  screenshots: { provider: string; count: number }[];
}

async function countScreenshots() {
  const providers = await getAllProviders();
  const screenshots: { provider: string; count: number }[] = [];
  
  for (const p of providers) {
    const imgsDir = path.join(baseDir, 'providers', p.slug, 'imgs');
    try {
      const files = await fs.readdir(imgsDir);
      screenshots.push({ provider: p.slug, count: files.length });
    } catch {
      screenshots.push({ provider: p.slug, count: 0 });
    }
  }
  
  return screenshots;
}

async function main() {
  // Generate registry
  await generateRegistry();
  
  const providers = await getAllProviders();
  
  // Count SDKs
  const sdks = providers.flatMap(p => p.sdkLanguages);
  const uniqueSdks = [...new Set(sdks)];
  
  const stats: RegistryStats = {
    timestamp: new Date().toISOString(),
    counts: {
      providers: providers.length,
      countries: [...new Set(providers.flatMap(p => p.countries))].length,
      categories: [...new Set(providers.flatMap(p => p.categories))].length,
      screenshots: (await countScreenshots()).reduce((sum, s) => sum + s.count, 0),
      sdks: uniqueSdks.length,
      verifiedProviders: providers.filter(p => p.verified).length,
    },
    countries: [...new Set(providers.flatMap(p => p.countries))],
    categories: Object.entries(
      providers.reduce((acc: Record<string, number>, p) => {
        p.categories.forEach((c: string) => { acc[c] = (acc[c] || 0) + 1; });
        return acc;
      }, {})
    ).map(([name, count]) => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count,
    })),
    screenshots: await countScreenshots(),
  };

  console.log('\n[Afrilayer Registry Statistics]');
  console.log(`Providers: ${stats.counts.providers}`);
  console.log(`Countries: ${stats.counts.countries}`);
  console.log(`Categories: ${stats.counts.categories}`);
  console.log(`Screenshots: ${stats.counts.screenshots}`);
  console.log(`SDK Languages: ${stats.counts.sdks}`);
  console.log(`Verified Providers: ${stats.counts.verifiedProviders}`);
  
  // Write stats
  const outputDir = path.join(baseDir, 'public', 'generated');
  await fs.writeFile(path.join(outputDir, 'stats.json'), JSON.stringify(stats, null, 2), 'utf-8');
  console.log('\nWrote stats.json');
}

main().catch(console.error);
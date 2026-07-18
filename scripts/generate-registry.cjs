const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

async function main() {
  const fs = require('fs');
  const providersDir = path.join(projectRoot, 'providers');
  const verificationPath = path.join(projectRoot, 'providers', 'verification', 'verify.txt');

  const slugs = fs.readdirSync(providersDir).filter(f => fs.existsSync(path.join(providersDir, f, 'provider.json')) && f !== 'template' && f !== 'verification');
  const providers = [];
  for (const slug of slugs) {
    const providerPath = path.join(providersDir, slug, 'provider.json');
    const content = fs.readFileSync(providerPath, 'utf-8').replace(/^\uFEFF/, '');
    const raw = JSON.parse(content);
    providers.push({
      slug: raw.slug,
      name: raw.name,
      status: raw.status,
      categories: raw.categories,
      countries: raw.countries,
      lastVerified: raw.lastVerified,
      features: raw.features,
      description: raw.description,
      logoUrl: raw.logoUrl || undefined,
    });
  }

  const verificationMap = new Map();
  if (fs.existsSync(verificationPath)) {
    const content = fs.readFileSync(verificationPath, 'utf-8');
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('Afrilayer')) continue;
      const match = trimmed.match(/^([a-z0-9][a-z0-9-]*)\s*:\s*(cv|pv)$/i);
      if (match) {
        const code = match[2].toLowerCase();
        if (code === 'cv') verificationMap.set(match[1].toLowerCase(), 'community');
        if (code === 'pv') verificationMap.set(match[1].toLowerCase(), 'provider');
      }
    }
  }

  const index = providers.map(p => {
    const level = verificationMap.get(p.slug.toLowerCase());
    return {
      slug: p.slug,
      name: p.name,
      status: p.status,
      categories: p.categories,
      countries: p.countries,
      lastVerified: p.lastVerified,
      features: p.features,
      description: p.description,
      logoUrl: p.logoUrl,
      verification: level ? { verified: true, level } : undefined,
    };
  });

  const uniqueCountries = [...new Set(providers.flatMap(p => p.countries))];
  const categoryCounts = {};
  for (const p of providers) {
    for (const c of p.categories) {
      categoryCounts[c] = (categoryCounts[c] || 0) + 1;
    }
  }

  const registry = {
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
    index,
  };

  const outputDir = path.join(projectRoot, 'public', 'generated');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'registry.json'), JSON.stringify(registry, null, 2));
  console.log('Generated registry.json with ' + providers.length + ' providers');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
// Script to generate README.md files for providers missing them
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const baseDir = path.resolve(path.dirname(__filename), '../providers');

const providersWithoutReadme = [
  'arkesel',
  'chatdesk',
  'chenosis',
  'credable',
  'dpo-group',
  'eversend',
  'fido',
  'fincra',
  'flex-finance',
  'kora',
  'kwik',
  'maplerad',
  'mnotify',
  'nigeria-gov',
  'nimbasms',
  'onafriq',
  'opay',
  'ozow',
  'pawapay',
  'peach-payments',
  'pula',
  'safaricom',
  'tambua-health',
  'termii',
  'traction',
  'twiga',
  'vodafone-cash',
  'youverify',
  'zenzera'
];

async function generateReadmes() {
  for (const slug of providersWithoutReadme) {
    try {
      // Read provider.json
      const providerPath = path.join(baseDir, slug, 'provider.json');
      const content = await fs.readFile(providerPath, 'utf-8');
      const provider = JSON.parse(content);
      
      // Generate README content
      const readme = `# ${provider.name || slug} API

${provider.tagline || ''}

## Overview

${provider.description || ''}

## Products

List the main API products/services this provider offers.

## Authentication

Describe authentication method(s) used (${provider.authentication || 'API Key'}).

## Sandbox

Sandbox environment is ${provider.sandboxAvailable ? 'available' : 'not available'}.

## Coverage

Available in: ${provider.countries?.join(', ') || 'Multiple countries'}.

## Links

- Website: ${provider.website || ''}
- Documentation: ${provider.documentation || ''}
- Developer Portal: ${provider.developerPortal || ''}`;
      
      // Write README.md
      const readmePath = path.join(baseDir, slug, 'README.md');
      await fs.writeFile(readmePath, readme, 'utf-8');
      console.log(`Generated README.md for ${slug}`);
    } catch (error) {
      console.error(`Error generating README for ${slug}:`, error.message);
    }
  }
}

generateReadmes();
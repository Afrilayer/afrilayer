// Provider validation script - runs AJV validation against all providers
// Emits JSON report with errors and data-quality metrics

import { promises as fs } from 'fs';
import path from 'path';
import Ajv from 'ajv';
import { fileURLToPath } from 'url';

// Resolve paths correctly regardless of working directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '..');

const providersDir = path.join(baseDir, 'providers');
const schemaPath = path.join(baseDir, 'validation', 'provider.schema.json');

interface ValidationResult {
  slug: string;
  valid: boolean;
  errors: string[];
  hasReadme: boolean;
  hasLogo: boolean;
  validUrls: string[];
  brokenUrls: string[];
}

interface ValidationReport {
  timestamp: string;
  providersChecked: number;
  validProviders: number;
  errors: ValidationResult[];
  summary: {
    missingLogos: string[];
    missingReadmes: string[];
    brokenLinks: string[];
    validationErrors: string[];
  };
}

async function loadJson<T>(filePath: string): Promise<T | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

// Fetch URLs to check for broken links (with timeout)
async function checkBrokenLinks(urls: string[]): Promise<string[]> {
  const broken: string[] = [];
  for (const url of urls) {
    if (!url.startsWith('http')) continue;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(url, { 
        method: 'HEAD',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) broken.push(url);
    } catch {
      broken.push(url);
    }
  }
  return broken;
}

async function validateProviders(): Promise<ValidationReport> {
  const schema = await loadJson<any>(schemaPath);
  // Remove $id to avoid AJV ID resolution issues
  const { $id, ...schemaWithoutId } = schema || {};
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schemaWithoutId);

  const entries = await fs.readdir(providersDir, { withFileTypes: true });
  const providerDirs = entries.filter(e => e.isDirectory() && e.name !== 'template');

  const results: ValidationResult[] = [];
  const allBrokenLinks: string[] = [];
  const allMissingLogos: string[] = [];
  const allMissingReadmes: string[] = [];

  for (const dir of providerDirs) {
    const slug = dir.name;
    const providerPath = path.join(providersDir, slug);
    const providerJson = await loadJson<any>(path.join(providerPath, 'provider.json'));

    const urlsToCheck: string[] = [];
    const errors: string[] = [];

    if (!providerJson) {
      errors.push('provider.json missing');
      results.push({ slug, valid: false, errors, hasReadme: false, hasLogo: false, validUrls: [], brokenUrls: [] });
      continue;
    }

    // Validate against schema
    const valid = validate(providerJson);
    if (!valid && validate.errors) {
      errors.push(...validate.errors.map((e: any) => `${e.instancePath} ${e.message}`));
    }

    // Check URLs
    ['website', 'documentation', 'developerPortal'].forEach(field => {
      if (providerJson[field]) urlsToCheck.push(providerJson[field]);
    });

    // Check README
    try {
      await fs.access(path.join(providerPath, 'README.md'));
    } catch {
      allMissingReadmes.push(slug);
    }

    // Check logo
    try {
      await fs.access(path.join(providerPath, 'logo.svg'));
    } catch {
      try {
        await fs.access(path.join(providerPath, 'logo.png'));
      } catch {
        allMissingLogos.push(slug);
      }
    }

    // Broken links check (non-blocking)
    const brokenUrls = await checkBrokenLinks(urlsToCheck);
    allBrokenLinks.push(...brokenUrls);

    results.push({
      slug,
      valid,
      errors,
      hasReadme: !allMissingReadmes.includes(slug),
      hasLogo: !allMissingLogos.includes(slug),
      validUrls: [...urlsToCheck],
      brokenUrls,
    });
  }

  const report: ValidationReport = {
    timestamp: new Date().toISOString(),
    providersChecked: providerDirs.length,
    validProviders: results.filter(r => r.valid).length,
    errors: results,
    summary: {
      missingLogos: allMissingLogos,
      missingReadmes: allMissingReadmes,
      brokenLinks: [...new Set(allBrokenLinks)],
      validationErrors: [...new Set(results.flatMap(r => r.errors))],
    },
  };

  return report;
}

// Write report
async function main() {
  const report = await validateProviders();
  const outputPath = path.join(baseDir, 'public', 'generated', 'validation-report.json');
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(report, null, 2), 'utf-8');
  
  console.log(`[Validation] Checked ${report.providersChecked} providers`);
  console.log(`[Validation] Valid: ${report.validProviders}/${report.providersChecked}`);
  console.log(`[Validation] Missing logos: ${report.summary.missingLogos.length}`);
  console.log(`[Validation] Missing READMEs: ${report.summary.missingReadmes.length}`);
  console.log(`[Validation] Broken links: ${report.summary.brokenLinks.length}`);
}

main().catch(console.error);
/**
 * Nigeria Logos Source
 * Resolves logos from https://github.com/PaystackHQ/nigerialogos
 * Uses raw GitHub CDN for SVG assets
 */

import type { ProviderForLogo } from '../types';

// Base URL for Nigeria Logos repository
const NIGERIA_LOGOS_BASE = 'https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos';

// Common name/slug aliases for intelligent matching
// The repository uses lowercase names, often with variations
const SLUG_ALIASES: Record<string, string> = {
  // Payments
  paystack: 'paystack',
  flutterwave: 'flutterwave',
  moniepoint: 'moniepoint',
  kuda: 'kuda',
  opay: 'opay',
  'gtbank': 'gtbank',
  'guaranty-trust-bank': 'gtbank',
  palmpay: 'palmpay',
  'carbon-account': 'carbon',
  
  // Mobile Money / Telecom
  safaricom: 'safaricom',
  mtn: 'mtn',
  'mtn-momo': 'mtn',
  
  // Infrastructure
  dojah: 'dojah',
  prembly: 'prembly',
  smile: 'smileidentity',
  'smile-identity': 'smileidentity',
  africas: 'africastalking',
  'africas-talking': 'africastalking',
  hubtel: 'hubtel',
  nalo: 'nalosms',
  'nalo-sms': 'nalosms',
};

/**
 * Slugify provider name to match Nigeria Logos naming convention
 */
function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric
    .replace(/s$/, ''); // Remove trailing 's' for plural forms
}

/**
 * Get the Nigeria Logos slug for a provider using name, slug, and aliases
 */
function getNigeriaLogosSlug(provider: ProviderForLogo): string | null {
  // Priority: explicit alias mapping
  if (SLUG_ALIASES[provider.slug]) {
    return SLUG_ALIASES[provider.slug];
  }
  
  // Try slug directly (slugified)
  const slugified = slugifyName(provider.slug);
  if (slugified) return slugified;
  
  // Try provider name
  if (provider.name) {
    const nameSlug = slugifyName(provider.name);
    if (nameSlug) return nameSlug;
  }
  
  return null;
}

/**
 * Check if a logo exists in Nigeria Logos repository
 * Uses HEAD request to verify without downloading
 */
async function checkNigeriaLogosExists(slug: string): Promise<boolean> {
  try {
    const response = await fetch(`${NIGERIA_LOGOS_BASE}/${slug}.svg`, {
      method: 'HEAD',
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Resolve logo from Nigeria Logos
 */
export async function resolveNigeriaLogos(provider: ProviderForLogo): Promise<string | null> {
  const slug = getNigeriaLogosSlug(provider);
  if (!slug) return null;
  
  const logoUrl = `${NIGERIA_LOGOS_BASE}/${slug}.svg`;
  
  // Check if logo exists
  const exists = await checkNigeriaLogosExists(slug);
  if (exists) {
    return logoUrl;
  }
  
  return null;
}
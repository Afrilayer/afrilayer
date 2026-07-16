/**
 * Clearbit Logo Source
 * Resolves logos from https://logo.clearbit.com/{domain}
 * Uses provider website to extract domain automatically
 */

import type { ProviderForLogo } from '../types';

/**
 * Extract domain from a website URL
 */
function extractDomain(website: string): string | null {
  try {
    const url = new URL(website);
    return url.hostname.replace('www.', '');
  } catch {
    // If URL parsing fails, try to extract domain manually
    const match = website.match(/^https?:\/\/(?:www\.)?([^/]+)/);
    return match ? match[1] : null;
  }
}

/**
 * Check if a Clearbit logo exists
 */
async function checkClearbitLogoExists(domain: string): Promise<boolean> {
  try {
    const response = await fetch(`https://logo.clearbit.com/${domain}`, {
      method: 'HEAD',
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Resolve logo from Clearbit
 */
export async function resolveClearbitLogo(provider: ProviderForLogo): Promise<string | null> {
  if (!provider.website) return null;
  
  const domain = extractDomain(provider.website);
  if (!domain) return null;
  
  // Check if logo exists
  const exists = await checkClearbitLogoExists(domain);
  if (exists) {
    return `https://logo.clearbit.com/${domain}`;
  }
  
  return null;
}
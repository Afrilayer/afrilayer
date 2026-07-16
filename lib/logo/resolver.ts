/**
 * Provider Logo Resolver
 * Orchestrates logo resolution with priority: local → nigerialogos → clearbit → placeholder
 */

import type { ProviderForLogo, LogoSource } from './types';
import { getCachedLogo, getFailedLogo, cacheLogo, cacheFailure, getOrCreatePending } from './cache';
import { resolveLocalLogo } from './sources/local';
import { resolveNigeriaLogos } from './sources/nigerialogos';
import { resolveClearbitLogo } from './sources/clearbit';
import { resolvePlaceholder } from './sources/placeholder';

// Type for logo source resolvers
type SourceResolver = (provider: ProviderForLogo) => Promise<string | null>;

// Registry of logo sources in priority order
// New sources can be added here without touching UI components
const LOGO_SOURCES: { name: LogoSource; resolver: SourceResolver }[] = [
  { name: 'local', resolver: resolveLocalLogo },
  { name: 'nigerialogos', resolver: resolveNigeriaLogos },
  { name: 'clearbit', resolver: resolveClearbitLogo },
];

/**
 * Internal resolver that tries each source in order
 */
async function _resolveProviderLogo(provider: ProviderForLogo): Promise<string> {
  // Check cache first
  const cached = getCachedLogo(provider.slug);
  if (cached) {
    return cached;
  }

  // Check if we previously failed - return placeholder immediately
  if (getFailedLogo(provider.slug)) {
    return resolvePlaceholder(provider);
  }

  // Try each source in priority order
  for (const source of LOGO_SOURCES) {
    try {
      const url = await source.resolver(provider);
      if (url) {
        // Cache the result (but not placeholder, which is always generated)
        if (source.name !== 'placeholder') {
          cacheLogo(provider.slug, url, source.name);
        }
        return url;
      }
    } catch {
      // Source failed, continue to next
    }
  }

  // Cache the failure (we'll return placeholder)
  cacheFailure(provider.slug);
  return resolvePlaceholder(provider);
}

/**
 * Resolve provider logo URL with caching and fallback
 *
 * Priority:
 * 1. Local logo (providers/{slug}/logo.svg or logo.png)
 * 2. Nigeria Logos repository
 * 3. Clearbit API
 * 4. Generated placeholder (always succeeds)
 *
 * @param provider - Provider object with slug, name, website
 * @returns Logo URL string (never returns broken image)
 */
export async function resolveProviderLogo(provider: ProviderForLogo): Promise<string> {
  // Handle already-resolved URLs (from registry or explicit logoUrl)
  if (provider.logoUrl) {
    return provider.logoUrl;
  }

  const result = await getOrCreatePending(provider.slug, () => _resolveProviderLogo(provider));
  // _resolveProviderLogo always returns a string (placeholder at minimum)
  return result ?? resolvePlaceholder(provider);
}

/**
 * Sync version for backwards compatibility
 * Returns the placeholder if no cache hit (doesn't trigger network requests)
 */
export function getProviderLogoSync(provider: ProviderForLogo): string | null {
  const cached = getCachedLogo(provider.slug);
  if (cached) return cached;

  // Return null to indicate we need async resolution
  if (!getFailedLogo(provider.slug)) {
    return null;
  }

  return resolvePlaceholder(provider);
}

// Export cache utilities for testing
export { getCachedLogo, cacheLogo, cacheFailure, clearCache } from './cache';
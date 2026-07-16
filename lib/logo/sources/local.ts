/**
 * Local Logo Source
 * Resolves logos from the /api/logos/{slug} API route
 * The API route handles file existence checks on the server
 * This simply returns the URL - the onError handler in ProviderLogo catches 404s
 */

import type { ProviderForLogo } from '../types';

/**
 * Resolve local logo URL
 * Returns the API route URL - the route handles existence check
 * The ProviderLogo component will fall back on error
 */
export async function resolveLocalLogo(provider: ProviderForLogo): Promise<string | null> {
  if (!provider.slug) return null;
  
  // Return the API route URL
  // The API route will return 404 if no logo exists, and ProviderLogo handles the fallback
  return `/api/logos/${provider.slug}`;
}

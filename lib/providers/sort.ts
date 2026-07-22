// Provider sorting utilities
// Canonical sort: Provider Verified (pv) → Community Verified (cv) → Unverified, then alphabetical

import type { Provider } from '../types';

// Numeric tier for sorting: 0 = pv (highest), 1 = cv, 2 = unverified (lowest)
export function getVerificationTier(provider: Provider): number {
  if (provider.verification?.verified && provider.verification.level === 'provider') return 0;
  if (provider.verification?.verified && provider.verification.level === 'community') return 1;
  return 2;
}

// Sort providers by verification tier (pv → cv → unverified), then alphabetically by name
export function sortByVerificationTier(providers: Provider[]): Provider[] {
  return [...providers].sort((a, b) => {
    const tierA = getVerificationTier(a);
    const tierB = getVerificationTier(b);
    if (tierA !== tierB) return tierA - tierB;
    return a.name.localeCompare(b.name);
  });
}

// Get human-readable label for verification tier
export function getVerificationTierLabel(provider: Provider): string {
  if (provider.verification?.verified && provider.verification.level === 'provider') return 'Provider Verified';
  if (provider.verification?.verified && provider.verification.level === 'community') return 'Community Verified';
  return 'Unverified';
}

// Group providers by verification tier
export function groupByVerificationTier(providers: Provider[]): {
  providerVerified: Provider[];
  communityVerified: Provider[];
  unverified: Provider[];
} {
  return {
    providerVerified: providers.filter(p => getVerificationTier(p) === 0),
    communityVerified: providers.filter(p => getVerificationTier(p) === 1),
    unverified: providers.filter(p => getVerificationTier(p) === 2),
  };
}
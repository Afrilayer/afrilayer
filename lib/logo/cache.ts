/**
 * Logo Cache
 * In-memory cache for resolved and failed logo lookups
 * Prevents duplicate network requests and provides TTL-based expiration
 */

import type { CacheEntry, FailedLookup } from "./types";

// Cache TTLs in milliseconds
const SUCCESS_TTL = 3600000; // 1 hour
const FAILURE_TTL = 300000; // 5 minutes

// In-memory caches
const successCache = new Map<string, CacheEntry>();
const failureCache = new Map<string, FailedLookup>();

// Pending promises for dedup
const pendingRequests = new Map<string, Promise<string | null>>();

/**
 * Get cached logo URL if valid
 */
export function getCachedLogo(slug: string): string | null {
  const entry = successCache.get(slug);
  if (!entry) return null;
  
  if (Date.now() > entry.expiresAt) {
    successCache.delete(slug);
    return null;
  }
  
  return entry.url;
}

/**
 * Check if a failed lookup is cached and not expired
 */
export function getFailedLogo(slug: string): boolean {
  const entry = failureCache.get(slug);
  if (!entry) return false;
  
  if (Date.now() > entry.retryAfter) {
    failureCache.delete(slug);
    return false;
  }
  
  return true;
}

/**
 * Cache a successful logo resolution
 */
export function cacheLogo(slug: string, url: string, source: "local" | "nigerialogos" | "clearbit"): void {
  successCache.set(slug, {
    url,
    source,
    expiresAt: Date.now() + SUCCESS_TTL,
  });
}

/**
 * Cache a failed logo lookup
 */
export function cacheFailure(slug: string): void {
  failureCache.set(slug, {
    timestamp: Date.now(),
    retryAfter: Date.now() + FAILURE_TTL,
  });
}

/**
 * Get or create pending request for dedup
 */
export function getOrCreatePending(
  slug: string, 
  resolver: () => Promise<string | null>
): Promise<string | null> {
  if (pendingRequests.has(slug)) {
    return pendingRequests.get(slug)!;
  }
  
  const promise = resolver().finally(() => {
    pendingRequests.delete(slug);
  });
  
  pendingRequests.set(slug, promise);
  return promise;
}

/**
 * Check if request is pending
 */
export function isPending(slug: string): boolean {
  return pendingRequests.has(slug);
}

/**
 * Clear all caches (useful for testing)
 */
export function clearCache(): void {
  successCache.clear();
  failureCache.clear();
  pendingRequests.clear();
}
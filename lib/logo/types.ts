/**
 * Logo Resolver Types
 * Types for the provider logo resolution system
 */

import type { AfriProvider } from "../types";

/**
 * Logo source type
 */
export type LogoSource = "local" | "nigerialogos" | "clearbit" | "placeholder";

/**
 * Cache entry for resolved logos
 */
export interface CacheEntry {
  url: string;
  source: LogoSource;
  expiresAt: number;
}

/**
 * Failed lookup cache entry
 */
export interface FailedLookup {
  timestamp: number;
  retryAfter: number;
}

/**
 * Provider logo resolver options
 */
export interface ProviderLogoOptions {
  /** Size in pixels (width and height) */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Alt text for the image */
  alt?: string;
}

/**
 * Resolver function type
 */
export type LogoResolverFn = (provider: AfriProvider) => Promise<string | null>;

/**
 * Provider with extended info for logo resolution
 */
export interface ProviderForLogo {
  slug: string;
  name: string;
  website?: string | null;
  logoUrl?: string | null;
}
"use client";

import * as React from "react";
import Image from "next/image";
import { resolveProviderLogo, getProviderLogoSync } from "@/lib/logo";
import type { Provider } from "@/lib/types";

interface ProviderLogoProps {
  provider: Provider;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * Provider Logo Component
 * Automatically resolves logo with graceful fallbacks
 * Never displays a broken image
 */
export const ProviderLogo: React.FC<ProviderLogoProps> = ({
  provider,
  size = 32,
  className = "",
  alt,
}) => {
  const [logoUrl, setLogoUrl] = React.useState<string | null>(() => null);
  const [loading, setLoading] = React.useState(true);
  const [failedSources, setFailedSources] = React.useState<Set<string>>(new Set());

  // Initialize logo URL
  React.useEffect(() => {
    let isMounted = true;
    
    const initLogo = async () => {
      // Try cached/placeholder first (sync)
      const cached = getProviderLogoSync(provider as any);
      
      if (cached) {
        if (isMounted) {
          setLogoUrl(cached);
          setLoading(false);
        }
        return;
      }
      
      // Need async resolution
      try {
        const resolved = await resolveProviderLogo(provider as any);
        if (isMounted) {
          setLogoUrl(resolved);
          setLoading(false);
        }
      } catch {
        // Should never happen as resolveProviderLogo always returns a string
        const placeholder = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="#D48A5A" rx="8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="#FFFFFF">${(provider.name || provider.slug || "?").charAt(0).toUpperCase()}</text></svg>`
        )}`;
        if (isMounted) {
          setLogoUrl(placeholder);
          setLoading(false);
        }
      }
    };

    initLogo();

    return () => {
      isMounted = false;
    };
  }, [provider, size]);

  // Handle image load errors - fall back to placeholder
  const handleError = () => {
    // If we're already showing placeholder, don't do anything
    if (failedSources.has('placeholder') || logoUrl?.startsWith('data:')) return;
    
    // Add current source to failed set and show placeholder
    setFailedSources(prev => new Set([...prev, 'current']));
    setLogoUrl(`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="#D48A5A" rx="8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="#FFFFFF">${(provider.name || provider.slug || "?").charAt(0).toUpperCase()}</text></svg>`
    )}`);
  };

  const finalAlt = alt || `${provider.name || provider.slug} logo`;

  if (loading || !logoUrl) {
    // Loading state - show placeholder immediately to avoid layout shift
    return (
      <div 
        className={`rounded-md overflow-hidden bg-surface border border-border flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span 
          className="font-semibold text-text"
          style={{ 
            fontSize: size * 0.5,
            color: '#D48A5A',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {(provider.name || provider.slug || "?").charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  // If it's a data URI or API route, we handle differently
  const isDataUri = logoUrl.startsWith('data:');
  // API logos serve local files, treat them as remote for Next.js Image
  const isApiLogo = logoUrl.startsWith('/api/logos/');

  if (isDataUri) {
    // For data URIs, use a regular img tag
    return (
      <div className={`rounded-md overflow-hidden bg-surface border border-border ${className}`}>
        <img
          src={logoUrl}
          alt={finalAlt}
          width={size}
          height={size}
          className="w-full h-full object-contain"
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <div className={`rounded-md overflow-hidden bg-surface border border-border ${className}`}>
      <Image
        src={logoUrl}
        alt={finalAlt}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        onError={handleError}
        priority={false}
      />
    </div>
  );
};

export default ProviderLogo;
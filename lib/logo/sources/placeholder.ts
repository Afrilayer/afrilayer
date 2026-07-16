/**
 * Placeholder Logo Source
 * Generates a clean SVG placeholder using provider initials
 * Guarantees no broken image ever
 */

import type { ProviderForLogo } from '../types';

/**
 * Extract initials from provider name
 */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return words
    .map(w => w.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Get contrasting text color based on background
 * For the copper/primary accent color
 */
function getContrastColor(_bgColor: string): string {
  // Always use white for our dark theme backgrounds
  return '#FFFFFF';
}

/**
 * Generate a placeholder SVG data URI
 */
export function resolvePlaceholder(provider: ProviderForLogo): string {
  const initials = getInitials(provider.name || provider.slug || '?');
  const bgColor = 'var(--color-copper, #D48A5A)'; // Fallback to explicit copper color
  
  // Extract CSS variable values for the SVG (inline values for data URI)
  const bgColorHex = '#D48A5A'; // Copper color from theme
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
      <rect width="40" height="40" fill="${bgColorHex}" rx="8"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="system-ui, -apple-system, sans-serif" font-weight="600" 
            font-size="16" fill="${getContrastColor(bgColorHex)}">${initials}</text>
    </svg>
  `.trim()
    .replace(/\n/g, '');
  
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
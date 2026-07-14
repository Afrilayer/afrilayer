import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistance } from 'date-fns';
import type { ConfidenceLevel, VerificationStatus } from './types';

// Tailwind CSS class merger
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Slug generation for URLs
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

// Date formatting utilities
export function formatDate(date: string | Date | null): string {
  if (!date) return 'Never';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'd MMM yyyy');
}

export function formatDateTime(date: string | Date | null): string {
  if (!date) return 'Never';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'd MMM yyyy, HH:mm');
}

export function timeAgo(date: string | Date | null): string {
  if (!date) return 'Never';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
}

// Confidence indicator calculation
export function calculateConfidenceLevel(
  lastVerified: string | null,
  verificationStatus: VerificationStatus,
  providerClaimed: boolean = false
): ConfidenceLevel {
  if (providerClaimed) return 'community';
  if (verificationStatus === 'verified' && lastVerified) {
    const verifiedDate = new Date(lastVerified);
    const now = new Date();
    const monthsSinceVerification =
      (now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

    if (monthsSinceVerification < 3) return 'verified';
    if (monthsSinceVerification < 6) return 'needs-review';
    return 'stale';
  }
  return 'community';
}

// Get confidence label
export function getConfidenceLabel(level: ConfidenceLevel): string {
  switch (level) {
    case 'verified':
      return 'Verified';
    case 'needs-review':
      return 'Needs Review';
    case 'stale':
      return 'Stale';
    case 'community':
      return 'Provider Managed';
  }
}

// Get confidence badge classes
export function getConfidenceClasses(level: ConfidenceLevel): string {
  switch (level) {
    case 'verified':
      return 'bg-success/10 text-success';
    case 'needs-review':
      return 'bg-warning/10 text-warning';
    case 'stale':
      return 'bg-sand-100 text-charcoal/60';
    case 'community':
      return 'bg-baobab-100 text-baobab-700';
  }
}

// Site URL helper
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
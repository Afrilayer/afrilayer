import * as React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, AlertCircle, Clock, Users } from 'lucide-react';
import type { ConfidenceLevel, ConfidenceIndicatorProps } from '@/lib/types';

const levelConfig: Record<
  ConfidenceLevel,
  { label: string; className: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  verified: {
    label: 'Verified',
    className:
      'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
    Icon: ShieldCheck,
  },
  'needs-review': {
    label: 'Needs Review',
    className:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    Icon: AlertCircle,
  },
  stale: {
    label: 'Stale Data',
    className:
      'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700',
    Icon: Clock,
  },
  community: {
    label: 'Community',
    className:
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
    Icon: Users,
  },
};

function deriveLevel({
  lastVerified,
  verificationStatus,
  providerClaimed,
}: ConfidenceIndicatorProps): ConfidenceLevel {
  if (verificationStatus === 'verified' && providerClaimed) {
    if (lastVerified) {
      const daysSince =
        (Date.now() - new Date(lastVerified).getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysSince > 180) return 'stale';
    }
    return 'verified';
  }
  if (verificationStatus === 'pending') return 'needs-review';
  if (verificationStatus === 'unverified') return 'community';
  return 'community';
}

export function ConfidenceIndicator({
  lastVerified,
  verificationStatus,
  providerClaimed,
  className,
}: ConfidenceIndicatorProps & { className?: string }) {
  const level = deriveLevel({ lastVerified, verificationStatus, providerClaimed });
  const config = levelConfig[level];
  const { Icon } = config;

  let detail: string | null = null;
  if (lastVerified && level !== 'community') {
    const daysSince = Math.floor(
      (Date.now() - new Date(lastVerified).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSince === 0) detail = 'verified today';
    else if (daysSince === 1) detail = 'verified yesterday';
    else detail = `verified ${daysSince} days ago`;
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium',
        config.className,
        className
      )}
      title={detail ?? config.label}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
      {detail && <span className="opacity-75">· {detail}</span>}
    </div>
  );
}
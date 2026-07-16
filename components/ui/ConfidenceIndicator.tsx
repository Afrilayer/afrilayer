import * as React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, AlertCircle, Clock, Users } from 'lucide-react';
import type { ConfidenceLevel, VerificationStatus } from '@/lib/types';

interface ConfidenceIndicatorProps {
  lastVerified: string | null;
  verificationStatus: VerificationStatus;
  providerClaimed?: boolean;
}

const levelConfig: Record<
  ConfidenceLevel,
  { label: string; className: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  verified: {
    label: 'Verified',
    className:
      'bg-success/10 text-success border-success/20',
    Icon: ShieldCheck,
  },
  'needs-review': {
    label: 'Needs Review',
    className:
      'bg-warning/10 text-warning border-warning/20',
    Icon: AlertCircle,
  },
  stale: {
    label: 'Stale Data',
    className:
      'bg-sand-100 text-charcoal/70 border-sand-200',
    Icon: Clock,
  },
  community: {
    label: 'Provider Managed',
    className:
      'bg-baobab-100 text-baobab-700 border-baobab-200',
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
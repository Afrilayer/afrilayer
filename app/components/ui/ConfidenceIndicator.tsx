import {
  calculateConfidenceLevel,
  getConfidenceLabel,
  getConfidenceClasses,
  formatDate,
} from '@/lib/utils';
import type { ConfidenceIndicatorProps } from '@/lib/types';

export function ConfidenceIndicator({
  lastVerified,
  verificationStatus,
  providerClaimed,
}: ConfidenceIndicatorProps) {
  const level = calculateConfidenceLevel(
    lastVerified,
    verificationStatus,
    providerClaimed
  );
  const classes = getConfidenceClasses(level);
  const label = getConfidenceLabel(level);

  const getIndicatorIcon = () => {
    switch (level) {
      case 'verified':
        return '🟢';
      case 'needs-review':
        return '🟡';
      case 'stale':
        return '⚪';
      case 'community':
        return '🔵';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${classes}`}>
        <span className="mr-1">{getIndicatorIcon()}</span>
        {label}
      </span>
      {lastVerified && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Last verified: {formatDate(lastVerified)}
        </span>
      )}
    </div>
  );
}
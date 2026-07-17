"use client";

import * as React from "react";
import type { VerificationLevel } from "@/lib/types";

interface VerificationBadgeProps {
  level: VerificationLevel;
  size?: number;
  className?: string;
}

const VERIFICATION_MESSAGES: Record<VerificationLevel, string> = {
  community: 'Community Verified — This provider\'s information has been reviewed by the Afrilayer community.',
  provider: 'Provider Verified — This provider has confirmed their information directly.',
};

// Community Verified — Flaticon-style filled circle with checkmark (dark/black)
function CommunityCheckmark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Filled circle — dark/black */}
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      {/* White checkmark */}
      <path
        d="M6.5 12.5L10.5 16.5L17.5 8.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Provider Verified — Flaticon-style filled circle with checkmark (green)
function ProviderCheckmark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Filled circle — green */}
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      {/* White checkmark */}
      <path
        d="M6.5 12.5L10.5 16.5L17.5 8.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  level,
  size = 16,
  className = "",
}) => {
  const message = VERIFICATION_MESSAGES[level];
  const colorStyle = level === 'provider'
    ? { color: '#2ECC71' }  // Green
    : { color: '#1F1F1D' }; // Black/dark

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      title={message}
      style={{ cursor: 'help', ...colorStyle }}
      role="img"
      aria-label={message}
    >
      {level === 'provider' ? (
        <ProviderCheckmark size={size} />
      ) : (
        <CommunityCheckmark size={size} />
      )}
    </span>
  );
};

export default VerificationBadge;
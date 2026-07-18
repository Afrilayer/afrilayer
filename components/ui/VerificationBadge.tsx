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

// Starburst/sunburst badge with checkmark
function StarburstBadge({ size, fillColor }: { size: number; fillColor: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Sunburst shape */}
      <path
        d="M12 2L13.8 7.2L18.8 4.2L16.6 9.4L22 8.2L18.2 12.6L23.4 12.4L19 15.8L22.6 19.8L17.8 18.2L19.4 24H13.8L12 18.8L10.2 24H4.6L6.2 18.2L1.4 19.8L5 15.8L0.6 12.4L5.8 12.6L2 8.2L7.4 9.4L5.2 4.2L10.2 7.2L12 2Z"
        fill={fillColor}
      />
      {/* White checkmark */}
      <path
        d="M8.5 12.5L11 15L15.5 9.5"
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
  size = 10,
  className = "",
}) => {
  const message = VERIFICATION_MESSAGES[level];
  const fillColor = level === 'provider' ? '#2ECC71' : '#1F1F1D';

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      title={message}
      style={{ cursor: 'help' }}
      role="img"
      aria-label={message}
    >
      <StarburstBadge size={size} fillColor={fillColor} />
    </span>
  );
};

export default VerificationBadge;
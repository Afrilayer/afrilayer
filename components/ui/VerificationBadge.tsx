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

// Scalloped/crown-edged badge with checkmark, inspired by Twitter/X verified badge
function CrownBadge({ size, fillColor }: { size: number; fillColor: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Scalloped crown-edge badge */}
      <path
        d="M12 2C10.9 2 10 2.9 10 4V5.5C8.8 5.5 7.7 6.3 7.1 7.4L6.2 7C5.1 6.4 3.7 7 3.3 8.1L3.1 9C2.6 10 3.2 11.2 4.3 11.6L5.1 11.9C5.1 12.9 4.5 13.8 3.6 14.2L3.1 14.4C2.1 14.9 1.5 15.9 1.7 16.9L1.8 17.8C2 19.8 3.8 21.2 5.8 21.2H18.2C20.2 21.2 22 19.8 22.2 17.8L22.3 16.9C22.5 15.9 21.9 14.9 20.9 14.4L20.4 14.2C19.5 13.8 18.9 12.9 18.9 11.9L19.7 11.6C20.8 11.2 21.4 10 20.9 9L20.7 8.1C20.3 7 18.9 6.4 17.8 7L16.9 7.4C16.3 6.3 15.2 5.5 14 5.5V4C14 2.9 13.1 2 12 2Z"
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
      <CrownBadge size={size} fillColor={fillColor} />
    </span>
  );
};

export default VerificationBadge;
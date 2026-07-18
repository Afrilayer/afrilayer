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

// Circle with 6 sunburst edges and checkmark
function SunburstBadge({ size, fillColor }: { size: number; fillColor: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Circle with 6 sunburst edges */}
      <path
        d="M22 12L19.5 15.5L17 20L12 22L7 20L4.5 15.5L2 12L4.5 8.5L7 4L12 2L17 4L19.5 8.5Z"
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
      <SunburstBadge size={size} fillColor={fillColor} />
    </span>
  );
};

export default VerificationBadge;
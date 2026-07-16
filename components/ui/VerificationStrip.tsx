"use client";

import * as React from "react";
import { Check, Clock, AlertCircle } from "lucide-react";

interface VerificationStripProps {
  lastVerified: string;
  confidence: "Live" | "Estimated" | "Cached" | "Unavailable";
  providerManaged?: boolean;
  liveCheckedAgo?: string;
}

export const VerificationStrip: React.FC<VerificationStripProps> = ({
  lastVerified,
  confidence,
  providerManaged = false,
  liveCheckedAgo = "14 min ago",
}) => {
  const getConfidenceIcon = () => {
    switch (confidence) {
      case "Live":
        return <Check size={10} strokeWidth={2.5} className="text-status-verified" />;
      case "Estimated":
        return <Clock size={10} strokeWidth={2.5} className="text-status-estimated" />;
      case "Cached":
        return <Clock size={10} strokeWidth={2.5} className="text-text-muted" />;
      default:
        return <AlertCircle size={10} strokeWidth={2.5} className="text-status-unavailable" />;
    }
  };

  const getConfidenceLabel = () => {
    if (providerManaged) return "Provider Managed";
    return confidence;
  };

  return (
    <div
      className="w-full px-3 py-2 flex items-center justify-between text-[10px] font-mono border-t border-b border-border bg-surface"
    >
      <div className="flex items-center gap-1.5 text-status-verified">
        <Check size={10} strokeWidth={2.5} />
        <span>VERIFIED TODAY</span>
      </div>

      <div className="flex items-center gap-1.5 text-text-muted">
        {getConfidenceIcon()}
        <span>Confidence: {getConfidenceLabel()}</span>
      </div>

      <span className="text-text-muted-dim">Last Checked: {liveCheckedAgo}</span>
    </div>
  );
};

export default VerificationStrip;
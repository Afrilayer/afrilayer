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
        return <Check size={10} strokeWidth={2.5} style={{ color: "#5FA97C" }} />;
      case "Estimated":
        return <Clock size={10} strokeWidth={2.5} style={{ color: "#D9B44E" }} />;
      case "Cached":
        return <Clock size={10} strokeWidth={2.5} style={{ color: "#8A8D85" }} />;
      default:
        return <AlertCircle size={10} strokeWidth={2.5} style={{ color: "#C05A45" }} />;
    }
  };

  const getConfidenceLabel = () => {
    if (providerManaged) return "Provider Managed";
    return confidence;
  };

  return (
    <div
      className="w-full px-3 py-2 flex items-center justify-between text-[10px] font-mono"
      style={{
        borderTop: "1px solid #262A25",
        borderBottom: "1px solid #262A25",
        background: "#14171A",
      }}
    >
      <div className="flex items-center gap-1.5" style={{ color: "#5FA97C" }}>
        <Check size={10} strokeWidth={2.5} />
        <span>VERIFIED TODAY</span>
      </div>
      
      <div className="flex items-center gap-1.5" style={{ color: "#93968D" }}>
        {getConfidenceIcon()}
        <span>Confidence: {getConfidenceLabel()}</span>
      </div>
      
      <span style={{ color: "#5D6058" }}>Last Checked: {liveCheckedAgo}</span>
    </div>
  );
};

export default VerificationStrip;
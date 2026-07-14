"use client";

import * as React from "react";
import { Check, Clock, XCircle } from "lucide-react";

interface StatusPillProps {
  status: "Live" | "Estimated" | "Cached" | "Unavailable";
}

const STATUS_CONFIG: Record<string, { color: string; Icon: React.ElementType; label: string }> = {
  Live: { color: "#5FA97C", Icon: Check, label: "Live" },
  Estimated: { color: "#D9B44E", Icon: Clock, label: "Estimated" },
  Cached: { color: "#8A8D85", Icon: Clock, label: "Cached" },
  Unavailable: { color: "#C05A45", Icon: XCircle, label: "Unavailable" },
};

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  if (!config) return null;

  const { color, Icon, label } = config;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[10px] tracking-wide uppercase"
      style={{
        color,
        border: `1px solid ${color}55`,
        background: `${color}14`,
      }}
    >
      <Icon size={10} strokeWidth={2.5} />
      {label}
    </span>
  );
};

export default StatusPill;
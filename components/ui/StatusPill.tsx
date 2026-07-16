"use client";

import * as React from "react";
import { Check, Clock, XCircle } from "lucide-react";

interface StatusPillProps {
  status: "Live" | "Estimated" | "Cached" | "Unavailable";
}

const STATUS_CONFIG: Record<string, { color: string; Icon: React.ElementType; label: string }> = {
  Live: { color: "var(--color-status-verified)", Icon: Check, label: "Live" },
  Estimated: { color: "var(--color-status-estimated)", Icon: Clock, label: "Estimated" },
  Cached: { color: "var(--color-text-muted)", Icon: Clock, label: "Cached" },
  Unavailable: { color: "var(--color-status-unavailable)", Icon: XCircle, label: "Unavailable" },
};

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  if (!config) return null;

  const { color, Icon, label } = config;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-wide uppercase"
      style={{
        color,
        borderColor: color.replace(")", ", 0.3)"),
        backgroundColor: color.replace(")", ", 0.08)"),
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <Icon size={10} strokeWidth={2.5} />
      {label}
    </span>
  );
};

export default StatusPill;
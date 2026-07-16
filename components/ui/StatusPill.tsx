"use client";

import * as React from "react";
import { Check, Clock, XCircle } from "lucide-react";

interface StatusPillProps {
  status: "Live" | "Estimated" | "Cached" | "Unavailable";
}

interface StatusStyle {
  text: string;
  border: string;
  bg: string;
  Icon: React.ElementType;
  label: string;
}

const STATUS_CONFIG: Record<string, StatusStyle> = {
  Live: {
    text: "text-status-verified",
    border: "border-status-verified/30",
    bg: "bg-status-verified/10",
    Icon: Check,
    label: "Live",
  },
  Estimated: {
    text: "text-status-estimated",
    border: "border-status-estimated/30",
    bg: "bg-status-estimated/10",
    Icon: Clock,
    label: "Estimated",
  },
  Cached: {
    text: "text-text-muted",
    border: "border-text-muted/30",
    bg: "bg-text-muted/10",
    Icon: Clock,
    label: "Cached",
  },
  Unavailable: {
    text: "text-status-unavailable",
    border: "border-status-unavailable/30",
    bg: "bg-status-unavailable/10",
    Icon: XCircle,
    label: "Unavailable",
  },
};

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  if (!config) return null;

  const { text, border, bg, Icon, label } = config;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-wide uppercase border ${text} ${border} ${bg}`}
    >
      <Icon size={10} strokeWidth={2.5} />
      {label}
    </span>
  );
};

export default StatusPill;
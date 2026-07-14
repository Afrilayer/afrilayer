"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import StatusPill from "./StatusPill";
import type { ApiMock } from "@/lib/mock-data";

interface ApiCardProps {
  api: ApiMock;
  onClick?: () => void;
}

export const ApiCard: React.FC<ApiCardProps> = ({ api, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="text-left rounded-lg p-5 flex flex-col gap-3 transition-colors w-full bg-surface border border-border hover-lift"
      whileHover={{
        background: "var(--color-surface-hover)",
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-base leading-snug text-text">
            {api.name}
          </h3>
          <p className="text-xs mt-0.5 font-mono text-muted-dim">
            {api.provider}
          </p>
        </div>
        <StatusPill status={api.status} />
      </div>

      <p className="text-sm leading-relaxed text-muted">
        {api.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-1">
        {api.countries.slice(0, 3).map((c) => (
          <span
            key={c}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg text-muted-dim border border-border"
          >
            {c}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 mt-1 border-t border-border">
        <span className="text-[10px] font-mono text-muted-dim">
          verified {api.lastVerified}
        </span>
        <ChevronRight size={14} className="text-copper" />
      </div>
    </motion.button>
  );
};

export default ApiCard;

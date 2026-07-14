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
      className="text-left rounded-lg p-5 flex flex-col gap-3 transition-colors w-full"
      style={{
        background: "#14171A",
        border: "1px solid #262A25",
      }}
      whileHover={{
        background: "#1B1F1C",
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-base leading-snug" style={{ color: "#F2EFE9" }}>
            {api.name}
          </h3>
          <p className="text-xs mt-0.5 font-mono" style={{ color: "#5D6058" }}>
            {api.provider}
          </p>
        </div>
        <StatusPill status={api.status} />
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "#93968D" }}>
        {api.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-1">
        {api.countries.slice(0, 3).map((c) => (
          <span
            key={c}
            className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{
              background: "#0B0D0C",
              color: "#93968D",
              border: "1px solid #262A25",
            }}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: "1px solid #262A25" }}>
        <span className="text-[10px] font-mono" style={{ color: "#5D6058" }}>
          verified {api.lastVerified}
        </span>
        <ChevronRight size={14} style={{ color: "#C9722A" }} />
      </div>
    </motion.button>
  );
};

export default ApiCard;
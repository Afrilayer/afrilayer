"use client";

import * as React from "react";
import type { ChangelogEntry } from "@/lib/types";

interface ChangelogTimelineProps {
  changelog: ChangelogEntry[];
}

export const ChangelogTimeline: React.FC<ChangelogTimelineProps> = ({ changelog }) => {
  return (
    <div className="mt-10">
      <h2 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#5D6058" }}>
        Changelog
      </h2>
      <div className="flex flex-col">
        {changelog.map((entry, i) => (
          <div
            key={i}
            className="flex gap-4 py-3"
            style={{ borderTop: i > 0 ? "1px solid #262A25" : "none" }}
          >
            <span className="text-[10px] font-mono shrink-0 pt-0.5" style={{ color: "#5D6058" }}>
              {entry.date}
            </span>
            <span className="text-sm" style={{ color: "#93968D" }}>
              {entry.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangelogTimeline;
"use client";

import * as React from "react";
import type { ChangelogEntry } from "@/lib/types";

interface ChangelogTimelineProps {
  changelog: ChangelogEntry[];
}

export const ChangelogTimeline: React.FC<ChangelogTimelineProps> = ({ changelog }) => {
  return (
    <div className="mt-10">
      <h2 className="text-xs font-mono uppercase tracking-widest mb-3 text-text-muted-dim">
        Changelog
      </h2>
      <div className="flex flex-col">
        {changelog.map((entry, i) => (
          <div
            key={i}
            className="flex gap-4 py-3"
            style={{ borderTop: i > 0 ? "1px solid var(--color-border)" : "none" }}
          >
            <span className="text-[10px] font-mono shrink-0 pt-0.5 text-text-muted-dim">
              {entry.date}
            </span>
            <span className="text-sm text-text-muted">
              {entry.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangelogTimeline;
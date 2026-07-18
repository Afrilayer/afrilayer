"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Verification {
  provider: string;
  status: string;
  lastVerified: string;
}

export const LiveVerificationFeed = ({ verifications = [] }: { verifications?: Verification[] }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const verificationsToDisplay = verifications.slice(0, 5);

  // Auto-rotate every 30 minutes
  React.useEffect(() => {
    if (verificationsToDisplay.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % verificationsToDisplay.length);
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [verificationsToDisplay.length]);

  // Default empty state for hydration
  if (verificationsToDisplay.length === 0) {
    return (
      <div className="w-full overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
          <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
            Live Verification Feed
          </span>
        </div>

        <div className="h-10">
          <div className="flex items-center justify-between px-3 text-xs font-mono bg-surface border border-border text-text-muted">
            <span className="text-text">No recent verifications</span>
            <span className="text-status-verified">Check back soon</span>
          </div>
        </div>
      </div>
    );
  }

  const current = verificationsToDisplay[currentIndex];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
        <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
          Live Verification Feed
        </span>
      </div>

      <div className="h-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.provider + currentIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between px-3 text-xs font-mono bg-surface border border-border text-text-muted"
          >
            <span className="text-text">{current.provider}</span>
            <div className="flex items-center gap-1.5 text-status-verified">
              <Check size={10} strokeWidth={2.5} />
              <span>Verified {formatDistanceToNow(new Date(current.lastVerified), { addSuffix: true })}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveVerificationFeed;
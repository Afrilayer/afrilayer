"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { LIVE_VERIFICATION_EVENTS } from "@/lib/mock-data";

export const LiveVerificationFeed: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5FA97C" }} />
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#5D6058" }}>
          Live Verification Feed
        </span>
      </div>
      
      <div className="relative h-10">
        <AnimatePresence>
          {LIVE_VERIFICATION_EVENTS.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-between px-3 text-xs font-mono"
              style={{
                background: "#14171A",
                border: "1px solid #262A25",
                color: "#93968D",
              }}
            >
              <span style={{ color: "#F2EFE9" }}>{event.provider}</span>
              <div className="flex items-center gap-1.5" style={{ color: "#5FA97C" }}>
                <Check size={10} strokeWidth={2.5} />
                <span>Verified {event.ago}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveVerificationFeed;
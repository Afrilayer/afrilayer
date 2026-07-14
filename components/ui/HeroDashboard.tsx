"use client";

import * as React from "react";
import { Check, Globe, MapPin, Clock, Activity } from "lucide-react";
import { HERO_STATS } from "@/lib/mock-data";

export const HeroDashboard: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Check,
    Globe,
    MapPin,
    Clock,
    Activity,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12">
      {HERO_STATS.map((stat, index) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];
        return (
          <div
            key={stat.label}
            className="p-4 rounded-lg flex flex-col items-center justify-center text-center"
            style={{
              background: "#14171A",
              border: "1px solid #262A25",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              {Icon && <Icon size={14} style={{ color: "#C9722A" }} />}
              <span className="text-2xl font-semibold font-mono" style={{ color: "#F2EFE9" }}>
                {stat.value}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#5D6058" }}>
              {stat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HeroDashboard;
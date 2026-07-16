"use client";

import * as React from "react";
import { Check, Globe, MapPin, Clock, Activity } from "lucide-react";
import type { HomepageStats } from "@/lib/types";

interface HeroDashboardProps {
  stats?: HomepageStats;
}

const defaultStats = {
  totalApis: 0,
  totalProviders: 0,
  totalCountries: 0,
  liveApis: 0,
  averageVerificationAge: "0 days",
};

export const HeroDashboard: React.FC<HeroDashboardProps> = ({ stats = defaultStats }) => {
  const iconMap: Record<string, React.ElementType> = {
    Check,
    Globe,
    MapPin,
    Clock,
    Activity,
  };

  const heroStats = [
    { value: `${stats.totalApis}+`, label: "APIs checked today", icon: "Check" },
    { value: `${stats.totalProviders}+`, label: "Providers monitored", icon: "Globe" },
    { value: `${stats.totalCountries}+`, label: "Countries covered", icon: "MapPin" },
    { value: stats.averageVerificationAge, label: "Average verification age", icon: "Clock" },
    { value: `${stats.liveApis}`, label: "APIs currently live", icon: "Activity" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-12">
      {heroStats.map((stat) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];
        return (
          <div
            key={stat.label}
            className="p-4 rounded-xl flex flex-col items-center justify-center text-center bg-surface border border-border"
            style={{
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              {Icon && <Icon size={14} className="text-primary" />}
              <span className="text-2xl font-semibold font-mono text-text">
                {stat.value}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
              {stat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HeroDashboard;
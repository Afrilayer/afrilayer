"use client";

import * as React from "react";
import { COUNTRIES } from "@/lib/countries";

interface CountryFlagProps {
  code: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ code, size = 'sm', className = '' }) => {
  // Use centralized COUNTRIES data for flag lookup
  const country = COUNTRIES[code.toUpperCase()];
  const flag = country?.flag;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  if (!flag) {
    // Elegant fallback - show the country code with styling
    return (
      <span
        className={`inline-flex items-center justify-center rounded font-mono text-[10px] bg-surface text-text-muted border border-border ${sizeClasses[size]} ${className}`}
        style={{
          minWidth: '1.5em',
          minHeight: '1.5em',
        }}
        title={code}
      >
        {code.toUpperCase()}
      </span>
    );
  }

  return (
    <span className={`${sizeClasses[size]} ${className}`} title={code.toUpperCase()}>
      {flag}
    </span>
  );
};

export default CountryFlag;

// Helper function to get flag for a country code
export function getCountryFlag(code: string): string {
  const country = COUNTRIES[code.toUpperCase()];
  return country?.flag || code.toUpperCase();
}
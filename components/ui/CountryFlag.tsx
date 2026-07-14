"use client";

import * as React from "react";

// ISO country code to flag emoji mapping
const COUNTRY_FLAGS: Record<string, string> = {
  NG: '🇳🇬',
  ZA: '🇿🇦',
  GH: '🇬🇭',
  KE: '🇰🇪',
  UG: '🇺🇬',
  TZ: '🇹🇿',
  EG: '🇪🇬',
  MA: '🇲🇦',
  CI: '🇨🇮',
  SN: '🇸🇳',
  RW: '🇷🇼',
  TN: '🇹🇳',
  ZM: '🇿🇲',
  MW: '🇲🇼',
  ZW: '🇿🇼',
  BF: '🇧🇫',
  ML: '🇲🇱',
  NE: '🇳🇮',
  GN: '🇬🇳',
  GM: '🇬🇲',
  SL: '🇸🇱',
  LR: '🇱🇷',
  // Add more as needed
};

interface CountryFlagProps {
  code: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ code, size = 'sm', className = '' }) => {
  const flag = COUNTRY_FLAGS[code.toUpperCase()];
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  if (!flag) {
    // Elegant fallback - show the country code with styling
    return (
      <span 
        className={`inline-flex items-center justify-center rounded ${sizeClasses[size]} ${className}`}
        style={{ 
          background: "#14171A", 
          color: "#93968D",
          minWidth: '1.5em',
          minHeight: '1.5em'
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
  return COUNTRY_FLAGS[code.toUpperCase()] || code.toUpperCase();
}
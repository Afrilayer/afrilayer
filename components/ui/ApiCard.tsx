"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import StatusPill from "./StatusPill";
import { CountryFlag } from "./CountryFlag";
import type { ApiMock } from "@/lib/mock-data";

// Country name to ISO code mapping
const COUNTRY_TO_CODE: Record<string, string> = {
  'Nigeria': 'NG',
  'South Africa': 'ZA',
  'Ghana': 'GH',
  'Kenya': 'KE',
  'Uganda': 'UG',
  'Tanzania': 'TZ',
  'Egypt': 'EG',
  'Morocco': 'MA',
  "Côte d'Ivoire": 'CI',
  'Senegal': 'SN',
  'Rwanda': 'RW',
  'Tunisia': 'TN',
};

// Category slug mapping
const CATEGORY_TO_SLUG: Record<string, string> = {
  'Mobile Money': 'mobile-money',
  'Payments': 'payments',
  'KYC': 'kyc',
  'Identity': 'identity',
  'SMS': 'sms',
  'Airtime': 'airtime',
  'Banking': 'banking',
  'Logistics': 'logistics',
  'Government': 'government',
  'Crypto': 'crypto',
  'Maps': 'maps',
  'AI': 'ai',
};

interface ApiCardProps {
  api: ApiMock;
  onClick?: () => void;
  showCountryLinks?: boolean;
  showCategoryLink?: boolean;
}

export const ApiCard: React.FC<ApiCardProps> = ({ api, onClick, showCountryLinks = false, showCategoryLink = false }) => {
  const renderCountryTags = () => {
    if (showCountryLinks) {
      return api.countries.slice(0, 3).map((c) => {
        const code = COUNTRY_TO_CODE[c] || c;
        return (
          <a
            key={c}
            href={`/countries/${code.toLowerCase()}`}
            className="text-[10px] font-mono px-2 py-0.5 rounded hover:bg-surface/50 transition-colors"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-muted)",
              border: "1px solid var(--color-border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex items-center gap-1">
              <CountryFlag code={code} size="sm" />
              {c}
            </span>
          </a>
        );
      });
    }
    return api.countries.slice(0, 3).map((c) => (
      <span
        key={c}
        className="text-[10px] font-mono px-2 py-0.5 rounded"
        style={{
          background: "var(--color-surface)",
          color: "var(--color-muted)",
          border: "1px solid var(--color-border)",
        }}
      >
        {c}
      </span>
    ));
  };

  return (
    <motion.button
      onClick={onClick}
      className="text-left rounded-[18px] p-5 flex flex-col gap-3 transition-colors w-full bg-surface shadow-card"
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
          <p className="text-xs mt-0.5 font-mono text-muted">
            {api.provider}
          </p>
        </div>
        <StatusPill status={api.status} />
      </div>

      <p className="text-sm leading-relaxed text-muted">
        {api.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-1">
        {renderCountryTags()}
        {showCategoryLink && (
          <a
            href={`/categories/${CATEGORY_TO_SLUG[api.category] || api.category.toLowerCase()}`}
            className="text-[10px] font-mono px-2 py-0.5 rounded hover:bg-surface/50 transition-colors"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-muted)",
              border: "1px solid var(--color-border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {api.category}
          </a>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 mt-1" style={{ 
        borderTop: "0.5px solid var(--color-border)" 
      }}>
        <span className="text-[10px] font-mono text-muted">
          last checked {api.lastVerified}
        </span>
        <ChevronRight size={14} className="text-clay" />
      </div>
    </motion.button>
  );
};

export default ApiCard;
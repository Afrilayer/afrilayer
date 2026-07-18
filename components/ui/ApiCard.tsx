"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import StatusPill from "./StatusPill";
import { CountryFlag } from "./CountryFlag";
import { ProviderLogo } from "./ProviderLogo";
import { VerificationBadge } from "./VerificationBadge";
import type { ApiMock } from "@/lib/types";
import { CATEGORY_TO_SLUG, COUNTRY_TO_CODE } from "@/lib/constants";

interface ApiCardProps {
  api: ApiMock & { logoUrl?: string };
  onClick?: () => void;
  showCountryLinks?: boolean;
  showCategoryLink?: boolean;
}

// Minimal provider type for ProviderLogo
interface MinimalProvider {
  slug: string;
  name: string;
  website?: string | null;
  logoUrl?: string;
}

export const ApiCard: React.FC<ApiCardProps> = ({ api, onClick, showCountryLinks = false, showCategoryLink = false }) => {
  // Create minimal provider object for logo resolution
  const logoProvider: MinimalProvider = {
    slug: api.id,
    name: api.provider,
    website: undefined,
    logoUrl: api.logoUrl,
  };

  const renderCountryTags = () => {
    if (showCountryLinks) {
      return api.countries.slice(0, 3).map((c) => {
        const code = COUNTRY_TO_CODE[c] || c;
        return (
          <a
            key={c}
            href={`/countries/${code.toLowerCase()}`}
            className="text-[10px] font-mono px-2 py-0.5 rounded hover:bg-surface-hover transition-colors bg-surface text-text-muted border border-border"
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
        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface text-text-muted border border-border"
      >
        {c}
      </span>
    ));
  };

  return (
    <motion.button
      onClick={onClick}
      className="text-left rounded-xl p-5 flex flex-col gap-3 transition-colors w-full bg-surface shadow-sm"
      whileHover={{
        background: "var(--color-surface-hover)",
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <ProviderLogo
            provider={logoProvider as any}
            size={32}
            className="w-8 h-8 rounded-md"
          />
          <div>
            <h3 className="font-semibold text-base leading-snug text-text">
              {api.name}
            </h3>
            <p className="text-xs mt-0.5 font-mono text-text-muted flex items-center gap-1">
              {api.provider}
              {api.verification?.verified && (
                <VerificationBadge level={api.verification.level} size={10} />
              )}
            </p>
          </div>
        </div>
        <StatusPill status={api.status} />
      </div>

      <p className="text-sm leading-relaxed text-text-muted">
        {api.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-1">
        {renderCountryTags()}
        {showCategoryLink && (
          <a
            href={`/categories/${CATEGORY_TO_SLUG[api.category] || api.category.toLowerCase()}`}
            className="text-[10px] font-mono px-2 py-0.5 rounded hover:bg-surface-hover transition-colors bg-surface text-text-muted border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {api.category}
          </a>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 mt-1 border-t border-border">
        <span className="text-[10px] font-mono text-text-muted">
          last checked {api.lastVerified}
        </span>
        <ChevronRight size={14} className="text-primary" />
      </div>
    </motion.button>
  );
};

export default ApiCard;

"use client";

import * as React from "react";
import { Search } from "lucide-react";

interface FacetedSearchProps {
  query: string;
  category: string;
  country: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onCountryChange: (country: string) => void;
  categories?: string[];
  countries?: string[];
  categoryCounts?: Record<string, number>;
  countryCounts?: Record<string, number>;
}

export const FacetedSearch: React.FC<FacetedSearchProps> = ({
  query,
  category,
  country,
  onQueryChange,
  onCategoryChange,
  onCountryChange,
  categories = ["All"],
  countries = ["All"],
  categoryCounts = {},
  countryCounts = {},
}) => {
  const selectCls = (active: boolean) =>
    `text-xs font-mono px-3 py-1.5 rounded-full transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-copper ${active ? "font-semibold" : ""}`;

  return (
    <div className="flex flex-col gap-3">
      {/* Search Input */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-lg w-full bg-surface border border-border"
      >
        <Search size={15} className="text-muted-dim" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search APIs, providers, categories…"
          className="bg-transparent outline-none text-sm w-full font-mono text-text placeholder:text-muted-dim"
          aria-label="Search APIs and providers"
        />
      </div>

      {/* Category Filters - horizontally scrollable on mobile */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest mb-2 text-muted-dim">
          Category
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {categories.map((c) => {
            const count = categoryCounts[c] || 0;
            return (
              <button
                key={c}
                onClick={() => onCategoryChange(c)}
                className={selectCls(category === c)}
                style={{
                  background: category === c ? "var(--color-copper)" : "var(--color-surface)",
                  color: category === c ? "var(--color-bg)" : "var(--color-muted)",
                  border: `1px solid ${category === c ? "var(--color-copper)" : "var(--color-border)"}`,
                }}
                aria-pressed={category === c}
              >
                <span className="flex items-center gap-1">
                  {c}
                  <span className={`text-[8px] px-1 ${category === c ? "text-bg/70" : "text-muted-dim"}`}>
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Country Filters - horizontally scrollable on mobile */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest mb-2 text-muted-dim">
          Country
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {countries.map((c) => {
            const count = countryCounts[c] || 0;
            return (
              <button
                key={c}
                onClick={() => onCountryChange(c)}
                className={selectCls(country === c)}
                style={{
                  background: country === c ? "var(--color-copper)" : "var(--color-surface)",
                  color: country === c ? "var(--color-bg)" : "var(--color-muted)",
                  border: `1px solid ${country === c ? "var(--color-copper)" : "var(--color-border)"}`,
                }}
                aria-pressed={country === c}
              >
                <span className="flex items-center gap-1">
                  {c}
                  <span className={`text-[8px] px-1 ${country === c ? "text-bg/70" : "text-muted-dim"}`}>
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FacetedSearch;
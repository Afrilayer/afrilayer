"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { CATEGORIES, COUNTRIES } from "@/lib/mock-data";

interface FacetedSearchProps {
  query: string;
  category: string;
  country: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onCountryChange: (country: string) => void;
}

export const FacetedSearch: React.FC<FacetedSearchProps> = ({
  query,
  category,
  country,
  onQueryChange,
  onCategoryChange,
  onCountryChange,
}) => {
  const selectCls = (active: boolean) =>
    `text-xs font-mono px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${active ? "font-semibold" : ""}`;

  return (
    <div className="flex flex-col gap-3">
      {/* Search Input */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-lg w-full"
        style={{
          background: "#14171A",
          border: "1px solid #262A25",
        }}
      >
        <Search size={15} style={{ color: "#5D6058" }} />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search APIs, providers, categories…"
          className="bg-transparent outline-none text-sm w-full"
          style={{ color: "#F2EFE9" }}
        />
      </div>

      {/* Category Filters */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "#5D6058" }}>
          Category
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={selectCls(category === c)}
              style={{
                background: category === c ? "#C9722A" : "#14171A",
                color: category === c ? "#0B0D0C" : "#93968D",
                border: `1px solid ${category === c ? "#C9722A" : "#262A25"}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Country Filters */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: "#5D6058" }}>
          Country
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {COUNTRIES.map((c) => (
            <button
              key={c}
              onClick={() => onCountryChange(c)}
              className={selectCls(country === c)}
              style={{
                background: country === c ? "#C9722A" : "#14171A",
                color: country === c ? "#0B0D0C" : "#93968D",
                border: `1px solid ${country === c ? "#C9722A" : "#262A25"}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacetedSearch;
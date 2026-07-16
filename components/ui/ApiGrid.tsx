"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FacetedSearch, ApiCard } from "@/components/ui";
import type { ApiMock } from "@/lib/types";

interface ApiGridProps {
  apis: ApiMock[];
  categories: string[];
  countries: string[];
}

type SortOption = "lastUpdated" | "lastVerified" | "name";

export function ApiGrid({ apis, categories, countries }: ApiGridProps) {
  const [category, setCategory] = React.useState("All");
  const [country, setCountry] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<SortOption>("lastUpdated");
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const ITEMS_PER_PAGE = 12;

  // Calculate category counters
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((c) => {
      if (c === "All") {
        counts[c] = apis.length;
      } else {
        counts[c] = apis.filter((api) => api.category === c).length;
      }
    });
    return counts;
  }, [apis, categories]);

  // Calculate country counters
  const countryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    countries.forEach((c) => {
      if (c === "All") {
        counts[c] = apis.length;
      } else {
        counts[c] = apis.filter((api) => api.countries.includes(c)).length;
      }
    });
    return counts;
  }, [apis, countries]);

  const filtered = React.useMemo(() => {
    let result = apis.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (country !== "All" && !a.countries.includes(country)) return false;
      if (query && !`${a.name} ${a.provider} ${a.category} ${a.countries?.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "lastUpdated":
          // Sort by lastVerified (used as proxy for updated)
          return (a as any).lastVerified && (b as any).lastVerified 
            ? (b as any).lastVerified.localeCompare((a as any).lastVerified)
            : 0;
        case "lastVerified":
          return (b.lastVerified || "").localeCompare(a.lastVerified || "");
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [apis, category, country, query, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedApis = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [category, country, query, sortBy]);

  return (
    <>
      {/* Faceted Search */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-12 mb-6">
        <FacetedSearch
          query={query}
          category={category}
          country={country}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onCountryChange={setCountry}
          categories={categories}
          countries={countries}
          categoryCounts={categoryCounts}
          countryCounts={countryCounts}
        />
      </section>

      {/* Sort and Count Bar */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mb-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-muted-dim">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs font-mono bg-surface border border-border rounded px-2 py-1 text-text focus:outline-none focus:ring-2 focus:ring-copper"
          >
            <option value="lastUpdated">Last Updated</option>
            <option value="lastVerified">Last Verified</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
        <span className="text-xs font-mono text-muted-dim">
          {filtered.length} API{filtered.length !== 1 ? "s" : ""} found
        </span>
      </section>

      {/* API Grid */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-lg border border-dashed border-border">
            <p className="text-sm text-muted">
              No APIs match these filters yet.
            </p>
            <p className="text-xs mt-1 font-mono text-muted-dim">
              Try a different category or country.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {paginatedApis.map((api) => (
                <motion.div
                  key={api.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/apis/${api.id}`} className="block focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2 rounded-lg">
                    <ApiCard api={api} showCountryLinks={true} showCategoryLink={true} />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-xs font-mono rounded border border-border bg-surface text-text disabled:opacity-50 hover:bg-surface-hover transition-colors"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-xs font-mono rounded border transition-colors ${
                    page === currentPage
                      ? "bg-copper text-bg border-copper"
                      : "bg-surface text-text border-border hover:bg-surface-hover"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-xs font-mono rounded border border-border bg-surface text-text disabled:opacity-50 hover:bg-surface-hover transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
}
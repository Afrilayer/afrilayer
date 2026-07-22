"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, ArrowUpDown, Filter } from "lucide-react";
import { 
  VerificationBadge, 
  ProviderLogo, 
  CountryFlag,
  EmptyState,
} from "@/components/ui";
import { getVerificationTier, getVerificationTierLabel } from "@/lib/providers/sort";
import { COUNTRY_TO_CODE } from "@/lib/constants";
import type { Provider } from "@/lib/types";

interface ProvidersDirectoryProps {
  providers: Provider[];
  categories: string[];
  countries: string[];
}

type SortMode = "verification" | "name" | "lastVerified" | "lastUpdated";
type FilterVerification = "all" | "pv" | "cv" | "unverified";

const ITEMS_PER_PAGE = 12;

export function ProvidersDirectory({ providers, categories, countries }: ProvidersDirectoryProps) {
  const [query, setQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedCountry, setSelectedCountry] = React.useState("All");
  const [verificationFilter, setVerificationFilter] = React.useState<FilterVerification>("all");
  const [sortMode, setSortMode] = React.useState<SortMode>("verification");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showFilters, setShowFilters] = React.useState(false);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategory, selectedCountry, verificationFilter, sortMode]);

  // Filter and sort providers
  const filtered = React.useMemo(() => {
    let result = providers.filter((p) => {
      // Text search across name, slug, categories, features, countries
      if (query) {
        const searchable = `${p.name} ${p.slug} ${p.categories.join(" ")} ${p.features.join(" ")} ${p.countries.join(" ")}`.toLowerCase();
        if (!searchable.includes(query.toLowerCase())) return false;
      }

      // Category filter
      if (selectedCategory !== "All" && !p.categories.includes(selectedCategory)) return false;

      // Country filter
      if (selectedCountry !== "All" && !p.countries.includes(selectedCountry)) return false;

      // Verification filter
      if (verificationFilter === "pv" && !(p.verification?.verified && p.verification.level === "provider")) return false;
      if (verificationFilter === "cv" && !(p.verification?.verified && p.verification.level === "community")) return false;
      if (verificationFilter === "unverified" && p.verification?.verified) return false;

      return true;
    });

    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortMode) {
        case "verification": {
          const tierA = getVerificationTier(a);
          const tierB = getVerificationTier(b);
          if (tierA !== tierB) return tierA - tierB;
          return a.name.localeCompare(b.name);
        }
        case "name":
          return a.name.localeCompare(b.name);
        case "lastVerified":
          return b.lastVerified.localeCompare(a.lastVerified);
        case "lastUpdated":
          return b.lastUpdated.localeCompare(a.lastUpdated);
        default:
          return 0;
      }
    });

    return result;
  }, [providers, query, selectedCategory, selectedCountry, verificationFilter, sortMode]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProviders = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // Category counts
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: providers.length };
    for (const cat of categories) {
      counts[cat] = providers.filter(p => p.categories.includes(cat)).length;
    }
    return counts;
  }, [providers, categories]);

  // Country counts
  const countryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: providers.length };
    for (const country of countries) {
      counts[country] = providers.filter(p => p.countries.includes(country)).length;
    }
    return counts;
  }, [providers, countries]);

  // Verification counts
  const verificationCounts = React.useMemo(() => ({
    all: providers.length,
    pv: providers.filter(p => p.verification?.verified && p.verification.level === "provider").length,
    cv: providers.filter(p => p.verification?.verified && p.verification.level === "community").length,
    unverified: providers.filter(p => !p.verification?.verified).length,
  }), [providers]);

  return (
    <div className="px-6 md:px-10 max-w-5xl mx-auto pb-20">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl w-full bg-surface border border-border">
          <Search size={15} className="text-text-muted shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search APIs by name, category, feature, or country…"
            className="bg-transparent outline-none text-sm w-full font-mono text-text placeholder:text-text-muted"
            aria-label="Search APIs"
          />
        </div>
      </div>

      {/* Filter Toggle (mobile) + Sort */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-surface border border-border text-text-muted hover:text-text transition-colors md:hidden"
            aria-expanded={showFilters}
          >
            <Filter size={12} />
            Filters
          </button>

          {/* Verification filter pills - always visible */}
          <div className="hidden md:flex items-center gap-1.5">
            {(["all", "pv", "cv", "unverified"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVerificationFilter(v)}
                className={`text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors ${
                  verificationFilter === v
                    ? "bg-accent text-bg font-semibold"
                    : "bg-surface border border-border text-text-muted hover:text-text"
                }`}
              >
                {v === "all" && `All (${verificationCounts.all})`}
                {v === "pv" && `PV (${verificationCounts.pv})`}
                {v === "cv" && `CV (${verificationCounts.cv})`}
                {v === "unverified" && `Unverified (${verificationCounts.unverified})`}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-text-muted">Sort:</span>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="text-xs font-mono bg-surface border border-border rounded-lg px-2.5 py-1.5 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Sort providers"
          >
            <option value="verification">Verification Tier</option>
            <option value="name">Name A-Z</option>
            <option value="lastVerified">Last Verified</option>
            <option value="lastUpdated">Last Updated</option>
          </select>
        </div>
      </div>

      {/* Expandable Filters (mobile) */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 space-y-3 md:hidden"
        >
          {/* Mobile verification filter */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-2 text-text-muted">Verification</div>
            <div className="flex flex-wrap gap-2">
              {(["all", "pv", "cv", "unverified"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVerificationFilter(v)}
                  className={`text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors ${
                    verificationFilter === v
                      ? "bg-accent text-bg font-semibold"
                      : "bg-surface border border-border text-text-muted"
                  }`}
                >
                  {v === "all" && `All (${verificationCounts.all})`}
                  {v === "pv" && `PV (${verificationCounts.pv})`}
                  {v === "cv" && `CV (${verificationCounts.cv})`}
                  {v === "unverified" && `Unverified (${verificationCounts.unverified})`}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile category filter */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-2 text-text-muted">Category</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? "All" : cat)}
                  className={`text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? "bg-accent text-bg font-semibold"
                      : "bg-surface border border-border text-text-muted"
                  }`}
                >
                  {cat} ({categoryCounts[cat] || 0})
                </button>
              ))}
            </div>
          </div>

          {/* Mobile country filter */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-2 text-text-muted">Country</div>
            <div className="flex flex-wrap gap-2">
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c === selectedCountry ? "All" : c)}
                  className={`text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors ${
                    selectedCountry === c
                      ? "bg-accent text-bg font-semibold"
                      : "bg-surface border border-border text-text-muted"
                  }`}
                >
                  {c} ({countryCounts[c] || 0})
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Desktop Category & Country filters */}
      <div className="hidden md:flex gap-4 mb-6">
        <div className="flex-1">
          <div className="text-[10px] font-mono uppercase tracking-widest mb-2 text-text-muted">Category</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedCategory === "All"
                  ? "bg-accent text-bg font-semibold"
                  : "bg-surface border border-border text-text-muted hover:text-text"
              }`}
            >
              All ({categoryCounts.All})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? "bg-accent text-bg font-semibold"
                    : "bg-surface border border-border text-text-muted hover:text-text"
                }`}
              >
                {cat} ({categoryCounts[cat] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:flex gap-4 mb-6">
        <div className="flex-1">
          <div className="text-[10px] font-mono uppercase tracking-widest mb-2 text-text-muted">Country</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCountry("All")}
              className={`text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors ${
                selectedCountry === "All"
                  ? "bg-accent text-bg font-semibold"
                  : "bg-surface border border-border text-text-muted hover:text-text"
              }`}
            >
              All ({countryCounts.All})
            </button>
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors ${
                  selectedCountry === c
                    ? "bg-accent text-bg font-semibold"
                    : "bg-surface border border-border text-text-muted hover:text-text"
                }`}
              >
                {c} ({countryCounts[c] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-mono text-text-muted">
          {filtered.length} API{filtered.length !== 1 ? "s" : ""} found
        </span>
        {sortMode === "verification" && (
          <span className="text-[10px] font-mono text-text-muted-dim flex items-center gap-1">
            <ArrowUpDown size={10} />
            Sorted: PV → CV → Unverified
          </span>
        )}
      </div>

      {/* Provider Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No APIs match these filters"
          description="Try adjusting your search terms or clearing some filters to find what you're looking for."
          action={{
            label: "Clear all filters",
            onClick: () => {
              setQuery("");
              setSelectedCategory("All");
              setSelectedCountry("All");
              setVerificationFilter("all");
            },
          }}
        />
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="popLayout">
              {paginatedProviders.map((provider) => (
                <motion.div
                  key={provider.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProviderCard provider={provider} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-xs font-mono rounded-lg border border-border bg-surface text-text-muted disabled:opacity-50 hover:text-text hover:bg-surface-hover transition-colors"
                aria-label="Previous page"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  // Show pages around current page
                  let pageNum: number;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 text-xs font-mono rounded-lg border transition-colors ${
                        pageNum === currentPage
                          ? "bg-accent text-bg border-accent"
                          : "bg-surface text-text-muted border-border hover:text-text hover:bg-surface-hover"
                      }`}
                      aria-label={`Page ${pageNum}`}
                      aria-current={pageNum === currentPage ? "page" : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-xs font-mono rounded-lg border border-border bg-surface text-text-muted disabled:opacity-50 hover:text-text hover:bg-surface-hover transition-colors"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Provider card for the directory
function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link
      href={`/apis/${provider.slug}`}
      className="block rounded-xl p-5 flex flex-col gap-3 transition-colors w-full bg-surface border border-border hover:shadow-md hover:border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <ProviderLogo
            provider={provider}
            size={36}
            className="w-9 h-9 rounded-md"
          />
          <div>
            <h3 className="font-semibold text-base leading-snug text-text flex items-center gap-1.5">
              {provider.name}
              {provider.verification?.verified && (
                <VerificationBadge level={provider.verification.level} size={12} />
              )}
            </h3>
            <p className="text-xs mt-0.5 font-mono text-text-muted">
              {provider.tagline || provider.categories[0] || "API Provider"}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-text-muted line-clamp-2">
        {provider.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {provider.categories.slice(0, 2).map((cat) => {
          return (
            <span
              key={cat}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface text-text-muted border border-border"
            >
              {cat}
            </span>
          );
        })}
        {provider.countries.slice(0, 2).map((c) => {
          const code = COUNTRY_TO_CODE[c as keyof typeof COUNTRY_TO_CODE] || c;
          return (
            <span
              key={c}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface text-text-muted border border-border inline-flex items-center gap-1"
            >
              <CountryFlag code={code} size="sm" />
              {c}
            </span>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 mt-1 border-t border-border">
        <span className="text-[10px] font-mono text-text-muted">
          {provider.verification?.verified 
            ? `${getVerificationTierLabel(provider)} · last checked ${provider.lastVerified}`
            : `Unverified · last checked ${provider.lastVerified}`
          }
        </span>
        <ChevronRight size={14} className="text-accent shrink-0" />
      </div>
    </Link>
  );
}
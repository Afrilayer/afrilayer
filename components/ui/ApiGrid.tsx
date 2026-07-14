"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FacetedSearch, ApiCard } from "@/components/ui";
import type { ApiMock } from "@/lib/mock-data";

interface ApiGridProps {
  apis: ApiMock[];
  categories: string[];
  countries: string[];
}

export function ApiGrid({ apis, categories, countries }: ApiGridProps) {
  const [category, setCategory] = React.useState("All");
  const [country, setCountry] = React.useState("All");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    return apis.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (country !== "All" && !a.countries.includes(country)) return false;
      if (query && !`${a.name} ${a.provider} ${a.category}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [apis, category, country, query]);

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
        />
      </section>

      {/* API Grid */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto pb-20">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-muted-dim">
            {filtered.length} API{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
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
              {filtered.map((api) => (
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
      </section>
    </>
  );
}
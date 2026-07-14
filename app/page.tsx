"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { APIS } from "@/lib/mock-data";
import { Stamp, FacetedSearch, ApiCard, HeroDashboard, LiveVerificationFeed } from "@/components/ui";

export default function Home() {
  const [category, setCategory] = React.useState("All");
  const [country, setCountry] = React.useState("All");
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    return APIS.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (country !== "All" && !a.countries.includes(country)) return false;
      if (query && !`${a.name} ${a.provider} ${a.category}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [category, country, query]);

  return (
    <div style={{ background: "#0B0D0C", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section className="px-6 md:px-10 pt-16 pb-14 max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-8 flex-wrap">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5FA97C" }} />
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#5D6058" }}>
                50+ · verified this week
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight" style={{ color: "#F2EFE9" }}>
              The verification layer for African digital infrastructure.
            </h1>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "#93968D" }}>
              Discover production-ready APIs powering Africa — payments, mobile money, KYC, SMS, and banking.
              Each listing is continuously monitored, verification-dated, and rated for operational confidence.
            </p>
          </div>
          <Stamp label="VERIFIED" sublabel="JUL 2026" size="lg" />
        </div>
      </section>

      {/* Hero Dashboard Stats */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto">
        <HeroDashboard />
      </section>

      {/* Live Verification Feed */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-12">
        <LiveVerificationFeed />
      </section>

      {/* Faceted Search */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-12 mb-6">
        <FacetedSearch
          query={query}
          category={category}
          country={country}
          onQueryChange={setQuery}
          onCategoryChange={setCategory}
          onCountryChange={setCountry}
        />
      </section>

      {/* API Grid */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto pb-20">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono" style={{ color: "#5D6058" }}>
            {filtered.length} API{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
        {filtered.length === 0 ? (
          <div
            className="text-center py-16 rounded-lg"
            style={{ border: "1px dashed #262A25" }}
          >
            <p className="text-sm" style={{ color: "#93968D" }}>
              No APIs match these filters yet.
            </p>
            <p className="text-xs mt-1 font-mono" style={{ color: "#5D6058" }}>
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
                  <Link href={`/apis/${api.id}`}>
                    <ApiCard api={api} />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}
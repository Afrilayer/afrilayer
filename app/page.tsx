export const revalidate = 3600; // Revalidate every hour

import Link from "next/link";
import { getAllApis } from "@/lib/data";
import { getHomepageStats, getRecentVerifications } from "@/lib/stats";
import { Stamp, FacetedSearch, ApiCard, HeroDashboard, LiveVerificationFeed } from "@/components/ui";
import { ApiGrid } from "@/components/ui/ApiGrid";

// Homepage now loads APIs from filesystem at build time
export default async function Home() {
  // Load all APIs from filesystem
  const apis = await getAllApis();
  
  // Get unique categories and countries from loaded APIs
  const categories = ["All", ...new Set(apis.map(api => api.category))].filter(Boolean);
  const countries = ["All", ...new Set(apis.flatMap(api => api.countries))].filter(Boolean);
  
  // Get live stats
  const stats = await getHomepageStats();
  
  // Get recent verifications
  const recentVerifications = await getRecentVerifications(5);

  return (
    <div className="bg-bg min-h-screen">
      {/* Hero Section */}
      <section className="px-6 md:px-10 pt-16 pb-14 max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-8 flex-wrap">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-verified" />
              <span className="text-xs font-mono tracking-widest uppercase text-muted-dim">
                {stats.liveApis}+ verified APIs
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-text">
              The verification layer for African digital infrastructure.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Discover production-ready APIs powering Africa — payments, mobile money, KYC, SMS, and banking.
              Each listing is continuously monitored, verification-dated, and rated for operational confidence.
            </p>
          </div>
          <Stamp label={`${stats.liveApis} Verified`} sublabel={stats.averageVerificationAge} size="lg" />
        </div>
      </section>

      {/* Hero Dashboard Stats */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto">
        <HeroDashboard stats={stats} />
      </section>

      {/* Live Verification Feed */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-12">
        <LiveVerificationFeed verifications={recentVerifications} />
      </section>

      {/* Client-side interactive components */}
      <ApiGrid apis={apis} categories={categories} countries={countries} />
    </div>
  );
}
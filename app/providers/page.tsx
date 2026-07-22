import { getAllProvidersData } from "@/lib/data";
import { getHomepageStats } from "@/lib/stats";
import { sortByVerificationTier } from "@/lib/providers/sort";
import { ProvidersDirectory } from "./providers-directory";

// API Directory page - primary discovery experience
// Navigation label: "APIs" (internally uses providers/ data model)
// Default sort: verification tier (pv → cv → unverified), then alphabetical
export default async function ProvidersPage() {
  const providers = await getAllProvidersData();
  const stats = await getHomepageStats();

  // Sort by verification tier at build time for default view
  const sortedProviders = sortByVerificationTier(providers);

  // Extract unique categories and countries for filters
  const categories = [...new Set(providers.flatMap(p => p.categories))].filter(Boolean).sort() as string[];
  const countries = [...new Set(providers.flatMap(p => p.countries))].filter(Boolean).sort() as string[];

  return (
    <div className="bg-bg min-h-screen">
      {/* Page Header */}
      <section className="px-6 md:px-10 pt-16 pb-8 max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
                {stats.liveApis}+ verified providers
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-text font-serif">
              API Directory
            </h1>
            <p className="mt-3 text-base leading-relaxed text-text-muted max-w-lg">
              Discover and compare African APIs. Sorted by verification status — 
              Provider Verified first, then Community Verified, then all others.
            </p>
          </div>
        </div>
      </section>

      {/* Client-side interactive directory */}
      <ProvidersDirectory 
        providers={sortedProviders} 
        categories={categories} 
        countries={countries} 
      />
    </div>
  );
}
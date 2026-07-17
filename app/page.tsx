export const revalidate = 3600; // Revalidate every hour

import { getAllProvidersData } from "@/lib/data";
import { getHomepageStats, getRecentVerifications } from "@/lib/stats";
import { Stamp, FacetedSearch, ApiCard, HeroDashboard, LiveVerificationFeed } from "@/components/ui";
import { ApiGrid } from "@/components/ui/ApiGrid";

// Homepage loads providers from filesystem at build time
export default async function Home() {
  const providers = await getAllProvidersData();
  
  // Get unique categories and countries from loaded providers
  const categories = ["All", ...new Set(providers.flatMap(p => p.categories))].filter(Boolean) as string[];
  const countries = ["All", ...new Set(providers.flatMap(p => p.countries))].filter(Boolean) as string[];

  // Convert to API format for ApiGrid compatibility
  const apis = providers.map(p => ({
    id: p.slug,
    name: `${p.name} API`,
    provider: p.name,
    category: p.categories[0],
    countries: p.countries,
    description: p.description,
    status: p.status,
    lastVerified: p.lastVerified,
    uptime: p.apiData?.uptime || '99.9%',
    pricing: p.apiData?.pricing || [],
    curl: p.apiData?.curl || '',
    js: p.apiData?.js || '',
    python: p.apiData?.python || '',
    go: p.apiData?.go || '',
    changelog: p.apiData?.changelog || [],
    version: p.apiData?.version,
    latency: p.apiData?.latency,
    authMethod: p.authentication,
    rateLimit: p.apiData?.rateLimit,
    webhookSupport: p.apiData?.webhookSupport,
    logoUrl: p.logoUrl,
    verification: p.verification,
  }));

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
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
                {stats.liveApis}+ verified APIs
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-text">
              The verification layer for African digital infrastructure.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-text-muted">
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
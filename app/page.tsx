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
    uptime: p.apiData?.uptime || 'N/A',
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
      {/* Hero Section - Editorial Style */}
      <section className="px-6 md:px-10 pt-20 pb-16 max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-10 flex-wrap">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
                {stats.liveApis}+ verified APIs
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-text font-serif">
              One API directory, 50+ verified African providers. Payments, identity, SMS & banking - checked, dated, re-checked.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-muted max-w-lg">
              Afrilayer is where developers check what's actually still live — payments,
              mobile money, KYC, SMS and banking APIs across Africa, each one dated,
              verified, and re-checked on a real schedule.
            </p>
          </div>
          <Stamp label={`${stats.liveApis} Verified`} sublabel={stats.averageVerificationAge} size="lg" />
        </div>
      </section>

      {/* Before/After Comparison - Value Proposition */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* On Your Own */}
          <div className="p-6 rounded-xl border border-border bg-bg">
            <h3 className="text-sm font-mono uppercase tracking-widest text-text-muted mb-3">On Your Own</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-status-unavailable mt-0.5">×</span>
                <span className="text-text-muted">Scattered documentation across multiple sources</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-status-unavailable mt-0.5">×</span>
                <span className="text-text-muted">Unverified uptime and status information</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-status-unavailable mt-0.5">×</span>
                <span className="text-text-muted">No centralized discovery for African APIs</span>
              </li>
            </ul>
          </div>
          
          {/* With Afrilayer */}
          <div className="p-6 rounded-xl border border-accent/40 bg-surface">
            <h3 className="text-sm font-mono uppercase tracking-widest text-accent mb-3">With Afrilayer</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-status-verified mt-0.5">✓</span>
                <span className="text-text">Verified, production-ready APIs</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-status-verified mt-0.5">✓</span>
                <span className="text-text">Current operational data and uptime</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-status-verified mt-0.5">✓</span>
                <span className="text-text">Centralized discovery for African infrastructure</span>
              </li>
            </ul>
          </div>
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
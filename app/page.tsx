import Link from "next/link";
import { ArrowRight, Search, Github, Plus } from "lucide-react";
import { getAllProvidersData } from "@/lib/data";
import { getHomepageStats, getRecentVerifications } from "@/lib/stats";
import { 
  Stamp, 
  HeroDashboard, 
  LiveVerificationFeed, 
  VerificationBadge,
  ProviderLogo,
  CountryFlag,
} from "@/components/ui";
import { 
  getFeaturedProviders, 
  getRecentlyAdded, 
  getRecentlyVerified,
  getFeaturedCategories,
  getFeaturedCountries,
} from "@/lib/providers/featured";
import { CATEGORY_TO_SLUG } from "@/lib/constants";
import type { Provider } from "@/lib/types";

// Homepage - marketing-focused, NOT the full API directory
// Users are encouraged to explore via the search bar or CTA to /providers
export default async function Home() {
  const providers = await getAllProvidersData();
  const stats = await getHomepageStats();
  const recentVerifications = await getRecentVerifications(5);

  // Curated content computed at build time
  const featuredProviders = getFeaturedProviders(providers, 6);
  const recentlyAdded = getRecentlyAdded(providers, 6);
  const recentlyVerified = getRecentlyVerified(providers, 6);
  const featuredCategories = getFeaturedCategories(providers, 8);
  const featuredCountries = getFeaturedCountries(providers, 8);

  // Verified providers count for showcase
  const verifiedCount = providers.filter(p => p.verification?.verified).length;

  return (
    <div className="bg-bg min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="px-6 md:px-10 pt-20 pb-16 max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-10 flex-wrap">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-mono tracking-widest uppercase text-text-muted">
                {stats.liveApis}+ verified providers.
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-text font-serif">
              Build Fast with Vetted African APIs.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-muted max-w-lg">
              The ultimate directory for verified payments, identity, SMS, banking integrations and more.
              Every API listing includes verification dates, uptime, and confidence scores.
            </p>

            {/* Primary CTA + Search */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/providers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-colors"
              >
                Browse All APIs
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-border text-text-muted hover:text-text transition-colors text-sm"
              >
                <Search size={16} className="text-accent" />
                <span>Search APIs, providers, categories…</span>
              </Link>
            </div>
          </div>
          <Stamp label={`${verifiedCount} Verified`} sublabel={stats.averageVerificationAge} size="lg" />
        </div>
      </section>

      {/* ===== BEFORE/AFTER COMPARISON ===== */}
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

      {/* ===== LIVE INFRASTRUCTURE STATS ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto">
        <HeroDashboard stats={stats} />
      </section>

      {/* ===== FEATURED APIs (Top Verified) ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text font-serif">Featured APIs</h2>
            <p className="text-sm text-text-muted mt-1">
              Top verified providers powering Africa's digital ecosystem
            </p>
          </div>
          <Link
            href="/providers"
            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProviders.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
      </section>

      {/* ===== RECENTLY ADDED ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text font-serif">Recently Added</h2>
            <p className="text-sm text-text-muted mt-1">
              New APIs joining the Afrilayer ecosystem
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyAdded.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
      </section>

      {/* ===== RECENTLY VERIFIED ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text font-serif">Recently Verified</h2>
            <p className="text-sm text-text-muted mt-1">
              Providers with the most recent verification check-ins
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyVerified.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
      </section>

      {/* ===== VERIFIED APIs SHOWCASE ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-20">
        <div className="p-8 rounded-2xl border border-accent/30 bg-surface">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-status-verified" />
            <h2 className="text-2xl font-bold text-text font-serif">Verified APIs</h2>
          </div>
          <p className="text-sm text-text-muted mb-6 max-w-2xl">
            Providers marked as <strong className="text-status-verified">Provider Verified (pv)</strong> have confirmed 
            their information directly. <strong className="text-accent">Community Verified (cv)</strong> providers 
            have been reviewed by the Afrilayer community. All others are listed as reference with best-effort accuracy.
          </p>
          <div className="flex flex-wrap gap-2">
            {providers
              .filter(p => p.verification?.verified)
              .slice(0, 12)
              .map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/apis/${provider.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-bg border border-border text-text-muted hover:text-text hover:border-accent transition-colors"
                >
                  {provider.name}
                  {provider.verification && (
                    <VerificationBadge level={provider.verification.level} size={10} />
                  )}
                </Link>
              ))}
            {verifiedCount > 12 && (
              <Link
                href="/providers?verified=true"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-md bg-bg border border-border text-accent hover:underline"
              >
                +{verifiedCount - 12} more
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text font-serif">Explore by Category</h2>
            <p className="text-sm text-text-muted mt-1">
              Discover APIs powering different sectors of Africa's digital economy
            </p>
          </div>
          <Link
            href="/categories"
            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
          >
            All categories <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {featuredCategories.map((cat) => {
            const slug = CATEGORY_TO_SLUG[cat.name as keyof typeof CATEGORY_TO_SLUG] || cat.slug;
            return (
              <Link
                key={cat.name}
                href={`/categories/${slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-sm text-text-muted hover:text-text hover:border-accent transition-colors"
              >
                {cat.name}
                <span className="text-[10px] font-mono text-text-muted-dim bg-bg px-1.5 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== FEATURED COUNTRIES ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text font-serif">Explore by Country</h2>
            <p className="text-sm text-text-muted mt-1">
              Find APIs operating in specific African markets
            </p>
          </div>
          <Link
            href="/countries"
            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
          >
            All countries <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {featuredCountries.map((country) => (
            <Link
              key={country.code}
              href={`/countries/${country.code.toLowerCase()}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-sm text-text-muted hover:text-text hover:border-accent transition-colors"
            >
              <CountryFlag code={country.code} size="sm" />
              {country.name}
              <span className="text-[10px] font-mono text-text-muted-dim bg-bg px-1.5 py-0.5 rounded-full">
                {country.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== WHY AFRILAYER ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mt-24 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text font-serif mb-3">
            Why Afrilayer?
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            We don't just list APIs — we verify them. Every provider is checked, re-checked, 
            and ranked by confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-border bg-surface text-center">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 className="font-semibold text-text mb-2">Verified, Not Just Listed</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Every API undergoes verification checks. Provider Verified (pv) and 
              Community Verified (cv) badges give you confidence at a glance.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-surface text-center">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3 className="font-semibold text-text mb-2">Operational Transparency</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              See uptime, latency, pricing, and verification dates for every API — 
              no more guessing which providers are actually live.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-surface text-center">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="font-semibold text-text mb-2">Community-Driven</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Open source and community maintained. Contribute verification data, 
              report issues, and help keep the directory accurate.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LIVE VERIFICATION FEED ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto mb-16">
        <LiveVerificationFeed verifications={recentVerifications} />
      </section>

      {/* ===== CONTRIBUTION CTA ===== */}
      <section className="px-6 md:px-10 max-w-5xl mx-auto pb-24">
        <div className="p-10 rounded-2xl border border-border bg-surface text-center">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Github size={28} className="text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-text font-serif mb-3">
            Contribute to Afrilayer
          </h2>
          <p className="text-text-muted max-w-lg mx-auto mb-8">
            Afrilayer is open source. Add new providers, update verification data, 
            or improve the platform. Every contribution strengthens the ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contribute"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-colors"
            >
              <Plus size={16} />
              Add a Provider
            </Link>
            <Link
              href="https://github.com/afrilayer/afrilayer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-text-muted hover:text-text hover:bg-surface-hover transition-colors text-sm"
            >
              <Github size={16} />
              View on GitHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Provider card used in homepage sections
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
            size={32}
            className="w-8 h-8 rounded-md"
          />
          <div>
            <h3 className="font-semibold text-base leading-snug text-text">
              {provider.name}
            </h3>
            <p className="text-xs mt-0.5 font-mono text-text-muted flex items-center gap-1">
              {provider.tagline || provider.categories[0]}
              {provider.verification?.verified && (
                <VerificationBadge level={provider.verification.level} size={10} />
              )}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-text-muted line-clamp-2">
        {provider.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-border">
        {provider.categories.slice(0, 2).map((cat) => (
          <span
            key={cat}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface text-text-muted border border-border"
          >
            {cat}
          </span>
        ))}
        {provider.countries.slice(0, 2).map((c) => (
          <span
            key={c}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface text-text-muted border border-border"
          >
            {c}
          </span>
        ))}
      </div>
    </Link>
  );
}
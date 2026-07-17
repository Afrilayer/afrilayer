export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProviderBySlug, getAllProvidersData } from "@/lib/data";
import { StatusPill, Stamp, DocPreview, ChangelogTimeline, QuickFacts, ProviderLogo, SimilarApisTable } from "@/components/ui";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { COUNTRY_TO_CODE, CATEGORY_TO_SLUG } from "@/lib/constants";
import { calculateSimilarProviders, providerToApiMock } from "@/lib/providers/similarity";
import type { Metadata } from "next";

// Generate static params for all providers
export async function generateStaticParams() {
  const providers = await getAllProvidersData();
  return providers.map((provider) => ({ slug: provider.slug }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  
  if (!provider) {
    return {
      title: 'Provider Not Found',
    };
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    title: `${provider.name} API`,
    description: provider.description,
    alternates: {
      canonical: `${baseUrl}/apis/${slug}`,
    },
  };
}

export default async function ApiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <p className="text-text">Provider not found</p>
      </div>
    );
  }

  // Get all providers for similarity calculation
  const allProviders = await getAllProvidersData();
  
  // Use enhanced similarity algorithm to get 4-6 similar providers
  const similarProviders = calculateSimilarProviders(provider, allProviders, 6);
  
  // Convert to ApiMock format for SimilarApisTable
  const similarApis = similarProviders.map(providerToApiMock);

  const api = provider.apiData;

  return (
    <div className="px-6 md:px-10 py-10 max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-mono mb-8 text-muted-dim hover:text-text transition-colors"
      >
        <ArrowLeft size={13} /> back to directory
      </Link>

      {/* Top Section */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <StatusPill status={provider.status} />
            <span className="text-[10px] font-mono text-muted-dim">
              uptime {api?.uptime || 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <ProviderLogo
              provider={provider}
              size={40}
              className="w-12 h-12 rounded-lg"
            />
            <h1 className="text-3xl font-bold tracking-tight text-text">
              {provider.name} API
            </h1>
          </div>
          <p className="text-sm mt-1 font-mono text-muted">
            {provider.name} &middot; {provider.categories[0]}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
            {provider.description}
          </p>
        </div>
        <Stamp label={provider.status} sublabel={provider.lastVerified} />
      </div>

      {/* Key People Row */}
      <div className="flex items-center gap-6 mt-5 flex-wrap">
        {provider.keyPeople && provider.keyPeople.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-dim">
              Key People
            </span>
            <div className="flex flex-wrap gap-3">
              {provider.keyPeople.map((person) => (
                <div key={person.name} className="text-sm">
                  <span className="font-mono text-text">{person.name}</span>
                  {person.github ? (
                    <a
                      href={person.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-[10px] text-muted hover:text-clay transition-colors"
                    >
                      (@{person.github.split('/').pop()})
                    </a>
                  ) : null}
                  <span className="text-muted-dim"> &middot; {person.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Country Tags with Links */}
      <div className="flex flex-wrap gap-1.5 mt-5">
        {provider.countries.map((c) => {
          const code = COUNTRY_TO_CODE[c] || c;
          return (
            <Link
              key={c}
              href={`/countries/${code.toLowerCase()}`}
              className="text-[10px] font-mono px-2 py-0.5 rounded hover:bg-surface-hover transition-colors"
              style={{
                background: "var(--color-surface)",
                color: "var(--color-muted)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span className="flex items-center gap-1">
                <CountryFlag code={code} size="sm" />
                {c}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Category Tags with Links */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {provider.categories.map((category) => {
          const slug = CATEGORY_TO_SLUG[category] || category.toLowerCase().replace(/\s+/g, '-');
          return (
            <Link
              key={category}
              href={`/categories/${slug}`}
              className="text-[10px] font-mono px-2 py-0.5 rounded hover:bg-surface-hover transition-colors"
              style={{
                background: "var(--color-surface)",
                color: "var(--color-muted)",
                border: "1px solid var(--color-border)",
              }}
            >
              {category}
            </Link>
          );
        })}
      </div>

      {/* Verification Strip */}
      <div className="mt-8">
        <div
          className="w-full px-3 py-2 flex items-center justify-between text-[10px] font-mono"
          style={{
            borderTop: "1px solid var(--color-border)",
            borderBottom: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <div className="flex items-center gap-1.5 text-verified">
            <span className="w-1.5 h-1.5 rounded-full bg-verified" />
            <span>VERIFIED TODAY</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted">
            <span>Operational confidence: {provider.status}</span>
          </div>
          <span className="text-muted-dim">Latency: {api?.latency || 'N/A'}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Documentation and Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Documentation Preview */}
          <DocPreview
            curl={api?.curl ?? ""}
            js={api?.js ?? ""}
            python={api?.python ?? ""}
            go={api?.go ?? ""}
          />

          {/* Pricing */}
          {api?.pricing && api.pricing.length > 0 && (
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest mb-3 text-muted-dim">
                Pricing tiers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {api.pricing.map((p) => (
                    <div
                      key={p.tier}
                      className="p-4 rounded-lg bg-surface border border-border"
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-semibold text-text">
                          {p.tier}
                        </span>
                        <span className="text-sm font-mono text-copper">
                          {p.price}
                        </span>
                      </div>
                      <p className="text-xs mt-1.5 text-muted">
                        {p.note}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-dim">
                Auth Method
              </h3>
              <p className="text-sm font-mono mt-1 text-text">
                {provider.authentication}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-dim">
                Rate Limit
              </h3>
              <p className="text-sm font-mono mt-1 text-text">
                {api?.rateLimit || 'N/A'}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-dim">
                Webhooks
              </h3>
              <p className={`text-sm font-mono mt-1 ${api?.webhookSupport ? "text-verified" : "text-unavailable"}`}>
                {api?.webhookSupport ? "Supported" : "Not Supported"}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-dim">
                Version
              </h3>
              <p className="text-sm font-mono mt-1 text-text">
                {api?.version || 'N/A'}
              </p>
            </div>
          </div>

          {/* Changelog */}
          <ChangelogTimeline changelog={api?.changelog || []} />
          
          {/* Similar APIs - inside left column, after changelog */}
          <SimilarApisTable apis={similarApis} />
        </div>

        {/* Right Sidebar - Quick Facts */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <QuickFacts
            countries={provider.countries}
            categories={provider.categories}
            documentationUrl={provider.documentation}
            officialWebsite={provider.website}
            supportUrl={provider.supportEmail ? `mailto:${provider.supportEmail}` : undefined}
            sandboxUrl={provider.sandboxAvailable ? `https://sandbox.${provider.slug.replace(/-/g, "")}.com` : undefined}
            lastCrawl={provider.lastVerified}
          />
          {/* Report Issue Button */}
          <div className="mt-4">
            <Link
              href={`/contribute/report?provider=${provider.slug}&name=${encodeURIComponent(provider.name)}`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 px-3 py-1.5 h-8 border border-border bg-surface hover:bg-surface-hover text-muted"
            >
              Report Issue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
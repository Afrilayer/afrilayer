export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getApiBySlug, getAllApiSlugs, getAllApis, loadProviderJson } from "@/lib/data";
import { StatusPill, Stamp, DocPreview, ChangelogTimeline, SimilarApisTable, QuickFacts } from "@/components/ui";
import { CountryFlag } from "@/components/ui/CountryFlag";
import type { Metadata } from "next";

// Country name to ISO code mapping
const COUNTRY_TO_CODE: Record<string, string> = {
  'Nigeria': 'NG',
  'South Africa': 'ZA',
  'Ghana': 'GH',
  'Kenya': 'KE',
  'Uganda': 'UG',
  'Tanzania': 'TZ',
  'Egypt': 'EG',
  'Morocco': 'MA',
  "CÃ´te d'Ivoire": 'CI',
  'Senegal': 'SN',
  'Rwanda': 'RW',
  'Tunisia': 'TN',
  'Zambia': 'ZM',
  'Cameroon': 'CM',
};

// Category slug mapping
const CATEGORY_TO_SLUG: Record<string, string> = {
  'Mobile Money': 'mobile-money',
  'Payments': 'payments',
  'KYC': 'kyc',
  'Identity': 'identity',
  'SMS': 'sms',
  'Airtime': 'airtime',
  'Banking': 'banking',
  'Logistics': 'logistics',
  'Government': 'government',
  'Crypto': 'crypto',
  'Maps': 'maps',
  'AI': 'ai',
};

// Generate static params for all providers
export async function generateStaticParams() {
  const slugs = await getAllApiSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const api = await getApiBySlug(slug);
  
  if (!api) {
    return {
      title: 'API Not Found',
    };
  }
  
  return {
    title: api.name,
    description: api.description,
  };
}

export default async function ApiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const api = await getApiBySlug(slug);
  const provider = await loadProviderJson(slug);

  if (!api) {
    return (
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <p className="text-text">API not found</p>
      </div>
    );
  }

  // Get similar APIs from the same category
  const allApis = await getAllApis();
  const similar = allApis.filter((a) => a.category === api.category && a.id !== api.id).slice(0, 2);

  // Use provider data for QuickFacts
  const providerData = provider || {};

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
            <StatusPill status={api.status} />
            <span className="text-[10px] font-mono text-muted-dim">
              uptime {api.uptime}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text">
            {api.name}
          </h1>
          <p className="text-sm mt-1 font-mono text-muted">
            {api.provider} &middot; {api.category}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
            {api.description}
          </p>
        </div>
        <Stamp label={api.status} sublabel={api.lastVerified} />
      </div>

      {/* Logo and Key People Row */}
      <div className="flex items-center gap-6 mt-5 flex-wrap">
        {provider?.logoUrl && (
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface border border-border">
            <Image
              src={provider.logoUrl}
              alt={`${api.provider} logo`}
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        {provider?.keyPeople && provider.keyPeople.length > 0 && (
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
        {api.countries.map((c) => {
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
            <span>Operational confidence: {api.status}</span>
          </div>
          <span className="text-muted-dim">Latency: {api.latency}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Documentation and Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Documentation Preview */}
          <DocPreview
            curl={api.curl}
            js={api.js}
            python={api.python}
            go={api.go}
          />

          {/* Pricing */}
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

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-dim">
                Auth Method
              </h3>
              <p className="text-sm font-mono mt-1 text-text">
                {api.authMethod}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-dim">
                Rate Limit
              </h3>
              <p className="text-sm font-mono mt-1 text-text">
                {api.rateLimit}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-dim">
                Webhooks
              </h3>
              <p className={`text-sm font-mono mt-1 ${api.webhookSupport ? "text-verified" : "text-unavailable"}`}>
                {api.webhookSupport ? "Supported" : "Not Supported"}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-dim">
                Version
              </h3>
              <p className="text-sm font-mono mt-1 text-text">
                {api.version}
              </p>
            </div>
          </div>

          {/* Changelog */}
          <ChangelogTimeline changelog={api.changelog} />
        </div>

        {/* Right Sidebar - Quick Facts */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <QuickFacts
            countries={api.countries}
            categories={[api.category]}
            documentationUrl={provider?.documentation || `https://developers.${api.id.replace(/-/g, "")}.com`}
            officialWebsite={provider?.website || `https://${api.id.replace(/-/g, "")}.com`}
            supportUrl={provider?.supportEmail ? `mailto:${provider.supportEmail}` : undefined}
            sandboxUrl={provider?.sandboxAvailable ? `https://sandbox.${api.id.replace(/-/g, "")}.com` : undefined}
            lastCrawl={provider?.lastVerified || "Recently"}
          />
        </div>
      </div>

      {/* Similar APIs */}
      <SimilarApisTable apis={similar} />
    </div>
  );
}
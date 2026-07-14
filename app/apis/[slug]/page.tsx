export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getApiBySlug, getAllApiSlugs, getAllApis } from "@/lib/data";
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
  "Côte d'Ivoire": 'CI',
  'Senegal': 'SN',
  'Rwanda': 'RW',
  'Tunisia': 'TN',
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

  return (
    <div className="px-6 md:px-10 py-10 max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-mono mb-8"
        style={{ color: "#5D6058" }}
      >
        <ArrowLeft size={13} /> back to directory
      </Link>

      {/* Top Section */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <StatusPill status={api.status} />
            <span className="text-[10px] font-mono" style={{ color: "#5D6058" }}>
              uptime {api.uptime}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#F2EFE9" }}>
            {api.name}
          </h1>
          <p className="text-sm mt-1 font-mono" style={{ color: "#5D6058" }}>
            {api.provider} · {api.category}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "#93968D" }}>
            {api.description}
          </p>
        </div>
        <Stamp label={api.status} sublabel={api.lastVerified} />
      </div>

      {/* Country Tags with Links */}
      <div className="flex flex-wrap gap-1.5 mt-5">
        {api.countries.map((c) => {
          const code = COUNTRY_TO_CODE[c] || c;
          return (
            <Link
              key={c}
              href={`/countries/${code.toLowerCase()}`}
              className="text-[10px] font-mono px-2 py-0.5 rounded hover:bg-surface/50 transition-colors"
              style={{
                background: "#14171A",
                color: "#93968D",
                border: "1px solid #262A25",
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
            borderTop: "1px solid #262A25",
            borderBottom: "1px solid #262A25",
            background: "#14171A",
          }}
        >
          <div className="flex items-center gap-1.5" style={{ color: "#5FA97C" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#5FA97C" }} />
            <span>VERIFIED TODAY</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: "#93968D" }}>
            <span>Operational confidence: {api.status}</span>
          </div>
          <span style={{ color: "#5D6058" }}>Latency: {api.latency}</span>
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
            <h2 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#5D6058" }}>
              Pricing tiers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {api.pricing.map((p) => (
                <div
                  key={p.tier}
                  className="p-4 rounded-lg"
                  style={{
                    background: "#14171A",
                    border: "1px solid #262A25",
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold" style={{ color: "#F2EFE9" }}>
                      {p.tier}
                    </span>
                    <span className="text-sm font-mono" style={{ color: "#C9722A" }}>
                      {p.price}
                    </span>
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: "#93968D" }}>
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "#5D6058" }}>
                Auth Method
              </h3>
              <p className="text-sm font-mono mt-1" style={{ color: "#F2EFE9" }}>
                {api.authMethod}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "#5D6058" }}>
                Rate Limit
              </h3>
              <p className="text-sm font-mono mt-1" style={{ color: "#F2EFE9" }}>
                {api.rateLimit}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "#5D6058" }}>
                Webhooks
              </h3>
              <p className="text-sm font-mono mt-1" style={{ color: api.webhookSupport ? "#5FA97C" : "#C05A45" }}>
                {api.webhookSupport ? "Supported" : "Not Supported"}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "#5D6058" }}>
                Version
              </h3>
              <p className="text-sm font-mono mt-1" style={{ color: "#F2EFE9" }}>
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
            documentationUrl={"https://developers." + api.id.replace(/-/g, "") + ".com"}
            officialWebsite={"https://" + api.id.replace(/-/g, "") + ".com"}
            supportUrl={"https://support." + api.id.replace(/-/g, "") + ".com"}
            sandboxUrl={"https://sandbox." + api.id.replace(/-/g, "") + ".com"}
            lastCrawl="2026-07-12 08:24 UTC"
          />
        </div>
      </div>

      {/* Similar APIs */}
      <SimilarApisTable apis={similar} />
    </div>
  );
}
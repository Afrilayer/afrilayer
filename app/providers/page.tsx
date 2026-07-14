import { getAllProviders } from "@/lib/providers/loader";
import { Badge, ConfidenceIndicator } from "@/components/ui";
import Link from "next/link";

export const revalidate = 3600;

export default async function ProvidersPage() {
  const providers = await getAllProviders();
  
  // Group by provider (unique providers)
  const uniqueProviders = providers.reduce((acc, p) => {
    if (!acc.find(a => a.provider.name === p.provider.name)) {
      acc.push(p);
    }
    return acc;
  }, [] as typeof providers);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-text">
        API Providers
      </h1>
      <p className="mt-2 text-muted max-w-2xl">
        Explore companies building APIs for the African market.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 stagger-children">
        {uniqueProviders.map(({ provider }) => (
          <Link
            key={provider.slug}
            href={`/apis/${provider.slug}`}
            className="rounded-lg border border-border bg-surface p-6 transition-all hover-lift block focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2"
          >
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold text-text">
                {provider.name}
              </h2>
              <Badge variant={provider.verified ? "success" : "default"} className="text-xs">
                {provider.slug}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted">
              {provider.tagline || provider.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <ConfidenceIndicator
                lastVerified={provider.lastVerified}
                verificationStatus={provider.verified ? "verified" : "pending"}
                providerClaimed={false}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
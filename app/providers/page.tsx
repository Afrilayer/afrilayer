import Link from "next/link";
import { getAllProvidersData } from "@/lib/data";

// Redirect to homepage - provider listing is now handled by ApiGrid on homepage
export default async function ProvidersPage() {
  const providers = await getAllProvidersData();
  
  // This page now redirects to homepage
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-text mb-4 font-serif">
        API Providers
      </h1>
      <p className="text-text-muted mb-6">
        Provider listings are now displayed on the homepage.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 text-accent hover:underline">
        Return to homepage →
      </Link>
      
      {/* Debug: list providers for verification */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-text mb-3">Available Providers ({providers.length})</h2>
        <ul className="grid grid-cols-2 gap-2 text-sm text-text-muted">
          {providers.map(p => (
            <li key={p.slug}>
              <Link href={`/apis/${p.slug}`} className="hover:text-accent">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
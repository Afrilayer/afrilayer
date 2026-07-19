"use client";

import Link from "next/link";
import { Github, GitPullRequest, FilePlus, Edit, Bug, Code, FileText, Image, FileCode } from "lucide-react";

const contributionTypes = [
  {
    icon: FilePlus,
    title: "Add a new provider",
    description: "Add a new African API provider to the directory",
  },
  {
    icon: Edit,
    title: "Update provider information",
    description: "Correct or enhance existing provider details",
  },
  {
    icon: Bug,
    title: "Fix documentation links",
    description: "Report or fix broken links in provider docs",
  },
  {
    icon: Code,
    title: "Add SDK information",
    description: "Contribute SDK language support and code samples",
  },
  {
    icon: FileText,
    title: "Improve descriptions",
    description: "Enhance provider descriptions and API summaries",
  },
  {
    icon: Image,
    title: "Add screenshots",
    description: "Add UI screenshots and logo assets",
  },
];

export default function ContributePage() {
  const btnBaseCls = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 px-4 py-2 h-10";
  
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-text mb-4 font-serif">
        Contribute to Afrilayer
      </h1>
      
      <p className="text-xl leading-relaxed text-text-muted mb-12 max-w-2xl">
        Afrilayer is community-driven. Help developers discover and evaluate African APIs 
        by contributing provider data, documentation, and improvements.
      </p>

      {/* Link to CONTRIBUTING.md */}
      <div className="mb-12">
        <Link 
          href="https://github.com/afrilayer/afrilayer/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
        >
          <FileCode size={16} />
          View full contribution guide with step-by-step instructions
        </Link>
      </div>

      {/* Numbered Process Steps - Visual Style */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text mb-8">Your First Contribution in 5 Minutes</h2>
        <div className="space-y-6">
          {[
            { num: 1, title: "Fork the repository", desc: "Click 'Fork' in the top-right corner on GitHub" },
            { num: 2, title: "Clone and install", desc: "git clone https://github.com/afrilayer/afrilayer.git && cd afrilayer && npm install" },
            { num: 3, title: "Copy templates", desc: "Use the provider template as a starting point for your new provider" },
            { num: 4, title: "Preview locally", desc: "npm run dev opens at localhost:3000" },
            { num: 5, title: "Validate and push", desc: "npm run validate && git commit -m 'Add provider' && git push" },
            { num: 6, title: "Open a Pull Request", desc: "Follow the banner on GitHub to 'Compare & pull request'" },
          ].map((step) => (
            <div key={step.num} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-bg flex items-center justify-center font-mono text-sm font-semibold">
                {step.num}
              </div>
              <div>
                <h3 className="text-base font-semibold text-text mb-1">{step.title}</h3>
                <p className="text-sm text-text-muted font-mono">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted-dim mt-4">
          Each step explained in detail in <Link href="/CONTRIBUTING.md" className="text-accent">CONTRIBUTING.md</Link>.
        </p>
      </section>

      {/* Ways to Contribute */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text mb-6">Ways to Contribute</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contributionTypes.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-lg border border-border bg-surface flex gap-4"
            >
              <div className="flex-shrink-0">
                <item.icon size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text mb-1">{item.title}</h3>
                <p className="text-xs text-text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Before/After Comparison for Contribute */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text mb-6">Why Your Contribution Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="p-6 rounded-xl border border-border bg-bg">
            <h3 className="text-sm font-mono uppercase tracking-widest text-text-muted mb-4">Before</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-status-unavailable mt-0.5">×</span>
                <span className="text-sm text-text-muted">API information is incomplete<br /><span className="text-[10px] text-text-muted-dim">No unified source for African APIs</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-unavailable mt-0.5">×</span>
                <span className="text-sm text-text-muted">Developers struggle to find<br /><span className="text-[10px] text-text-muted-dim">Reliable integration points</span></span>
              </li>
            </ul>
          </div>
          
          {/* After */}
          <div className="p-6 rounded-xl border border-accent/40 bg-surface">
            <h3 className="text-sm font-mono uppercase tracking-widest text-accent mb-4">After Your PR</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-status-verified mt-0.5">✓</span>
                <span className="text-sm text-text">API listing is verified<br /><span className="text-[10px] text-text-muted-dim">Available to thousands of developers</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-verified mt-0.5">✓</span>
                <span className="text-sm text-text">Trustworthy infrastructure<br /><span className="text-[10px] text-text-muted-dim">Directory grows stronger</span></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Provider Folder Structure */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text mb-6">Provider Folder Structure</h2>
        
        <div className="p-6 rounded-lg border border-border bg-surface">
          <pre className="text-xs font-mono text-text-muted overflow-x-auto">{`/providers
  /{provider-slug}/
    provider.json     # Required: Core metadata
    README.md         # Required: Documentation
    api.json          # Optional: Code samples, pricing
    /screenshots/    # Optional: UI screenshots
    openapi.yaml      # Optional: OpenAPI spec`}</pre>
        </div>

        <p className="text-xs text-text-muted mt-3">
          Each provider lives in a folder under <code className="text-accent">/providers</code>. 
          Create a folder and open a Pull Request to add a provider.
        </p>
      </section>

      {/* Required Files */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text mb-6">Required Files</h2>
        
        <p className="text-xs text-text-muted mb-4">
          Once you're set up locally, here's what goes in provider.json:
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">provider.json</h3>
            <div className="p-4 rounded-lg border border-border bg-bg">
              <pre className="text-xs font-mono text-text-muted overflow-x-auto">
{`{
  "slug": "provider-name",
  "name": "Provider Name",
  "tagline": "Short provider tagline",
  "description": "Full provider description",
  "website": "https://provider.com",
  "documentation": "https://docs.provider.com",
  "categories": ["Payments"],
  "countries": ["Nigeria", "Ghana"],
  "features": ["Feature 1", "Feature 2"],
  "authentication": "API Key",
  "status": "Live",
  "verified": true,
  "lastVerified": "2026-07-12",
  "lastUpdated": "2026-07-12",
  "pricingModel": "transaction",
  "sandboxAvailable": true,
  "productionReady": true
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text mb-2">README.md</h3>
            <p className="text-xs text-text-muted mb-3">
              Human-readable documentation about the provider's API endpoints, features, and usage.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Report Form */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-text mb-6">Quick Issue Report</h2>
        
        <form action="/api/report-issue" method="POST" className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-text-muted-dim mb-2" htmlFor="provider">
                Provider (Optional)
              </label>
              <input
                type="text"
                id="provider"
                name="provider"
                placeholder="e.g., paystack"
                className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted-dim mb-2" htmlFor="type">
                Issue Type
              </label>
              <select
                id="type"
                name="type"
                className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="general">General Feedback</option>
                <option value="missing-api">Missing API</option>
                <option value="wrong-info">Wrong Information</option>
                <option value="broken-link">Broken Link</option>
                <option value="missing-logo">Missing Logo</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-mono text-text-muted-dim mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the issue or suggestion..."
              required
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted-dim"
            />
          </div>
          
          <div>
            <label className="block text-xs font-mono text-text-muted-dim mb-2" htmlFor="links">
              Supporting Links (Optional)
            </label>
            <input
              type="url"
              id="links"
              name="links"
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted-dim"
            />
          </div>
          
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono bg-text text-bg hover:bg-text/90 transition-colors"
          >
            Submit Report
          </button>
        </form>
      </section>

      {/* CTA Buttons */}
      <section className="flex flex-wrap gap-4">
        <Link
          href="https://github.com/afrilayer/afrilayer"
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBaseCls} bg-accent text-white hover:bg-accent-hover shadow-sm`}
        >
          <Github size={16} />
          View on GitHub
        </Link>
        <Link
          href="https://github.com/afrilayer/afrilayer/issues"
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBaseCls} border border-border bg-surface hover:bg-surface-hover`}
        >
          <Bug size={16} />
          Submit an Issue
        </Link>
        <Link
          href="https://github.com/afrilayer/afrilayer/pulls"
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBaseCls} border border-border bg-surface hover:bg-surface-hover`}
        >
          <GitPullRequest size={16} />
          Create Pull Request
        </Link>
      </section>
    </div>
  );
}
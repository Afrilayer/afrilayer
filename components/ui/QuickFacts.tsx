"use client";

import * as React from "react";
import { Book, Globe, TestTube, HelpCircle, Clock, ExternalLink } from "lucide-react";

interface QuickFactsProps {
  countries: string[];
  categories: string[];
  documentationUrl?: string;
  officialWebsite?: string;
  supportUrl?: string;
  sandboxUrl?: string;
  lastCrawl?: string;
}

export const QuickFacts: React.FC<QuickFactsProps> = ({
  countries,
  categories,
  documentationUrl,
  officialWebsite,
  supportUrl,
  sandboxUrl,
  lastCrawl,
}) => {
  const links = [
    documentationUrl && { label: "Documentation", href: documentationUrl, icon: Book },
    officialWebsite && { label: "Official Website", href: officialWebsite, icon: Globe },
    sandboxUrl && { label: "Sandbox", href: sandboxUrl, icon: TestTube },
    supportUrl && { label: "Support", href: supportUrl, icon: HelpCircle },
  ].filter(Boolean) as { label: string; href: string; icon: React.ElementType }[];

  return (
    <div className="rounded-xl bg-surface border border-border">
      <div className="p-5">
        <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-text-muted">
          Quick Facts
        </h3>

        <dl className="space-y-3">
          {/* Countries */}
          <div>
            <dt className="text-[10px] font-mono text-text-muted">
              Countries
            </dt>
            <dd className="text-sm mt-0.5 text-text">
              {countries.join(", ")}
            </dd>
          </div>

          {/* Categories */}
          <div>
            <dt className="text-[10px] font-mono text-text-muted">
              Categories
            </dt>
            <dd className="text-sm mt-0.5 text-text">
              {categories.join(", ")}
            </dd>
          </div>

          {/* Last Crawl */}
          {lastCrawl && (
            <div>
              <dt className="text-[10px] font-mono text-text-muted">
                Last Crawl
              </dt>
              <dd className="text-sm mt-0.5 flex items-center gap-1.5 text-text-muted">
                <Clock size={10} />
                {lastCrawl}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Links */}
      {links.length > 0 && (
        <div className="border-t border-border">
          <div className="p-5 space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent transition-colors"
                >
                  <Icon size={12} />
                  <span>{link.label}</span>
                  <ExternalLink size={10} className="ml-auto" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickFacts;
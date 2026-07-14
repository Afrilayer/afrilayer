"use client";

import * as React from "react";
import { Book, Globe, TestTube, HelpCircle, Code, ExternalLink, Clock } from "lucide-react";

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
    <div className="rounded-lg" style={{ background: "#14171A", border: "1px solid #262A25" }}>
      <div className="p-4">
        <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#5D6058" }}>
          Quick Facts
        </h3>

        <dl className="space-y-3">
          {/* Countries */}
          <div>
            <dt className="text-[10px] font-mono" style={{ color: "#5D6058" }}>
              Countries
            </dt>
            <dd className="text-sm mt-0.5" style={{ color: "#93968D" }}>
              {countries.join(", ")}
            </dd>
          </div>

          {/* Categories */}
          <div>
            <dt className="text-[10px] font-mono" style={{ color: "#5D6058" }}>
              Categories
            </dt>
            <dd className="text-sm mt-0.5" style={{ color: "#93968D" }}>
              {categories.join(", ")}
            </dd>
          </div>

          {/* Last Crawl */}
          {lastCrawl && (
            <div>
              <dt className="text-[10px] font-mono" style={{ color: "#5D6058" }}>
                Last Crawl
              </dt>
              <dd className="text-sm mt-0.5 flex items-center gap-1.5" style={{ color: "#93968D" }}>
                <Clock size={10} />
                {lastCrawl}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Links */}
      {links.length > 0 && (
        <div className="border-t" style={{ borderTop: "1px solid #262A25" }}>
          <div className="p-4 space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono transition-colors"
                  style={{ color: "#93968D" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#E0A34E")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#93968D")}
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
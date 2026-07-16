"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeProvider";

const navigation = [
  { name: "Categories", href: "/categories" },
  { name: "Countries", href: "/countries" },
  { name: "Providers", href: "/providers" },
  { name: "Changelog", href: "/changelog" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-primary text-bg px-3 py-1 rounded-full text-sm font-mono">
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 backdrop-blur bg-bg/90 border-b border-border">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2" aria-label="Afrilayer home">
              {/* Logo mark: 20x20 inline SVG */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="15" r="2.5" fill="var(--color-text-muted)" />
                <circle cx="15" cy="15" r="2.5" fill="var(--color-text-muted)" />
                <circle cx="10" cy="9" r="3" fill="var(--color-surface-dark, #1E1E1C)" />
                <circle cx="10" cy="9" r="1.2" fill="var(--color-status-verified)" />
              </svg>
              <span className="font-outfit font-semibold tracking-tight text-sm text-text">
                Afrilayer
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-xs font-mono transition-colors",
                    pathname === item.href && "font-semibold text-primary"
                  )}
                  style={{
                    color: pathname === item.href ? "var(--color-primary)" : "var(--color-text-muted)",
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Search button - links to dedicated search page */}
            <Link
              href="/search"
              className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-text-muted hover:text-text transition-colors"
              aria-label="Search APIs and providers"
            >
              <Search size={14} className="text-primary" />
              <span>Search</span>
            </Link>

            <Link
              href="/contribute"
              className="inline-flex items-center gap-1.5 pl-3 pr-4 py-1.5 rounded-full text-xs font-mono bg-primary text-bg hover:bg-primary-hover transition-colors"
            >
              <Plus size={12} />
              Contribute
            </Link>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg md:hidden text-text-muted hover:text-text transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="border-t bg-bg border-t border-border" aria-label="Mobile navigation">
            <div className="max-w-5xl mx-auto px-6 md:px-10 py-4">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-xs font-mono transition-colors",
                      pathname === item.href && "font-semibold text-primary"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/contribute"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus size={12} />
                  Contribute
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
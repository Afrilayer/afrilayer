"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-copper text-bg px-3 py-1 rounded text-sm font-mono">
        Skip to main content
      </a>
      
      <header className="sticky top-0 z-40 backdrop-blur bg-bg/90 border-b border-border">
        <div className="container mx-auto flex h-14 items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2" aria-label="Afrilayer home">
              <span className="w-2 h-2 rounded-full bg-copper" />
              <span className="font-mono font-semibold tracking-tight text-sm text-text">
                Afrilayer
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-xs font-mono transition-colors",
                    pathname === item.href && "font-semibold text-copper"
                  )}
                  style={{
                    color: pathname === item.href ? "var(--color-copper)" : "var(--color-muted)",
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg w-64 max-w-sm bg-surface border border-border">
              <Search size={14} className="text-muted" />
              <input
                placeholder="Search APIs, providers..."
                className="bg-transparent outline-none text-xs w-full font-mono text-text placeholder:text-muted"
                aria-label="Search APIs and providers"
              />
            </div>

            <Link href="/admin/login" className="text-xs font-mono text-muted hover:text-text transition-colors">
              Sign In
            </Link>

            {/* Mobile menu button */}
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg md:hidden text-muted hover:text-text transition-colors"
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
            <div className="container mx-auto px-6 md:px-10 py-4">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-xs font-mono transition-colors",
                      pathname === item.href && "font-semibold text-copper"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

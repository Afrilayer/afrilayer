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
      <header
        className="sticky top-0 z-40 backdrop-blur"
        style={{
          background: "#0B0D0CE6",
          borderBottom: "1px solid #262A25",
        }}
      >
        <div className="container mx-auto flex h-14 items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "#C9722A" }} />
              <span className="font-mono font-semibold tracking-tight text-sm" style={{ color: "#F2EFE9" }}>
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
                    pathname === item.href ? "font-semibold" : ""
                  )}
                  style={{
                    color: pathname === item.href ? "#C9722A" : "#93968D",
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg w-64 max-w-sm"
              style={{
                background: "#14171A",
                border: "1px solid #262A25",
              }}
            >
              <Search size={14} style={{ color: "#5D6058" }} />
              <input
                placeholder="Search APIs, providers..."
                className="bg-transparent outline-none text-xs w-full font-mono"
                style={{ color: "#F2EFE9" }}
              />
            </div>

            <Link href="/admin/login" className="text-xs font-mono" style={{ color: "#5D6058" }}>
              Sign In
            </Link>

            {/* Mobile menu button */}
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg md:hidden"
              style={{ color: "#5D6058" }}
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
          <nav
            className="border-t"
            style={{
              background: "#0B0D0C",
              borderTop: "1px solid #262A25",
            }}
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-6 md:px-10 py-4">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-xs font-mono transition-colors",
                      pathname === item.href ? "font-semibold" : ""
                    )}
                    style={{
                      color: pathname === item.href ? "#C9722A" : "#93968D",
                    }}
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
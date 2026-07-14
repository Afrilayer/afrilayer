"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in production, this would call an API
    if (email && password) {
      // Simulate successful login
      router.push("/admin/dashboard");
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-semibold text-charcoal">Afrilayer</span>
          </Link>
          <p className="mt-2 text-xs font-mono text-charcoal/60 uppercase tracking-widest">
            Admin Console
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-xl border border-sand-100 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-5 w-5 text-baobab-600" />
            <h1 className="text-lg font-semibold text-charcoal">Authentication Required</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal/80" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-sand-100 bg-white px-3 py-2 text-sm focus:border-baobab-600 focus:outline-none focus:ring-1 focus:ring-baobab-600"
                placeholder="admin@afrilayer.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/80" htmlFor="password">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-sand-100 bg-white px-3 py-2 pr-10 text-sm focus:border-baobab-600 focus:outline-none focus:ring-1 focus:ring-baobab-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-error">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-baobab-600 px-4 py-2 text-sm font-medium text-white hover:bg-baobab-700 transition-colors focus:outline-none focus:ring-2 focus:ring-baobab-500"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-charcoal/60">
            Access to verified infrastructure requires authentication.
          </p>
          <Link href="/" className="mt-2 inline-block text-xs text-baobab-600 hover:underline">
            Return to public directory
          </Link>
        </div>
      </div>
    </div>
  );
}
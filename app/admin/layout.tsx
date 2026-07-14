import Link from 'next/link';
import { Home, Database, Tag, Globe, Package } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-sand-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-sand-100">
        <div className="p-6">
          <Link href="/" className="text-xl font-semibold text-charcoal">
            Afrilayer Admin
          </Link>
        </div>
        <nav className="px-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand-100"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/apis"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand-100"
          >
            <Database className="h-4 w-4" />
            APIs
          </Link>
          <Link
            href="/admin/providers"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand-100"
          >
            <Package className="h-4 w-4" />
            Providers
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand-100"
          >
            <Tag className="h-4 w-4" />
            Categories
          </Link>
          <Link
            href="/admin/countries"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-charcoal/70 hover:bg-sand-100"
          >
            <Globe className="h-4 w-4" />
            Countries
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-sand-50">{children}</main>
    </div>
  );
}

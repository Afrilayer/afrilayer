import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Database, Package, Tag, Globe, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total APIs',
      value: '42',
      icon: Database,
      change: '+3 this week',
    },
    {
      title: 'Providers',
      value: '18',
      icon: Package,
      change: '+1 this week',
    },
    {
      title: 'Categories',
      value: '12',
      icon: Tag,
      change: 'No change',
    },
    {
      title: 'Countries',
      value: '15',
      icon: Globe,
      change: 'No change',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>
      <p className="mt-1 text-gray-600 dark:text-gray-400">
        Manage your API listings and platform content.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Add New API</h3>
              <p className="mt-1 text-sm text-gray-600">
                Create a new API listing with full details.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Add Provider</h3>
              <p className="mt-1 text-sm text-gray-600">
                Register a new API provider.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">View Changelog</h3>
              <p className="mt-1 text-sm text-gray-600">
                Check platform updates and changes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Database, Package, Tag, Globe, Activity, Plus, FileText } from 'lucide-react';

const stats = [
  {
    title: 'Total APIs',
    value: '42',
    icon: Database,
    change: '+3 this week',
    changeType: 'positive' as const,
  },
  {
    title: 'Providers',
    value: '18',
    icon: Package,
    change: '+1 this week',
    changeType: 'positive' as const,
  },
  {
    title: 'Categories',
    value: '12',
    icon: Tag,
    change: 'No change',
    changeType: 'neutral' as const,
  },
  {
    title: 'Countries',
    value: '15',
    icon: Globe,
    change: 'No change',
    changeType: 'neutral' as const,
  },
];

// Mock recent activity
const recentActivity = [
  {
    id: 1,
    action: 'API updated',
    target: 'MTN Mobile Money API',
    user: 'Admin',
    time: '2 hours ago',
  },
  {
    id: 2,
    action: 'New provider added',
    target: 'Moniepoint',
    user: 'Admin',
    time: '5 hours ago',
  },
  {
    id: 3,
    action: 'API verified',
    target: 'Paystack API',
    user: 'System',
    time: '1 day ago',
  },
];

// Helper to get change color
function getChangeColor(changeType: 'positive' | 'neutral') {
  if (changeType === 'positive') return 'text-green-600';
  return 'text-gray-500';
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage your API listings and platform content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              <p className="text-xs">
                <span className={getChangeColor(stat.changeType)}>
                  {stat.change}
                </span>
              </p>
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
          <Link href="/admin/apis/new">
            <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                    <Plus className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Add New API
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Create a new API listing with full details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/providers/new">
            <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                    <Package className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Add Provider
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Register a new API provider.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/changelog">
            <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
                    <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      View Changelog
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Check platform updates and changes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <Card className="mt-4">
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                      <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}:{' '}
                        <Link
                          href={`/admin/apis/${activity.id}`}
                          className="text-primary-600 hover:underline dark:text-primary-400"
                        >
                          {activity.target}
                        </Link>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        by {activity.user}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link
                href="/admin/changelog"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                View all activity
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
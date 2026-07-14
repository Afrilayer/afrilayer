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
  if (changeType === 'positive') return 'text-success';
  return 'text-charcoal/60';
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-charcoal">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-charcoal/70">
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
              <stat.icon className="h-4 w-4 text-charcoal/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
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
        <h2 className="text-lg font-semibold text-charcoal">
          Quick Actions
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 stagger-children">
          <Link href="/admin/apis/new">
            <Card className="h-full transition-all hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-baobab-100">
                    <Plus className="h-5 w-5 text-baobab-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">
                      Add New API
                    </h3>
                    <p className="mt-1 text-sm text-charcoal/70">
                      Create a new API listing with full details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/providers/new">
            <Card className="h-full transition-all hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-baobab-100">
                    <Package className="h-5 w-5 text-baobab-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">
                      Add Provider
                    </h3>
                    <p className="mt-1 text-sm text-charcoal/70">
                      Register a new API provider.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/changelog">
            <Card className="h-full transition-all hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-baobab-100">
                    <FileText className="h-5 w-5 text-baobab-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">
                      View Changelog
                    </h3>
                    <p className="mt-1 text-sm text-charcoal/70">
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
        <h2 className="text-lg font-semibold text-charcoal">
          Recent Activity
        </h2>
        <Card className="mt-4">
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-100">
                      <Activity className="h-4 w-4 text-charcoal/60" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {activity.action}:{' '}
                        <Link
                          href={`/admin/apis/${activity.id}`}
                          className="text-baobab-600 hover:underline"
                        >
                          {activity.target}
                        </Link>
                      </p>
                      <p className="text-xs text-charcoal/60">
                        by {activity.user}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-charcoal/60">
                    {activity.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link
                href="/admin/changelog"
                className="text-sm font-medium text-baobab-600 hover:text-baobab-700 transition-colors"
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

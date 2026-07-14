import * as React from 'react';
import { Search, Plus, Folder, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = {
  search: Search,
  plus: Plus,
  folder: Folder,
  alert: AlertCircle,
};

export interface EmptyStateProps {
  icon?: 'search' | 'plus' | 'folder' | 'alert';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon = 'folder', title, description, action, className }, ref) => {
    const Icon = icons[icon];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center rounded-xl border border-sand-100 bg-white p-12 text-center',
          className
        )}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sand-100">
          <Icon className="h-8 w-8 text-charcoal/50" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-charcoal">
          {title}
        </h3>
        {description && (
          <p className="mb-6 max-w-md text-sm text-charcoal/70">
            {description}
          </p>
        )}
        {action && (
          <div>
            {action.href ? (
              <a
                href={action.href}
                className="inline-flex items-center justify-center rounded-lg bg-baobab-600 px-4 py-2 text-sm font-medium text-white hover:bg-baobab-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-baobab-600 focus-visible:ring-offset-2"
              >
                {action.label}
              </a>
            ) : (
              <button
                onClick={action.onClick}
                className="inline-flex items-center justify-center rounded-lg bg-baobab-600 px-4 py-2 text-sm font-medium text-white hover:bg-baobab-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-baobab-600 focus-visible:ring-offset-2"
              >
                {action.label}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';

export { EmptyState };
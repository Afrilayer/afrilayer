import * as React from 'react';
import { cn } from '@/lib/utils';

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('animate-shimmer rounded-lg bg-sand-200', className)}
    {...props}
  />
));
Skeleton.displayName = 'Skeleton';

// Predefined skeleton components for common patterns

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-sand-100 bg-white p-6">
      <Skeleton className="mb-3 h-6 w-3/4" />
      <Skeleton className="mb-2 h-4 w-1/2" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" style={{ width: `${100 - i * 10}%` }} />
      ))}
    </div>
  );
}

function SkeletonAvatar() {
  return <Skeleton className="h-12 w-12 rounded-full" />;
}

function SkeletonButton() {
  return <Skeleton className="h-9 w-24 rounded-md" />;
}

function SkeletonSearchBar() {
  return <Skeleton className="h-10 w-full rounded-md" />;
}

export {
  Skeleton,
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonSearchBar,
};
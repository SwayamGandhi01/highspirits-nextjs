import { Skeleton } from '@/components/ui/skeleton';

interface MenuItemSkeletonProps {
  count?: number;
}

export function MenuItemSkeleton({ count = 6 }: MenuItemSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="glass-effect rounded-lg md:rounded-xl overflow-hidden border-2 border-accent p-4 md:p-6 space-y-4">
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
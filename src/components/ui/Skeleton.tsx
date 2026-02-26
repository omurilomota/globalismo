import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200 dark:bg-gray-700', className)}
      aria-hidden="true"
    />
  );
}

export function ArticleCardSkeleton() {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </article>
  );
}

export function ArticleHeroSkeleton() {
  return (
    <section className="relative text-white rounded-xl overflow-hidden mb-10 bg-gray-200 dark:bg-gray-700">
      <div className="relative z-10 px-6 py-12 md:py-16">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>
        <Skeleton className="h-10 w-3/4 mb-3" />
        <Skeleton className="h-6 w-full mb-5" />
        <Skeleton className="h-6 w-2/3 mb-5" />
        <div className="flex gap-4 mb-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-10 w-32 rounded" />
      </div>
    </section>
  );
}

export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')} 
        />
      ))}
    </div>
  );
}

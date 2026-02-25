import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CategoryTagProps {
  category: string;
  size?: 'sm' | 'md';
  isActive?: boolean;
}

export default function CategoryTag({ category, size = 'sm', isActive = false }: CategoryTagProps) {
  const baseClasses = size === 'sm' 
    ? 'px-2.5 py-0.5 text-xs' 
    : 'px-3 py-1 text-sm';
  
  const href = category.toLowerCase() === 'todas' ? '/artigos' : `/artigos?categoria=${encodeURIComponent(category.toLowerCase())}`;
  
  return (
    <Link 
      href={href}
      className={cn(
        baseClasses,
        'rounded font-medium transition-colors inline-block',
        isActive
          ? 'bg-blue-900 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-900 dark:hover:text-blue-300'
      )}
    >
      {category}
    </Link>
  );
}

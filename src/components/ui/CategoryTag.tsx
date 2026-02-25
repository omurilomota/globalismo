import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CategoryTagProps {
  category: string;
  size?: 'sm' | 'md';
  isActive?: boolean;
}

export default function CategoryTag({ category, size = 'sm', isActive = false }: CategoryTagProps) {
  const baseClasses = size === 'sm' 
    ? 'px-2 py-1 text-xs' 
    : 'px-3 py-1.5 text-sm';
  
  const href = category === 'Todas' ? '/artigos' : `/artigos?categoria=${encodeURIComponent(category.toLowerCase())}`;
  
  return (
    <Link 
      href={href}
      className={cn(
        baseClasses,
        'rounded-full transition-colors',
        isActive 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      )}
    >
      {category}
    </Link>
  );
}

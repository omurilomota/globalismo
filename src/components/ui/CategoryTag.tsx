import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CategoryTagProps {
  category: string;
  size?: 'sm' | 'md';
  isActive?: boolean;
}

const categoryEmojis: Record<string, string> = {
  'todas': '📚',
  'economia': '💰',
  'política': '🏛️',
  'politica': '🏛️',
  'cultura': '🎭',
  'geopolítica': '📡',
  'geopolitica': '📡',
  'filosofia': '🤔',
  'mídia': '📺',
  'midia': '📺',
};

const categoryColors: Record<string, string> = {
  economia: 'from-amber-500 to-orange-500 hover:shadow-amber-500/25',
  política: 'from-indigo-500 to-blue-500 hover:shadow-indigo-500/25',
  politica: 'from-indigo-500 to-blue-500 hover:shadow-indigo-500/25',
  cultura: 'from-pink-500 to-rose-500 hover:shadow-pink-500/25',
  geopolítica: 'from-cyan-500 to-teal-500 hover:shadow-cyan-500/25',
  geopolitica: 'from-cyan-500 to-teal-500 hover:shadow-cyan-500/25',
  filosofia: 'from-violet-500 to-purple-500 hover:shadow-violet-500/25',
  mídia: 'from-red-500 to-pink-500 hover:shadow-red-500/25',
  midia: 'from-red-500 to-pink-500 hover:shadow-red-500/25',
};

export default function CategoryTag({ category, size = 'sm', isActive = false }: CategoryTagProps) {
  const baseClasses = size === 'sm' 
    ? 'px-2.5 py-1 text-xs' 
    : 'px-4 py-2 text-sm';
  
  const emoji = categoryEmojis[category.toLowerCase()] || '📌';
  const href = category.toLowerCase() === 'todas' ? '/artigos' : `/artigos?categoria=${encodeURIComponent(category.toLowerCase())}`;
  const colorClass = categoryColors[category.toLowerCase()] || 'from-indigo-500 to-purple-500 hover:shadow-indigo-500/25';
  
  return (
    <Link 
      href={href}
      className={cn(
        baseClasses,
        'rounded-full font-medium transition-all duration-300 flex items-center gap-1.5',
        isActive
          ? 'bg-gradient-to-r ' + colorClass + ' text-white shadow-lg'
          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r ' + colorClass + ' hover:text-white hover:shadow-lg border border-slate-200 dark:border-slate-700'
      )}
    >
      <span className="text-base">{emoji}</span>
      <span>{category}</span>
    </Link>
  );
}

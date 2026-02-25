import Link from 'next/link';

interface CategoryTagProps {
  category: string;
  size?: 'sm' | 'md';
}

export default function CategoryTag({ category, size = 'sm' }: CategoryTagProps) {
  const baseClasses = size === 'sm' 
    ? 'px-2 py-1 text-xs' 
    : 'px-3 py-1.5 text-sm';
  
  const href = category === 'Todas' ? '/artigos' : `/artigos?categoria=${category.toLowerCase()}`;
  
  return (
    <Link 
      href={href}
      className={`${baseClasses} bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors`}
    >
      {category}
    </Link>
  );
}

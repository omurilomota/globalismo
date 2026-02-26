import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav 
      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6"
      aria-label="Navegação estrutural"
    >
      <Link 
        href="/"
        className="flex items-center hover:text-blue-900 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 rounded px-1"
        aria-label="Página inicial"
      >
        <Home className="w-4 h-4" aria-hidden="true" />
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" aria-hidden="true" />
          {index === items.length - 1 ? (
            <span className="font-medium text-gray-900 dark:text-gray-200" aria-current="page">
              {item.name}
            </span>
          ) : (
            <Link 
              href={item.href}
              className="hover:text-blue-900 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 rounded px-1"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

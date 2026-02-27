'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  slug: string;
  titulo: string;
  resumo: string;
}

interface SearchWithHighlightProps {
  results?: SearchResult[];
  onSearch?: (query: string) => void;
}

export default function SearchWithHighlight({ results = [], onSearch }: SearchWithHighlightProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
    setIsOpen(value.length > 0);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const highlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-500/30 text-inherit px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar artigos..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors text-sm"
          aria-label="Buscar artigos"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <Link
              key={result.slug}
              href={`/artigos/${result.slug}`}
              onClick={() => setIsOpen(false)}
              className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <h4 
                className="font-medium text-gray-900 dark:text-white text-sm mb-1"
                dangerouslySetInnerHTML={{ 
                  __html: highlightedText(result.titulo, query) 
                }}
              />
              <p 
                className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"
                dangerouslySetInnerHTML={{ 
                  __html: highlightedText(result.resumo, query) 
                }}
              />
            </Link>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Nenhum resultado encontrado para &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/artigos?busca=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative" role="search">
      <label htmlFor="search-input" className="sr-only">
        Buscar artigos
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar artigos..."
        className="w-full px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full focus:bg-white dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 transition-colors text-gray-900 dark:text-white placeholder-gray-500"
        aria-label="Buscar artigos"
      />
      <svg 
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </form>
  );
}

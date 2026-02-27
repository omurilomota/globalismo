'use client';

import { Printer, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface ArticleActionsProps {
  slug: string;
}

export default function ArticleActions({ slug }: ArticleActionsProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  const handlePrint = () => {
    window.print();
  };

  const favorite = isFavorite(slug);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Imprimir artigo"
      >
        <Printer className="w-4 h-4" />
        <span className="hidden sm:inline">Imprimir</span>
      </button>
      
      {isLoaded && (
        <button
          onClick={() => toggleFavorite(slug)}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
            favorite 
              ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' 
              : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          <span className="hidden sm:inline">{favorite ? 'Favorito' : 'Favoritar'}</span>
        </button>
      )}
    </div>
  );
}

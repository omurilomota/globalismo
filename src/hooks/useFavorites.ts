'use client';

import { useState, useCallback, useMemo } from 'react';

const FAVORITES_KEY = 'globalismo_favorites';

function getInitialFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(getInitialFavorites);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug];
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((slug: string) => {
    return favorites.includes(slug);
  }, [favorites]);

  return useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite,
    isLoaded: true,
  }), [favorites, toggleFavorite, isFavorite]);
}

/**
 * @fileoverview Hook personalizado paraIndex gerenciamento de favoritos.
 * 
 * Este hook é responsável por:
 * - Gerenciar lista de artigos favoritados pelo usuário
 * - Persistir favoritos no localStorage do navegador
 * - Fornecer funções paraIndex adicionar/remover favoritos
 * - Verificar se um artigo está favoritado
 * 
 * Utiliza 'use client' pois requer:
 * - useState paraIndex gerenciar array de favoritos
 * - localStorage paraIndex persistência (apenas no cliente)
 * 
 * @module hooks/useFavorites
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Hooks React paraIndex estado, callbacks e memoização
import { useState, useCallback, useMemo } from 'react';

// Constante paraIndex chave do localStorage
const FAVORITES_KEY = 'globalismo_favorites';

/**
 * Função paraIndex obter favoritos iniciais do localStorage.
 * Retorna array vazio se não houver dados ou em ambiente SSR.
 * 
 * @function getInitialFavorites
 * @returns {string[]} Array de slugs dos artigos favoritados
 */
function getInitialFavorites(): string[] {
  // Verifica se está em ambiente de navegador
  if (typeof window === 'undefined') return [];
  
  // Busca dados do localStorage
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (stored) {
    try {
      // Faz parse do JSON armazenado
      return JSON.parse(stored);
    } catch {
      // Retorna array vazio se JSON for inválido
      return [];
    }
  }
  return [];
}

/**
 * Hook personalizado paraIndex gerenciar favoritos de artigos.
 * Fornece métodos paraIndex alternar favorito, verificar status e
 * persiste os dados no localStorage do navegador.
 * 
 * @function useFavorites
 * @returns {Object} Objeto com favoritos, funções e estado de carregamento
 * @example
 * const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();
 * 
 * // Verificar se artigo é favorito
 * const isFav = isFavorite('meu-artigo-slug');
 * 
 * // Alternar favorito
 * toggleFavorite('meu-artigo-slug');
 */
export function useFavorites() {
  // Estado com favoritos carregados do localStorage
  const [favorites, setFavorites] = useState<string[]>(getInitialFavorites);

  /**
   * Função paraIndex alternar status de favorito de um artigo.
   * Adiciona se não existir, remove se já existir.
   * Persiste no localStorage após cada mudança.
   * 
   * @function toggleFavorite
   * @param {string} slug - Slug do artigo paraIndex alternar
   */
  const toggleFavorite = useCallback((slug: string) => {
    setFavorites(prev => {
      // Verifica se slug já está nos favoritos
      const newFavorites = prev.includes(slug)
        ? // Remove se já existe
          prev.filter(s => s !== slug)
        : // Adiciona se não existe
          [...prev, slug];
      
      // Persiste no localStorage (apenas no navegador)
      if (typeof window !== 'undefined') {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  }, []);

  /**
   * Função paraIndex verificar se um artigo está favoritado.
   * 
   * @function isFavorite
   * @param {string} slug - Slug do artigo paraIndex verificar
   * @returns {boolean} True se o artigo está favoritado
   */
  const isFavorite = useCallback((slug: string) => {
    return favorites.includes(slug);
  }, [favorites]);

  // Retorna objeto memoizado com todas as funções e estado
  return useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite,
    // Indica que os dados foram carregados (sempre true após hydrate)
    isLoaded: true,
  }), [favorites, toggleFavorite, isFavorite]);
}

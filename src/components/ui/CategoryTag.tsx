/**
 * @fileoverview Componente de tag/link para categorias de artigos.
 * 
 * Este componente é responsável por:
 * - Exibir categoria como tag clicável
 * - Suportar dois tamanhos (pequeno e médio)
 * - Indicar visualmente se a categoria está ativa
 * - Gerar link para filtrar artigos por categoria
 * 
 * Este é um componente server-side (sem 'use client') pois
 * não requer estado local - apenas renderiza links.
 * 
 * @module components/ui/CategoryTag
 * @author Globalismo
 * @version 1.0.0
 */

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Interface de props do componente
interface CategoryTagProps {
  // Nome da categoria a ser exibida
  category: string;
  // Tamanho da tag: 'sm' (pequeno) ou 'md' (médio)
  size?: 'sm' | 'md';
  // Indica se a categoria está ativa (selecionada)
  isActive?: boolean;
}

/**
 * Componente de tag de categoria.
 * Renderiza um link para filtrar artigos pela categoria especificada.
 * Suporta dois tamanhos e estado ativo para destaque visual.
 * 
 * Usando memo para evitar re-renders desnecessários em listas.
 * 
 * @component
 * @param {CategoryTagProps} props - Props contendo categoria, tamanho e estado ativo
 * @returns {JSX.Element} Tag de categoria como link
 */
const CategoryTag = memo(function CategoryTag({ category, size = 'sm', isActive = false }: CategoryTagProps) {
  // Define classes base de tamanho
  const baseClasses = size === 'sm' 
    ? 'px-2.5 py-0.5 text-xs' 
    : 'px-3 py-1 text-sm';
  
  // Gera URL para a página de artigos com filtro de categoria
  // "Todas" redireciona para página sem filtro
  const href = category.toLowerCase() === 'todas' 
    ? '/artigos' 
    : `/artigos?categoria=${encodeURIComponent(category.toLowerCase())}`;
  
  return (
    <Link 
      href={href}
      // Aplica classes condicionais baseadas no estado ativo
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
});

export default CategoryTag;

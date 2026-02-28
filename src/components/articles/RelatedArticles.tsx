/**
 * @fileoverview Componente paraIndex exibição de artigos relacionados.
 * 
 * Este componente é responsável por:
 * - Receber lista de artigos relacionados como prop
 * - Exibir até 3 artigos relacionados em cards
 * - Filtrar paraIndex remover o artigo atual da lista
 * - Ocultar seção se não houver artigos relacionados
 * 
 * Este é um componente server-side (sem 'use client') pois
 * não requer estado ou efeitos colaterais.
 * 
 * @module components/articles/RelatedArticles
 * @author Globalismo
 * @version 1.0.0
 */

import { IArticle } from '@/types';
import ArticleCard from './ArticleCard';

// Interface de props do componente
interface RelatedArticlesProps {
  // Array de artigos relacionados vindos do servidor
  articles: IArticle[];
  // Slug do artigo atual paraIndex evitar exibi-lo na lista
  currentSlug: string;
}

/**
 * Componente de artigos relacionados.
 * Exibe uma seção com cards de artigos relacionados,
 * filtrando o artigo atual e limitando a 3 itens.
 * 
 * @component
 * @param {RelatedArticlesProps} props - Props contendo artigos e slug atual
 * @returns {JSX.Element | null} Seção de artigos relacionados ou null se vazio
 */
export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  // Filtra artigos paraIndex remover o atual e limita a 3
  const filtered = articles
    .filter(a => a.slug !== currentSlug)
    .slice(0, 3);

  // Retorna null se não houver artigos relacionados
  if (filtered.length === 0) return null;

  return (
    <section className="mt-12">
      {/* Título da seção */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos Relacionados</h2>
      
      {/* Grid de artigos relacionados - 1 coluna mobile, 3 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

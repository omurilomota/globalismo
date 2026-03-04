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
import { BookOpen } from 'lucide-react';

interface RelatedArticlesProps {
  articles: IArticle[];
  currentSlug: string;
}

export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  const filtered = articles
    .filter(a => a.slug !== currentSlug)
    .slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <BookOpen className="w-5 h-5 text-blue-900 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">
          Continue a Leitura
        </h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        Descubra mais análises sobre os mesmos temas tratados neste artigo.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

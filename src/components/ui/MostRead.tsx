/**
 * @fileoverview Widget de Artigos Mais Lidos.
 *
 * Este componente exibe os 5 artigos com mais visualizações.
 *
 * @module components/ui/MostRead
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Clock } from 'lucide-react';

interface Article {
  id: string;
  titulo: string;
  slug: string;
  visualizacoes: number;
  tempoLeitura: number;
}

export default function MostRead() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/views?top=5')
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar artigos mais lidos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-900 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mais Lidos</h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Carregando...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-900 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mais Lidos</h3>
      </div>

      <div className="space-y-3">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={`/artigos/${article.slug}`}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors group"
          >
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-900 dark:bg-blue-700 text-white text-xs font-bold rounded-full">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-300 line-clamp-2">
                {article.titulo}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {article.visualizacoes} visualizações
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.tempoLeitura} min
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * @fileoverview Componente de cartão paraIndex exibição de artigo em listas.
 * 
 * Este componente é responsável por:
 * - Exibir artigo em formato de cartão compacto
 * - Mostrar imagem de capa, título, resumo e metadados
 * - Fornecer link paraIndex a página completa do artigo
 * - Suportar modo claro/escuro via Tailwind
 * 
 * Utilizado em listas de artigos como na home e página de artigos.
 * 
 * @module components/articles/ArticleCard
 * @author Globalismo
 * @version 1.0.0
 */

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IArticle } from '@/types';
import { formatDate } from '@/lib/utils';
import { Clock, User } from 'lucide-react';

// Interface de props do componente
interface ArticleCardProps {
  // Artigo a ser exibido no cartão
  article: IArticle;
}

/**
 * Componente de cartão para exibição de artigo em listas.
 * Apresenta artigo em formato visual compacto com imagem, título,
 * resumo e metadados. Inclui efeitos de hover.
 * 
 * Usando memo para evitar re-renders desnecessários quando
 * a lista de artigos é re-renderizada.
 * 
 * @component
 * @param {ArticleCardProps} props - Props contendo o artigo a ser exibido
 * @returns {JSX.Element} Cartão de artigo renderizado
 */
const ArticleCard = memo(function ArticleCard({ article }: ArticleCardProps) {
  return (
    // Container do cartão com bordas e efeito hover
    <article className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 card-hover" suppressHydrationWarning>
      {/* Link para a imagem de capa (envolve toda a imagem) */}
      <Link href={`/artigos/${article.slug}`}>
        {/* Container com aspecto 16:9 para a imagem */}
        <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700">
          {/* Verifica se existe imagem de capa */}
          {article.imagemCapa ? (
            <Image
              src={article.imagemCapa}
              alt={article.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // Placeholder com ícone quando não há imagem
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-4xl">🌐</span>
            </div>
          )}
        </div>
      </Link>
      
      {/* Container do conteúdo textual do cartão */}
      <div className="p-4">
        {/* Categorias do artigo */}
        <div className="flex flex-wrap gap-2 mb-2">
          {article.categorias.map((categoria) => (
            <span 
              key={categoria}
              className="px-2 py-0.5 text-xs font-medium rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            >
              {categoria}
            </span>
          ))}
        </div>
        
        {/* Título do artigo como link */}
        <Link href={`/artigos/${article.slug}`}>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors line-clamp-2 font-serif">
            {article.titulo}
          </h2>
        </Link>
        
        {/* Resumo do artigo com limite de linhas */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {article.resumo}
        </p>
        
        {/* Metadados: autor, tempo de leitura, data */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {article.autor}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.tempoLeitura} min
            </span>
            <span>{formatDate(article.dataPublicacao)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function para otimizar re-renders
  return prevProps.article.id === nextProps.article.id &&
    prevProps.article.titulo === nextProps.article.titulo;
});

export default ArticleCard;

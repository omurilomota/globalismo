import Link from 'next/link';
import Image from 'next/image';
import { IArticle } from '@/types';
import { formatDate } from '@/lib/utils';
import { Clock, User } from 'lucide-react';

interface ArticleCardProps {
  article: IArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 card-hover">
      <Link href={`/artigos/${article.slug}`}>
        <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700">
          {article.imagemCapa ? (
            <Image
              src={article.imagemCapa}
              alt={article.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-4xl">🌐</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
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
        
        <Link href={`/artigos/${article.slug}`}>
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors line-clamp-2 font-serif">
            {article.titulo}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {article.resumo}
        </p>
        
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
}

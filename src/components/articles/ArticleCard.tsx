import Link from 'next/link';
import { IArticle } from '@/types';
import { formatDate } from '@/lib/utils';
import CategoryTag from '@/components/ui/CategoryTag';

interface ArticleCardProps {
  article: IArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/artigos/${article.slug}`}>
        <div className="aspect-video bg-gray-100 relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.categorias.slice(0, 2).map((categoria) => (
            <CategoryTag key={categoria} category={categoria} />
          ))}
        </div>
        
        <Link href={`/artigos/${article.slug}`}>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors line-clamp-2">
            {article.titulo}
          </h2>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.resumo}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{article.autor}</span>
          <div className="flex items-center gap-3">
            <span>{formatDate(article.dataPublicacao)}</span>
            <span>{article.tempoLeitura} min</span>
          </div>
        </div>
      </div>
    </article>
  );
}

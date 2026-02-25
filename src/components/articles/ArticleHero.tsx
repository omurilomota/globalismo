import Link from 'next/link';
import { IArticle } from '@/types';
import { formatDate } from '@/lib/utils';

interface ArticleHeroProps {
  article: IArticle;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <section className="relative bg-gray-900 text-white rounded-xl overflow-hidden mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
        <svg className="w-24 h-24 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <div className="relative z-20 max-w-3xl px-8 py-16">
        <div className="flex flex-wrap gap-2 mb-4">
          {article.categorias.map((categoria) => (
            <span 
              key={categoria}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
            >
              {categoria}
            </span>
          ))}
        </div>
        
        <Link href={`/artigos/${article.slug}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 hover:text-gray-200 transition-colors">
            {article.titulo}
          </h1>
        </Link>
        
        <p className="text-gray-300 text-lg mb-6 line-clamp-3">
          {article.resumo}
        </p>
        
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <span>{article.autor}</span>
          <span>•</span>
          <span>{formatDate(article.dataPublicacao)}</span>
          <span>•</span>
          <span>{article.tempoLeitura} min de leitura</span>
        </div>
      </div>
    </section>
  );
}

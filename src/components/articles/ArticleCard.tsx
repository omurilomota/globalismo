import Link from 'next/link';
import Image from 'next/image';
import { IArticle } from '@/types';
import { formatDate } from '@/lib/utils';
import { Clock, User, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: IArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 card-hover">
      <Link href={`/artigos/${article.slug}`}>
        <div className="aspect-video relative overflow-hidden">
          {article.imagemCapa ? (
            <Image
              src={article.imagemCapa}
              alt={article.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-6xl">🌐</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-medium">
              Ler artigo <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.categorias.map((categoria, idx) => (
            <span 
              key={categoria}
              className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                idx === 0 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
              }`}
            >
              {categoria}
            </span>
          ))}
        </div>
        
        <Link href={`/artigos/${article.slug}`}>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 font-serif">
            {article.titulo}
          </h2>
        </Link>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {article.resumo}
        </p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            {article.autor}
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.tempoLeitura} min
            </span>
            <span>{formatDate(article.dataPublicacao)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

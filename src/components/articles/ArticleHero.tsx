/**
 * @fileoverview Componente de destaque/herói para artigos em destaque.
 * 
 * @module components/articles/ArticleHero
 * @author Globalismo
 * @version 1.0.0
 */

import Link from 'next/link';
import Image from 'next/image';
import { IArticle } from '@/types';
import { formatDate } from '@/lib/utils';
import { Clock, User, ArrowRight } from 'lucide-react';

interface ArticleHeroProps {
  article: IArticle;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <section className="relative text-white rounded-xl overflow-hidden mb-10 group">
      <div className="absolute inset-0">
        {article.imagemCapa ? (
          <Image
            src={article.imagemCapa}
            alt={article.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 px-6 py-12 md:py-16">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.categorias.map((categoria) => (
            <span 
              key={categoria}
              className="px-2.5 py-1 text-xs font-medium bg-white/20 rounded"
            >
              {categoria}
            </span>
          ))}
        </div>
        
        <Link href={`/artigos/${article.slug}`}>
          <h1 className="text-2xl md:text-4xl font-bold mb-3 hover:text-gray-200 transition-colors font-serif leading-tight max-w-3xl">
            {article.titulo}
          </h1>
        </Link>
        
        <p className="text-gray-300 text-base mb-5 line-clamp-3 max-w-2xl">
          {article.resumo}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {article.autor}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.tempoLeitura} min de leitura
          </span>
          <time>
            {formatDate(article.dataPublicacao)}
          </time>
        </div>

        <Link 
          href={`/artigos/${article.slug}`}
          className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-white text-blue-900 font-medium rounded hover:bg-gray-100 transition-colors"
        >
          Ler artigo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

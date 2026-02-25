import Link from 'next/link';
import Image from 'next/image';
import { IArticle } from '@/types';
import { formatDate } from '@/lib/utils';
import { Clock, User, ArrowRight, Star } from 'lucide-react';

interface ArticleHeroProps {
  article: IArticle;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <section className="relative text-white rounded-2xl overflow-hidden mb-12 group">
      <div className="absolute inset-0">
        {article.imagemCapa ? (
          <Image
            src={article.imagemCapa}
            alt={article.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 px-8 py-16 md:py-20">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-slate-900 text-sm font-bold rounded-full">
            <Star className="w-4 h-4 fill-current" /> Destaque
          </span>
          {article.categorias.map((categoria) => (
            <span 
              key={categoria}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
            >
              {categoria}
            </span>
          ))}
        </div>
        
        <Link href={`/artigos/${article.slug}`}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 hover:text-amber-400 transition-colors font-serif leading-tight max-w-3xl">
            ✨ {article.titulo}
          </h1>
        </Link>
        
        <p className="text-slate-300 text-lg mb-6 line-clamp-3 max-w-2xl leading-relaxed">
          {article.resumo}
        </p>
        
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            <span className="font-medium">{article.autor}</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>{article.tempoLeitura} min de leitura</span>
          </span>
          <time className="text-slate-400">
            {formatDate(article.dataPublicacao)}
          </time>
        </div>

        <Link 
          href={`/artigos/${article.slug}`}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
        >
          Ler artigo completo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

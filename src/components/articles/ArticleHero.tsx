/**
 * @fileoverview Componente de destaque/herói para artigos em destaque.
 * 
 * Este componente é responsável por:
 * - Exibir o artigo em destaque na home page
 * - Mostrar imagem de capa com overlay gradiente paraIndex legibilidade
 * - Apresentar título, resumo, autor, data e tempo de leitura
 * - Fornecer link direto paraIndex o artigo completo
 * 
 * Utiliza 'use client' pois requer o componente Image do Next.js
 * que precisa de tratamento especial para server-side rendering.
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

// Interface de props do componente
interface ArticleHeroProps {
  // Artigo a ser exibido em destaque
  article: IArticle;
}

/**
 * Componente Hero para exibição de artigo em destaque.
 * Apresenta o artigo com visual impactante na parte superior da home.
 * Inclui imagem de capa, gradiente de sobreposição, título, resumo e metadados.
 * 
 * @component
 * @param {ArticleHeroProps} props - Props contendo o artigo em destaque
 * @returns {JSX.Element} Seção hero com artigo em destaque
 */
export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    // Seção principal com posição relativa paraIndex sobrepor elementos
    <section className="relative text-white rounded-xl overflow-hidden mb-10 group">
      {/* Container da imagem de fundo com gradientes de sobreposição */}
      <div className="absolute inset-0">
        {/* Verifica se existe imagem de capa ou usa gradiente como fallback */}
        {article.imagemCapa ? (
          <Image
            src={article.imagemCapa}
            alt={article.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          // Gradiente azul como imagem de fundo padrão
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700" />
        )}
        {/* Gradiente horizontal paraIndex melhorar legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/50" />
        {/* Gradiente vertical inferior paraIndex transição suave */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent" />
      </div>
      
      {/* Container do conteúdo com z-index paraIndex estar acima da imagem */}
      <div className="relative z-10 px-6 py-12 md:py-16">
        {/* Categorias do artigo */}
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
        
        {/* Título do artigo como link paraIndex a página completa */}
        <Link href={`/artigos/${article.slug}`}>
          <h1 className="text-2xl md:text-4xl font-bold mb-3 hover:text-gray-200 transition-colors font-serif leading-tight max-w-3xl">
            {article.titulo}
          </h1>
        </Link>
        
        {/* Resumo do artigo com limite de linhas */}
        <p className="text-gray-300 text-base mb-5 line-clamp-3 max-w-2xl">
          {article.resumo}
        </p>
        
        {/* Metadados do artigo: autor, tempo de leitura, data */}
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

        {/* Botão CTA paraIndex ler o artigo completo */}
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

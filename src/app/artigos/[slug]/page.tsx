/**
 * @fileoverview Página individual de artigo do blog Globalismo.
 * 
 * Esta página é responsável por:
 * - Exibir conteúdo completo de um artigo específico
 * - Renderizar metadados SEO (OpenGraph, Twitter Cards, canonical)
 * - Mostrar artigos relacionados baseados em categorias/tags
 * - Fornecer navegação de volta para listagem de artigos
 * - Sanitizar conteúdo HTML para previnir XSS (no servidor)
 * 
 * Utiliza Static Site Generation (SSG) do Next.js para geração
 * estática de todas as páginas de artigos em build time.
 * 
 * @module app/artigos/[slug]/page
 * @author Globalismo
 * @version 1.0.0
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, getRelatedArticles, getCanonicalUrl } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import { sanitizeArticle } from '@/lib/sanitize';
import CategoryTag from '@/components/ui/CategoryTag';
import ArticleContent from '@/components/articles/ArticleContent';
import Link from 'next/link';

// Interface para tipagem dos parâmetros da rota dinâmica
// Next.js 15+ trata params como Promise
interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Gera os parâmetros estáticos para todas as páginas de artigos.
 * Função do Next.js para Static Site Generation (SSG).
 * 
 * @function generateStaticParams
 * @returns {Promise<Array<{slug: string}>>} Array de objetos com slugs para pré-renderização
 */
export async function generateStaticParams() {
  // Busca todos os slugs dos artigos disponíveis
  const slugs = getAllSlugs();
  // Mapeia para o formato esperado pelo Next.js
  return slugs.map((slug) => ({ slug }));
}

/**
 * Gera metadados SEO dinâmicos para cada artigo.
 * Inclui título, descrição, keywords, OpenGraph e URL canônica.
 * 
 * @function generateMetadata
 * @param {PageProps} props - Parâmetros da página incluindo slug do artigo
 * @returns {Promise<Metadata>} Metadados SEO para a página
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Aguarda resolução dos parâmetros da rota
  const { slug } = await params;
  
  // Busca o artigo pelo slug
  const article = getArticleBySlug(slug);

  // Retorna metadados básicos se artigo não existir
  if (!article) {
    return { title: 'Artigo não encontrado' };
  }

  // Retorna metadados completos do artigo para SEO
  return {
    title: article.titulo,
    description: article.resumo,
    keywords: article.tags,
    authors: [{ name: article.autor }],
    // Configuração OpenGraph para compartilhamento em redes sociais
    openGraph: {
      title: article.titulo,
      description: article.resumo,
      type: 'article',
      publishedTime: article.dataPublicacao,
      authors: [article.autor],
      url: getCanonicalUrl(`/artigos/${article.slug}`)
    },
    // URL canônica para evitar conteúdo duplicado
    alternates: {
      canonical: getCanonicalUrl(`/artigos/${article.slug}`)
    }
  };
}

/**
 * Componente de página individual de artigo.
 * Renderiza o artigo completo com:
 * - Cabeçalho (título, resumo, autor, data, tempo de leitura)
 * - Conteúdo do artigo (formatado em HTML)
 * - Tags do artigo
 * - Artigos relacionados
 * - Link de retorno para listagem
 * 
 * @component
 * @param {PageProps} props - Parâmetros da página incluindo slug
 * @returns {JSX.Element} Página do artigo renderizado
 */
export default async function ArtigoPage({ params }: PageProps) {
  // Aguarda resolução dos parâmetros da rota
  const { slug } = await params;
  
  // Busca o artigo pelo slug
  const article = getArticleBySlug(slug);

  // Exibe página 404 se artigo não existir
  if (!article) {
    notFound();
  }

  // Sanitiza o artigo para previnir XSS (SSR)
  const sanitizedArticle = sanitizeArticle(article);

  // Busca artigos relacionados baseados em categorias/tags em comum
  const relatedArticles = getRelatedArticles(slug);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Cabeçalho do artigo com informações principais */}
      <header className="mb-8">
        {/* Categorias do artigo */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sanitizedArticle.categorias.map((categoria) => (
            <CategoryTag key={categoria} category={categoria} size="md" />
          ))}
        </div>
        
        {/* Título principal do artigo */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {sanitizedArticle.titulo}
        </h1>
        
        {/* Resumo/subtítulo do artigo */}
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {sanitizedArticle.resumo}
        </p>
        
        {/* Metadados: autor, data, tempo de leitura */}
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-200">{sanitizedArticle.autor}</span>
          <span>•</span>
          <time dateTime={sanitizedArticle.dataPublicacao}>
            {formatDate(sanitizedArticle.dataPublicacao)}
          </time>
          <span>•</span>
          <span>{sanitizedArticle.tempoLeitura} min de leitura</span>
        </div>
      </header>

      {/* Conteúdo principal do artigo (HTML renderizado) */}
      <ArticleContent slug={sanitizedArticle.slug} content={sanitizedArticle.conteudo} />

      {/* Rodapé do artigo com tags */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {sanitizedArticle.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>

      {/* Seção de artigos relacionados - apenas se houver artigos relacionados */}
      {relatedArticles.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Artigos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/artigos/${related.slug}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {related.titulo}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {related.resumo}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Link para voltar à listagem de artigos */}
      <div className="mt-12">
        <Link 
          href="/artigos"
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Artigos
        </Link>
      </div>
    </article>
  );
}

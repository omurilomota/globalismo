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
 * @module app/[locale]/artigos/[slug]/page
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
import Comments from '@/components/articles/Comments';
import SocialShare from '@/components/articles/SocialShare';
import ViewTracker from '@/components/articles/ViewTracker';
import Link from 'next/link';
import { User, Calendar, Clock, TrendingUp } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const locales = ['pt', 'en', 'de', 'es'];
  
  const params = [];
  for (const slug of slugs) {
    for (const locale of locales) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Artigo não encontrado' };
  }

  const titles: Record<string, string> = {
    pt: 'Artigo não encontrado',
    en: 'Article not found',
    de: 'Artikel nicht gefunden',
    es: 'Artículo no encontrado'
  };

  return {
    title: article.titulo,
    description: article.resumo,
    keywords: article.tags,
    authors: [{ name: article.autor }],
    openGraph: {
      title: article.titulo,
      description: article.resumo,
      type: 'article',
      publishedTime: article.dataPublicacao,
      authors: [article.autor],
      url: getCanonicalUrl(`/${locale}/artigos/${article.slug}`)
    },
    alternates: {
      canonical: getCanonicalUrl(`/${locale}/artigos/${article.slug}`)
    }
  };
}

async function registerView(slug: string) {
  try {
    await fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
  } catch (err) {
    console.error('Erro ao registrar visualização:', err);
  }
}

export default async function ArtigoPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const sanitizedArticle = sanitizeArticle(article);
  const relatedArticles = getRelatedArticles(slug);
  const articleUrl = getCanonicalUrl(`/${locale}/artigos/${sanitizedArticle.slug}`);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ViewTracker slug={sanitizedArticle.slug} />

      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {sanitizedArticle.categorias.map((categoria) => (
            <CategoryTag key={categoria} category={categoria} size="md" />
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {sanitizedArticle.titulo}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {sanitizedArticle.resumo}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-6">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span className="font-medium text-gray-900 dark:text-gray-200">{sanitizedArticle.autor}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <time dateTime={sanitizedArticle.dataPublicacao}>
              {formatDate(sanitizedArticle.dataPublicacao)}
            </time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{sanitizedArticle.tempoLeitura} min de leitura</span>
          </span>
        </div>

        <div className="py-4 border-y border-gray-200 dark:border-gray-700">
          <SocialShare title={sanitizedArticle.titulo} url={articleUrl} />
        </div>
      </header>

      <ArticleContent slug={sanitizedArticle.slug} content={sanitizedArticle.conteudo} />

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-6">
          {sanitizedArticle.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {locale === 'es' ? 'Sobre los Autores' : locale === 'en' ? 'About the Authors' : locale === 'de' ? 'Über die Autoren' : 'Sobre os Autores'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-900 dark:bg-blue-700 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                MM
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Murilo Mota</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'es' ? 'Investigador y colaborador. Especialista en análisis de temas relacionados con la globalización, economía internacional y geopolítica.' 
                    : locale === 'en' ? 'Researcher and collaborator. Specialist in analyzing topics related to globalization, international economy and geopolitics.'
                    : locale === 'de' ? 'Forscher und Mitarbeiter. Spezialist auf die Analyse von Themen im Zusammenhang mit Globalisierung, internationaler Wirtschaft und Geopolitik.'
                    : 'Pesquisador e colaborador. Especialista em análise de temas relacionados à globalização, economia internacional e geopolítica.'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-green-900 dark:bg-green-700 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                MP
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Matheus Pereira</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'es' ? 'Desarrollador y co-fundador. Ingeniero de software enfocado en tecnologías web y experiencias digitales.'
                    : locale === 'en' ? 'Developer and co-founder. Software engineer focused on web technologies and digital experiences.'
                    : locale === 'de' ? 'Entwickler und Mitgründer. Software-Ingenieur mit Fokus auf Web-Technologien und digitale Erfahrungen.'
                    : 'Desenvolvedor e co-fundador. Engenheiro de software focado em tecnologias web e experiências digitais.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {sanitizedArticle.fontes && sanitizedArticle.fontes.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {locale === 'es' ? 'Fuentes y Referencias' : locale === 'en' ? 'Sources and References' : locale === 'de' ? 'Quellen und Referenzen' : 'Fontes e Referências'}
            </h3>
            <ul className="space-y-2">
              {sanitizedArticle.fontes.map((fonte, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">{fonte}.</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </footer>

      {relatedArticles.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {locale === 'es' ? 'Artículos Relacionados' : locale === 'en' ? 'Related Articles' : locale === 'de' ? 'Verwandte Artikel' : 'Artigos Relacionados'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/${locale}/artigos/${related.slug}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow group"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-900 dark:group-hover:text-blue-300 line-clamp-2">
                  {related.titulo}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {related.resumo}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {related.tempoLeitura} min
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {related.visualizacoes} visualizações
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Comments articleSlug={slug} />

      <div className="mt-12">
        <Link 
          href={`/${locale}/artigos`}
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'es' ? 'Volver a Artículos' : locale === 'en' ? 'Back to Articles' : locale === 'de' ? 'Zurück zu Artikel' : 'Voltar para Artigos'}
        </Link>
      </div>
    </article>
  );
}

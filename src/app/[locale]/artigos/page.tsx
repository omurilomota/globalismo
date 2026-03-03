/**
 * @fileoverview Página de listagem de artigos do blog Globalismo.
 * 
 * Esta página é responsável por:
 * - Exibir todos os artigos em formato de grid paginado
 * - Fornecer filtros por categoria
 * - Implementar busca de artigos por termo
 * - Gerenciar paginação com navegação entre páginas
 * 
 * Utiliza renderização server-side (default) do Next.js para SEO.
 * Os parâmetros de query (page, categoria, busca) são tratados como promise
 * conforme nova API do Next.js 15+.
 * 
 * @module app/[locale]/artigos/page
 * @author Globalismo
 * @version 1.0.0
 */

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getPaginatedArticles, getAllCategories } from '@/lib/articles';
import ArticleCard from '@/components/articles/ArticleCard';
import SearchBar from '@/components/ui/SearchBar';
import CategoryTag from '@/components/ui/CategoryTag';
import Pagination from '@/components/ui/Pagination';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; categoria?: string; busca?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    pt: 'Artigos',
    en: 'Articles',
    de: 'Artikel',
    es: 'Artículos'
  };
  
  const descriptions: Record<string, string> = {
    pt: 'Explore todos os artigos sobre globalização, economia, política e cultura.',
    en: 'Explore all articles about globalization, economy, politics and culture.',
    de: 'Entdecken Sie alle Artikel über Globalisierung, Wirtschaft, Politik und Kultur.',
    es: 'Explora todos los artículos sobre globalización, economía, política y cultura.'
  };

  return {
    title: titles[locale] || 'Artigos',
    description: descriptions[locale] || titles[locale]
  };
}

export default async function ArtigosPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  
  const page = parseInt(resolvedSearchParams.page || '1');
  const categoria = resolvedSearchParams.categoria;
  const busca = resolvedSearchParams.busca;

  const result = getPaginatedArticles({
    page,
    category: categoria,
    search: busca
  });

  if (page > result.totalPages && result.totalPages > 0) {
    redirect(`/${locale}/artigos`);
  }

  const allCategories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho da página com título e descrição */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {locale === 'es' ? 'Artículos' : locale === 'en' ? 'Articles' : locale === 'de' ? 'Artikel' : 'Artigos'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {locale === 'es' ? 'Explora nuestra colección de artículos sobre globalización y sus impactos en la sociedad.' 
            : locale === 'en' ? 'Explore our collection of articles about globalization and its impacts on society.'
            : locale === 'de' ? 'Entdecken Sie unsere Sammlung von Artikeln über Globalisierung und ihre Auswirkungen auf die Gesellschaft.'
            : 'Explore nossa coleção de artigos sobre globalização e seus impactos na sociedade.'}
        </p>
        {/* Componente de busca */}
        <div className="max-w-md">
          <SearchBar />
        </div>
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* Opção "Todas" para remover filtro de categoria */}
        <CategoryTag 
          category={locale === 'es' ? 'Todas' : locale === 'en' ? 'All' : locale === 'de' ? 'Alle' : 'Todas'} 
          size="md" 
          isActive={!categoria} 
        />
        {/* Mapeia todas as categorias disponíveis */}
        {allCategories.map((cat) => (
          <CategoryTag 
            key={cat} 
            category={cat} 
            size="md" 
            isActive={categoria?.toLowerCase() === cat.toLowerCase()}
          />
        ))}
      </div>

      {/* Exibe filtros ativos quando há categoria ou busca */}
      {(categoria || busca) && (
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-gray-600 dark:text-gray-400">
            {locale === 'es' ? 'Filtros activos:' : locale === 'en' ? 'Active filters:' : locale === 'de' ? 'Aktive Filter:' : 'Filtros ativos:'}
          </span>
          {categoria && (
            <span className="px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-full">
              {locale === 'es' ? 'Categoría:' : locale === 'en' ? 'Category:' : locale === 'de' ? 'Kategorie:' : 'Categoria:'} {categoria}
            </span>
          )}
          {busca && (
            <span className="px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-full">
              {locale === 'es' ? 'Búsqueda:' : locale === 'en' ? 'Search:' : locale === 'de' ? 'Suche:' : 'Busca:'} {busca}
            </span>
          )}
        </div>
      )}

      {/* Verifica se há artigos para exibir */}
      {result.artigos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {locale === 'es' ? 'No se encontraron artículos.' : locale === 'en' ? 'No articles found.' : locale === 'de' ? 'Keine Artikel gefunden.' : 'Nenhum artigo encontrado.'}
          </p>
        </div>
      ) : (
        <>
          {/* Grid de artigos - 1 coluna mobile, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {result.artigos.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {/* Componente de paginação */}
          <Pagination 
            currentPage={page} 
            totalPages={result.totalPages} 
            baseUrl={`/${locale}/artigos`}
          />
        </>
      )}
    </div>
  );
}

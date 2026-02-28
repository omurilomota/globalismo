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
 * @module app/artigos/page
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

// Configuração de metadados SEO para a página de artigos
export const metadata: Metadata = {
  title: 'Artigos',
  description: 'Explore todos os artigos sobre globalização, economia, política e cultura.'
};

// Interface para tipagem dos parâmetros de query string da URL
interface PageProps {
  searchParams: { page?: string; categoria?: string; busca?: string };
}

/**
 * Página principal de listagem de artigos.
 * Renderiza grid de artigos com suporte a:
 * - Paginação (parâmetro 'page')
 * - Filtro por categoria (parâmetro 'categoria')
 * - Busca por termo (parâmetro 'busca')
 * 
 * @component
 * @param {PageProps} props - Parâmetros da página incluindo searchParams
 * @returns {JSX.Element} Página renderizada com artigos filtrados/paginados
 */
export default async function ArtigosPage({ searchParams }: PageProps) {
  // Extrai parâmetros de query string
  const page = parseInt(searchParams.page || '1');
  const categoria = searchParams.categoria;
  const busca = searchParams.busca;

  // Busca artigos com paginação e filtros aplicados
  const result = getPaginatedArticles({
    page,
    category: categoria,
    search: busca
  });

  // Redireciona para primeira página se a página atual exceder o total
  if (page > result.totalPages && result.totalPages > 0) {
    redirect('/artigos');
  }

  // Carrega todas as categorias disponíveis para o filtro
  const allCategories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho da página com título e descrição */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Artigos</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Explore nossa coleção de artigos sobre globalização e seus impactos na sociedade.
        </p>
        {/* Componente de busca */}
        <div className="max-w-md">
          <SearchBar />
        </div>
      </div>

      {/* Filtros de categoria */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* Opção "Todas" para remover filtro de categoria */}
        <CategoryTag category="Todas" size="md" isActive={!categoria} />
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
          <span className="text-gray-600 dark:text-gray-400">Filtros ativos:</span>
          {/* Tag indicating the active category filter */}
          {categoria && (
            <span className="px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-full">
              Categoria: {categoria}
            </span>
          )}
          {/* Tag indicating the active search filter */}
          {busca && (
            <span className="px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-full">
              Busca: {busca}
            </span>
          )}
        </div>
      )}

      {/* Verifica se há artigos para exibir */}
      {result.artigos.length === 0 ? (
        // Mensagem quando não há artigos encontrados
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum artigo encontrado.</p>
        </div>
      ) : (
        <>
          {/* Grid de artigos - 1 coluna mobile, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.artigos.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {/* Componente de paginação */}
          <Pagination 
            currentPage={page} 
            totalPages={result.totalPages} 
            baseUrl="/artigos"
          />
        </>
      )}
    </div>
  );
}

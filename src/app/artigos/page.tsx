import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getPaginatedArticles, getAllCategories } from '@/lib/articles';
import ArticleCard from '@/components/articles/ArticleCard';
import SearchBar from '@/components/ui/SearchBar';
import CategoryTag from '@/components/ui/CategoryTag';
import Pagination from '@/components/ui/Pagination';

export const metadata: Metadata = {
  title: 'Artigos',
  description: 'Explore todos os artigos sobre globalização, economia, política e cultura.'
};

interface PageProps {
  searchParams: Promise<{ page?: string; categoria?: string; busca?: string }>;
}

export default async function ArtigosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const categoria = params.categoria;
  const busca = params.busca;

  const result = getPaginatedArticles({
    page,
    category: categoria,
    search: busca
  });

  if (page > result.totalPages && result.totalPages > 0) {
    redirect('/artigos');
  }

  const allCategories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Artigos</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Explore nossa coleção de artigos sobre globalização e seus impactos na sociedade.
        </p>
        <div className="max-w-md">
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <CategoryTag category="Todas" size="md" isActive={!categoria} />
        {allCategories.map((cat) => (
          <CategoryTag 
            key={cat} 
            category={cat} 
            size="md" 
            isActive={categoria?.toLowerCase() === cat.toLowerCase()}
          />
        ))}
      </div>

      {(categoria || busca) && (
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-gray-600 dark:text-gray-400">Filtros ativos:</span>
          {categoria && (
            <span className="px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-full">
              Categoria: {categoria}
            </span>
          )}
          {busca && (
            <span className="px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-full">
              Busca: {busca}
            </span>
          )}
        </div>
      )}

      {result.artigos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum artigo encontrado.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.artigos.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
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

import { Metadata } from 'next';
import { IArticle } from '@/types';
import artigosData from '@/data/artigos.json';
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

const ARTICLES_PER_PAGE = 6;

export default async function ArtigosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const categoria = params.categoria;
  const busca = params.busca;

  let artigos: IArticle[] = [...(artigosData as { artigos: IArticle[] }).artigos];

  if (categoria) {
    artigos = artigos.filter(a => 
      a.categorias.some(c => c.toLowerCase() === categoria.toLowerCase())
    );
  }

  if (busca) {
    const searchLower = busca.toLowerCase();
    artigos = artigos.filter(a => 
      a.titulo.toLowerCase().includes(searchLower) ||
      a.resumo.toLowerCase().includes(searchLower) ||
      a.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  artigos.sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime());

  const total = artigos.length;
  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);
  const startIndex = (page - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = artigos.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const allCategories = Array.from(
    new Set((artigosData as { artigos: IArticle[] }).artigos.flatMap(a => a.categorias))
  ).sort();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Artigos</h1>
        <p className="text-gray-600 mb-6">
          Explore nossa coleção de artigos sobre globalização e seus impactos na sociedade.
        </p>
        <div className="max-w-md">
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <CategoryTag category="Todas" size="md" />
        {allCategories.map((cat) => (
          <CategoryTag key={cat} category={cat} size="md" />
        ))}
      </div>

      {(categoria || busca) && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-gray-600">Filtros ativos:</span>
          {categoria && (
            <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full">
              Categoria: {categoria}
            </span>
          )}
          {busca && (
            <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full">
              Busca: {busca}
            </span>
          )}
        </div>
      )}

      {paginatedArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum artigo encontrado.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            baseUrl="/artigos" 
          />
        </>
      )}
    </div>
  );
}

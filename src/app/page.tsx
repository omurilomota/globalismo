import { getFeaturedArticle, getRecentArticles, getAllCategories } from '@/lib/articles';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleCard from '@/components/articles/ArticleCard';
import Link from 'next/link';
import CategoryTag from '@/components/ui/CategoryTag';

export default function Home() {
  const featured = getFeaturedArticle();
  const recentArticles = getRecentArticles(6, featured?.id);
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {featured && <ArticleHero article={featured} />}
      
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Últimos Artigos</h2>
          <Link 
            href="/artigos" 
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Ver todos →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Categorias</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <CategoryTag key={cat} category={cat} size="md" />
          ))}
        </div>
      </section>
    </div>
  );
}

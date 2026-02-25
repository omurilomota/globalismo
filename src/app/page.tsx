import { getFeaturedArticle, getRecentArticles, getAllCategories } from '@/lib/articles';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleCard from '@/components/articles/ArticleCard';
import Link from 'next/link';
import CategoryTag from '@/components/ui/CategoryTag';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featured = getFeaturedArticle();
  const recentArticles = getRecentArticles(6, featured?.id);
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {featured && <ArticleHero article={featured} />}
      
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">
            Últimos Artigos
          </h2>
          <Link 
            href="/artigos" 
            className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-300 hover:underline"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map((article, idx) => (
            <div 
              key={article.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 font-serif">
          Categorias
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <CategoryTag key={cat} category={cat} size="md" />
          ))}
        </div>
      </section>
    </div>
  );
}

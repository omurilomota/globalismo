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
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">
            📰 <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Últimos Artigos</span>
          </h2>
          <Link 
            href="/artigos" 
            className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
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

      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-indigo-100 dark:border-indigo-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">
          🏷️ <span className="bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">Categorias</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <CategoryTag key={cat} category={cat} size="md" />
          ))}
        </div>
      </section>
    </div>
  );
}

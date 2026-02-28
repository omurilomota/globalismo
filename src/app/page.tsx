/**
 * @fileoverview Página inicial (Home) do site Globalismo.
 *
 * Esta é a página principal do site, exibida quando o usuário
 * acessa a raiz do domínio (/)
 *
 * @module app/[locale]/page
 * @author Globalismo
 * @version 1.1.0
 */

import { getFeaturedArticle, getRecentArticles } from '@/lib/articles';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleCard from '@/components/articles/ArticleCard';
import MostRead from '@/components/ui/MostRead';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Newsletter from '@/components/ui/Newsletter';
import { ArrowRight } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export default function Home({ params }: Props) {
  const featured = getFeaturedArticle();
  const recentArticles = getRecentArticles(6, featured?.id);
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {featured && <ArticleHero article={featured} />}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Artigos Recentes - 3 colunas */}
        <div className="lg:col-span-3">
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
        </div>

        {/* Sidebar - 1 coluna */}
        <aside className="lg:col-span-1 space-y-6">
          <MostRead />
          <Newsletter />
        </aside>
      </div>
    </div>
  );
}

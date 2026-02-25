import Link from 'next/link';
import { IArticle } from '@/types';
import ArticleCard from './ArticleCard';

interface RelatedArticlesProps {
  articles: IArticle[];
  currentSlug: string;
}

export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  const filtered = articles
    .filter(a => a.slug !== currentSlug)
    .slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

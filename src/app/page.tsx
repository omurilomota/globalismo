import { IArticle } from '@/types';
import artigosData from '@/data/artigos.json';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleCard from '@/components/articles/ArticleCard';

export default function Home() {
  const artigos = (artigosData as { artigos: IArticle[] }).artigos;
  
  const destaque = artigos.find(a => a.destaque);
  const outrosArtigos = artigos
    .filter(a => a.id !== destaque?.id)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {destaque && <ArticleHero article={destaque} />}
      
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Últimos Artigos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outrosArtigos.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

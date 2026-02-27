import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, getRelatedArticles, getCanonicalUrl } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import CategoryTag from '@/components/ui/CategoryTag';
import ArticleContent from '@/components/articles/ArticleContent';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Artigo não encontrado' };
  }

  return {
    title: article.titulo,
    description: article.resumo,
    keywords: article.tags,
    authors: [{ name: article.autor }],
    openGraph: {
      title: article.titulo,
      description: article.resumo,
      type: 'article',
      publishedTime: article.dataPublicacao,
      authors: [article.autor],
      url: getCanonicalUrl(`/artigos/${article.slug}`)
    },
    alternates: {
      canonical: getCanonicalUrl(`/artigos/${article.slug}`)
    }
  };
}

export default async function ArtigoPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {article.categorias.map((categoria) => (
            <CategoryTag key={categoria} category={categoria} size="md" />
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {article.titulo}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {article.resumo}
        </p>
        
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-200">{article.autor}</span>
          <span>•</span>
          <time dateTime={article.dataPublicacao}>
            {formatDate(article.dataPublicacao)}
          </time>
          <span>•</span>
          <span>{article.tempoLeitura} min de leitura</span>
        </div>
      </header>

      <ArticleContent slug={article.slug} content={article.conteudo} />

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>

      {relatedArticles.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Artigos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/artigos/${related.slug}`}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {related.titulo}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {related.resumo}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <Link 
          href="/artigos"
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Artigos
        </Link>
      </div>
    </article>
  );
}

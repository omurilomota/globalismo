import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IArticle } from '@/types';
import { formatDate } from '@/lib/utils';
import artigosData from '@/data/artigos.json';
import CategoryTag from '@/components/ui/CategoryTag';
import RelatedArticles from '@/components/articles/RelatedArticles';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artigos = (artigosData as { artigos: IArticle[] }).artigos;
  const article = artigos.find(a => a.slug === slug);

  if (!article) {
    return { title: 'Artigo não encontrado' };
  }

  return {
    title: article.titulo,
    description: article.resumo,
    keywords: article.tags,
    openGraph: {
      title: article.titulo,
      description: article.resumo,
      type: 'article',
      publishedTime: article.dataPublicacao,
      authors: [article.autor]
    }
  };
}

export default async function ArtigoPage({ params }: PageProps) {
  const { slug } = await params;
  const artigos = (artigosData as { artigos: IArticle[] }).artigos;
  const article = artigos.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {article.categorias.map((categoria) => (
            <CategoryTag key={categoria} category={categoria} size="md" />
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {article.titulo}
        </h1>
        
        <p className="text-xl text-gray-600 mb-6">
          {article.resumo}
        </p>
        
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span className="font-medium text-gray-900">{article.autor}</span>
          <span>•</span>
          <time dateTime={article.dataPublicacao}>
            {formatDate(article.dataPublicacao)}
          </time>
          <span>•</span>
          <span>{article.tempoLeitura} min de leitura</span>
        </div>
      </header>

      <div 
        className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-gray-900"
        dangerouslySetInnerHTML={{ __html: article.conteudo }}
      />

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>

      <RelatedArticles articles={artigos} currentSlug={article.slug} />

      <div className="mt-12">
        <Link 
          href="/artigos"
          className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
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

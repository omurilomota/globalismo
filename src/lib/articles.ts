import { IArticle, IPaginatedResult } from '@/types';
import artigosData from '@/data/artigos.json';

const ARTICLES_PER_PAGE = 6;
const baseUrl = 'https://globalismo.com.br';

export function getAllArticles(): IArticle[] {
  return [...(artigosData as { artigos: IArticle[] }).artigos];
}

export function getArticleBySlug(slug: string): IArticle | undefined {
  return getAllArticles().find(a => a.slug === slug);
}

export function getArticlesByCategory(category: string): IArticle[] {
  return getAllArticles().filter(a => 
    a.categorias.some(c => c.toLowerCase() === category.toLowerCase())
  );
}

export function searchArticles(query: string): IArticle[] {
  const searchLower = query.toLowerCase();
  return getAllArticles().filter(a => 
    a.titulo.toLowerCase().includes(searchLower) ||
    a.resumo.toLowerCase().includes(searchLower) ||
    a.tags.some(t => t.toLowerCase().includes(searchLower))
  );
}

export function getFeaturedArticle(): IArticle | undefined {
  return getAllArticles().find(a => a.destaque);
}

export function getRecentArticles(limit: number = 6, excludeId?: string): IArticle[] {
  return getAllArticles()
    .filter(a => a.id !== excludeId)
    .sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
    .slice(0, limit);
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): IArticle[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];

  return getAllArticles()
    .filter(a => a.slug !== currentSlug)
    .filter(a => 
      a.categorias.some(c => current.categorias.includes(c)) ||
      a.tags.some(t => current.tags.includes(t))
    )
    .slice(0, limit);
}

export function getPaginatedArticles(options: {
  page?: number;
  category?: string;
  search?: string;
}): IPaginatedResult {
  const { page = 1, category, search } = options;
  
  let artigos = getAllArticles();

  if (category) {
    artigos = artigos.filter(a => 
      a.categorias.some(c => c.toLowerCase() === category.toLowerCase())
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
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

  return {
    artigos: paginatedArticles,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  };
}

export function getAllCategories(): string[] {
  return Array.from(
    new Set(getAllArticles().flatMap(a => a.categorias))
  ).sort();
}

export function getAllSlugs(): string[] {
  return getAllArticles().map(a => a.slug);
}

export function getCanonicalUrl(path: string): string {
  return `${baseUrl}${path}`;
}

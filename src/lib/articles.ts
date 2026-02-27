/**
 * Data access layer for articles.
 * Provides functions to fetch, filter, and paginate articles from static JSON data.
 */
import { IArticle, IPaginatedResult } from '@/types';
import artigosData from '@/data/artigos.json';

/**
 * Number of articles to display per page in paginated results.
 */
const ARTICLES_PER_PAGE = 6;

/**
 * Base URL for generating canonical URLs.
 */
const baseUrl = 'https://globalismo.com.br';

/**
 * Retrieves all articles from the data source.
 * @returns Array of all articles
 */
export function getAllArticles(): IArticle[] {
  return [...(artigosData as { artigos: IArticle[] }).artigos];
}

/**
 * Finds a single article by its URL slug.
 * @param slug - The article's URL-friendly identifier
 * @returns The article if found, undefined otherwise
 */
export function getArticleBySlug(slug: string): IArticle | undefined {
  return getAllArticles().find(a => a.slug === slug);
}

/**
 * Filters articles by category (case-insensitive).
 * @param category - The category name to filter by
 * @returns Array of articles matching the category
 */
export function getArticlesByCategory(category: string): IArticle[] {
  return getAllArticles().filter(a => 
    a.categorias.some(c => c.toLowerCase() === category.toLowerCase())
  );
}

/**
 * Searches articles by query string (title, summary, or tags).
 * @param query - Search term to match
 * @returns Array of articles matching the query
 */
export function searchArticles(query: string): IArticle[] {
  const searchLower = query.toLowerCase();
  return getAllArticles().filter(a => 
    a.titulo.toLowerCase().includes(searchLower) ||
    a.resumo.toLowerCase().includes(searchLower) ||
    a.tags.some(t => t.toLowerCase().includes(searchLower))
  );
}

/**
 * Retrieves the article marked as featured.
 * @returns The featured article or undefined if none exists
 */
export function getFeaturedArticle(): IArticle | undefined {
  return getAllArticles().find(a => a.destaque);
}

/**
 * Gets the most recent articles, optionally excluding a specific article.
 * @param limit - Maximum number of articles to return (default: 6)
 * @param excludeId - Optional article ID to exclude from results
 * @returns Array of recent articles sorted by publication date
 */
export function getRecentArticles(limit: number = 6, excludeId?: string): IArticle[] {
  return getAllArticles()
    .filter(a => a.id !== excludeId)
    .sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
    .slice(0, limit);
}

/**
 * Finds articles related to a given article based on shared categories or tags.
 * @param currentSlug - The slug of the current article
 * @param limit - Maximum number of related articles to return (default: 3)
 * @returns Array of related articles
 */
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

/**
 * Retrieves paginated and optionally filtered articles.
 * @param options - Pagination and filter options
 * @param options.page - Page number (default: 1)
 * @param options.category - Optional category filter
 * @param options.search - Optional search query
 * @returns Paginated result with articles and metadata
 */
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

/**
 * Gets all unique categories from all articles.
 * @returns Sorted array of unique category names
 */
export function getAllCategories(): string[] {
  return Array.from(
    new Set(getAllArticles().flatMap(a => a.categorias))
  ).sort();
}

/**
 * Gets all article slugs for generating static routes.
 * @returns Array of all article slugs
 */
export function getAllSlugs(): string[] {
  return getAllArticles().map(a => a.slug);
}

/**
 * Generates a canonical URL for a given path.
 * @param path - The URL path
 * @returns Full canonical URL
 */
export function getCanonicalUrl(path: string): string {
  return `${baseUrl}${path}`;
}

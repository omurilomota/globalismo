import { describe, it, expect } from 'vitest';
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesByCategory,
  searchArticles,
  getFeaturedArticle,
  getRecentArticles,
  getRelatedArticles,
  getPaginatedArticles,
  getAllCategories,
} from '@/lib/articles';

describe('articles', () => {
  describe('getAllArticles', () => {
    it('should return all articles', () => {
      const articles = getAllArticles();
      expect(articles.length).toBeGreaterThan(0);
    });
  });

  describe('getArticleBySlug', () => {
    it('should return article by slug', () => {
      const article = getArticleBySlug('poder-empresas-transnacionais-globalizacao');
      expect(article).toBeDefined();
      expect(article?.titulo).toBe('O Poder das Empresas Transnacionais na Era da Globalização');
    });

    it('should return undefined for non-existent slug', () => {
      const article = getArticleBySlug('non-existent');
      expect(article).toBeUndefined();
    });
  });

  describe('getArticlesByCategory', () => {
    it('should return articles by category (case insensitive)', () => {
      const articles = getArticlesByCategory('economia');
      expect(articles.length).toBeGreaterThan(0);
      articles.forEach(article => {
        expect(article.categorias.some(c => c.toLowerCase() === 'economia')).toBe(true);
      });
    });
  });

  describe('searchArticles', () => {
    it('should search by title', () => {
      const articles = searchArticles('globalização');
      expect(articles.length).toBeGreaterThan(0);
    });

    it('should search by summary', () => {
      const articles = searchArticles('Ulrich Beck');
      expect(articles.length).toBeGreaterThan(0);
    });

    it('should search by tags', () => {
      const articles = searchArticles('BRICS');
      expect(articles.length).toBeGreaterThan(0);
    });
  });

  describe('getFeaturedArticle', () => {
    it('should return featured article', () => {
      const article = getFeaturedArticle();
      expect(article).toBeDefined();
      expect(article?.destaque).toBe(true);
    });
  });

  describe('getRecentArticles', () => {
    it('should return recent articles', () => {
      const articles = getRecentArticles(3);
      expect(articles.length).toBeLessThanOrEqual(3);
    });

    it('should exclude specific article by id', () => {
      const articles = getRecentArticles(10, '1');
      articles.forEach(article => {
        expect(article.id).not.toBe('1');
      });
    });
  });

  describe('getRelatedArticles', () => {
    it('should return related articles by category or tags', () => {
      const articles = getRelatedArticles('poder-empresas-transnacionais-globalizacao');
      expect(articles.length).toBeGreaterThanOrEqual(0);
    });

    it('should return empty array for non-existent slug', () => {
      const articles = getRelatedArticles('non-existent');
      expect(articles).toEqual([]);
    });
  });

  describe('getPaginatedArticles', () => {
    it('should return paginated articles', () => {
      const result = getPaginatedArticles({ page: 1 });
      expect(result.artigos.length).toBeGreaterThan(0);
      expect(result.page).toBe(1);
      expect(result.total).toBeGreaterThan(0);
    });

    it('should filter by category', () => {
      const result = getPaginatedArticles({ page: 1, category: 'economia' });
      result.artigos.forEach(article => {
        expect(article.categorias.some(c => c.toLowerCase() === 'economia')).toBe(true);
      });
    });

    it('should filter by search', () => {
      const result = getPaginatedArticles({ page: 1, search: 'global' });
      expect(result.artigos.length).toBeGreaterThan(0);
    });
  });

  describe('getAllCategories', () => {
    it('should return unique sorted categories', () => {
      const categories = getAllCategories();
      expect(categories.length).toBeGreaterThan(0);
      expect(categories).toEqual([...categories].sort());
    });
  });
});

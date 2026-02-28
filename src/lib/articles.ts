/**
 * @fileoverview Camada de acesso a dados para artigos do blog Globalismo.
 * Fornece funções para buscar, filtrar, paginar e manipular artigos
 * a partir do banco de dados estático JSON.
 * 
 * Este módulo funciona como uma abstração entre a interface da aplicação
 * e a camada de dados, permitindo fácil manutenção e evolução do código.
 * 
 * @module lib/articles
 * @author Globalismo
 * @version 1.0.0
 */

// Importa as interfaces TypeScript do projeto para garantir type safety
import { IArticle, IPaginatedResult } from '@/types';

// Importa os dados estáticos dos artigos do arquivo JSON
import artigosData from '@/data/artigos.json';

/**
 * Constante que define o número de artigos exibidos por página.
 * Este valor é utilizado em todas as funções de paginação.
 * 
 * @constant {number} ARTICLES_PER_PAGE
 * @default 6
 */
const ARTICLES_PER_PAGE = 6;

/**
 * URL base do site para geração de URLs canônicas.
 * Usada em tags meta, sitemap e feeds RSS.
 * 
 * @constant {string} baseUrl
 */
const baseUrl = 'https://globalismo.com.br';

/**
 * Retorna todos os artigos disponíveis no banco de dados.
 * Cria uma cópia shallow do array para evitar mutações diretas nos dados originais.
 * 
 * @function getAllArticles
 * @returns {IArticle[]} Array contendo todos os artigos do blog
 * @example
 * const artigos = getAllArticles();
 * console.log(artigos.length); // número total de artigos
 */
export function getAllArticles(): IArticle[] {
  // Acessa o array de artigos do objeto JSON e cria uma cópia
  return [...(artigosData as { artigos: IArticle[] }).artigos];
}

/**
 * Busca um artigo específico pelo seu identificador URL (slug).
 * O slug é uma versão URL-friendly do título do artigo.
 * 
 * @function getArticleBySlug
 * @param {string} slug - Identificador URL amigável do artigo
 * @returns {IArticle | undefined} O artigo encontrado ou undefined se não existir
 * @example
 * const artigo = getArticleBySlug('poder-empresas-transnacionais-globalizacao');
 * if (artigo) {
 *   console.log(artigo.titulo);
 * }
 */
export function getArticleBySlug(slug: string): IArticle | undefined {
  // Busca o primeiro artigo que tenha o slug correspondente
  return getAllArticles().find(a => a.slug === slug);
}

/**
 * Filtra artigos por categoria de forma case-insensitive.
 * Verifica se alguma das categorias do artigo corresponde à categoria informada.
 * 
 * @function getArticlesByCategory
 * @param {string} category - Nome da categoria para filtrar
 * @returns {IArticle[]} Array de artigos que pertencem à categoria
 * @example
 * const artigosEconomia = getArticlesByCategory('economia');
 */
export function getArticlesByCategory(category: string): IArticle[] {
  // Filtra artigos onde alguma categoria corresponde (ignorando maiúsculas/minúsculas)
  return getAllArticles().filter(a => 
    a.categorias.some(c => c.toLowerCase() === category.toLowerCase())
  );
}

/**
 * Realiza busca de artigos por termo em título, resumo ou tags.
 * A busca é case-insensitive e procura correspondência parcial.
 * 
 * @function searchArticles
 * @param {string} query - Termo de busca
 * @returns {IArticle[]} Array de artigos que correspondem à busca
 * @example
 * const resultados = searchArticles('globalização');
 */
export function searchArticles(query: string): IArticle[] {
  // Converte o termo de busca para minúsculas
  const searchLower = query.toLowerCase();
  
  // Filtra artigos onde o título, resumo ou alguma tag contém o termo
  return getAllArticles().filter(a => 
    a.titulo.toLowerCase().includes(searchLower) ||
    a.resumo.toLowerCase().includes(searchLower) ||
    a.tags.some(t => t.toLowerCase().includes(searchLower))
  );
}

/**
 * Retorna o artigo marcado como destaque para exibição na home.
 * Utiliza a propriedade 'destaque' do artigo.
 * 
 * @function getFeaturedArticle
 * @returns {IArticle | undefined} Artigo em destaque ou undefined se não houver
 * @example
 * const destaque = getFeaturedArticle();
 */
export function getFeaturedArticle(): IArticle | undefined {
  // Busca o primeiro artigo com propriedade destaque = true
  return getAllArticles().find(a => a.destaque);
}

/**
 * Retorna os artigos mais recentes ordenados por data de publicação.
 * Opcionalmente pode excluir um artigo específico dos resultados.
 * 
 * @function getRecentArticles
 * @param {number} [limit=6] - Número máximo de artigos a retornar
 * @param {string} [excludeId] - ID de artigo a excluir dos resultados
 * @returns {IArticle[]} Array de artigos recentes ordenados (mais novo primeiro)
 * @example
 * // Últimos 6 artigos
 * const recentes = getRecentArticles();
 * 
 * // Últimos 3 artigos excluindo o artigo atual
 * const relacionados = getRecentArticles(3, '1');
 */
export function getRecentArticles(limit: number = 6, excludeId?: string): IArticle[] {
  return getAllArticles()
    // Filtra para remover o artigo com o ID especificado (se houver)
    .filter(a => a.id !== excludeId)
    // Ordena por data de publicação (mais novo para mais antigo)
    .sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
    // Limita o número de resultados
    .slice(0, limit);
}

/**
 * Encontra artigos relacionados baseados em categorias ou tags em comum.
 * Exclui o artigo atual e retorna até o limite especificado.
 * 
 * @function getRelatedArticles
 * @param {string} currentSlug - Slug do artigo atual
 * @param {number} [limit=3] - Número máximo de artigos relacionados
 * @returns {IArticle[]} Array de artigos relacionados
 * @example
 * const relacionados = getRelatedArticles('meu-artigo-slug');
 */
export function getRelatedArticles(currentSlug: string, limit: number = 3): IArticle[] {
  // Busca o artigo atual pelo slug
  const current = getArticleBySlug(currentSlug);
  
  // Se não encontrar o artigo, retorna array vazio
  if (!current) return [];

  // Filtra artigos que não sejam o atual e que tenham categorias ou tags em comum
  return getAllArticles()
    .filter(a => a.slug !== currentSlug)
    .filter(a => 
      // Verifica se tem alguma categoria em comum
      a.categorias.some(c => current.categorias.includes(c)) ||
      // Ou alguma tag em comum
      a.tags.some(t => current.tags.includes(t))
    )
    .slice(0, limit);
}

/**
 * Função principal de paginação que retorna artigos com metadados.
 * Suporta filtragem por categoria e termo de busca simultaneamente.
 * 
 * @function getPaginatedArticles
 * @param {Object} options - Opções de paginação e filtro
 * @param {number} [options.page=1] - Número da página (começa em 1)
 * @param {string} [options.category] - Categoria para filtrar (opcional)
 * @param {string} [options.search] - Termo de busca (opcional)
 * @returns {IPaginatedResult} Resultado paginado com artigos e metadados
 * @example
 * // Primeira página sem filtros
 * const resultado = getPaginatedArticles({ page: 1 });
 * 
 * // Página 2 filtrada por categoria
 * const filtrados = getPaginatedArticles({ page: 2, category: 'economia' });
 * 
 * // Busca com paginação
 * const busca = getPaginatedArticles({ page: 1, search: 'globalização' });
 */
export function getPaginatedArticles(options: {
  page?: number;
  category?: string;
  search?: string;
}): IPaginatedResult {
  // Define valores padrão para paginação
  const { page = 1, category, search } = options;
  
  // Inicia com todos os artigos
  let artigos = getAllArticles();

  // Aplica filtro de categoria se informada
  if (category) {
    artigos = artigos.filter(a => 
      a.categorias.some(c => c.toLowerCase() === category.toLowerCase())
    );
  }

  // Aplica filtro de busca se informada
  if (search) {
    const searchLower = search.toLowerCase();
    artigos = artigos.filter(a => 
      a.titulo.toLowerCase().includes(searchLower) ||
      a.resumo.toLowerCase().includes(searchLower) ||
      a.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  // Ordena artigos por data de publicação (mais recente primeiro)
  artigos.sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime());

  // Calcula metadados de paginação
  const total = artigos.length;
  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);
  const startIndex = (page - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = artigos.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  // Retorna resultado com artigos da página atual e metadados
  return {
    artigos: paginatedArticles,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  };
}

/**
 * Retorna todas as categorias únicas de todos os artigos.
 * Remove duplicatas e retorna em ordem alfabética.
 * 
 * @function getAllCategories
 * @returns {string[]} Array de categorias únicas ordenadas alfabeticamente
 * @example
 * const categorias = getAllCategories();
 * // ['Cultura', 'Economia', 'Geopolítica', 'Política']
 */
export function getAllCategories(): string[] {
  // Extrai todas as categorias de todos os artigos, remove duplicatas e ordena
  return Array.from(
    new Set(getAllArticles().flatMap(a => a.categorias))
  ).sort();
}

/**
 * Retorna todos os slugs dos artigos para geração de rotas estáticas.
 * Usado pelo Next.js para Static Site Generation (SSG).
 * 
 * @function getAllSlugs
 * @returns {string[]} Array com todos os slugs dos artigos
 * @example
 * const slugs = getAllSlugs();
 * // ['poder-empresas-transnacionais-globalizacao', 'meu-outro-artigo', ...]
 */
export function getAllSlugs(): string[] {
  // Mapeia todos os artigos para extrair apenas o slug
  return getAllArticles().map(a => a.slug);
}

/**
 * Gera uma URL canônica completa a partir de um caminho relativo.
 * Útil para tags meta canonical e OpenGraph.
 * 
 * @function getCanonicalUrl
 * @param {string} path - Caminho URL relativo (ex: '/artigos/meu-slug')
 * @returns {string} URL completa com domínio (ex: 'https://globalismo.com.br/artigos/meu-slug')
 * @example
 * const canonical = getCanonicalUrl('/artigos/poder-empresas-transnacionais-globalizacao');
 * // 'https://globalismo.com.br/artigos/poder-empresas-transnacionais-globalizacao'
 */
export function getCanonicalUrl(path: string): string {
  // Concatena a URL base com o caminho informado
  return `${baseUrl}${path}`;
}

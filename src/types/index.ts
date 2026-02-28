/**
 * @fileoverview Definições de tipos TypeScript para o projeto Globalismo.
 * Contém as interfaces utilizadas em toda a aplicação para garantir
 * type safety e consistência dos dados.
 * 
 * @author Globalismo
 * @version 1.0.0
 */

/**
 * Interface que representa um artigo do blog.
 * Contém todas as informações relevantes sobre cada publicação,
 * incluindo conteúdo, metadados e configurações de exibição.
 * 
 * @interface IArticle
 * @property {string} id - Identificador único do artigo (ex: "1", "2", "3")
 * @property {string} titulo - Título principal do artigo exibido no card e página
 * @property {string} slug - Identificador URL amigável para rotas (ex: "meu-artigo")
 * @property {string} conteudo - Conteúdo HTML completo do artigo
 * @property {string} resumo - Descrição curta usada em cards e meta tags
 * @property {string} autor - Nome do autor do artigo
 * @property {string} dataPublicacao - Data de publicação no formato ISO (YYYY-MM-DD)
 * @property {string} imagemCapa - URL da imagem de capa do artigo
 * @property {string[]} categorias - Array de categorias (ex: ["Economia", "Política"])
 * @property {string[]} tags - Array de tags para busca e organização (ex: ["globalização", "mercado"])
 * @property {number} tempoLeitura - Tempo estimado de leitura em minutos
 * @property {number} visualizacoes - Número de visualizações do artigo
 * @property {boolean} destaque - Indica se o artigo deve ser exibido em destaque na home
 */
export interface IArticle {
  /** Identificador único do artigo (ex: "1", "2", "3") */
  id: string;
  
  /** Título principal do artigo exibido no card e página */
  titulo: string;
  
  /** Identificador URL amigável para rotas (ex: "meu-artigo") */
  slug: string;
  
  /** Conteúdo HTML completo do artigo */
  conteudo: string;
  
  /** Descrição curta usada em cards e meta tags */
  resumo: string;
  
  /** Nome do autor do artigo */
  autor: string;
  
  /** Data de publicação no formato ISO (YYYY-MM-DD) */
  dataPublicacao: string;
  
  /** URL da imagem de capa do artigo */
  imagemCapa: string;
  
  /** Array de categorias (ex: ["Economia", "Política"]) */
  categorias: string[];
  
  /** Array de tags para busca e organização (ex: ["globalização", "mercado"]) */
  tags: string[];
  
  /** Tempo estimado de leitura em minutos */
  tempoLeitura: number;
  
  /** Número de visualizações do artigo */
  visualizacoes: number;
  
  /** Indica se o artigo deve ser exibido em destaque na home */
  destaque: boolean;
}

/**
 * Interface que representa o container dos dados de artigos.
 * Usada para tipar o arquivo JSON de artigos importado no sistema.
 * 
 * @interface IArticlesData
 * @property {IArticle[]} artigos - Array contendo todos os artigos do blog
 */
export interface IArticlesData {
  /** Array contendo todos os artigos do blog */
  artigos: IArticle[];
}

/**
 * Interface que define os parâmetros para paginação de resultados.
 * Utilizada em funções que retornam resultados paginados.
 * 
 * @interface IPaginationParams
 * @property {number} page - Número da página atual (começa em 1)
 * @property {number} limit - Número de itens por página
 */
export interface IPaginationParams {
  /** Número da página atual (começa em 1) */
  page: number;
  
  /** Número de itens por página */
  limit: number;
}

/**
 * Interface que representa o resultado de uma consulta paginada.
 * Contém os dados dos artigos mais metadados de paginação.
 * 
 * @interface IPaginatedResult
 * @property {IArticle[]} artigos - Array de artigos da página atual
 * @property {number} total - Total de artigos encontrados (sem paginação)
 * @property {number} page - Número da página atual
 * @property {number} totalPages - Total de páginas disponíveis
 * @property {boolean} hasMore - Indica se existem mais páginas após a atual
 */
export interface IPaginatedResult {
  /** Array de artigos da página atual */
  artigos: IArticle[];
  
  /** Total de artigos encontrados (sem paginação) */
  total: number;
  
  /** Número da página atual */
  page: number;
  
  /** Total de páginas disponíveis */
  totalPages: number;
  
  /** Indica se existem mais páginas após a atual */
  hasMore: boolean;
}

/**
 * Interface que representa uma categoria com contagem de artigos.
 * Utilizada para exibir estatísticas de categorias no site.
 * 
 * @interface ICategory
 * @property {string} name - Nome da categoria
 * @property {number} count - Número de artigos nessa categoria
 */
export interface ICategory {
  /** Nome da categoria */
  name: string;
  
  /** Número de artigos nessa categoria */
  count: number;
}

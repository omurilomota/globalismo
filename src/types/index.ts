export interface IArticle {
  id: string;
  titulo: string;
  slug: string;
  conteudo: string;
  resumo: string;
  autor: string;
  dataPublicacao: string;
  imagemCapa: string;
  categorias: string[];
  tags: string[];
  tempoLeitura: number;
  visualizacoes: number;
  destaque: boolean;
}

export interface IArticlesData {
  artigos: IArticle[];
}

export interface IPaginationParams {
  page: number;
  limit: number;
}

export interface IPaginatedResult {
  artigos: IArticle[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ICategory {
  name: string;
  count: number;
}

/**
 * @fileoverview API Route paraIndex listagem de artigos com paginação e filtros.
 * 
 * Esta rota é responsável por:
 * - Retornar lista paginada de artigos
 * - Suportar filtro por categoria
 * - Suportar busca por termo em título, resumo ou tags
 * - Permitir customização de limite por página
 * 
 * Endpoint: GET /api/artigos
 * Query params:
 *   - page: número da página (padrão: 1)
 *   - limit: artigos por página (padrão: 6)
 *   - categoria: filtro por categoria
 *   - busca: termo de busca
 * 
 * @module app/api/artigos/route
 * @author Globalismo
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import { IArticle, IPaginatedResult } from '@/types';
import artigosData from '@/data/artigos.json';

/**
 * Handler da rota GET paraIndex listagem de artigos.
 * Suporta paginação, filtro por categoria e busca por termo.
 * 
 * @async
 * @function GET
 * @param {Request} request - Objeto de requisição do Next.js
 * @returns {Promise<NextResponse>} Resposta JSON com artigos paginados
 * 
 * @example
 * // Listar primeira página
 * GET /api/artigos
 * 
 * // Com paginação e filtro
 * GET /api/artigos?page=2&limit=10&categoria=economia
 * 
 * // Com busca
 * GET /api/artigos?busca=globalização
 */
export async function GET(request: Request) {
  // Extrai parâmetros de query string da URL
  const { searchParams } = new URL(request.url);
  
  // Parâmetros de paginação com valores padrão
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  
  // Parâmetros de filtro
  const categoria = searchParams.get('categoria');
  const busca = searchParams.get('busca');

  // Cria cópia do array de artigos paraIndex manipulação
  let artigos: IArticle[] = [...(artigosData as { artigos: IArticle[] }).artigos];

  // Aplica filtro de categoria se fornecido
  if (categoria) {
    artigos = artigos.filter(a => 
      a.categorias.some(c => c.toLowerCase() === categoria.toLowerCase())
    );
  }

  // Aplica filtro de busca se fornecido (procura em título, resumo e tags)
  if (busca) {
    const searchLower = busca.toLowerCase();
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
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedArticles = artigos.slice(startIndex, startIndex + limit);

  // Monta resultado com artigos da página e metadados
  const result: IPaginatedResult = {
    artigos: paginatedArticles,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  };

  // Retorna resposta JSON
  return NextResponse.json(result);
}

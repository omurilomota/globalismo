/**
 * @fileoverview API Route paraIndex busca de artigo específico por slug.
 * 
 * Esta rota é responsável por:
 * - Buscar um artigo específico pelo seu slug
 * - Retornar dados completos do artigo
 * - Retornar erro 404 se artigo não existir
 * 
 * Endpoint: GET /api/artigos/[slug]
 * 
 * @module app/api/artigos/[slug]/route
 * @author Globalismo
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import { IArticle } from '@/types';
import artigosData from '@/data/artigos.json';

/**
 * Handler da rota GET paraIndex busca de artigo por slug.
 * Retorna o artigo encontrado ou erro 404 se não existir.
 * 
 * @async
 * @function GET
 * @param {Request} request - Objeto de requisição do Next.js
 * @param {Object} params - Parâmetros da rota dinâmica
 * @param {Promise<{slug: string}>} params.params - Promise com parâmetros (slug do artigo)
 * @returns {Promise<NextResponse>} Resposta JSON com artigo ou erro
 * 
 * @example
 * // Buscar artigo específico
 * GET /api/artigos/poder-empresas-transnacionais-globalizacao
 * 
 * // Resposta de sucesso:
 * {
 *   "id": "1",
 *   "titulo": "Poder das Empresas Transnacionais...",
 *   "slug": "poder-empresas-transnacionais-globalizacao",
 *   ...
 * }
 * 
 * // Resposta de erro (404):
 * {
 *   "error": "Artigo não encontrado"
 * }
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Aguarda resolução dos parâmetros da rota
  const { slug } = await params;
  
  // Extrai array de artigos do JSON
  const artigos = (artigosData as { artigos: IArticle[] }).artigos;
  
  // Busca artigo pelo slug
  const article = artigos.find(a => a.slug === slug);

  // Se artigo não existir, retorna erro 404
  if (!article) {
    return NextResponse.json(
      { error: 'Artigo não encontrado' },
      { status: 404 }
    );
  }

  // Retorna artigo encontrado
  return NextResponse.json(article);
}
